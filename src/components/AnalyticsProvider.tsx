"use client";
import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { CookiePreferences } from "./CookieConsent";

interface AnalyticsProviderProps {
  gtmId: string;
}

export function AnalyticsProvider({ gtmId }: AnalyticsProviderProps) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check initial state
    const checkConsent = () => {
      const stored = localStorage.getItem('bookmarksoft-cookie-consent');
      if (stored) {
        try {
          const prefs: CookiePreferences = JSON.parse(stored);
          if (prefs.analytics) setHasConsent(true);
        } catch (e) {
          console.error(e);
        }
      }
    };
    
    checkConsent();

    // Listen for custom event when consent changes
    const handleConsentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CookiePreferences>;
      setHasConsent(customEvent.detail.analytics);
    };

    window.addEventListener('cookie-consent-updated', handleConsentUpdate);
    return () => window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
  }, []);

  // Only render GTM if they explicitly consented
  if (!hasConsent || !gtmId) {
    return null;
  }

  return <GoogleTagManager gtmId={gtmId} />;
}
