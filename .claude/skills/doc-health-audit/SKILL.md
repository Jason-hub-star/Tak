---
name: doc-health-audit
description: 프로젝트/태스크 첫 진입 시 필요한 정보가 바로 인덱싱되는지, 문서 하나하나가 토큰을 과하게 먹지 않는지, 폴더·파일이 잘 정리됐는지 점검하고 안전하게 정리하는 스킬. 트리거 — "문서건강성체크해줘", "문서건강성체크", "문서 건강성 체크", "문서 건강성", "진입 토큰 점검", "문서 정리", "문서 인덱싱", "always-read 무겁다", "스킬/문서 통합", "doc health".
user_invocable: true
tags: [documentation, health, intake, tokenization, structure, audit]
trigger: "문서건강성체크해줘, 문서건강성체크, 문서 건강성 체크, 문서 건강성, 진입 토큰 점검, 문서 정리, 문서 인덱싱 점검, 문서 토큰 많이 먹나, 스킬/문서 통합, always-read 무겁다, doc health"
version: 1
---

# Doc Health Audit (탁디장)

프로젝트 진입 시 문서 구조가 토큰 효율적이고 정보 접근이 빠른지 점검하는 스킬이다. 인덱싱 명확도, 파일 크기, 폴더 정리를 3축으로 감사하고, 필요시 안전하게 정리한다.

## Use When

- 세션/태스크 첫 진입 시 context 로딩 토큰이 무겁게 느껴질 때
- `always-read` 문서가 비대해 진입이 느려질 때
- append-only 로그(worklog, decision-log 등)가 계속 커질 때
- 스킬이나 문서가 여러 위치에 분산되어 통합이 필요할 때
- 정기 점검으로 문서 건강도를 재확인할 때

## 3대 진단 축 (Audit Dimensions)

### Axis 1: 인덱싱 (첫 진입 경로)

- 진입 체인(AGENTS.md → PROJECT-STATUS.md → 각 하위 섹션)이 명확한가?
- 항상 읽기(AGENTS.md의 First Read)로 강제되는 문서 합계 토큰이 과하지 않은가? (목표: first-read 총 < 10K tokens)
- Tier 정의(First Read vs On Demand)가 여러 문서에서 충돌(SSOT 위반)하지는 않는가?

### Axis 2: 파일 크기 (토큰 효율성)

- 개별 문서의 줄수/바이트 측정. 항상읽기 섹션에 큰 정본(prd 등)이 들어가 있지는 않은가?
- append-only 로그(worklog, decision-log)에 회전(아카이브) 장치가 있는가?
- 상태 대시보드(PROJECT-STATUS)가 한 화면에 스캔 가능한 크기(< 200 lines)를 유지하는가?

### Axis 3: 폴더/정리 (구획 명확성)

- 파일 시스템 구획이 명확한가? (`.claude/skills/`, `ai-context/`, `docs/status/` 등)
- 같은 종류 자산(스킬, 하네스, 로그 등)이 여러 위치에 분산되지 않았는가?

## 측정 명령어

빠르고 정확한 진단을 위해 아래 명령어를 순서대로 실행한다.

### 전체 마크다운 인벤토리 (줄수 + 바이트)

```bash
find . -name "*.md" \
  -not -path "./node_modules/*" \
  -not -path "./.next/*" \
  -not -path "./.git/*" \
  -print0 | xargs -0 wc -lc | sort -k2 -rn
```

### always-read 문서 합산 토큰 추정

1. CLAUDE.md, AGENTS.md, 프로젝트 `.claude/CLAUDE.md` 등 진입 지시 확인:
   ```bash
   grep -r "always-read\|ai-context\|필수" /Users/family/jason/tak/.claude/CLAUDE.md \
     /Users/family/jason/tak/ai-context 2>/dev/null | head -20
   ```

2. 진입 문서별 바이트 측정 (추정 토큰 = 바이트 / 3 근사):
   ```bash
   for f in /Users/family/jason/tak/AGENTS.md \
            /Users/family/jason/tak/docs/status/PROJECT-STATUS.md \
            /Users/family/jason/tak/ai-context/project-context.md; do
     [ -f "$f" ] && echo "$f: $(wc -c < "$f") bytes (~$(( $(wc -c < "$f") / 3 )) tokens)"
   done
   ```

### 폴더별 문서 개수 (분산도 확인)

```bash
find . -name "*.md" \
  -not -path "./node_modules/*" \
  -not -path "./.next/*" \
  -not -path "./.git/*" \
  -print0 | xargs -0 dirname | sort | uniq -c | sort -rn
```

### 참조 안전성 (정리 전 필수)

이동/삭제 전에 해당 경로를 참조하는 파일이 있는지 확인한다:

```bash
# 예: ai-context/worklog.md을 정리/분할할 때
rg "worklog" . --include="*.md" -n
```

## 실행 워크플로우 (모델 역할 분담)

### Phase 1: Opus 1차 감사

- 위 측정 명령어를 실행해 인벤토리 수집
- 3축 기준으로 문제점 가설 정리
- "인덱싱 과다", "로그 비대", "분산 구조" 등 카테고리별로 분류

### Phase 2: Sonnet 교차검증 (독립 서브에이전트)

