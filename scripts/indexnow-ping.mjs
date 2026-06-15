#!/usr/bin/env node
/**
 * IndexNow 핑 — 변경된 URL을 IndexNow 엔드포인트(네이버/Bing 공유)에 일괄 통보한다.
 * 네이버 서치어드바이저는 2023.7부터 IndexNow 프로토콜을 지원한다.
 *
 * 사전 준비:
 *   1) .env.local 에 INDEXNOW_KEY=<32자 이상 임의 키>
 *   2) public/<INDEXNOW_KEY>.txt 파일에 같은 키 한 줄을 넣어 배포(소유 증명)
 * 실행: node scripts/indexnow-ping.mjs
 *
 * 키가 없으면 아무 것도 하지 않고 안내만 출력한다(스캐폴딩).
 */

const HOST = "takdijang.com";
const KEY = process.env.INDEXNOW_KEY;

// 통보할 URL 목록 — 필요에 따라 갱신/확장
const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/services`,
  `https://${HOST}/takmong`,
  `https://${HOST}/pricing`,
  `https://${HOST}/portfolio`,
  `https://${HOST}/contact`,
];

if (!KEY) {
  console.log(
    "[indexnow] INDEXNOW_KEY 미설정 — 건너뜀.\n" +
      "  .env.local 에 키를 넣고 public/<KEY>.txt 를 배포한 뒤 다시 실행하세요."
  );
  process.exit(0);
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: URLS,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(`[indexnow] ${res.status} ${res.statusText} — ${URLS.length}개 URL 통보`);
if (!res.ok) process.exit(1);
