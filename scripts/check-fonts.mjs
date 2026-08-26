/**
 * Chặn trường hợp thêm chữ mới vào UI mà quên chạy `npm run fonts`:
 * chữ nào không có trong subset sẽ rơi về font hệ thống, nhìn lệch hẳn.
 * Chạy trước mỗi lần build, không cần mạng.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { collectChars } from "./font-chars.mjs";

const OUT = path.join(import.meta.dirname, "../fonts/subset.json");

let built;
try {
  built = JSON.parse(await readFile(OUT, "utf8"));
} catch {
  console.error("Chưa có fonts/subset.json. Chạy: npm run fonts");
  process.exit(1);
}

const wanted = await collectChars();
const missing = {
  jp: [...wanted.jp].filter((ch) => !built.jp.includes(ch)),
  hanzi: [...wanted.hanzi].filter((ch) => !built.hanzi.includes(ch)),
};

const count = missing.jp.length + missing.hanzi.length;
if (count === 0) {
  console.log(`font ok: ${built.jp.length} chữ Zen Maru, ${built.hanzi.length} chữ WenKai TC`);
  process.exit(0);
}

console.error(`Thiếu ${count} chữ trong font đã cắt. Chạy: npm run fonts`);
if (missing.jp.length) console.error(`  Zen Maru : ${missing.jp.join("")}`);
if (missing.hanzi.length) console.error(`  WenKai TC: ${missing.hanzi.join("")}`);
process.exit(1);
