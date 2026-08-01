import { AdSenseMock } from "./AdSenseMock";

export function Hero() {
  return (
    <div className="mb-10 w-full">
      <div className="w-full min-h-[200px] py-8 rounded-[2rem] bg-slate-900 relative overflow-hidden flex flex-col items-center justify-center text-center px-6 shadow-2xl shadow-blue-900/20 border border-slate-800/60">
        
        {/* Premium glowing mesh background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/30 via-transparent to-transparent rounded-full blur-3xl opacity-50 mix-blend-screen"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent blur-3xl opacity-60"></div>
          <div className="absolute -bottom-1/2 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400/20 via-transparent to-transparent blur-3xl opacity-40"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        {/* Floating Glass Badges */}
        <div className="absolute top-8 right-[15%] w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl rotate-12 flex items-center justify-center shadow-2xl hidden md:flex">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 blur-[2px]"></div>
        </div>
        <div className="absolute bottom-12 left-[10%] w-16 h-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-full -rotate-12 flex items-center justify-center shadow-2xl hidden lg:flex">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-400 blur-[2px] opacity-70"></div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sky-300 text-xs font-semibold uppercase tracking-widest mb-4 z-10 shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          Next-Gen Developer Utilities
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 tracking-tight mb-3 z-10 drop-shadow-sm max-w-3xl">
          Everything you need. In one platform.
        </h1>
        
        <p className="text-slate-300/80 text-base md:text-lg mb-8 max-w-2xl z-10 font-medium px-4 leading-relaxed">
          The ultimate suite of beautifully engineered tools for developers, designers, and modern creators.
        </p>

        {/* Scrollable AdSense Container */}
        <div className="w-full overflow-x-auto px-4 sm:px-8 z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center gap-4 min-w-max mx-auto justify-center">
            <AdSenseMock />
            <AdSenseMock />
            <AdSenseMock />
          </div>
        </div>
      </div>
    </div>
  );
}
