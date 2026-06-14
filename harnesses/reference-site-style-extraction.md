---
name: reference-site-style-extraction
trigger: "devfive 같은 레퍼런스 사이트를 분석해 탁디장의 새 IA (제작+홍보 연계) 설계로 변환할 때"
status: starter
---

# Reference Site Style Extraction (탁디장)

## Purpose

devfive나 유사 디자인 에이전시 사이트의 UI/UX 패턴을 분석하되, **원본 복제는 금지**. 화면 구조, 인터랙션, 신뢰도구를 새 프로젝트 명세로 변환.

## Flow

1. **접근성 확인**
   - URL 공개 여부 확인
   - SPA/정적 HTML 판단
   - 로그인 필요 여부

2. **패턴 추출**
   - IA: 헤더, CTA, 섹션 순서, footer
   - Visual: hero 규모, 여백, 카드 밀도, 배경 느낌
   - 인터랙션: sticky header, reveal animation, filter, accordion
   - 신뢰도구: 사례, 프로세스, 체크리스트, 문의폼

3. **탁디장에 매핑**
   - 탁디장 고유: "매출·설득·전략" 톤, 포트폴리오 중심, 상세페이지+홍보 연계
   - devfive 참고: 서비스 구분, 가격표 구조, 프로세스 설명
   - 새 IA: `/services`, `/pricing` 신설, 기존 `/` 강화

4. **가드레일**
   - ❌ CSS class, JS bundle, 이미지, 고유 문구 복제 금지
   - ✓ 구조, 섹션 순서, 인터랙션 패턴 참고
   - ✓ 컴포넌트 명세 재작성 (새로운 Tailwind/Framer Motion)

## Output

- `docs/ref/REFERENCE_ANALYSIS.md` — devfive 분석 요약
- `docs/ref/SERVICE_IA_DESIGN.md` — 탁디장 새 IA (라우팅, 섹션, 폼)
- `DECISION-LOG.md` 갱신 — "제작+홍보 연계 IA 확장" 결정 기록

## Verify

- [ ] 원본 코드/이미지 직접 복제 없음
- [ ] 탁디장 핵심 가치(기획·효율·올인원·정가) 유지
- [ ] 새 라우팅 (`/services`, `/pricing`) 명확
- [ ] 폼 필드 변경 설명
- [ ] 기존 랜딩 강점(포트폴리오 9슬롯, 문의폼) 손실 없음
