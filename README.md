# Tak Djang Design Studio

Next.js 14(App Router) 기반 포트폴리오/리드 전환 웹사이트입니다.
상세페이지 제작에서 출발해 **브랜드 웹사이트 제작 + 검색·광고 홍보 연계**까지 어필하는 풀 IA를 갖췄습니다 (`/services`, `/pricing`, `/portfolio`).

**2026-06-15 완성**: 에디토리얼 리디자인(오프화이트/근접블랙/Rose), 무료 진단 위저드(`/contact/form`), 카피 정제(AI 티 제거), 22개 라우트 통과.

## Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- EmailJS

## Local Run
```bash
npm install
npm run dev
```

## Validation
```bash
npm run lint
npm run build
```

## Environment Variables
`.env.local`에 아래 키를 설정합니다.

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                # 원페이지 랜딩
│   ├── layout.tsx
│   ├── globals.css
│   ├── contact/
│   │   ├── page.tsx            # 진단 상담 카드
│   │   └── form/
│   │       ├── page.tsx        # 무료 진단 위저드
│   │       └── thank-you/page.tsx
│   ├── services/page.tsx       # 제작+홍보 연계 서비스
│   ├── pricing/page.tsx        # 가격 비교표
│   ├── portfolio/
│   │   ├── page.tsx            # 포트폴리오 목록
│   │   └── [slug]/page.tsx     # 상세 (SSG)
│   ├── privacy/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                     # Button, Badge, Card, Section, Reveal, MediaFrame
│   ├── layout/                 # Header, Footer, FloatingCTA
│   ├── sections/               # Hero, Services, WebsiteLinkage, Pricing, Portfolio, Process, About, FAQ, Contact, FinalCTA
│   └── diagnose/               # DiagnoseFormShell, Progress, Step, Field, Review
├── lib/
│   ├── content/
│   │   ├── services.ts         # 4-서비스 모델 + LINKAGE 흐름
│   │   ├── pricing.ts          # build/care/ads 플랜
│   │   ├── diagnose.ts         # 무료 진단 설정 + buildDiagnosisMessage
│   │   └── portfolio.ts        # MDX 파싱 (getAllPortfolios, getPortfolioBySlug)
│   ├── motion.ts               # 모션 토큰 SSOT
│   ├── emailjs.ts              # sendInquiry, sendDiagnosis
│   └── ...
└── types/
    └── index.ts                # ServiceItem, PricingPlan, DiagnoseQuestion, etc.
```

## Vercel Deploy

1. 저장소를 Vercel에 import
2. Framework Preset은 `Next.js` 유지
3. Environment Variables에 EmailJS 3개 키 추가 (`.env.local.example` 참조):
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
   ```
4. Deploy 실행
5. 배포 후 라우트 확인:
   - `/` (홈), `/services`, `/pricing`, `/portfolio`, `/portfolio/[slug]`, `/contact`, `/contact/form`, `/privacy`, `/robots.txt`, `/sitemap.xml`

상세 체크리스트: `docs/deploy-vercel.md` · 배포 전 게이트: `harnesses/next-vercel-release-guard.md`
