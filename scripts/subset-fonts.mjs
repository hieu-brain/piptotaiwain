/**
 * Cắt font còn đúng số chữ app dùng, xuất woff2 vào fonts/.
 *
 *   npm run fonts
 *
 * Chạy lại khi thêm chữ mới vào UI hoặc vào kame-vocab.json.
 * Sau khi chạy, `npm run check-fonts` sẽ báo nếu còn chữ nào thiếu.
 *
 * Font gốc nằm trong .fonts-cache/ (không commit). Thiếu thì script tự tải,
 * chỉ tải lúc dựng font chứ app chạy không gọi mạng bao giờ.
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import subsetFont from "subset-font";
import { collectChars } from "./font-chars.mjs";

const ROOT = path.join(import.meta.dirname, "..");
const CACHE = path.join(ROOT, ".fonts-cache");
const OUT = path.join(ROOT, "fonts");

const GOOGLE_FONTS_RAW = "https://github.com/google/fonts/raw/main/ofl";

/** Font gốc cần có, kèm chỗ tải nếu cache trống */
const SOURCES = {
  "ZenMaruGothic-Regular.ttf": `${GOOGLE_FONTS_RAW}/zenmarugothic/ZenMaruGothic-Regular.ttf`,
  "ZenMaruGothic-Medium.ttf": `${GOOGLE_FONTS_RAW}/zenmarugothic/ZenMaruGothic-Medium.ttf`,
  "ZenMaruGothic-Bold.ttf": `${GOOGLE_FONTS_RAW}/zenmarugothic/ZenMaruGothic-Bold.ttf`,
  "ZenMaruGothic-Black.ttf": `${GOOGLE_FONTS_RAW}/zenmarugothic/ZenMaruGothic-Black.ttf`,
  "LXGWWenKaiTC-Regular.ttf": `${GOOGLE_FONTS_RAW}/lxgwwenkaitc/LXGWWenKaiTC-Regular.ttf`,
};

async function source(name) {
  const file = path.join(CACHE, name);
  try {
    await stat(file);
  } catch {
    console.log(`  tải ${name} ...`);
    const res = await fetch(SOURCES[name]);
    if (!res.ok) throw new Error(`tải ${name} hỏng: ${res.status}`);
    await mkdir(CACHE, { recursive: true });
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
  }
  return readFile(file);
}

const TARGETS = [
  { src: "ZenMaruGothic-Regular.ttf", out: "ZenMaruGothic-400.woff2", set: "jp" },
  { src: "ZenMaruGothic-Medium.ttf", out: "ZenMaruGothic-500.woff2", set: "jp" },
  { src: "ZenMaruGothic-Bold.ttf", out: "ZenMaruGothic-700.woff2", set: "jp" },
  { src: "ZenMaruGothic-Black.ttf", out: "ZenMaruGothic-900.woff2", set: "jp" },
  { src: "LXGWWenKaiTC-Regular.ttf", out: "LXGWWenKaiTC-400.woff2", set: "hanzi" },
];

const chars = await collectChars();
console.log(
  `chữ giữ lại: ${chars.jp.length} cho Zen Maru, ${chars.hanzi.length} cho WenKai TC`,
);

await mkdir(OUT, { recursive: true });
let total = 0;
for (const target of TARGETS) {
  const buf = await subsetFont(await source(target.src), chars[target.set], {
    targetFormat: "woff2",
  });
  await writeFile(path.join(OUT, target.out), buf);
  total += buf.length;
  console.log(`  ${target.out.padEnd(26)} ${(buf.length / 1024).toFixed(0)} KB`);
}
console.log(`tổng: ${(total / 1024).toFixed(0)} KB`);

// Ghi lại bộ chữ đã cắt để check-fonts đối chiếu, khỏi phải mở font ra đọc
await writeFile(
  path.join(OUT, "subset.json"),
  JSON.stringify(
    {
      hash: createHash("sha1").update(chars.jp + chars.hanzi).digest("hex").slice(0, 12),
      jp: chars.jp,
      hanzi: chars.hanzi,
    },
    null,
    2,
  ),
);
