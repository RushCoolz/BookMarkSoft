"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, Moon, Sun, Star, Sparkles, Terminal, LogIn, Menu, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { usePathname, useRouter } from "next/navigation";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export function Topbar() {
  const { isSignedIn } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (window.innerWidth >= 1280) {
          searchInputRef.current?.focus();
        } else {
          setIsMobileSearchOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (val: string) => {
    if (pathname !== "/") {
      router.push(`/?q=${encodeURIComponent(val)}`);
    } else {
      window.dispatchEvent(new CustomEvent('toolsSearch', { detail: val }));
    }
  };

  return (
    <>
    <header className="h-16 bg-white/70 dark:bg-sidebar/70 backdrop-blur-xl flex items-center justify-between px-3 sm:px-4 xl:px-8 fixed top-0 right-0 left-0 xl:left-64 z-40 border-b border-slate-100/50 dark:border-border-subtle/50 transition-colors duration-300">
      
      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="absolute inset-0 bg-white dark:bg-sidebar flex items-center px-3 sm:px-4 gap-2 z-50 xl:hidden">
          <button onClick={() => setIsMobileSearchOpen(false)} className="p-1 sm:p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input 
              autoFocus
              type="text" 
              placeholder="Search tools..." 
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-full pl-10 pr-4 py-2 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>
      )}


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

      <nav className="hidden xl:flex items-center gap-6">
        <Link href="/" className={`text-sm font-medium py-5 transition-colors border-b-2 ${pathname === "/" ? "text-slate-800 dark:text-slate-200 border-blue-600 dark:border-blue-500" : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"}`}>Dashboard</Link>
        <Link href="/favorites" className={`text-sm font-medium py-5 flex items-center gap-1.5 transition-colors border-b-2 ${pathname === "/favorites" ? "text-slate-800 dark:text-slate-200 border-blue-600 dark:border-blue-500" : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"}`}><Star className="w-4 h-4"/> Favorites</Link>
        <Link href="/api-docs" className={`text-sm font-medium py-5 flex items-center gap-1.5 transition-colors border-b-2 ${pathname === "/api-docs" ? "text-slate-800 dark:text-slate-200 border-blue-600 dark:border-blue-500" : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"}`}><Terminal className="w-4 h-4"/> API Docs</Link>
        <Link href="/request" className={`text-sm font-medium py-5 transition-colors border-b-2 ${pathname === "/request" ? "text-slate-800 dark:text-slate-200 border-blue-600 dark:border-blue-500" : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"}`}>Request a Tool</Link>
      </nav>
      
      {/* Desktop Search Bar */}
      <div className="hidden xl:block flex-1 max-w-md mx-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
        <input 
          ref={searchInputRef}
          type="text" 
          placeholder="Search tools... (Ctrl+K)" 
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-full pl-10 pr-4 py-2 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all shadow-sm"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-3 xl:gap-4 shrink-0">
        <button 
          onClick={() => setIsMobileSearchOpen(true)}
          className="xl:hidden p-1.5 sm:p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>
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
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 sm:w-9 sm:h-9" } }} />
          ) : (
            <SignInButton mode="modal">
              <button className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 sm:px-3 py-2 flex items-center gap-1.5">
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Sign In</span>
              </button>
            </SignInButton>
          )}
          <button className="hidden xl:flex bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm items-center gap-2">
            <Sparkles className="w-4 h-4"/> Go Premium
          </button>
        </div>
      </div>
    </header>
    </>
  );
}
