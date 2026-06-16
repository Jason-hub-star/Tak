import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { TESTIMONIALS } from "@/lib/content/testimonials";

/**
 * 고객 후기 섹션. 표시 데이터는 서버에서 주입하고,
 * 인터랙션(드래그/자동재생)은 TestimonialCarousel 클라이언트 컴포넌트가 담당한다.
 */
export default function TestimonialsSection() {
  return (
    <Section id="testimonials" bg="muted">
      <SectionHeader
        className="mb-12"
        eyebrow="고객 후기"
        title="결과로 증명된 신뢰"
        sub="상세페이지 의뢰부터 오픈까지, 실제 고객이 남긴 이야기입니다."
      />
      <TestimonialCarousel items={TESTIMONIALS} />
    </Section>
  );
}
