"use client";
import { useState, useEffect } from 'react';
import { Cookie, X, Check, Settings2, ChevronDown, ChevronUp } from 'lucide-react';

export type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_PREFS: CookiePreferences = {
  essential: true, // Always true
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFS);

  useEffect(() => {
    // Check if user has already consented
    const storedConsent = localStorage.getItem('bookmarksoft-cookie-consent');
    if (!storedConsent) {
      // Show banner after a slight delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences into state (useful for other components listening)
      try {
        setPreferences(JSON.parse(storedConsent));
      } catch (e) {
        console.error("Could not parse cookie preferences", e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsented = { essential: true, analytics: true, marketing: true };
    saveConsent(allConsented);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const handleDeclineAll = () => {
    saveConsent(DEFAULT_PREFS);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('bookmarksoft-cookie-consent', JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    
    // Dispatch a custom event so AnalyticsProvider can catch it immediately
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: prefs }));
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Cannot toggle essential
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none flex justify-center">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-full max-w-4xl overflow-hidden pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-500">
        
        {/* Main Banner */}
        {!showPreferences ? (
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">We respect your privacy</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  We use cookies to improve your experience and analyze site traffic. Because our tools run entirely in your browser, we do not store your personal data. Read our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> to learn more.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={() => setShowPreferences(true)}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Settings2 className="w-4 h-4" />
                Customize
              </button>
              <button 
                onClick={handleDeclineAll}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Decline All
              </button>
              <button 
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg shadow-blue-500/25"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          
          /* Preferences Modal */
          <div className="flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Settings2 className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Cookie Preferences</h3>
              </div>
              <button onClick={() => setShowPreferences(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Essential */}
              <div className="flex items-start gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Essential Cookies</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Required for the website to function properly (e.g. saving your dark mode preference). Cannot be disabled.</p>
                </div>
                <div className="shrink-0 flex items-center justify-center w-12 h-6 bg-blue-600 rounded-full relative opacity-50 cursor-not-allowed">
                  <div className="absolute right-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Analytics */}
              <div 
                className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                onClick={() => togglePreference('analytics')}
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Analytics Cookies</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Help us understand how visitors interact with our tools so we can improve the platform. (Google Analytics via Tag Manager).</p>
                </div>
                <div className={`shrink-0 flex items-center w-12 h-6 rounded-full relative transition-colors duration-200 ${preferences.analytics ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  <div className={`absolute w-4 h-4 bg-white rounded-full transition-all duration-200 ${preferences.analytics ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>

              {/* Marketing */}
              <div 
                className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                onClick={() => togglePreference('marketing')}
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Marketing Cookies</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Used to deliver advertisements more relevant to you and your interests.</p>
                </div>
                <div className={`shrink-0 flex items-center w-12 h-6 rounded-full relative transition-colors duration-200 ${preferences.marketing ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  <div className={`absolute w-4 h-4 bg-white rounded-full transition-all duration-200 ${preferences.marketing ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3">
              <button 
                onClick={handleSavePreferences}
                className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg shadow-blue-500/25"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
