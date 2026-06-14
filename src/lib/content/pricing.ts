import type { PricingPlan } from "@/types";

/**
 * 탁디장 가격 모델 — 제작(build) / 케어(care) / 광고(ads) 3계열.
 * 표기 금액은 부가세 별도 '시작가'이며, 정확한 견적은 무료 상담에서 안내한다.
 * (devfive/WEFLOW의 build+care+ads 구조를 탁디장 도메인으로 재해석)
 */
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "detail",
    category: "build",
    label: "상세페이지",
    price: "330,000원~",
    period: "/건",
    body: "팔리는 상세페이지 1건. 기획·촬영·디자인·원본까지 한 번에.",
    features: [
      "기획 · 콘티(스케치) 합의",
      "촬영 + 디자인 원스톱",
      "PSD/AI 원본 파일 제공",
      "쇼핑몰 플랫폼 가이드 반영",
    ],
    cta: "상세페이지 견적 보기",
    ctaHref: "#contact",
    featured: false,
  },
  {
    id: "website",
    category: "build",
    label: "브랜드 웹사이트",
    price: "990,000원~",
    period: "/건",
    body: "랜딩부터 다페이지까지. 상세페이지의 설득력을 브랜드 전체로 확장.",
    features: [
      "랜딩 / 회사소개 / 제품 페이지",
      "PC·모바일 반응형 제작",
      "문의폼 · 카카오톡 상담 연동",
      "기본 SEO · 검색 등록 세팅",
    ],
    cta: "웹사이트 견적 보기",
    ctaHref: "#contact",
    featured: true,
    badge: "BUILD ⭐ 인기",
  },
  {
    id: "fullpackage",
    category: "build",
    label: "제작 풀패키지",
    price: "1,650,000원~",
    body: "상세페이지 + 웹사이트 + 홍보 세팅을 한 번에. 만들고 알리는 것까지.",
    period: "/건",
    features: [
      "상세페이지 + 브랜드 웹사이트",
      "프리미엄 디자인 + 전환 동선 설계",
      "검색 등록 + 광고 세팅 1회 포함",
      "SEO 최적화",
    ],
    cta: "풀패키지 견적 보기",
    ctaHref: "#contact",
    featured: false,
  },
  {
    id: "care-basic",
    category: "care",
    label: "베이직 케어",
    price: "90,000원~",
    period: "/월",
    body: "기본 운영형 — 콘텐츠 갱신과 검색 등록 관리를 매달 가볍게 챙겨드려요.",
    features: [
      "유지보수(경미 수정) 월 1건",
      "검색 등록 관리",
      "월 노출 점검",
      "SNS 콘텐츠 월 4회 (옵션)",
    ],
    cta: "베이직 케어 시작하기",
    ctaHref: "#contact",
    featured: false,
  },
  {
    id: "care-growth",
    category: "care",
    label: "그로스 케어",
    price: "190,000원~",
    period: "/월",
    body: "성장형 — 콘텐츠·SNS 운영 + 광고 세팅 할인 + 문의 개선까지. 제작과 홍보를 잇는 가장 인기 플랜.",
    features: [
      "유지보수(경미 수정) 월 3건",
      "검색 등록 관리 + 월 성과 리포트",
      "SNS 콘텐츠 월 8회 (주 2회)",
      "키워드/플레이스 광고 세팅 할인",
      "문의 전환 개선 제안",
    ],
    cta: "그로스 케어 시작하기",
    ctaHref: "#contact",
    featured: true,
    badge: "CARE ⭐ 추천",
  },
  {
    id: "ads",
    category: "ads",
    label: "광고 운영 세팅",
    price: "150,000원~",
    period: "/월",
    body: "네이버 키워드·당근 플레이스 광고 세팅과 운영. 광고비는 고객 계정에서 직접 결제.",
    features: [
      "검색·플레이스 키워드 캠페인 설계",
      "광고 결과 측정 세팅",
      "월 키워드·예산 점검",
      "월 결과 리포트 + 다음 액션",
    ],
    cta: "광고 운영 견적 보기",
    ctaHref: "#contact",
    featured: false,
  },
];

/** 제작 플랜 비교표 */
export const PRICING_COMPARE = {
  eyebrow: "COMPARE",
  title: "제작 플랜 비교",
  columns: ["항목", "상세페이지", "브랜드 웹사이트", "풀패키지"],
  rows: [
    { label: "시작가 (부가세 별도)", values: ["330,000원~", "990,000원~", "1,650,000원~"] },
    { label: "구성", values: ["상세페이지 1건", "랜딩~다페이지", "상세 + 웹사이트"] },
    { label: "반응형 (PC/모바일)", values: ["—", "✅", "✅"] },
    { label: "촬영 포함", values: ["✅", "옵션", "✅"] },
    { label: "문의폼 · 카톡 연동", values: ["—", "✅", "✅"] },
    { label: "검색 등록 · SEO", values: ["—", "기본", "최적화"] },
    { label: "광고 세팅 1회", values: ["—", "옵션", "✅"] },
    { label: "추천 대상", values: ["단일 상품", "정식 브랜드 사이트", "런칭 풀세팅"] },
  ],
} as const;

/** 가격 관련 FAQ */
export const PRICING_FAQ = [
  {
    id: "p1",
    q: "표기된 금액이 최종 견적인가요?",
    a: "표기 금액은 부가세 별도 '시작가'입니다. 기획 범위·페이지 수·촬영 포함 여부에 따라 달라지며, 정확한 금액은 15분 무료 상담에서 안내드립니다.",
  },
  {
    id: "p2",
    q: "상세페이지만, 또는 웹사이트만 의뢰할 수 있나요?",
    a: "네. 상세페이지 단품, 웹사이트 단품, 둘을 묶은 풀패키지 모두 가능합니다. 지금 필요한 범위부터 시작하고 나중에 확장하셔도 됩니다.",
  },
  {
    id: "p3",
    q: "광고비도 케어 비용에 포함인가요?",
    a: "아니요. 케어·광고 세팅비와 실제 광고비는 별도이며, 광고비는 고객님 계정에서 직접 결제하십니다. 탁디장은 세팅·운영·리포트를 담당합니다.",
  },
  {
    id: "p4",
    q: "케어 플랜은 약정이 있나요?",
    a: "기본 단위로 시작해 월 단위 갱신합니다. 자세한 약정 조건은 상담에서 안내드립니다.",
  },
];

/** 가격 안내 고지 */
export const PRICING_DISCLOSURES = [
  "표기 금액은 부가세 별도 시작가이며, 정확한 견적은 무료 상담에서 안내합니다.",
  "도메인은 고객 명의로 등록(비용 별도), 등록·연결 세팅은 탁디장이 지원합니다.",
  "광고비는 고객 계정에서 직접 결제하며, 탁디장은 운영·세팅·리포트만 담당합니다.",
  "유지보수는 텍스트·이미지·링크 경미 수정 기준입니다. 페이지 추가·기능 개발은 별도 견적입니다.",
];

/** /pricing 페이지 헤더 카피 */
export const PRICING_PAGE_COPY = {
  eyebrow: "PRICING",
  title: "필요한 범위부터, 투명하게",
  sub: "상세페이지 단품부터 웹사이트 제작·홍보 케어까지. 지금 필요한 만큼만 시작하세요.",
} as const;
