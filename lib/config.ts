/** Cấu hình dùng chung. PIN để đúng 1 chỗ này. */

export const PIN = "110826";

export const STORAGE = {
  /** Mở khóa theo phiên tab: đóng tab là khóa lại */
  unlocked: "kame:unlocked",
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
