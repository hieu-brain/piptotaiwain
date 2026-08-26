/**
 * Chạy out/sw.js trong môi trường giả lập để kiểm tra phần offline mà không
 * cần trình duyệt: cài service worker khi "có mạng", rồi cắt mạng và xem
 * từng loại request có được phục vụ từ cache không.
 *
 *   npm run test-sw     (phải `npm run build` trước)
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.join(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");
const ORIGIN = "https://kame.test";

let online = true;

/** Cache giả, đủ dùng cho những gì sw.js gọi tới */
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
  async match(request) {
    for (const box of this.boxes.values()) {
      const hit = await box.match(request);
      if (hit) return hit;
    }
    return undefined;
  },
};

function keyOf(request) {
  const url = typeof request === "string" ? request : request.url;
  return new URL(url, ORIGIN).pathname + new URL(url, ORIGIN).search;
}

async function fakeFetch(request) {
  if (!online) throw new TypeError("Failed to fetch");
  const pathname = keyOf(request).split("?")[0];
  try {
    const body = await readFile(path.join(OUT, pathname));
    return { ok: true, type: "basic", status: 200, body, clone: () => ({ ...body }) };
  } catch {
    return { ok: false, type: "basic", status: 404, clone: () => null };
  }
}

// ---- dựng "self" của service worker ----
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

// ---- 1. cài đặt lúc còn mạng ----
let installed;
fire("install", { waitUntil: (p) => (installed = p) });
await installed;

let activated;
fire("activate", { waitUntil: (p) => (activated = p) });
await activated;

const cacheName = (await caches.keys())[0];
const cached = await (await caches.open(cacheName)).keys();
console.log(`cài xong: cache "${cacheName}" giữ ${cached.length} file`);

// ---- 2. cắt mạng rồi thử từng loại request ----
online = false;

async function ask(url, mode = "no-cors") {
  const request = new sandbox.Request(url, { mode });
  let answer;
  fire("fetch", { request, respondWith: (p) => (answer = p) });
  try {
    return (await answer) ? "ok" : "rỗng";
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

let bad = 0;
for (const [url, mode] of checks) {
  const result = await ask(url, mode);
  if (result !== "ok") bad++;
  console.log(`  ${result === "ok" ? "✓" : "✗"} ${url.padEnd(52)} ${result}`);
}

console.log(
  bad === 0
    ? `offline ok: ${checks.length} request đều lấy được từ cache khi không có mạng`
    : `offline HỎNG: ${bad}/${checks.length} request không phục vụ được`,
);
process.exit(bad === 0 ? 0 : 1);
