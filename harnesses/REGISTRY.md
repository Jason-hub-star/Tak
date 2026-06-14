# 탁디장 하네스 레지스트리

## Philosophy

범용 하네스는 현재 프로젝트 활용도에 따라 "keep" 또는 "candidate"로 분류한다. **증거 기반 판단**: 실제로 사용된 하네스만 체크, 아직 시작하지 않은 작업 하네스는 예비군으로 분류. 3개 이상 프로젝트에서 검증되면 범용으로 승격.

---

## 활성 하네스 (Tak 프로젝트)

| Harness | Trigger | Status | Fit for Tak |
|---|---|---|---|
| `post-deploy-seo-submit-monitor` | 배포 후 sitemap 제출, URL 색인 모니터, 검색엔진 제출 자동화 검증 | proven | ✓ 필수. Google Search Console + Naver IndexNow (한국 마켓) |
| `next-vercel-release-guard` | Next.js App Router/Vercel 배포 전 또는 RSC 경계/env 누수/폼 보안 변경 시 | candidate | ✓ 필수. EmailJS 키(NEXT_PUBLIC_*) 노출, 문의 폼 rate limit, 스팸 가드 |
| `media-performance-budget` | 이미지/영상이 있는 포트폴리오 페이지 배포 전 최적화 시 | candidate | ✓ 필수. `/public/portfolio/` 긴 JPG 최적화, 썸네일, hero LCP 예산 |
| `conversion-service-site-spec` | 서비스 페이지/가격표/문의폼/예약 콘텐츠 명세를 코딩 전에 고정 | starter | ✓ 계획 중. post-MVP `/services`, `/pricing` 신설 시 |
| `reference-site-style-extraction` | 레퍼런스 사이트(devfive 같은) 구조/인터랙션을 원본 복제 없이 명세로 변환 | starter | ✓ 유용. devfive 벤치마킹 → 새 IA 설계 (제작+홍보 연계) |
| `design-to-code` | 새 화면/리디자인 시작 시 | starter | ✓ 필요. 새 라우트(`/services`, `/pricing`) 추가 시 |
| `change-class-doc-sync` | 코드 변경 후 어떤 문서를 함께 고쳐야 할지 헷갈릴 때 | starter | ✓ 항상. route/feature 변경 후 `PROJECT-STATUS` + `DECISION-LOG` 동기화 |
| `claude-code-health` | 에이전트 컨텍스트/토큰/MCP/보안 건강 점검 | proven | ✓ 필요. 본격 배포 전에 한 번 |
| `session-retro` | 세션 종료, 삽질 교훈 남기기 | starter | ✓ 매 세션 종료 시. PROJECT-STATUS 1줄 + 자동화 기회 기록 |
| `socratic-review` | 큰 설계 결정 전 | starter | ✓ 추천. `/services` IA 설계 같은 주요 결정 시 |

---

## 예비군 하네스 (Tak에서 나중에 필요할 수 있음)

| Harness | Trigger | Tak 관련성 | Notes |
|---|---|---|---|
| `failure-mode-playbooks` | 문서 싱크 lag, verify 누락, oversized phase 후 복구 | 낮음 | 구현 규모가 커지면 활용 가능 |
| `parallel-qa` | 데모/릴리즈 전 넓은 회귀 검증 | 낮음 | MVP 이후 QA 자동화 고려 |
| `api-contract-guard` | 외부 API/스키마 박기 전 | 낮음 | EmailJS가 현재 유일한 외부 서비스 |

---

## Tak 프로젝트 전용 하네스 (추가 필요 시)

아직 없음. (향후 `harnesses/archive/` 에 보존)

---

## 사용 맨드리스트

배포 전 체크:
1. [ ] `design-to-code` — 새 라우트 있으면 화면/컴포넌트 확정
2. [ ] `next-vercel-release-guard` — RSC, env, 폼 보안
3. [ ] `media-performance-budget` — 이미지 파일 크기, LCP
4. [ ] `npm run build` — 최종 검증
5. [ ] `post-deploy-seo-submit-monitor` — 배포 후 즉시

세션별:
- 시작: `AGENTS.md` + `PROJECT-STATUS.md` + 필요한 harness
- 종료: `session-retro` 하네스로 기록

큰 결정 전:
- `socratic-review` (5개 질문, DECISION-LOG 갱신)

코드 변경 후 매번:
- `change-class-doc-sync` (문서 동기화)

