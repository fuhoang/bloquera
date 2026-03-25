const exchangeCodeForSession = vi.fn();
const getUser = vi.fn();
const createServerSupabaseClient = vi.fn();
const syncProfileForUser = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: () => createServerSupabaseClient(),
}));

vi.mock("@/lib/profile", () => ({
  syncProfileForUser: (...args: unknown[]) => syncProfileForUser(...args),
}));

describe("auth callback route", () => {
  beforeEach(() => {
    exchangeCodeForSession.mockReset();
    getUser.mockReset();
    createServerSupabaseClient.mockReset();
    syncProfileForUser.mockReset();
  });

  it("redirects to /learn when no code is provided", async () => {
    createServerSupabaseClient.mockResolvedValue(null);
    const { GET } = await import("@/app/auth/callback/route");

    const response = await GET(new Request("http://localhost/auth/callback"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/learn");
  });

  it("exchanges the code and redirects to the requested path", async () => {
    createServerSupabaseClient.mockResolvedValue({
      auth: {
        exchangeCodeForSession,
        getUser,
      },
    });
    exchangeCodeForSession.mockResolvedValue({ error: null });
    getUser.mockResolvedValue({
      data: {
        user: {
          id: "user-1",
          email: "user@example.com",
        },
      },
    });
    const { GET } = await import("@/app/auth/callback/route");

    const response = await GET(
      new Request("http://localhost/auth/callback?code=abc123&next=%2Fdashboard"),
    );

    expect(exchangeCodeForSession).toHaveBeenCalledWith("abc123");
    expect(syncProfileForUser).toHaveBeenCalledWith({
      id: "user-1",
      email: "user@example.com",
    });
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/dashboard");
  });

  it("falls back to /learn for unsafe next paths", async () => {
    createServerSupabaseClient.mockResolvedValue({
      auth: {
        exchangeCodeForSession,
        getUser,
      },
    });
    exchangeCodeForSession.mockResolvedValue({ error: null });
    getUser.mockResolvedValue({
      data: {
        user: null,
      },
    });
    const { GET } = await import("@/app/auth/callback/route");

    const response = await GET(
      new Request("http://localhost/auth/callback?code=abc123&next=https://evil.example"),
    );

    expect(exchangeCodeForSession).toHaveBeenCalledWith("abc123");
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/learn");
  });

  it("redirects Google provider failures to login with a friendly error state", async () => {
    const { GET } = await import("@/app/auth/callback/route");

    const response = await GET(
      new Request(
        "http://localhost/auth/callback?error=access_denied&error_description=Provider%20is%20not%20configured&next=%2Flearn",
      ),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/auth/login?next=%2Flearn&error=google_provider_unavailable",
    );
  });

  it("redirects recovery callbacks to reset-password with a ready message", async () => {
    createServerSupabaseClient.mockResolvedValue({
      auth: {
        exchangeCodeForSession,
        getUser,
      },
    });
    exchangeCodeForSession.mockResolvedValue({ error: null });
    getUser.mockResolvedValue({
      data: {
        user: {
          id: "user-1",
          email: "user@example.com",
        },
      },
    });
    const { GET } = await import("@/app/auth/callback/route");

    const response = await GET(
      new Request("http://localhost/auth/callback?code=abc123&next=%2Fauth%2Freset-password"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/auth/reset-password?message=recovery_ready",
    );
  });
});
