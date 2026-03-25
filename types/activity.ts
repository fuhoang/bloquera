export interface LessonCompletionRecord {
  lessonSlug: string;
  lessonTitle: string;
  completedAt: string;
}

export interface QuizAttemptRecord {
  lessonSlug: string;
  lessonTitle: string;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  attemptedAt: string;
}

export interface TutorPromptRecord {
  prompt: string;
  repliedAt: string;
  responsePreview: string | null;
  topic: string | null;
}

export interface LearningHistory {
  lessonCompletions: LessonCompletionRecord[];
  quizAttempts: QuizAttemptRecord[];
  tutorPrompts: TutorPromptRecord[];
}
