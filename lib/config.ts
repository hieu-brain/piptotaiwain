/** Cấu hình dùng chung. */

/** Tên bạn rùa. Đổi ở đây là đổi mọi chỗ trong app. */
export const MASCOT = {
  nameJa: "ピップ",
  nameLatin: "Pip",
} as const;

export const STORAGE = {
  /** Tiến độ học, giữ qua các lần mở app */
  progress: "kame:progress",
  /** Đã xem màn chào của ピップ chưa */
  metMascot: "kame:met-mascot",
} as const;

export const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/trip", label: "旅" },
  { href: "/library", label: "ポスター" },
  { href: "/book", label: "ことば" },
  { href: "/stickers", label: "シール" },
] as const;
