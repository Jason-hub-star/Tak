---
name: next-vercel-release-guard
tags: [nextjs, vercel, app-router, security, cache-components, release]
trigger: "탁디장 Next.js App Router 앱을 배포 전 점검하거나 보안 기능을 건드릴 때"
status: candidate
source: "WEFLOW Next.js 16 security/cache pass 일반화 + Tak 맞춤"
---

# Next/Vercel Release Guard Harness (탁디장)

## When

- 탁디장 앱을 preview/production Vercel로 배포하기 전
- EmailJS 환경변수, 문의 폼 rate limit, 스팸 가드 기능을 건드렸을 때
- Server/Client Component 경계가 흐려졌거나 hydration 에러가 의심될 때

## Rules

1. Server Component를 기본값으로 두고, `"use client"`는 폼, 상호작용, 브라우저 API 필요한 leaf에만 둔다.
2. Client Component는 server-only config/env를 import하지 않는다.
   - **탁디장**: EmailJS `NEXT_PUBLIC_*` 키는 클라이언트 안전 (public) 하지만, `process.env.SECRET_*` 같은 서버 secret은 Client Component로 들어가면 안됨.
3. 외부 입력 API (문의 폼)는 body size, Origin, rate limit, 스팸/bot 검증, schema validation을 통과한 뒤에만 외부 호출.
4. OG/sitemap/robots은 live build에서 200과 예상 dynamic 여부를 확인.

## Flow (탁디장 맞춤)

### 1. Inventory

```bash
# App Router 모든 페이지와 route handler 목록
find src/app -type f -name 'page.tsx' -o -name 'route.ts'

# "use client" 파일 확인 (폼, 상호작용 관련만)
rg -l '"use client"' src/components src/app

# EmailJS 연동 확인 (NEXT_PUBLIC_ 키만)
rg 'NEXT_PUBLIC_EMAILJS' src/

# 폼 필드, validation 확인
rg 'react-hook-form|zod|Zod' src/lib src/components
```

### 2. Boundary Pass

- [ ] `src/lib/emailjs.ts`: 환경변수 초기화 에러 시 throw 처리 (비밀 노출 금지)
- [ ] `src/components/sections/Contact.tsx`: `"use client"` 정당성 확인 (폼 제어, EmailJS 호출 필요)
- [ ] 다른 공유 컴포넌트: 불필요한 `"use client"` 제거 (layout, hero, portfolio gallery 등은 Server Component)

### 3. Spam & Rate Limit Pass

폼 POST endpoint 없이 client-side EmailJS 사용 구조 확인:
- [ ] honeypot 필드 존재 (`src/lib/emailjs.ts`)
- [ ] Turnstile/reCAPTCHA 설정 (현재: honeypot만, 향후 추가 권장)
- [ ] Zod schema validation 통과 후에만 EmailJS 호출
- [ ] 폼 다중 제출 방지 (disable button, pending 상태)

### 4. Verify

```bash
npm run typecheck
npm run lint
npm run build
```

- [ ] 빌드 성공
- [ ] 타입 에러 0건
- [ ] lint 경고 0건 (또는 무시 사유 명시)
- [ ] `/sitemap.xml` 200 응답 확인 (로컬: `npm run dev`)
- [ ] `/robots.txt` 200 응답 확인
- [ ] 폼 제출 시 콘솔 에러 없음 (브라우저 DevTools)

### 5. Doc Sync

배포 전에 `DECISION-LOG.md`와 `.env.local.example` 최신 상태 확인:
- [ ] EmailJS 키 형식 명시
- [ ] Vercel 환경변수 설정 로드맵 기록

---

## 탁디장 체크리스트

- [ ] `src/lib/emailjs.ts`: 초기화 실패 시 throw
- [ ] `src/components/sections/Contact.tsx`: form validation 후 EmailJS 호출
- [ ] honeypot 필드 존재 + 검증 로직
- [ ] 문의 폼 button disable (제출 중 중복 방지)
- [ ] `.env.local.example` 업데이트됨
- [ ] EmailJS 서비스, 템플릿 ID 명시
- [ ] `/portfolio/[slug]` 동적 route 확인 (필요 시 `generateStaticParams`)
- [ ] 배포 도메인이 `.env.local` 또는 Vercel에 설정됨

---

## Failure Modes

- 폼 제출이 silent fail → `src/lib/emailjs.ts` throw 처리 확인
- 환경변수 누락 → `.env.local.example` 대비 실제 값 확인
- 스팸 제출 증가 → honeypot + Turnstile/reCAPTCHA 추가 고려
