---
name: conversion-service-site-spec
trigger: "탁디장 post-MVP 서비스 페이지(/services), 가격표(/pricing) 콘텐츠 명세를 코딩 전에 고정할 때"
status: starter
---

# Conversion Service Site Spec (탁디장)

## Core Rule

```
콘텐츠와 기능은 고정한다.
구체적인 시각 스타일은 고정하지 않는다.
```

## Inputs (탁디장)

필수:
- 서비스 이름 (예: "상세페이지 제작", "웹사이트 제작·홍보 연계")
- 각 서비스별 설명/장점/포함사항
- 가격 정보 (또는 "상담문의 필요")
- 폼 필드 (서비스 선택, 예산대, 기간)
- 금지/제약사항

선택:
- 패키지 등급 (초급/중급/고급)
- 사례 또는 FAQ

## Output

1. `docs/ref/SERVICE_SPEC.md` — 콘텐츠 명세
2. 라우팅: `/services`, `/pricing` (구현 스켈레톤만)
3. 폼 필드 추가 (기존 InquiryPayload 확장)

## Structure (예: `/services`)

```
헤더: 서비스 한 문장 메시지
섹션 1: 상세페이지 제작 (설명 + 포함사항)
섹션 2: 웹사이트 제작 (설명 + 포함사항)
섹션 3: 가격 비교표 (또는 "상담 필요" CTA)
섹션 4: 프로세스 (기존 Process 섹션 재사용)
섹션 5: FAQ (기존 FAQ 섹션 또는 서비스별 FAQ)
CTA: 문의 폼 (서비스 선택 dropdown 추가)
```

## Verify

- [ ] 각 서비스 설명이 3문장 이상
- [ ] 포함사항이 bullet point로 명시
- [ ] 가격 또는 문의 경로 명확
- [ ] 폼 필드 변경이 기존 문의 로직과 호환
- [ ] 콘텐츠가 PRD의 "매출·설득·전략" 톤 유지
