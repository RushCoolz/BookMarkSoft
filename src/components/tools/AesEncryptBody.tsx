"use client";
import { useState } from "react";
import CryptoJS from "crypto-js";
import { Lock, Unlock, ArrowRightLeft } from "lucide-react";
import { ToolInput } from "../ui/tool/ToolInput";
import { ToolOutput } from "../ui/tool/ToolOutput";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function AesEncryptBody() {
  const [input, setInput] = useState("");
  const [secret, setSecret] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [error, setError] = useState<string | null>(null);

  const handleProcess = () => {
    if (!input || !secret) {
      setOutput("");
      setError("Please provide both text and a secret key.");
      return;
    }
    
    try {
      if (mode === "encrypt") {
        const encrypted = CryptoJS.AES.encrypt(input, secret).toString();
        setOutput(encrypted);
      } else {
        const decrypted = CryptoJS.AES.decrypt(input, secret).toString(CryptoJS.enc.Utf8);
        if (!decrypted) throw new Error("Invalid key or corrupted data");
        setOutput(decrypted);
      }
      setError(null);
    } catch (err: any) {
      setError(mode === "encrypt" ? "Failed to encrypt" : "Decryption failed. Incorrect secret key?");
      setOutput("");
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain className="max-w-4xl mx-auto gap-6 w-full">
      
      {/* Mode Toggle & Secret Key */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-end bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl">
        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 text-sm mb-2">Operation Mode</label>
          <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1 rounded-lg w-max shadow-sm">
            <button 
              onClick={() => { setMode("encrypt"); setOutput(""); setError(null); }}
              className={`px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${mode === "encrypt" ? 'bg-red-50 text-red-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 dark:text-slate-200'}`}
            >
              <Lock className="w-4 h-4" /> Encrypt
            </button>
            <button 
              onClick={() => { setMode("decrypt"); setOutput(""); setError(null); }}
              className={`px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${mode === "decrypt" ? 'bg-green-50 text-green-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 dark:text-slate-200'}`}
            >
              <Unlock className="w-4 h-4" /> Decrypt
            </button>
          </div>
        </div>
        <div className="flex-1 w-full">
          <label className="block font-medium text-slate-700 dark:text-slate-300 text-sm mb-2">Secret Key (Password)</label>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="SuperSecretKey123!"
            className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center flex-1">
        {/* Input */}
        <ToolInput
          label={mode === "encrypt" ? "Raw Text Message" : "Encrypted AES Hash"}
          value={input}
          onChange={setInput}
          placeholder={mode === "encrypt" ? "Type your secret message here..." : "U2FsdGVkX1..."}
        />

        {/* Action Button */}
        <button 
          onClick={handleProcess}
          className={`md:rotate-0 rotate-90 flex items-center justify-center w-14 h-14 text-white dark:text-slate-900 rounded-full shadow-md transition-transform hover:scale-105 mx-auto shrink-0 ${mode === "encrypt" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
        >
          <ArrowRightLeft className="w-6 h-6" />
        </button>

        {/* Output */}
        <ToolOutput
          label={mode === "encrypt" ? "Encrypted Output" : "Decrypted Message"}
          value={output}
          error={error}
        />
      </div>
      </ToolMain>
    </ToolContainer>
  );
}
