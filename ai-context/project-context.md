# 프로젝트 컨텍스트 (Tak)

기준일: 2026-02-10 (KST)
프로젝트명: Tak Djang Design Studio
기준 문서: `docs/prd.md`

## 1) 한 줄 정의
온라인 셀러가 신뢰할 수 있는 디자이너를 빠르게 판단하고 상담 문의로 전환하도록 돕는 포트폴리오 중심 리드 전환 웹사이트.

## 2) 왜 만드는가
- 포트폴리오 노출만으로는 고관여 잠재고객의 문의 전환이 낮음
- "예쁜 디자인" 중심 메시지 대신 "매출/설득/전략" 언어로 차별화 필요
- SEO 기반 유입과 문의 폼/고정 CTA 기반 전환 흐름을 함께 설계해야 함

## 3) 대상 사용자
- 상세페이지 품질을 높이고 싶은 온라인 셀러
- 브랜드 담당자/소상공인
- 상담 후 프로젝트 진행 가능성을 검토하는 잠재 고객

## 4) 핵심 가치 (USP)
1. 기획 중심 디자인: 시장조사/트렌드 분석 기반 설계
2. 효율적 프로세스: 1차 콘티로 방향 합의 후 제작
3. 올인원 제공: 기획 + 촬영 + 디자인 + 원본 제공
4. 명확한 견적: 길이 단위가 아닌 프로젝트 단위 정가 운영

## 5) 현재 상태와 기준선
- 현재 코드베이스: Next.js 14 App Router 기반 구현 + 디자인 정제 완료 (빌드 성공, 22개 라우트)
- 구현 완료 항목:
  - 랜딩 10섹션 (Hero/Services/WebsiteLinkage/Pricing/Portfolio/Process/About/FAQ/Contact/FinalCTA)
  - **제작+홍보 연계 풀 IA** (devfive 벤치마킹): `/services`, `/pricing`, `/portfolio` 라우트
  - **무료 진단 위저드** (`/contact/form`, 13문항 5단계, localStorage)
  - `/portfolio/[slug]` SSG (MDX frontmatter 파싱, 샘플 3개)
  - 문의 폼 (React Hook Form + Zod + EmailJS + honeypot 스팸 방지)
  - **에디토리얼 리디자인** (오프화이트/근접블랙/Rose 토큰, 카드 10px, 플랫 그림자)
  - **카피 정제** (AI 티 제거: 은유·부정병렬·막연한 마무리·em대시)
  - **블랙 완전 제거** (primary 로즈, footer/FinalCTA 라이트톤)
  - **모션 토큰 SSOT** (`src/lib/motion.ts`, duration/easing)
  - **UI 프리미티브** (Button, Badge, Card, Section, Reveal, MediaFrame - cva 기반)
  - SEO (메타/OG/sitemap.xml/robots.txt)
- 협업 기준: `docs/prd.md`의 Next.js 목표 구조를 기준으로 계획/구현/리뷰 수행
- 결정 규칙: 문서 간 충돌 발생 시 `docs/prd.md` 우선

## 6) 핵심 도메인 모델 (PRD 기준)
- PortfolioItem
  - slug, title, category[], industry, deliverables[], kpi, thumbnail, heroImage, publishedAt, featured, tags[]
- TemplateItem
  - slug, title, description, price, discountedPrice, featured, images[], thumbnailUrl, smartstoreUrl
- Tag
  - name, slug
- InquiryPayload
  - name, brandOrStore, contact, inquiryType, budgetRange, deadline, message, privacyConsent

## 7) 라우팅 현황
- `/`: 랜딩 원페이지 (Hero/Services/WebsiteLinkage/Pricing/Portfolio/Process/About/FAQ/Contact/FinalCTA)
- `/services`: 제작+홍보 연계 4-서비스 상세
- `/takmong`: AI 템플릿 스토어 (펀딩 성과 + 리워드 4종 + 스마트스토어 판매 2종)
- `/templates/[slug]`: 템플릿 상세 (SSG, 상세 이미지 27장)
- `/pricing`: 가격 비교표 + FAQ
- `/portfolio`: 포트폴리오 목록
- `/portfolio/[slug]`: 포트폴리오 상세 (SSG)
- `/contact`: 진단 상담 카드 랜딩
- `/contact/form`: 무료 진단 위저드 (13문항 5단계, localStorage)
- `/contact/form/thank-you`: 감사 페이지
- `/privacy`: 개인정보 처리방침
- `/sitemap.xml`, `/robots.txt`: SEO 운영 경로

## 8) 외부 서비스 연동
- EmailJS (문의 폼 + 무료 진단 위저드 전송)
  - 키 값은 **레포에 커밋하지 않는다.** 실제 값은 `.env.local`(git 미추적)에만 보관, 형식은 `.env.local.example` 참조
  - 필요 키: `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
  - 수신 메일/Service·Template ID 등 운영 값은 환경변수로 설정 완료 (Production·Preview·Development 3환경)
  - 함수: `sendInquiry()` (문의 폼), `sendDiagnosis()` (위저드 → 직렬화 후 동일 템플릿 사용)
  - 현재 상태: **실연동 완료** (HTTP 200, reply-to·to_email 파라미터 지원)
- 카카오톡 채널: `open.kakao.com/o/suSdZzs` (확정 완료)
  - 사용처: Header "무료 상담", FloatingCTA, FinalCTA, 진단 위저드 review 페이지, 가격카드
  - 현재 상태: **실제 링크 연결 완료**
- Naver 스마트스토어: 탁몽 AI 템플릿 2종 판매 채널
  - 상품 1: AI 디자인 템플릿 (정가 320,000원 → 99,000원, 69% 할인, featured, 사은품 PDF)
  - 상품 2: 상세페이지 진단·1:1 컨설팅 (정가 59,000원 → 29,000원, 50% 할인)

## 9) 비기능/운영 원칙
- SEO: SSR/SSG, 메타/OG, sitemap/robots 우선
- 성능: LCP/CLS/INP와 이미지 최적화 중심
- 접근성: 키보드 포커스/명확한 CTA/폼 오류 메시지 준수
- 유지보수: 콘텐츠 스키마 일관성, 상대경로 기준 문서화 유지

## 10) 협업 역할 고정
- Claude: 구현 담당
- Codex: 리뷰/검증 담당

## 11) 문서 운영 원칙
- 협업 기준 문서는 `ai-context`만 사용
- 작업 종료 시 `worklog.md`, `review-log.md` 갱신
- 날짜는 `YYYY-MM-DD` 형식 사용
