import { ArrowRight } from "lucide-react";
import { HERO_COPY } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative section-padding pt-32 md:pt-40 lg:pt-48 pb-16 lg:pb-24"
    >
      <div className="container-main text-center">
        {/* Eyebrow label */}
        <Reveal immediate y={12}>
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            TAKDJANG · DESIGN STUDIO
          </span>
        </Reveal>

        {/* Headline */}
        <Reveal immediate delay={0.08}>
          <h1 className="mt-6 text-display-sm md:text-display-md lg:text-display-lg xl:text-[5.25rem] tracking-tight text-foreground">
            {HERO_COPY.headline}
            <br />
            <span className="text-primary">{HERO_COPY.headlineAccent}</span>
            {HERO_COPY.headlineSuffix}
          </h1>
        </Reveal>

        {/* Sub */}
        <Reveal immediate delay={0.15} y={16}>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {HERO_COPY.sub}
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
