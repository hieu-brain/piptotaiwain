# Asset manifest - Kame to Taipei

Tổng: **14 lần sinh = 280 credit** (ngân sách 3000). Sinh ra khoảng 50 asset.

Quy tắc: mỗi lần bấm Generate là 20 credit. Đọc kỹ prompt trước khi bấm. Ưu tiên gom nhiều asset vào một tấm lưới rồi cắt bằng script.

---

## Khối dán chung

Ba khối này copy sẵn, dán vào mọi prompt tương ứng. Không gõ tay lại lần nào.

### [STYLE]
```
Hand-painted children's picture-book illustration, watercolor and gouache on textured paper, soft visible pencil outlines, flat muted colors, warm limited palette, gentle imperfect brushstrokes, Japanese storybook style.
```

### [NEGATIVE]
```
No photographic elements, no camera bokeh, no depth-of-field blur, no 3D render, no glossy highlights, no flat vector icon style, no drop shadows, no watermark.
```

### [REF] - dán khi có đính kèm character sheet
```
Use the attached image as the exact character reference. Same sea turtle character: identical face, proportions, sea-green shell with coral hibiscus flower, cream belly, orange backpack. Match the paper texture, line quality and color palette of the reference exactly. The entire image including the background must be hand-painted in the same style as the character - the background painted loosely with visible brushstrokes, flatter and simpler than the character.
```

### [GRID] - dán khi sinh tấm nhiều hình
```
Arranged in a clean 3x2 grid on pure white background, evenly spaced, no overlap, generous empty margin around each item, all items roughly equal size, each item complete and not cropped.
```

---

## Bảng sinh ảnh

| # | File đích | Tỉ lệ | Ref? | Credit |
|---|---|---|---|---|
| 01 | character-sheet-a.png | 3:2 | - | đã có |
| 02 | character-sheet-b.png | 3:2 | có | 20 |
| 03 | spot-food.png | 3:2 | - | 20 |
| 04 | spot-transport.png | 3:2 | - | 20 |
| 05 | spot-shopping.png | 3:2 | - | 20 |
| 06 | spot-places.png | 3:2 | - | 20 |
| 07 | poster-day1.png | 2:3 | có | 20 |
| 08 | poster-day2.png | 2:3 | có | 20 |
| 09 | poster-day3.png | 2:3 | có | 20 |
| 10 | hero-home.png | 3:2 | có | 20 |
| 11 | stickers-a.png | 3:2 | có | 20 |
| 12 | stickers-b.png | 3:2 | - | 20 |
| 13 | map-taipei.png | 3:2 | - | 20 |
| 14 | app-icon.png | 1:1 | có | 20 |
| 15 | scene-complete.png | 3:2 | có | 20 |

Tấm 01 đã có rồi nên thực tế còn 14 lần sinh.

---

## 02 - Character sheet B (pose bổ sung)

Đính kèm character sheet A. Tỉ lệ 3:2.

```
[REF]

Character reference sheet: the same sea turtle in 4 new full-body poses on a plain white background, evenly spaced in a row, all the same size:
1. holding up a small colorful transit IC card with both hands, proud
2. cheering with both arms raised, eyes closed happily
3. sleeping curled up, peaceful, small sleep bubble
4. looking at a folded paper map, one hand on chin, thinking

Exactly the same character in every pose. No text.

[STYLE]
[NEGATIVE]
```

Cắt ra: `pose-card.png`, `pose-cheer.png`, `pose-sleep.png`, `pose-think.png`

---

## 03 - Spot: đồ ăn

Không cần ref. Tỉ lệ 3:2.

```
A set of 6 separate small hand-painted spot illustrations: a cup of bubble milk tea with a wide straw and dark tapioca pearls, a bamboo steamer of xiaolongbao with the lid tilted open and steam rising, a large Taiwanese fried chicken cutlet in a paper bag, a pineapple cake with one piece broken open, a small cup of hot oolong tea with a saucer, a bowl of shaved ice with mango on top.

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere.
```

Cắt ra: `food-bubbletea.png`, `food-xiaolongbao.png`, `food-chicken.png`, `food-pineapplecake.png`, `food-tea.png`, `food-shavedice.png`

