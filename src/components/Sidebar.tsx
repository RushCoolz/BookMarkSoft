"use client";
import { Terminal, FileText, Image as ImageIcon, Shield, Calculator, Settings, Search, X, LayoutDashboard, Star, FileCode2, MessageSquarePlus, HeartPulse, Share2, Smartphone, Dices, Network, Banknote } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("developer-code");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { name: "Developer & Code", icon: Terminal, id: "developer-code" },
    { name: "Document & Text", icon: FileText, id: "document-text" },
    { name: "Image & Media", icon: ImageIcon, id: "image-media" },
    { name: "Security & Privacy", icon: Shield, id: "security-privacy" },
    { name: "Math & Finance", icon: Calculator, id: "math-finance" },
    { name: "Health & Fitness", icon: HeartPulse, id: "health-fitness" },
    { name: "Web, SEO & Social", icon: Share2, id: "web-seo-social" },
    { name: "Random Generators", icon: Dices, id: "random-generators" },
    { name: "Network & IT", icon: Network, id: "network-it" },
    { name: "Mobile & Devices", icon: Smartphone, id: "mobile-devices" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Only compute scroll on the homepage
      if (pathname !== "/") return;
      if (isClickScrolling.current) return;

      const scrollPosition = window.scrollY + 300; // offset for hero section
      
      // If we are at the very bottom of the page, highlight the last section
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
        setActiveSection(navItems[navItems.length - 1].id);
        return;
      }

      const sections = navItems.map(item => document.getElementById(item.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    const handleToggle = () => setIsOpen(true);
    window.addEventListener("toggleMobileMenu", handleToggle);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("toggleMobileMenu", handleToggle);
    };
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      
      if (pathname === "/") {
        // We are on homepage, smooth scroll to section
        isClickScrolling.current = true;
        setActiveSection(id);
        
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 1000); // Re-enable scroll listener after animation
      } else {
        // Not on homepage, navigate to homepage with hash
        router.push(`/#${id}`);
      }
      
      // Close sidebar on mobile after clicking
      setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`flex flex-col w-64 h-screen bg-sidebar border-r border-border-subtle fixed left-0 top-0 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0`}>
        <div className="pt-6 pb-4 flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-200 tracking-tight cursor-pointer">
            <img src="/logo.png" alt="BookmarkSoft Logo" className="w-8 h-8 object-contain mix-blend-multiply dark:mix-blend-normal dark:invert" />
            BookmarkSoft
          </Link>
          <button 
            className="xl:hidden p-1 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      
      <div className="px-4 mb-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search tools..."
            onChange={(e) => window.dispatchEvent(new CustomEvent('toolsSearch', { detail: e.target.value }))}
            className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-full pl-10 pr-4 py-2 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:focus:border-red-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Top Navigation links for Mobile only */}
      <div className="xl:hidden px-4 mb-2 pb-4 border-b border-border-subtle space-y-1">
        <p className="px-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
        <Link href="/" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === "/" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"}`}>
          <LayoutDashboard className="w-4 h-4" /> Dashboard
        </Link>
        <Link href="/favorites" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === "/favorites" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"}`}>
          <Star className="w-4 h-4" /> Favorites
        </Link>
        <Link href="/api-docs" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === "/api-docs" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"}`}>
          <FileCode2 className="w-4 h-4" /> API Docs
        </Link>
        <Link href="/request" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === "/request" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"}`}>
          <MessageSquarePlus className="w-4 h-4" /> Request a Tool
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-1">
        <p className="xl:hidden px-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 mt-2">Categories</p>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`/#${item.id}`}
            onClick={(e) => scrollTo(e, item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeSection === item.id && pathname === "/"
                ? "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </a>
        ))}
      </nav>
      
      <div className="border-t border-border-subtle">
        <a href="#" className="flex items-center gap-4 px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.611c-.47.47-1.088.706-1.705.706-.616 0-1.232-.236-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.446-1.02.9a2.5 2.5 0 1 1-3.15-3.15c-.453-.18.826.527-.9-.102a1.025 1.025 0 0 1 .29-.877l1.568-1.568c.47-.47.706-1.087.706-1.704s-.235-1.233-.706-1.704L4.2 9.4c-.47-.47-.706-1.087-.706-1.704s.235-1.233.706-1.704l1.611-1.611a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.611c.47-.47 1.088-.706 1.705-.706.616 0 1.232.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.446 1.02-.9a2.5 2.5 0 1 1 3.15 3.15c.453-.18.826-.527.9-.102a1.025 1.025 0 0 1-.29.877Z"/></svg>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">Browser Extension</span>
            <span className="text-xs text-slate-500 dark:text-slate-500">Get the Add-on</span>
          </div>
        </a>
      </div>
    </aside>
    </>
  );
}
