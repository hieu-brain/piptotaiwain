# Asset cần sinh lại - gộp vào 1 tấm

Bốn ô, một lần sinh, **20 credit**. Dùng lưới 2x2.

| Ô | Hỏng gì | Đang dùng cho |
|---|---|---|
| `pose-point` | mai và nửa bông dâm bụt bị cắt phẳng bên trái | 我是日本人, 請問, 不好意思 |
| `pose-think` | rìa mai bên trái bị cắt | 幾點, hình đại diện bài d2l3 |
| `pose-card` | mai và hoa dâm bụt bị cắt bên trái | 可以刷卡嗎 |
| `place-101-tall` | model vẽ ra tháp lưới trắng giống Tokyo Skytree, không phải 101 | 好高 |

## Prompt

Đính kèm character sheet A như mọi lần. Tỉ lệ 1:1 hoặc 3:2 đều được.

```
[REF]

A set of 4 separate hand-painted illustrations arranged in a clean 2x2 grid on pure white background, evenly spaced, no overlap, generous empty margin around each item, each item complete and not cropped:

1. the sea turtle standing and pointing forward with one front flipper, mouth open in a cheerful "look over there" expression, three-quarter view with the coral hibiscus on its carapace fully visible
2. the sea turtle holding an open paper map with both front flippers, looking down at it with a puzzled thinking expression, three-quarter view, backpack and full carapace visible
3. the sea turtle holding up a small colorful transit card in one front flipper, showing it to the viewer with a proud happy smile, three-quarter view, full carapace with hibiscus visible
4. Taipei 101 seen from the ground looking up: a tall tower built of eight stacked trapezoid segments that flare outward at the top of each segment, blue-green tinted glass, a tall thin spire on top, a wider pedestal base at street level, small green trees around the base, and the sea turtle standing at the foot of the tower drawn very small to show the scale

For items 1 to 3 the entire turtle including the full carapace, backpack and all limbs must be completely inside its cell with empty margin on all four sides. Nothing may touch or cross the edge of a cell.

[STYLE]
[NEGATIVE]
No text or lettering anywhere, no numbers.
```

## Sau khi sinh xong

Lưu đúng tên **`sheet-fix.png`** vào thư mục `Learning website mobile mockups/art/`
rồi báo tôi, hoặc tự chạy:

```
python3 scripts/cut-sheets.py            # cắt thử, xem báo cáo
python3 scripts/cut-sheets.py --write     # ghi đè 4 asset cũ
python3 scripts/check-art.py              # phải hết dòng "chờ sinh lại"
```

Script đã biết tấm này, tự dò lưới 2x2, cắt nền, crop sát và ghi đè đúng 4 tên trên.
Sau đó nhớ bỏ 4 tên đó khỏi `KNOWN_BROKEN` và `OK_TOUCHES_EDGE` trong
`scripts/check-art.py` để lần sau nó kiểm thật.
