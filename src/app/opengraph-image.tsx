import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/seo/site";

export const alt = "탁디장 | 상세페이지부터 웹사이트·홍보까지 설계합니다";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff";

export default async function OpengraphImage() {
  const [bold, regular, cover] = await Promise.all([
    fetch(`${FONT}/Pretendard-Bold.woff`).then((r) => r.arrayBuffer()),
    fetch(`${FONT}/Pretendard-Regular.woff`).then((r) => r.arrayBuffer()),
    readFile(join(process.cwd(), "public/og/cover.jpg")),
  ]);

  const coverSrc = `data:image/jpeg;base64,${Buffer.from(cover).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          color: "#FFFFFF",
        }}
      >
        {/* 배경 사진 — ImageResponse(satori)는 next/image가 아닌 <img>를 요구함 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverSrc}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />
        {/* 가독성 스크림 (아래로 갈수록 어둡게) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(20,18,16,0) 32%, rgba(20,18,16,0.45) 64%, rgba(20,18,16,0.82) 100%)",
          }}
        />
        {/* 텍스트 블록 (하단 정렬) */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", padding: "0 72px 64px" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#F4C9C8", fontWeight: 700 }}>
            {SITE.name} · 디자인 스튜디오
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.18,
            }}
          >
            <span>고객이 사게 만드는</span>
            <span>상세페이지부터 홍보까지</span>
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 26, color: "rgba(255,255,255,0.82)" }}>
            상세페이지 · 웹사이트 제작 · 검색/광고 홍보 · 운영 관리
          </div>
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
