# Vòng 2 - hình riêng cho từng từ

Bám đúng quy trình của `kame-assets.md`: mỗi lần sinh là một tấm lưới 3x2 = 6 hình = 20 credit.
Dùng lại nguyên các khối `[STYLE]` `[NEGATIVE]` `[REF]` `[GRID]` trong file đó.

## Vì sao cần

Hiện 89 từ chia nhau 34 hình, nên nhiều từ phải dùng chung. Chỗ tệ nhất:

| Bài | Tình trạng |
|---|---|
| d3l2 タピオカ | **8/8 từ** dùng chung `food-bubbletea` - mà đây là bài đinh |
| d2l1 台北101 | **6/8 từ** dùng chung `place-101` |
| d2l2 小籠包 | **6/8 từ** dùng chung `food-xiaolongbao` |
| d3l1 西門町 | 5/8 dùng chung `place-ximending` |
| d2l3 九份へ | 4 từ `go-map` + 4 từ `go-bus` |
| d1l2 悠遊卡 | 4 từ `go-mrt` + 3 từ `go-card` |
| d1l1 あいさつ | 3 từ `pose-point`, 2 từ rơi về hình bài |

9 tấm dưới đây = 54 hình mới = **180 credit**. Xếp theo thứ tự đáng làm trước.
Làm tới đâu gửi tới đó cũng được, không cần làm hết một lượt.

## Hai nguyên tắc trước khi sinh

**Không để chữ trong ảnh.** Kể cả số mét của 台北101. Model vẽ chữ hay sai, mà
sai thì phải sinh lại tốn thêm 20 credit. Bảng hiệu, biển báo, màn hình trong
tranh cứ để trống. Muốn hiện `508m` hay tên địa danh thì báo tôi, tôi cho app
in đè bằng đúng font của app - nét sắc, sửa lúc nào cũng được, không tốn credit.

**Toàn thân phải nằm trong khung, chừa lề bốn phía.** Đây là lỗi đã làm hỏng
`pose-point`, `pose-think`, `pose-card` ở vòng 1. Khối `[GRID]` có sẵn câu này,
đừng cắt bớt.

---

## 16 - Trà sữa: gọi đồ theo kiểu Đài Loan

Ưu tiên số 1. Bài đinh mà 8 từ chung một hình.

```
[REF]

A set of 6 separate small hand-painted spot illustrations, each showing the same sea turtle character or a drink, all about ordering bubble tea:
1. a cup of milk tea beside two sugar cubes, one cube neatly cut in half
2. a cup of milk tea beside one very small single sugar cube
3. a tall cup of iced milk tea with only two small ice cubes in it
4. a tall cup of milk tea with no ice at all, sitting beside an empty ice tray
5. two cups side by side, one clearly small and one clearly large, the turtle hugging the large one with both arms
6. a split scene: on the left a cup on a small cafe table, on the right the same cup inside a paper takeaway bag carried by the turtle

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere, no numbers, no signs.
```

Cắt ra: `drink-half-sugar`, `drink-less-sugar`, `drink-less-ice`, `drink-no-ice`, `drink-large`, `drink-takeout`

---

## 17 - Đài Bắc 101

Có mấy ý bạn đã gợi: mua 2 vé, thang máy, rùa bé xíu cạnh tháp.

```
[REF]

A set of 6 separate small hand-painted spot illustrations of the same sea turtle at a tall observation tower:
1. the turtle at a ticket counter holding up two fingers, two paper tickets lying on the counter
2. the turtle standing at a huge observation window, a tiny city spread far below
3. an elevator with its doors open, the turtle stepping in, simple button panel on the wall
4. a very tall slender tower seen from the ground, the turtle standing at its base looking straight up, drawn very small to show how tall the tower is
5. the turtle looking out at a glittering night city view, eyes wide with delight, small sparkles in the air
6. the turtle and a friendly small bird taking a photo together with a phone held at arm's length

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere, no numbers on the elevator panel or tickets.
```

Cắt ra: `act-buy-ticket`, `place-observatory`, `place-elevator`, `place-101-tall`, `pose-amazed`, `act-selfie`

Ghi chú: `place-101-tall` là tấm để in đè `508m`.

---

## 18 - Quán ăn: gọi món, tính tiền

