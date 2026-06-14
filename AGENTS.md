# Tak Djang Design Studio — Agent Entry

탁디장 디자인 스튜디오는 Next.js 14 기반 포트폴리오 + 리드 전환 웹사이트다. 온라인 셀러가 신뢰할 수 있는 디자이너를 판단하고 상담 문의로 전환하도록 돕는다.

## Loading Order (Tier 1: Always Read)

1. `ai-context/master-plan.md` — 협업 기준, 우선순위, 단계 진입 조건
2. `ai-context/project-context.md` — 한 줄 정의, 도메인 모델, 외부 서비스 연동
3. `docs/prd.md` — 제품 기준 문서 (기능/기술스택/라우팅) **최우선**
4. `docs/status/PROJECT-STATUS.md` — 현재 상태, 활성 트랙, 다음 액션
5. `harnesses/REGISTRY.md` — 이 프로젝트에 맞는 하네스와 사용 시점

## Hard Rules

- **정본 우선**: `docs/prd.md` > `ai-context/` > `docs/status/` > 이 파일
- **검증 명령**: `npm run build` (타입체크, 린트, 빌드 포함)
- **비밀 보호**: `.env.local`은 커밋 안함. 형식은 `.env.local.example` 참조 (EmailJS 키, Vercel 환경변수)
- **협업**: 문서 충돌 시 `docs/prd.md` 우선. 구현은 Codex 리뷰 대기 모드 준수.
- **문서 운영**: 상태 문서는 얇게(60~110줄), 증거와 로그는 `ai-context/worklog.md`와 `docs/status/DECISION-LOG.md`로 분리

## When To Use Each Harness

- **UI 변경/화면 추가**: `harnesses/design-to-code.md` → 라우트/화면/컴포넌트 구조 먼저 정의
- **배포 전**: `harnesses/next-vercel-release-guard.md` → RSC 경계, env 누수, 폼 보안 점검
- **포트폴리오 이미지 최적화**: `harnesses/media-performance-budget.md` → LCP, 파일크기 예산
- **SEO 제출 (배포 후)**: `harnesses/post-deploy-seo-submit-monitor.md` → sitemap, Google/Naver 제출 자동화
- **레퍼런스 분석**: `harnesses/reference-site-style-extraction.md` → devfive 같은 사이트 패턴 분석 (복제 금지)
- **서비스 스펙 고정**: `harnesses/conversion-service-site-spec.md` → 폼 필드, 라우팅, CTA 명확화
- **코드 변경 후 문서**: `harnesses/change-class-doc-sync.md` → 어떤 상태/결정 문서를 함께 갱신할지
- **세션 종료 시**: `harnesses/session-retro.md` → 성공 패턴과 자동화 기회 기록
- **큰 설계 전**: `harnesses/socratic-review.md` → 위험, 대안, 되돌리기 조건 검토
- **에이전트 건강**: `harnesses/claude-code-health.md` → 컨텍스트, 토큰, MCP, 보안 점검

## Quick Links

- **루트 설정**: `.claude/claude.md`, `.claude/settings.json`
- **운영 도구**: `.claude/commands/`, `.claude/hooks/`
- **스킬**: `.claude/skills/` (필요 시 로드)
