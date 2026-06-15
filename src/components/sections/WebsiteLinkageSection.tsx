import { ArrowRight } from "lucide-react";
import { LINKAGE_STEPS, LINKAGE_COPY } from "@/lib/content/services";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export default function WebsiteLinkageSection() {
  return (
    <Section id="linkage" className="bg-primary-50/40">
      <SectionHeader
        className="mb-14"
        eyebrow={LINKAGE_COPY.eyebrow}
        title={LINKAGE_COPY.title}
        sub={LINKAGE_COPY.sub}
      />

      {/* 제작 → 연결 → 전환 → 관리 흐름 (플랫 에디토리얼) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {LINKAGE_STEPS.map((step, i) => (
          <Reveal key={step.phase} delay={i * 0.1} y={16} duration={0.4}>
            <div className="relative border-t-2 border-foreground/10 pt-6">
              <span className="text-5xl font-bold leading-none text-primary/80 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-lg font-bold text-foreground break-keep">
                {step.phase}
              </h3>
              <p className="mt-1 text-sm font-semibold text-foreground/80 break-keep">
                {step.label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground break-keep text-pretty">{step.desc}</p>

              {/* 단계 연결 화살표 (마지막 제외) */}
              {i < LINKAGE_STEPS.length - 1 && (
                <ArrowRight
                  size={20}
                  className="hidden lg:block absolute top-7 -right-4 text-primary/40 z-10"
                />
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button
          href="/contact"
          variant="primary"
          size="lg"
          trailingIcon={<ArrowRight size={18} />}
        >
          제작부터 홍보까지 상담하기
        </Button>
      </div>
    </Section>
  );
}
