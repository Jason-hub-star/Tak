import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo/site";

export const alt = "탁디장 | 상세페이지부터 웹사이트·홍보까지 설계합니다";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff";

export default async function OpengraphImage() {
  const [bold, regular] = await Promise.all([
    fetch(`${FONT}/Pretendard-Bold.woff`).then((r) => r.arrayBuffer()),
    fetch(`${FONT}/Pretendard-Regular.woff`).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "#FAFAF8",
          color: "#1A1A1A",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#CB6664", fontWeight: 700 }}>
          {SITE.name} · 디자인 스튜디오
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          <span>고객이 사게 만드는</span>
          <span>
            <span style={{ color: "#CB6664" }}>상세페이지</span>부터 홍보까지
          </span>
        </div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 30, color: "#555" }}>
          상세페이지 · 웹사이트 제작 · 검색/광고 홍보 · 운영 관리
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
        { name: "Pretendard", data: regular, weight: 400, style: "normal" },
      ],
    }
  );
}
