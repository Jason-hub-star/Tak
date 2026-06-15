import type { ServiceItem, LinkageStep } from "@/types";

/**
 * 탁디장 4-서비스 모델 — "팔리는 상세페이지"에서 출발해
 * 브랜드 웹사이트 제작과 검색·광고 홍보, 운영까지 하나의 흐름으로 연결한다.
 * (devfive/WEFLOW의 제작→연결→리포트→관리 모델을 탁디장 도메인으로 재해석)
 */
export const SERVICES: ServiceItem[] = [
  {
    id: "detail-page",
    icon: "FileText",
    eyebrow: "01 · 핵심",
    title: "상세페이지 제작",
    summary:
      "팔리는 구조로 설계하는 탁디장의 시작점. 기획·촬영·디자인·원본까지 한 번에.",
    points: [
      "시장·고객·경쟁 분석 기반 설득 구조 설계",
      "1차 콘티로 방향 먼저 합의 → 수정 최소화",
      "촬영부터 디자인까지 원스톱 진행",
    ],
    deliverables: ["기획", "촬영", "디자인", "원본 파일"],
  },
  {
    id: "website",
    icon: "Globe",
    eyebrow: "02 · 확장",
    title: "브랜드 웹사이트 제작",
    summary:
      "상세페이지의 설득력을 브랜드 전체로 넓힙니다. 랜딩부터 다페이지 사이트까지.",
    points: [
      "랜딩 · 회사소개 · 제품/서비스 페이지 구성",
      "PC/모바일 반응형 + 문의 전환 동선 설계",
      "상세페이지와 톤·메시지 일관성 유지",
    ],
    deliverables: ["랜딩/다페이지", "반응형", "문의 연동", "기본 SEO"],
  },
  {
    id: "promotion",
    icon: "TrendingUp",
    eyebrow: "03 · 연계",
    title: "검색·홍보 연계",
    summary:
      "만들고 끝이 아닙니다. 네이버·구글 검색 노출과 광고로 '고객 유입'까지 연결합니다.",
    points: [
      "네이버/구글 검색 등록 · 사이트맵 · SEO 세팅",
      "키워드 · 플레이스 광고 캠페인 설계",
      "블로그/인스타 SNS 콘텐츠 운영 옵션",
    ],
    deliverables: ["검색 등록", "SEO", "광고 세팅", "SNS 운영"],
  },
  {
    id: "care",
    icon: "RefreshCw",
    eyebrow: "04 · 운영",
    title: "운영·관리",
    summary:
      "배너·후기·공지 업데이트와 성과 리포트로 만든 다음까지 함께 챙깁니다.",
    points: [
      "배너 · 후기 · 공지 · 문구 경미 수정",
      "문의 유입 경로 · 성과 리포트 제공",
      "개선 포인트 제안 후 지속 케어",
    ],
    deliverables: ["콘텐츠 갱신", "성과 리포트", "지속 개선"],
  },
];

/** 제작 → 연결 → 전환 → 관리 흐름 (홈 연계 섹션) */
export const LINKAGE_STEPS: LinkageStep[] = [
  { phase: "제작", label: "상세페이지 · 웹사이트", desc: "설득 구조로 만든다" },
  { phase: "연결", label: "검색 · 광고 노출", desc: "고객이 찾아오게 한다" },
  { phase: "전환", label: "문의 · 예약 · 구매", desc: "유입을 매출로 잇는다" },
  { phase: "관리", label: "리포트 · 개선", desc: "결과를 보고 키운다" },
];

/** 연계 포지셔닝 카피 */
export const LINKAGE_COPY = {
  eyebrow: "WHY 탁디장",
  title: "상세페이지 하나로 끝내지 마세요",
  sub: "탁디장은 ‘파는 페이지’를 넘어, 브랜드를 알리는 웹사이트와 검색·광고 유입까지 하나의 흐름으로 설계합니다.",
} as const;

/** /services 페이지 헤더 카피 */
export const SERVICES_PAGE_COPY = {
  eyebrow: "SERVICES",
  title: "만들고, 알리고, 키우는 것까지",
  sub: "상세페이지 제작에서 출발해 웹사이트와 홍보까지, 따로 의뢰하지 않아도 한 곳에서 이어집니다.",
} as const;
