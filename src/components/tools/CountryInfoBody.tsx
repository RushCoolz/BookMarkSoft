"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { Search, MapPin, Users, Globe2, Landmark } from "lucide-react";

export function CountryInfoBody() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [country, setCountry] = useState<any | null>(null);

  const searchCountry = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setCountry(null);

      const res = await fetch('https://cdn.jsdelivr.net/npm/world-countries@5.1.0/countries.json');
      if (!res.ok) throw new Error("Network Error: Failed to fetch country database");
      
      const allCountries = await res.json();
      const queryLower = query.trim().toLowerCase();
      
      let data = allCountries.filter((c: any) => 
        c.name.common.toLowerCase() === queryLower || 
        c.name.official.toLowerCase() === queryLower ||
        c.cca2.toLowerCase() === queryLower ||
        c.cca3.toLowerCase() === queryLower
      );
      
      if (data.length === 0) {
        data = allCountries.filter((c: any) => 
          c.name.common.toLowerCase().includes(queryLower) || 
          c.name.official.toLowerCase().includes(queryLower)
        );
      }

      if (data.length === 0) {
        throw new Error("Country not found");
      }

      const match = data[0];
      // Format the data to match the UI expectations
      const formattedCountry = {
        name: match.name,
        flags: {
          svg: `https://flagcdn.com/${match.cca2.toLowerCase()}.svg`
        },
        capital: match.capital || ['N/A'],
        region: match.region,
        subregion: match.subregion || 'N/A',
        population: match.population || 'N/A (Static DB)',
        languages: match.languages || {},
        currencies: match.currencies || {}
      };

      setCountry(formattedCountry);
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        setError("Network Error: Adblocker or CORS blocked the request.");
      } else {
        setError(err.message || "Failed to fetch country details");
      }
      setCountry(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full space-y-6">
          
          <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-1">Global Data</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                Country Info Explorer
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-sky-100 dark:bg-sky-900/50 rounded-full items-center justify-center text-sky-500">
              <Globe2 className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text"
                placeholder="Search country (e.g. Japan, Brazil, Canada)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchCountry()}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
              <button 
                onClick={searchCountry}
                disabled={loading || !query}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
                Search
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {country && (
              <div className="mt-8 space-y-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <img src={country.flags.svg} alt={`${country.name.common} flag`} className="w-48 h-auto rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 object-cover" />
                  <div>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100">{country.name.common}</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 mt-1">{country.name.official}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                      <Landmark className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Capital</span>
                    </div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{country.capital?.[0] || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                      <MapPin className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Region</span>
                    </div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{country.region} / {country.subregion}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                      <Users className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Population</span>
                    </div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{country.population.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.values(country.languages || {}).map((lang: any) => (
                          <span key={lang} className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-600 shadow-sm">{lang}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Currencies</h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.values(country.currencies || {}).map((curr: any) => (
                          <span key={curr.name} className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-600 shadow-sm">{curr.name} ({curr.symbol})</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
