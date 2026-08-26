"use client";

import { useCallback, useEffect, useState } from "react";
import ChoiceTask from "@/components/lesson/ChoiceTask";
import MatchTask from "@/components/lesson/MatchTask";
import TopBar from "@/components/lesson/TopBar";
import { buildQueue, type Task } from "@/lib/practice";
import type { Lesson, Level } from "@/lib/vocab";

/** Phase 2: chạy hết hàng đợi. Câu sai bị đẩy về cuối, không phạt, không timer. */
export default function PracticePhase({
  level,
  lesson,
  onDone,
}: {
  level: Level;
  lesson: Lesson;
  onDone: () => void;
}) {
  const pool = level.lessons.flatMap((l) => l.words);
  const [queue, setQueue] = useState<Task[]>(() => buildQueue(lesson.words, pool));
  const [solved, setSolved] = useState(0);

  const current = queue[0];
  const total = solved + queue.length;
  const percent = total === 0 ? 100 : (solved / total) * 100;

  const advance = useCallback((correct: boolean) => {
    setQueue(([head, ...rest]) => (correct ? rest : [...rest, head]));
    if (correct) setSolved((s) => s + 1);
  }, []);

  useEffect(() => {
    if (queue.length === 0) onDone();
  }, [queue.length, onDone]);

  if (!current) return null;

  return (
    <>
      <TopBar backHref={`/level/${level.id}`} percent={percent} tone="practice" />

      <div key={current.id + queue.length} className="fade-up flex flex-1 flex-col">
        {current.kind === "match" ? (
          <MatchTask task={current} onDone={() => advance(true)} />
        ) : (
          <ChoiceTask task={current} onAnswer={advance} />
        )}
      </div>
    </>
  );
}
