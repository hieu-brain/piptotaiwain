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

# hình vốn có cạnh thẳng: thân tàu, thân xe, đáy túi giấy, đáy xửng, cổ tay
FLAT_BY_DESIGN = {
    "go-mrt", "go-bus", "go-taxi",
    "food-chicken", "food-xiaolongbao", "item-phone",
}


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
    if alpha.mean() > 0.97 or name in FLAT_BY_DESIGN:
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

for name, side, frac in bad:
    print(f"XÉN  {name:24} mép {side:5} {frac * 100:.0f}%")

print(f"\n{len(bad)} asset bị xén mép" if bad else "\nkhông có asset nào bị xén")
sys.exit(1 if bad else 0)
