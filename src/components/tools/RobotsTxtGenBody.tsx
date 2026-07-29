"use client";
import { useState, useEffect } from "react";
import { Copy, Check, Download, ShieldAlert, CheckCircle2, Bot } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function RobotsTxtGenBody() {
  const [defaultPolicy, setDefaultPolicy] = useState<"allow" | "disallow">("allow");
  const [crawlDelay, setCrawlDelay] = useState<string>("");
  const [sitemap, setSitemap] = useState<string>("");
  
  const [googlebot, setGooglebot] = useState<"default" | "allow" | "disallow">("default");
  const [googleImage, setGoogleImage] = useState<"default" | "allow" | "disallow">("default");
  const [bingbot, setBingbot] = useState<"default" | "allow" | "disallow">("default");
  const [yandex, setYandex] = useState<"default" | "allow" | "disallow">("default");
  const [baidu, setBaidu] = useState<"default" | "allow" | "disallow">("default");

  const [restrictedDirs, setRestrictedDirs] = useState<string>("/cgi-bin/\n/admin/\n/private/");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let txt = "";

    // Specific bots
    const bots = [
      { name: "Googlebot", policy: googlebot },
      { name: "Googlebot-Image", policy: googleImage },
      { name: "Bingbot", policy: bingbot },
      { name: "Yandex", policy: yandex },
      { name: "Baiduspider", policy: baidu }
    ];

    bots.forEach(bot => {
      if (bot.policy !== "default") {
        txt += `User-agent: ${bot.name}\n`;
        if (bot.policy === "disallow") {
          txt += `Disallow: /\n`;
        } else {
          txt += `Allow: /\n`;
        }
        txt += "\n";
      }
    });

    // Default policy for all bots
    txt += `User-agent: *\n`;
    if (defaultPolicy === "disallow") {
      txt += `Disallow: /\n`;
    } else {
      const dirs = restrictedDirs.split('\n').map(d => d.trim()).filter(d => d !== "");
      if (dirs.length > 0) {
        dirs.forEach(dir => {
          if (!dir.startsWith("/")) dir = "/" + dir;
          txt += `Disallow: ${dir}\n`;
        });
      } else {
        txt += `Disallow:\n`;
      }
    }

    if (crawlDelay) {
      txt += `Crawl-delay: ${crawlDelay}\n`;
    }

    if (sitemap) {
      txt += `\nSitemap: ${sitemap}\n`;
    }

    setOutput(txt);
    setCopied(false);
  }, [defaultPolicy, crawlDelay, sitemap, googlebot, googleImage, bingbot, yandex, baidu, restrictedDirs]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const BotSelector = ({ label, value, onChange }: { label: string, value: string, onChange: (v: any) => void }) => (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
        <Bot className="w-4 h-4 text-slate-400" /> {label}
      </span>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-slate-500/50"
      >
        <option value="default">Default</option>
        <option value="allow">Allow All</option>
        <option value="disallow">Disallow All</option>
      </select>
    </div>
  );

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-5xl mx-auto w-full flex flex-col lg:flex-row gap-8">
          
          {/* Controls */}
          <div className="flex-1 space-y-8">
            
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg border-b border-slate-200 dark:border-slate-700 pb-2">Global Settings</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Default Access (All Search Engines)</label>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full">
                  <button onClick={() => setDefaultPolicy("allow")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${defaultPolicy === "allow" ? 'bg-green-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>
                    <CheckCircle2 className="w-4 h-4" /> Allow
                  </button>
                  <button onClick={() => setDefaultPolicy("disallow")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${defaultPolicy === "disallow" ? 'bg-red-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>
                    <ShieldAlert className="w-4 h-4" /> Disallow
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Crawl-Delay</label>
                  <select value={crawlDelay} onChange={(e) => setCrawlDelay(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-slate-500/50">
                    <option value="">Default (No Delay)</option>
                    <option value="5">5 Seconds</option>
                    <option value="10">10 Seconds</option>
                    <option value="20">20 Seconds</option>
                    <option value="60">60 Seconds</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sitemap URL</label>
                  <input type="text" value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://domain.com/sitemap.xml" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-500/50" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg border-b border-slate-200 dark:border-slate-700 pb-2">Restricted Directories</h3>
              <p className="text-xs text-slate-500">List paths that search engines should NOT crawl (one per line). Overridden if Default Access is "Disallow".</p>
              <textarea 
                value={restrictedDirs}
                onChange={(e) => setRestrictedDirs(e.target.value)}
                disabled={defaultPolicy === "disallow"}
                className="w-full h-32 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-slate-500/50 disabled:opacity-50 disabled:bg-slate-100"
                placeholder="/admin/&#10;/private/"
              ></textarea>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg border-b border-slate-200 dark:border-slate-700 pb-2">Specific Bot Overrides</h3>
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                <BotSelector label="Googlebot" value={googlebot} onChange={setGooglebot} />
                <BotSelector label="Googlebot Images" value={googleImage} onChange={setGoogleImage} />
                <BotSelector label="Bingbot" value={bingbot} onChange={setBingbot} />
                <BotSelector label="Yandex" value={yandex} onChange={setYandex} />
                <BotSelector label="Baiduspider" value={baidu} onChange={setBaidu} />
              </div>
            </div>

          </div>

          {/* Results */}
          <div className="flex-1 flex flex-col min-h-[500px]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Generated robots.txt</h3>
              
              <div className="flex gap-2">
                <button 
                  onClick={downloadFile}
                  disabled={!output}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
                <button 
                  onClick={copyToClipboard}
                  disabled={!output}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${copied ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            
            <div className="relative flex-1 bg-slate-900 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-inner">
              <textarea
                value={output}
                readOnly
                className="w-full h-full p-6 font-mono text-sm text-slate-300 bg-transparent outline-none resize-none custom-scrollbar"
              ></textarea>
            </div>
          </div>

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
