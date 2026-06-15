# Tak Master Plan

기준일: 2026-02-10 (KST)
프로젝트: Tak Djang Design Studio
협업 폴더: `ai-context`

## 1) 시작 문서 경로 (레포 루트 기준)
1. `ai-context/master-plan.md`
2. `ai-context/project-context.md`
3. `ai-context/claude-coding-guideline.md`
4. `ai-context/codex-review-guideline.md`
5. `ai-context/worklog.md`
6. `ai-context/review-log.md`
7. `ai-context/day-close-checklist.md`
8. `ai-context/handover.md`

## 2) 제품 기준 문서 (Source of Truth)
1. `docs/prd.md`

## 3) 현재 단계와 목표
- 현재 단계: **배포 완료 → 운영 모드** (점증적 개선)
- 완료 항목:
  - [x] Next.js 14 App Router + TypeScript + Tailwind + 프리미티브 세팅
  - [x] IA/라우팅 구조 확정 (라우트 증가, `npm run build` 성공)
  - [x] **제작+홍보 연계 풀 IA** (devfive 벤치마킹): `/services`, `/pricing`, `/portfolio`, `/contact`
  - [x] 랜딩 10섹션 (Hero/Services/WebsiteLinkage/Pricing/Portfolio/Process/About/FAQ/Contact/FinalCTA)
  - [x] Portfolio 9슬롯(3-3-3) + 그룹 사이 멘트카드(계단식)
  - [x] `/portfolio/[slug]` SSG + MDX frontmatter 파싱 (샘플 3개)
  - [x] **무료 진단 위저드** (`/contact/form`, 13문항 5단계, localStorage, sendDiagnosis)
  - [x] 문의 폼 (RHF + Zod + EmailJS + honeypot)
  - [x] SEO 메타/OG/sitemap.xml/robots.txt
  - [x] **에디토리얼 리디자인** (오프화이트/근접블랙/Rose, 카드 10px, 플랫 그림자)
  - [x] **카피 정제** (Hero/FinalCTA/Services/Pricing: AI 티 제거)
  - [x] **블랙 완전 제거** (primary 로즈, footer 라이트, FinalCTA 라이트)
  - [x] **모션 토큰 SSOT** (`src/lib/motion.ts`, duration/easing distill)
  - [x] **UI 프리미티브** (Button, Badge, Card, Section, Reveal, MediaFrame + cva)
  - [x] 모바일/접근성 안정화 (CTA 48px 터치, ARIA, 반응형)
  - [x] **EmailJS 실연동** (프로덕션 키, HTTP 200 검증, reply-to·to_email 지원)
  - [x] **카카오톡 채널 연결** (open.kakao.com/o/suSdZzs, FloatingCTA 실제 링크)
  - [x] **탁몽 AI 템플릿 스토어** (`/takmong` 확장, `/templates/[slug]` SSG, 스마트스토어 판매 2종)
  - [x] **Vercel 배포** (프로젝트 `tak`, 도메인 takdijang.com, SSL 진행중)
- 현재 목표:
  - 배포 후 라우트 최종 검증 및 도메인 연결 확인
  - SEO 제출 (Google Search Console, Naver)
  - 스마트스토어 판매 채널 운영 (분석/리뷰 모니터링)

## 4) 핵심 규칙
- 문서 충돌 시 `docs/prd.md`를 최우선으로 따른다.
- 역할 고정:
  - Claude: 구현 담당
  - Codex: 리뷰/리스크 검증 담당
- 협업 기준은 PRD 목표 아키텍처(Next.js 중심)를 따른다.
- 레퍼런스 디자인은 복제가 아니라 구조/전환 전략 재해석 원칙으로 적용한다.
- `docs/prd.md`의 `9. 레퍼런스 디자인 반영 가이드`와 `9.5 품질 게이트`는 필수 준수 항목이다.
- 현재 정적 코드(`index.html`, `style.css`, `js/app.js`)는 초기 상태로만 기록한다.
- 검증 명령은 Node/npm 도입 기준으로 문서화한다 (`npm run build` 중심).

