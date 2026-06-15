import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE, VERIFICATION } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "탁디장 | 상세페이지부터 웹사이트·홍보까지 설계합니다",
    template: "%s | 탁디장",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "상세페이지 제작",
    "스마트스토어 상세페이지",
    "브랜드 웹사이트 제작",
    "검색 광고 홍보",
    "디자인 스튜디오",
    "탁디장",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE.name,
    title: "탁디장 | 상세페이지부터 웹사이트·홍보까지",
    description:
      "상세페이지 · 웹사이트 제작 · 검색/광고 홍보 · 운영 관리를 한 곳에서. 매출을 설계하는 디자인 스튜디오.",
    url: SITE.url,
    type: "website",
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: "탁디장 | 상세페이지부터 웹사이트·홍보까지",
    description:
      "상세페이지 · 웹사이트 제작 · 검색/광고 홍보 · 운영 관리를 한 곳에서.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // 소유확인 코드는 .env.local 에서 주입(값이 있을 때만 태그 출력)
  verification: {
    google: VERIFICATION.google,
    other: VERIFICATION.naver
      ? { "naver-site-verification": VERIFICATION.naver }
      : {},
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        {children}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
