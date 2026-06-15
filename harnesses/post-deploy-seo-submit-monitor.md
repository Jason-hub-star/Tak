---
name: post-deploy-seo-submit-monitor
tags: [seo, deployment, google-search-console, naver-indexnow, korea-market]
trigger: "탁디장을 Vercel에 배포한 후 sitemap 제출, URL 색인 모니터, 검색엔진 제출 자동화 검증"
status: proven
source: "Generic post-deploy SEO + Tak 한국 시장 맞춤"
---

# Post Deploy SEO Submit Monitor (탁디장)

## Purpose

배포 후 SEO 제출은 도메인 DNS, Vercel 배포, Search Console 권한, Naver 키, 알림 채널이 한꺼번에 얽혀 있다. 이 하네스는 먼저 서비스 health를 분리 검증하고, 그 다음 제출과 모니터를 live smoke로 좁혀 확인한다.

## Inputs

| Input | Example | Required |
|---|---|---|
| production domain | `https://takdijang.com` 또는 `https://tak.vercel.app` | yes |
| sitemap URL | `https://takdijang.com/sitemap.xml` | yes |
| Google Search Console property | `https://takdijang.com/` 또는 `sc-domain:takdijang.com` | submit/monitor |
| Google credential | service account JSON 또는 OAuth token | submit/monitor |
| Naver IndexNow key | Naver 관리자 도구 key | submit |
| Naver crawl token | Naver 검색 어드바이저 크롤 요청 token | optional |

## Success Pattern

1. **DNS와 배포 분리 검증**
   - DNS resolution: `dig takdijang.com A`
   - Vercel 배포: `curl https://tak.vercel.app/` (preview protection 확인)
   - 프로덕션 도메인: `curl https://takdijang.com/` (정상 응답 200)

2. **SEO 문서 health 확인**
   ```bash
   # robots.txt 확인
   curl -s https://takdijang.com/robots.txt | head -20

   # sitemap.xml 확인
   curl -s https://takdijang.com/sitemap.xml | grep -c '<loc>'
   ```

3. **read-only health 먼저**
   - Google Search Console: 사이트 소유권 확인만
   - Naver Search Advisor: 도메인 등록 상태만 확인
   - sitemap 제출 시뮬레이션 (--dry-run)

4. **live submit은 health 정상 후**
   - Google sitemap 제출
   - Naver IndexNow 제출
   - 각 제공자의 피드백 기록

5. **실패 분류**
   - 도메인 DNS 미등록 → DNS 담당자 연락
   - Vercel 배포 실패 → deployment alias 재확인
   - Search Console 401/403 → 계정/권한 재확인
   - sitemap 형식 오류 → `/sitemap.xml` 경로 재확인

---

## Flow (탁디장)

### 1. DNS & Deployment Smoke

```bash
# 1. DNS 확인
nslookup takdijang.com 8.8.8.8
dig takdijang.com A

# 2. Vercel deployment 확인 (preview protection 없음)
curl -I https://tak.vercel.app/

# 3. 프로덕션 도메인 확인
curl -I https://takdijang.com/
```

### 2. Route Health Check

```bash
# robots.txt
curl -s https://takdijang.com/robots.txt | head

# sitemap.xml
curl -s https://takdijang.com/sitemap.xml | xmllint --format - | head

# 메인 페이지
curl -I https://takdijang.com/

# 포트폴리오 상세 (샘플)
curl -I https://takdijang.com/portfolio/[slug-example]
```

### 3. Google Search Console Dry Run

```bash
# GSC 에서 sitemap 제출 (수동)
# 1. https://search.google.com/search-console
# 2. "takdijang.com" 속성 확인
# 3. "Sitemaps" → "Add sitemap" → https://takdijang.com/sitemap.xml
# 4. 처리 상태 확인 (24h 소요 가능)
```

### 4. Naver Search Advisor

```bash
# Naver 검색 어드바이저
# 1. https://searchadvisor.naver.com/
# 2. "takdijang.com" 소유권 확인
# 3. "웹마스터 도구" → "요청" → "URL 제출" → sitemap 제출
# 또는 "IndexNow" → Naver key 입력
```

### 5. Monitor

```bash
# 일주일 후 확인
# Google: Search Console → Coverage 섹션
# Naver: 검색 어드바이저 → 색인 상태
```

---

## Verification Checklist

- [ ] Production domain DNS resolves publicly
- [ ] Vercel deployment alias reachable (no preview protection)
- [ ] `/robots.txt` returns 200 with sitemap directive
- [ ] `/sitemap.xml` returns 200 valid XML
- [ ] Google Search Console property linked
- [ ] Google credentials loaded (service account or OAuth)
- [ ] Naver Search Advisor linked (도메인 소유권)
- [ ] IndexNow key generated (Naver)
- [ ] First sitemap submitted to Google (wait 24h)
- [ ] First sitemap submitted to Naver (wait 24h)
- [ ] Coverage/색인 상태 확인 가능

---

## 탁디장 체크리스트

- [ ] `takdijang.com` DNS A record 설정됨 (도메인 등록처)
- [ ] Vercel 프로젝트 domain 설정됨 (`vercel.json` 또는 dashboard)
- [ ] `.env.local.example` 에 Google/Naver credential 경로 명시
- [ ] Vercel 환경변수에 Google API key 추가됨
- [ ] Naver IndexNow key 생성됨 (Naver 어드바이저)
- [ ] Slack/이메일 알림 채널 설정 (선택)

---

## Failure Modes

| Signal | Meaning | Action |
|---|---|---|
| `DNS NXDOMAIN` | 도메인 미등록 또는 TTL 미갱신 | 도메인 등록처 확인, TTL 대기 (최대 48h) |
| `Connection refused` from Vercel alias | Vercel preview protection 활성 | dashboard → Settings → Domains 확인 |
| `robots.txt 404` | `/robots.xml` 경로 오류 | `src/app/robots.ts` 파일 확인 |
| `sitemap.xml parsing error` | XML 포맷 오류 | `npm run dev` → `curl localhost:3000/sitemap.xml` 로컬 테스트 |
| `Google SC 401` | API key 만료 또는 권한 부족 | Google Cloud Console → credentials 재생성 |
| `Naver IndexNow 403` | key 미등록 또는 만료 | Naver 어드바이저 → IndexNow key 재생성 |

---

## 참고: 한국 마켓 특성

- **Google vs Naver**: 국내 검색 유입 50:50 분담 권장
- **IndexNow**: Naver 전용 빠른 색인 (Google은 sitemap 제출만)
- **TTL**: DNS 변경 후 24-48h 소요 (네임서버마다 상이)
- **Lighthouse**: 한국 사용자 기준 모바일 성능 최우선
