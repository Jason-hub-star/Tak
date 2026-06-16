---
name: claude-code-health
description: 에이전트 컨텍스트, 토큰 사용, MCP/스킬 상태, 보안을 점검하고 복구 계획을 세우는 스킬. 트리거 — "에이전트 건강성 체크", "에이전트가 멍청해졌어", "컨텍스트 과밀 점검", "토큰/비용 점검", "MCP/스킬 상태 확인", "agent health".
user_invocable: true
tags: [agent-health, context, token, mcp, security]
trigger: "에이전트가 멍청해짐, 컨텍스트 과밀, 비용/토큰/MCP 점검, 새 프로젝트 agent health"
version: 1
---

# Claude Code Health (탁디장)

## Use When

- 세션이 길어지며 같은 실수가 반복된다
- entry docs가 너무 길어 매번 불필요한 컨텍스트가 들어온다
- 스킬/하네스가 많아져 도구 선택이 흐려진다
- 비용, 모델 티어, 보안 설정을 점검해야 한다

## Inputs

- Entry docs: `AGENTS.md`, `.claude/claude.md`
- Status docs: `docs/status/PROJECT-STATUS.md`
- Ops/config: `harnesses/REGISTRY.md`, `.claude/skills/`, `.claude/automations/`
- 필요하면 `.claude/settings.json` (보안 리뷰)

## Steps

1. Count and scan always-read docs:
   - 시작점: `ai-context/master-plan.md`, `ai-context/project-context.md`
   - 부수: `ai-context/claude-coding-guideline.md`, `ai-context/codex-review-guideline.md`
   - 상태: `docs/status/PROJECT-STATUS.md`
   - 총 문서 크기 측정

2. Identify stale detail that should move to ref/daily/weekly:
   - `docs/status/PROJECT-STATUS.md`가 로그처럼 쌓여 있는가?
   - `ai-context/worklog.md`로 상세 증거를 옮길 수 있는가?

3. Check whether current status is a thin dashboard:
   - 한 화면에 스캔 가능한가?
   - Active tracks가 3개 이하인가?

4. Review active skills/tools/plugins for project relevance:
   - `harnesses/REGISTRY.md` 활용도 (실제로 쓰는 하네스만 유지)
   - `.claude/skills/` 로드된 스킬 (project-specific 또는 범용인가?)
   - 불필요한 스킬/하네스 제거 후보

5. Check obvious secret/security risks:
   - `.env.local` 예시파일 노출 확인
   - API 키 하드코딩 확인 (EmailJS, Vercel)
   - `.claude/settings.json` 에 민감한 설정 노출 확인

6. Produce verdict:
   - `stable` — 건강함, 특이사항 없음
   - `bloated` — 컨텍스트/스킬 정리 필요
   - `risky` — 보안 또는 중요 설정 점검 필요
   - `reprofile-needed` — 모델/구조 재평가 필요

7. Write next safe cleanup actions (1~3개).

## Output Format

```markdown
## Claude Code Health Audit

### Always-Read Docs Size
- ai-context/master-plan.md (50 lines)
- ai-context/project-context.md (100 lines)
- ai-context/claude-coding-guideline.md (80 lines)
- ai-context/codex-review-guideline.md (60 lines)
- docs/status/PROJECT-STATUS.md (80 lines)
- **Total: ~370 lines** (acceptable, < 500 lines)

### Status Dashboard Health
- Scans in one screen: YES
- Active tracks: 2/3 (good)
- Recent changes: 4/5 (good)

### Skills/Harnesses Audit
- Active harnesses: 8 (change-class-doc-sync, socratic-review, session-retro, design-to-code, ...)
- Dormant harnesses: 2 (post-deploy-seo, media-performance-budget) → can archive
- Unused skills: 0 (all .claude/skills/ are referenced)

### Security Check
- [ ] No API keys in docs: PASS
- [ ] .env.local.example in sync: PASS
- [ ] .claude/settings.json clean: PASS

### Verdict
- **STABLE** with minor cleanup opportunities

### Next Actions
1. Archive `media-performance-budget.md` to harnesses/archive/
2. Update REGISTRY.md to mark dormant harnesses
3. No security concerns found
```

## Verify

- [ ] always-read docs have a clear loading order and total size < 500 lines
- [ ] status doc is current, not a long session log
- [ ] active harnesses/skills are referenced in REGISTRY.md
- [ ] no secrets are exposed in docs/settings reviewed
- [ ] verdict includes evidence and next action

## Failure / Fallback

- If `.claude/settings.json` cannot be inspected, limit audit to docs and record that tool config was not checked.
- If a cleanup would be risky (e.g., removing a harness), propose it first rather than deleting automatically.
- If docs are very large, recommend moving to `ai-context/daily/` before retrying audit.

## Related

탁디장 하네스 레지스트리: `harnesses/REGISTRY.md`
탁디장 스킬 레지스트리: `.claude/skills/README.md`
마스터 플랜: `ai-context/master-plan.md`
