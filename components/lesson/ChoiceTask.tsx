"use client";

import { useEffect, useRef, useState } from "react";
import SpeakButton, { SpeakerGlyph } from "@/components/lesson/SpeakButton";
import JaText from "@/components/JaText";
import type { ChoiceTask as ChoiceTaskType } from "@/lib/practice";
import { useSpeech } from "@/lib/useSpeech";
import type { Word } from "@/lib/vocab";

/**
 * Dạng 2 (nghe chọn chữ) và dạng 3 (nhìn chữ chọn nghĩa).
 * Đúng thì khen rồi đi tiếp, sai thì chỉ ra đáp án và đẩy câu về cuối hàng đợi.
 */
export default function ChoiceTask({
  task,
  onAnswer,
}: {
  task: ChoiceTaskType;
  onAnswer: (correct: boolean) => void;
}) {
  const [chosen, setChosen] = useState<Word | null>(null);
  const { speak, canSpeak } = useSpeech();
  const timer = useRef<number | null>(null);
  const missPanel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const correct = chosen?.hanzi === task.word.hanzi;
  const answered = chosen !== null;

  // đáp án + ô sửa lỗi có thể tràn khỏi màn hình, kéo nút つぎへ vào tầm mắt
  useEffect(() => {
    if (answered && !correct) {
      missPanel.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [answered, correct]);

  function pick(word: Word) {
    if (answered) return;
    setChosen(word);
    if (word.hanzi === task.word.hanzi) {
      timer.current = window.setTimeout(() => onAnswer(true), 750);
    }
  }

  return (
    <div className="flex flex-1 flex-col px-6 pt-7">
      {task.kind === "listen" ? (
        <>
          <h2 className="text-center text-[22px] font-bold text-ink">
            きこえたのは どれ？
          </h2>
          <p className="mt-1.5 text-center text-[13px] text-ink-soft">
            ボタンをタップして 音を聞く
          </p>
          <div className="mt-7 flex justify-center">
            {canSpeak ? (
              <button
                type="button"
                onClick={() => speak(task.word.hanzi)}
                aria-label="もういちど聞く"
                className="press flex h-[104px] w-[104px] touch-manipulation items-center justify-center rounded-full border-2 border-sea-deep bg-sea-pale text-sea-deep select-none"
                style={{ ["--press-shadow" as string]: "var(--color-sea)" }}
              >
                <SpeakerGlyph size={42} />
              </button>
            ) : (
              // máy không có giọng tiếng Trung: cho đọc chữ thay vì bỏ trống
              <p className="font-han text-[46px] text-ink">{task.word.hanzi}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center text-[22px] font-bold text-ink">
            どんな意味？
          </h2>
          <div className="mt-6 rounded-hero border-[1.5px] border-sand bg-card py-6 text-center">
            <p className="font-han text-[46px] leading-tight text-ink">
              {task.word.hanzi}
            </p>
            <p className="mt-2 text-[17px] font-medium text-sea-deep">
              {task.word.pinyin}
            </p>
          </div>
          {canSpeak && (
            <div className="mt-4 text-center">
              <SpeakButton onSpeak={() => speak(task.word.hanzi)} label="音を聞く" />
            </div>
          )}
        </>
      )}

      <div
        className={`mt-7 gap-3 ${
          task.kind === "listen" ? "grid grid-cols-2" : "flex flex-col"
        }`}
      >
        {task.choices.map((choice) => {
          const isAnswer = choice.hanzi === task.word.hanzi;
          const isChosen = chosen?.hanzi === choice.hanzi;
          const tone = !answered
            ? "border-sand bg-card text-ink"
            : isAnswer
              ? "border-[2.5px] border-sea-deep bg-sea-pale text-ink"
              : isChosen
                ? "border-[2.5px] border-lantern bg-card text-lantern"
                : "border-sand bg-card text-ink opacity-40";

          return (
            <button
              key={choice.hanzi}
              type="button"
              onClick={() => pick(choice)}
              className={`flex min-h-[58px] touch-manipulation items-center justify-center rounded-tile border-[1.5px] px-3 py-3.5 text-center select-none ${tone} ${
                task.kind === "listen"
                  ? "font-han text-[26px] leading-tight"
                  : "text-[15px] leading-snug font-bold"
              }`}
            >
              {task.kind === "listen" ? choice.hanzi : <JaText text={choice.ja} />}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6 pb-6">
        {answered && correct && (
          <p className="fade-up text-center text-lg font-bold text-sea-deep">
            いいね！
          </p>
        )}

        {answered && !correct && (
          <div
            ref={missPanel}
            className="fade-up rounded-card border-[1.5px] border-sand bg-card p-3.5"
          >
            <p className="text-center text-[15px] font-bold text-gold">おしい！</p>
            <p className="mt-1.5 text-center font-han text-[26px] leading-tight text-ink">
              {task.word.hanzi}
              <span className="ml-2 text-sm font-medium text-sea-deep">
                {task.word.pinyin}
              </span>
            </p>
            <p className="mt-1 text-center text-[15px] font-bold text-ink">
              <JaText text={task.word.ja} />
            </p>
            <button
              type="button"
              onClick={() => onAnswer(false)}
              className="press mt-3.5 w-full touch-manipulation rounded-[18px] bg-lantern py-3.5 text-base font-bold text-paper shadow-[0_4px_0_var(--color-lantern-deep)] select-none"
            >
              つぎへ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
