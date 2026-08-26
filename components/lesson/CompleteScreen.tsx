"use client";

import Link from "next/link";
import { artSrc } from "@/lib/art-map";
import type { Lesson, Level } from "@/lib/vocab";

export default function CompleteScreen({
  level,
  lesson,
  nextLessonId,
}: {
  level: Level;
  lesson: Lesson;
  nextLessonId: string | null;
}) {
  return (
    <main className="fade-up flex flex-1 flex-col px-7 pt-10 pb-8 text-center">
      <img
        src={artSrc("scene-complete")}
        alt="よろこぶカメ"
        className="mx-auto h-[230px] w-auto object-contain"
      />

      <h1 className="mt-4 text-[28px] font-black text-ink">レッスンクリア！</h1>
      <p className="mt-2 text-sm text-ink-soft">
        「{lesson.title}」{lesson.words.length}このことば
      </p>

      <div className="mt-auto pt-8">
        {nextLessonId ? (
          <Link
            href={`/lesson/${nextLessonId}`}
            className="press block rounded-[18px] bg-lantern py-4 text-lg font-bold text-paper shadow-[0_4px_0_var(--color-lantern-deep)]"
          >
            つぎのレッスンへ
          </Link>
        ) : (
          <Link
            href={`/level/${level.id}`}
            className="press block rounded-[18px] bg-lantern py-4 text-lg font-bold text-paper shadow-[0_4px_0_var(--color-lantern-deep)]"
          >
            この日は ぜんぶクリア
          </Link>
        )}

        <Link
          href="/"
          className="mt-5 block text-sm font-medium text-ink-soft underline underline-offset-[3px]"
        >
          ホームにもどる
        </Link>
      </div>
    </main>
  );
}
