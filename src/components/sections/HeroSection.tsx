import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HERO_COPY } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden section-padding pt-32 md:pt-40 lg:pt-48 pb-16 lg:pb-24"
    >
      {/* 배경 영상 — poster를 기본으로 깔고, 안전조건 통과 시에만 영상을 얹음
          (모바일=경량 영상 / Save-Data·느린망·reduced-motion=poster 유지) */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/hero/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <HeroBackgroundVideo />
        {/* 가독성 오버레이 */}
        <div className="absolute inset-0 bg-[#FAFAF8]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8]/50 via-transparent to-[#FAFAF8]" />
      </div>

      <div className="container-main relative z-10 text-center">
        {/* Eyebrow label */}
        <Reveal immediate y={12}>
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            TAKDIJANG · DESIGN STUDIO
          </span>
        </Reveal>

        {/* Headline */}
        <Reveal immediate delay={0.08}>
          <h1 className="mt-6 text-display-sm md:text-display-md lg:text-display-lg xl:text-[5.25rem] tracking-tight text-foreground break-keep text-balance">
            {HERO_COPY.headline}
            <br className="sm:hidden" />
            <span className="text-primary">{HERO_COPY.headlineAccent}</span>
            {HERO_COPY.headlineSuffix}
          </h1>
        </Reveal>

        {/* Sub */}
        <Reveal immediate delay={0.15} y={16}>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed break-keep text-pretty">
            {/* 모바일(sm 미만)에서만 구절 단위로 줄바꿈, 데스크톱에서는 한 문단으로 */}
            <span className="hidden sm:inline">{HERO_COPY.sub}</span>
            <span className="sm:hidden">
              {HERO_COPY.subLines?.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </span>
          </p>
        </Reveal>

        {/* CTA */}
        <Reveal
          immediate
          delay={0.3}
          y={16}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            trailingIcon={<ArrowRight size={18} />}
          >
            {HERO_COPY.cta}
          </Button>
          <Button href={HERO_COPY.secondaryCtaHref} variant="outline" size="lg">
            {HERO_COPY.secondaryCta}
          </Button>
        </Reveal>

        {/* Trust Badges */}
        <Reveal
          immediate
          delay={0.45}
          y={0}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {HERO_COPY.trustBadges.map((badge) => (
            <Badge key={badge} variant="accent" size="md">
              {badge}
            </Badge>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
