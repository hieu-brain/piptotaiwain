"use client";

import { useEffect, useRef, useState } from "react";
import type { MatchTask as MatchTaskType } from "@/lib/practice";

type Tile = { key: string; pair: string; side: "hanzi" | "ja"; text: string };

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Dạng 1: ghép cặp chữ Hán với nghĩa tiếng Nhật */
export default function MatchTask({
  task,
  onDone,
}: {
  task: MatchTaskType;
  onDone: () => void;
}) {
  const [tiles] = useState<Tile[]>(() =>
    shuffle(
      task.pairs.flatMap((word) => [
        { key: `h:${word.hanzi}`, pair: word.hanzi, side: "hanzi" as const, text: word.hanzi },
        { key: `j:${word.hanzi}`, pair: word.hanzi, side: "ja" as const, text: word.ja },
      ]),
    ),
  );
  const [picked, setPicked] = useState<Tile | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [missed, setMissed] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    if (matched.length !== task.pairs.length) return;
    const t = window.setTimeout(onDone, 520);
    timers.current.push(t);
  }, [matched.length, task.pairs.length, onDone]);

  function tap(tile: Tile) {
    if (matched.includes(tile.pair) || missed) return;
    if (!picked) {
      setPicked(tile);
      return;
    }
    if (picked.key === tile.key) {
      setPicked(null);
      return;
    }
    if (picked.pair === tile.pair && picked.side !== tile.side) {
      setMatched((m) => [...m, tile.pair]);
      setPicked(null);
      return;
    }
    // ghép trượt: chỉ rung nhẹ rồi cho chọn lại, không phạt gì cả
    setMissed(tile.key);
    const t = window.setTimeout(() => {
      setMissed(null);
      setPicked(null);
    }, 420);
    timers.current.push(t);
  }

  return (
    <div className="px-6 pt-7">
      <h2 className="text-center text-[22px] font-bold text-ink">ペアをつくろう</h2>
      <p className="mt-1.5 text-center text-[13px] text-ink-soft">
        おなじ意味のカードをタップ
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {tiles.map((tile) => {
          const isMatched = matched.includes(tile.pair);
          const isPicked = picked?.key === tile.key;
          const isMissed = missed === tile.key || (missed && isPicked);

          return (
            <button
              key={tile.key}
              type="button"
              onClick={() => tap(tile)}
              disabled={isMatched}
              className={`relative flex min-h-[76px] touch-manipulation items-center justify-center rounded-tile border-[1.5px] px-2.5 py-4 text-center select-none ${
                tile.side === "hanzi"
                  ? "font-han text-[26px] leading-tight"
                  : "text-[15px] leading-snug font-bold"
              } ${
                isMatched
                  ? "border-sand bg-card text-ink opacity-35"
                  : isMissed
                    ? "shake border-lantern bg-card text-lantern"
                    : isPicked
                      ? "border-[2.5px] border-sea-deep bg-sea-pale text-ink shadow-[0_3px_0_var(--color-sea)]"
                      : "border-sand bg-card text-ink"
              }`}
            >
              {tile.text}
              {isMatched && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-sea-deep)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="absolute top-2 right-2.5"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center text-sm font-bold text-sea-deep">
        {matched.length > 0 ? "いいね！ その調子" : " "}
      </p>
    </div>
  );
}
