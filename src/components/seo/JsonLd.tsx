/**
 * JSON-LD 구조화 데이터를 <script type="application/ld+json"> 로 주입하는 서버 컴포넌트.
 * Next.js App Router 권장 방식 — 메타데이터 API가 다루지 않는 스키마를 페이지 본문에 렌더한다.
 *
 * 사용: <JsonLd data={organizationSchema()} />  (data는 하나 또는 배열)
 */

type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // XSS 방지: '<' 를 이스케이프해 스크립트 조기 종료를 막는다.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
