import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types";
import { Button } from "@/components/ui/Button";

export default function PricingCard({ plan }: { plan: PricingPlan }) {
  const featured = plan.featured;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-none p-7 md:p-8",
        featured
          ? "bg-primary-50 border-2 border-primary"
          : "bg-white border border-border"
      )}
    >
      {plan.badge && (
        <span className="mb-5 inline-block text-xs font-bold tracking-widest uppercase text-primary">
          {plan.badge}
        </span>
      )}

      <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
        {plan.label}
      </h3>

      <div className="mt-3 flex items-end gap-1">
        {plan.originalPrice && (
          <span className="mr-1 text-sm text-muted-foreground line-through">
            {plan.originalPrice}
          </span>
        )}
        <span className="text-4xl font-bold tracking-tight text-foreground">
          {plan.price}
        </span>
        <span className="mb-1 text-sm text-muted-foreground">
          {plan.period}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {plan.body}
      </p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-sm text-foreground/80"
          >
            <Check size={16} className="mt-0.5 shrink-0 text-primary" />
            {f}
          </li>
        ))}
      </ul>

      <Button
        href={plan.ctaHref}
        variant={featured ? "primary" : "outline"}
        size="md"
        className="mt-8"
      >
        {plan.cta}
      </Button>
    </div>
  );
}
