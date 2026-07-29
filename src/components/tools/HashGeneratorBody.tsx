"use client";
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Copy, Check, Hash } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolInput } from "../ui/tool/ToolInput";

export function HashGeneratorBody() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState({ md5: "", sha1: "", sha256: "", sha512: "" });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!input) {
      setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
      return;
    }
    setHashes({
      md5: CryptoJS.MD5(input).toString(),
      sha1: CryptoJS.SHA1(input).toString(),
      sha256: CryptoJS.SHA256(input).toString(),
      sha512: CryptoJS.SHA512(input).toString(),
    });
  }, [input]);

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const HashOutput = ({ label, value, hashKey }: { label: string, value: string, hashKey: string }) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</label>
        {value && (
          <button 
            onClick={() => copyToClipboard(value, hashKey)}
            className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${copiedKey === hashKey ? 'bg-green-100 text-green-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
          >
            {copiedKey === hashKey ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copiedKey === hashKey ? "COPIED" : "COPY"}
          </button>
        )}
      </div>
      <div className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-3 rounded-lg font-mono text-sm text-slate-700 dark:text-slate-300 break-all min-h-[46px] shadow-inner">
        {value}
      </div>
    </div>
  );

  return (
    <ToolContainer split="half">
      <ToolMain>
        <ToolInput 
          label="Input Text" 
          value={input} 
          onChange={setInput} 
          onClear={() => setInput("")}
          placeholder="Type something here to hash it instantly..." 
        />
      </ToolMain>

      <ToolMain>
        <div className="flex flex-col h-full gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex-1">
          <div className="flex items-center gap-2 mb-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <Hash className="w-5 h-5 text-rose-500" />
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Live Hashes</h3>
          </div>
          
          <HashOutput label="MD5" value={hashes.md5} hashKey="md5" />
          <HashOutput label="SHA-1" value={hashes.sha1} hashKey="sha1" />
          <HashOutput label="SHA-256" value={hashes.sha256} hashKey="sha256" />
          <HashOutput label="SHA-512" value={hashes.sha512} hashKey="sha512" />
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
