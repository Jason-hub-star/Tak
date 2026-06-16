"use client";

import { useEffect, useState } from "react";

/**
 * 히어로 배경 영상 (데이터 안전장치 내장).
 * - poster(정지컷)는 부모 서버 컴포넌트가 항상 렌더한다. 이 컴포넌트는 "영상을 얹을지"만 결정.
 * - 마운트 후 클라이언트에서만 판단하므로 hydration 불일치가 없다(초기엔 null → poster 노출).
 *
 * 스킵 조건(영상 안 틀고 poster 유지):
 *  1) prefers-reduced-motion: 모션 최소화 사용자
 *  2) Save-Data 켜짐: 사용자가 데이터 절약을 명시
 *  3) 느린 네트워크(3g 이하): effectiveType 기준
 *
 * 재생 시 소스 분기:
 *  - 모바일(<768px): 경량 720p 미만 파일(webm 우선)
 *  - 데스크톱(≥768px): 원본 화질 파일
 */
type NetworkInfo = { saveData?: boolean; effectiveType?: string };

export function HeroBackgroundVideo() {
  const [mode, setMode] = useState<"none" | "mobile" | "desktop">("none");

  useEffect(() => {
    // 1) 모션 최소화 존중
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 2)·3) Save-Data / 느린 네트워크 스킵
    const conn = (navigator as Navigator & { connection?: NetworkInfo })
      .connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && ["slow-2g", "2g", "3g"].includes(conn.effectiveType))
      return;

    // 소스 분기 (뷰포트 기준)
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setMode(isDesktop ? "desktop" : "mobile");
  }, []);

  if (mode === "none") return null;

  const sources =
    mode === "mobile"
      ? [
          { src: "/hero/hero-montage-mobile.webm", type: "video/webm" },
          { src: "/hero/hero-montage-mobile.mp4", type: "video/mp4" },
        ]
      : [
          { src: "/hero/hero-montage.webm", type: "video/webm" },
          { src: "/hero/hero-montage.mp4", type: "video/mp4" },
        ];

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero/hero-poster.jpg"
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
