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
| `/takmong` | ✓ 완료 | AI 템플릿 스토어 (탁몽 제품 펀딩 성과 · 리워드 4종 + 스마트스토어 판매 2종) |
| `/templates/[slug]` | ✓ 완료 | AI 템플릿 상세 (SSG, 상세 이미지 27장) |
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

1. **배포 후 운영 체크**
   - [x] EmailJS 프로덕션 키 설정 및 실연동 완료
   - [x] 카카오톡 채널 URL 확정 및 연결 완료
   - [ ] 배포 후 라우트 최종 검증 (도메인 연결 완료)
   - [ ] SEO 제출 (Google Search Console, Naver)

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

## 최근 변경 요약 (2026-06-15)

**탁몽 AI 템플릿 스토어 확장**: `/takmong` → AI 템플릿 스토어, `/templates/[slug]` 상세 신설.
- `/takmong`: 와디즈 펀딩 성과(740% 달성·3,701,000원·서포터 51명, 2026.05.06 종료) + 리워드 4종 + 스마트스토어 판매 2종(AI 디자인 템플릿 99,000원, 상세페이지 진단·컨설팅 29,000원)
- `/templates/[slug]`: SSG 상세 페이지, 상세 이미지 27장(gif 포함) 세로 긴 스택. `src/lib/content/template-images.ts` 헬퍼(thumbnail 제외 자동 필터)
- 데이터: `src/lib/content/templates.ts`, 스마트스토어 구매 링크 네이버 연결
- 상단 네비에 "AI 템플릿" 추가 → `/takmong` 연결

**서비스 섹션 이미지 4종 컬러 교체**: `public/services/` (상세페이지·웹사이트·홍보·운영 순).

**카카오톡 오픈채팅 실연동**: KAKAO_CHANNEL_URL = `open.kakao.com/o/suSdZzs`, FloatingCTA 실제 링크화.

**EmailJS 실연동 완료**: 문의 폼 + 무료 진단 위저드 실제 발송(E2E HTTP 200 검증). reply-to·to_email 파라미터 지원.
- 보안: 키와 수신 이메일 주소는 `.env.local`/Vercel 환경변수로 설정(Production·Preview·Development 3환경).

**Vercel 배포 + 커스텀 도메인**: 프로젝트 `tak` (GitHub main 자동배포), 도메인 `takdijang.com`+`www` 연결(가비아 A 레코드 @→76.76.21.21, CNAME www→cname.vercel-dns.com). HTTP 서빙 확인, SSL 자동발급 진행중.

**실프로젝트 포트폴리오 반영**: 외부 링크형 포트폴리오 항목 도입.
- 신규 2건: `takmong-wadiz`(자사 와디즈 펀딩), `artdoorstore-blog`(금강이지스 현관중문 블로그)
- 타입 `externalUrl?`/`externalLabel?` 추가, 내부 함수(slug/related/홈)는 내부 9개만 유지(404 방지)

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
