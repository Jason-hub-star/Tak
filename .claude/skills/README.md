# Tak Skills Index

이 디렉토리는 탁디장 프로젝트에서 사용하는 실행형 스킬 세트다.

## Start Here

1. 현재 작업의 성격을 먼저 분류한다.
2. 아래 표에서 가장 가까운 스킬 1~2개를 고른다.
3. 스킬을 읽고 실제 파일/명령/산출물에 맞게 적용한다.

## Core Skills (탁디장)

| Skill | Use When | Output | Related Harness |
|---|---|---|---|
| `doc-sync` | 코드 변경 후 어떤 문서를 같이 고쳐야 할지 헷갈릴 때 | 문서 누락 판정, companion check | `harnesses/change-class-doc-sync.md` |
| `thin-doc-update` | 문서 업데이트 요청 시 상태판을 얇게 유지해야 할 때 | current dashboard 정리, daily evidence 분리 | - |
| `doc-health-audit` | 문서 진입 토큰이 무겁거나 구조가 분산되어 있을 때 | 3축 감사 리포트, 토큰 before/after, 안전 정리 플랜 | - |
| `evidence-review` | 작업 완료 선언 직전 검증과 근거를 확인할 때 | executed verify, changed docs, release verdict | `harnesses/socratic-review.md` |
| `session-retro` | 세션 종료 시 성공/실패 패턴을 자산화할 때 | 성공/실패/반복 패턴 기록, 승격 후보 | `harnesses/session-retro.md` |
| `task-intake-router` | 새 요청을 먼저 분류해야 할 때 | intake verdict, chosen skill, next skill | - |
| `claude-code-health` | 에이전트 컨텍스트/토큰/MCP 건강을 점검할 때 | health verdict, cleanup actions | `harnesses/claude-code-health.md` |

## Design Skills (탁디장 UI/UX)

| Skill | Use When | Output | Related Harness |
|---|---|---|---|
| `premium-frontend-design` | 제작/홍보 페이지의 시각적 완성도를 높일 때 | 디자인 시스템, 컴포넌트 패턴, WebGL 템플릿 | `harnesses/design-to-code.md` |
| `landing-page-guide-v2` | 고전환율 랜딩페이지를 설계할 때 | 11요소 프레임워크, 카피 + 디자인 통합 | `harnesses/conversion-service-site-spec.md` |
| `interaction-design` | UI 상호작용과 마이크로인터랙션을 설계할 때 | 상호작용 흐름, 애니메이션 타이밍, 피드백 패턴 | `harnesses/design-to-code.md` |
| `web-design-guidelines` | 웹 디자인 시스템을 구축하고 일관성을 유지할 때 | 색상/타이포 가이드, 반응형 전략, 접근성 체크 | `harnesses/design-to-code.md` |

## Selection Rule Of Thumb

- "무슨 문서를 고쳐야 하지?" → `doc-sync`
- "문서업데이트인데 상태 문서가 계속 길어진다" → `thin-doc-update`
- "이 요청부터 먼저 분류해야 한다" → `task-intake-router`
- "완료라고 말해도 되나?" → `evidence-review`
- "세션을 마치고 배운 점을 남기고 싶다" → `session-retro`
- "에이전트가 느려지거나 헷갈리는 것 같다" → `claude-code-health`

## Related Harnesses

탁디장의 정식 하네스는 `harnesses/REGISTRY.md`에서 확인하세요. 스킬과 하네스의 차이:

- **Skill** (`.claude/skills/`): 인터랙티브 스텝 가이드, 스스로 적용 / 사용자가 선택
- **Harness** (`harnesses/`): 정해진 프로세스, 팀 규칙 / CI 또는 정기 실행

## SSOT Reference

탁디장 문서 계층:
1. `docs/prd.md` — 제품 목표, 기능 명세 (**최우선**)
2. `ai-context/master-plan.md` — 협업 진행 상황
3. `ai-context/project-context.md` — 기술 스펙, 타입 정의
4. `docs/status/PROJECT-STATUS.md` — 현재 단계, 넥스트 액션
5. `docs/status/DECISION-LOG.md` — 구조/원칙 결정 기록
6. `harnesses/change-class-doc-sync.md` — change class 매트릭스

## About This Project

- **Stack**: Next.js 14 + TypeScript + Tailwind + EmailJS
- **Docs Working SoT**: `ai-context/master-plan.md`
- **Current Phase**: 구현 단계 (코드리뷰 대기)
- **Validate**: `npm run build` / `npm run lint`
