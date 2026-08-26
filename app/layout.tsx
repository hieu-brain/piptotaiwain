import type { Metadata, Viewport } from "next";
import { LXGW_WenKai_TC, Zen_Maru_Gothic } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import PinGate from "@/components/PinGate";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-maru",
  display: "swap",
  // font tiếng Nhật có rất nhiều slice, preload hết sẽ nặng vô ích
  preload: false,
});

const wenKai = LXGW_WenKai_TC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-wenkai",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "カメと台北",
  description: "台北3日間のたびのための、ちょこっと中国語",
  appleWebApp: { capable: true, title: "カメと台北", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#FBF2DC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${zenMaru.variable} ${wenKai.variable}`}>
      <body className="antialiased">
        <PinGate>
          <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col pb-[84px]">
            {children}
          </div>
          <BottomNav />
        </PinGate>
      </body>
    </html>
  );
}
