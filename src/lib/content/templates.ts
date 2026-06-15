/**
 * AI 템플릿 스토어 상품 — 탁디장/탁몽 스마트스토어 판매 상품.
 * /takmong 의 "AI 템플릿 스토어" 섹션에서 사용. 구매는 스마트스토어로 연결.
 * 세로로 긴 상세 PNG는 추후 public/templates/<slug>/ 에 추가 예정.
 */

export interface TemplateProduct {
  slug: string;
  /** 상품명 (스토어보다 간결하게) */
  name: string;
  /** 카테고리 라벨 */
  category: string;
  /** 브랜드 (탁디장 / 탁몽) */
  brand: string;
  /** 판매가(할인가) */
  price: number;
  /** 정가 */
  originalPrice: number;
  /** 한 줄 소개 */
  summary: string;
  /** 핵심 포인트 */
  highlights: string[];
  /** 스마트스토어 상품 URL */
  storeUrl: string;
  /** 사은품/혜택 (선택) */
  freebie?: string;
  /** 추천(강조) 카드 여부 */
  featured?: boolean;
  /** 대표 이미지 경로 (없으면 플레이스홀더) */
  image?: string;
}

/** 할인율(%) = round((1 - price/original) * 100) */
export function discountRate(p: TemplateProduct): number {
  if (!p.originalPrice || p.originalPrice <= p.price) return 0;
  return Math.round((1 - p.price / p.originalPrice) * 100);
}

/** 가격 포맷 (예: 29000 → "29,000원") */
export function formatPrice(won: number): string {
  return `${won.toLocaleString("ko-KR")}원`;
}

export const TEMPLATE_PRODUCTS: TemplateProduct[] = [
  {
    slug: "takmong-ai-template",
    name: "탁몽 AI 디자인 템플릿",
    category: "AI 템플릿",
    brand: "탁몽",
    price: 99000,
    originalPrice: 320000,
    summary:
      "AI로 스마트스토어 상세페이지를 셀프로 완성하는 디자인 템플릿. 자동화봇 8가지 질문에 답하면 내용이 자동으로 완성됩니다.",
    highlights: [
      "AI와 함께 상세페이지 구조화",
      "8문답 자동완성 봇 제공",
      "상품등록·판매페이지 실전 자료",
    ],
    storeUrl: "https://smartstore.naver.com/takdijang/products/13577000625",
    freebie: "구매 전원 ‘상세페이지 점검 체크리스트 PDF’ 증정",
    featured: true,
    image: "/templates/takmong-ai-template/thumbnail.png",
  },
  {
    slug: "detail-diagnosis",
    name: "상세페이지 진단 · 1:1 컨설팅",
    category: "진단 · 컨설팅",
    brand: "탁디장",
    price: 29000,
    originalPrice: 59000,
    summary:
      "타깃·고민·강점·첫 화면 메시지를 정리해 판매 흐름을 잡아주는 사전 방향 진단 리포트입니다.",
    highlights: [
      "내 상품에 맞는 상세페이지 방향 정리",
      "첫 화면 카피·소구 포인트 진단",
      "탁몽 템플릿 활용 전 사전 진단",
    ],
    storeUrl: "https://smartstore.naver.com/takdijang/products/13578172609",
    image: "/templates/detail-diagnosis/thumbnail.png",
  },
];
