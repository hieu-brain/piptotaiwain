"use client";

import { useCallback, useRef, useState } from "react";
import CompleteScreen from "@/components/lesson/CompleteScreen";
import LearnPhase from "@/components/lesson/LearnPhase";
import PracticePhase from "@/components/lesson/PracticePhase";
import { completeLesson } from "@/lib/progress";
import type { Lesson, Level } from "@/lib/vocab";

type Phase = "learn" | "practice" | "done";

export default function LessonEngine({
  level,
  lesson,
  nextLessonId,
}: {
  level: Level;
  lesson: Lesson;
  nextLessonId: string | null;
}) {
  const [phase, setPhase] = useState<Phase>("learn");
  // trao thưởng đúng 1 lần, kể cả khi effect chạy lại
  const awarded = useRef<string[] | null>(null);

  const finish = useCallback(() => {
    if (awarded.current === null) {
      awarded.current = completeLesson(lesson.id).newStickers;
    }
    setPhase("done");
    window.scrollTo(0, 0);
  }, [lesson.id]);

  if (phase === "learn") {
    return (
      <LearnPhase level={level} lesson={lesson} onDone={() => setPhase("practice")} />
    );
  }

  if (phase === "practice") {
    return <PracticePhase level={level} lesson={lesson} onDone={finish} />;
  }

  return (
    <CompleteScreen
      level={level}
      lesson={lesson}
      nextLessonId={nextLessonId}
      earned={awarded.current ?? []}
    />
  );
}
