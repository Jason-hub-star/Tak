import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Base / Surface (에디토리얼 오프화이트 + 근접 블랙) ── */
        background: "#FAFAF8",
        foreground: "#1A1A1A",
        card: "#FFFFFF",
        "card-foreground": "#1A1A1A",

        /* ── Brand Accent (Rose #CB6664) ── */
        primary: {
          DEFAULT: "#CB6664",
          foreground: "#FFFFFF",
          50: "#FDF2F2",
          100: "#FBE8E8",
          200: "#F5CDCC",
          300: "#EDA9A7",
          400: "#DB8382",
          500: "#CB6664",
          600: "#B04E4C",
          700: "#923D3B",
        },

        /* ── Trust / Strategy Blue ── */
        secondary: {
          DEFAULT: "#1E3A5F",
          foreground: "#FFFFFF",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },

        /* ── Muted / Border (warm neutral) ── */
        muted: {
          DEFAULT: "#F2F1EE",
          foreground: "#6F6F6C",
        },
        border: "#E6E4DF",

        /* ── CTA Dark Zone (Final CTA / Footer) ── */
        "cta-dark": {
          DEFAULT: "#161615",
          foreground: "#FAFAF8",
        },

        /* ── Semantic ── */
        destructive: "#EF4444",
        success: "#10B981",
        ring: "#CB6664",
      },

      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "sans-serif",
        ],
      },

      fontSize: {
        /* 헤드라인 스케일 — 에디토리얼 대비 강화(크게 + 타이트) */
        "display-lg": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-md": ["3.25rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["2.25rem", { lineHeight: "1.18", letterSpacing: "-0.01em", fontWeight: "700" }],
        /* KPI / 숫자 강조 */
        "kpi": ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "800" }],
      },

      borderRadius: {
        "card": "0.625rem",  /* 10px — 에디토리얼 샤프 */
        "card-lg": "0.75rem", /* 12px */
      },

      boxShadow: {
        /* 플랫 — border 중심, 그림자는 최소 */
        "card": "0 1px 2px rgba(26,26,26,0.04)",
        "card-hover": "0 6px 20px rgba(26,26,26,0.07)",
        "cta": "0 1px 2px rgba(26,26,26,0.08)",
      },

      maxWidth: {
        "container": "1400px",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 220ms ease-out",
        "accordion-up": "accordion-up 220ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
