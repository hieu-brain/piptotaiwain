"use client";

export function SpeakerGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

export default function SpeakButton({
  onSpeak,
  label = "発音を聞く",
}: {
  onSpeak: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSpeak}
      className="press inline-flex touch-manipulation items-center gap-2 rounded-full border-2 border-sea-deep px-6 py-3 text-[15px] font-bold text-sea-deep select-none"
      style={{ ["--press-shadow" as string]: "transparent" }}
    >
      <SpeakerGlyph />
      {label}
    </button>
  );
}
