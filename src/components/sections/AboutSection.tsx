import { ArrowRight, Check } from "lucide-react";
import { ABOUT_COPY } from "@/lib/constants";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";

export default function AboutSection() {
  return (
    <Section id="about">
      <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-[1.3fr_1fr]">
        {/* 텍스트 */}
        <Reveal y={24} duration={0.5}>
          <h2 className="text-display-sm md:text-display-md font-bold text-foreground leading-tight break-keep text-balance">
            &ldquo;{ABOUT_COPY.title}&rdquo;
          </h2>

          <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed break-keep text-pretty">
            {ABOUT_COPY.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <ul className="mt-8 space-y-3">
            {ABOUT_COPY.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-foreground break-keep">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-sm md:text-base">{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button
              href="/contact"
              variant="soft"
              size="pill"
              trailingIcon={<ArrowRight size={16} />}
            >
              {ABOUT_COPY.cta}
            </Button>
          </div>
        </Reveal>

        {/* 이미지 (플레이스홀더 — 스튜디오/대표 사진 자리) */}
        <Reveal y={24} duration={0.5} delay={0.1}>
          <MediaFrame
            src="/studio/about.jpg"
            alt="탁디장 대표"
            aspect="aspect-[4/5]"
            label="스튜디오 이미지 준비중"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </Reveal>
      </div>
    </Section>
  );
}
