"use client";

import { useEffect, useState } from "react";
import { daysUntil } from "@/lib/date";
import { meta } from "@/lib/vocab";

/**
 * Tính ở client: bản static export nếu render sẵn sẽ đóng băng ngày build.
 */
export default function Countdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysUntil(meta.tripDate));
  }, []);

  let text = "台北へ";
  if (days !== null) {
    if (days > 0) text = `出発まで あと${days}日`;
    else if (days === 0) text = "きょう 出発！";
    else text = "台湾、たのしかった";
  }

  return (
    <span
      className="mb-1.5 rounded-full border-[1.5px] border-sand bg-paper-deep px-3.5 py-2 text-[13px] font-bold text-ink"
      // giữ chỗ để không nhảy layout lúc chưa tính xong
      style={{ opacity: days === null ? 0 : 1, transition: "opacity .2s" }}
    >
      {text}
    </span>
  );
}
