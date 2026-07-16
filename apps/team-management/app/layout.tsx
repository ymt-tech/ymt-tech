import type { Metadata } from "next";
import { Syne, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const zen = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "チーム管理 | ポートフォリオデモ",
  description:
    "スポーツチーム向けグループウェアのデモ。サンプルDB上でスケジュール・出欠・連絡・情報共有を体験できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${syne.variable} ${zen.variable} antialiased`}>{children}</body>
    </html>
  );
}