```
[REF]

A set of 6 separate small hand-painted spot illustrations of the same sea turtle in a small restaurant:
1. the turtle standing at the restaurant entrance holding up two fingers, smiling
2. a small round table set for two people, chopsticks on rests, a teapot in the middle, nobody sitting
3. the turtle holding an open menu with both hands, one arm raised to call the waiter
4. the turtle pointing with one finger at a dish photo inside an open menu
5. an empty bamboo steamer beside a fresh full steamer of dumplings, steam rising from the full one
6. a small tray on a table with a folded paper slip and a few coins on it, the turtle placing a coin down

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere, the menu pages show only small painted food shapes, no words.
```

Cắt ra: `act-two-people`, `place-table-for-two`, `act-order`, `act-point-menu`, `food-one-more`, `act-pay`

---

## 19 - Chào hỏi và cảm ơn

Sáu từ đầu tiên bạn học, mà đang dùng chung 2 hình.

```
[REF]

A set of 6 separate small hand-painted full-body poses of the same sea turtle on a plain white background:
1. bowing politely with both front flippers together in front, grateful expression
2. one flipper raised in a relaxed friendly wave, easy smile, meaning "no problem at all"
3. head lowered, shoulders down, apologetic expression, one small sweat drop near the cheek
4. one flipper raised straight up politely as if asking a question, eager face
5. pointing at its own chest with one flipper, cheerful, a tiny round Japanese flag pin on its orange backpack strap
6. shaking hands warmly with a friendly human hand entering from the side of the frame

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere.
```

Cắt ra: `pose-thanks`, `pose-no-problem`, `pose-sorry`, `pose-ask`, `pose-myself`, `act-handshake`

---

## 20 - Thẻ 悠遊卡 và tàu điện

```
[REF]

A set of 6 separate small hand-painted spot illustrations of the same sea turtle using city transport:
1. the turtle tapping a colorful transit card on a round reader at a ticket gate, small light on the reader
2. a ticket vending machine with a coin slot, the turtle standing in front of it holding coins
3. a card being held against a top-up machine, a few coins beside it
4. the turtle on a platform beside an open train door, looking up at a blank overhead sign board
5. a large train station building seen from outside, wide steps, small trees
6. the turtle asking a friendly passerby for directions, the passerby pointing down the street

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere, the sign board and machine screens are blank.
```

Cắt ra: `act-tap-card`, `act-buy-card`, `act-topup`, `place-platform`, `place-station`, `act-ask-way`

---

## 21 - Xe buýt lên Cửu Phần

```
[REF]

A set of 6 separate small hand-painted spot illustrations of the same sea turtle travelling by bus:
1. a bus stop pole with a small bench, the turtle sitting and waiting with its backpack
2. the turtle standing beside the bus driver's seat asking a question, the driver a friendly figure
3. the inside of a bus, the turtle holding a hanging strap, a blank display above the door
4. the turtle reaching up to press a round stop-request button on the bus wall
5. a winding mountain road with the bus climbing between green hills, seen from a distance
6. the turtle stepping down off the bus onto a stone street

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere, the bus destination display is blank.
```

Cắt ra: `act-wait-bus`, `act-ask-driver`, `place-bus-inside`, `act-stop-button`, `go-mountain-road`, `act-get-off`

---

## 22 - Cửu Phần chiều tà

Bạn muốn cảnh nổi tiếng của Cửu Phần. Tấm 1 là góc ai cũng nhận ra: quán trà
gỗ nhiều tầng treo đèn lồng đỏ nhìn từ dưới bậc thang lên.

```
[REF]

A set of 6 separate small hand-painted spot illustrations of a hillside old town at sunset:
1. a tall wooden multi-storey teahouse building with many red lanterns hanging along its balconies, seen looking up from the stone steps below
2. a narrow covered old street between wooden shopfronts, red lanterns overhead, a few small figures walking
3. the sun setting over hills and the sea seen from high up, warm orange and purple sky
4. the turtle standing on a stone step looking out at that sunset, seen from behind, small
5. a small tea table with a clay teapot and two tiny cups, steam rising, a window with hills behind
6. the turtle sitting on a wooden bench inside a teahouse, holding a tiny cup with both flippers

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere, no shop signs with words.
```

Cắt ra: `place-jiufen-teahouse`, `place-jiufen-street`, `place-sunset`, `pose-watch-sunset`, `food-teaset`, `act-drink-tea`

---

## 23 - Mua sắm ở 西門町

