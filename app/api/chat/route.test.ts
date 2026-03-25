import { POST } from "@/app/api/chat/route";

const createTutorReply = vi.fn();
const getUser = vi.fn();
const createServerSupabaseClient = vi.fn();
const checkRateLimit = vi.fn();
const insert = vi.fn();
const from = vi.fn();

vi.mock("@/lib/openai", () => ({
  createTutorReply: (message: string) => createTutorReply(message),
  inferTutorTopic: () => "Bitcoin foundations",
}));

vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: () => createServerSupabaseClient(),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: (...args: unknown[]) => checkRateLimit(...args),
}));

describe("chat route", () => {
  beforeEach(() => {
    createTutorReply.mockReset();
    getUser.mockReset();
    createServerSupabaseClient.mockReset();
    checkRateLimit.mockReset();
    insert.mockReset();
    from.mockReset();
    createServerSupabaseClient.mockResolvedValue({
      auth: {
        getUser,
      },
      from,
    });
    getUser.mockResolvedValue({
      data: {
        user: {
          id: "user-1",
        },
      },
    });
    checkRateLimit.mockReturnValue({
      allowed: true,
      remaining: 9,
      resetAt: Date.now() + 60_000,
    });
    from.mockReturnValue({
      insert,
    });
    insert.mockResolvedValue({ error: null });
  });

  it("rejects empty messages", async () => {
    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "   " }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Please enter a question before submitting.",
    });
  });

  it("requires an authenticated user", async () => {
    getUser.mockResolvedValue({
      data: { user: null },
    });

    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "What is Bitcoin?" }),
      }),
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "Log in to use the AI tutor.",
    });
  });

  it("returns the tutor reply for valid input", async () => {
    createTutorReply.mockResolvedValue("Bitcoin reply");

    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "What is Bitcoin?" }),
      }),
    );

    expect(createTutorReply).toHaveBeenCalledWith("What is Bitcoin?");
    expect(from).toHaveBeenCalledWith("learning_activity");
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({
        activity_type: "tutor_prompt",
        lesson_slug: "ai-tutor",
        lesson_title: "What is Bitcoin?",
      }),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      reply: "Bitcoin reply",
      recordedAt: expect.any(String),
      topic: "Bitcoin foundations",
      usage: {
        limit: 10,
        remaining: 9,
        resetAt: expect.any(Number),
      },
    });
  });

  it("rate limits repeated tutor requests", async () => {
    checkRateLimit.mockReturnValue({
      allowed: false,
      remaining: 0,
      resetAt: Date.now() + 60_000,
    });

    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "What is Bitcoin?" }),
      }),
    );

    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBeTruthy();
    await expect(response.json()).resolves.toEqual({
      error: "You have reached the tutor limit for now. Please try again in a minute.",
    });
  });

  it("returns a server error when the tutor fails", async () => {
    createTutorReply.mockRejectedValue(new Error("boom"));

    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "What is Bitcoin?" }),
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Unable to process your request right now.",
    });
  });

  it("rejects oversized messages", async () => {
    const response = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "a".repeat(501) }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Please keep tutor questions under 500 characters.",
    });
  });
});
