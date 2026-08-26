"use client";

import TripMap from "@/components/TripMap";
import { artSrc } from "@/lib/art-map";
import { useProgress } from "@/lib/progress";
import { badgeArt, badgeLabel, totalStickers, trophyId } from "@/lib/stickers";
import { levels } from "@/lib/vocab";

function Slot({ stickerId, got }: { stickerId: string; got: boolean }) {
  if (!got) {
    return (
      <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 border-dashed border-sand bg-paper-deep" />
    );
  }
  return (
    <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-[1.5px] border-sand bg-card">
      <img
        src={artSrc(badgeArt(stickerId))}
        alt={badgeLabel(stickerId)}
        className="h-[52px] w-[52px] object-contain"
      />
    </span>
  );
}

export default function StickerBoard() {
  const { progress } = useProgress();
  const got = new Set(progress.stickers);

  return (
    <>
      <p className="mt-1 text-sm text-ink-soft">
        {got.size} / {totalStickers()} こ あつめた
      </p>

      <div className="mt-5">
        <TripMap progress={progress} />
      </div>

      {levels.map((level) => {
        const trophy = trophyId(level.id);

        return (
          <section key={level.id} className="mt-7">
            <div className="flex items-baseline gap-2">
              <p className="text-[11px] font-bold tracking-[0.05em] text-gold">
                DAY {level.day}
              </p>
              <p className="text-sm font-bold text-ink">{level.title}</p>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-3">
              {level.lessons.map((lesson) => (
                <Slot key={lesson.id} stickerId={lesson.id} got={got.has(lesson.id)} />
              ))}
            </div>

            <div className="mt-3 flex items-center gap-3 border-t-[1.5px] border-sand pt-3">
              <Slot stickerId={trophy} got={got.has(trophy)} />
              <p className="text-xs text-ink-soft">
                {got.has(trophy)
                  ? `Day ${level.day} ぜんぶクリアの トロフィー`
                  : "4つのレッスンを ぜんぶクリアで トロフィー"}
              </p>
            </div>
          </section>
        );
      })}

      {got.size === 0 && (
        <p className="mt-8 text-center text-sm text-ink-soft">
          レッスンを クリアすると シールが たまるよ
        </p>
      )}
    </>
  );
}
