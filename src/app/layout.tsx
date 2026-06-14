import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://takdjang.com"),
  title: "탁디장 | 상세페이지부터 웹사이트·홍보까지 설계합니다",
  description:
    "팔리는 상세페이지에서 출발해 브랜드 웹사이트 제작과 검색·광고 홍보, 운영까지 한 흐름으로. 매출을 설계하는 디자인 스튜디오, 탁디장입니다.",
  openGraph: {
    title: "탁디장 | 상세페이지부터 웹사이트·홍보까지",
    description:
      "상세페이지 · 웹사이트 제작 · 검색/광고 홍보 · 운영 관리를 한 곳에서. 매출을 설계하는 디자인 스튜디오.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
