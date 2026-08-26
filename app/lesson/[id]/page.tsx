import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import { artSrc, lessonArt } from "@/lib/art-map";
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

  return (
    <main className="flex flex-1 flex-col px-6 pt-5">
      <div className="flex items-center gap-2.5">
        <BackLink href={`/level/${level.id}`} />
        <p className="text-[13px] font-bold text-gold">
          Day {level.day}・{lesson.title}
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center pb-16 text-center">
        <img
          src={artSrc(lessonArt(lesson.id))}
          alt=""
          className="h-40 w-auto object-contain"
        />
        <p className="mt-4 text-xl font-bold text-ink">{lesson.scene}</p>
        <p className="mt-2 text-sm text-ink-soft">
          {lesson.words.length}このことば・レッスンは じゅんびちゅう
        </p>
      </div>
    </main>
  );
}
