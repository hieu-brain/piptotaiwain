import Link from "next/link";

/** Mũi tên back + thanh tiến độ. Vàng cho phase học, xanh cho phase luyện. */
export default function TopBar({
  backHref,
  percent,
  tone,
}: {
  backHref: string;
  percent: number;
  tone: "learn" | "practice";
}) {
  return (
    <div className="flex items-center gap-3.5 px-5 pt-5">
      <Link
        href={backHref}
        aria-label="やめる"
        className="-ml-1 flex h-8 w-8 shrink-0 items-center justify-center text-ink"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18 9 12l6-6" />
        </svg>
      </Link>
      <div
        className="h-2 flex-1 overflow-hidden rounded-full bg-sand"
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-300 ${
            tone === "learn" ? "bg-gold" : "bg-sea-deep"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
