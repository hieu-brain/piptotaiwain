import { allLessons, levels } from "@/lib/vocab";

/**
 * Mỗi bài xong được 1 sticker, xong trọn 1 ngày được thêm cúp.
 * Sticker lưu trong localStorage bằng id, hình tra ở đây.
 */

const LESSON_BADGES = [
  "badge-star",
  "badge-heart",
  "badge-shell",
  "badge-hibiscus",
  "badge-skylantern",
];

export const TROPHY = "badge-trophy";

export function trophyId(levelId: string): string {
  return `${levelId}-trophy`;
}

/** Hình sticker của 1 bài, cố định theo thứ tự bài nên lần nào cũng như nhau */
export function lessonBadge(lessonId: string): string {
  const at = allLessons().findIndex(({ lesson }) => lesson.id === lessonId);
  return LESSON_BADGES[(at < 0 ? 0 : at) % LESSON_BADGES.length];
}

export function badgeArt(stickerId: string): string {
  return stickerId.endsWith("-trophy") ? TROPHY : lessonBadge(stickerId);
}

/** Tên hiển thị của sticker, dùng cho alt và cho trang シール */
export function badgeLabel(stickerId: string): string {
  if (stickerId.endsWith("-trophy")) {
    const level = levels.find((l) => trophyId(l.id) === stickerId);
    return level ? `Day ${level.day} ぜんぶクリア` : "トロフィー";
  }
  const found = allLessons().find(({ lesson }) => lesson.id === stickerId);
  return found ? found.lesson.title : "シール";
}

/** Tổng số sticker có thể lấy: 12 bài + 3 cúp */
export function totalStickers(): number {
  return allLessons().length + levels.length;
}
