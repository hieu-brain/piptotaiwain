"""
Cắt tấm lưới do GPT Image sinh ra thành từng asset rời.

    python3 scripts/cut-sheets.py            # cắt thử, ghi vào scratch/
    python3 scripts/cut-sheets.py --write     # ghi thật vào assets/ và public/art/

Từng bước:
1. Dò rãnh nền để tìm lưới, không đoán theo tỉ lệ ảnh vì tấm dọc vẫn có thể
   xếp 3 cột.
2. Mỗi ô: tô loang từ 4 góc để xoá nền, giữ nguyên phần trắng nằm bên trong
   hình (áo trắng, giấy, sữa trong cốc).
3. Crop sát viền, resize cạnh dài về 512, xuất webp + png.
4. Báo ô nào bị chạm mép để biết mà sinh lại.
"""

import os
import sys
from collections import deque

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.join(os.path.dirname(__file__), "..")
SRC = os.path.join(ROOT, "Learning website mobile mockups", "art")
SCRATCH = os.path.join(ROOT, "scratch-cut")

MAX_SIDE = 512
FLOOD_TOLERANCE = 32

# Tên file nguồn nhận ra bằng mắt (xem kame-assets-round2.md), kèm tên từng ô
# theo thứ tự đọc trái sang phải, trên xuống dưới.
SHEETS = [
    (
        "Firefly_gpt-image_[REF]_A set of 6 separate small hand-painted spot illustrations of the same sea turtl 986853.png",
        ["act-wait-bus", "act-ask-driver", "place-bus-inside", "act-stop-button", "go-mountain-road", "act-get-off"],
    ),
    (
        "Firefly_gpt-image_[REF]__A set of 6 separate small hand-painted full-body poses of the same sea turtle  986853.png",
        ["pose-thanks", "pose-no-problem", "pose-sorry", "pose-ask", "pose-myself", "act-handshake"],
    ),
    (
        "Firefly_gpt-image_[REF]__A set of 6 separate small hand-painted spot illustrations of a hillside old to 986853.png",
        ["place-jiufen-teahouse", "place-jiufen-street", "place-sunset", "pose-watch-sunset", "food-teaset", "act-drink-tea"],
    ),
    (
        "Firefly_gpt-image_[REF]__A set of 6 separate small hand-painted spot illustrations of the same sea turt 116965.png",
        ["act-whats-this", "act-order-one", "food-sample", "pose-spicy", "pose-full", "act-gift"],
    ),
    (
        "Firefly_gpt-image_[REF]__A set of 6 separate small hand-painted spot illustrations of the same sea turt 986853 (1).png",
        ["act-tap-card", "act-buy-card", "act-topup", "place-platform", "place-station", "act-ask-way"],
    ),
    (
        "Firefly_gpt-image_[REF]__A set of 6 separate small hand-painted spot illustrations of the same sea turt 986853 (2).png",
        ["act-two-people", "place-table-for-two", "act-order", "act-point-menu", "food-one-more", "act-pay"],
    ),
    (
        "Firefly_gpt-image_[REF]__A set of 6 separate small hand-painted spot illustrations of the same sea turt 986853 (3).png",
        ["act-buy-ticket", "place-observatory", "place-elevator", "place-101-tall", "pose-amazed", "act-selfie"],
    ),
    (
        "Firefly_gpt-image_[REF]__A set of 6 separate small hand-painted spot illustrations of the same sea turt 986853.png",
        ["act-try-on", "item-colors", "item-sizes", "pose-shocked", "act-bargain", "pose-browsing"],
    ),
    (
        "Firefly_gpt-image_[REF]__A set of 6 separate small hand-painted spot illustrations, each showing the sa 986853.png",
        ["drink-half-sugar", "drink-less-sugar", "drink-less-ice", "drink-no-ice", "drink-large", "drink-takeout"],
    ),
    # Tấm sửa lỗi: 3 pose bị xén mai ở vòng 1 và toà tháp vẽ nhầm thành Skytree.
    # Lưu tấm sinh ra với đúng tên này rồi chạy lại script.
    (
        "sheet-fix.png",
        ["pose-point", "pose-think", "pose-card", "place-101-tall"],
    ),
]


def background_color(image):
    """Màu nền lấy từ viền ảnh, dùng trung vị cho khỏi dính vệt lem."""
    a = np.array(image.convert("RGB"))
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    return np.median(border, axis=0)


