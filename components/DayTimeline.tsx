import Link from "next/link";
import type { Level } from "@/lib/vocab";

/**
 * Lịch trình 1 ngày. Mốc thứ n trong ngày ứng với bài thứ n của level,
 * nên mỗi mốc có nút nhảy thẳng vào bài học của lúc đó.
 */
export default function DayTimeline({ level }: { level: Level }) {
  return (
    <div className="mt-5 flex flex-col">
      {level.schedule.map((stop, i) => {
        const lesson = level.lessons[i];
        const last = i === level.schedule.length - 1;

        return (
          <div key={`${stop.time}-${stop.place}`} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="mt-1 h-3.5 w-3.5 rounded-full border-[3px] border-paper bg-sea-deep shadow-[0_0_0_1.5px_var(--color-sea)]" />
              {!last && <span className="my-1 w-0.5 flex-1 bg-sand" />}
            </div>

            <div className="flex flex-1 items-start gap-2.5 pb-6">
              <div className="flex-1">
                <p className="text-[13px] font-bold text-gold">{stop.time}</p>
                <p className="mt-0.5 text-[17px] font-bold text-ink">{stop.place}</p>
                <p className="mt-1 text-xs text-ink-soft">{stop.ja}</p>
              </div>
              {lesson && (
                <Link
                  href={`/lesson/${lesson.id}`}
                  className="press mt-1 shrink-0 rounded-full border-2 border-sea-deep px-3.5 py-1.5 text-xs font-bold whitespace-nowrap text-sea-deep"
                >
                  れんしゅう
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
