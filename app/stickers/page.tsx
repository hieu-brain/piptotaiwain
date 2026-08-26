import StickerBoard from "@/components/StickerBoard";

export default function StickersPage() {
  return (
    <main className="flex flex-1 flex-col px-6 pt-6">
      <h1 className="text-[26px] font-bold text-ink">シール</h1>
      <StickerBoard />
    </main>
  );
}
