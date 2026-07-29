import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "举棋不定｜双人回合制策略游戏";
const description = "自由落子、棋子移动、连线组合、空间挤压与灵魂计分，在同一张棋盘上同时发生。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const imageUrl = new URL("/og.png", origin).toString();

  return {
    title,
    description,
    metadataBase: new URL(origin),
    openGraph: {
      title,
      description,
      url: origin,
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: "举棋不定：优秀入围奖与 ChinaJoy 展出" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
