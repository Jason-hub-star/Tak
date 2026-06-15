import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 알약형 라벨 공용 프리미티브.
 * trust 배지 / deliverable 태그 / featured 배지를 한 변형 세트로 통합.
 */
export const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        accent: "bg-primary-50 text-primary-700",
        muted: "bg-muted text-muted-foreground",
        solid: "bg-primary text-primary-foreground font-bold",
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "accent",
      size: "md",
    },
  }
);

type BadgeProps = VariantProps<typeof badgeVariants> & {
  children: ReactNode;
  className?: string;
};

export function Badge({ variant, size, className, children }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  );
}
