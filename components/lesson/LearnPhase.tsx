"use client";

import { useState } from "react";
import SpeakButton from "@/components/lesson/SpeakButton";
import TopBar from "@/components/lesson/TopBar";
import { artSrc, wordArt } from "@/lib/art-map";
import { useSpeech } from "@/lib/useSpeech";
import type { Lesson, Level } from "@/lib/vocab";

/** Phase 1: lướt hết thẻ từ, không hỏi gì cả */
export default function LearnPhase({
  level,
  lesson,
  onDone,
}: {
  level: Level;
  lesson: Lesson;
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const { speak, canSpeak, mainlandOnly } = useSpeech();

  const word = lesson.words[index];
  const last = index === lesson.words.length - 1;

  return (
    <>
      <TopBar
        backHref={`/level/${level.id}`}
        percent={((index + 1) / lesson.words.length) * 100}
        tone="learn"
      />

      <div className="flex flex-1 flex-col px-7 pt-6 text-center">
        <p className="text-[13px] font-bold text-gold">
          Day {level.day}・{lesson.title}
        </p>

        <div key={word.hanzi} className="fade-up flex flex-1 flex-col">
          <img
            src={artSrc(wordArt(lesson.id, word.hanzi))}
            alt=""
            className="mx-auto mt-5 h-[180px] w-auto object-contain"
          />

          <p className="mt-2 font-han text-[54px] leading-[1.15] text-ink">
            {word.hanzi}
          </p>
          <p className="mt-2 text-[19px] font-medium text-sea-deep">{word.pinyin}</p>
          <p className="mt-3.5 text-xl font-bold text-ink">{word.ja}</p>
          <p className="mt-1.5 text-[13px] text-ink-soft">{word.kana}</p>

          {canSpeak && (
            <div className="mt-6">
              <SpeakButton onSpeak={() => speak(word.hanzi)} />
              {mainlandOnly && (
                <p className="mt-2 text-[11px] text-ink-soft">
                  この端末は 台湾の声がないので 大陸の声です
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-auto pt-5 pb-6">
          <p className="mb-3 text-xs text-ink-soft">
            {index + 1} / {lesson.words.length}
          </p>
          <button
            type="button"
            onClick={() => (last ? onDone() : setIndex((i) => i + 1))}
            className="press w-full touch-manipulation rounded-[18px] bg-lantern py-4 text-lg font-bold text-paper shadow-[0_4px_0_var(--color-lantern-deep)] select-none"
          >
            {last ? "れんしゅうへ" : "つぎへ"}
          </button>
        </div>
      </div>
    </>
  );
}
