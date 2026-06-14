"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LINKAGE_STEPS, LINKAGE_COPY } from "@/lib/content/services";

export default function WebsiteLinkageSection() {
  return (
    <section id="linkage" className="section-padding bg-primary-50/40">
      <div className="container-main">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold tracking-wide text-primary">
            {LINKAGE_COPY.eyebrow}
          </span>
          <h2 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground">
            {LINKAGE_COPY.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {LINKAGE_COPY.sub}
          </p>
        </div>

        {/* 제작 → 연결 → 전환 → 관리 흐름 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3">
          {LINKAGE_STEPS.map((step, i) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative rounded-card bg-white p-6 border border-border"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-bold text-primary">
                {step.phase}
              </h3>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {step.label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>

              {/* 단계 연결 화살표 (마지막 제외) */}
              {i < LINKAGE_STEPS.length - 1 && (
                <ArrowRight
                  size={20}
                  className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-primary/40 z-10"
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 min-h-[48px] rounded-xl bg-primary text-primary-foreground text-sm md:text-base font-semibold hover:bg-primary-600 transition-colors shadow-cta"
          >
            제작부터 홍보까지 상담하기
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
