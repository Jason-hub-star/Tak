/** 포트폴리오 콘텐츠 스키마 (PRD 4.2) */
export interface PortfolioItem {
  slug: string;
  title: string;
  clientType: string;
  category: string[];
  industry: string;
  deliverables: string[];
  kpi: string;
  thumbnail: string;
  heroImage: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  detailImages: string[];
}

/** 포트폴리오 정적 데이터 레지스트리 항목 */
export interface PortfolioItemData {
  slug: string;
  title: string;
  clientType: string;
  category: string[];
  industry: string;
  deliverables: string[];
  kpi: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
}

/** 문의 폼 페이로드 (PRD InquiryPayload) */
export interface InquiryPayload {
  name: string;
  brandOrStore: string;
  contact: string;
  inquiryType: string;
  budgetRange: string;
  deadline: string;
  message: string;
  privacyConsent: boolean;
}

/** 프로세스 단계 */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  deliverable: string;
  icon: string;
}

/** FAQ 아이템 */
export interface FAQItem {
  question: string;
  answer: string;
}

/** 내비게이션 링크 */
export interface NavLink {
  label: string;
  href: string;
}

/** 서비스 항목 (제작 + 홍보 연계 4-서비스 모델) */
export interface ServiceItem {
  id: string;
  icon: string;
  eyebrow: string;
  title: string;
  summary: string;
  points: string[];
  deliverables: string[];
}

/** 제작→홍보 연계 흐름 단계 */
export interface LinkageStep {
  phase: string;
  label: string;
  desc: string;
}

/** 가격 플랜 */
export interface PricingPlan {
  id: string;
  category: "build" | "care" | "ads";
  label: string;
  price: string;
  period: string;
  originalPrice?: string;
  body: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured: boolean;
  badge?: string;
}
