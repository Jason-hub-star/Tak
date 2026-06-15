import { Search, PenTool, Palette, Package } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

const ICONS: Record<string, React.ElementType> = {
  Search,
  PenTool,
  Palette,
  Package,
};

export default function ProcessSection() {
  return (
    <Section id="process" className="bg-white">
      <SectionHeader
        className="mb-16"
        title="프로세스"
        sub="체계적인 4단계 워크플로우로 수정을 줄이고 완성도를 끌어올립니다."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {PROCESS_STEPS.map((step, i) => {
          const Icon = ICONS[step.icon];
          return (
            <Reveal key={step.step} delay={i * 0.1} y={20} duration={0.4}>
              <div className="border-t-2 border-foreground/10 pt-6">
                {/* 큰 스텝 번호 + 아이콘 */}
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-bold leading-none text-primary/80 tabular-nums">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  {Icon && <Icon size={22} className="text-muted-foreground" />}
                </div>

                <h3 className="mt-6 text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                <Badge variant="muted" size="sm" className="mt-4">
                  {step.deliverable}
                </Badge>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
