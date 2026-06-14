---
name: change-class-doc-sync
trigger: "탁디장 코드 변경 후 어떤 문서를 함께 갱신할지 헷갈릴 때"
status: starter
---

# Change Class Doc Sync (탁디장)

## Change Classes → Must Update

| Class | Example | Must Update |
|---|---|---|
| **route/surface** | `/services`, `/pricing` 추가 | `PROJECT-STATUS`, `DECISION-LOG` |
| **schema/model** | 폼 필드 (서비스 선택 추가) | `project-context.md` (InquiryPayload) |
| **feature/flow** | EmailJS 커스텀 템플릿 | `project-context.md` (연동 상태) |
| **config/env** | EmailJS 키, Vercel 변수 | `ai-context/project-context.md` (형식), `.env.local.example` |
| **design/token** | 색상, 타이포 변경 | 구현 코드 레벨 (전용 doc 추가 시에만) |
| **infra** | 빌드, 배포 설정 | `DECISION-LOG` |

## Verify

- [ ] 코드 diff가 최소 1개 클래스에 분류됨
- [ ] 필수 문서가 실제로 갱신됨 (또는 "갱신 필요 없음" 판단)
- [ ] 구조 결정이 바뀌면 `DECISION-LOG` 기록
- [ ] 외부 서비스 변경 시 `.env.local.example` 동기화
