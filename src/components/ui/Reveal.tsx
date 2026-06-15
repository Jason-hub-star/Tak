"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** 진입 지연(초) */
  delay?: number;
  /** 시작 y 오프셋(px) */
  y?: number;
  /** true면 마운트 즉시 재생(히어로), false면 스크롤 진입 시 1회 재생 */
  immediate?: boolean;
  /** 재생 시간(초) */
  duration?: number;
};

/**
 * 섹션 공통 페이드업 래퍼. framer-motion "use client" 경계를 이 컴포넌트로 모아
 * 표시용 섹션들이 서버 컴포넌트로 남을 수 있게 한다.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  immediate = false,
  duration = DURATION.base,
}: RevealProps) {
  const transition = { duration, ease: EASE.out, delay };

  const motionProps = immediate
    ? { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true } as const,
      };

  return (
    <motion.div className={className} transition={transition} {...motionProps}>
      {children}
    </motion.div>
  );
}