## 5) 우선순위 백로그
1. [완료] EmailJS 미설정 시 성공 처리되는 문의 폼 오동작 수정
2. [완료] `/portfolio` 라우트 부재 → `/portfolio` index 신설로 해결
3. [완료] devfive 벤치마킹 — 제작+홍보 연계 포지셔닝 풀 IA (`/services`, `/pricing`, `/portfolio` + 홈 신규 3섹션)
4. [완료] 무료 진단 위저드 — `/contact/form` (13문항 5단계, localStorage, sendDiagnosis)
5. [완료] 에디토리얼 리디자인 — 오프화이트/근접블랙/Rose 토큰, 카드 10px, 플랫 그림자
6. [완료] 카피 정제 — Hero/FinalCTA/Services/Pricing에서 AI 티 제거
7. [완료] 블랙 완전 제거 — primary 로즈, footer/FinalCTA 라이트톤
8. [완료] 모션 토큰 SSOT — `src/lib/motion.ts` (duration/easing distill)
9. [완료] UI 프리미티브 — Button, Badge, Card, Section, Reveal, MediaFrame (cva 기반)
10. [완료] EmailJS 프로덕션 키 설정 및 실연동 (HTTP 200, reply-to·to_email)
11. [완료] 카카오톡 채널 URL 확정 (open.kakao.com/o/suSdZzs) 및 전체 CTA 연결
12. [완료] 탁몽 AI 템플릿 스토어 확장 (`/takmong`, `/templates/[slug]` SSG, 스마트스토어 판매 2종)
13. [완료] Vercel 배포 + 도메인 연결 (takdijang.com, 가비아 A/CNAME 설정, SSL 진행중)
14. [현재] 배포 후 라우트 최종 검증 및 도메인 활성화 확인
15. [현재] SEO 제출 (Google Search Console, Naver 웹마스터도구)
16. 포트폴리오 실데이터 9개 확장 (현재 3개 반복 → 9개 개별 포토셋) — 선택사항
17. 성능 점검 (LCP/CLS/INP, Vercel Analytics) 및 이미지 최적화

## 6) Phase 전환 기준
- 구현 -> 배포 준비 진입 조건 (완료):
  - 핵심 사용자 플로우(랜딩 → 포트폴리오 → 진단/문의) 완성
  - `npm run build` 성공 (라우트 증가, 타입/린트 클린)
  - 에디토리얼 리디자인 + 카피 정제 완료
  - `/contact/form` 위저드 검증 완료
  - 탁몽 AI 템플릿 스토어 (`/takmong`, `/templates/[slug]`) 구현 완료
- 배포 -> 운영 진입 조건 (완료):
  - EmailJS 프로덕션 키 설정 및 실연동 완료 (HTTP 200, 복수 환경)
  - 카카오톡 채널 URL 확정 (open.kakao.com/o/suSdZzs) 및 CTA 연결 완료
  - 배포 전 보안 점검 완료
  - Vercel 배포 성공 (프로젝트 `tak`, GitHub main 자동배포)
  - 커스텀 도메인 연결 (takdijang.com, 가비아 설정 완료)

## 7) 문서 신선도 규칙
- 협업 기준은 `ai-context` 문서만 사용한다.
- 제품 기준 변경 시 당일 `master-plan.md`와 `project-context.md`를 동기화한다.
- 작업 종료 시 `worklog.md`와 `review-log.md`를 같은 턴에 갱신한다.
- 절대경로 대신 레포 루트 상대경로만 사용한다.

## 8) 완료 보고 형식
- 변경 요약
  1. 파일/기능
  2. 핵심 로직
  3. 영향 범위
- 검증
  1. 실행 명령 (`npm run build`, 필요 시 `npm run dev`)
  2. 결과(성공/실패 + 핵심 로그)
- 리스크
  1. 남은 이슈
  2. 후속 작업
