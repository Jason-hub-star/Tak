/**
 * 무료 진단 신청 — 멀티스텝 상담 위저드 설정 (SSOT).
 * devfive의 "무료 진단" 상담지 패턴을 탁디장 도메인(상세페이지/웹사이트)으로 각색.
 */

export type ContactAnswer = { email: string; phone?: string; memo?: string };
export type AnswerValue = string | string[] | ContactAnswer;

type BaseQ = { id: string; label: string; required?: boolean };

export type TextQ = BaseQ & {
  type: "text" | "url" | "textarea";
  placeholder?: string;
  maxLength?: number;
};
export type RadioQ = BaseQ & {
  type: "radio";
  options: string[];
  allowOther?: boolean;
};
export type CheckboxQ = BaseQ & {
  type: "checkbox";
  options: string[];
  allowOther?: boolean;
};
export type ContactQ = BaseQ & {
  type: "contact";
  fields: {
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    memo: { label: string; placeholder: string };
  };
};

export type DiagnoseQuestion = TextQ | RadioQ | CheckboxQ | ContactQ;

export type DiagnoseStep = {
  id: string;
  stepNumber: number;
  title: string;
  sub: string;
  questions: DiagnoseQuestion[];
};

export type DiagnoseForm = {
  hero: { eyebrow: string; title: string; sub: string };
  steps: DiagnoseStep[];
  thankyou: {
    eyebrow: string;
    title: string;
    sub: string;
    ctas: { label: string; href: string; variant: "primary" | "outline" | "ghost" }[];
  };
};

export const DIAGNOSE_FORM: DiagnoseForm = {
  hero: {
    eyebrow: "FREE DIAGNOSIS",
    title: "무료 진단 신청",
    sub: "5분이면 끝나는 13개 질문이에요. 답해주신 내용으로 상세페이지·웹사이트의 약점과 우선순위를 정리해 회신드려요.",
  },
  steps: [
    {
      id: "company",
      stepNumber: 1,
      title: "회사·브랜드 정보",
      sub: "어떤 브랜드인지 먼저 알려주세요.",
      questions: [
        {
          id: "q1_company",
          type: "text",
          label: "회사·브랜드명",
          placeholder: "예) 탁디장",
          required: true,
          maxLength: 100,
        },
        {
          id: "q2_url",
          type: "url",
          label: "현재 웹사이트·스토어 URL (있다면)",
          placeholder: "https://...",
          required: false,
          maxLength: 200,
        },
        {
          id: "q3_industry",
          type: "text",
          label: "업종·아이템",
          placeholder: "예) 수제 디저트, 뷰티 디바이스",
          required: true,
          maxLength: 100,
        },
      ],
    },
    {
      id: "current",
      stepNumber: 2,
      title: "현재 상황",
      sub: "지금 어디쯤 와 있는지 알려주세요.",
      questions: [
        {
          id: "q4_assets",
          type: "radio",
          label: "지금 가지고 있는 건?",
          required: true,
          options: [
            "아무것도 없음",
            "상세페이지만 있음",
            "웹사이트만 있음",
            "둘 다 있음",
          ],
        },
        {
          id: "q5_pain",
          type: "checkbox",
          label: "가장 큰 고민은? (복수 선택)",
          required: true,
          allowOther: true,
          options: [
            "전환율이 낮아요",
            "상세페이지가 약해요",
            "웹사이트가 없거나 낡았어요",
            "유입·홍보가 부족해요",
            "어디서부터 할지 모르겠어요",
          ],
        },
      ],
    },
    {
      id: "goal",
      stepNumber: 3,
      title: "원하는 작업",
      sub: "이번에 무엇을 만들고 싶은지 알려주세요.",
      questions: [
        {
          id: "q6_services",
          type: "checkbox",
          label: "필요한 작업 (복수 선택)",
          required: true,
          allowOther: true,
          options: [
            "상세페이지 제작",
            "브랜드 웹사이트 제작",
            "검색·광고 홍보",
            "운영·관리",
          ],
        },
        {
          id: "q7_goal",
          type: "radio",
          label: "이번 작업의 목표",
          required: true,
          allowOther: true,
          options: [
            "매출·전환 끌어올리기",
            "브랜드 신뢰 만들기",
            "신규 제품 런칭",
            "기존 페이지 리뉴얼",
          ],
        },
      ],
    },
    {
      id: "budget",
      stepNumber: 4,
      title: "예산·일정",
      sub: "대략적인 범위만 알려주셔도 돼요.",
      questions: [
        {
          id: "q8_budget",
          type: "radio",
          label: "예산 범위 (부가세 별도)",
          required: true,
          options: [
            "50만원 이하",
            "50~100만원",
            "100~200만원",
            "200만원 이상",
            "상담 후 결정",
          ],
        },
        {
          id: "q9_timeline",
          type: "radio",
          label: "희망 시작 시점",
          required: true,
          options: ["최대한 빨리", "1개월 이내", "1~3개월", "아직 미정"],
        },
        {
          id: "q10_notes",
          type: "textarea",
          label: "추가로 알려주실 내용 (선택)",
          placeholder: "참고 링크, 레퍼런스, 요청사항 등 자유롭게 적어주세요.",
          required: false,
          maxLength: 1000,
        },
      ],
    },
    {
      id: "contact",
      stepNumber: 5,
      title: "연락처",
      sub: "진단 결과를 보내드릴 곳이에요.",
      questions: [
        {
          id: "q11_name",
          type: "text",
          label: "담당자 성함",
          placeholder: "예) 홍길동",
          required: true,
          maxLength: 50,
        },
        {
          id: "q12_contact",
          type: "contact",
          label: "연락처",
          required: true,
          fields: {
            email: { label: "이메일", placeholder: "name@example.com" },
            phone: { label: "연락처(선택)", placeholder: "010-1234-5678" },
            memo: { label: "메모(선택)", placeholder: "통화 가능한 시간대 등" },
          },
        },
        {
          id: "q13_privacy",
          type: "checkbox",
          label: "개인정보 수집·이용 동의",
          required: true,
          options: ["개인정보 수집·이용에 동의합니다 (진단 회신 목적)"],
        },
      ],
    },
  ],
  thankyou: {
    eyebrow: "RECEIVED",
    title: "진단 신청이 접수됐어요",
    sub: "영업일 기준 30분~3시간 안에 입력하신 이메일로 진단 결과를 회신드려요. 스팸함도 한 번 확인해주세요.",
    ctas: [
      { label: "홈으로", href: "/", variant: "outline" },
      { label: "포트폴리오 보기", href: "/portfolio", variant: "ghost" },
    ],
  },
};

