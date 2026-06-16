/**
 * 분석/측정 단일 진실 원천(SSOT).
 * 각 도구의 ID는 환경변수에서 읽으며, 값이 있을 때만 스크립트를 로드한다.
 * (SEO 소유확인 패턴과 동일 — 키 없이도 빌드/렌더가 안전하게 통과)
 *
 * 클라이언트에서 참조하므로 NEXT_PUBLIC_ 접두사 필수.
 *  - NEXT_PUBLIC_GA_ID            : Google Analytics 4 측정 ID (G-XXXXXXXXXX)
 *  - NEXT_PUBLIC_GOOGLE_ADS_ID    : Google Ads 태그 ID (AW-XXXXXXXXXX) — 전환측정용
 *  - NEXT_PUBLIC_META_PIXEL_ID    : Meta(페이스북/인스타) 픽셀 ID (숫자)
 *  - NEXT_PUBLIC_NAVER_SITE_ID    : 네이버 애널리틱스 wa 계정 ID
 *
 * Google Ads 태그 ID는 페이지 소스에 노출되는 공개 식별자(비밀 아님)라,
 * env 미설정 시에도 동작하도록 실제 값을 기본값으로 둔다(env로 덮어쓰기 가능).
 */
export const ANALYTICS = {
  ga4: process.env.NEXT_PUBLIC_GA_ID || undefined,
  googleAds: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18243225940",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || undefined,
  naver: process.env.NEXT_PUBLIC_NAVER_SITE_ID || undefined,
} as const;

/** 하나라도 설정돼 있으면 측정 활성 */
export const ANALYTICS_ENABLED =
  Boolean(ANALYTICS.ga4) ||
  Boolean(ANALYTICS.googleAds) ||
  Boolean(ANALYTICS.metaPixel) ||
  Boolean(ANALYTICS.naver);