```
[REF]

A set of 6 separate small hand-painted spot illustrations of the same sea turtle shopping for clothes:
1. the turtle holding a t-shirt up against its own body in front of a tall mirror
2. three t-shirts on hangers in three clearly different colors, side by side on a rail
3. two t-shirts laid side by side, one clearly small and one clearly large
4. a paper price tag hanging on a string, the turtle beside it with a shocked face, both flippers on its cheeks
5. the turtle with both front flippers pressed together pleading, a friendly shopkeeper figure behind a counter
6. the turtle strolling along a clothing rack with flippers behind its back, just browsing casually

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere, the price tag is blank.
```

Cắt ra: `act-try-on`, `item-colors`, `item-sizes`, `pose-shocked`, `act-bargain`, `pose-browsing`

---

## 24 - Chợ đêm và quà

```
[REF]

A set of 6 separate small hand-painted spot illustrations of the same sea turtle at a night market and a gift shop:
1. the turtle pointing curiously at an unfamiliar dish on a food stall counter
2. the turtle holding up one finger to order at a stall, the vendor a friendly figure
3. a small tray of bite-size samples with toothpicks in them on a stall counter
4. the turtle with a red face fanning its open mouth with a flipper, a tiny chili beside it
5. the turtle leaning back with a round full belly, satisfied closed eyes, empty plates in front
6. a gift box tied with a ribbon beside a stack of pineapple cake boxes, the turtle offering one with both flippers

[GRID]
[STYLE]
[NEGATIVE]
No text or lettering anywhere, no shop signs with words.
```

Cắt ra: `act-whats-this`, `act-order-one`, `food-sample`, `pose-spicy`, `pose-full`, `act-gift`

---

## Sau khi sinh xong

Tải tấm lưới về, để nguyên trong `assets/` với tên `sheet-16.png`, `sheet-17.png`...
rồi báo tôi. Việc còn lại tôi làm: cắt lưới, xoá nền, crop sát, xuất webp, cập nhật
`manifest.json`, nối vào `WORD_ART`, kiểm mép bằng `scripts/check-art.py`.

Bảng nối từ vào hình mới, để sẵn đây cho khỏi phải nghĩ lại:

| Từ | Hình mới |
|---|---|
| 半糖 / 微糖 / 少冰 / 去冰 / 大杯 / 內用還是外帶 | `drink-half-sugar` / `drink-less-sugar` / `drink-less-ice` / `drink-no-ice` / `drink-large` / `drink-takeout` |
| 我要兩張票 / 觀景台 / 電梯 / 好高 / 好漂亮 / 一起拍 | `act-buy-ticket` / `place-observatory` / `place-elevator` / `place-101-tall` / `pose-amazed` / `act-selfie` |
| 幾位 / 兩位 / 我要點餐 / 這個 / 再一份 / 買單 | `act-two-people` / `place-table-for-two` / `act-order` / `act-point-menu` / `food-one-more` / `act-pay` |
| 謝謝 / 不客氣 / 對不起 / 請問 / 我是日本人 / 謝謝你的幫忙 | `pose-thanks` / `pose-no-problem` / `pose-sorry` / `pose-ask` / `pose-myself` / `act-handshake` |
| 悠遊卡 / 我要買悠遊卡 / 加值 / 這班車去台北嗎 / 台北車站 / 車站在哪裡 | `act-tap-card` / `act-buy-card` / `act-topup` / `place-platform` / `place-station` / `act-ask-way` |
| 公車 / 在哪裡下車 / 下一站 / 我要下車 / 怎麼去 / 要多久 | `act-wait-bus` / `act-ask-driver` / `place-bus-inside` / `act-stop-button` / `go-mountain-road` / `act-get-off` |
| 九份 / 老街 / 夕陽 / 好美 / 我想喝茶 / 可以坐這裡嗎 | `place-jiufen-teahouse` / `place-jiufen-street` / `place-sunset` / `pose-watch-sunset` / `food-teaset` / `act-drink-tea` |
| 可以試穿嗎 / 有別的顏色嗎 / 大一點 / 太貴了 / 便宜一點 / 我只是看看 | `act-try-on` / `item-colors` / `item-sizes` / `pose-shocked` / `act-bargain` / `pose-browsing` |
| 這是什麼 / 我要一個 / 可以試吃嗎 / 太辣了 / 我吃飽了 / 有推薦的嗎 | `act-whats-this` / `act-order-one` / `food-sample` / `pose-spicy` / `pose-full` / `act-gift` |

Xong 9 tấm thì 54/89 từ có hình riêng đúng nghĩa, những từ còn lại đã có hình
hợp sẵn từ vòng 1.
