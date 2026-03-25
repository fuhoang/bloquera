import { act, renderHook, waitFor } from "@testing-library/react";

async function loadHook() {
  vi.resetModules();
  return import("@/hooks/useLearningHistory");
}

describe("useLearningHistory", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(global, "fetch").mockImplementation(async (input, init) => {
      if (!init || init.method === "GET") {
        return new Response(
          JSON.stringify({
            lessonCompletions: [],
            quizAttempts: [],
          }),
          { status: 200 },
        );
      }

      return new Response(
        JSON.stringify({
          lessonCompletions: [],
          quizAttempts: [],
        }),
        { status: 200 },
      );
    });
  });

  it("records quiz attempts and lesson completions", async () => {
    const { useLearningHistory } = await loadHook();
    const { result } = renderHook(() => useLearningHistory());

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/activity", {
        method: "GET",
        cache: "no-store",
      });
    });

    act(() => {
      result.current.recordQuizAttempt({
        lessonSlug: "what-is-money",
        lessonTitle: "What Is Money?",
        correctCount: 2,
        totalQuestions: 3,
        passed: true,
      });
      result.current.recordLessonCompleted({
        lessonSlug: "what-is-money",
        lessonTitle: "What Is Money?",
      });
    });

    expect(result.current.quizAttempts).toHaveLength(1);
    expect(result.current.lessonCompletions).toHaveLength(1);
    expect(result.current.quizAttempts[0]).toMatchObject({
      lessonSlug: "what-is-money",
      passed: true,
    });
    expect(global.fetch).toHaveBeenNthCalledWith(
      3,
      "/api/activity",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expect.stringContaining('"type":"lesson_completion"'),
      }),
    );
  });

  it("does not duplicate lesson completions for the same lesson", async () => {
    const { useLearningHistory } = await loadHook();
    const { result } = renderHook(() => useLearningHistory());

    act(() => {
      result.current.recordLessonCompleted({
        lessonSlug: "what-is-money",
        lessonTitle: "What Is Money?",
      });
      result.current.recordLessonCompleted({
        lessonSlug: "what-is-money",
        lessonTitle: "What Is Money?",
      });
    });

    expect(result.current.lessonCompletions).toHaveLength(1);
  });
});
