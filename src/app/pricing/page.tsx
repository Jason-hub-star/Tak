import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import FinalCTASection from "@/components/sections/FinalCTASection";
import PricingCard from "@/components/PricingCard";
import {
  PRICING_PLANS,
  PRICING_COMPARE,
  PRICING_FAQ,
  PRICING_DISCLOSURES,
  PRICING_PAGE_COPY,
} from "@/lib/content/pricing";

export const metadata: Metadata = {
  title: "가격 | 상세페이지·웹사이트 제작·홍보 케어 — 탁디장",
  description:
    "상세페이지 단품부터 브랜드 웹사이트 제작, 검색·광고 홍보 케어까지. 필요한 범위부터 투명하게 시작하는 탁디장 가격 안내.",
  openGraph: {
    title: "가격 | 탁디장",
    description: "제작 · 케어 · 광고 운영을 필요한 범위부터 투명하게.",
    type: "website",
    locale: "ko_KR",
  },
};

const GROUPS: { key: "build" | "care" | "ads"; title: string; desc: string }[] = [
  { key: "build", title: "제작 (Build)", desc: "한 번에 끝내는 상세페이지·웹사이트 제작" },
  { key: "care", title: "케어 (Care)", desc: "만든 다음을 챙기는 월 운영·홍보 관리" },
  { key: "ads", title: "광고 (Ads)", desc: "검색·플레이스 광고 세팅과 운영 대행" },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-4">
        {/* Page header */}
        <section className="section-padding pt-0 pb-10">
          <div className="container-main text-center">
            <span className="text-sm font-semibold tracking-wide text-primary">
              {PRICING_PAGE_COPY.eyebrow}
            </span>
            <h1 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground">
              {PRICING_PAGE_COPY.title}
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {PRICING_PAGE_COPY.sub}
            </p>
          </div>
        </section>

        {/* Plans grouped by category */}
        <section className="section-padding pt-0">
          <div className="container-main space-y-14">
            {GROUPS.map((group) => {
              const plans = PRICING_PLANS.filter((p) => p.category === group.key);
              if (plans.length === 0) return null;
              return (
                <div key={group.key}>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-foreground">
                      {group.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {group.desc}
                    </p>
                  </div>
                  <div
                    className={
                      plans.length >= 3
                        ? "grid grid-cols-1 md:grid-cols-3 gap-6"
                        : "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl"
                    }
                  >
                    {plans.map((plan) => (
                      <PricingCard key={plan.id} plan={plan} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Compare table */}
        <section className="section-padding pt-0">
          <div className="container-main">
            <div className="mb-6 text-center">
              <span className="text-sm font-semibold tracking-wide text-primary">
                {PRICING_COMPARE.eyebrow}
              </span>
              <h2 className="mt-2 text-display-sm font-bold text-foreground">
                {PRICING_COMPARE.title}
              </h2>
            </div>
            <div className="overflow-x-auto rounded-card border border-border">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="bg-muted">
                    {PRICING_COMPARE.columns.map((col, i) => (
                      <th
                        key={col}
                        className={`px-4 py-3 font-semibold text-foreground ${
                          i === 0 ? "text-left" : "text-center"
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRICING_COMPARE.rows.map((row) => (
                    <tr key={row.label} className="border-t border-border">
                      <td className="px-4 py-3 font-medium text-foreground/80">
                        {row.label}
                      </td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className="px-4 py-3 text-center text-muted-foreground"
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing FAQ */}
        <section className="section-padding pt-0">
          <div className="container-main max-w-3xl">
            <h2 className="text-display-sm font-bold text-foreground text-center mb-8">
              가격 관련 FAQ
            </h2>
            <div className="space-y-4">
              {PRICING_FAQ.map((item) => (
                <div
                  key={item.id}
                  className="rounded-card bg-white border border-border p-6"
                >
                  <h3 className="text-base font-bold text-foreground">
                    Q. {item.q}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Disclosures */}
            <ul className="mt-8 space-y-1.5 text-xs text-muted-foreground">
              {PRICING_DISCLOSURES.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-primary">·</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FinalCTASection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
