import {
  getLearningAnalytics,
  sanitizeLearningHistory,
} from "@/lib/learning-history";

describe("learning history analytics", () => {
  it("computes tutor counts, quiz pass counts, and streaks", () => {
    const today = new Date().toISOString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const history = sanitizeLearningHistory({
      lessonCompletions: [
        {
          lessonSlug: "what-is-money",
          lessonTitle: "What Is Money?",
          completedAt: today,
        },
      ],
      quizAttempts: [
        {
          lessonSlug: "what-is-money",
          lessonTitle: "What Is Money?",
          correctCount: 3,
          totalQuestions: 3,
          passed: true,
          attemptedAt: yesterday,
        },
      ],
      tutorPrompts: [
        {
          prompt: "How does Bitcoin supply work?",
          repliedAt: today,
          responsePreview: "It follows a fixed issuance schedule.",
          topic: "Bitcoin foundations",
        },
      ],
    });

    expect(getLearningAnalytics(history)).toMatchObject({
      activeDays: 2,
      passedQuizCount: 1,
      streakDays: 2,
      totalQuizAttempts: 1,
      totalTutorPrompts: 1,
      latestTutorPrompt: {
        prompt: "How does Bitcoin supply work?",
        topic: "Bitcoin foundations",
      },
    });
  });
});
