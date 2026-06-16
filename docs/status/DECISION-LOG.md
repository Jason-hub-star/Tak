# 탁디장 결정 로그

앞으로의 모든 구조적 결정을 기록한다. (Append-only)

---

## 2026-06-17 | 고객 후기 섹션 추가 (캐러셀·framer-motion 드래그)

**결정**: 
랜딩 페이지에 "고객 후기(Testimonials)" 섹션을 신규 추가해 고객 신뢰도를 강화한다. 후기 데이터 SSOT 관리(원문 보존+강점 태그) + framer-motion 기반 대화형 캐러셀(드래그/스와이프·자동재생·arrow/dot 컨트롤)로 구성한다.

**배경**:
- 랜딩 전환율 개선: 포트폴리오와 가격 사이에 "실제 고객 만족도" 증거 추가 필요
- 모션 일관성: 기존 framer-motion 스택에 맞춤(신규 라이브러리 미도입)
- 접근성: 브라우저·스크린 리더·키보드 네비 모두 지원

**영향**:
- 신규 파일: `src/lib/content/testimonials.ts` (5개 항목 SSOT, 원문·강점 태그·프로필), `src/components/sections/TestimonialCarousel.tsx` (use client, framer-motion drag/drag momentum, 6초 자동재생·hover/포커스 정지, arrow/dot 컨트롤), `src/components/sections/TestimonialsSection.tsx` (서버 컴포넌트 래퍼, Section bg="muted")
- 컴포넌트 변경: `src/app/page.tsx` (AboutSection 다음, PricingTeaserSection 앞에 TestimonialsSection 배선)
- 스타일: 캐러셀 너비 조정, 카드 padding/radius 기존 프리미티브 따름
- 접근성: aria-live="polite" + 키보드 arrow(좌/우) 지원 + prefers-reduced-motion 자동재생 비활성화
- 의존성: **신규 라이브러리 없음** (framer-motion 기존 사용)

**후속**:
- 후기 원문·프로필 사진·강점 태그 추가/수정은 `testimonials.ts` SSOT만 갱신
- 캐러셀 UI/타이밍 조정 필요 시 `TestimonialCarousel.tsx` 수정

---

## 2026-06-16 | 분석·측정 인프라 통합 (GA4·Naver·Meta)

**결정**: 
Google Analytics 4 · Naver wcs · Meta Pixel을 중앙화된 분석 라이브러리(`src/lib/analytics/`)로 통합하고, ID 기반 활성화(env SSOT) + 이벤트 배선을 통해 전환 추적을 자동화한다.

**배경**:
- 배포 완료 후 사용자 전환(문의 폼/진단 위저드 제출) 추적 필요
- 사업자 정보 확정 후 로컬 비즈니스 성과 측정 기초 마련
- ID 없는 상태(테스트·개발)에서도 안전한 no-op 처리 필요

**영향**:
- 신규 파일: `src/lib/analytics/config.ts` (SSOT), `src/lib/analytics/track.ts` (API), `src/components/analytics/Analytics.tsx` (스크립트 주입)
- 컴포넌트 변경: FloatingCTA/ContactSection/DiagnoseFormShell에 trackLead() 호출 추가
- Vercel env: NEXT_PUBLIC_GA_ID (G-QE6BN0V7VM) · NEXT_PUBLIC_NAVER_SITE_ID (443e9d63b3a7d) Production·Development 등록
- `.env.local.example`: 3개 ID 변수 스캐폴딩(발급처 주석)
- 라이브 검증: takdijang.com에서 gtag.js 200 · collect 204 · generate_lead dataLayer 확인

**후속**:
- GA4 관리→이벤트에서 `generate_lead` "주요 이벤트" 표시 (수동)
- Meta Pixel ID 발급 시 NEXT_PUBLIC_META_PIXEL_ID 등록
- Preview 환경 env 추가 (선택)

---

## 2026-06-15 | 가격 모델 확장 + 원본 소스 파일 미제공 정책 + 히어로 배경영상 + 로고 워드마크 + 사업자 정보

**결정**: 
(a) 가격 개편: 상세페이지 330k→490k, "상세페이지+쇼츠 패키지" 신규(990k, BOOST⭐베스트), 비교표 5열 확장.  
(b) 원본 소스 파일(PSD/AI) 미제공 정책으로 변경 — FAQ "작업 원본은 미제공, 플랫폼 규격 완성본+수정 2회+케어"로 명시.  
(c) 히어로 배경영상 도입: 무료 스톡 8클립 웹최적(webm+mp4+poster, 모바일 폴백, prefers-reduced-motion 고려).  
(d) 로고 워드마크 채택: "T 동그라미" → `{ TAK DI JANG. }` 텍스트 이미지(public/logo.png).  
(e) 사업자 정보 확정: 탁디장스튜디오 / 365-18-00464 / 덕계로 104 1층 / 010-7153-8014.

