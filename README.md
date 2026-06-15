# Tak Djang Design Studio

Next.js 14(App Router) 기반 포트폴리오/리드 전환 + **AI 템플릿 스토어** 웹사이트입니다.
상세페이지 제작에서 출발해 **브랜드 웹사이트 제작 + 검색·광고 홍보 연계**까지 어필하는 풀 IA + 탁몽 AI 템플릿 판매 채널을 갖췄습니다.

**배포 완료** (2026-06-15): Vercel 배포 + takdijang.com 커스텀 도메인 · EmailJS 실연동 · 카카오톡 오픈채팅 연결 · 탁몽 스토어 확장(와디즈 펀딩 성과 + 스마트스토어 판매 2종)

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
`.env.local`에 아래 키를 설정합니다. **키와 수신 이메일 주소는 문서에 기재하지 마세요.** Vercel 환경변수로 설정 완료(Production·Preview·Development 3환경).

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

실제 키는 로컬 개발 시 `.env.local.example` 형식을 참고해 설정하세요.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                # 원페이지 랜딩
│   ├── layout.tsx
│   ├── globals.css
│   ├── takmong/page.tsx        # AI 템플릿 스토어 (펀딩 성과 + 스마트스토어)
│   ├── templates/
│   │   └── [slug]/page.tsx     # 템플릿 상세 (SSG)
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
│   │   ├── templates.ts        # 탁몽 AI 템플릿 데이터 모델
│   │   ├── template-images.ts  # 템플릿 이미지 헬퍼
│   │   └── portfolio.ts        # MDX 파싱 (getAllPortfolios, getPortfolioBySlug)
│   ├── motion.ts               # 모션 토큰 SSOT
│   ├── emailjs.ts              # sendInquiry, sendDiagnosis (실연동 완료)
│   └── ...
└── types/
    └── index.ts                # ServiceItem, TemplateItem, PricingPlan, DiagnoseQuestion, etc.
```

## Vercel Deploy

**배포 상태**: ✅ 완료 (프로젝트 `tak`, GitHub main 자동배포)

### 도메인 설정
- 커스텀 도메인: `takdijang.com` + `www.takdijang.com`
- DNS 설정: 가비아 A 레코드 (@→76.76.21.21), CNAME (www→cname.vercel-dns.com)
- SSL: 자동 발급 진행중

### 라우트 확인
- `/` (홈), `/services`, `/takmong`, `/templates/[slug]`, `/pricing`, `/portfolio`, `/portfolio/[slug]`
- `/contact`, `/contact/form`, `/contact/form/thank-you`, `/privacy`
- `/robots.txt`, `/sitemap.xml`

### 다음 단계
- 도메인 활성화 확인 후 SEO 제출 (Google Search Console, Naver)

상세 체크리스트: 배포 전 게이트 `harnesses/next-vercel-release-guard.md` · 배포 후 SEO `harnesses/post-deploy-seo-submit-monitor.md`
