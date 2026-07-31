"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Settings2, X, ChevronDown, ChevronUp, ShieldCheck, BarChart2, Megaphone, Wrench } from "lucide-react";

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------
interface ConsentState {
  necessary: boolean;   // always true – cannot be toggled
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
};

const STORAGE_KEY = "bms_cookie_consent";

// --------------------------------------------------------------------------
// GTM Consent Mode v2 helper
// --------------------------------------------------------------------------
function pushConsent(consent: ConsentState, type: "default" | "update") {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  function gtag(...args: unknown[]) { w.dataLayer.push(args); }
  gtag("consent", type, {
    ad_storage:           consent.marketing  ? "granted" : "denied",
    ad_user_data:         consent.marketing  ? "granted" : "denied",
    ad_personalization:   consent.marketing  ? "granted" : "denied",
    analytics_storage:    consent.analytics  ? "granted" : "denied",
    functionality_storage:consent.functional ? "granted" : "denied",
    personalization_storage: consent.functional ? "granted" : "denied",
  });
}

// --------------------------------------------------------------------------
// Category row component used inside the preferences modal
// --------------------------------------------------------------------------
interface CategoryRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  locked?: boolean;
  checked: boolean;
  onChange?: (v: boolean) => void;
}

function CategoryRow({ icon, title, description, locked, checked, onChange }: CategoryRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/60">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 flex-1 min-w-0 text-left"
          aria-expanded={open}
        >
          <span className="text-blue-600 dark:text-blue-400 shrink-0">{icon}</span>
          <span className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">{title}</span>
          <span className="ml-auto shrink-0 text-slate-400 dark:text-slate-500">
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {/* Toggle */}
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={`Toggle ${title}`}
          disabled={locked}
          onClick={() => !locked && onChange?.(!checked)}
          className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
            ${locked ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
            ${checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
              ${checked ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
      </div>

      {/* Expandable description */}
      {open && (
        <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          {description}
          {locked && (
            <span className="ml-1 text-xs font-semibold text-slate-400 dark:text-slate-500">(Always active)</span>
          )}
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// Main component
// --------------------------------------------------------------------------
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);

  // On mount – check if consent was already saved
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: ConsentState = JSON.parse(stored);
        pushConsent(parsed, "default");
      } else {
        // First visit: show banner, set GTM defaults to granted (per user request)
        pushConsent(DEFAULT_CONSENT, "default");
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  // Block / restore body scroll while banner or modal is open
  useEffect(() => {
    if (visible || showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [visible, showModal]);

  const saveAndClose = (finalConsent: ConsentState) => {
    pushConsent(finalConsent, "update");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalConsent));
    setShowModal(false);
    setVisible(false);
  };

  const acceptAll = () => saveAndClose(DEFAULT_CONSENT);

  const rejectNonEssential = () =>
    saveAndClose({ necessary: true, functional: false, analytics: false, marketing: false });

  const savePreferences = () => saveAndClose(consent);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (!visible) return null;

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Full-screen scroll-blocking backdrop                                */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="fixed inset-0 z-[9998] bg-slate-900/40 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      {/* ------------------------------------------------------------------ */}
      {/* Bottom banner                                                        */}
      {/* ------------------------------------------------------------------ */}
      {!showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-[9999] animate-slide-up"
        >
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">

              {/* Content row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">
                    We value your privacy
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    We use cookies to keep BookmarkSoft secure, remember your preferences, and improve the site
                    with analytics and support tools. Non-essential cookies are on by default — you can reject
                    them or manage categories anytime.{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Privacy &amp; Cookie Statement
                    </Link>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    id="cookie-reject-btn"
                    onClick={rejectNonEssential}
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Reject non-essential
                  </button>
                  <button
                    id="cookie-manage-btn"
                    onClick={openModal}
                    className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-1.5"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    Manage preferences
                  </button>
                  <button
                    id="cookie-accept-btn"
                    onClick={acceptAll}
                    className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-sm shadow-blue-600/20"
                  >
                    Accept all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Preferences modal                                                    */}
      {/* ------------------------------------------------------------------ */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div className="w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-slate-900/30 border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90dvh] sm:max-h-[85vh]">

            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Cookie preferences</h2>
              <button
                onClick={closeModal}
                aria-label="Close preferences"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-3 custom-scrollbar">
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Cookie usage</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  We use cookies to provide core site features and to improve your experience.
                  Non-essential categories start enabled; turn off any you prefer. Read more in our{" "}
                  <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline font-medium" onClick={closeModal}>
                    Privacy &amp; Cookie Statement
                  </Link>.
                </p>
              </div>

              <CategoryRow
                icon={<ShieldCheck className="w-4 h-4" />}
                title="Strictly necessary cookies"
                description="These cookies are essential for the website to function and cannot be switched off. They are usually set in response to actions you take such as setting your privacy preferences, logging in, or filling in forms."
                locked
                checked={true}
              />
              <CategoryRow
                icon={<Wrench className="w-4 h-4" />}
                title="Functional cookies"
                description="These cookies allow the website to remember choices you make (such as your dark mode preference or favourited tools) and provide enhanced, more personal features."
                checked={consent.functional}
                onChange={(v) => setConsent((c) => ({ ...c, functional: v }))}
              />
              <CategoryRow
                icon={<BarChart2 className="w-4 h-4" />}
                title="Analytics cookies"
                description="These cookies help us understand how visitors interact with BookmarkSoft by collecting and reporting information anonymously. This helps us improve the site and our tools."
                checked={consent.analytics}
                onChange={(v) => setConsent((c) => ({ ...c, analytics: v }))}
              />
              <CategoryRow
                icon={<Megaphone className="w-4 h-4" />}
                title="Marketing cookies"
                description="These cookies may be set through our site by advertising partners to build a profile of your interests and show you relevant advertisements on other sites."
                checked={consent.marketing}
                onChange={(v) => setConsent((c) => ({ ...c, marketing: v }))}
              />
            </div>

            {/* Modal footer */}
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-2 shrink-0">
              <button
                id="cookie-modal-reject-btn"
                onClick={rejectNonEssential}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Reject all
              </button>
              <button
                id="cookie-modal-accept-btn"
                onClick={acceptAll}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Accept all
              </button>
              <button
                id="cookie-modal-save-btn"
                onClick={savePreferences}
                className="ml-auto px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
