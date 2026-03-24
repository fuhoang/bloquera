import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import type { NextRequest, NextResponse } from "next/server";

import { getSupabaseBrowserEnv } from "@/lib/supabase/config";

type SessionUpdateResult = {
  response: NextResponse;
  user: User | null;
};

export async function updateSupabaseSession(
  request: NextRequest,
  response: NextResponse,
): Promise<SessionUpdateResult> {
  const env = getSupabaseBrowserEnv();

  if (!env) {
    return {
      response,
      user: null,
    };
  }

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    response,
    user,
  };
}
