import type { Metadata } from "next";
import {
  FileText,
  Globe,
  TrendingUp,
  RefreshCw,
  Check,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import WebsiteLinkageSection from "@/components/sections/WebsiteLinkageSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { SERVICES, SERVICES_PAGE_COPY } from "@/lib/content/services";
import { getAllPortfolios } from "@/lib/content/portfolio";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";

export const metadata: Metadata = {
  title: "서비스 | 상세페이지부터 웹사이트·홍보까지 — 탁디장",
  description:
    "상세페이지 제작에서 출발해 브랜드 웹사이트 제작과 검색·광고 홍보, 운영까지. 따로 의뢰하지 않아도 한 곳에서 연결되는 탁디장 서비스.",
  openGraph: {
    title: "서비스 | 탁디장",
    description:
      "상세페이지 · 웹사이트 제작 · 검색/광고 홍보 · 운영 관리를 한 흐름으로.",
    type: "website",
    locale: "ko_KR",
  },
};

const ICONS: Record<string, React.ElementType> = {
  FileText,
  Globe,
  TrendingUp,
  RefreshCw,
};

export default function ServicesPage() {
  const works = getAllPortfolios();

  return (
    <>
      <Header />
      <main className="pt-32 pb-4">
        {/* Page header */}
        <section className="section-padding pt-0 pb-10">
          <div className="container-main text-center">
            <span className="text-sm font-semibold tracking-wide text-primary">
              {SERVICES_PAGE_COPY.eyebrow}
            </span>
            <h1 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground">
              {SERVICES_PAGE_COPY.title}
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {SERVICES_PAGE_COPY.sub}
            </p>
          </div>
        </section>

        {/* Detailed services — 비대칭 [텍스트 | 대형 이미지] 교차 행 (에디토리얼) */}
        <section className="section-padding pt-0">
          <div className="container-main space-y-16 lg:space-y-24">
            {SERVICES.map((service, i) => {
              const Icon = ICONS[service.icon];
              const reverse = i % 2 === 1;
              const thumb = works[i]?.thumbnail;
              return (
                <div
                  key={service.id}
                  className="grid items-center gap-8 lg:gap-16 md:grid-cols-2"
                >
                  <div className={cn(reverse && "md:order-2")}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                        {Icon && <Icon size={24} />}
                      </div>
                      <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        {service.eyebrow}
                      </span>
                    </div>
                    <h2 className="mt-5 text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                      {service.summary}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm md:text-base text-foreground/90"
                        >
                          <Check size={18} className="mt-0.5 text-primary shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.deliverables.map((d) => (
                        <Badge key={d} variant="muted" size="sm">
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <MediaFrame
                    src={thumb}
                    alt={service.title}
                    aspect="aspect-[4/3]"
                    grayscale
                    label="작업 이미지 준비중"
                    className={cn(reverse && "md:order-1")}
                  />
                </div>
              );
            })}

            <div className="text-center pt-2">
              <Button
                href="/pricing"
                variant="ghost"
                size="link"
                trailingIcon={<ArrowRight size={16} />}
              >
                서비스별 가격 보기
              </Button>
            </div>
          </div>
        </section>

        <WebsiteLinkageSection />
        <ProcessSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
