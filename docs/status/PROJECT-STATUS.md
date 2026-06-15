# Tak Djang Design Studio — Project Status

기준일: 2026-06-15  
정본: `docs/prd.md` + `ai-context/master-plan.md`  
검증: `npm run build` (22개 라우트 통과)

## 현재 단계

**구현 + 디자인 정제 완료 → 배포 준비 (점증적 개선 모드)**

- [x] Next.js 14 App Router + TypeScript + Tailwind + Framer Motion 세팅 완료
- [x] 핵심 라우팅 (/, /portfolio/[slug], /services, /pricing, /portfolio, /contact, /contact/form, /contact/form/thank-you, /privacy) + sitemap.xml, robots.txt
- [x] 랜딩 7섹션 (Hero/Services/WebsiteLinkage/Pricing/Portfolio/Process/About/FAQ/Contact/FinalCTA)
- [x] **제작+홍보 연계 포지셔닝** (devfive 벤치마킹): `/services` `/pricing` `/portfolio` + 홈 신규 3섹션 완성
- [x] 포트폴리오 SSG (TS 레지스트리, 내부 상세 9개 + 외부 링크 2개: 탁몽 와디즈 펀딩 상세페이지·금강이지스 현관중문 블로그 운영)
- [x] 문의 폼 (React Hook Form + Zod + EmailJS + honeypot)
- [x] **무료 진단 위저드** (`/contact/form`, 13문항 5단계, localStorage 저장, sendDiagnosis)
- [x] **디자인 에디토리얼 리디자인**: 오프화이트 배경, 근접 블랙 본문, Rose 브랜드, 카드 radius 축소, 플랫 그림자
- [x] **카피 정제**: Hero/FinalCTA/Services/Pricing에서 AI 티(은유·부정병렬·막연한 마무리) 제거
- [x] **블랙 완전 제거**: primary 로즈·footer 라이트·FinalCTA 라이트·FloatingCTA 로즈톤
- [x] 모션 토큰 (SSOT: `src/lib/motion.ts`, duration/easing)
- [x] UI 프리미티브 (Button, Badge, Card, Section, Reveal, MediaFrame)
- [x] SEO 기본 (메타/OG/구조화 데이터)
- [x] 모바일/데스크톱 레이아웃 + 접근성 개선

## 활성 트랙

1. **배포 전 게이트**: RSC 경계, env 누수, 폼 보안, 이미지 최적화 (harness: `next-vercel-release-guard`)
2. **EmailJS 프로덕션 키**: `.env.local`/Vercel 환경변수 설정 (현재 테스트 템플릿)
3. **카카오톡 채널**: URL 확정 후 전체 CTA 연결
4. **포트폴리오 실데이터**: MDX 9개 확장 (현재 3개 반복 노출 → 실제 포토셋)

## 라우팅 현황

| Route | Status | Notes |
|---|---|---|
| `/` | ✓ 완료 | 원페이지 랜딩 (Hero + Services + WebsiteLinkage + PricingTeaser + Portfolio + Process + About + FAQ + Contact + FinalCTA) |
| `/services` | ✓ 완료 | 제작+홍보 연계 4-서비스 모델 (devfive 벤치마킹) |
| `/takmong` | ✓ 완료 | 탁몽 제품 랜딩 (AI 상세페이지 서비스 · 펀딩 성과 · 리워드 4종) |
| `/pricing` | ✓ 완료 | build/care/ads 가격 + 비교표 + FAQ |
| `/portfolio` | ✓ 완료 | 포트폴리오 목록 |
| `/portfolio/[slug]` | ✓ 완료 | SSG, MDX 파싱 |
| `/contact` | ✓ 완료 | 진단 상담 카드 랜딩 |
| `/contact/form` | ✓ 완료 | 13문항 5단계 무료 진단 위저드 (localStorage, sendDiagnosis) |
| `/contact/form/thank-you` | ✓ 완료 | 감사 페이지 |
| `/privacy` | ✓ 완료 | 법률 텍스트 |
| `/sitemap.xml` | ✓ 완료 | SEO |
| `/robots.txt` | ✓ 완료 | SEO |

## 검증 상태

- `npm run build`: **성공** (22개 라우트, 타입체크, 린트 포함)
- `npm run lint`: **클린**
- `npx tsc --noEmit`: **클린**
- 모바일 (375px) smoke: **양호**
- 데스크톱 (1440px) smoke: **양호**
- 위저드 e2e (검증 차단/단계 진행): **확인됨**
- 문의 폼: EmailJS 테스트 템플릿 중, 운영 템플릿 대기

## 다음 액션 (우선순위 순)

