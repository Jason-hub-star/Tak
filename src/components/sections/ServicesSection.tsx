"use client";

import { motion } from "framer-motion";
import { FileText, Globe, TrendingUp, RefreshCw, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/content/services";

const ICONS: Record<string, React.ElementType> = {
  FileText,
  Globe,
  TrendingUp,
  RefreshCw,
};

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wide text-primary">
            SERVICES
          </span>
          <h2 className="mt-3 text-display-sm md:text-display-md font-bold text-foreground">
            만들고, 알리고, 키우는 것까지
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            상세페이지 제작에서 출발해 웹사이트와 검색·광고 홍보까지 — 따로 의뢰하지
            않아도 한 곳에서 연결됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-card bg-white p-7 shadow-sm border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                    {Icon && <Icon size={24} />}
                  </div>
                  <span className="text-xs font-semibold tracking-wide text-muted-foreground">
                    {service.eyebrow}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {service.summary}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm text-foreground/80 flex items-start gap-2"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <span
                      key={d}
                      className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-600 transition-colors"
          >
            전체 서비스 자세히 보기
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
