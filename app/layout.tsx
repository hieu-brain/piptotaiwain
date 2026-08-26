import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import AppFrame from "@/components/AppFrame";
import "./globals.css";

/**
 * Font đã cắt còn đúng số chữ app dùng (xem scripts/subset-fonts.mjs),
 * nên preload thoải mái: cả bộ chưa tới 500KB.
 */
const zenMaru = localFont({
  src: [
    { path: "../fonts/ZenMaruGothic-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ZenMaruGothic-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ZenMaruGothic-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/ZenMaruGothic-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-zen-maru",
  display: "swap",
});

const wenKai = localFont({
  src: [{ path: "../fonts/LXGWWenKaiTC-400.woff2", weight: "400", style: "normal" }],
  variable: "--font-wenkai",
  display: "swap",
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
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