---

## 04 - Spot: đi lại

```
A set of 6 separate small hand-painted spot illustrations: a colorful transit IC card, a Taipei MRT train car seen from the front, a city bus, a yellow taxi, an airplane seen from the side, a folded paper city map.

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere.
```

Cắt ra: `go-card.png`, `go-mrt.png`, `go-bus.png`, `go-taxi.png`, `go-plane.png`, `go-map.png`

---

## 05 - Spot: mua sắm và đồ vật

```
A set of 6 separate small hand-painted spot illustrations: a red paper lantern with a gold top and tassel, a glowing orange sky lantern floating at night, a small paper shopping bag with handles, a coin purse with a few gold coins spilling out, a smartphone taking a photo, a stamped paper postcard.

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere.
```

Cắt ra: `item-lantern.png`, `item-skylantern.png`, `item-bag.png`, `item-coins.png`, `item-phone.png`, `item-postcard.png`

---

## 06 - Spot: địa danh

```
A set of 6 separate small hand-painted spot illustrations: Taipei 101 tower with small green trees at its base, a night market food stall with a striped awning, a steep stone staircase lined with red lanterns, a traditional teahouse with a tiled roof, a busy shopping street sign arch, a small airport terminal building.

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere.
```

Cắt ra: `place-101.png`, `place-nightmarket.png`, `place-jiufen-stairs.png`, `place-teahouse.png`, `place-ximending.png`, `place-airport.png`

---

## 07 - Poster Day 1

Đính kèm character sheet A. **Tỉ lệ 2:3 dọc.**

```
[REF]

A travel poster in Japanese for day 1 of a trip to Taipei. Large rounded Japanese title at the top: 「台北に とうちゃく！」. A thin decorative border frames the whole poster, with a small red lantern hanging in each top corner.

Below the title, three horizontal panels stacked vertically, each with a small number badge (1, 2, 3) and a short Japanese caption on the left, illustration on the right:
1. 「ひこうきで しゅっぱつ」 - the turtle looking out an airplane window at clouds
2. 「悠遊卡を かう」 - the turtle at an MRT ticket gate holding up a colorful IC card
3. 「士林夜市の よる」 - the turtle at a night market food stall, red lanterns glowing, steam from the stalls

Warm cream paper background. All text in Japanese only, no English, no Chinese.

[STYLE]
[NEGATIVE]
```

---

## 08 - Poster Day 2

Tỉ lệ 2:3 dọc. Đây là tấm đẹp nhất, đáng sinh lại nếu chưa ưng.

```
[REF]

A travel poster in Japanese for day 2 of a trip to Taipei. Large rounded Japanese title at the top: 「九份と ゆうやけ」. A thin decorative border frames the whole poster, with a small red lantern hanging in each top corner.

Below the title, three horizontal panels stacked vertically, each with a small number badge (1, 2, 3) and a short Japanese caption on the left, illustration on the right:
1. 「台北101に のぼる」 - the turtle at a high observation deck window, city spread out far below
2. 「小籠包を たべる」 - the turtle at a restaurant table with a bamboo steamer, holding chopsticks
3. 「提灯の かいだん」 - the turtle standing on a steep stone staircase lined with glowing red lanterns at sunset, purple and orange sky

Warm cream paper background. All text in Japanese only, no English, no Chinese.

[STYLE]
[NEGATIVE]
```

---

## 09 - Poster Day 3

Tỉ lệ 2:3 dọc.

```
[REF]

A travel poster in Japanese for day 3 of a trip to Taipei. Large rounded Japanese title at the top: 「おみやげと バイバイ」. A thin decorative border frames the whole poster, with a small red lantern hanging in each top corner.

Below the title, three horizontal panels stacked vertically, each with a small number badge (1, 2, 3) and a short Japanese caption on the left, illustration on the right:
1. 「西門町を あるく」 - the turtle walking on a lively shopping street with colorful signs
2. 「タピオカを のむ」 - the turtle happily holding a big cup of bubble milk tea with a wide straw
3. 「またね、台湾」 - the turtle at an airport gate waving goodbye, small suitcase beside it, plane through the window

Warm cream paper background. All text in Japanese only, no English, no Chinese.

[STYLE]
[NEGATIVE]
```

