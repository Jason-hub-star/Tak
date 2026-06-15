"use client";

import { cn } from "@/lib/utils";

export function DiagnoseProgress({
  current,
  total,
  stepTitles,
}: {
  current: number;
  total: number;
  stepTitles: string[];
}) {
  const percent = Math.round(((current + 1) / total) * 100);
  return (
    <div className="rounded-card border border-border bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground tabular-nums">
          STEP {String(current + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <span className="text-sm font-bold text-primary tabular-nums">
          {percent}%
        </span>
      </div>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="진단 폼 진행률"
      >
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ol
        className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2"
        aria-label="진단 폼 단계"
      >
        {stepTitles.map((title, i) => {
          const isActive = i === current;
          const isDone = i < current;
          return (
            <li
              key={title}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm",
                isActive
                  ? "font-semibold text-primary"
                  : isDone
                    ? "text-foreground"
                    : "text-muted-foreground"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "inline-grid h-5 w-5 place-items-center rounded-full text-xs tabular-nums",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isDone
                      ? "bg-primary-50 text-primary-700"
                      : "border border-border bg-white text-muted-foreground"
                )}
              >
                {isDone ? "✓" : i + 1}
              </span>
              <span>{title}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
