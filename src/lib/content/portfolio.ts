import type { PortfolioItem } from "@/types";
import { PORTFOLIO_ITEMS } from "./portfolio-data";
import { getPortfolioImages } from "./portfolio-images";

/** 정적 레지스트리 → PortfolioItem 변환 (이미지 경로 포함) */
function resolveItem(data: (typeof PORTFOLIO_ITEMS)[number]): PortfolioItem {
  const images = getPortfolioImages(data.slug);
  return {
    slug: data.slug,
    title: data.title,
    clientType: data.clientType,
    category: data.category,
    industry: data.industry,
    deliverables: data.deliverables,
    kpi: data.kpi,
    thumbnail: images.thumbnail,
    heroImage: "",
    publishedAt: data.publishedAt,
    featured: data.featured,
    tags: data.tags,
    displayOrder: data.displayOrder,
    detailImages: images.detailImages,
    externalUrl: data.externalUrl,
    externalLabel: data.externalLabel,
    productHref: data.productHref,
  };
}

const sortPortfolios = (a: PortfolioItem, b: PortfolioItem) => {
  const aOrder = a.displayOrder ?? Number.POSITIVE_INFINITY;
  const bOrder = b.displayOrder ?? Number.POSITIVE_INFINITY;

  if (aOrder !== bOrder) return aOrder - bOrder;
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
};

/**
 * 내부 상세페이지 포트폴리오 목록 (수동 우선순위 → 최신순).
 * 외부 링크 항목(externalUrl)은 제외 — 홈 계단·서비스·연관추천은 모두 내부 라우팅이라
 * 외부 항목이 섞이면 /portfolio/[slug] 404가 발생하기 때문.
 */
export function getAllPortfolios(): PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((p) => !p.externalUrl)
    .map(resolveItem)
    .sort(sortPortfolios);
}

/** 외부 링크 항목 목록 (와디즈 펀딩 등, 최신순) */
export function getExternalWorks(): PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((p) => p.externalUrl)
    .map(resolveItem)
    .sort(sortPortfolios);
}

/** slug 기준 단일 조회 (내부 항목만 — 외부 링크 항목은 상세페이지가 없음) */
export function getPortfolioBySlug(
  slug: string
): { item: PortfolioItem; content: string } | null {
  const data = PORTFOLIO_ITEMS.find((p) => p.slug === slug && !p.externalUrl);
  if (!data) return null;

  return {
    item: resolveItem(data),
    content: "",
  };
}

/** 모든 slug 목록 (SSG용 generateStaticParams — 내부 항목만) */
export function getAllPortfolioSlugs(): string[] {
  return PORTFOLIO_ITEMS.filter((p) => !p.externalUrl).map((p) => p.slug);
}

/** 유사 프로젝트 추천 (같은 카테고리, 최대 3개) */
export function getRelatedPortfolios(
  currentSlug: string,
  limit = 3
): PortfolioItem[] {
  const all = getAllPortfolios();
  const current = all.find((p) => p.slug === currentSlug);
  if (!current)
    return all.filter((p) => p.slug !== currentSlug).slice(0, limit);

  return all
    .filter(
      (p) =>
        p.slug !== currentSlug &&
        p.category.some((c) => current.category.includes(c))
    )
    .slice(0, limit);
}
