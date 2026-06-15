import { ArrowRight } from "lucide-react";
import { PRICING_PLANS } from "@/lib/content/pricing";
import PricingCard from "@/components/PricingCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** 홈 티저: 대표 3개 플랜(상세페이지 / 웹사이트 / 그로스 케어) */
const TEASER_IDS = ["detail", "website", "care-growth"];

export default function PricingTeaserSection() {
  const plans = TEASER_IDS.map(
    (id) => PRICING_PLANS.find((p) => p.id === id)!
  ).filter(Boolean);

  return (
    <Section id="pricing" className="bg-white">
      <SectionHeader
        className="mb-14"
        eyebrow="PRICING"
        title="필요한 범위부터, 투명하게"
        sub="상세페이지 단품부터 웹사이트 제작·홍보 케어까지. 지금 필요한 만큼만 시작하세요."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 0.1} y={20} duration={0.4}>
            <PricingCard plan={plan} />
          </Reveal>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button
          href="/pricing"
          variant="ghost"
          size="link"
          trailingIcon={<ArrowRight size={16} />}
        >
          전체 가격·비교표 보기
        </Button>
      </div>
    </Section>
  );
}
