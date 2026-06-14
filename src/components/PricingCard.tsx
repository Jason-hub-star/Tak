import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types";

export default function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-card p-7 border transition-shadow",
        plan.featured
          ? "border-primary bg-white shadow-cta"
          : "border-border bg-white shadow-sm"
      )}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-7 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
          {plan.badge}
        </span>
      )}

      <h3 className="text-lg font-bold text-foreground">{plan.label}</h3>

      <div className="mt-3 flex items-end gap-1">
        {plan.originalPrice && (
          <span className="text-sm text-muted-foreground line-through mr-1">
            {plan.originalPrice}
          </span>
        )}
        <span className="text-2xl font-bold text-foreground">{plan.price}</span>
        <span className="text-sm text-muted-foreground mb-0.5">
          {plan.period}
        </span>
      </div>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {plan.body}
      </p>

      <ul className="mt-5 space-y-2 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
            <Check size={16} className="mt-0.5 text-primary shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={plan.ctaHref}
        className={cn(
          "mt-6 inline-flex items-center justify-center px-5 py-3 min-h-[48px] rounded-lg text-sm font-semibold transition-colors",
          plan.featured
            ? "bg-primary text-primary-foreground hover:bg-primary-600 shadow-cta"
            : "border border-border text-foreground hover:bg-muted"
        )}
      >
        {plan.cta}
      </a>
    </div>
  );
}
