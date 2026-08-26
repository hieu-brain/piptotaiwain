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

/**
 * Response nào đi qua redirect thì Safari không cho dùng để mở trang, nên
 * dựng lại thành một response 200 phẳng trước khi cất vào cache.
 */
async function flatten(response) {
  if (!response.redirected) return response;
  return new Response(await response.blob(), {
    status: 200,
    statusText: response.statusText,
    headers: response.headers,
  });
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // đi từng file: addAll là all-or-nothing, 1 file lỗi là hỏng cả mẻ
      await Promise.all(
        FILES.map(async (file) => {
          try {
            const response = await fetch(new Request(file, { cache: "reload" }));
            if (response.ok) await cache.put(file, await flatten(response));
          } catch {
            /* thiếu 1 file không đáng để hỏng cả lần cài */
          }
        }),
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
        const bare = url.pathname.replace(/\/+$/, "") || "/";
        for (const candidate of [url.pathname, bare, `${bare}.html`, "/"]) {
          const hit = await cache.match(candidate);
          if (hit) return hit;
        }
      }

      const hit = await cache.match(request, { ignoreSearch: true });
      if (hit) return hit;

      try {
        const response = await fetch(request);
        if (response.ok && response.type === "basic") {
          cache.put(request, await flatten(response.clone()));
        }
        return response;
      } catch (error) {
        if (request.mode === "navigate") {
          const fallback = await cache.match("/");
          if (fallback) return fallback;
        }
        throw error;
      }
    })(),
  );
});
