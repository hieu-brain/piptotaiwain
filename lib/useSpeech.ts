"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Đọc chữ Hán bằng giọng máy có sẵn, không gọi cloud nên không tốn tiền
 * và offline vẫn kêu.
 *
 * Mấy chỗ phải né trên iOS Safari:
 * - getVoices() lúc đầu trả mảng rỗng, phải đợi event voiceschanged
 * - speak() phải xuất phát từ cú chạm của người dùng, không tự phát
 */

type SpeechState = {
  /** máy có speechSynthesis hay không */
  supported: boolean;
  /** đã đọc xong danh sách giọng chưa */
  loaded: boolean;
  /** giọng chọn được, null nghĩa là để hệ thống tự chọn theo lang */
  voice: SpeechSynthesisVoice | null;
  /** chỉ có giọng đại lục, không có zh-TW */
  mainlandOnly: boolean;
};

const RATE = 0.85;

function normalize(lang: string): string {
  return lang.replace("_", "-").toLowerCase();
}

function pickVoice(voices: SpeechSynthesisVoice[]) {
  const tw = voices.find((v) => normalize(v.lang) === "zh-tw");
  const other = voices.find((v) => normalize(v.lang).startsWith("zh"));
  return { voice: tw ?? other ?? null, mainlandOnly: !tw && Boolean(other) };
}

export function useSpeech() {
  const [state, setState] = useState<SpeechState>({
    supported: true,
    loaded: false,
    voice: null,
    mainlandOnly: false,
  });

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setState({ supported: false, loaded: true, voice: null, mainlandOnly: false });
      return;
    }

    const read = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return false;
      setState({ supported: true, loaded: true, ...pickVoice(voices) });
      return true;
    };

    if (read()) return;

    window.speechSynthesis.addEventListener("voiceschanged", read);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", read);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return;

      const utterance = new SpeechSynthesisUtterance(text);
      // giọng có thể mới nạp xong sau lần render đầu, nên đọc lại ngay lúc phát
      const fresh = state.voice ?? pickVoice(window.speechSynthesis.getVoices()).voice;
      if (fresh) utterance.voice = fresh;
      utterance.lang = fresh?.lang ?? "zh-TW";
      utterance.rate = RATE;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [state.voice],
  );

  /** Không có giọng tiếng Trung nào thì giấu luôn nút loa cho đỡ hụt hẫng */
  const canSpeak = state.supported && (!state.loaded || state.voice !== null);

  return { speak, canSpeak, mainlandOnly: state.mainlandOnly };
}
