/**
 * SEO 단일 진실 원천(SSOT).
 * 사이트 식별 정보·소셜 링크·검색엔진 소유확인 코드를 한 곳에서 관리한다.
 * 소유확인 코드와 사업자 NAP(상호·주소·전화)는 .env.local 로 주입한다(레포 커밋 금지).
 */

export const SITE = {
  /** 절대 URL (metadataBase) */
  url: "https://takdijang.com",
  /** 브랜드 짧은 이름 (title 템플릿) */
  name: "탁디장",
  /** 정식 명칭 (Organization 스키마) */
  legalName: "탁디장 디자인 스튜디오",
  /** 기본 설명 */
  description:
    "팔리는 상세페이지에서 출발해 브랜드 웹사이트 제작과 검색·광고 홍보, 운영까지 한 흐름으로. 매출을 설계하는 디자인 스튜디오, 탁디장입니다.",
  locale: "ko_KR",
  /** 외부 채널 (Organization.sameAs) */
  social: {
    kakao: "https://open.kakao.com/o/suSdZzs",
    smartstore: "https://smartstore.naver.com/takdijang",
  },
} as const;

/**
 * 검색엔진 소유확인 코드 — 환경변수에서 읽는다(서버에서만 사용).
 * 값이 없으면 메타태그를 출력하지 않는다(빈 verification 금지).
 *  - GOOGLE_SITE_VERIFICATION : Google Search Console 소유확인 코드
 *  - NAVER_SITE_VERIFICATION  : 네이버 서치어드바이저 HTML 태그 소유확인 코드
 */
export const VERIFICATION = {
  google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  naver: process.env.NAVER_SITE_VERIFICATION || undefined,
} as const;

/** 상대 경로를 절대 URL로 변환 */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}
