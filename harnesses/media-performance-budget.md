---
name: media-performance-budget
tags: [frontend, performance, images, video, lcp, nextjs, portfolio]
trigger: "탁디장 포트폴리오 이미지(긴 JPG, 썸네일) 배포 전 최적화할 때"
status: candidate
source: "WEFLOW hero media audit + Tak 포트폴리오 맞춤"
---

# Media Performance Budget Harness (탁디장)

## When

- 포트폴리오 MDX에 새 프로젝트 이미지(긴 JPG, 썸네일)를 추가할 때
- `/portfolio/[slug]` 상세 페이지 hero 이미지 성능 점검 필요
- 배포 전 Lighthouse LCP 최적화 확인
- 디자이너 콘텐츠가 교체되어 파일 크기/포맷이 달라졌을 때

## Budgets (탁디장 맞춤)

| Asset | Location | Target |
|---|---|---:|
| Hero poster (상세페이지) | `public/portfolio/[project]/hero.jpg` | AVIF/WebP, 150-300KB |
| Thumbnail (랜딩 카드) | `public/portfolio/[project]/thumb.jpg` | WebP/optimized PNG, <150KB |
| 긴 JPG (상세페이지 메인) | `public/portfolio/[project]/detail.jpg` | 원본 ≤4MB (WebP 버전 1-2MB) |
| Backup/source 파일 | `archive/` or `.gitignored` | 배포 public에 미포함 |

## Rules

1. **LCP 우선**: Hero 이미지는 `next/image`의 `priority` + `fetchPriority="high"` 사용
2. **responsive sizes**: 모바일(375px) ~ 데스크톱(1440px) 커버
3. **긴 JPG 렌더링**: `<img src="/portfolio/[project]/detail.jpg" />` 또는 `<Image>` (frame 설정 필수)
4. **Backup 파일 분리**: PSD, raw, source는 `public/` 밖 (또는 `.gitignore`)
5. **포맷 우선순위**: AVIF > WebP > 최적 PNG > JPG (레거시)

## Flow (탁디장)

### 1. Inventory

```bash
# 포트폴리오 이미지 파일 크기 조사
find public/portfolio -type f \( -iname '*.jpg' -o -iname '*.png' -o -iname '*.webp' \) -exec ls -lh {} \;

# 크기가 500KB 이상인 파일 찾기
find public/portfolio -type f -size +500k -print -exec ls -lh {} \;

# 이미지 사용처 확인
rg -n '<Image|<img|src=' src/components src/app --glob '*.{tsx,jsx}'
```

### 2. Classification

- **LCP hero**: `/portfolio/[slug]` 페이지 최상단 이미지
- **Above-the-fold**: 랜딩 포트폴리오 섹션 썸네일
- **Below-the-fold**: 상세 페이지 스크롤 이미지
- **Backup/source**: PSD, raw 원본 (배포 제외)

### 3. Optimization

#### Hero Image

```tsx
// src/components/portfolio/DetailHero.tsx
import Image from 'next/image'

export function DetailHero({ project }) {
  return (
    <Image
      src={`/portfolio/${project.slug}/hero.webp`}
      alt={project.title}
      width={1440}
      height={810}
      priority              // LCP
      fetchPriority="high"
      sizes="100vw"
      className="w-full h-auto"
    />
  )
}
```

#### Detail Long JPG

```tsx
// 반응형 이미지 크기
<img
  src={`/public/portfolio/${project.slug}/detail.webp`}
  alt={project.title}
  className="w-full h-auto"
  loading="lazy"  // 아래로 스크롤할 때 로드
/>
```

#### Thumbnail (카드)

```tsx
// sizes는 그리드 너비에 맞춤
<Image
  src={`/portfolio/${project.slug}/thumb.webp`}
  alt={project.title}
  width={400}
  height={500}
  sizes="(max-width: 768px) 100vw, 33vw"  // 3 column grid
  className="w-full h-auto"
/>
```

### 4. Verify

```bash
# 빌드 및 lighthouse smoke
npm run build
npm run dev  # 로컬에서 한 번 확인

# Lighthouse 점검 (Chrome DevTools)
# 목표: LCP < 2.5s (모바일)
# 이미지 최적화 점수 확인
```

**체크리스트**:
- [ ] 배포 public 폴더 파일 0개 > 500KB
- [ ] Hero 이미지 `priority` + `fetchPriority="high"` 설정
- [ ] 썸네일 `sizes` 속성 설정
- [ ] WebP/AVIF 버전 존재 (또는 sharp 스크립트로 자동 생성)
- [ ] 375/768/1440 viewport에서 이미지 비율 정상
- [ ] 콘솔 에러 0건

---

## 스크립트: 이미지 자동 최적화

탁디장 `scripts/optimize-portfolio-images.mjs` (기존) 활용:

```bash
node scripts/optimize-portfolio-images.mjs
```

- JPG → WebP + AVIF 변환
- 파일 크기 로깅
- 예산 초과 경고

---

## Failure Modes

- 배포된 이미지가 여전히 무거움 → `scripts/optimize-portfolio-images.mjs` 재실행
- 모바일에서 이미지가 깨짐 → `sizes` 속성 재확인 또는 더 작은 breakpoint 추가
- 이미지가 아예 안 보임 → `public/portfolio/[slug]/` 경로 확인
