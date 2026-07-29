"use client";
import React, { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Fingerprint, Monitor, Globe, ShieldAlert } from "lucide-react";

export function BrowserFingerprintBody() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Collect fingerprint data on mount
    const collectData = () => {
      const nav = window.navigator as any;
      const screen = window.screen;
      
      const details = {
        userAgent: nav.userAgent,
        platform: nav.platform,
        language: nav.language,
        languages: nav.languages?.join(", "),
        cookiesEnabled: nav.cookieEnabled,
        doNotTrack: nav.doNotTrack === "1" ? "Enabled" : "Disabled/Not Set",
        hardwareConcurrency: nav.hardwareConcurrency || "Unknown",
        deviceMemory: nav.deviceMemory ? `${nav.deviceMemory} GB` : "Unknown",
        maxTouchPoints: nav.maxTouchPoints || 0,
        connectionType: nav.connection ? nav.connection.effectiveType : "Unknown",
        screenWidth: screen.width,
        screenHeight: screen.height,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio || 1,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      
      setData(details);
    };
    
    collectData();
  }, []);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <Fingerprint className="w-6 h-6 text-purple-500" />
              Browser Fingerprint Checker
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              See what data your browser is leaking to websites you visit.
            </p>
          </div>

          {!data ? (
            <div className="text-center py-12">Analyzing browser...</div>
          ) : (
            <div className="space-y-6">
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 rounded-lg border border-yellow-200 dark:border-yellow-800/50 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm">
                  <strong>Did you know?</strong> Websites can use the exact combination of your screen size, CPU cores, timezone, and fonts to track you across the web without using cookies! This is called "Browser Fingerprinting".
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* System & Hardware */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 font-bold flex items-center gap-2">
                    <Monitor className="w-4 h-4" /> System & Hardware
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-700/50 pb-2">
                      <span className="text-slate-500 text-sm">Platform</span>
                      <span className="font-medium text-sm">{data.platform}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-700/50 pb-2">
                      <span className="text-slate-500 text-sm">CPU Cores</span>
                      <span className="font-medium text-sm">{data.hardwareConcurrency}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-700/50 pb-2">
                      <span className="text-slate-500 text-sm">Device Memory</span>
                      <span className="font-medium text-sm">{data.deviceMemory}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-slate-500 text-sm">Touch Points</span>
                      <span className="font-medium text-sm">{data.maxTouchPoints > 0 ? `${data.maxTouchPoints} (Touchscreen)` : "None"}</span>
                    </div>
                  </div>
                </div>

                {/* Display & Screen */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 font-bold flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Display & Localization
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-700/50 pb-2">
                      <span className="text-slate-500 text-sm">Resolution</span>
                      <span className="font-medium text-sm">{data.screenWidth} x {data.screenHeight}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-700/50 pb-2">
                      <span className="text-slate-500 text-sm">Color Depth</span>
                      <span className="font-medium text-sm">{data.colorDepth}-bit</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-700/50 pb-2">
                      <span className="text-slate-500 text-sm">Timezone</span>
                      <span className="font-medium text-sm">{data.timezone}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-slate-500 text-sm">Language</span>
                      <span className="font-medium text-sm">{data.language}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Raw User Agent */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold mb-2">Raw User Agent String</h3>
                <code className="block p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm text-slate-600 dark:text-slate-400 break-words font-mono">
                  {data.userAgent}
                </code>
              </div>

            </div>
          )}
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
