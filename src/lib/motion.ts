import type { Variants } from "framer-motion";

/**
 * 모션 토큰 — danbrise-barber.com 디자인 추출(designlang)에서 distill한
 * duration/easing을 탁디장 모션 언어로 이식한다. (색·타이포는 Tak 고유 값 유지)
 *
 * framer-motion은 초 단위 + cubic-bezier 배열을 쓰므로 ms를 초로 환산해 둔다.
 */
export const DURATION = {
  xs: 0.15,
  sm: 0.2,
  md: 0.3,
  base: 0.6,
  lg: 0.7,
  xl: 1,
} as const;

/** 추출된 시그니처 이징. out = 부드러운 감속, standard = 머티리얼 기본 */
export const EASE = {
  out: [0.17, 0.84, 0.44, 1] as const,
  standard: [0.4, 0, 0.2, 1] as const,
};

/** 스크롤 진입 시 페이드업 variants (Reveal 등에서 사용) */
export function fadeUp(delay = 0, y = 24, duration = DURATION.base): Variants {
  return {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE.out, delay },
    },
  };
}
