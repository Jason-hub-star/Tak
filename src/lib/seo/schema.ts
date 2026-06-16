/**
 * schema.org JSON-LD 빌더 모음.
 * 주소·전화 등 NAP가 확정되면 organizationSchema 에 address/telephone 를 추가한다.
 * (현재는 NAP 미확정 → Organization 으로 출력, LocalBusiness 승격은 추후)
 */
import { SITE, absoluteUrl } from "./site";

/** 조직(스튜디오) — 홈에 1회 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/icon"),
    description: SITE.description,
    sameAs: Object.values(SITE.social),
  };
}

/** 사이트 — 홈에 1회 (검색 액션 미사용 시 기본형) */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "ko-KR",
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

/** 빵부스러기 — 서브 페이지마다 */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** FAQ — Q/A 목록 (홈 FAQ 섹션, 가시 텍스트와 1:1 일치할 것) */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

/** 서비스 목록 — /services (제공 서비스 ItemList) */
export function serviceListSchema(
  services: { title: string; summary: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "탁디장 서비스",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: "KR",
      },
    })),
  };
}

/** 포트폴리오 상세 — CreativeWork */
export function creativeWorkSchema(work: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    description: work.description,
    url: absoluteUrl(work.path),
    ...(work.image ? { image: absoluteUrl(work.image) } : {}),
    creator: { "@id": `${SITE.url}/#organization` },
  };
}

/** 템플릿 상품 상세 — Product + Offer */
export function productSchema(p: {
  name: string;
  description: string;
  price: number;
  image?: string;
  storeUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    ...(p.image ? { image: absoluteUrl(p.image) } : {}),
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
      url: p.storeUrl,
    },
  };
}
