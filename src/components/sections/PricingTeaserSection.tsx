"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PRICING_PLANS } from "@/lib/content/pricing";
import PricingCard from "@/components/PricingCard";

/** 홈 티저: 대표 3개 플랜(상세페이지 / 웹사이트 / 그로스 케어) */
const TEASER_IDS = ["detail", "website", "care-growth"];

export default function PricingTeaserSection() {
  const plans = TEASER_IDS.map(
    (id) => PRICING_PLANS.find((p) => p.id === id)!
  ).filter(Boolean);

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container-main">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold tracking-wide text-primary">
            PRICING
          </span>
          <h2 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground">
            필요한 범위부터, 투명하게
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            상세페이지 단품부터 웹사이트 제작·홍보 케어까지. 지금 필요한 만큼만
            시작하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-600 transition-colors"
          >
            전체 가격·비교표 보기
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
