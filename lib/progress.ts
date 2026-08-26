"use client";

import { useEffect, useState } from "react";
import { STORAGE } from "@/lib/config";
import { trophyId } from "@/lib/stickers";
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

function write(progress: Progress) {
  try {
    window.localStorage.setItem(STORAGE.progress, JSON.stringify(progress));
  } catch {
    /* hết chỗ hoặc bị chặn thì thôi, không làm hỏng bài học */
  }
}

/**
 * Học xong 1 bài: ghi mốc thời gian, trao sticker của bài, và trao thêm cúp
 * nếu bài này là bài cuối còn thiếu của ngày hôm đó.
 * Học lại lần nữa không ghi đè và không trao thêm gì.
 */
export function completeLesson(lessonId: string): {
  progress: Progress;
  newStickers: string[];
} {
  const progress = readProgress();
  const newStickers: string[] = [];

  if (!progress.done[lessonId]) {
    progress.done[lessonId] = Date.now();
    newStickers.push(lessonId);

    const level = levels.find((l) => l.lessons.some((x) => x.id === lessonId));
    if (level && level.lessons.every((l) => progress.done[l.id])) {
      const trophy = trophyId(level.id);
      if (!progress.stickers.includes(trophy)) newStickers.push(trophy);
    }

    progress.stickers = [...progress.stickers, ...newStickers];
    write(progress);
  }

  return { progress, newStickers };
}

/** Ngày đã học xong hết bài, dùng cho bản đồ mở khóa dần */
export function isLevelDone(progress: Progress, levelId: string): boolean {
  const level = levels.find((l) => l.id === levelId);
  return Boolean(level?.lessons.every((l) => progress.done[l.id]));
}

/** Mọi từ đã học, theo đúng thứ tự bài, dùng cho ことばノート */
export function learnedLessons(progress: Progress) {
  return allLessons().filter(({ lesson }) => progress.done[lesson.id]);
}
