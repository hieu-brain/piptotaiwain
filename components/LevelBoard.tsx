"use client";

import Link from "next/link";
import ProgressRing from "@/components/ProgressRing";
import { levelPercent, nextLesson, useProgress } from "@/lib/progress";
import { levels } from "@/lib/vocab";

export default function LevelBoard() {
  const { progress, ready } = useProgress();
  const next = nextLesson(progress);
  const started = ready && Object.keys(progress.done).length > 0;

  return (
    <>
      <div className="mt-5 flex flex-col gap-3">
        {levels.map((level) => (
          <Link
            key={level.id}
            href={`/level/${level.id}`}
            className="press flex items-center gap-3.5 rounded-card border-[1.5px] border-sand bg-card px-4 py-3.5"
            style={{ ["--press-shadow" as string]: "transparent" }}
          >
            <span className="flex-1">
              <span className="block text-[11px] font-bold tracking-[0.05em] text-gold">
                DAY {level.day}
              </span>
              <span className="mt-0.5 block text-base font-bold text-ink">
                {level.title}
              </span>
            </span>
            <ProgressRing percent={levelPercent(progress, level.id)} />
          </Link>
        ))}
      </div>

      <div className="mt-auto pt-5 pb-4">
        <Link
          href={`/level/${next.level.id}`}
          className="press block rounded-[18px] bg-lantern py-4 text-center text-lg font-bold text-paper shadow-[0_4px_0_var(--color-lantern-deep)]"
        >
          {started ? "つづきから" : "はじめる"}
        </Link>
      </div>
    </>
  );
}
