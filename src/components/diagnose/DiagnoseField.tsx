"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  OTHER_VALUE,
  type AnswerValue,
  type ContactAnswer,
  type DiagnoseQuestion,
} from "@/lib/content/diagnose";

const inputClass =
  "w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";

export function DiagnoseField({
  question,
  value,
  otherText,
  error,
  onChange,
}: {
  question: DiagnoseQuestion;
  value: AnswerValue | undefined;
  otherText: string | undefined;
  error?: string;
  onChange: (next: AnswerValue, nextOther?: string) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-foreground">
        {question.label}
        {question.required && <span className="ml-1 text-primary">*</span>}
      </label>
      <FieldByType
        question={question}
        value={value}
        otherText={otherText}
        onChange={onChange}
      />
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function FieldByType({
  question,
  value,
  otherText,
  onChange,
}: {
  question: DiagnoseQuestion;
  value: AnswerValue | undefined;
  otherText: string | undefined;
  onChange: (next: AnswerValue, nextOther?: string) => void;
}) {
  switch (question.type) {
    case "text":
    case "url":
      return (
        <input
          type={question.type === "url" ? "url" : "text"}
          className={inputClass}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          maxLength={question.maxLength}
          aria-label={question.label}
        />
      );
    case "textarea":
      return (
        <textarea
          rows={4}
          className={cn(inputClass, "resize-none")}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          maxLength={question.maxLength}
          aria-label={question.label}
        />
      );
    case "radio":
      return (
        <RadioField
          question={question}
          value={typeof value === "string" ? value : null}
          otherText={otherText}
          onChange={onChange}
        />
      );
    case "checkbox":
      return (
        <CheckboxField
          question={question}
          value={Array.isArray(value) ? value : []}
          otherText={otherText}
          onChange={onChange}
        />
      );
    case "contact":
      return (
        <ContactField
          question={question}
          value={isContactAnswer(value) ? value : { email: "", phone: "", memo: "" }}
          onChange={onChange}
        />
      );
  }
}

function isContactAnswer(v: AnswerValue | undefined): v is ContactAnswer {
  return !!v && typeof v === "object" && !Array.isArray(v) && "email" in v;
}

function OptionRow({
  type,
  checked,
  label,
  onToggle,
}: {
  type: "radio" | "checkbox";
  checked: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-md border p-3.5 text-sm transition-colors",
        checked
          ? "border-primary bg-primary-50 text-foreground"
          : "border-border bg-white hover:border-primary/40"
      )}
    >
      <input
        type={type}
        className="sr-only"
        checked={checked}
        onChange={onToggle}
      />
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center border",
          type === "radio" ? "rounded-full" : "rounded",
          checked ? "border-primary bg-primary text-white" : "border-border"
        )}
      >
        {checked &&
          (type === "radio" ? (
            <span className="h-2 w-2 rounded-full bg-white" />
          ) : (
            <Check size={12} strokeWidth={3} />
          ))}
      </span>
      <span className="font-medium">{label}</span>
    </label>
  );
}

function RadioField({
  question,
  value,
  otherText,
  onChange,
}: {
  question: Extract<DiagnoseQuestion, { type: "radio" }>;
  value: string | null;
  otherText: string | undefined;
  onChange: (next: AnswerValue, nextOther?: string) => void;
}) {
  const showOther = value === OTHER_VALUE;
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {question.options.map((opt) => (
        <OptionRow
          key={opt}
          type="radio"
          checked={value === opt}
          label={opt}
          onToggle={() => onChange(opt, "")}
        />
      ))}
      {question.allowOther && (
        <OptionRow
          type="radio"
          checked={showOther}
          label="기타 (직접 입력)"
          onToggle={() => onChange(OTHER_VALUE, otherText ?? "")}
        />
      )}
      {showOther && (
        <input
          type="text"
          className={cn(inputClass, "sm:col-span-2")}
          value={otherText ?? ""}
          onChange={(e) => onChange(OTHER_VALUE, e.target.value)}
          placeholder="직접 입력해주세요"
          aria-label={`${question.label} 기타 입력`}
        />
      )}
    </div>
  );
}

function CheckboxField({
  question,
  value,
  otherText,
  onChange,
}: {
  question: Extract<DiagnoseQuestion, { type: "checkbox" }>;
  value: string[];
  otherText: string | undefined;
  onChange: (next: AnswerValue, nextOther?: string) => void;
}) {
  const showOther = value.includes(OTHER_VALUE);
  const toggle = (opt: string) => {
    const next = value.includes(opt)
      ? value.filter((v) => v !== opt)
      : [...value, opt];
    onChange(next, next.includes(OTHER_VALUE) ? otherText : "");
  };
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {question.options.map((opt) => (
        <OptionRow
          key={opt}
          type="checkbox"
          checked={value.includes(opt)}
          label={opt}
          onToggle={() => toggle(opt)}
        />
      ))}
      {question.allowOther && (
        <OptionRow
          type="checkbox"
          checked={showOther}
          label="기타 (직접 입력)"
          onToggle={() => toggle(OTHER_VALUE)}
        />
      )}
      {showOther && (
        <input
          type="text"
          className={cn(inputClass, "sm:col-span-2")}
          value={otherText ?? ""}
          onChange={(e) => onChange(value, e.target.value)}
          placeholder="직접 입력해주세요"
          aria-label={`${question.label} 기타 입력`}
        />
      )}
    </div>
  );
}

function ContactField({
  question,
  value,
  onChange,
}: {
  question: Extract<DiagnoseQuestion, { type: "contact" }>;
  value: ContactAnswer;
  onChange: (next: AnswerValue) => void;
}) {
  const update = (patch: Partial<ContactAnswer>) =>
    onChange({ ...value, ...patch });
  return (
    <div className="space-y-3">
      <input
        type="email"
        className={inputClass}
        value={value.email}
        onChange={(e) => update({ email: e.target.value })}
        placeholder={question.fields.email.placeholder}
        aria-label={question.fields.email.label}
      />
      <input
        type="tel"
        className={inputClass}
        value={value.phone ?? ""}
        onChange={(e) => update({ phone: e.target.value })}
        placeholder={question.fields.phone.placeholder}
        aria-label={question.fields.phone.label}
      />
      <textarea
        rows={3}
        className={cn(inputClass, "resize-none")}
        value={value.memo ?? ""}
        onChange={(e) => update({ memo: e.target.value })}
        placeholder={question.fields.memo.placeholder}
        maxLength={500}
        aria-label={question.fields.memo.label}
      />
    </div>
  );
}
