"use client";
import { useState, useEffect } from "react";
import { Info, Laptop, Smartphone, Globe, Monitor, Cpu } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function DeviceInfoBody() {
  const [userAgent, setUserAgent] = useState("");
  const [platform, setPlatform] = useState("");
  const [language, setLanguage] = useState("");
  const [cores, setCores] = useState<number | string>("Unknown");
  const [memory, setMemory] = useState<number | string>("Unknown");
  const [cookiesEnabled, setCookiesEnabled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [browser, setBrowser] = useState("Unknown");
  const [os, setOs] = useState("Unknown");

  useEffect(() => {
    // Collect Data
    const ua = navigator.userAgent;
    setUserAgent(ua);
    setPlatform((navigator as any).userAgentData?.platform || navigator.platform);
    setLanguage(navigator.language);
    setCores(navigator.hardwareConcurrency || "Unknown");
    
    // deviceMemory is an experimental feature not available on all browsers
    if ('deviceMemory' in navigator) {
      setMemory((navigator as any).deviceMemory);
    }
    
    setCookiesEnabled(navigator.cookieEnabled);
    setIsOnline(navigator.onLine);

    // Parse OS
    let detectedOs = "Unknown OS";
    if (ua.indexOf("Win") !== -1) detectedOs = "Windows";
    if (ua.indexOf("Mac") !== -1) detectedOs = "MacOS";
    if (ua.indexOf("Linux") !== -1) detectedOs = "Linux";
    if (ua.indexOf("Android") !== -1) detectedOs = "Android";
    if (ua.indexOf("like Mac") !== -1) detectedOs = "iOS";
    setOs(detectedOs);

    // Parse Browser
    let detectedBrowser = "Unknown Browser";
    if (ua.indexOf("Firefox") > -1) {
      detectedBrowser = "Mozilla Firefox";
    } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
      detectedBrowser = "Opera";
    } else if (ua.indexOf("Trident") > -1) {
      detectedBrowser = "Internet Explorer";
    } else if (ua.indexOf("Edge") > -1) {
      detectedBrowser = "Microsoft Edge";
    } else if (ua.indexOf("Chrome") > -1) {
      detectedBrowser = "Google Chrome";
    } else if (ua.indexOf("Safari") > -1) {
      detectedBrowser = "Apple Safari";
    }
    setBrowser(detectedBrowser);

  }, []);

  const InfoCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string | React.ReactNode }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-start gap-4 shadow-sm transition-transform hover:-translate-y-1">
      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <p className="font-semibold text-slate-800 dark:text-slate-200">{value}</p>
      </div>
    </div>
  );

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full space-y-8">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">My Device Information</h2>
            <p className="text-slate-500">We've securely detected your system properties directly in your browser.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard 
              icon={<Laptop className="w-6 h-6" />} 
              title="Operating System" 
              value={<span className="text-lg">{os}</span>} 
            />
            <InfoCard 
              icon={<Globe className="w-6 h-6" />} 
              title="Browser" 
              value={<span className="text-lg">{browser}</span>} 
            />
            <InfoCard 
              icon={<Smartphone className="w-6 h-6" />} 
              title="Platform" 
              value={platform || "Unknown"} 
            />
            <InfoCard 
              icon={<Cpu className="w-6 h-6" />} 
              title="CPU Cores (Logical)" 
              value={cores.toString()} 
            />
            <InfoCard 
              icon={<Monitor className="w-6 h-6" />} 
              title="Est. Device Memory" 
              value={memory === "Unknown" ? "Unknown" : `~${memory} GB RAM`} 
            />
            <InfoCard 
              icon={<Info className="w-6 h-6" />} 
              title="System Language" 
              value={language} 
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div className={`p-6 rounded-2xl border flex items-center justify-between ${isOnline ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/50' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/50'}`}>
              <p className="font-bold text-slate-700 dark:text-slate-300">Network Status</p>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
            
            <div className={`p-6 rounded-2xl border flex items-center justify-between ${cookiesEnabled ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/50'}`}>
              <p className="font-bold text-slate-700 dark:text-slate-300">Cookies Enabled</p>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${cookiesEnabled ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                <span className={`font-bold ${cookiesEnabled ? 'text-blue-600' : 'text-red-600'}`}>{cookiesEnabled ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-inner mt-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Raw User Agent String</p>
            <p className="font-mono text-sm text-slate-600 dark:text-slate-300 break-all">{userAgent}</p>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
