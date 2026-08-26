"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { posterSrc } from "@/lib/art-map";
import { formatJaDate } from "@/lib/date";
import type { Level } from "@/lib/vocab";

function Overlay({ level, onClose }: { level: Level; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fade-up fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-paper-deep px-6 py-8"
      onClick={onClose}
    >
      <img
        src={posterSrc(level.day)}
        alt={`Day ${level.day} のポスター`}
        className="max-h-[62vh] w-auto rounded-hero border-[1.5px] border-sand object-contain"
      />
      <div className="text-center">
        <p className="text-[11px] font-bold tracking-[0.05em] text-gold">
          DAY {level.day}
        </p>
        <p className="mt-1 text-lg font-bold text-ink">{level.title}</p>
        <p className="mt-1 text-xs text-ink-soft">{formatJaDate(level.date)}</p>
      </div>
      <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <Link
          href={`/level/${level.id}`}
          className="press rounded-[18px] bg-lantern px-7 py-3.5 text-base font-bold text-paper shadow-[0_4px_0_var(--color-lantern-deep)]"
        >
          この日のレッスンへ
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-ink-soft underline underline-offset-[3px]"
        >
          とじる
        </button>
      </div>
    </div>
  );
}

/** Thẻ poster nhỏ nằm trong trang 旅 */
export function PosterThumb({ level }: { level: Level }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="press flex w-full items-center gap-3.5 rounded-card border-[1.5px] border-sand bg-card p-3 text-left"
      >
        <img
          src={posterSrc(level.day)}
          alt=""
          className="h-[112px] w-[84px] shrink-0 rounded-xl border border-sand object-cover"
        />
        <span className="flex-1">
          <span className="block text-sm font-bold text-ink">
            Day {level.day} ポスター
          </span>
          <span className="mt-1 block text-xs text-ink-soft">タップで大きく見る</span>
        </span>
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
          className="text-ink-soft"
        >
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>
      {open && <Overlay level={level} onClose={() => setOpen(false)} />}
    </>
  );
}

/** Trang ポスター: 3 tấm to, bấm vào thì phóng lên */
export function PosterGallery({ levels }: { levels: Level[] }) {
  const [open, setOpen] = useState<Level | null>(null);

  return (
    <>
      <div className="mt-5 flex flex-col gap-5">
        {levels.map((level) => (
          <button
            key={level.id}
            type="button"
            onClick={() => setOpen(level)}
            className="press overflow-hidden rounded-hero border-[1.5px] border-sand bg-card text-left"
          >
            <img
              src={posterSrc(level.day)}
              alt={`Day ${level.day} のポスター`}
              className="block w-full object-cover"
            />
            <span className="flex items-center gap-3 px-4 py-3">
              <span className="flex-1">
                <span className="block text-[11px] font-bold tracking-[0.05em] text-gold">
                  DAY {level.day}・{formatJaDate(level.date)}
                </span>
                <span className="mt-0.5 block text-base font-bold text-ink">
                  {level.title}
                </span>
              </span>
              <span className="text-xs text-ink-soft">タップで大きく</span>
            </span>
          </button>
        ))}
      </div>
      {open && <Overlay level={open} onClose={() => setOpen(null)} />}
    </>
  );
}
