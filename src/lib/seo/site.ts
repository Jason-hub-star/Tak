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
    instagram: "https://www.instagram.com/casamond_tak/",
    youtube: "https://www.youtube.com/@takdijang",
  },
  /**
   * 사업자 NAP — 푸터에 이미 공개된 공식 정보(법적 표기 의무).
   * LocalBusiness 스키마와 푸터가 함께 참조한다(단일 진실 원천).
   */
  business: {
    /** 상호 (푸터 표기) */
    name: "탁디장스튜디오",
    /** 사업자등록번호 */
    businessNumber: "365-18-00464",
    /** 대표 전화 */
    phone: "010-7153-8014",
    /** 도로명 주소 (시/도·시 제외, 상세 도로명만) */
    streetAddress: "덕계로 104 1층",
    /** 시/군/구 (PostalAddress.addressLocality) */
    addressLocality: "양산시",
    /** 시/도 (PostalAddress.addressRegion) */
    addressRegion: "경상남도",
    /** 우편번호 (PostalAddress.postalCode) */
    postalCode: "50553",
    /** 국가 코드 (ISO 3166-1 alpha-2) */
    addressCountry: "KR",
  },
  /**
   * 정적 페이지 콘텐츠 최종 갱신일(sitemap lastmod 안정값).
   * 빌드마다 바뀌는 new Date() 대신 고정값을 써 "always-fresh" 신호 왜곡을 막는다.
   * 정적 페이지 본문을 의미 있게 수정하면 이 날짜를 갱신한다.
   */
  contentUpdated: "2026-06-16",
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
