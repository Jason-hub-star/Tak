import emailjs from "@emailjs/browser";
import {
  buildDiagnosisMessage,
  extractDiagnosisFields,
  type AnswerValue,
} from "@/lib/content/diagnose";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
// 수신 이메일. EmailJS 템플릿 "To Email"에 {{to_email}}로 두면 이 값으로 발송된다.
// 비워두면 템플릿에 직접 설정한 수신 주소를 사용한다. (실주소는 .env.local에만, 레포 커밋 금지)
const TO_EMAIL = process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL ?? "";

export interface EmailPayload {
  name: string;
  brandOrStore: string;
  contact: string;
  inquiryType: string;
  budgetRange: string;
  deadline?: string;
  message: string;
  /** 답장(Reply-To) 받을 고객 이메일. 템플릿 Reply To에 {{email}} 로 매핑 */
  replyEmail?: string;
}

export async function sendInquiry(payload: EmailPayload): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      "[EmailJS] 환경변수가 설정되지 않았습니다. .env.local을 확인하세요."
    );
  }

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    ...(TO_EMAIL ? { to_email: TO_EMAIL } : {}),
    ...(payload.replyEmail ? { email: payload.replyEmail } : {}),
    from_name: payload.name,
    brand: payload.brandOrStore,
    contact: payload.contact,
    inquiry_type: payload.inquiryType,
    budget: payload.budgetRange,
    deadline: payload.deadline || "미정",
    message: payload.message,
  }, PUBLIC_KEY);
}

/** 무료 진단 위저드 제출 — 응답을 직렬화해 기존 EmailJS 템플릿으로 발송 */
export async function sendDiagnosis(
  answers: Record<string, AnswerValue>,
  otherTexts: Record<string, string>
): Promise<void> {
  const f = extractDiagnosisFields(answers);
  await sendInquiry({
    name: f.name,
    brandOrStore: f.company,
    contact: [f.email, f.phone].filter(Boolean).join(" / ") || "(미입력)",
    inquiryType: "무료 진단 신청",
    budgetRange: f.budget || "상담 후 결정",
    deadline: f.timeline || undefined,
    message: buildDiagnosisMessage(answers, otherTexts),
    replyEmail: f.email || undefined,
  });
}
