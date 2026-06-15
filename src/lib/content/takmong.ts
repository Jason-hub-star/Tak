/**
 * 탁몽 — 탁디장의 AI 상세페이지 제작 서비스(와디즈 펀딩 런칭 상품).
 * /takmong 제품 랜딩에서 사용. 가격은 와디즈 리워드 실가격 기준.
 */

export interface TakmongTier {
  /** 리워드 명칭 */
  name: string;
  /** 한 줄 설명 */
  desc: string;
  /** 표시 가격 (예: "289,000원") */
  price: string;
  /** 강조 배지 (예: "1등", "선착순") */
  badge?: string;
  /** 추천(강조) 카드 여부 */
  featured?: boolean;
}

export interface TakmongContent {
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  funding: {
    rate: string;
    amount: string;
    backers: string;
    closedAt: string;
  };
  wadizUrl: string;
  tiers: TakmongTier[];
}

export const TAKMONG: TakmongContent = {
  eyebrow: "AI 상세페이지 제작 서비스",
  title: "탁몽",
  tagline: "AI로 브랜딩부터 기획·촬영까지, 상세페이지를 직접 완성합니다",
  body: "외주 한 번에 끝내는 대신, 셀러가 직접 상세페이지를 만들 수 있게 흐름을 잡아주는 실무형 서비스입니다. 단계별 리워드로 필요한 만큼만 시작하세요.",
  funding: {
    rate: "740%",
    amount: "3,701,000원",
    backers: "51명",
    closedAt: "2026.05.06",
  },
  wadizUrl: "https://www.wadiz.kr/web/campaign/detail/384334",
  tiers: [
    {
      name: "맛보기",
      desc: "상세페이지 흐름 이해",
      price: "99,000원",
    },
    {
      name: "기본정식",
      desc: "기획·브랜딩 방향 정리",
      price: "289,000원",
    },
    {
      name: "탁몽정식",
      desc: "떠먹여주는 상세페이지 실전 완성",
      price: "389,000원",
      badge: "1등",
      featured: true,
    },
    {
      name: "쉐프정식",
      desc: "1:1 코칭 포함 프리미엄",
      price: "590,000원",
      badge: "선착순",
    },
  ],
};
