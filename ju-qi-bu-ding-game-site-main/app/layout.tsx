import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "举棋不定｜双人回合制策略游戏",
  description: "自由落子、棋子移动、连线组合、空间挤压与灵魂计分，在同一张棋盘上同时发生。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
