# Weekly Harness Review (탁디장)

**목적**: 최근 일주일 작업에서 성공 패턴, 실패 우회, 반복 수작업을 추출하고 하네스 유지/폐기 판정한다.

**주기**: 주 1회 (금요일 오후 또는 주말)

**타임존**: KST (한국 표준시)

---

## Input

```
git log --oneline --since="7 days ago" --until="now"
git diff --stat HEAD~20..HEAD 2>/dev/null || true
grep -r "harness\|automation\|skill" harnesses/ .claude/skills/ (지난주 참고)
ai-context/worklog.md (최근 주 섹션)
ai-context/review-log.md (리뷰 피드백)
```

---

## Steps

1. **최근 작업 스캔**
   - 지난 7일 커밋 로그
   - 활성 하네스 (사용한 것들)
   - 비활성 하네스 (건드린 것 없음)

2. **Keep 패턴 추출** (1~3개)
   - 반복해서 도움 된 하네스/절차
   - 실제 실행되고 시간을 절약한 사례
   - 팀 규칙/가이드라인 준수 여부

3. **Discard 패턴 추출** (0~2개)
   - 사용하지 않은 하네스
   - 시대에 뒤떨어진 규칙 (예: 폐지된 인프라 관련)
   - 너무 복잡해서 현실적으로 쓰기 어려운 절차

4. **새 하네스 후보** (0~2개)
   - 반복된 manual step (3회 이상)
   - 자동화하면 이득인 체크리스트
   - 세션 retro 기반 학습 패턴

5. **증거 기반 판정**
   - 각 keep/discard 패턴마다 구체적인 예시
   - 언제, 누가, 어떻게 도움/해 되었는지

---

## Output Template

```markdown
## Weekly Harness Review — Week of YYYY-MM-DD to YYYY-MM-DD (KST)

### Active Harnesses (used this week)
| 하네스 | 사용 빈도 | 효과 | Evidence |
|---|---|---|---|
| `change-class-doc-sync` | 3회 | ✅ Keep | route 추가 시 docs 누락 방지 |
| `socratic-review` | 1회 | ✅ Keep | 구조 결정 전 질문 기반 검증 도움 |
| `session-retro` | 2회 | ✅ Keep | 성공/실패 패턴 기록 → 다음 태스크 계획 개선 |

### Inactive Harnesses (not used)
| 하네스 | 마지막 사용 | 제안 |
|---|---|---|
| `post-deploy-seo-submit-monitor` | 2주 전 | ⏸️ Archive (배포 후만 필요) |
| `media-performance-budget` | 1개월 전 | ⏸️ Archive (디자인 정책 미정) |

### Keep Patterns Summary

**Pattern 1: change-class-doc-sync 기반 문서 동기화**
- 신칙 route 추가 때마다 docs/status/PROJECT-STATUS.md 누락 방지
- Companion check (npm run build) 자동으로 차단
- 소요 시간: 15분 → 5분 (문서 누락 재작업 제거)

**Pattern 2: 폼 타입 정의 먼저 (project-context.md)**
- InquiryPayload → Zod validation → RHF 필드 순서
- 타입 먼저 정의하면 구현이 깔끔함
- 테스트 시간 단축

### Discard Patterns Summary

**Pattern: media-performance-budget 하네스**
- 현재 디자인 토큰이 정책 단계 (아직 퍼포먼스 최적화 필요 없음)
- 배포 후 실제 Core Web Vitals 데이터 나올 때까지 보류

---

## New Harness Candidates

### Candidate 1: Email Template Sync
- **Signal**: EmailJS 템플릿 변경 시 3회 이상 수동으로 프로덕션 환경 확인
- **Scope**: `.env`, 템플릿 변수명, 폼 필드 매칭 자동 검증
- **Priority**: medium (다음 EmailJS 개선 시)

### Candidate 2: Pre-commit Type + Build Check
- **Signal**: commit 후 타입 에러 또는 빌드 실패 3회
- **Scope**: `npm run lint && npm run build` pre-commit hook
- **Priority**: high (다음 주 구현)

---

## Statistics

| 항목 | 수량 | 현황 |
|---|---|---|
| 활성 하네스 | 3 | ✅ Healthy |
| 비활성 하네스 | 2 | Archive 가능 |
| Keep 패턴 | 3 | All evidence-based |
| New candidates | 2 | Priority: 1H + 1M |
| Manual repeats prevented | ~10회 | Estimated time saved: 2h |

---

## Verify

- [ ] keep 패턴은 구체적인 증거 (commit/slack/worklog)와 연결됨
- [ ] discard 패턴은 실제 미사용 기간 기록됨
- [ ] 새 하네스 후보는 반복 신호 (N회 이상) 정의됨
- [ ] 모든 판정이 데이터 기반 (추측 아님)

---

## Failure / Fallback

- 충분한 데이터 없으면: "이번 주는 충분한 활동 없음" 기록
- 하네스 폐지 판정이 애매하면: archive 상태로 보류 (active에서만 제거)
- 새 하네스 후보가 명확 안 하면: "다음 주에 재평가" 기록

---

## Action Items

**For Project Manager / Team Lead:**
- [ ] Archive 하네스 2개 정리 (post-deploy-seo, media-performance-budget)
- [ ] New candidate 2개 priority 판정 (type+build pre-commit 우선)
- [ ] 다음 주 harnesses/REGISTRY.md 업데이트

**For Implementation:**
- [ ] Pre-commit hook 구현 (Candidate 2)
- [ ] EmailJS sync harness 기획 (Candidate 1, 다음 반복)

---

## Manual Trigger (필요 시)

```bash
# 이 프롬프트를 Claude Code에서 수동 실행
# 입력: 검토 기간 (예: "지난주", "지난 2주")
# 출력: 위의 Output Template 형식으로 보고
```
