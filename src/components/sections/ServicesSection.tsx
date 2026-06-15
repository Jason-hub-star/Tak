import { FileText, Globe, TrendingUp, RefreshCw, ArrowRight } from "lucide-react";
import { SERVICES, SERVICES_PAGE_COPY } from "@/lib/content/services";
import { getAllPortfolios } from "@/lib/content/portfolio";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";

const ICONS: Record<string, React.ElementType> = {
  FileText,
  Globe,
  TrendingUp,
  RefreshCw,
};

export default function ServicesSection() {
  // 에디토리얼 이미지 컬럼에 포트폴리오 이미지 재활용 (부족분은 플레이스홀더)
  const works = getAllPortfolios();

  return (
    <Section id="services" bg="background">
      <SectionHeader
        className="mb-16 lg:mb-24"
        eyebrow={SERVICES_PAGE_COPY.eyebrow}
        title={SERVICES_PAGE_COPY.title}
        sub={SERVICES_PAGE_COPY.sub}
      />

      {/* 비대칭 [텍스트 | 대형 이미지] 교차 행 */}
      <div className="space-y-16 lg:space-y-28">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[service.icon];
          const reverse = i % 2 === 1;
          const thumb = works[i]?.thumbnail;
          return (
            <Reveal key={service.id} y={24} duration={0.5}>
              <div className="grid items-center gap-8 lg:gap-16 md:grid-cols-2">
                {/* 텍스트 */}
                <div className={cn(reverse && "md:order-2")}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                      {Icon && <Icon size={24} />}
                    </div>
                    <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                      {service.eyebrow}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {service.summary}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm md:text-base text-foreground/80 flex items-start gap-2.5"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.deliverables.map((d) => (
                      <Badge key={d} variant="muted" size="sm">
                        {d}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 대형 이미지 (포트폴리오 재활용 / 플레이스홀더) */}
                <MediaFrame
                  src={thumb}
                  alt={service.title}
                  aspect="aspect-[4/3]"
                  grayscale
                  label="작업 이미지 준비중"
                  className={cn(reverse && "md:order-1")}
                />
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Button
          href="/services"
          variant="ghost"
          size="link"
          trailingIcon={<ArrowRight size={16} />}
        >
          전체 서비스 자세히 보기
        </Button>
      </div>
    </Section>
  );
}
