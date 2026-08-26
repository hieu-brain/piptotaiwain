import { notFound } from "next/navigation";
import LessonEngine from "@/components/lesson/LessonEngine";
import { allLessons, getLesson } from "@/lib/vocab";

export function generateStaticParams() {
  return allLessons().map(({ lesson }) => ({ id: lesson.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const found = getLesson(id);
  if (!found) notFound();
  const { level, lesson } = found;

  const order = allLessons();
  const at = order.findIndex(({ lesson: l }) => l.id === lesson.id);
  const next = order[at + 1]?.lesson.id ?? null;

  return <LessonEngine level={level} lesson={lesson} nextLessonId={next} />;
}
