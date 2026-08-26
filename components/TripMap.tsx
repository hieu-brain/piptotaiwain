"use client";

import { artSrc } from "@/lib/art-map";
import { isLevelDone, type Progress } from "@/lib/progress";
import { levels } from "@/lib/vocab";

/** Vị trí mốc trên tấm ちず, đo theo phần trăm của chính bức tranh */
const PINS: Record<string, { left: string; top: string }> = {
  day1: { left: "17%", top: "37%" }, // chợ đêm bên trái
  day2: { left: "86%", top: "26%" }, // dãy đèn lồng Cửu Phần bên phải
  day3: { left: "44%", top: "62%" }, // khu phố dưới chân 101, phía 西門町
};

export default function TripMap({ progress }: { progress: Progress }) {
  const openCount = levels.filter((l) => isLevelDone(progress, l.id)).length;

  return (
    <section>
      <div className="relative overflow-hidden rounded-hero border-[1.5px] border-sand bg-shell">
        <img
          src={artSrc("map-taipei")}
          alt="たびのちず"
          className="block w-full object-cover"
        />

        {levels.map((level) => {
          const open = isLevelDone(progress, level.id);
          const at = PINS[level.id];
          if (!at) return null;

          return (
            <span
              key={level.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: at.left, top: at.top }}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold ${
                  open
                    ? "border-[2.5px] border-paper bg-sea-deep text-paper shadow-[0_0_0_1.5px_var(--color-sea-deep)]"
                    : "border-2 border-dashed border-ink-soft/50 bg-paper/70 text-ink-soft"
                }`}
                aria-label={`Day ${level.day} ${open ? "ひらいた" : "まだ"}`}
              >
                {level.day}
              </span>
            </span>
          );
        })}
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        {levels.map((level) => {
          const open = isLevelDone(progress, level.id);
          return (
            <p
              key={level.id}
              className={`text-[13px] ${open ? "font-bold text-ink" : "text-ink-soft"}`}
            >
              <span className="text-gold">Day {level.day}</span>{" "}
              {open ? level.title : "レッスンを ぜんぶクリアすると ひらくよ"}
            </p>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-ink-soft">
        ちず: {openCount} / {levels.length} ばしょ
      </p>
    </section>
  );
}
