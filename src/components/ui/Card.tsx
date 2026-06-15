import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 카드 표면 공용 프리미티브. service/pricing 등에서 반복되던
 * rounded-card + border + shadow 조합을 통합한다.
 */
export const cardVariants = cva("rounded-card bg-white border", {
  variants: {
    variant: {
      default: "border-border shadow-card",
      featured: "border-primary shadow-card",
    },
    padded: {
      true: "p-7",
    },
  },
  defaultVariants: {
    variant: "default",
    padded: true,
  },
});

type CardProps = VariantProps<typeof cardVariants> & {
  children: ReactNode;
  className?: string;
};

export function Card({ variant, padded, className, children }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, padded }), className)}>
      {children}
    </div>
  );
}