export const OTHER_VALUE = "__OTHER__";

/** 단일 응답을 읽기 좋은 문자열로 */
export function formatAnswer(
  value: AnswerValue | undefined,
  otherText: string | undefined
): string {
  if (value == null || value === "") return "— (응답 없음)";
  if (Array.isArray(value)) {
    if (value.length === 0) return "— (응답 없음)";
    return value
      .map((v) => (v === OTHER_VALUE ? `기타: ${otherText ?? ""}` : v))
      .join(", ");
  }
  if (typeof value === "string") {
    return value === OTHER_VALUE ? `기타: ${otherText ?? ""}` : value;
  }
  const c = value as ContactAnswer;
  return [
    `이메일: ${c.email}`,
    c.phone ? `연락처: ${c.phone}` : null,
    c.memo ? `메모: ${c.memo}` : null,
  ]
    .filter(Boolean)
    .join(" / ");
}

/** 전체 응답을 단계별 라벨 텍스트로 직렬화 (이메일 본문용) */
export function buildDiagnosisMessage(
  answers: Record<string, AnswerValue>,
  otherTexts: Record<string, string>
): string {
  return DIAGNOSE_FORM.steps
    .map((step) => {
      const lines = step.questions
        .map((q) => `- ${q.label}: ${formatAnswer(answers[q.id], otherTexts[q.id])}`)
        .join("\n");
      return `[STEP ${step.stepNumber}. ${step.title}]\n${lines}`;
    })
    .join("\n\n");
}

/** 제출용 핵심 필드 추출 */
export function extractDiagnosisFields(answers: Record<string, AnswerValue>) {
  const name = typeof answers.q11_name === "string" ? answers.q11_name : "";
  const company = typeof answers.q1_company === "string" ? answers.q1_company : "";
  const contact = answers.q12_contact as ContactAnswer | undefined;
  const budget = typeof answers.q8_budget === "string" ? answers.q8_budget : "";
  const timeline = typeof answers.q9_timeline === "string" ? answers.q9_timeline : "";
  return {
    name: name || company || "(미입력)",
    company: company || "(미입력)",
    email: contact?.email ?? "",
    phone: contact?.phone ?? "",
    budget,
    timeline,
  };
}
