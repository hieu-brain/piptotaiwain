"use client";

import Link from "next/link";
import { artSrc, lessonArt } from "@/lib/art-map";
import { useProgress } from "@/lib/progress";
import type { Level } from "@/lib/vocab";

export default function LessonList({ level }: { level: Level }) {
  const { progress } = useProgress();
  const doneCount = level.lessons.filter((l) => progress.done[l.id]).length;
  const percent = Math.round((doneCount / level.lessons.length) * 100);

  return (
    <>
      <div className="mt-5 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs font-bold text-ink-soft">
          {doneCount}/{level.lessons.length}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {level.lessons.map((lesson, i) => {
          const done = Boolean(progress.done[lesson.id]);

          return (
            <Link
              key={lesson.id}
              href={`/lesson/${lesson.id}`}
              className="press flex items-center gap-3.5 rounded-card border-[1.5px] border-sand bg-card p-3"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-shell">
                <img
                  src={artSrc(lessonArt(lesson.id))}
                  alt=""
                  className="h-11 w-11 object-contain"
                />
              </span>

              <span className="flex-1">
                <span className="block text-[11px] font-bold tracking-[0.05em] text-gold">
                  レッスン {i + 1}
                </span>
                <span className="mt-0.5 block text-base font-bold text-ink">
                  {lesson.title}
                </span>
                <span className="mt-1 block text-xs text-ink-soft">
                  {lesson.words.length}このことば・{lesson.scene}
                </span>
              </span>

              {done ? (
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sea"
                  aria-label="おわった"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-ink)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 text-ink-soft"
                >
                  <path d="m9 6 6 6-6 6" />
                </svg>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
