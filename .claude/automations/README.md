# Automations (탁디장)

반복 작업 프롬프트 자산을 두는 곳이다.

## Rules

- deterministic (매번 같은 절차)
- idempotent (여러 번 실행해도 안전)
- timezone explicit (KST 명시)
- 입력과 출력이 명시적

---

## Starter Prompts

### 1. `doc-drift-nightly.prompt.md`
- **목적**: 코드와 문서의 드리프트 후보를 nightly로 점검한다
- **주기**: 매일 (자동 또는 수동)
- **입력**: 지난 24h git log, 변경 파일
- **출력**: 바뀐 파일 요약, 갱신 필요한 문서 후보, 사람이 확인할 리스크
- **소요 시간**: 5~10분

### 2. `weekly-harness-review.prompt.md`
- **목적**: 최근 일주일 작업에서 성공/실패 패턴, 반복 수작업을 추출한다
- **주기**: 주 1회 (금요일 또는 주말)
- **입력**: 지난 7일 커밋, harnesses 사용 기록, worklog
- **출력**: keep 패턴 1~3개, discard 패턴 0~2개, 새 하네스 후보 0~2개
- **소요 시간**: 20~30분

---

## Manual Trigger

두 프롬프트 모두 Claude Code에서 수동으로 실행 가능합니다.

```
# 예시
주인님: "doc drift nightly를 지난 3일 기준으로 실행해줘"
Claude Code: 프롬프트 로드 → 해당 기간 git log 수집 → 보고서 생성
```

---

## Related

- **Skills**: `.claude/skills/` (인터랙티브 가이드)
- **Harnesses**: `harnesses/` (정식 팀 프로세스)
- **Docs**: `ai-context/master-plan.md` (협업 기준)

---

## Status

- `doc-drift-nightly.prompt.md`: **Ready** (수동 사용 가능)
- `weekly-harness-review.prompt.md`: **Ready** (수동 사용 가능)
- Scheduled automation: **Not yet** (향후 schedule skill로 자동화)
