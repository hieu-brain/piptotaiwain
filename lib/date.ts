/**
 * Mọi thứ liên quan ngày tháng tính từ chuỗi YYYY-MM-DD theo giờ địa phương.
 * Không dùng new Date("YYYY-MM-DD") trực tiếp vì nó hiểu là UTC.
 */

const WEEKDAY_JA = ["日", "月", "火", "水", "木", "金", "土"];

export function parseDate(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Số ngày còn lại tính từ hôm nay tới ngày đó. Quá khứ trả về số âm. */
export function daysUntil(ymd: string, now: Date = new Date()): number {
  const target = parseDate(ymd);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

/** 2026-09-20 -> "9月20日(日)" */
export function formatJaDate(ymd: string): string {
  const d = parseDate(ymd);
  return `${d.getMonth() + 1}月${d.getDate()}日(${WEEKDAY_JA[d.getDay()]})`;
}

/** 2026-09-20 -> "9/20" */
export function formatShortDate(ymd: string): string {
  const d = parseDate(ymd);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
