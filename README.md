# Tak Djang Design Studio

Next.js 14(App Router) 기반 포트폴리오/리드 전환 웹사이트입니다.
상세페이지 제작에서 출발해 **브랜드 웹사이트 제작 + 검색·광고 홍보 연계**까지 어필하는 IA를 갖췄습니다 (`/services`, `/pricing`, `/portfolio`).

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

## Vercel Deploy
1. 저장소를 Vercel에 import
2. Framework Preset은 `Next.js` 유지
3. Environment Variables에 EmailJS 3개 키 추가
4. Deploy 실행
5. 배포 후 `/`, `/services`, `/pricing`, `/portfolio`, `/portfolio/[slug]`, `/privacy`, `/robots.txt`, `/sitemap.xml` 확인

상세 체크리스트: `docs/deploy-vercel.md` · 배포 전 게이트: `harnesses/next-vercel-release-guard.md`
