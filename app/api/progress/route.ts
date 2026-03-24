import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { EMPTY_LESSON_PROGRESS, sanitizeLessonProgress } from "@/lib/progress";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const PROGRESS_COOKIE = "satoshilearn-progress";

async function readCookieProgress() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(PROGRESS_COOKIE)?.value;

  if (!raw) {
    return EMPTY_LESSON_PROGRESS;
  }

  try {
    return sanitizeLessonProgress(JSON.parse(raw));
  } catch {
    return EMPTY_LESSON_PROGRESS;
  }
}

async function writeCookieProgress(progress: typeof EMPTY_LESSON_PROGRESS) {
  const response = NextResponse.json({
    saved: true,
    ...progress,
    updatedAt: new Date().toISOString(),
  });

  response.cookies.set(PROGRESS_COOKIE, JSON.stringify(progress), {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

async function readSupabaseProgress() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      progress: EMPTY_LESSON_PROGRESS,
      persisted: false,
    };
  }

  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_slug")
    .eq("user_id", user.id);

  if (error) {
    return null;
  }

  return {
    progress: sanitizeLessonProgress({
      completedLessonSlugs: data.map((row) => row.lesson_slug),
    }),
    persisted: true,
  };
}

async function writeSupabaseProgress(progress: typeof EMPTY_LESSON_PROGRESS) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      response: NextResponse.json(
        { error: "You must be logged in to save progress." },
        { status: 401 },
      ),
      saved: false,
    };
  }

  const nextSlugs = progress.completedLessonSlugs;
  const deleteQuery = nextSlugs.length
    ? supabase
        .from("lesson_progress")
        .delete()
        .eq("user_id", user.id)
        .not("lesson_slug", "in", `(${nextSlugs.map((slug) => `"${slug}"`).join(",")})`)
    : supabase.from("lesson_progress").delete().eq("user_id", user.id);
  const { error: deleteError } = await deleteQuery;

  if (deleteError) {
    return null;
  }

  if (nextSlugs.length > 0) {
    const { error: upsertError } = await supabase.from("lesson_progress").upsert(
      nextSlugs.map((slug) => ({
        lesson_slug: slug,
        user_id: user.id,
      })),
      {
        onConflict: "user_id,lesson_slug",
      },
    );

    if (upsertError) {
      return null;
    }
  }

  return {
    response: NextResponse.json({
      saved: true,
      ...progress,
      updatedAt: new Date().toISOString(),
    }),
    saved: true,
  };
}

export async function GET() {
  const stored = await readSupabaseProgress();

  if (stored) {
    return NextResponse.json(stored.progress);
  }

  return NextResponse.json(await readCookieProgress());
}

export async function POST(request: Request) {
  const body = (await request.json()) as
    | { slug?: string; complete?: boolean }
    | { completedLessonSlugs?: string[] };

  const current = await readCookieProgress();
  const hasCompletedLessonSlugs =
    "completedLessonSlugs" in body &&
    Array.isArray(body.completedLessonSlugs);

  const next =
    hasCompletedLessonSlugs
      ? sanitizeLessonProgress(body)
      : "slug" in body && body.slug && body.complete
        ? {
            completedLessonSlugs: Array.from(
              new Set([...current.completedLessonSlugs, body.slug]),
            ),
          }
        : current;

  const supabaseWrite = await writeSupabaseProgress(next);

  if (supabaseWrite?.saved) {
    return supabaseWrite.response;
  }

  if (supabaseWrite?.response) {
    return supabaseWrite.response;
  }

  return writeCookieProgress(next);
}
