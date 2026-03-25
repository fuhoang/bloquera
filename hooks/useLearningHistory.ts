"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
  EMPTY_LEARNING_HISTORY,
  mergeLearningHistory,
  sanitizeLearningHistory,
} from "@/lib/learning-history";
import type {
  LearningHistory,
  LessonCompletionRecord,
  QuizAttemptRecord,
} from "@/types/activity";

const STORAGE_KEY = "satoshilearn.learning-history";
const STORAGE_EVENT = "satoshilearn-learning-history-change";

let cachedRawHistory = "";
let cachedHistory = EMPTY_LEARNING_HISTORY;
let hasLoadedRemoteHistory = false;

function notifyHistoryChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(STORAGE_EVENT));
}

function writeHistory(history: LearningHistory) {
  const normalized = sanitizeLearningHistory(history);
  const raw = JSON.stringify(normalized);

  cachedRawHistory = raw;
  cachedHistory = normalized;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, raw);
    notifyHistoryChange();
  }
}

function persistActivity(activity: {
  correctCount?: number;
  lessonSlug: string;
  lessonTitle: string;
  passed?: boolean;
  totalQuestions?: number;
  type: "lesson_completion" | "quiz_attempt";
}) {
  void fetch("/api/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  }).catch(() => undefined);
}

function readHistorySnapshot() {
  if (typeof window === "undefined") {
    return cachedHistory;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return cachedHistory;
    }

    if (raw === cachedRawHistory) {
      return cachedHistory;
    }

    cachedRawHistory = raw;
    cachedHistory = sanitizeLearningHistory(JSON.parse(raw));

    return cachedHistory;
  } catch {
    return cachedHistory;
  }
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => callback();

  window.addEventListener("storage", handleChange);
  window.addEventListener(STORAGE_EVENT, handleChange);

  if (!hasLoadedRemoteHistory) {
    hasLoadedRemoteHistory = true;

    void fetch("/api/activity", { method: "GET", cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load activity");
        }

        const payload = sanitizeLearningHistory(await response.json());
        const local = readHistorySnapshot();
        writeHistory(mergeLearningHistory(local, payload));
      })
      .catch(() => undefined);
  }

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(STORAGE_EVENT, handleChange);
  };
}

export function useLearningHistory() {
  const history = useSyncExternalStore(
    subscribe,
    readHistorySnapshot,
    () => EMPTY_LEARNING_HISTORY,
  );

  const recordLessonCompleted = useCallback(
    (record: Omit<LessonCompletionRecord, "completedAt">) => {
      const current = readHistorySnapshot();

      if (
        current.lessonCompletions.some(
          (entry) => entry.lessonSlug === record.lessonSlug,
        )
      ) {
        return;
      }

      writeHistory({
        ...mergeLearningHistory(current, {
          lessonCompletions: [
            {
              ...record,
              completedAt: new Date().toISOString(),
            },
          ],
          quizAttempts: [],
        }),
      });
      persistActivity({
        lessonSlug: record.lessonSlug,
        lessonTitle: record.lessonTitle,
        type: "lesson_completion",
      });
    },
    [],
  );

  const recordQuizAttempt = useCallback(
    (record: Omit<QuizAttemptRecord, "attemptedAt">) => {
      const current = readHistorySnapshot();

      writeHistory(
        mergeLearningHistory(current, {
          lessonCompletions: [],
          quizAttempts: [
            {
              ...record,
              attemptedAt: new Date().toISOString(),
            },
          ],
        }),
      );
      persistActivity({
        correctCount: record.correctCount,
        lessonSlug: record.lessonSlug,
        lessonTitle: record.lessonTitle,
        passed: record.passed,
        totalQuestions: record.totalQuestions,
        type: "quiz_attempt",
      });
    },
    [],
  );

  return {
    lessonCompletions: history.lessonCompletions,
    quizAttempts: history.quizAttempts,
    recordLessonCompleted,
    recordQuizAttempt,
  };
}
