import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { DiagnoseFormShell } from "@/components/diagnose/DiagnoseFormShell";
import { DIAGNOSE_FORM } from "@/lib/content/diagnose";

export const metadata: Metadata = {
  title: "무료 진단 폼 | 탁디장",
  description:
    "13개 질문 5단계로 끝나는 무료 진단 폼. 답해주신 내용으로 약점과 우선순위를 정리해 회신드립니다.",
};

export default function DiagnoseFormPage() {
  const { hero } = DIAGNOSE_FORM;
  return (
    <>
      <Header />
      <main className="pt-32 pb-4">
        <section className="section-padding pt-0 pb-6">
          <div className="container-main mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              {hero.eyebrow}
            </span>
            <h1 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground">
              {hero.title}
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {hero.sub}
            </p>
          </div>
        </section>

        <DiagnoseFormShell data={DIAGNOSE_FORM} />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
