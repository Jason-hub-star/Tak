import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 섹션 헤더(eyebrow + 제목 + 보조문) 공용 프리미티브.
 */
type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-sm font-semibold tracking-wide text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground">
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            "mt-3 text-muted-foreground",
            align === "center" && "max-w-xl mx-auto"
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