- 가설 문서들을 직접 열어 재검증
- 참조 전수조사(`rg` 사용):
  - 이동/삭제할 파일이 다른 문서/코드에서 참조되는지 확인
  - false-positive 제거 (주석, 예시, 아카이브 섹션 등)
- 읽기 전용. 변경 없음.

### Phase 3: Opus 검토 및 계획 확정

- Sonnet 결과를 리뷰하고 틀린 부분 정정
- 우선순위 결정 (긴급도, 되돌리기 난이도)
- 최종 조치 계획 승인

### Phase 4: Sonnet 실행

- 파일 이동은 반드시 `git mv` 사용 (히스토리 보존)
- Tier 재분류 (AGENTS.md에 First Read/On Demand 명기)
- SSOT 충돌 해결 (한 문서를 정본으로 정하고 상호참조 추가)
- 변경 사항 얇게 기록 (docs/status/DECISION-LOG.md + ai-context/worklog.md에 1~2줄)
- **코드(src/, public/) 절대 수정 금지**

### Phase 5: Opus 최종 검토 및 커밋

- `git status` 확인: 의도한 변경만 있는지 재검증
- `rg` 다시 실행: 깨진 참조 0건 확인
- 커밋 메시지: "docs(audit): <카테고리> 구조 정리 + 토큰 감축"

## 권장 조치 카탈로그

자주 나오는 문제와 처방:

| 문제 | 원인 | 처방 | 난이도 |
|---|---|---|---|
| 항상읽기 과다 | First Read 범위 너무 넓음 | "First Read(소수 핵심)" vs "On Demand(필요시 참조)"로 재분류. 큰 정본은 On Demand로 이동. AGENTS.md에 명기 | 중 |
| Tier 정의 충돌 | 같은 개념을 여러 문서가 정의 | 한 문서(SSOT)를 정본으로 정하고, 다른 문서에서는 링크 1줄로 참조만 함 | 중 |
| append 로그 비대 | worklog/decision-log가 계속 누적 | 분기/월별 아카이브 폴더로 회전. 본문은 최근분(1~2개월)만 유지. 헤더에 "Archive: docs/history/" 링크 추가 | 중 |
| 자산 분산 | 스킬/하네스가 `.claude/`, `harnesses/` 등 여러 곳에 | 표준 위치로 통합 (`git mv`). 색인(README) 갱신. 옛 위치에 리다이렉트 주석 남김 | 중 |
| 큰 파일 | 단일 MD > 300 lines | 섹션별로 분리. 메인은 개요 + 링크로 유지. 상세는 별도 파일 + ai-context/에 기록 | 상 |

## 안티패턴 (금지)

- ❌ 참조 확인 없이 파일 이동/삭제
- ❌ `mv` 또는 IDE 리팩터링으로 파일 이동 (git history 유실)
- ❌ 코드 수정
- ❌ 같은 사실을 여러 문서에 중복 기록
- ❌ 측정/검증 없이 "느낌"으로 정리

## 산출 및 완료 기준

작업 완료 시 아래를 모두 확인:

- [ ] 진단 리포트 작성
  - 3축 평가 (인덱싱, 파일 크기, 폴더)
  - 토큰 before/after 측정
  - 상위 N개 문제점 + 심각도 등급
- [ ] 적용된 변경 목록 (파일별)
  - 이동: A → B (사유)
  - 삭제: C (확인: 참조 0건)
  - 생성: D (새 아카이브 폴더 등)
  - 수정: E (Tier 재분류)
- [ ] 참조 검증
  - `rg "<이동/삭제 파일>"` 0건 확인
  - 깨진 링크 문서 스캔
- [ ] 커밋 완료 (또는 Opus 승인 대기)

## Verify

- [ ] 3축 진단이 모두 수행되었다
- [ ] 측정 명령어 결과를 해석했다
- [ ] 인덱싱 체인이 명확하다
- [ ] 우선순위 조치와 defer된 항목이 구분된다
- [ ] 참조 검증을 마쳤다
- [ ] 깨진 참조 0건을 확인했다

## Failure / Fallback

- 시간이 없으면: 진단(Axis 1만)까지만 하고, Sonnet 검증은 나중으로 미룬다
- 큰 변경이 두렵으면: 조치를 "제안 리스트"로만 남기고 Opus 최종 승인을 기다린다
- 참조가 복잡하면: `git diff --name-only <commit>` 기준으로 영향 범위를 좁혀 단계적으로 진행

## Related

탁디장 문서 계층 (SSOT):
1. `docs/prd.md` — 제품 목표, 기능 명세
2. `ai-context/master-plan.md` — 협업 진행 상황
3. `ai-context/project-context.md` — 기술 스펙, 타입 정의
4. `docs/status/PROJECT-STATUS.md` — 현재 단계, 넥스트 액션
5. `docs/status/DECISION-LOG.md` — 구조/원칙 결정 기록
6. `AGENTS.md` — 로딩 순서·진입 지시 (First Read / On Demand)

스킬:
- `doc-sync` — 변경 후 어떤 문서를 고쳐야 할지
- `thin-doc-update` — 상태 문서를 얇게 유지하기
- `session-retro` — 세션 종료 시 패턴 자산화
