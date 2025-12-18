import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2026 東京親子冬雪之旅 | 旅遊手冊",
  description: "6天5夜東京親子冬雪之旅，包含輕井澤滑雪、台場、晴空塔、淺草等精彩行程",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
