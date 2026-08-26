"use client";

import Link from "next/link";
import { artSrc } from "@/lib/art-map";
import { useProgress } from "@/lib/progress";
import { badgeArt, badgeLabel, trophyId } from "@/lib/stickers";
import type { Lesson, Level } from "@/lib/vocab";

export default function CompleteScreen({
  level,
  lesson,
  nextLessonId,
  earned,
}: {
  level: Level;
  lesson: Lesson;
  nextLessonId: string | null;
  earned: string[];
}) {
  const { progress } = useProgress();
  const gotTrophy = earned.includes(trophyId(level.id));
  const again = earned.length === 0;

  return (
    <main className="fade-up flex flex-1 flex-col px-7 pt-8 pb-8 text-center">
      <img
        src={artSrc("scene-complete")}
        alt="よろこぶカメ"
        className="mx-auto h-[200px] w-auto object-contain"
      />

      <h1 className="mt-3 text-[28px] font-black text-ink">レッスンクリア！</h1>
      <p className="mt-2 text-sm text-ink-soft">
        「{lesson.title}」{lesson.words.length}このことば
      </p>

      {!again && (
        <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border-[1.5px] border-sand bg-paper-deep px-5 py-2.5 text-[15px] font-bold text-gold">
          +{earned.length} シール
        </p>
      )}

      <div className="mt-5 flex justify-center gap-4">
        {level.lessons.map((l) => {
          const done = Boolean(progress.done[l.id]);
          const isNew = earned.includes(l.id);

          return done ? (
            <span
              key={l.id}
              className={`flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] bg-card ${
                isNew ? "border-[2.5px] border-sea-deep" : "border-sand"
              }`}
            >
              <img
                src={artSrc(badgeArt(l.id))}
                alt={badgeLabel(l.id)}
                className="h-12 w-12 object-contain"
              />
            </span>
          ) : (
            <span
              key={l.id}
              className="h-16 w-16 rounded-full border-2 border-dashed border-sand bg-paper-deep"
            />
          );
        })}
      </div>

      {gotTrophy && (
        <div className="fade-up mt-6 rounded-card border-[1.5px] border-sand bg-card px-4 py-4">
          <img
            src={artSrc("badge-trophy")}
            alt="トロフィー"
            className="mx-auto h-16 w-16 object-contain"
          />
          <p className="mt-2 text-base font-bold text-ink">
            Day {level.day} ぜんぶクリア！
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            ちずに Day {level.day} のばしょが ひらいたよ
          </p>
        </div>
      )}

      {again && (
        <p className="mt-5 text-sm text-ink-soft">
          このレッスンは まえに クリアずみ。ふくしゅう おつかれさま
        </p>
      )}

      <div className="mt-auto pt-8">
        <Link
          href={nextLessonId ? `/lesson/${nextLessonId}` : `/level/${level.id}`}
          className="press block rounded-[18px] bg-lantern py-4 text-lg font-bold text-paper shadow-[0_4px_0_var(--color-lantern-deep)]"
        >
          {nextLessonId ? "つぎのレッスンへ" : "ぜんぶ おわり！"}
        </Link>

        <Link
          href="/stickers"
          className="mt-5 block text-sm font-medium text-ink-soft underline underline-offset-[3px]"
        >
          シールを見る
        </Link>
      </div>
    </main>
  );
}
