import { PosterGallery } from "@/components/Poster";
import { levels } from "@/lib/vocab";

export default function LibraryPage() {
  return (
    <main className="flex flex-1 flex-col px-6 pt-6">
      <h1 className="text-[26px] font-bold text-ink">ポスター</h1>
      <p className="mt-1 text-sm text-ink-soft">3日ぶんの おもいで</p>

      <PosterGallery levels={levels} />
    </main>
  );
}
