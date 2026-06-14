# Doc Drift Nightly (탁디장)

**목적**: 코드와 문서의 드리프트 후보를 nightly로 점검한다.

**주기**: 매일 자동 또는 수동 (수업/개발 세션 종료 직전)

**타임존**: KST (한국 표준시)

---

## Input

```
git log --oneline --since="24 hours ago"
git diff --name-only HEAD~10..HEAD
find app/ lib/ -name "*.tsx" -o -name "*.ts" -type f -mtime -1
```

---

## Steps

1. **바뀐 파일 요약**
   - 지난 24시간 커밋 목록
   - 주요 변경 경로 분류 (route, lib, component, config)

2. **change class 매칭** (harnesses/change-class-doc-sync.md 기준)
   - route/surface 변경 → `docs/status/PROJECT-STATUS.md`, `docs/status/DECISION-LOG.md` 확인
   - schema/model 변경 → `ai-context/project-context.md` 확인
   - feature/flow 변경 → `ai-context/project-context.md`, feature list 확인
   - config/env 변경 → `.env.local.example`, 해당 docs 확인
   - design/token 변경 → 구현 코드 vs docs 동기화 확인

3. **갱신 필요한 문서 후보 리스트**
   - 우선도 (must-update, maybe-update, skipped)
   - 섹션 힌트 (예: "PROJECT-STATUS.md → Active Tracks")

4. **사람이 확인할 리스크**
   - 공개 API 변경 (외부 영향)
   - 폼/EmailJS 연동 변경 (테스트 필요)
   - 새 환경 변수 (`.env.local.example` 동기화)

---

## Output Template

```markdown
## Doc Drift Report — YYYY-MM-DD HH:MM:SS KST

### 24h Commits
- `abc1234` feat: add /services route
- `def5678` fix: EmailJS template placeholder

### Changed Files Summary
| Category | Files | Change Class |
|---|---|---|
| routes | `app/services/page.tsx` | route/surface |
| components | `components/ServiceCard.tsx` | design/token |
| lib | `lib/emailjs-templates.ts` | feature/flow |

### Must-Update Docs
| 문서 | 이유 | 현황 | 섹션 |
|---|---|---|---|
| docs/status/PROJECT-STATUS.md | 새 route 반영 | ⚠️ missing | Active Tracks |
| ai-context/project-context.md | EmailJS 템플릿 변경 | ✅ updated | Feature: Email |

### Risks to Review
- [ ] `/services` 라우트가 IA에 추가되었는지 확인 (docs/prd.md)
- [ ] EmailJS 프로덕션 환경 테스트 필요
- [ ] TypeScript 타입 일관성 (InquiryPayload와 폼 필드 매칭)

### Verdict
- 1개 문서 갱신 필요 (PROJECT-STATUS.md)
- 리스크: medium (프로덕션 EmailJS 미테스트)
```

---

## Verify

- [ ] 바뀐 파일이 모두 최소 1개 change class에 분류됨
- [ ] must-update 문서 누락 여부가 판정됨
- [ ] 구조/원칙 변경 시 DECISION-LOG.md 필요 여부 검토됨
- [ ] 사람이 확인할 리스크가 3개 이상 명시됨

---

## Failure / Fallback

- 변경이 없으면: "오늘은 특이사항 없음" 한 줄만 보고
- 변경이 많으면: 최우선 must-update 3개까지만 명시, 나머지는 "More..." 표기
- 문서 변경을 판단할 수 없으면: code diff 기반으로만 보고하고 마크업 필요

---

## Manual Trigger (필요 시)

```bash
# 이 프롬프트를 Claude Code에서 수동 실행
# 입력: 타겟 날짜 (예: "어제", "지난주")
# 출력: 위의 Output Template 형식으로 보고
```
