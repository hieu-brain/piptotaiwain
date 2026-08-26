import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";
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
    <ComingSoon
      title={`Day ${level.day}・${level.title}`}
      note="レッスンは じゅんびちゅう"
    />
  );
}
