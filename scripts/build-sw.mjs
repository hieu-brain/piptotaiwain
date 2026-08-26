/**
 * Chạy sau `next build`: quét thư mục out/, dựng danh sách precache và
 * ghi ra out/sw.js. VERSION là hash của chính danh sách đó, nên chỉ cần
 * có 1 file đổi là cache cũ bị bỏ.
 */

import { createHash } from "node:crypto";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");

/** Không cần nằm trong cache */
const SKIP = new Set(["sw.js", ".DS_Store"]);

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full)));
    else found.push(full);
  }
  return found;
}

const files = (await walk(OUT)).sort();
const entries = await Promise.all(
  files.map(async (file) => {
    const url = `/${path.relative(OUT, file).split(path.sep).join("/")}`;
    const { size } = await stat(file);
    return { url, size };
  }),
);

const version = createHash("sha1")
  .update(entries.map((e) => `${e.url}:${e.size}`).join("\n"))
  .digest("hex")
  .slice(0, 10);

const urls = entries.map((e) => e.url);
const total = entries.reduce((sum, e) => sum + e.size, 0);

const template = await readFile(path.join(ROOT, "scripts/sw-template.js"), "utf8");
// replaceAll chứ không phải replace: hai placeholder còn xuất hiện trong
// phần chú thích đầu khuôn, thay hụt là sw.js hỏng cú pháp
const sw = template
  .replaceAll("__VERSION__", version)
  .replaceAll("__FILES__", JSON.stringify(urls, null, 0));

await writeFile(path.join(OUT, "sw.js"), sw);

console.log(
  `sw.js: ${urls.length} file, ${(total / 1024 / 1024).toFixed(1)} MB, version ${version}`,
);
