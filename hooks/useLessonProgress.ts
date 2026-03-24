"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "satoshilearn.lesson-progress";
const STORAGE_EVENT = "satoshilearn-progress-change";

type StoredProgress = {
  completedLessonSlugs: string[];
};

const EMPTY_PROGRESS: StoredProgress = { completedLessonSlugs: [] };
let cachedRawProgress = "";
let cachedProgress: StoredProgress = EMPTY_PROGRESS;

function getEmptyProgress(): StoredProgress {
  return EMPTY_PROGRESS;
}

function readProgress(): StoredProgress {
  if (typeof window === "undefined") {
    return getEmptyProgress();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return getEmptyProgress();
    }

    if (raw === cachedRawProgress) {
      return cachedProgress;
    }

    const parsed = JSON.parse(raw) as StoredProgress;

    cachedRawProgress = raw;
    cachedProgress = {
      completedLessonSlugs: Array.isArray(parsed.completedLessonSlugs)
        ? parsed.completedLessonSlugs
        : [],
    };

    return cachedProgress;
  } catch {
    return getEmptyProgress();
  }
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => callback();

  window.addEventListener("storage", handleChange);
  window.addEventListener(STORAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(STORAGE_EVENT, handleChange);
  };
}

function writeProgress(progress: StoredProgress) {
  const raw = JSON.stringify(progress);

  cachedRawProgress = raw;
  cachedProgress = progress;
  window.localStorage.setItem(STORAGE_KEY, raw);
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function useLessonProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    readProgress,
    getEmptyProgress,
  );

  const markLessonCompleted = useCallback((slug: string) => {
    const current = readProgress();

    if (current.completedLessonSlugs.includes(slug)) {
      return;
    }

    writeProgress({
      completedLessonSlugs: [...current.completedLessonSlugs, slug],
    });
  }, []);

  const isLessonCompleted = useCallback(
    (slug: string) => progress.completedLessonSlugs.includes(slug),
    [progress.completedLessonSlugs],
  );

  const completedCount = useMemo(
    () => progress.completedLessonSlugs.length,
    [progress.completedLessonSlugs],
  );

  return {
    completedLessonSlugs: progress.completedLessonSlugs,
    completedCount,
    isLessonCompleted,
    markLessonCompleted,
  };
}
