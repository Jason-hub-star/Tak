---
name: claude-code-health
tags: [agent-health, context, token, security, model-tier]
trigger: "탁디장 배포 전 또는 에이전트 컨텍스트/비용/보안이 흔들릴 때"
status: proven
---

# Claude Code Health Harness (탁디장)

## When

- 새 에이전트 세션 시작 전 (컨텍스트 크기 확인)
- 배포 전 최종 보안 점검
- MCP/플러그인이 과하게 로드되었을 때

## Checks

| Area | Target |
|---|---|
| Always-read docs | AGENTS.md, CLAUDE.md, PROJECT-STATUS.md |
| Entry context size | 3개 파일 합 <800줄 (현재: ~650줄) |
| Skills | 최대 2~3개만 활성 (필요 시) |
| MCP/tools | 필요한 것만 |
| Model tier | Haiku (기본) → Opus (리뷰 필요 시만) |
| Security | `.env.local` 커밋 금지, `NEXT_PUBLIC_*` 만 노출 |

## Flow

1. **Entry context 측정**
   ```bash
   wc -l AGENTS.md .claude/claude.md docs/status/PROJECT-STATUS.md
   ```

2. **stale 문서 검토** → 오래된 상세는 worklog로 이동

3. **보안 체크**
   - [ ] `.env.local` `.gitignore` 포함
   - [ ] `NEXT_PUBLIC_EMAILJS_*` (클라이언트 safe) 만 노출
   - [ ] 서버 secret 없음

4. **스킬 정리** → 불필요한 활성화 제거

## Verify

- [ ] always-read docs 빠른 스캔 가능
- [ ] 현재 상태 PROJECT-STATUS에서 복구 가능
- [ ] 커밋된 파일에 secret 없음
- [ ] 도구 목록이 프로젝트와 맞음

## 탁디장 체크

- [ ] AGENTS.md / .claude/claude.md / PROJECT-STATUS.md 합 <800줄
- [ ] .env.local .gitignore 확인
- [ ] EmailJS NEXT_PUBLIC_* 만 사용 (prod secret은 Vercel env vars)
