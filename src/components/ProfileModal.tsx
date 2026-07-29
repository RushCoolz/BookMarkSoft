"use client";
import { useEffect } from "react";
import { X, LogOut, Settings, CreditCard, User as UserIcon, Bell, Shield, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function ProfileModal({ onClose }: { onClose: () => void }) {
  const { user, logout } = useAuth();

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl min-h-[550px] max-h-[90vh] overflow-y-auto relative z-10 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 md:bg-transparent md:dark:bg-transparent p-2 rounded-full transition-colors z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-800 p-6 md:p-6 pt-12 md:pt-6 flex flex-col shrink-0">
          <div className="flex items-center gap-4 mb-8">
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-slate-100 dark:border-slate-700 shadow-sm shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 truncate" title={user.name}>{user.name}</h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate" title={user.email}>{user.email}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            <button className="flex items-center gap-3 px-4 py-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold rounded-xl transition-colors">
              <UserIcon className="w-5 h-5" /> Profile Overview
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
              <Settings className="w-5 h-5" /> Account Settings
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
              <CreditCard className="w-5 h-5" /> Billing & Plan
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
              <Bell className="w-5 h-5" /> Notifications
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
              <Shield className="w-5 h-5" /> Security
            </button>
          </nav>

          <button 
            onClick={() => { logout(); onClose(); }}
            className="hidden md:flex mt-8 items-center justify-center gap-2 px-4 py-3 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors w-full mt-auto"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>

        {/* Main Body */}
        <div className="flex-1 p-6 sm:p-8 md:p-10 relative">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white mb-6 mt-2 md:mt-0">Profile Overview</h2>

          {/* Current Plan Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden mb-8 border border-transparent dark:border-slate-700">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-indigo-300 font-bold text-sm uppercase tracking-wider mb-1">Current Plan</p>
                <h3 className="text-3xl font-black mb-4">{user.plan} Tier</h3>
                <p className="text-slate-400 text-sm max-w-xs">You are currently using the free tier which includes access to all 27 standard tools.</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Sparkles className="w-6 h-6 text-indigo-300" />
              </div>
            </div>
            
            <button className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-lg transition-colors text-sm shadow-sm">
              Upgrade to Premium
            </button>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white dark:bg-slate-800/50 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm min-w-0 flex flex-col justify-center">
              <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Display Name</p>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base truncate" title={user.name}>{user.name}</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm min-w-0 flex flex-col justify-center">
              <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Email Address</p>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base truncate" title={user.email}>{user.email}</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Account Created</p>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base">Today</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Saved Tools</p>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base">0 tools</p>
            </div>
          </div>

          {/* Mobile Sign Out Button */}
          <button 
            onClick={() => { logout(); onClose(); }}
            className="md:hidden mt-8 flex items-center justify-center gap-2 px-4 py-4 bg-white dark:bg-slate-800/50 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-colors w-full shadow-sm"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>

      </div>
    </div>
  );
}
