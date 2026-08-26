import Countdown from "@/components/Countdown";
import LevelBoard from "@/components/LevelBoard";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col px-6 pt-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-han text-[44px] leading-[1.1] text-ink">你好！</h1>
          <p className="mt-1 text-[17px] font-bold text-ink">台北へ、いこう</p>
        </div>
        <Countdown />
      </div>

      <div className="mt-[18px] overflow-hidden rounded-hero border-[1.5px] border-sand bg-shell">
        <img
          src="/art/hero-home.webp"
          alt="台北へむかうカメ"
          className="block h-[200px] w-full object-cover"
        />
      </div>

      <LevelBoard />
    </main>
  );
}
