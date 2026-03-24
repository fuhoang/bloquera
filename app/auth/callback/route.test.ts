const exchangeCodeForSession = vi.fn();
const createServerSupabaseClient = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: () => createServerSupabaseClient(),
}));

describe("auth callback route", () => {
  beforeEach(() => {
    exchangeCodeForSession.mockReset();
    createServerSupabaseClient.mockReset();
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
      },
    });
    const { GET } = await import("@/app/auth/callback/route");

    const response = await GET(
      new Request("http://localhost/auth/callback?code=abc123&next=%2Fdashboard"),
    );

    expect(exchangeCodeForSession).toHaveBeenCalledWith("abc123");
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/dashboard");
  });
});
