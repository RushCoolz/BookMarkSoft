"use client";
import { useState, useEffect } from "react";
import { Network, Server } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";

export function SubnetCalcBody() {
  const [ipAddress, setIpAddress] = useState("192.168.1.0");
  const [cidr, setCidr] = useState("24");

  const [network, setNetwork] = useState("");
  const [broadcast, setBroadcast] = useState("");
  const [netmask, setNetmask] = useState("");
  const [wildcard, setWildcard] = useState("");
  const [hosts, setHosts] = useState(0);
  const [firstHost, setFirstHost] = useState("");
  const [lastHost, setLastHost] = useState("");
  const [isValid, setIsValid] = useState(true);

  // Helper to convert IP string to 32-bit int
  const ipToInt = (ip: string) => {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  };

  // Helper to convert 32-bit int to IP string
  const intToIp = (int: number) => {
    return [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255
    ].join('.');
  };

  useEffect(() => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (!ipRegex.test(ipAddress) || !cidr) {
      setIsValid(false);
      return;
    }

    const cidrNum = parseInt(cidr, 10);
    if (cidrNum < 0 || cidrNum > 32) {
      setIsValid(false);
      return;
    }

    setIsValid(true);

    const ipInt = ipToInt(ipAddress);
    
    // Calculate mask
    // Be careful with bitwise ops in JS, they are 32-bit signed
    const maskInt = cidrNum === 0 ? 0 : (~0 << (32 - cidrNum)) >>> 0;
    
    const networkInt = (ipInt & maskInt) >>> 0;
    const wildcardInt = (~maskInt) >>> 0;
    const broadcastInt = (networkInt | wildcardInt) >>> 0;

    let totalHosts = 0;
    let firstInt = 0;
    let lastInt = 0;

    if (cidrNum === 32) {
      totalHosts = 1;
      firstInt = networkInt;
      lastInt = networkInt;
    } else if (cidrNum === 31) {
      totalHosts = 2;
      firstInt = networkInt;
      lastInt = broadcastInt;
    } else {
      totalHosts = wildcardInt - 1;
      firstInt = networkInt + 1;
      lastInt = broadcastInt - 1;
    }

    setNetwork(intToIp(networkInt));
    setBroadcast(intToIp(broadcastInt));
    setNetmask(intToIp(maskInt));
    setWildcard(intToIp(wildcardInt));
    setHosts(totalHosts);
    setFirstHost(intToIp(firstInt));
    setLastHost(intToIp(lastInt));

  }, [ipAddress, cidr]);

  const ResultCard = ({ title, value }: { title: string, value: string | number }) => (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-center">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-lg font-bold text-slate-800 dark:text-slate-200 font-mono break-all">{value}</p>
    </div>
  );

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-8">
          
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">IP Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500">
                  <Network className="w-5 h-5" />
                </span>
                <input 
                  type="text" 
                  value={ipAddress} 
                  onChange={(e) => setIpAddress(e.target.value)} 
                  className={`w-full bg-white dark:bg-slate-900 border ${isValid ? 'border-slate-200 dark:border-slate-700' : 'border-red-500'} rounded-xl pl-12 pr-4 py-3 font-bold font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
                  placeholder="192.168.1.0"
                />
              </div>
            </div>
            
            <div className="w-full sm:w-32 space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">CIDR (/)</label>
              <select 
                value={cidr} 
                onChange={(e) => setCidr(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {Array.from({ length: 33 }, (_, i) => i).reverse().map(num => (
                  <option key={num} value={num.toString()}>/{num}</option>
                ))}
              </select>
            </div>
          </div>

          {!isValid && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-center font-bold text-sm">
              Please enter a valid IPv4 address (e.g., 192.168.1.1).
            </div>
          )}

          {isValid && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Subnet Details</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <ResultCard title="Network Address" value={network} />
                <ResultCard title="Broadcast Address" value={broadcast} />
                <ResultCard title="Subnet Mask" value={netmask} />
                <ResultCard title="Wildcard Mask" value={wildcard} />
                
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-4 flex flex-col justify-center sm:col-span-2">
                  <p className="text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider text-xs mb-1">Total Usable Hosts</p>
                  <p className="text-3xl font-black text-slate-800 dark:text-slate-100">{hosts.toLocaleString()}</p>
                </div>

                <ResultCard title="First Usable Host" value={firstHost} />
                <ResultCard title="Last Usable Host" value={lastHost} />
              </div>

              <div className="mt-8 text-center text-sm text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-6">
                <p>The network <strong className="font-mono text-slate-700 dark:text-slate-300">{network}/{cidr}</strong> uses the mask <strong className="font-mono text-slate-700 dark:text-slate-300">{netmask}</strong>.</p>
              </div>
            </div>
          )}

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
