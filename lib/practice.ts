import type { Word } from "@/lib/vocab";

/**
 * Hàng đợi luyện tập của 1 bài: trộn 3 dạng câu hỏi.
 * Dựng ở client sau khi người dùng bấm vào phase luyện, nên dùng Math.random
 * thoải mái mà không sợ lệch giữa server và client.
 */

export type MatchTask = { kind: "match"; id: string; pairs: Word[] };
export type ChoiceTask = {
  kind: "listen" | "meaning";
  id: string;
  word: Word;
  choices: Word[];
};
export type Task = MatchTask | ChoiceTask;

const CHOICE_COUNT = 4;

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Chia từ thành các nhóm ghép cặp: 6 từ -> 3+3, 7 -> 4+3, 8 -> 4+4 */
function matchGroups(words: Word[]): Word[][] {
  if (words.length <= 5) return [words];
  const half = Math.ceil(words.length / 2);
  return [words.slice(0, half), words.slice(half)];
}

/** 3 đáp án nhiễu, ưu tiên từ cùng bài rồi mới tới từ cùng ngày */
function distractors(answer: Word, lessonWords: Word[], pool: Word[]): Word[] {
  const taken = new Set([answer.hanzi]);
  const out: Word[] = [];

  for (const source of [lessonWords, pool]) {
    for (const word of shuffle(source)) {
      if (out.length >= CHOICE_COUNT - 1) break;
      if (taken.has(word.hanzi) || word.ja === answer.ja) continue;
      taken.add(word.hanzi);
      out.push(word);
    }
  }
  return out;
}

export function buildQueue(lessonWords: Word[], pool: Word[]): Task[] {
  const groups = matchGroups(shuffle(lessonWords));
  const matches: MatchTask[] = groups.map((pairs, i) => ({
    kind: "match",
    id: `match-${i}`,
    pairs,
  }));

  // mỗi từ được hỏi đúng 1 lần, xen kẽ nghe-chọn và chọn-nghĩa
  const choices: ChoiceTask[] = shuffle(lessonWords).map((word, i) => ({
    kind: i % 2 === 0 ? "listen" : "meaning",
    id: `${i % 2 === 0 ? "listen" : "meaning"}-${word.hanzi}`,
    word,
    choices: shuffle([word, ...distractors(word, lessonWords, pool)]),
  }));

  // ghép cặp trước để làm quen mặt chữ, rồi mới tới câu hỏi
  const half = Math.ceil(choices.length / 2);
  return [
    matches[0],
    ...choices.slice(0, half),
    ...(matches[1] ? [matches[1]] : []),
    ...choices.slice(half),
  ];
}
