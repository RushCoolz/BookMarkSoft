"use client";
import { useState } from "react";
import { Bell, Moon, Sun, Star, Sparkles, Terminal, LogIn, Menu } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import { AuthModal } from "./AuthModal";
import { ProfileModal } from "./ProfileModal";

export function Topbar() {
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
    <header className="h-16 bg-white dark:bg-sidebar flex items-center justify-between px-3 sm:px-4 xl:px-8 fixed top-0 right-0 left-0 xl:left-64 z-40 border-b border-slate-100 dark:border-border-subtle transition-colors duration-300">
      
      {/* Mobile Branding (only visible when Sidebar is hidden) */}
      <div className="flex xl:hidden items-center gap-2 sm:gap-3 shrink-0">
        <button 
          onClick={() => window.dispatchEvent(new Event('toggleMobileMenu'))}
          className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-800 dark:text-slate-200 tracking-tight cursor-pointer">
          <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain mix-blend-multiply dark:mix-blend-normal dark:invert" />
          <span className="hidden min-[360px]:inline">BookmarkSoft</span>
        </Link>
      </div>

      <nav className="hidden xl:flex items-center gap-8">
        <Link href="/" className={`text-sm font-medium py-5 transition-colors border-b-2 ${pathname === "/" ? "text-slate-800 dark:text-slate-200 border-blue-600 dark:border-blue-500" : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"}`}>Dashboard</Link>
        <Link href="/favorites" className={`text-sm font-medium py-5 flex items-center gap-1.5 transition-colors border-b-2 ${pathname === "/favorites" ? "text-slate-800 dark:text-slate-200 border-blue-600 dark:border-blue-500" : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"}`}><Star className="w-4 h-4"/> Favorites</Link>
        <Link href="/api-docs" className={`text-sm font-medium py-5 flex items-center gap-1.5 transition-colors border-b-2 ${pathname === "/api-docs" ? "text-slate-800 dark:text-slate-200 border-blue-600 dark:border-blue-500" : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"}`}><Terminal className="w-4 h-4"/> API Docs</Link>
        <Link href="/request" className={`text-sm font-medium py-5 transition-colors border-b-2 ${pathname === "/request" ? "text-slate-800 dark:text-slate-200 border-blue-600 dark:border-blue-500" : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"}`}>Request a Tool</Link>
      </nav>
      
      <div className="flex items-center gap-1 sm:gap-3 xl:gap-5 shrink-0">
        <button 
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" 
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="p-1.5 sm:p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors relative" title="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1.5 sm:top-1.5 sm:right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-sidebar"></span>
        </button>
        <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-border-subtle mx-1"></div>
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div 
              onClick={() => setShowProfileModal(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-transparent overflow-hidden cursor-pointer hover:border-blue-500 transition-all shadow-sm"
              title="Profile & Settings"
            >
              <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 sm:px-3 py-2 flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
          <button className="hidden xl:flex bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm items-center gap-2">
            <Sparkles className="w-4 h-4"/> Go Premium
          </button>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}
    </header>
    </>
  );
}
