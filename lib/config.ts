/** Cấu hình dùng chung. */

export const STORAGE = {
  /** Tiến độ học, giữ qua các lần mở app */
  progress: "kame:progress",
} as const;

export const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/trip", label: "旅" },
  { href: "/library", label: "ポスター" },
  { href: "/book", label: "ことば" },
  { href: "/stickers", label: "シール" },
] as const;
