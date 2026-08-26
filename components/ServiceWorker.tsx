"use client";

import { useEffect } from "react";

/**
 * Đăng ký service worker, chỉ ở bản build thật.
 *
 * Cache-first nghĩa là trang đang mở vẫn là bản cũ dù đã deploy bản mới.
 * Khi service worker mới giành quyền điều khiển thì nạp lại đúng 1 lần,
 * để khỏi phải dặn nhau "mở app hai lần cho ăn bản mới".
 */
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    let reloaded = false;
    const onControllerChange = () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    };

    // lần đầu vào app thì chưa có controller, lúc đó claim() không phải là "bản mới"
    const hadController = Boolean(navigator.serviceWorker.controller);
    if (hadController) {
      navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    }

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* không đăng ký được thì app vẫn chạy, chỉ là không offline */
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register);

    return () => {
      window.removeEventListener("load", register);
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange,
      );
    };
  }, []);

  return null;
}
