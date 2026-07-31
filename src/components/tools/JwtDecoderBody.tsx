import React, { useState } from 'react';
import { Key, AlertCircle } from 'lucide-react';

export function JwtDecoderBody() {
  const [token, setToken] = useState('');

  // Robust base64url decode function
  const decodeBase64Url = (str: string) => {
    try {
      // Add padding if needed
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      // Decode base64 to string, properly handling UTF-8 characters
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const decodeJwt = (jwt: string) => {
    const parts = jwt.split('.');
    if (parts.length !== 3) return null;
    const header = decodeBase64Url(parts[0]);
    const payload = decodeBase64Url(parts[1]);
    if (!header || !payload) return null;
    
    // Check expiration if 'exp' claim exists
    let isExpired = false;
    let expiresAt = null;
    if (payload.exp) {
      const expDate = new Date(payload.exp * 1000);
      expiresAt = expDate.toLocaleString();
      isExpired = expDate < new Date();
    }

    return { header, payload, signature: parts[2], isExpired, expiresAt };
  };

  const decoded = token.trim() ? decodeJwt(token.trim()) : null;
  const isInvalid = token.trim() !== '' && !decoded;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Area */}
      <div className="flex flex-col h-full">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Encoded JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="w-full flex-grow min-h-[300px] lg:min-h-[500px] p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none font-mono text-sm text-slate-800 dark:text-slate-300 transition-colors"
        />
        {isInvalid && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>Invalid JWT format. Ensure it consists of 3 parts separated by dots.</span>
          </div>
        )}
      </div>

      {/* Output Area */}
      <div className="flex flex-col h-full space-y-6">
        {!decoded ? (
          <div className="flex-grow flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-center transition-colors">
            <Key className="w-12 h-12 mb-4 opacity-50" />
            <p>Paste a JWT token on the left to see its decoded contents here.</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Header <span className="text-slate-400 text-xs font-normal">(Algorithm & Type)</span></label>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-rose-400 font-mono text-sm overflow-x-auto shadow-inner">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Payload <span className="text-slate-400 text-xs font-normal">(Data)</span></label>
                </div>
                {decoded.expiresAt && (
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium tracking-wide ${decoded.isExpired ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                    {decoded.isExpired ? 'Expired' : 'Valid'} until {decoded.expiresAt}
                  </span>
                )}
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-purple-400 font-mono text-sm overflow-x-auto min-h-[150px] shadow-inner">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>

            {/* Signature */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></span>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Signature</label>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-cyan-400 font-mono text-sm break-all shadow-inner">
                {decoded.signature}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
