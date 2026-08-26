# Asset cần sinh lại

Ba tấm dưới đây bị xén mất một phần mai rùa ở mép trái ngay từ khâu cắt ảnh gốc,
pixel đã mất nên không vá lại được, phải sinh lại.

| File | Hỏng gì | Đang dùng cho |
|---|---|---|
| `pose-point` | mai và nửa bông dâm bụt bị cắt phẳng bên trái | 我是日本人, 請問, 不好意思, hình đại diện bài d3l1 |
| `pose-think` | rìa mai bên trái bị cắt | 對不起, 幾點, hình đại diện bài d2l3 |
| `pose-card` | mai và hoa dâm bụt bị cắt bên trái | 可以刷卡嗎 |

## Cách sinh

Dán từng prompt một. Phần **khung hình** là chỗ quan trọng nhất, chính nó là
nguyên nhân của lần hỏng vừa rồi.

### Khối mô tả chung (giữ nguyên ở cả 3 prompt)

> Children's watercolor storybook illustration on white background. A cute baby
> sea turtle from Okinawa: soft green skin with teal spotted patterns, cream
> plastron (belly shell), a teal-green carapace decorated with a coral-orange
> hibiscus flower on the side, wearing a small orange backpack with straps over
> both shoulders. Gentle watercolor washes, soft pencil outlines, warm and
> friendly, no harsh black lines, no digital gradients, no cel shading.
>
> **Framing: the entire turtle including the full carapace, backpack and all
> limbs must be completely inside the frame with generous empty margin on all
> four sides. Nothing may touch or cross the image border.** Centered composition,
> plain white background with no scenery, no shadow on the ground, no text.

### 1. pose-point

> [khối mô tả chung] The turtle stands and points forward with one front flipper,
> mouth open in a cheerful "look over there!" expression, the other flipper
> relaxed at its side. Three-quarter view, body turned slightly to the side so
> the hibiscus on the carapace is visible.

### 2. pose-think

> [khối mô tả chung] The turtle stands holding an open paper map with both front
> flippers, looking down at it with a puzzled, thinking expression, one flipper
> touching its chin. Three-quarter view, the backpack and the full carapace
> visible behind.

### 3. pose-card

> [khối mô tả chung] The turtle stands holding up a small colorful transit card
> (pastel stripes) in one front flipper, showing it to the viewer with a proud,
> happy smile. Three-quarter view, full carapace with hibiscus visible.

## Sau khi sinh xong

Ném file PNG thô vào thư mục `assets/` với tên bất kỳ rồi báo, phần cắt nền,
crop, xuất webp và cập nhật `manifest.json` đã có sẵn quy trình, chạy lại là xong.
Nhớ kiểm tra lại bằng cách quét mép ảnh trước khi thay vào app.
