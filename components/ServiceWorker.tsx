"use client";

import { useEffect } from "react";

/** Đăng ký service worker, chỉ ở bản build thật. Dev không đăng ký cho đỡ vướng. */
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* không đăng ký được thì app vẫn chạy, chỉ là không offline */
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
