import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { Button } from "@/components/ui/Button";
import { KAKAO_CHANNEL_URL } from "@/lib/constants";
import { DIAGNOSE_FORM } from "@/lib/content/diagnose";

export const metadata: Metadata = {
  title: "진단 신청이 접수됐어요",
  description: "주신 내용을 검토하고 영업일 기준 30분~3시간 안에 이메일로 회신드려요.",
  robots: { index: false },
};

export default function ThankYouPage() {
  const { thankyou } = DIAGNOSE_FORM;
  return (
    <>
      <Header />
      <main className="pt-32 pb-4">
        <section className="section-padding pt-0 pb-10">
          <div className="container-main text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              {thankyou.eyebrow}
            </span>
            <h1 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground">
              {thankyou.title}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              {thankyou.sub}
            </p>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="container-main mx-auto max-w-2xl px-5 py-16 text-center md:px-8 lg:py-24">
            <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-card border border-border bg-muted/40 p-8">
              <span
                aria-hidden
                className="grid h-16 w-16 place-items-center rounded-full bg-primary text-3xl text-primary-foreground"
              >
                ✓
              </span>
              <p className="text-muted-foreground leading-relaxed">
                회신 메일은 입력하신 이메일로 발송돼요. 스팸함도 한 번
                확인해주세요.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {thankyou.ctas.map((cta) => (
                  <Button
                    key={cta.href}
                    href={cta.href}
                    variant={cta.variant}
                    size="md"
                  >
                    {cta.label}
                  </Button>
                ))}
                <Button
                  href={KAKAO_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="kakao"
                  size="md"
                >
                  카카오톡 채널
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
