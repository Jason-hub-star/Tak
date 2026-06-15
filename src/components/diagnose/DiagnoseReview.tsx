"use client";

import { Button } from "@/components/ui/Button";
import {
  formatAnswer,
  type AnswerValue,
  type DiagnoseForm,
} from "@/lib/content/diagnose";

export function DiagnoseReview({
  data,
  answers,
  otherTexts,
  submitting,
  submitError,
  onEdit,
  onSubmit,
}: {
  data: DiagnoseForm;
  answers: Record<string, AnswerValue>;
  otherTexts: Record<string, string>;
  submitting: boolean;
  submitError: string | null;
  onEdit: (stepIndex: number) => void;
  onSubmit: () => void;
}) {
  return (
    <section className="rounded-card border border-border bg-white p-6 md:p-8">
      <header className="mb-6 border-b border-border pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          REVIEW
        </p>
        <h2 className="mt-2 text-2xl font-bold text-foreground">
          제출 전 한 번 더 확인해주세요
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          수정이 필요하면 각 단계의 <strong className="text-foreground">수정</strong>{" "}
          버튼으로 돌아갈 수 있어요.
        </p>
      </header>

      <ol className="space-y-4">
        {data.steps.map((step, idx) => (
          <li key={step.id} className="rounded-md border border-border bg-muted/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-foreground">
                STEP {step.stepNumber}. {step.title}
              </h3>
              <button
                type="button"
                onClick={() => onEdit(idx)}
                className="text-sm font-medium text-primary hover:text-primary-700 hover:underline"
              >
                수정
              </button>
            </div>
            <dl className="mt-3 space-y-2">
              {step.questions.map((q) => (
                <div key={q.id} className="text-sm">
                  <dt className="text-muted-foreground">{q.label}</dt>
                  <dd className="mt-0.5 text-foreground">
                    {formatAnswer(answers[q.id], otherTexts[q.id])}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>

      {submitError && (
        <p
          role="alert"
          className="mt-6 rounded-md border border-destructive/40 bg-red-50 p-3 text-sm text-destructive"
        >
          {submitError}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <p className="text-sm text-muted-foreground">
          접수 후 영업일 기준 30분 안에 회신드려요. 카카오톡 상담도 같이 받아요.
        </p>
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={onSubmit}
          disabled={submitting}
        >
          {submitting ? "제출 중…" : "진단 신청 보내기"}
        </Button>
      </div>
    </section>
  );
}
