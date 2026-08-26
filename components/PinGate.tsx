"use client";

import { useEffect, useState } from "react";
import { PIN, STORAGE } from "@/lib/config";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

export default function PinGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [digits, setDigits] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE.unlocked) === "1") setUnlocked(true);
    } catch {
      /* sessionStorage bị chặn thì cứ hỏi PIN lại */
    }
    setChecked(true);
  }, []);

  useEffect(() => {
    if (digits.length < PIN.length) return;
    if (digits === PIN) {
      try {
        window.sessionStorage.setItem(STORAGE.unlocked, "1");
      } catch {
        /* không lưu được thì thôi, vẫn mở cho phiên này */
      }
      setUnlocked(true);
      return;
    }
    setWrong(true);
    const t = window.setTimeout(() => {
      setDigits("");
      setWrong(false);
    }, 700);
    return () => window.clearTimeout(t);
  }, [digits]);

  // Chờ đọc xong sessionStorage rồi mới vẽ, tránh nháy màn khóa
  if (!checked) return <div className="min-h-dvh bg-paper" />;
  if (unlocked) return <>{children}</>;

  function press(key: string) {
    if (wrong) return;
    if (key === "del") {
      setDigits((d) => d.slice(0, -1));
      return;
    }
    if (!key) return;
    setDigits((d) => (d.length >= PIN.length ? d : d + key));
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col items-center px-7 pt-14 pb-10">
      <img
        src="/art/pose-wave.webp"
        alt="手をふるカメ"
        className="h-40 w-auto object-contain"
      />
      <h1 className="mt-2 font-han text-[38px] leading-tight text-ink">你好！</h1>
      <p className="mt-1 text-sm font-medium text-ink-soft">
        あんしょうばんごうを いれてね
      </p>

      <div className={`mt-8 flex gap-3 ${wrong ? "shake" : ""}`}>
        {Array.from({ length: PIN.length }).map((_, i) => (
          <span
            key={i}
            className={`h-3.5 w-3.5 rounded-full border-[1.5px] ${
              wrong
                ? "border-lantern bg-lantern"
                : i < digits.length
                  ? "border-sea-deep bg-sea-deep"
                  : "border-sand bg-paper-deep"
            }`}
          />
        ))}
      </div>

      <p
        className={`mt-4 text-[13px] font-bold ${
          wrong ? "text-lantern" : "text-transparent"
        }`}
      >
        あれ、ちがうみたい
      </p>

      <div className="mt-4 grid w-full max-w-[300px] grid-cols-3 gap-3">
        {KEYS.map((key, i) =>
          key === "" ? (
            <span key={i} />
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => press(key)}
              aria-label={key === "del" ? "ひとつ消す" : key}
              className="press flex h-[62px] touch-manipulation items-center justify-center rounded-[18px] border-[1.5px] border-sand bg-card text-[26px] font-bold text-ink shadow-[0_3px_0_var(--color-sand)] select-none"
              style={{ ["--press-shadow" as string]: "var(--color-sand)" }}
            >
              {key === "del" ? (
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5" />
                  <path d="m11 18-6-6 6-6" />
                </svg>
              ) : (
                key
              )}
            </button>
          ),
        )}
      </div>
    </main>
  );
}
