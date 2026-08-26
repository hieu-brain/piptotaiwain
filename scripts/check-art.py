"""
Quét asset tìm hình bị xén mép, chạy: python3 scripts/check-art.py

Cách nhận biết: đo đoạn pixel đặc liền nhau nằm sát mép ảnh. Hình chỉ tiếp
tuyến với khung để lại đoạn ngắn, hình bị cắt để lại một đoạn thẳng dài.
Không sửa được bằng code, chỉ báo để sinh lại (xem kame-assets-todo.md).
"""

import glob
import os
import sys

import numpy as np
from PIL import Image

ART = os.path.join(os.path.dirname(__file__), "..", "public", "art")
LIMIT = 0.20

# Chạm mép là đúng, không phải lỗi. Đã soi từng cái bằng mắt.
# Vòng 1: thân tàu, thân xe, đáy túi giấy, đáy xửng, cổ tay người.
# Vòng 2: phần lớn là khung tranh chữ nhật nên nội dung chạm mép là hiển nhiên,
# vài cái là chi tiết cố ý chạy ra mép (bàn tay bắt tay, quầy hàng, giá treo đồ).
OK_TOUCHES_EDGE = {
    "go-mrt", "go-bus", "go-taxi",
    "food-chicken", "food-xiaolongbao", "item-phone",
    "act-ask-way", "act-bargain", "act-handshake", "act-order-one", "act-selfie",
    "act-topup", "act-try-on", "act-two-people", "act-wait-bus", "act-whats-this",
    "drink-less-sugar", "drink-takeout", "place-101-tall", "place-observatory",
    "place-platform", "place-station", "pose-amazed", "pose-browsing",
}

# Hỏng thật, đang chờ sinh lại, xem kame-assets-todo.md
KNOWN_BROKEN = {"pose-point", "pose-think", "pose-card"}


def longest_run(line):
    best = cur = 0
    for value in line:
        cur = cur + 1 if value else 0
        best = max(best, cur)
    return best


bad = []
for file in sorted(glob.glob(os.path.join(ART, "*.webp"))):
    name = os.path.basename(file)[:-5]
    image = Image.open(file).convert("RGBA")
    alpha = np.array(image)[:, :, 3] > 150
    if alpha.mean() > 0.97 or name in OK_TOUCHES_EDGE:
        continue
    height, width = alpha.shape
    edges = {
        "trái": longest_run(alpha[:, 0]) / height,
        "phải": longest_run(alpha[:, -1]) / height,
        "trên": longest_run(alpha[0, :]) / width,
        "dưới": longest_run(alpha[-1, :]) / width,
    }
    side, frac = max(edges.items(), key=lambda kv: kv[1])
    if frac > LIMIT:
        bad.append((name, side, frac))

fresh = [b for b in bad if b[0] not in KNOWN_BROKEN]
known = [b for b in bad if b[0] in KNOWN_BROKEN]

for name, side, frac in fresh:
    print(f"XÉN MỚI  {name:24} mép {side:5} {frac * 100:.0f}%")
for name, side, frac in known:
    print(f"chờ sinh lại  {name:24} mép {side:5} {frac * 100:.0f}%")

if fresh:
    print(f"\n{len(fresh)} asset mới bị xén, cần soi lại")
else:
    print(f"\nkhông có asset mới nào bị xén ({len(known)} cái đang chờ sinh lại)")
sys.exit(1 if fresh else 0)
