---
name: evidence-review
description: 작업 완료 선언 직전, 실행한 검증, 바뀐 문서, 남은 리스크와 release verdict를 확인하는 스킬. 트리거 — "이거 완료해도 돼?", "증거 검토", "릴리스 가능한지", "작업 끝났는지 확인", "evidence review".
user_invocable: true
tags: [verification, release, risk, evidence]
trigger: "완료 선언 직전, 리뷰 요청 전"
version: 1
---

# Evidence Review (탁디장)

## Use When

- 완료 선언 직전
- 리뷰 요청 전
- 문서만 바뀌었더라도 verify와 근거를 남겨야 할 때

## Inputs

- executed commands (실제로 돌린 검증)
- changed docs (바뀐 문서 목록)
- assumptions (아직 검증 못 한 가정)
- residual risks (남은 위험)
- current phase (현재 단계)

## Steps

1. 실제로 실행한 verify 명령만 적는다.
   ```
   npm run build
   npm run lint
   visual smoke (경로 로딩, 폼 제출, 반응형)
   ```

2. 바뀐 문서와 왜 바뀌었는지 적는다.
   ```
   docs/status/PROJECT-STATUS.md - route 추가 반영
   ai-context/project-context.md - InquiryPayload 타입 업데이트
   ```

3. 아직 확인 못 한 가정과 남은 리스크를 적는다.
   ```
   - EmailJS 프로덕션 환경 미테스트
   - 모바일 Safari 반응형 확인 필요
   ```

4. `release verdict`를 아래 중 하나로 정한다:
   - `not-ready` (검증 부족, 문서 미동기)
   - `ready-for-review` (구현 완료, 리뷰 대기)
   - `ready-to-share` (리뷰 완료, 배포/공유 가능)

5. 결과를 `docs/status/PROJECT-STATUS.md`의 `## Evidence Status` 또는 `## Recent Changes`에 남긴다.

## Output Format

```markdown
## Evidence Review

### Executed Verify
- [x] npm run build (Success)
- [x] npm run lint (Success)
- [x] visual smoke: form submit on `/contact`
- [ ] EmailJS production env test

### Changed Docs
| 문서 | 이유 | 상태 |
|---|---|---|
| docs/status/PROJECT-STATUS.md | route/schema 추가 | updated |
| ai-context/project-context.md | InquiryPayload 정의 | updated |

### Residual Risks
- EmailJS production template not tested (blocking: ready-for-review)
- Safari mobile viewport on `/portfolio` (non-blocking)

### Release Verdict
- **ready-for-review** (1 blocker: prod EmailJS test needed before deploy)
```

## Verify

- [ ] `executed verify` 명령은 실제로 돌렸거나 기술적 이유로 스킵됐다.
- [ ] changed docs가 실제 변경 축과 맞는다.
- [ ] evidence가 없으면 `release verdict`는 최소 `not-ready`다.
- [ ] residual risks가 verdict와 일치한다 (blocker면 ready-to-share 불가).

## Failure / Fallback

- verify를 안 돌렸으면 완료 선언 대신 `not-ready`로 남긴다.
- docs가 밀렸으면 먼저 `doc-sync`로 닫고 다시 evidence review를 한다.
- 시간이 없으면 최소한 `ready-for-review` 이상은 판정하고, blocker를 명시한다.

## References

탁디장 검증 명령:
- `npm run build` — 빌드 성공 (Next.js, TypeScript)
- `npm run lint` — 코드 포맷/규칙 준수
- Visual smoke — 주요 경로/폼/반응형 확인
- Type check — InquiryPayload, EmailJS 타입 안정성
