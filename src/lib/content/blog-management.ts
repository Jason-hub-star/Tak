import type { BlogManagementCase } from "@/types";

export const BLOG_MANAGEMENT_PAGE_COPY = {
  eyebrow: "BLOG MANAGEMENT",
  title: "검색되는 콘텐츠로 브랜드를 꾸준히 운영합니다",
  sub: "블로그 운영은 단발 포스팅이 아니라 고객이 찾아오는 경로를 쌓는 일입니다. 콘텐츠 기획, 포스팅 운영, 검색 노출 관리를 한 흐름으로 관리합니다.",
} as const;

export const BLOG_MANAGEMENT_CASES: BlogManagementCase[] = [
  {
    slug: "artdoorstore",
    title: "금강이지스 현관중문 · 블로그 운영",
    clientType: "현관중문 브랜드",
    industry: "인테리어 · 홈",
    summary:
      "시공 사례와 제품 정보를 검색 의도에 맞춰 정리해 잠재 고객이 브랜드를 발견하고 비교할 수 있는 운영 채널로 관리했습니다.",
    deliverables: ["콘텐츠 기획", "포스팅 운영", "검색 노출 관리"],
    kpi: "누적 48,000+ 방문 · 이웃 1,800명+",
    publishedAt: "2026-06-10",
    featured: true,
    tags: ["블로그운영", "콘텐츠마케팅", "검색노출"],
    externalUrl: "https://blog.naver.com/artdoorstore",
    externalLabel: "블로그 바로가기",
  },
];

export function getBlogManagementCases(): BlogManagementCase[] {
  return [...BLOG_MANAGEMENT_CASES].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
