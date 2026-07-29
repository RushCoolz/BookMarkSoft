import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

interface AnalyticsProviderProps {
  gtmId: string;
}

export function AnalyticsProvider({ gtmId }: AnalyticsProviderProps) {
  if (!gtmId) return null;

  return (
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
  );
}
