import Link from "next/link";

export default function BackLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      aria-label="もどる"
      className="-ml-1 flex h-9 w-9 shrink-0 items-center justify-center"
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
        className="text-ink"
      >
        <path d="M15 18 9 12l6-6" />
      </svg>
    </Link>
  );
}
