/**
 * Chạy out/sw.js trong môi trường giả lập để kiểm tra phần offline mà không
 * cần trình duyệt.
 *
 *   npm run test-sw     (phải `npm run build` trước)
 *
 * Máy chủ giả bắt chước đúng cách Vercel phục vụ bản static export khi bật
 * cleanUrls: /trip.html bị 308 sang /trip. Đây là chỗ từng làm Safari chết
 * trang với câu "Response served by service worker has redirections", nên
 * bài test bắt luôn: response dùng để mở trang mà mang cờ redirected là hỏng.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.join(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");
const ORIGIN = "https://kame.test";

let online = true;

class FakeCache {
  store = new Map();

  async put(request, response) {
    this.store.set(keyOf(request), response);
  }

  async add(request) {
    const response = await fakeFetch(request);
    if (!response.ok) throw new Error(`add hỏng: ${keyOf(request)}`);
    await this.put(request, response);
  }

  async match(request, options = {}) {
    const key = keyOf(request);
    if (this.store.has(key)) return this.store.get(key);
    if (options.ignoreSearch) {
      const bare = key.split("?")[0];
      for (const [k, v] of this.store) if (k.split("?")[0] === bare) return v;
    }
    return undefined;
  }

  async keys() {
    return [...this.store.keys()];
  }
}

const caches = {
  boxes: new Map(),
  async open(name) {
    if (!this.boxes.has(name)) this.boxes.set(name, new FakeCache());
    return this.boxes.get(name);
  },
  async keys() {
    return [...this.boxes.keys()];
  },
  async delete(name) {
    return this.boxes.delete(name);
  },
};

function keyOf(request) {
  const raw = typeof request === "string" ? request : request.url;
  const url = new URL(raw, ORIGIN);
  return url.pathname + url.search;
}

function makeResponse(body, redirected) {
  return {
    ok: true,
    status: 200,
    statusText: "OK",
    type: "basic",
    redirected,
    headers: new Headers({ "content-length": String(body.length) }),
    async blob() {
      return new Blob([body]);
    },
    clone() {
      return makeResponse(body, redirected);
    },
    body,
  };
}

/** Bắt chước Vercel: cleanUrls bật, /x.html bị 308 sang /x rồi mới trả nội dung */
async function fakeFetch(request) {
  if (!online) throw new TypeError("Failed to fetch");

  const pathname = keyOf(request).split("?")[0];
  let redirected = false;
  let file = pathname;

  if (pathname.endsWith(".html")) {
    redirected = true;
  } else if (pathname === "/") {
    file = "/index.html";
  } else if (!path.extname(pathname)) {
    file = `${pathname}.html`;
  }

  try {
    return makeResponse(await readFile(path.join(OUT, file)), redirected);
  } catch {
    return { ok: false, status: 404, redirected: false, type: "basic" };
  }
}

const listeners = new Map();
const self = {
  location: new URL(`${ORIGIN}/sw.js`),
  addEventListener: (type, fn) => listeners.set(type, fn),
  skipWaiting: async () => {},
  clients: { claim: async () => {} },
};

const sandbox = {
  self,
  caches,
  fetch: fakeFetch,
  URL,
  Headers,
  Blob,
  Response,
  Request: class {
    constructor(url, init = {}) {
      this.url = new URL(url, ORIGIN).toString();
      this.method = init.method ?? "GET";
      this.mode = init.mode ?? "no-cors";
      this.cache = init.cache;
    }
  },
  Promise,
  console,
};
sandbox.globalThis = sandbox;

const code = await readFile(path.join(OUT, "sw.js"), "utf8");
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

function fire(type, event) {
  const fn = listeners.get(type);
  if (!fn) throw new Error(`sw.js không đăng ký listener "${type}"`);
  fn(event);
}

let installed;
fire("install", { waitUntil: (p) => (installed = p) });
await installed;

let activated;
fire("activate", { waitUntil: (p) => (activated = p) });
await activated;

const cacheName = (await caches.keys())[0];
const box = await caches.open(cacheName);
const cached = await box.keys();
console.log(`cài xong: cache "${cacheName}" giữ ${cached.length} file`);

let bad = 0;

// Response đã đi qua redirect mà nằm trong cache là Safari sẽ chết trang
const dirty = [];
for (const key of cached) {
  const response = await box.match(key);
  if (response?.redirected) dirty.push(key);
}
if (dirty.length) {
  bad += dirty.length;
  console.error(
    `HỎNG: ${dirty.length} response trong cache mang cờ redirected. ` +
      `Ví dụ: ${dirty.slice(0, 3).join(", ")}`,
  );
}

online = false;

async function ask(url, mode = "no-cors") {
  const request = new sandbox.Request(url, { mode });
  let answer;
  fire("fetch", { request, respondWith: (p) => (answer = p) });
  try {
    const response = await answer;
    if (!response) return "rỗng";
    if (mode === "navigate" && response.redirected) return "redirected (Safari chết)";
    return "ok";
  } catch (error) {
    return `HỎNG (${error.message})`;
  }
}

const checks = [
  ["/", "navigate"],
  ["/trip", "navigate"],
  ["/level/day2", "navigate"],
  ["/lesson/d3l2", "navigate"],
  ["/book", "navigate"],
  ["/stickers", "navigate"],
  ["/library", "navigate"],
  ["/art/hero-home.webp"],
  ["/art/scene-complete.webp"],
  ["/art/map-taipei.webp"],
  ["/manifest.webmanifest"],
  ["/icon-512.png"],
  ["/trip.txt?_rsc=abc123"],
];

const fonts = cached.filter((url) => url.endsWith(".woff2"));
const chunks = cached.filter((url) => url.endsWith(".js")).slice(0, 3);
for (const url of [...fonts, ...chunks]) checks.push([url]);

for (const [url, mode] of checks) {
  const result = await ask(url, mode);
  if (result !== "ok") bad++;
  console.log(`  ${result === "ok" ? "✓" : "✗"} ${url.padEnd(52)} ${result}`);
}

console.log(
  bad === 0
    ? `offline ok: ${checks.length} request đều lấy được từ cache, không có response redirect`
    : `offline HỎNG: ${bad} vấn đề`,
);
process.exit(bad === 0 ? 0 : 1);
