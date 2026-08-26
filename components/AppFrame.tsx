"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";

/** Trong lúc học thì giấu bottom nav đi cho đỡ phân tâm, giống mock */
export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const focusMode = pathname.startsWith("/lesson");

  return (
    <>
      <div
        className={`mx-auto flex min-h-dvh w-full max-w-[430px] flex-col ${
          focusMode ? "" : "pb-[84px]"
        }`}
        style={
          focusMode ? { paddingBottom: "env(safe-area-inset-bottom)" } : undefined
        }
      >
        {children}
      </div>
      {!focusMode && <BottomNav />}
    </>
  );
}
