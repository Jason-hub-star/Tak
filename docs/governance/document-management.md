# 탁디장 문서 관리 체계

## Tier 모델 (우선순위)

### Tier 0: 실제 코드와 런타임
- 실제 구현 파일 (`src/`, `public/`)
- 실행 검증 (`npm run build`, `npm run dev`)

### Tier 1: 에이전트 진입 문서
- `AGENTS.md` — 로딩 순서, 하네스 사용 시점
- `.claude/claude.md` — 프로젝트 고유 규칙

### Tier 2: 구조 및 현황
- `docs/prd.md` — 제품 기준 문서 **(최우선)**
- `ai-context/master-plan.md` — 협업 기준 (우선순위, 단계, 검증)
- `ai-context/project-context.md` — 도메인 모델, 외부 서비스
- `docs/status/PROJECT-STATUS.md` — 현재 대시보드 (60~110줄)
- `docs/status/DECISION-LOG.md` — 구조적 결정 기록

### Tier 3: 상세, 템플릿, 하네스
- `harnesses/` — 패턴과 체크리스트
- `ai-context/worklog.md` — 일일 작업 로그
- `ai-context/handover.md` — 이전/블로커 캡슐

---

## 변경 클래스 → 필수 갱신 문서

| 변경 클래스 | 예시 | Tier 2 갱신 대상 | 비고 |
|---|---|---|---|
| **route/surface** | 페이지, endpoint, 화면 추가 | `PROJECT-STATUS` + `DECISION-LOG` | design-to-code harness |
| **schema/model** | 콘텐츠 타입, 폼 필드, API 응답 | `DECISION-LOG` | prd와 차이 있으면 협의 |
| **기능/flow** | 문의 폼, 이메일, 스팸 가드 | `PROJECT-STATUS` + `DECISION-LOG` | 사용자 경로 변화 기록 |
| **design/token** | 색상, 타이포, 간격, 애니메이션 | 해당 없음 (design token doc 추가 시) | 코드 레벨에서만 추적 |
| **config/infra** | env 변수, 빌드 설정, Vercel | `DECISION-LOG` | 배포 관련 결정 필수 기록 |
| **외부 서비스** | EmailJS 키, 카카오톡 URL | `ai-context/project-context.md` | 보안(key는 .env.local) |

---

## 문서 동기화 프로토콜

1. **사실 확인**: Tier 0 (코드/런타임) 먼저 검증
2. **가장 가까운 정본 수정**: Tier 2 중 해당 문서 먼저 갱신
3. **파생 문서 동기화**:
   - `PROJECT-STATUS.md`: 주요 변경만 1~2줄 반영
   - `DECISION-LOG.md`: 구조적 결정은 날짜 + 배경 + 영향 포맷
4. **검증**: 변경 후 `npm run build` 또는 영향 범위 재확인
5. **로그**: `ai-context/worklog.md`에 상세 내용 남김 (후속 회고용)

---

## 충돌 해결

| 상황 | 우선 순위 | 액션 |
|---|---|---|
| `docs/prd.md` vs `ai-context/*` | prd.md | prd 기준으로 맞춤 |
| `PROJECT-STATUS` vs `worklog` | worklog (증거) | status는 요약만 유지 |
| 결정 vs 결정 | `DECISION-LOG` | 새 결정 기록으로 override |
| 코드 vs 문서 | 코드 (Tier 0) | 문서 즉시 갱신 |

---

## Anti-Patterns (금지)

- 템플릿을 정본처럼 사용 (harnesses 그대로 복사)
- 같은 사실을 여러 곳에 중복 기록 (각 Tier에 역할 분담)
- 검증 없이 문서만 수정
- 진행 중 (pending) 결정을 status 문서에 섞기

---

## 운영 주기

- **프로젝트 리셋 시**: AGENTS.md, CLAUDE.md, PROJECT-STATUS.md 재작성
- **주요 배포 전**: DECISION-LOG에 결정 기록 + PROJECT-STATUS 갱신
- **세션 종료 시**: worklog + review-log 업데이트 (session-retro harness)
- **월별**: handover.md 갱신 (진입점, 블로커, 다음 액션)