---

## 10 - Hero màn chính

Tỉ lệ 3:2. Đây là ảnh người dùng nhìn nhiều nhất.

```
[REF]

Wide horizontal scene: the sea turtle standing on the left side, waving cheerfully with one hand, small suitcase beside it. Behind it on the right, a soft painted Taipei skyline at golden hour with Taipei 101 rising above the other buildings, a few red lanterns strung across the upper area, warm evening sky.

Leave the upper left area relatively empty and simple so text can be placed over it. No text in the image.

[STYLE]
[NEGATIVE]
```

---

## 11 - Sticker phần thưởng A (có nhân vật)

Tỉ lệ 3:2.

```
[REF]

A set of 6 separate small circular reward stickers on a plain white background, each a self-contained round badge with a soft painted edge:
1. the turtle giving a thumbs up
2. the turtle wearing a small graduation cap
3. the turtle holding a gold star above its head
4. the turtle with a bowl of noodles, happy face
5. the turtle riding a tiny MRT train
6. the turtle sleeping with a satisfied smile

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere.
```

---

## 12 - Sticker phần thưởng B (không nhân vật)

```
A set of 6 separate small circular reward stickers on a plain white background, each a self-contained round badge with a soft painted edge: a gold star, a small trophy, a red heart, a lit sky lantern, a hibiscus flower, a sea shell with a pearl.

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere.
```

---

## 13 - Bản đồ Đài Bắc

Tỉ lệ 3:2. Dùng làm màn tiến độ, 3 điểm mở khóa dần.

```
A simple hand-painted illustrated travel map of the Taipei area, seen from above at a playful tilted angle, like a children's storybook map. Warm cream paper background with soft painted coastline and green hills.

Three clear landmark clusters spread across the map with generous empty space between them:
- left: a night market with striped stalls and red lanterns
- center: Taipei 101 tower standing tall
- right: a hillside town with a staircase of red lanterns

A dotted path curves between the three clusters. Small painted trees and buildings fill the rest loosely. No text, no labels, no place names anywhere.

[STYLE]
[NEGATIVE]
```

---

## 14 - App icon

**Tỉ lệ 1:1.** Hiển thị rất nhỏ nên phải đơn giản.

```
[REF]

App icon: close-up of just the sea turtle's face and shoulders, centered, smiling warmly, looking straight ahead. Simple flat warm cream background with a subtle red lantern shape softly blurred behind. Very simple composition, strong silhouette, readable at small size. No text.

[STYLE]
[NEGATIVE]
```

---

## 15 - Màn hoàn thành

Tỉ lệ 3:2. Hiện khi học xong một bài.

```
[REF]

The sea turtle jumping happily in the air with both arms raised, eyes closed with joy, surrounded by a few floating gold stars and small confetti shapes. Simple soft cream background with a warm glow behind the character, nothing else. Centered composition. No text.

[STYLE]
[NEGATIVE]
```

---

## Sau khi sinh xong

Tải toàn bộ về một thư mục, đặt tên theo cột "File đích". Script xử lý sẽ tự làm:

1. Cắt tấm lưới 3x2 thành 6 file rời
2. Xóa nền trắng thành trong suốt, cắt sát viền
3. Resize: spot và sticker 512px, hero 1200px rộng, poster 1000px rộng, icon 512x512
4. Xuất WebP q82, kèm PNG dự phòng
5. Sinh file manifest cho service worker

Ước tính tổng dung lượng offline: 4-6MB.

## Nếu sinh hỏng

Đừng sinh lại ngay. Xem hỏng ở đâu trước:
- Sai bố cục lưới, hình dính nhau: thêm "more spacing between items"
- Nhân vật lệch: kiểm tra đã đính đúng character sheet chưa
- Nền bị ảnh chụp: khối [NEGATIVE] đã bị bỏ sót
- Chữ Nhật sai: giảm số chữ trong prompt, viết ngắn lại từng caption

Mỗi lần sửa prompt rồi mới sinh lại tiết kiệm được 20 credit so với sinh mù.