def bands(profile, min_size):
    """Từ mảng cờ 'dòng này là nền' trả về các dải nội dung liền nhau."""
    out = []
    start = None
    for i, is_gap in enumerate(profile):
        if not is_gap and start is None:
            start = i
        elif is_gap and start is not None:
            if i - start >= min_size:
                out.append((start, i))
            start = None
    if start is not None and len(profile) - start >= min_size:
        out.append((start, len(profile)))
    return out


def find_grid(image, want=6):
    """
    Dò lưới bằng rãnh nền. Ngưỡng "thế nào là rãnh" phải nới dần, vì có tấm
    các ô sát nhau và vệt màu nước lem sang cả rãnh. Dừng ngay khi ra đúng
    số ô cần và lưới có dạng hợp lý.
    """
    a = np.array(image.convert("RGB")).astype(int)
    bg = background_color(image)
    h, w = a.shape[:2]

    best = None
    for tone in (26, 34, 44):
        content = np.abs(a - bg).max(axis=2) > tone
        for slack in (0.005, 0.01, 0.02, 0.035, 0.05):
            cols = bands(content.sum(axis=0) < h * slack, w * 0.06)
            rows = bands(content.sum(axis=1) < w * slack, h * 0.06)
            if len(cols) * len(rows) == want and max(len(cols), len(rows)) <= 6:
                return cols, rows
            if best is None:
                best = (cols, rows)
    return best


def cut_cell(image, box):
    cell = image.crop(box).convert("RGB")
    w, h = cell.size
    work = cell.copy()
    mark = (255, 0, 255)
    seeds = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
             (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)]
    for seed in seeds:
        try:
            ImageDraw.floodfill(work, seed, mark, thresh=FLOOD_TOLERANCE)
        except ValueError:
            pass

    a = np.array(work)
    killed = (a[:, :, 0] == 255) & (a[:, :, 1] == 0) & (a[:, :, 2] == 255)
    alpha = np.where(killed, 0, 255).astype("uint8")
    out = cell.convert("RGBA")
    out.putalpha(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.6)))

    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    if max(out.size) > MAX_SIDE:
        scale = MAX_SIDE / max(out.size)
        out = out.resize((round(out.width * scale), round(out.height * scale)), Image.LANCZOS)
    return out


def longest_run(line):
    best = cur = 0
    for value in line:
        cur = cur + 1 if value else 0
        best = max(best, cur)
    return best


def edge_report(image):
    alpha = np.array(image)[:, :, 3] > 150
    if not alpha.any():
        return "rỗng"
    h, w = alpha.shape
    # ô dạng khung tranh chữ nhật thì chạm mép là đúng, không phải bị xén
    if alpha.mean() > 0.85:
        return "khung tranh"
    edges = {
        "trái": longest_run(alpha[:, 0]) / h,
        "phải": longest_run(alpha[:, -1]) / h,
        "trên": longest_run(alpha[0, :]) / w,
        "dưới": longest_run(alpha[-1, :]) / w,
    }
    side, frac = max(edges.items(), key=lambda kv: kv[1])
    return f"XÉN mép {side} {frac*100:.0f}%" if frac > 0.2 else "ok"


def main():
    write = "--write" in sys.argv
    out_dir = os.path.join(ROOT, "assets") if write else SCRATCH
    os.makedirs(out_dir, exist_ok=True)
    if not write:
        os.makedirs(SCRATCH, exist_ok=True)

    total = 0
    for filename, names in SHEETS:
        path = os.path.join(SRC, filename)
        if not os.path.exists(path):
            print(f"THIẾU: {filename[:60]}")
            continue

        image = Image.open(path)
        cols, rows = find_grid(image, want=len(names))
        print(f"\n{filename[18:60]}...")
        print(f"  {image.size[0]}x{image.size[1]} -> lưới {len(cols)} cột x {len(rows)} hàng")

        if len(cols) * len(rows) != len(names):
            print(f"  BỎ QUA: dò ra {len(cols)*len(rows)} ô, cần {len(names)}")
            continue

        i = 0
        for r0, r1 in rows:
            for c0, c1 in cols:
                piece = cut_cell(image, (c0, r0, c1, r1))
                name = names[i]
                piece.save(os.path.join(out_dir, f"{name}.png"))
                piece.save(os.path.join(out_dir, f"{name}.webp"), quality=88, method=6)
                kb = os.path.getsize(os.path.join(out_dir, f"{name}.webp")) // 1024
                print(f"    {name:24} {piece.size[0]:>3}x{piece.size[1]:<3} {kb:>3}KB  {edge_report(piece)}")
                i += 1
                total += 1

    print(f"\ncắt xong {total} asset -> {out_dir}")


if __name__ == "__main__":
    main()
