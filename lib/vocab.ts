import raw from "@/data/kame-vocab.json";

export type Word = {
  hanzi: string;
  pinyin: string;
  ja: string;
  kana: string;
};

export type Lesson = {
  id: string;
  title: string;
  scene: string;
  words: Word[];
};

export type Stop = {
  time: string;
  place: string;
  ja: string;
};

export type Level = {
  id: string;
  day: number;
  /** YYYY-MM-DD */
  date: string;
  title: string;
  subtitle: string;
  schedule: Stop[];
  lessons: Lesson[];
};

export type Meta = {
  app: string;
  mascot: string;
  learner: string;
  /** YYYY-MM-DD, nguồn duy nhất cho countdown và ngày từng level */
  tripDate: string;
  tripDays: number;
  tripNights: number;
};

type Vocab = { _meta: Meta; levels: Level[] };

const data = raw as unknown as Vocab;

export const meta = data._meta;
export const levels = data.levels;

export function getLevel(id: string): Level | undefined {
  return levels.find((l) => l.id === id);
}

export function getLesson(id: string): { level: Level; lesson: Lesson } | undefined {
  for (const level of levels) {
    const lesson = level.lessons.find((l) => l.id === id);
    if (lesson) return { level, lesson };
  }
  return undefined;
}

/** Mọi bài, theo đúng thứ tự day1 -> day3, dùng cho "つづきから" và phrasebook */
export function allLessons(): { level: Level; lesson: Lesson }[] {
  return levels.flatMap((level) => level.lessons.map((lesson) => ({ level, lesson })));
}

export function allWords(): { level: Level; lesson: Lesson; word: Word }[] {
  return allLessons().flatMap(({ level, lesson }) =>
    lesson.words.map((word) => ({ level, lesson, word })),
  );
}
