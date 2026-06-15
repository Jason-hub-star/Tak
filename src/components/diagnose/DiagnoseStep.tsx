"use client";

import type { AnswerValue, DiagnoseStep } from "@/lib/content/diagnose";
import { DiagnoseField } from "./DiagnoseField";

export function DiagnoseStepView({
  step,
  answers,
  otherTexts,
  errors,
  onAnswer,
}: {
  step: DiagnoseStep;
  answers: Record<string, AnswerValue>;
  otherTexts: Record<string, string>;
  errors: Record<string, string>;
  onAnswer: (questionId: string, value: AnswerValue, otherText?: string) => void;
}) {
  return (
    <section className="rounded-card border border-border bg-white p-6 md:p-8">
      <header className="mb-6 border-b border-border pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary tabular-nums">
          STEP {String(step.stepNumber).padStart(2, "0")}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-foreground">{step.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{step.sub}</p>
      </header>
      <div className="space-y-6">
        {step.questions.map((q) => (
          <DiagnoseField
            key={q.id}
            question={q}
            value={answers[q.id]}
            otherText={otherTexts[q.id]}
            error={errors[q.id]}
            onChange={(value, otherText) => onAnswer(q.id, value, otherText)}
          />
        ))}
      </div>
    </section>
  );
}
