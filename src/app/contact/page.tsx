import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { Button } from "@/components/ui/Button";
import { KAKAO_CHANNEL_URL } from "@/lib/constants";
import { DIAGNOSE_FORM } from "@/lib/content/diagnose";

export const metadata: Metadata = {
  title: "무료 진단 신청 | 탁디장",
  description:
    "5분 안에 끝나는 13개 질문으로 상세페이지·웹사이트의 약점과 우선순위를 정리해 회신드립니다.",
  openGraph: {
    title: "무료 진단 신청 | 탁디장",
    description: "5분이면 끝나는 무료 진단으로 지금 필요한 작업부터 짚어드려요.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function ContactPage() {
  const { hero } = DIAGNOSE_FORM;
  return (
    <>
      <Header />
      <main className="pt-32 pb-4">
        <section className="section-padding pt-0 pb-10">
          <div className="container-main text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              FREE DIAGNOSIS
            </span>
            <h1 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground">
              {hero.title}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              {hero.sub}
            </p>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="container-main mx-auto max-w-3xl px-5 py-16 md:px-8 lg:py-24">
            <div className="flex flex-col items-center gap-6 rounded-card border border-border bg-white p-8 text-center md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                5분이면 끝나요
              </h2>
              <p className="max-w-xl text-muted-foreground leading-relaxed">
                13개 질문 5단계로 정리된 무료 진단 폼입니다. 답해주신 내용을 바탕으로
                상세페이지·웹사이트의 약점과 우선순위를 정리해 회신드려요. 자료가
                없어도 시작할 수 있어요.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button href="/contact/form" variant="primary" size="lg">
                  무료 진단 시작하기 →
                </Button>
                <Button
                  href={KAKAO_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="kakao"
                  size="lg"
                >
                  카카오톡으로 상담
                </Button>
              </div>

              <ul className="mx-auto mt-2 max-w-md space-y-1 text-left text-sm text-muted-foreground">
                <li>· 입력 도중 새로고침해도 작성한 내용이 그대로 남아요</li>
                <li>· 영업시간 안에 보통 30분~3시간 안에 회신드려요</li>
                <li>· 카카오톡 상담도 같이 받고 있어요</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
