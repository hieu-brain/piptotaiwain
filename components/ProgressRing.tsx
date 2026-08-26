const R = 15;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function ProgressRing({
  percent,
  size = 40,
}: {
  percent: number;
  size?: number;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const filled = (clamped / 100) * CIRCUMFERENCE;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-label={`しんちょく ${clamped}パーセント`}
    >
      <circle cx="20" cy="20" r={R} fill="none" stroke="var(--color-sand)" strokeWidth="5" />
      {clamped > 0 && (
        <circle
          cx="20"
          cy="20"
          r={R}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
          transform="rotate(-90 20 20)"
        />
      )}
      <text
        x="20"
        y="24"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill={clamped > 0 ? "var(--color-ink)" : "var(--color-ink-soft)"}
        fontFamily="var(--font-jp)"
      >
        {clamped}
      </text>
    </svg>
  );
}
