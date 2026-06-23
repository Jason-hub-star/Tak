import type { Metadata } from "next";
import {
  ArrowUpRight,
  Check,
  MessageCircle,
  Search,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { KAKAO_CHANNEL_URL } from "@/lib/constants";
import {
  BLOG_MANAGEMENT_PAGE_COPY,
  getBlogManagementCases,
} from "@/lib/content/blog-management";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "블로그운영 | 검색 노출 콘텐츠 관리",
  description:
    "탁디장의 블로그 운영 사례. 콘텐츠 기획, 포스팅 운영, 검색 노출 관리를 한 흐름으로 관리합니다.",
  alternates: { canonical: "/blog-management" },
  openGraph: {
    title: "블로그운영 | 탁디장",
    description: "검색되는 콘텐츠로 브랜드를 꾸준히 운영합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

const PROCESS = [
  {
    title: "검색 의도 정리",
    body: "고객이 실제로 검색하는 표현과 비교 기준을 먼저 잡습니다.",
    icon: Search,
  },
  {
    title: "콘텐츠 운영",
    body: "시공 사례, 제품 정보, 브랜드 신뢰 요소를 꾸준히 포스팅합니다.",
    icon: MessageCircle,
  },
  {
    title: "성과 흐름 점검",
    body: "방문, 이웃, 노출 흐름을 보며 다음 콘텐츠 방향을 조정합니다.",
    icon: TrendingUp,
  },
];

export default function BlogManagementPage() {
  const cases = getBlogManagementCases();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "홈", path: "/" },
          { name: "블로그운영", path: "/blog-management" },
        ])}
      />
      <Header />
      <main className="pt-32 pb-4">
        <section className="section-padding pt-0 pb-12">
          <div className="container-main">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold tracking-wide text-primary">
                {BLOG_MANAGEMENT_PAGE_COPY.eyebrow}
              </span>
              <h1 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground break-keep text-balance">
                {BLOG_MANAGEMENT_PAGE_COPY.title}
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed break-keep text-pretty">
                {BLOG_MANAGEMENT_PAGE_COPY.sub}
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button href="/contact" variant="primary" size="lg">
                  운영 상담 문의
                </Button>
                <Button
                  href={KAKAO_CHANNEL_URL}
                  variant="kakao"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  leadingIcon={<MessageCircle size={17} />}
                >
                  카카오톡 문의
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding pt-0">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PROCESS.map(({ title, body, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-card bg-white border border-border p-6 shadow-card"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-50 text-secondary-700">
                    <Icon size={21} strokeWidth={2.4} aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-base font-bold text-foreground">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding pt-0">
          <div className="container-main">
            <div className="mb-6">
              <span className="text-sm font-semibold tracking-wide text-primary">
                CASES
              </span>
              <h2 className="mt-2 text-display-sm font-bold text-foreground">
                운영 사례
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cases.map((item) => (
                <a
                  key={item.slug}
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-card bg-white border border-border p-6 md:p-7 shadow-card transition-[box-shadow,transform,border-color] duration-200 hover:shadow-card-hover hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="accent" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-12">
                      <ArrowUpRight
                        size={18}
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors break-keep">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.clientType} · {item.industry}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-keep text-pretty">
                    {item.summary}
                  </p>

                  <div className="mt-5 rounded-card bg-primary-50 border border-primary/15 p-4">
                    <p className="text-sm font-semibold text-primary">
                      {item.kpi}
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {item.deliverables.map((deliverable) => (
                      <div
                        key={deliverable}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {deliverable}
                      </div>
                    ))}
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {item.externalLabel}
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
