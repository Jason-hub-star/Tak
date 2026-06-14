---
name: design-to-code
trigger: "탁디장 새 라우트(/services, /pricing) 추가 또는 화면 리디자인할 때"
status: starter
---

# Design To Code (탁디장)

## Flow

1. **화면 목록**
   - `/services` (서비스 상세)
   - `/pricing` (가격표)
   - 또는 기타 새 라우트

2. **시안/wireframe**
   - devfive 참고 (reference-site-style-extraction)
   - figma 스켓치 또는 텍스트 명세

3. **설계 결정 기록**
   - 섹션 순서
   - CTA 위치
   - 컴포넌트 재사용 여부 (기존 Hero, Process, Contact 등)

4. **라우트 + 콘텐츠 매핑**
   - `/services` → (섹션 1: 상세페이지 + 섹션 2: 웹사이트)
   - `/pricing` → (테이블 또는 카드 기반 가격표)

5. **코드 스켈레톤**
   - `src/app/services/page.tsx`
   - `src/app/pricing/page.tsx`
   - 재사용 컴포넌트 확인

## Verify

- [ ] 화면 목록 문서 존재
- [ ] 라우트 확정 (`AGENTS.md` / `PROJECT-STATUS.md` 갱신)
- [ ] 디자인 토큰 (기존 Tailwind 재사용 확인)
- [ ] 콘텐츠 명세 존재 (conversion-service-site-spec 하네스)
