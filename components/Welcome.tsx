"use client";

import { useEffect, useState } from "react";
import { artSrc } from "@/lib/art-map";
import { MASCOT, STORAGE } from "@/lib/config";
import { daysUntil } from "@/lib/date";
import { meta } from "@/lib/vocab";

/**
 * Màn chào, chỉ hiện lần mở app đầu tiên. Xóa STORAGE.metMascot trong
 * localStorage là nó hiện lại.
 */
export default function Welcome() {
  const [show, setShow] = useState(false);
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE.metMascot) !== "1") setShow(true);
    } catch {
      /* chặn localStorage thì thôi, coi như đã chào rồi */
    }
    setDays(daysUntil(meta.tripDate));
  }, []);

  if (!show) return null;

  function close() {
    try {
      window.localStorage.setItem(STORAGE.metMascot, "1");
    } catch {
      /* không lưu được thì lần sau chào lại, không sao */
    }
    setShow(false);
  }

  return (
    <div className="fade-up fixed inset-0 z-50 overflow-y-auto bg-paper">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col px-7 pt-7 pb-7 text-center">
        <img
          src={artSrc("pose-wave")}
          alt=""
          className="mx-auto h-[150px] w-auto object-contain"
        />

        <p className="mt-3 text-[13px] font-bold text-gold">はじめまして</p>
        <h1 className="mt-1 text-[27px] font-black text-ink">
          ぼく、{MASCOT.nameJa}
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed text-ink">
          沖縄うまれの うみがめ。
          <br />
          きみと いっしょに 台北へ 行くよ。
        </p>

        <div className="mt-6 flex flex-col gap-2.5 text-left">
          <div className="rounded-card border-[1.5px] border-sand bg-card p-3.5">
            <p className="text-sm font-bold text-ink">3日間ぶんの ことば</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              空港、夜市、九份、タピオカ。その日つかう ことばだけ おぼえる
            </p>
          </div>

          <div className="rounded-card border-[1.5px] border-sand bg-card p-3.5">
            <p className="text-sm font-bold text-ink">まなぶ → れんしゅう</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              さきに ぜんぶ見てから クイズ。まちがえても へらないし、
              時間も はからない
            </p>
          </div>

          <div className="rounded-card border-[1.5px] border-sand bg-card p-3.5">
            <p className="text-sm font-bold text-ink">声に 出してみる</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              スピーカーを おすと 台湾のはつおんが 聞こえる。まねするだけで OK
            </p>
          </div>
        </div>

        <p className="mt-5 text-[13px] text-ink-soft">
          {days !== null && days > 0
            ? `出発まで あと${days}日。ゆっくり いこう`
            : "ゆっくり いこう"}
        </p>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={close}
            className="press w-full touch-manipulation rounded-[18px] bg-lantern py-4 text-lg font-bold text-paper shadow-[0_4px_0_var(--color-lantern-deep)] select-none"
          >
            よろしくね、{MASCOT.nameJa}
          </button>
        </div>
      </div>
    </div>
  );
}
