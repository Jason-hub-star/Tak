---
name: task-intake-router
description: 새 요청이 들어왔을 때 planning, implementation, doc-sync, review로 분류하고 다음 스킬을 선택하는 스킬
user_invocable: true
tags: [routing, intake, planning, triage]
trigger: "새 요청이 들어와서 먼저 어떤 종류의 일인지 판정해야 할 때"
version: 1
---

# Task Intake Router (탁디장)

## Use When

- 새 요청이 들어와서 먼저 어떤 종류의 일인지 판정해야 할 때
- planning과 implementation이 섞여 보여서 시작점을 잡아야 할 때
- 바로 실행할지 아니면 먼저 설계/검토를 할지 결정해야 할 때

## Inputs

- user request
- `ai-context/master-plan.md` (현재 단계)
- `docs/status/PROJECT-STATUS.md` (활성 트랙)
- `docs/prd.md` (제품 목표)
- `.claude/skills/README.md` (가용 스킬)

## Steps

1. 요청을 아래 verdict 중 하나로 분류한다:
   - `plan` — 아키텍처/설계/순서 결정 필요
   - `implement` — 명확한 기능 구현, 즉시 시작
   - `doc-sync` — 코드 변경만 했고 문서 동기화 필요
   - `review` — 완료한 작업 리뷰/검증 요청
   - `impact-map` — 변경 범위와 리스크 먼저 파악 필요

2. 현재 phase (ai-context/master-plan.md)와 요청의 urgency를 같이 본다.

3. 다음에 읽을 문서 1~2개와 next skill 1~2개를 고른다.

4. 병렬 조사, 로그 triage, 넓은 영향 범위 탐색이 필요하면 `sub-agent: yes`로 적는다.
   - 예: 여러 경로 변경 시 impact-map 병렬 실행
   - 예: 새 EmailJS 템플릿 + 폼 필드 동시 변경

5. 결과를 `docs/status/PROJECT-STATUS.md`의 최신 섹션에 기록한다.

## Output Format

```markdown
## Task Intake Verdict

### Request
- Route `/pricing` 추가 + 폼 선택지 추가

### Classification
- **Verdict**: plan + implement
- **Current phase**: 구현 단계 (코드리뷰 대기 중)
- **Urgency**: medium (구현 우선, 구조 결정 필요)

### Next Docs to Read
1. `docs/prd.md` (서비스 정의 재확인)
2. `ai-context/project-context.md` (폼 PayloadType)

### Recommended Skill Path
1. Next: `doc-sync` (change class: route/surface + schema/model)
2. Then: `thin-doc-update` (새 기능 반영)

### Sub-Agent Needed
- No

### Reasoning
- Route 추가는 IA 확인 후 page 파일 추가 (implement)
- 폼 필드 추가는 InquiryPayload 타입 정의 필요 (brief plan)
- 순차 진행 가능 (병렬 불필요)
```

## Verify

- [ ] verdict가 현재 phase와 충돌하지 않는다
- [ ] next skill들이 실제 `.claude/skills/`에 존재하거나 인정된 하네스다
- [ ] sub-agent needed: yes이면 구체적인 조사 범위가 적혀 있다

## Failure / Fallback

- 하나로 분류가 안 되면 `plan` 또는 `impact-map`으로 시작하고 바로 다음 스킬을 붙인다
- review와 implement가 동시에 크면 `impact-map` 먼저, 그다음 구현 착수
- 현재 phase와 요청이 충돌하면 (`구현 중인데 새로 plan 요청`) → 우선순위 판단 후 기록

## Related

탁디장 change class 매트릭스: `harnesses/change-class-doc-sync.md`
탁디장 스킬 인덱스: `.claude/skills/README.md`
