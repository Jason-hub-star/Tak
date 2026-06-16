---
name: thin-doc-update
description: 문서 업데이트 요청 시 상태판을 얇게 유지하고 상세 증거는 일일 로그로 분리하는 스킬. 트리거 — "문서 얇게 업데이트", "상태판 정리", "상태 문서 갱신", "daily 로그로 분리".
user_invocable: true
tags: [docs, status, daily, cleanup, doc-sync]
trigger: "문서 업데이트, doc update, 상태 문서 정리, daily 누적"
version: 1
---

# Thin Doc Update (탁디장)

## Use When

- 사용자가 "문서 업데이트"를 요청한다.
- `docs/status/PROJECT-STATUS.md`가 긴 작업 로그처럼 쌓이고 있다.
- 해소된 placeholder, 폐기된 실험, 오래된 phase가 상단 상태판에 남아 있다.

## Rules

1. 상태판은 최신 사실만 남긴다.
2. 상세 변경 이력과 증거는 `ai-context/`에 기록한다.
3. `docs/status/PROJECT-STATUS.md`는 한 화면 또는 그 근처에서 스캔 가능해야 한다.
4. `Recent Changes` 섹션은 5개 이하로 유지한다.
5. 코드/런타임 truth가 문서보다 우선한다.

## Steps

1. Read current status docs:
   - `docs/status/PROJECT-STATUS.md`
   - `docs/status/DECISION-LOG.md`
   - 필요하면 `ai-context/worklog.md`

2. Compare with code/runtime facts that changed.

3. Rewrite `docs/status/PROJECT-STATUS.md` as a thin dashboard:
   - current phase
   - active/pending tracks (현재 구현 중인 기능/수정)
   - next actions (즉시 다음 할 일 3개 이내)
   - verification commands (`npm run build`, visual smoke 등)
   - recent changes <= 5 (최근 변경 항목 최대 5개)

4. Move long detail to `ai-context/worklog.md` (YYYY-MM-DD 섹션).

5. Lower resolved risks with `✅` or move stale detail to `ai-context/` history.

6. Run validation checks.

## Verify

- [ ] `docs/status/PROJECT-STATUS.md` can be scanned in one screen or near one screen
- [ ] no duplicated old/current facts conflict
- [ ] detailed evidence exists in ai-context/ when needed (worklog, review-log)
- [ ] verification commands (npm run build, etc.) are current

## Failure / Fallback

- If worklog section is unclear, inspect code first and mark open questions rather than guessing.
- If status truth conflicts, prefer `docs/prd.md` → `ai-context/project-context.md` → code.

## Related

탁디장의 SoT 계층:
1. `docs/prd.md` (제품 목표, 기능 명세)
2. `ai-context/master-plan.md` (협업 진행 상황)
3. `ai-context/project-context.md` (기술 스펙, 타입)
4. `docs/status/` (현재 단계, 넥스트 액션)
