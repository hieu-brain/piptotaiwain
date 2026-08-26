import DayTimeline from "@/components/DayTimeline";
import { PosterThumb } from "@/components/Poster";
import { formatJaDate, formatShortDate } from "@/lib/date";
import { levels, meta } from "@/lib/vocab";

export default function TripPage() {
  const first = levels[0];
  const last = levels[levels.length - 1];

  return (
    <main className="flex flex-1 flex-col px-6 pt-6">
      <h1 className="text-[26px] font-bold text-ink">旅のよてい</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {formatShortDate(first.date)} - {formatShortDate(last.date)}・
        {meta.tripNights}はく{meta.tripDays}日
      </p>

      {levels.map((level) => (
        <section key={level.id} className="mt-7 first:mt-6">
          <p className="text-[11px] font-bold tracking-[0.05em] text-gold">
            DAY {level.day}
          </p>
          <h2 className="mt-0.5 text-[19px] font-bold text-ink">
            {formatJaDate(level.date)}・{level.title}
          </h2>
          <p className="mt-1 text-xs text-ink-soft">{level.subtitle}</p>

          <div className="mt-4">
            <PosterThumb level={level} />
          </div>

          <DayTimeline level={level} />
        </section>
      ))}
    </main>
  );
}
