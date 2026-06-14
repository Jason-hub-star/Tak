# Tak Djang Design Studio — Project Status

기준일: 2026-06-15  
정본: `docs/prd.md` + `ai-context/master-plan.md`  
검증: `npm run build`

## 현재 단계

**구현 완료 → 배포 준비 (점증적 개선 모드)**

- [x] Next.js 14 App Router + TypeScript + Tailwind + Framer Motion 세팅 완료
- [x] 핵심 라우팅 (/, /portfolio/[slug], /privacy) + sitemap.xml, robots.txt
- [x] 랜딩 7섹션 (Hero/Portfolio/Process/About/FAQ/Contact/FinalCTA)
- [x] 포트폴리오 SSG (MDX frontmatter, 샘플 3개)
- [x] 문의 폼 (React Hook Form + Zod + EmailJS + honeypot)
- [x] SEO 기본 (메타/OG/구조화 데이터)
- [x] 모바일/데스크톱 레이아웃 + 접근성 개선
- [x] **제작+홍보 연계 포지셔닝** (devfive 벤치마킹): `/services` `/pricing` `/portfolio` + 홈 신규 3섹션

## 활성 트랙

1. **배포 전 게이트**: RSC 경계, env 누수, 폼 보안, 이미지 최적화 (harness: `next-vercel-release-guard`)
2. **포트폴리오 실데이터**: MDX 9개 확장 (현재 3개 반복 노출 → 실제 포토셋)
3. **EmailJS 커스텀 템플릿**: 테스트 템플릿 → 운영 형식으로 교체
4. **카카오톡 채널**: URL 확정 후 전체 CTA 연결

## 라우팅 현황

| Route | Status | Notes |
|---|---|---|
| `/` | ✓ 완료 | 원페이지 랜딩 |
| `/portfolio/[slug]` | ✓ 완료 | SSG, MDX 파싱 |
| `/privacy` | ✓ 완료 | 법률 텍스트 |
| `/sitemap.xml` | ✓ 완료 | SEO |
| `/robots.txt` | ✓ 완료 | SEO |
| `/services` | ✓ 완료 | 제작+홍보 연계 4-서비스 모델 (devfive 벤치마킹) |
| `/pricing` | ✓ 완료 | build/care/ads 가격 + 비교표 + FAQ |
| `/portfolio` (index) | ✓ 완료 | 포트폴리오 목록 (홈에서 "전체 보기" 링크 복원) |

## 검증 상태

- `npm run build`: **성공** (타입체크, 린트 포함)
- 모바일 (375px) smoke: **양호**
- 데스크톱 (1440px) smoke: **양호**
- Lighthouse LCP: 대상 2.5s (이미지 최적화 예정)
- 문의 폼: EmailJS 테스트 템플릿 중, 운영 템플릿 대기

## 다음 액션 (우선순위 순)

1. **배포 전 보안 점검** (harness: `next-vercel-release-guard`)
   - [ ] `"use client"` 경계 확인
   - [ ] EmailJS 환경변수 (client-safe `NEXT_PUBLIC_*` 확인)
   - [ ] 문의 폼 rate limit / 스팸 가드
   - [ ] 빌드 확인

2. **포트폴리오 실데이터 9개** (MDX 콘텐츠 확장)
   - [ ] 기존 3개 샘플 유지
   - [ ] 새 6개 포토셋 추가
   - [ ] 썸네일 + 긴 JPG 경로 매핑

3. **EmailJS 커스텀 템플릿** (Vercel 환경변수 업데이트)
   - [ ] 운영 템플릿 생성 (홍보 컨셉 적용)
   - [ ] `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` 변경
   - [ ] 테스트 폼 제출 검증

4. **Vercel 배포** (카카오톡 채널 URL 확정 후)
   - [ ] 프로덕션 도메인 연결
   - [ ] 환경변수 설정
   - [ ] `npm run build` 최종 검증

## Handoff Capsule

**들어올 때 확인**: 
- `ai-context/master-plan.md` (우선순위 백로그 #4~10)
- `ai-context/handover.md` (마지막 블로커/남은 이슈)

**첫 검증**:
- `npm run build` 성공
- `.env.local.example` 로드 (EmailJS 키 확인)
- 문의 폼 제출 테스트

**공유된 컨텍스트**:
- ai-context가 협업 정본
- docs/prd.md가 제품 정본
- docs/status/ 는 얇은 현황 유지

---

*이 문서는 `ai-context/master-plan.md`의 파생 대시보드입니다. 상세 내용과 결정 로그는 다른 문서를 참고하세요.*
