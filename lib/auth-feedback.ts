import { sanitizeNextPath } from "@/lib/auth-redirects";

export function getFriendlyAuthErrorMessage(message: string) {
  if (/email rate limit exceeded/i.test(message)) {
    return "Too many email requests. Please wait a few minutes before trying again.";
  }

  if (/provider is not configured/i.test(message)) {
    return "Google sign-in is not fully configured yet. Use email login for now or finish the provider setup in Supabase.";
  }

  if (/oauth/i.test(message) && /error/i.test(message)) {
    return "Google sign-in could not be completed. Try again or use email login instead.";
  }

  return message;
}

export function getAuthErrorFromSearchParam(error?: string | null) {
  switch (error) {
    case "google_auth_failed":
      return "Google sign-in could not be completed. Try again or use email login instead.";
    case "google_provider_unavailable":
      return "Google sign-in is not fully configured yet. Use email login for now or finish the provider setup in Supabase.";
    case "recovery_invalid":
      return "Your password reset link is invalid or has expired. Request a fresh reset email.";
    default:
      return error ? decodeURIComponent(error) : null;
  }
}

export function getAuthMessageFromSearchParam(
  message?: string | null,
  nextPath?: string | null,
) {
  const safeNextPath = sanitizeNextPath(nextPath ?? undefined);

  switch (message) {
    case "email_confirmed":
      return `Email confirmed. You can now log in${safeNextPath !== "/learn" ? " and continue to your destination" : ""}.`;
    case "recovery_ready":
      return "Reset link verified. Choose your new password below.";
    case "password_reset_complete":
      return "Password updated. You can now log in with your new password.";
    default:
      return message ? decodeURIComponent(message) : null;
  }
}
