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

/**
 * Từ nào có hình riêng thì dùng hình đó. Từ không có hình hợp sẽ rơi về
 * hình đại diện của bài, không bao giờ để ô trống.
 */
export const WORD_ART: Record<string, string> = {
  // d1l1 chào hỏi
  你好: "pose-wave",
  再見: "pose-wave",
  我是日本人: "pose-point",
  請問: "pose-point",
  不好意思: "pose-point",
  對不起: "pose-think",
  // d1l2 悠遊卡 + MRT
  悠遊卡: "go-card",
  我要買悠遊卡: "go-card",
  加值: "go-card",
  捷運: "go-mrt",
  車站在哪裡: "go-mrt",
  這班車去台北嗎: "go-mrt",
  台北車站: "go-mrt",
  多少錢: "item-coins",
  // d1l3 hotel
  我有訂房: "pose-sleep",
  辦理入住: "pose-sleep",
  幾點: "pose-think",
  密碼: "item-phone",
  行李: "item-bag",
  // d1l4 chợ đêm
  士林夜市: "place-nightmarket",
  這是什麼: "food-shavedice",
  我要一個: "place-nightmarket",
  可以試吃嗎: "place-nightmarket",
  雞排: "food-chicken",
  好吃: "pose-eat",
  太辣了: "pose-eat",
  我吃飽了: "pose-eat",
  // d2l1 台北101
  台北101: "place-101",
  我要兩張票: "place-101",
  觀景台: "place-101",
  電梯: "place-101",
  好高: "place-101",
  好漂亮: "place-101",
  可以幫我拍照嗎: "item-phone",
  一起拍: "item-phone",
  // d2l2 小籠包
  小籠包: "food-xiaolongbao",
  幾位: "food-xiaolongbao",
  兩位: "food-xiaolongbao",
  我要點餐: "food-xiaolongbao",
  這個: "food-xiaolongbao",
  再一份: "food-xiaolongbao",
  熱茶: "food-tea",
  買單: "item-coins",
  // d2l3 đi 九份
  九份: "go-map",
  怎麼去: "go-map",
  要多久: "go-map",
  我迷路了: "go-map",
  公車: "go-bus",
  在哪裡下車: "go-bus",
  下一站: "go-bus",
  我要下車: "go-bus",
  // d2l4 老街 + trà
  老街: "place-jiufen-stairs",
  燈籠: "item-lantern",
  夕陽: "place-jiufen-stairs",
  好美: "place-jiufen-stairs",
  我想喝茶: "food-tea",
  可以坐這裡嗎: "place-teahouse",
  // d3l1 西門町
  西門町: "place-ximending",
  可以試穿嗎: "place-ximending",
  有別的顏色嗎: "place-ximending",
  大一點: "place-ximending",
  我只是看看: "place-ximending",
  我要這個: "item-bag",
  太貴了: "item-coins",
  便宜一點: "item-coins",
  // d3l2 trà sữa
  珍珠奶茶: "food-bubbletea",
  半糖: "food-bubbletea",
  微糖: "food-bubbletea",
  少冰: "food-bubbletea",
  去冰: "food-bubbletea",
  大杯: "food-bubbletea",
  內用還是外帶: "food-bubbletea",
  好喝: "food-bubbletea",
  // d3l3 quà + tính tiền
  鳳梨酥: "food-pineapplecake",
  有推薦的嗎: "food-pineapplecake",
  送禮: "item-postcard",
  可以刷卡嗎: "pose-card",
  要袋子: "item-bag",
  收據: "item-coins",
  一共多少: "item-coins",
  // d3l4 tạm biệt
  機場: "place-airport",
  我要去機場: "place-airport",
  計程車: "go-taxi",
  台灣很好玩: "pose-cheer",
  我還會再來: "go-plane",
  掰掰: "pose-wave",
};

/** Hình đại diện của bài. Không có thì lấy tạm mascot vẫy tay, không để ô trống. */
export function lessonArt(lessonId: string): string {
  return LESSON_ART[lessonId]?.[0] ?? "pose-wave";
}

/** Hình cho 1 thẻ từ */
export function wordArt(lessonId: string, hanzi: string): string {
  return WORD_ART[hanzi] ?? lessonArt(lessonId);
}

export function artSrc(name: string): string {
  return `/art/${name}.webp`;
}

export function posterSrc(day: number): string {
  return `/art/poster-day${day}.webp`;
}