**배경**:
- 가격: 쇼츠 영상 서비스 출시(탁몽 리워드 통합) → 번들 상품으로 마케팅 강화 필요
- 원본 파일: 고객 기대 관리 + 법적 저작권(PSD/AI 원본 미제공 명시)
- 히어로: 정적 블록 → 동적 영상으로 랜딩 임팩트 극대화 (성능 최적화 우선)
- 로고: 직관적 브랜드 인식(기존 아이콘 약함) → 워드마크로 강화
- 사업자: 법적 요건(푸터 표기) + SEO(LocalBusiness 승격 조건)

**영향**:
- `src/lib/content/pricing.ts`: 가격 플랜 재구성, 비교표 열 추가
- `src/lib/constants.ts`: FAQ "원본 미제공" 명시(faqSchema/SEO 연동), 히어로 불릿·라벨(TAKDIJANG) 정리
- `src/lib/content/services.ts`, `src/lib/content/portfolio-data.ts`: 딜리버러블 "원본"→"완성본 납품" 정리
- `src/components/sections/HeroSection.tsx`: 배경영상 렌더(video/poster/prefers-reduced-motion)
- `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`: 로고 이미지 경로 변경
- `src/components/layout/Footer.tsx`: 사업자 정보 4줄 추가
- `public/logo.png`: 신규 워드마크 이미지
- `public/hero/`: hero-montage.mp4/webm/poster.jpg

---

## 2026-06-15 | 도메인 정정: takdjang.com(오타) → takdijang.com(정상, i 포함)

**결정**: 실제 운영 도메인 오타(takdjang.com, i 없음)를 정정(takdijang.com)해 전 저장소 canonical·sitemap·OG·robots·SITE.url을 통일한다.

**배경**:
- 기존 코드 전체가 죽은 도메인 takdjang.com을 SSOT로 사용 중
- 실제 등록·운영 도메인은 takdijang.com(i 포함)
- SEO 제출 전 발견해 구글·네이버 소유확인에 정정된 도메인 적용 가능

**영향**:
- SITE.url 변경: `src/lib/seo/site.ts`, `src/app/sitemap.ts`, `src/app/robots.ts` 통일
- canonical/OG/robots: 존재하지 않던 도메인 가리키던 버그 해소
- 검색엔진: 구글·네이버 소유확인 takdijang.com으로 진행, Sitemap 제출 완료

---

## 2026-06-15 | 탁몽 AI 템플릿 스토어 확장 + 배포 완료

**결정**: 탁몽 제품을 "AI 템플릿 스토어"로 포지셔닝해 와디즈 펀딩 성과 + 스마트스토어 판매 2종을 통합 노출한다. 템플릿 상세 페이지(SSG)를 신설해 상품 매력도를 극대화한다. EmailJS 실연동 + Vercel 배포를 완료한다.

**배경**:
- 와디즈 펀딩 성공(740% 달성·3,701,000원·서포터 51명, 2026.05.06 종료) 실적을 마케팅 자산으로 활용
- 현재 포트폴리오 중심 서비스에 추가 매출 채널(스마트스토어) 확보
- 고객 여정: 템플릿 상세 → 스마트스토어 구매로 직접 전환

**영향**:
- 라우팅: `/takmong` 확장(리워드 4종 + 스마트스토어 판매 2종), `/templates/[slug]` SSG 신규
- 콘텐츠: `src/lib/content/templates.ts`, `src/lib/content/template-images.ts` 신규 (상세 이미지 takmong-ai-template 27장·detail-diagnosis 5장 실제 반영 완료, 라이브 배포됨)
- 네비게이션: 상단 네비에 "AI 템플릿" 섹션 추가 → `/takmong` 연결
- 배포: Vercel 프로젝트 `tak` (GitHub main 자동배포), 커스텀 도메인 `takdijang.com` 연결 (가비아 설정 완료, SSL 진행중)
- EmailJS: 프로덕션 키 설정, 문의 폼 + 무료 진단 실제 발송(HTTP 200 검증)
- 카카오톡: URL `open.kakao.com/o/suSdZzs` 확정, FloatingCTA 실제 링크화

---

## 2026-06-15 | 디자인·카피·기술 정제 완료 (에디토리얼 리디자인 + 무료 진단)

**결정**: 에디토리얼 리디자인(오프화이트/근접블랙/Rose), 카피 정제(AI 티 제거), 무료 진단 위저드, 모션/UI 프리미티브를 모두 구현해 22개 라우트 배포 준비 완료로 전환한다.

