export function sanitizeNextPath(nextPath?: string | null) {
  if (!nextPath) {
    return "/learn";
  }

  // Only allow app-internal absolute paths to avoid open redirects.
  if (!nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return "/learn";
  }

  return nextPath;
}

function normalizeOrigin(origin: string) {
  return origin.replace(/\/$/, "");
}

export function buildAuthCallbackUrl(origin: string, nextPath?: string | null) {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  const callbackUrl = new URL(
    "/auth/callback",
    configuredOrigin ? normalizeOrigin(configuredOrigin) : normalizeOrigin(origin),
  );
  callbackUrl.searchParams.set("next", sanitizeNextPath(nextPath));
  return callbackUrl.toString();
}
