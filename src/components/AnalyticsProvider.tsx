import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

interface AnalyticsProviderProps {
  gtmId: string;
  clarityId?: string;
}

export function AnalyticsProvider({ gtmId, clarityId }: AnalyticsProviderProps) {
  return (
    <>
      {/* GTM consent mode initialisation — must run before GTM loads */}
      {gtmId && (
        <>
          <Script
            id="consent-mode-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied'
                });
              `,
            }}
          />
          <GoogleTagManager gtmId={gtmId} />
        </>
      )}

      {/* Microsoft Clarity */}
      {clarityId && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      )}
    </>
  );
}