1. **배포 전 보안 점검** (harness: `next-vercel-release-guard`)
   - [ ] `"use client"` 경계 확인 (Reveal/diagnose 컴포넌트)
   - [ ] EmailJS 환경변수 (client-safe `NEXT_PUBLIC_*` 확인)
   - [ ] 문의 폼 + 위저드 rate limit / 스팸 가드 (honeypot 재확인)
   - [ ] `/contact/form` 단계 검증 + honey pot

2. **EmailJS 프로덕션 키 설정**
   - [ ] `.env.local`에 실제 SERVICE_ID/TEMPLATE_ID/PUBLIC_KEY 추가
   - [ ] Vercel 환경변수 동기화
   - [ ] 폼 + 위저드 제출 테스트 검증

3. **카카오톡 채널 연결**
   - [ ] 채널 URL 확정
   - [ ] Header, FloatingCTA, FinalCTA, 모든 카드의 카카오톡 버튼 업데이트
   - [ ] 위저드 review 페이지 CTA 연결

4. **포트폴리오 실데이터 9개 확장**
   - [ ] 기존 3개 샘플 유지
   - [ ] 새 6개 포토셋 추가 (MDX)
   - [ ] 썸네일 + 긴 JPG 경로 매핑

5. **Vercel 배포**
   - [ ] 프로덕션 도메인 연결
   - [ ] 환경변수 설정
   - [ ] `npm run build` 최종 검증
   - [ ] SEO 기본(sitemap/robots) 확인

## 최근 변경 요약 (2026-06-15)

**실프로젝트 포트폴리오 반영**: 외부 링크형 포트폴리오 항목 도입.
- 타입 `externalUrl?`/`externalLabel?` 추가 → `getExternalWorks()` 분리, 내부 함수(slug/related/홈 계단)는 내부 9개만 유지(404 방지)
- 신규 2건: `takmong-wadiz`(자사 와디즈 펀딩 상세페이지 — 740% 달성·3,701,000원·서포터 51명, 2026.05.06 성공 종료), `artdoorstore-blog`(금강이지스 현관중문 블로그 운영, 누적 48,000+ 방문)
- `/portfolio` 상단 "진행 중 · 운영 채널" 섹션(새 탭 ↗), 외부 slug는 상세페이지 미생성·sitemap 제외
- 가격(pricing)은 사용자 결정에 따라 현행 유지(상세페이지 외주 build/care/ads)

**탁몽 제품 랜딩 분리**: `/takmong` 신규 라우트 — AI 상세페이지 제작 서비스 소개.
- `src/lib/content/takmong.ts`(펀딩 성과 740%·370만원·51명 + 리워드 4종 99,000~590,000원) + `src/app/takmong/page.tsx`
- 포트폴리오 탁몽 카드는 `productHref`로 내부 `/takmong` 연결(외부 와디즈 버튼은 랜딩 내부에), 푸터 서비스 메뉴에 노출
- 탁몽 리워드 가격은 제품 가격이라 사이트 외주 요금제와 분리 유지


**카피 정제**: Hero/FinalCTA/Services/Pricing 카피에서 AI 티(은유·부정병렬·막연한 마무리·em대시) 제거.

**에디토리얼 리디자인** (danbrise-barber.com 디자인 추출 → 무드만 재해석):
- 디자인 토큰 교체(`tailwind.config.ts`): 배경 오프화이트 `#FAFAF8`, 본문 근접 블랙 `#1A1A1A`, radius 축소(card 10px), shadow 플랫
- 모션 토큰 SSOT `src/lib/motion.ts`: duration/easing distill
- 블랙 완전 제거: primary 로즈, footer/FinalCTA 라이트, FloatingCTA 로즈톤

**무료 진단 위저드**: `/contact/form` (13문항 5단계, localStorage 저장, sendDiagnosis)
- 신규 파일: `src/lib/content/diagnose.ts`, `src/components/diagnose/`
- Header "무료 상담" 링크 → `/contact` 연결
- 가격카드 ctaHref → `/contact`

## Handoff Capsule

**들어올 때 확인**: 
- `ai-context/master-plan.md` (우선순위 백로그)
- `ai-context/handover.md` (블로커/즉시 실행 체크리스트)
- `docs/prd.md` (제품 정본)

**첫 검증**:
- `npm run build` (22개 라우트 통과)
- `.env.local` 설정 (EmailJS 키)
- `/contact/form` 위저드 단계 검증
- 폼 + 위저드 제출 테스트

**공유된 컨텍스트**:
- ai-context가 협업 정본
- docs/prd.md가 제품 정본
- docs/status/ 는 얇은 현황 대시보드
- 상세 로그/증거는 `ai-context/worklog.md` + `docs/status/DECISION-LOG.md`

---

*이 문서는 `ai-context/master-plan.md`의 파생 대시보드입니다. 상세 내용과 결정 로그는 다른 문서를 참고하세요.*
