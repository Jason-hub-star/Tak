/**
 * 전환/이벤트 추적 헬퍼.
 * GA4(gtag)와 Meta Pixel(fbq)에 동시에 발화한다.
 * 스크립트가 로드되지 않은 환경(키 미설정·SSR·광고차단)에서는 안전한 no-op.
 */

type Params = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** 일반 이벤트 — 클릭/조회 등. GA4 커스텀 이벤트 + Meta 커스텀 이벤트로 발화 */
export function track(event: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
    window.fbq?.("trackCustom", event, params);
  } catch {
    // 측정 실패가 UX를 막지 않도록 무시
  }
}

/**
 * 리드 전환 — 문의/진단 제출 등 핵심 전환.
 * 각 플랫폼이 "전환"으로 인식하는 표준 이벤트로 발화한다(광고 최적화 신호).
 *  - GA4: generate_lead
 *  - Meta: Lead
 */
export function trackLead(source: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "generate_lead", { source, ...params });
    window.fbq?.("track", "Lead", { content_name: source, ...params });
  } catch {
    // 무시
  }
}
