import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import LessonList from "@/components/LessonList";
import { PosterThumb } from "@/components/Poster";
import { formatJaDate } from "@/lib/date";
import { getLevel, levels } from "@/lib/vocab";

export function generateStaticParams() {
  return levels.map((level) => ({ id: level.id }));
}

export default async function LevelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const level = getLevel(id);
  if (!level) notFound();

  return (
    <main className="flex flex-1 flex-col px-6 pt-5">
      <div className="flex items-center gap-2.5">
        <BackLink href="/" />
        <div>
          <p className="text-[11px] font-bold tracking-[0.05em] text-gold">
            DAY {level.day}・{formatJaDate(level.date)}
          </p>
          <h1 className="text-[21px] font-bold text-ink">{level.title}</h1>
        </div>
      </div>
      <p className="mt-2 pl-11 text-xs text-ink-soft">{level.subtitle}</p>

      <LessonList level={level} />

      <div className="mt-6">
        <PosterThumb level={level} />
      </div>
    </main>
  );
}
