import type { MetadataRoute } from "next";
import { getAllPortfolios } from "@/lib/content/portfolio";
import { TEMPLATE_PRODUCTS } from "@/lib/content/templates";
import { SITE } from "@/lib/seo/site";

const BASE_URL = SITE.url;

/**
 * lastmod 은 빌드마다 바뀌는 new Date() 대신 안정적인 콘텐츠 날짜를 쓴다.
 *  - 정적·템플릿: SITE.contentUpdated (본문 갱신 시 수동 bump)
 *  - 포트폴리오: 각 항목의 publishedAt (실제 발행일)
 * 부정확한 "always-fresh" lastmod 보다 정직한 고정값이 크롤 신뢰도가 높다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = SITE.contentUpdated;

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: updated, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE_URL}/services`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/takmong`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: updated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const portfolioPages: MetadataRoute.Sitemap = getAllPortfolios().map(
    (item) => ({
      url: `${BASE_URL}/portfolio/${item.slug}`,
      lastModified: item.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const templatePages: MetadataRoute.Sitemap = TEMPLATE_PRODUCTS.map((p) => ({
    url: `${BASE_URL}/templates/${p.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...portfolioPages, ...templatePages];
}
