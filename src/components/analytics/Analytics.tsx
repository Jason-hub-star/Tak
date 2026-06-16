import Script from "next/script";
import { ANALYTICS } from "@/lib/analytics/config";

/**
 * 측정 스크립트 로더.
 * 각 도구의 ID가 .env 에 설정된 경우에만 해당 스크립트를 주입한다.
 * layout 의 <body> 끝에서 1회 렌더한다.
 */
export function Analytics() {
  const { ga4, googleAds, metaPixel, naver } = ANALYTICS;

  // gtag.js는 한 번만 로드하고, GA4·Google Ads 등 ID마다 config 를 추가한다.
  // (라이브러리를 ID별로 중복 로드하면 안 됨 — 구글 권장 방식)
  const gtagLib = ga4 || googleAds;

  return (
    <>
      {/* ── Google gtag (Analytics 4 + Google Ads) ──────── */}
      {gtagLib && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagLib}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${ga4 ? `gtag('config','${ga4}');` : ""}${googleAds ? `gtag('config','${googleAds}');` : ""}`}
          </Script>
        </>
      )}

      {/* ── Meta(페이스북/인스타) Pixel ─────────────────── */}
      {metaPixel && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel}');fbq('track','PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${metaPixel}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* ── 네이버 애널리틱스 (wcslog) ──────────────────── */}
      {naver && (
        <>
          <Script
            src="//wcs.pstatic.net/wcslog.js"
            strategy="afterInteractive"
          />
          <Script id="naver-wcs" strategy="afterInteractive">
            {`if(!window.wcs_add)window.wcs_add={};window.wcs_add["wa"]="${naver}";if(window.wcs){window.wcs_do();}`}
          </Script>
        </>
      )}
    </>
  );
}
