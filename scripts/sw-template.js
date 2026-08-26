/**
 * Service worker viết tay. File này là khuôn: `npm run build` điền phiên bản
 * và danh sách file thật vào rồi ghi ra out/sw.js.
 *
 * Chiến lược: precache toàn bộ bản build (~5MB) lúc cài, sau đó cache-first.
 * Đổi bản build là VERSION đổi, cache cũ bị xóa sạch ở bước activate.
 */

const VERSION = "__VERSION__";
const CACHE = `kame-${VERSION}`;
const FILES = __FILES__;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // addAll là all-or-nothing: 1 file lỗi là hỏng cả mẻ, nên đi từng file
      await Promise.all(
        FILES.map((file) =>
          cache.add(new Request(file, { cache: "reload" })).catch(() => {}),
        ),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);

      // Bản static export: /trip nằm trong file trip.html
      if (request.mode === "navigate") {
        const bare = url.pathname.replace(/\/$/, "");
        for (const candidate of [
          url.pathname,
          `${bare}.html`,
          `${bare}/index.html`,
          "/index.html",
        ]) {
          const hit = await cache.match(candidate);
          if (hit) return hit;
        }
      }

      const hit = await cache.match(request, { ignoreSearch: true });
      if (hit) return hit;

      try {
        const response = await fetch(request);
        if (response.ok && response.type === "basic") {
          cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        if (request.mode === "navigate") {
          const fallback = await cache.match("/index.html");
          if (fallback) return fallback;
        }
        throw error;
      }
    })(),
  );
});
