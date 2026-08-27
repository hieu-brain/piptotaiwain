/**
 * Gom toàn bộ ký tự mà app thật sự dùng: từ vựng trong kame-vocab.json
 * cộng với mọi copy nằm trong app/, components/, lib/.
 */

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");

/** Thư mục quét để gom chữ trong copy UI */
const SCAN_DIRS = ["app", "components", "lib"];
const SCAN_EXT = new Set([".ts", ".tsx", ".css"]);

function range(from, to) {
  let out = "";
  for (let c = from.codePointAt(0); c <= to.codePointAt(0); c++) {
    out += String.fromCodePoint(c);
  }
  return out;
}

/** Luôn giữ, kể cả khi hiện tại chưa dùng tới */
const ALWAYS =
  range(" ", "~") + // ASCII in được
  range("぀", "ゟ") + // hiragana
  range("゠", "ヿ") + // katakana
  "、。「」『』（）〜・ー…‥－―　" + // dấu câu tiếng Nhật + khoảng trắng full-width
  "！？：；，．０１２３４５６７８９" +
  "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ" + // pinyin có dấu
  "×÷±≒→←↑↓";

export async function collectChars() {
  const fromData = await readFile(path.join(ROOT, "data/kame-vocab.json"), "utf8");
  const vocab = JSON.parse(fromData);

  const hanzi = new Set();
  for (const level of vocab.levels) {
    for (const lesson of level.lessons) {
      for (const word of lesson.words) {
        for (const ch of word.hanzi) hanzi.add(ch);
      }
    }
  }
  // 你好！ trên màn Home không nằm trong vocab
  for (const ch of "你好！") hanzi.add(ch);

  const jp = new Set();
  for (const ch of fromData) jp.add(ch);

  for (const dir of SCAN_DIRS) {
    for (const file of await walk(path.join(ROOT, dir))) {
      if (!SCAN_EXT.has(path.extname(file))) continue;
      for (const ch of stripComments(await readFile(file, "utf8"))) jp.add(ch);
    }
  }

  for (const ch of ALWAYS) {
    jp.add(ch);
    hanzi.add(ch);
  }
  // chữ Hán trong copy tiếng Nhật cũng phải có trong font Nhật
  for (const ch of hanzi) jp.add(ch);

  const clean = (set) =>
    [...set]
      .filter((ch) => ch.codePointAt(0) >= 0x20 && ch !== "")
      .sort()
      .join("");

  return { hanzi: clean(hanzi), jp: clean(jp) };
}

/**
 * Bỏ comment trước khi gom chữ. Comment trong dự án này viết tiếng Việt,
 * đưa vào subset thì vừa phình font vừa làm check-fonts báo nhầm mỗi lần
 * thêm một chữ có dấu mới.
 * Chỉ cắt block comment và dòng bắt đầu bằng //, không đụng tới "https://"
 * nằm giữa dòng.
 */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("//"))
    .join("\n");
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