**배경**:
- 기존 IA(제작+홍보 연계): 라우트 및 콘텐츠 구조는 완성했으나 비주얼/톤 정교화 필요
- devfive 디자인 언어(danbrise-barber.com 무드): 오프화이트+근접블랙+Rose로 재해석해 Tak 고유성 유지
- 카피 AI 티(은유·부정병렬·막연한 마무리): 온라인 셀러 관점의 직설적이고 전략적인 톤으로 재정제
- 고객 여정: 랜딩 → 포트폴리오 → 진단(신규) → 상담(기존)으로 단계 명확화

**영향**:
- 라우팅: `/contact/form` 무료 진단 위저드 신규 추가 (13문항 5단계, localStorage, sendDiagnosis)
- 스타일: tailwind.config.ts 색상/타이포/radius 정교화, 블랙 완전 제거
- 콘텐츠: services.ts/pricing.ts 카피 재정제, diagnose.ts 설정 신규
- 컴포넌트: UI 프리미티브 (Button/Badge/Card/Section/Reveal/MediaFrame), motion.ts SSOT
- 검증: `npm run build` 25개 라우트 통과

---

## 2026-06-15 | 하네스/문서 거버넌스 도입

**결정**: 에이전트 하네스 템플릿과 문서 거버넌스 체계를 Tak 프로젝트에 이식한다.

**배경**: 
- 기존 `.claude/claude.md` 한 줄 규칙만으로는 복잡한 배포/이미지 최적화/SEO 점검을 체계화하기 어려움
- 유사 프로젝트(WEFLOW, devfive)의 성숙한 하네스 패턴을 재사용 기회
- Tier 0/1/2 정본 구조로 협업 충돌 줄임

**영향**:
- 새 파일: `AGENTS.md`, `harnesses/`, `docs/status/`, `HARNESS-MANIFEST.yaml`, `.claude/` 확장
- 레퍼런스: AGENTS.md 로딩 순서 고정, `docs/prd.md`를 최우선 정본
- 운영: `docs/status/PROJECT-STATUS.md`는 얇은 대시보드만, 상세는 `ai-context/` 유지

---

## 2026-06-15 | 제작+홍보 연계 IA 풀 확장 (예정)

**결정**: devfive 벤치마킹으로 "상세페이지 제작" + "신규 웹사이트 제작·홍보 연계" 포지셔닝 풀 IA를 설계한다.

**배경**:
- 현재 IA: 포트폴리오 중심 (상세페이지 작업 사례만 노출)
- 개선 기회: 웹사이트 제작 서비스도 포함해 고객 범위 확대
- devfive `/services`, `/pricing` 패턴 참고 (원본 복제 금지, 구조만 차용)

**영향**:
- 라우팅: `/services`, `/pricing` 신규 추가 (post-MVP)
- 콘텐츠: 서비스/요금 명세 작성 (design-to-code harness 사용)
- 형식: 기존 홍보 톤("매출·설득·전략") 유지

---

## 2026-02-11 | EmailJS 미설정 오동작 수정

**결정**: EmailJS 미초기화 시 성공 응답을 반환하는 문의 폼 버그를 수정한다.

**배경**:
- 테스트 환경에서 클라이언트가 EmailJS 키를 로드하지 못했을 때 폼 제출이 성공으로 표시됨
- 사용자 신뢰 훼손 가능

**영향**:
- `src/lib/emailjs.ts`: 초기화 실패 시 `throw` 처리
- `.env.local.example`: 키 형식 명확화

---

## 2026-02-11 | "전체 보기" 링크 제거 (후속: `/portfolio` 신설 예정)

**결정**: 존재하지 않는 `/portfolio` 라우팅으로 인한 404를 임시 회피하기 위해 홈페이지 "전체 보기" 링크 제거.

**배경**:
- MVP 범위 조정: `/portfolio` 별도 인덱스 페이지는 post-MVP로 미루기로 결정

**영향**:
- 현재: `/` 에서 포트폴리오 9슬롯을 보고 개별 상세 클릭만 가능
- 후속: `/portfolio` 인덱스 추가 시 "전체 보기" 링크 복원 예정

---

## 2026-02-10 | 정적 HTML/CSS/JS 레거시 제거

**결정**: 초기 상태로 기록된 `index.html`, `style.css`, `js/app.js` 파일들은 Next.js 구현 이후 의도적으로 제거하지 않음. (증거 목적으로만 git history에 남김)

**배경**:
- 프로젝트 초기 정적 파일로 시작했으나 Node/npm 도입으로 Next.js 전환
- 구현 결정 히스토리 보존 가치

**영향**:
- 배포 구조: Next.js만 사용
- 문서: 검증 명령 = `npm run build` (정적 파일 무시)

---

