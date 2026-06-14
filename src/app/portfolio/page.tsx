import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { getAllPortfolios } from "@/lib/content/portfolio";

export const metadata: Metadata = {
  title: "포트폴리오 | 탁디장",
  description:
    "기획부터 납품까지, 설득의 구조로 완성한 상세페이지·웹사이트 작업들. 탁디장 포트폴리오.",
  openGraph: {
    title: "포트폴리오 | 탁디장",
    description: "설득의 구조로 완성한 상세페이지·웹사이트 작업들.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function PortfolioIndexPage() {
  const portfolios = getAllPortfolios();

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <section className="section-padding pt-0">
          <div className="container-main">
            <div className="mb-12">
              <span className="text-sm font-semibold tracking-wide text-primary">
                PORTFOLIO
              </span>
              <h1 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground">
                Selected Works
              </h1>
              <p className="mt-3 text-muted-foreground max-w-xl">
                기획부터 납품까지, 설득의 구조로 완성한 상세페이지·웹사이트
                작업들입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((item) => (
                <Link
                  key={item.slug}
                  href={`/portfolio/${item.slug}`}
                  className="group block rounded-card overflow-hidden bg-white shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized={item.thumbnail.endsWith(".gif")}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-sm font-medium text-muted-foreground">
                          {item.title}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.industry} · {item.kpi}
                    </p>
                  </div>
                </Link>
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
