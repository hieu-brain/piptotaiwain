import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Không có server logic, xuất tĩnh cho nhẹ và dễ đưa lên Vercel
  output: "export",
  images: { unoptimized: true },
  // khóa root vào thư mục dự án, tránh Next dò nhầm lockfile ở home
  turbopack: { root: __dirname },
};

export default nextConfig;
