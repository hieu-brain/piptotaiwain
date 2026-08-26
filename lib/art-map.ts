/**
 * Bài nào dùng hình nào. Bảng lấy nguyên từ mục 7 của kame-project-plan.md.
 * Hình đầu tiên là hình đại diện của bài; các hình sau dùng cho thẻ từ ở chunk 3.
 */

export const LESSON_ART: Record<string, string[]> = {
  d1l1: ["pose-wave"],
  d1l2: ["go-card", "go-mrt", "pose-card"],
  d1l3: ["pose-sleep"],
  d1l4: ["place-nightmarket", "food-chicken", "food-shavedice"],
  d2l1: ["place-101", "item-phone"],
  d2l2: ["food-xiaolongbao", "food-tea"],
  d2l3: ["go-bus", "go-map", "pose-think"],
  d2l4: ["place-jiufen-stairs", "place-teahouse", "item-lantern", "item-skylantern"],
  d3l1: ["place-ximending", "item-bag", "pose-point"],
  d3l2: ["food-bubbletea"],
  d3l3: ["food-pineapplecake", "item-coins", "item-postcard"],
  d3l4: ["place-airport", "go-plane", "pose-surprise"],
};

/** Hình đại diện của bài. Không có thì lấy tạm mascot vẫy tay, không để ô trống. */
export function lessonArt(lessonId: string): string {
  return LESSON_ART[lessonId]?.[0] ?? "pose-wave";
}

export function artSrc(name: string): string {
  return `/art/${name}.webp`;
}

export function posterSrc(day: number): string {
  return `/art/poster-day${day}.webp`;
}
