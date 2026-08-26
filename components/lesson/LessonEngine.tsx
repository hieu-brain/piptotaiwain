"use client";

import { useCallback, useState } from "react";
import CompleteScreen from "@/components/lesson/CompleteScreen";
import LearnPhase from "@/components/lesson/LearnPhase";
import PracticePhase from "@/components/lesson/PracticePhase";
import { markLessonDone } from "@/lib/progress";
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

  const finish = useCallback(() => {
    markLessonDone(lesson.id);
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
    <CompleteScreen level={level} lesson={lesson} nextLessonId={nextLessonId} />
  );
}
