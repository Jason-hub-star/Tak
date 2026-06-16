# Tak Djang Design Studio — Project Status

기준일: 2026-06-17  
정본: `docs/prd.md` + `ai-context/master-plan.md`  
검증: `npm run build` (28개 라우트 통과, 측정 인프라 추가)

## 현재 단계

**배포 완료 → 운영 모드 (점증적 개선)**

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
- [x] **SEO 강화** (JSON-LD 28개 라우트 주입, OG 이미지 동적 생성, sitemap/robots SSOT)
- [x] 모바일/데스크톱 레이아웃 + 접근성 개선

## 활성 트랙

1. **색인 반영 모니터링** (구글/네이버 며칠~2주 소요)
   - Google Search Console: 소유확인 통과, sitemap 제출 완료
   - Naver Search Advisor: 소유확인 통과, sitemap 제출 완료
   - IndexNow: 키파일 배포, 202 Accepted (6 URL)
2. **분석 데이터 반영 모니터링** (GA4/네이버 관리 화면)
   - GA4 (G-QE6BN0V7VM): gtag.js 200, google-analytics/g/collect 204 확인, `generate_lead` 주요 이벤트 표시 대기
   - 네이버 wcs (443e9d63b3a7d): wcs.pstatic.net/wcslog.js 라이브 주입 확인
   - 메타픽셀: 미사용(ID 미입력, 정상 no-op)
3. **포트폴리오 실데이터**: MDX 9개 확장 (현재 3개 반복 노출 → 실제 포토셋)

## 라우팅 현황

| Route | Status | Notes |
|---|---|---|
| `/` | ✓ 완료 | 원페이지 랜딩 (Hero + Services + WebsiteLinkage + PricingTeaser + Portfolio + **Testimonials** + Process + About + FAQ + Contact + FinalCTA) |
| `/services` | ✓ 완료 | 제작+홍보 연계 4-서비스 모델 (devfive 벤치마킹) |
| `/takmong` | ✓ 완료 | AI 템플릿 스토어 (탁몽 제품 펀딩 성과 · 리워드 4종 + 스마트스토어 판매 2종) |
| `/templates/[slug]` | ✓ 완료 | AI 템플릿 상세 (SSG) |
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

- `npm run build`: **성공** (라우트 증가, 타입체크, 린트 포함)
- `npm run lint`: **클린**
- `npx tsc --noEmit`: **클린**
- 모바일 (375px) smoke: **양호**
- 데스크톱 (1440px) smoke: **양호**
- 위저드 e2e (검증 차단/단계 진행): **확인됨**
- 문의 폼: **EmailJS 실연동 완료** (HTTP 200, reply-to·to_email 지원)
- 무료 진단: **실제 발송 검증** (E2E 통과)
- 카카오톡 채널: **실제 링크 연결** (open.kakao.com/o/suSdZzs)

## 다음 액션 (우선순위 순)

1. **SEO 색인 모니터링** (완료: 검색엔진 등록·소유확인·sitemap 제출)
   - [x] Google Search Console 소유확인 통과
   - [x] Naver Search Advisor 소유확인 통과
   - [x] Sitemap 제출 완료 (구글/네이버)
   - [x] IndexNow 키파일 배포 + 색인 통보
   - [ ] 색인 반영 확인 (며칠~2주 소요)

2. **스마트스토어 판매 채널 운영**
   - [x] 스마트스토어 상품 2종 등록 (AI 템플릿 99,000원 / 상담 29,000원)
   - [x] 템플릿 상세 페이지 SSG 구현 및 상품 링크 연결
   - [ ] 판매 분석 및 리뷰 모니터링

3. **포트폴리오 실데이터 9개 확장 (선택사항)**
   - [ ] 기존 3개 샘플 유지
   - [ ] 새 6개 포토셋 추가 (MDX)
   - [ ] 썸네일 + 긴 JPG 경로 매핑

4. **성능 모니터링**
   - [ ] Vercel Analytics (LCP/CLS/INP 점검)
   - [ ] Core Web Vitals 개선 (필요 시)

## 최근 변경 요약 (2026-06-17)

**고객 후기 섹션 신규 추가**: 랜딩 AboutSection 다음·PricingTeaserSection 앞에 `<TestimonialsSection>` 배선. 신규 데이터 SSOT(`src/lib/content/testimonials.ts`, 5개 항목 원문 보존+강점 태그), framer-motion 드래그/자동재생 캐러셀(`TestimonialCarousel.tsx`, 6초·hover/포커스 정지) + 접근성(aria-live/prefers-reduced-motion 존중). `npm run build` 성공(28개 라우트), 로컬 dev 후기 섹션 서버 렌더 확인.

**이전 변경 요약**: 포트폴리오 컬러화, SEO 셋업(JSON-LD 28개·도메인 정정 takdjang→takdijang), 가격 개편(490k·990k 패키지), 사업자 정보·로고·히어로 배경영상·EmailJS·Vercel 배포 완료. 상세는 `ai-context/worklog.md`·`docs/status/DECISION-LOG.md` 참조.

## Handoff Capsule

**진입 체크리스트**:
- `ai-context/master-plan.md` (우선순위 백로그)
- `docs/prd.md` (제품 정본)
- `.env.local` 설정 후 `npm run build` (28개 라우트 + JSON-LD 검증)

**문서 계층**:
- 정본: `docs/prd.md` (제품)
- 협업: `ai-context/` (계획·로그)
- 현황: 이 파일 (얇은 대시보드, 60~110줄)
- 증거: `worklog.md` + `DECISION-LOG.md`
