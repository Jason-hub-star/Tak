import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 섹션 래퍼 공용 프리미티브.
 * <section>에 배경을, 내부 컨테이너에 section-padding + container-main을 적용한다.
 */
const sectionVariants = cva("", {
  variants: {
    bg: {
      none: "",
      background: "bg-background",
      muted: "bg-muted",
    },
  },
  defaultVariants: {
    bg: "none",
  },
});

type SectionProps = VariantProps<typeof sectionVariants> & {
  children: ReactNode;
  id?: string;
  className?: string;
  /** 내부 컨테이너 클래스 오버라이드(max-width 축소, text-center 등) */
  containerClassName?: string;
};

export function Section({
  bg,
  id,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn(sectionVariants({ bg }), className)}>
      <div className={cn("container-main section-padding", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
