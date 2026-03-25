import { NextResponse } from "next/server";

import { sanitizeNextPath } from "@/lib/auth-redirects";
import { syncProfileForUser } from "@/lib/profile";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextPath = sanitizeNextPath(url.searchParams.get("next"));
  const type = url.searchParams.get("type");
  const providerError = url.searchParams.get("error");
  const providerErrorDescription = url.searchParams.get("error_description");
  const redirectUrl = new URL(nextPath, url.origin);
  const supabase = await createServerSupabaseClient();

  if (providerError || providerErrorDescription) {
    const loginUrl = new URL("/auth/login", url.origin);
    loginUrl.searchParams.set("next", nextPath);
    loginUrl.searchParams.set(
      "error",
      /provider is not configured/i.test(providerErrorDescription ?? "")
        ? "google_provider_unavailable"
        : "google_auth_failed",
    );
    return NextResponse.redirect(loginUrl);
  }

  if (!code || !supabase) {
    return NextResponse.redirect(redirectUrl);
  }

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    const fallbackUrl = new URL(
      nextPath === "/auth/reset-password" ? "/auth/forgot-password" : "/auth/login",
      url.origin,
    );
    fallbackUrl.searchParams.set(
      "error",
      nextPath === "/auth/reset-password" ? "recovery_invalid" : "google_auth_failed",
    );

    if (nextPath !== "/auth/reset-password") {
      fallbackUrl.searchParams.set("next", nextPath);
    }

    return NextResponse.redirect(fallbackUrl);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await syncProfileForUser(user);
  }

  if (nextPath === "/auth/reset-password") {
    const resetUrl = new URL(nextPath, url.origin);
    resetUrl.searchParams.set("message", "recovery_ready");
    return NextResponse.redirect(resetUrl);
  }

  if (type === "signup") {
    const loginUrl = new URL("/auth/login", url.origin);
    loginUrl.searchParams.set("next", nextPath);
    loginUrl.searchParams.set("message", "email_confirmed");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(redirectUrl);
}
