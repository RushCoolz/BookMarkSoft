"use client";
import React, { useState, useEffect } from "react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { MapPin, Globe, Shield, Wifi } from "lucide-react";

export function WhatIsMyIpBody() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIpData = async () => {
      try {
        // GeoJS was blocked by adblockers for some users, switching to ipinfo.io
        const res = await fetch("https://ipinfo.io/json");
        if (!res.ok) throw new Error("Failed to fetch IP data");
        const json = await res.json();
        
        // normalize keys to match previous GeoJS format for UI
        setData({
          ip: json.ip,
          city: json.city,
          region: json.region,
          country: json.country,
          organization: json.org,
          asn: json.org ? json.org.split(" ")[0] : "",
          latitude: json.loc ? json.loc.split(",")[0] : "",
          longitude: json.loc ? json.loc.split(",")[1] : "",
          timezone: json.timezone
        });
      } catch (err: any) {
        setError(err.message || "Failed to load IP details");
      } finally {
        setLoading(false);
      }
    };
    fetchIpData();
  }, []);

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex justify-center items-center gap-2">
              <MapPin className="w-6 h-6 text-red-500" />
              What Is My IP & Location?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Discover your public IP address, ISP, and geographic location.
            </p>
          </div>

          {loading && (
            <div className="text-center py-12 text-slate-500 animate-pulse">
              Locating your IP address...
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-center">
              {error}
            </div>
          )}

          {data && (
            <div className="space-y-6">
              <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 text-center shadow-sm">
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Your Public IPv4 Address
                </div>
                <div className="text-5xl font-black text-slate-900 dark:text-white tracking-wider">
                  {data.ip}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-bold mb-1 uppercase">Location</div>
                    <div className="font-bold text-slate-900 dark:text-white text-lg">{data.city || "Unknown"}, {data.region}</div>
                    <div className="text-slate-600 dark:text-slate-400">{data.country}</div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                    <Wifi className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-bold mb-1 uppercase">Provider (ISP)</div>
                    <div className="font-bold text-slate-900 dark:text-white text-lg">{data.organization || "Unknown ISP"}</div>
                    <div className="text-slate-600 dark:text-slate-400">ASN: {data.asn}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-500 text-center">
                Coordinates: {data.latitude}, {data.longitude} | Timezone: {data.timezone}
              </div>
            </div>
          )}
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
