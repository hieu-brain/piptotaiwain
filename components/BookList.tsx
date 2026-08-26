"use client";

import Link from "next/link";
import { SpeakerGlyph } from "@/components/lesson/SpeakButton";
import JaText from "@/components/JaText";
import { artSrc } from "@/lib/art-map";
import { learnedLessons, useProgress } from "@/lib/progress";
import { useSpeech } from "@/lib/useSpeech";
import { allWords, levels } from "@/lib/vocab";

/** ことばノート: gom mọi từ đã học lại một chỗ để tra */
export default function BookList() {
  const { progress, ready } = useProgress();
  const { speak, canSpeak } = useSpeech();

  const learned = learnedLessons(progress);
  const total = allWords().length;
  const known = learned.reduce((n, { lesson }) => n + lesson.words.length, 0);

  if (!ready) return <div className="mt-6 h-40" />;

  if (learned.length === 0) {
    return (
      <div className="fade-up mt-10 flex flex-col items-center text-center">
        <img
          src={artSrc("item-postcard")}
          alt=""
          className="h-32 w-auto object-contain"
        />
        <p className="mt-4 text-base font-bold text-ink">まだ からっぽ</p>
        <p className="mt-2 text-sm text-ink-soft">
          レッスンを クリアすると ここに ことばが たまるよ
        </p>
        <Link
          href="/"
          className="press mt-6 rounded-[18px] bg-lantern px-7 py-3.5 text-base font-bold text-paper shadow-[0_4px_0_var(--color-lantern-deep)]"
        >
          レッスンへ
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mt-1 text-sm text-ink-soft">
        {known} / {total} ことば
      </p>

      {levels.map((level) => {
        const lessons = learned.filter(({ level: l }) => l.id === level.id);
        if (lessons.length === 0) return null;

        return (
          <section key={level.id} className="mt-6">
            <div className="flex items-baseline gap-2">
              <p className="text-[11px] font-bold tracking-[0.05em] text-gold">
                DAY {level.day}
              </p>
              <p className="text-sm font-bold text-ink">{level.title}</p>
            </div>

            {lessons.map(({ lesson }) => (
              <div key={lesson.id} className="mt-3">
                <p className="text-xs font-bold text-ink-soft">{lesson.title}</p>

                <div className="mt-2 flex flex-col gap-2">
                  {lesson.words.map((word) => (
                    <div
                      key={word.hanzi}
                      className="flex items-center gap-3 rounded-card border-[1.5px] border-sand bg-card px-3.5 py-3"
                    >
                      <div className="flex-1">
                        <p className="font-han text-[26px] leading-tight text-ink">
                          {word.hanzi}
                        </p>
                        <p className="mt-0.5 text-[13px] font-medium text-sea-deep">
                          {word.pinyin}
                        </p>
                        <p className="mt-1 text-sm font-bold text-ink">
                          <JaText text={word.ja} />
                        </p>
                        <p className="mt-0.5 text-[11px] text-ink-soft">{word.kana}</p>
                      </div>

                      {canSpeak && (
                        <button
                          type="button"
                          onClick={() => speak(word.hanzi)}
                          aria-label={`${word.hanzi} を聞く`}
                          className="press flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border-2 border-sea-deep text-sea-deep select-none"
                          style={{ ["--press-shadow" as string]: "transparent" }}
                        >
                          <SpeakerGlyph size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}

      {known < total && (
        <p className="mt-7 text-center text-xs text-ink-soft">
          あと {total - known} ことばが レッスンの なかに かくれています
        </p>
      )}
    </>
  );
}
