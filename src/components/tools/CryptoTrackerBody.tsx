"use client";
import React, { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { RefreshCw, TrendingUp, TrendingDown, Bitcoin } from "lucide-react";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export function CryptoTrackerBody() {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchCrypto = async () => {
    setLoading(true);
    setError("");
    try {
      // CoinGecko public API
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`);
      if (!res.ok) throw new Error("Failed to fetch crypto data");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong fetching data. Rate limit might be reached.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrypto();
  }, []);

  const filteredData = data.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1">Live Market Data</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                Crypto Price Tracker
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full items-center justify-center text-amber-500">
              <Bitcoin className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 relative">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <input 
                type="text"
                placeholder="Search coins (e.g. BTC, Ethereum)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:max-w-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button 
                onClick={fetchCrypto}
                className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl transition-colors shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-500' : ''}`} />
                Refresh
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="pb-4 pt-2 font-bold text-slate-500 text-sm uppercase tracking-wider">Asset</th>
                    <th className="pb-4 pt-2 font-bold text-slate-500 text-sm uppercase tracking-wider text-right">Price</th>
                    <th className="pb-4 pt-2 font-bold text-slate-500 text-sm uppercase tracking-wider text-right">24h Change</th>
                    <th className="pb-4 pt-2 font-bold text-slate-500 text-sm uppercase tracking-wider text-right hidden sm:table-cell">Market Cap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {filteredData.map(coin => (
                    <tr key={coin.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{coin.name}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase">{coin.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-right font-mono font-medium text-slate-800 dark:text-slate-200">
                        ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                      </td>
                      <td className="py-4 text-right">
                        <div className={`inline-flex items-center gap-1 text-sm font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                        </div>
                      </td>
                      <td className="py-4 text-right text-sm text-slate-500 font-mono hidden sm:table-cell">
                        ${coin.market_cap.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && !loading && !error && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-500">No coins found matching "{search}"</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
