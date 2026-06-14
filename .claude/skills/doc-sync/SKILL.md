---
name: doc-sync
description: 코드 변경 후 어떤 문서를 같이 고쳐야 하는지 change class 기준으로 좁혀주는 점검 스킬
user_invocable: true
tags: [documentation, drift, post-edit, ssot]
trigger: "코드 변경 후 문서 누락이 걱정될 때"
version: 1
---

# Doc Sync (탁디장)

문서를 많이 쓰게 만들기보다, 꼭 고쳐야 할 문서를 빠르게 찾는 데 목적이 있다.

## Use When

- 코드 변경 직후
- 큰 작업 마무리 전
- `/self-review` 전에
- "PROJECT-STATUS만 고치면 되나?"가 헷갈릴 때

## Inputs

- working tree 변경사항
- staged 변경사항
- 새로 추가된 파일
- 탁디장 SSOT 문서 세트

## Steps

### Step 1: 변경 파일 수집

```bash
git diff --name-only HEAD
git diff --name-only --cached
git status --porcelain
```

### Step 2: trivial 변경 필터

아래만 바뀌면 문서 갱신이 불필요할 수 있다.

- 오탈자/포맷팅
- 테스트 fixture/log/generated 파일
- 주석만 수정

단, 동작이나 경계가 바뀌면 trivial이 아니다.

### Step 3: change class 분류 (탁디장 기준)

| Class | Example | Must Update | Maybe Update |
|---|---|---|---|
| route/surface | `/services`, `/pricing` 페이지 추가 | `docs/status/PROJECT-STATUS.md`, `docs/status/DECISION-LOG.md` | `docs/prd.md` |
| schema/model | 문의 폼 필드 추가 (InquiryPayload) | `ai-context/project-context.md` | `docs/status/PROJECT-STATUS.md` |
| feature/flow | EmailJS 템플릿, 제출 로직 변경 | `ai-context/project-context.md` (연동 상태) | `docs/prd.md` |
| config/env | EmailJS 키, Vercel 환경 변수 | `ai-context/project-context.md` (형식), `.env.local.example` | `docs/status/DECISION-LOG.md` |
| design/token | 색상, 타이포, 간격 변경 | 구현 코드 레벨 (전용 doc 추가 시에만) | - |
| infra/build | Vercel 빌드, Next.js 설정 | `docs/status/DECISION-LOG.md` | `docs/deploy-vercel.md` |

### Step 4: 필수 문서 누락 판정

각 문서에 대해 아래 중 하나를 판정한다.

- `updated`
- `not needed`
- `missing`

`missing`이면 이유와 섹션 힌트를 같이 적는다.

### Step 5: companion checks 제안

| 상황 | Companion Check |
|---|---|
| route/surface 변경 | `npm run build`, visual smoke |
| schema/model 변경 | 타입 체크, 폼 제출 테스트 |
| feature/flow 변경 | EmailJS 연동 테스트 |
| design/token 변경 | visual smoke, 모바일 반응형 |
| 큰 변경 | self-review |

## Output Format

```markdown
## Doc Sync Report

### Change classes
- route/surface
- design/token

### Must update
| 문서 | 이유 | 상태 | 섹션 힌트 |
|---|---|---|---|
| docs/status/PROJECT-STATUS.md | 현재 동작 변화 반영 | missing | Active Tracks |
| ai-context/project-context.md | InquiryPayload 타입 정의 변경 | updated | Schema |

### Companion checks
- npm run build
- visual smoke

### Verdict
- ⚠️ 1 doc needs update
```

## Verify

- [ ] 변경 파일이 모두 최소 한 class에 분류되었다
- [ ] 필수 문서 누락 여부가 판정되었다
- [ ] `docs/status/PROJECT-STATUS.md` 필요 여부가 검토되었다
- [ ] 구조/원칙 변경 시 `docs/status/DECISION-LOG.md` 필요 여부가 검토되었다

## Failure / Fallback

- class가 애매하면 가장 가까운 두 class에 모두 걸친다
- 시간이 없으면 최소 `docs/status/PROJECT-STATUS.md`만 우선 맞춘다
- 문서가 아직 없으면 기존 문서 체계를 먼저 참고한다 (→ `harnesses/change-class-doc-sync.md`)

## References

탁디장의 change class 매트릭스는 `harnesses/change-class-doc-sync.md`를 우선 참고한다.
