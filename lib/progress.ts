"use client";

import { useEffect, useState } from "react";
import { STORAGE } from "@/lib/config";
import { allLessons, levels } from "@/lib/vocab";

export type Progress = {
  /** lessonId -> mốc thời gian học xong */
  done: Record<string, number>;
  /** tên sticker đã nhận, theo thứ tự nhận */
  stickers: string[];
};

export const EMPTY_PROGRESS: Progress = { done: {}, stickers: [] };

export function readProgress(): Progress {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE.progress);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      done: parsed.done ?? {},
      stickers: parsed.stickers ?? [],
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

/** Phần trăm bài đã xong của 1 level, làm tròn */
export function levelPercent(progress: Progress, levelId: string): number {
  const level = levels.find((l) => l.id === levelId);
  if (!level || level.lessons.length === 0) return 0;
  const done = level.lessons.filter((l) => progress.done[l.id]).length;
  return Math.round((done / level.lessons.length) * 100);
}

/** Bài đầu tiên chưa học. Học hết rồi thì trả về bài cuối cùng. */
export function nextLesson(progress: Progress) {
  const all = allLessons();
  return all.find(({ lesson }) => !progress.done[lesson.id]) ?? all[all.length - 1];
}

/**
 * localStorage chỉ đọc được ở client, nên lần render đầu luôn là EMPTY_PROGRESS
 * rồi mới đồng bộ. `ready` để biết lúc nào số liệu là thật.
 */
export function useProgress(): { progress: Progress; ready: boolean } {
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setReady(true);
  }, []);

  return { progress, ready };
}
