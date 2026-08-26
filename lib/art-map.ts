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
  謝謝: "pose-thanks",
  不客氣: "pose-no-problem",
  我是日本人: "pose-myself",
  請問: "pose-ask",
  不好意思: "pose-ask",
  對不起: "pose-sorry",
  // d1l2 悠遊卡 + MRT
  悠遊卡: "act-tap-card",
  我要買悠遊卡: "act-buy-card",
  加值: "act-topup",
  捷運: "go-mrt",
  車站在哪裡: "act-ask-way",
  這班車去台北嗎: "place-platform",
  台北車站: "place-station",
  多少錢: "item-coins",
  // d1l3 hotel
  我有訂房: "pose-sleep",
  辦理入住: "pose-sleep",
  幾點: "pose-think",
  密碼: "item-phone",
  行李: "item-bag",
  謝謝你的幫忙: "act-handshake",
  // d1l4 chợ đêm
  士林夜市: "place-nightmarket",
  這是什麼: "act-whats-this",
  我要一個: "act-order-one",
  可以試吃嗎: "food-sample",
  雞排: "food-chicken",
  好吃: "pose-eat",
  太辣了: "pose-spicy",
  我吃飽了: "pose-full",
  // d2l1 台北101
  台北101: "place-101",
  我要兩張票: "act-buy-ticket",
  觀景台: "place-observatory",
  電梯: "place-elevator",
  好高: "place-101-tall",
  好漂亮: "pose-amazed",
  可以幫我拍照嗎: "item-phone",
  一起拍: "act-selfie",
  // d2l2 小籠包
  小籠包: "food-xiaolongbao",
  幾位: "place-table-for-two",
  兩位: "act-two-people",
  我要點餐: "act-order",
  這個: "act-point-menu",
  再一份: "food-one-more",
  熱茶: "food-teaset",
  買單: "act-pay",
  // d2l3 đi 九份
  九份: "place-jiufen-teahouse",
  怎麼去: "act-ask-driver",
  要多久: "go-mountain-road",
  我迷路了: "go-map",
  公車: "act-wait-bus",
  在哪裡下車: "act-get-off",
  下一站: "place-bus-inside",
  我要下車: "act-stop-button",
  // d2l4 老街 + trà
  老街: "place-jiufen-street",
  燈籠: "item-lantern",
  夕陽: "place-sunset",
  好美: "pose-watch-sunset",
  我想喝茶: "act-drink-tea",
  可以坐這裡嗎: "place-teahouse",
  // d3l1 西門町
  西門町: "place-ximending",
  可以試穿嗎: "act-try-on",
  有別的顏色嗎: "item-colors",
  大一點: "item-sizes",
  我只是看看: "pose-browsing",
  我要這個: "item-bag",
  太貴了: "pose-shocked",
  便宜一點: "act-bargain",
  // d3l2 trà sữa
  珍珠奶茶: "food-bubbletea",
  半糖: "drink-half-sugar",
  微糖: "drink-less-sugar",
  少冰: "drink-less-ice",
  去冰: "drink-no-ice",
  大杯: "drink-large",
  內用還是外帶: "drink-takeout",
  好喝: "food-bubbletea",
  // d3l3 quà + tính tiền
  鳳梨酥: "food-pineapplecake",
  有推薦的嗎: "food-pineapplecake",
  送禮: "act-gift",
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
