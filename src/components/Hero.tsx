import { AdSenseMock } from "./AdSenseMock";

export function Hero() {
  return (
    <div className="mb-10 w-full">
      <div className="w-full min-h-[200px] py-8 rounded-[2rem] bg-gradient-to-r from-purple-500 via-purple-400 to-sky-400 relative overflow-hidden flex flex-col items-center justify-center text-center px-6 shadow-sm">
        {/* Decorative elements */}
        <div className="absolute top-8 right-1/4 w-12 h-12 bg-yellow-400 rounded-lg rotate-12 opacity-80 blur-[2px]"></div>
        <div className="absolute bottom-12 left-1/4 w-16 h-16 bg-blue-600 rounded-xl -rotate-12 flex items-center justify-center text-white text-2xl font-bold shadow-lg">B</div>
        <div className="absolute top-1/2 right-12 w-20 h-20 bg-rose-500 rounded-2xl rotate-45 shadow-xl flex items-center justify-center text-white/50">Cio</div>
        <div className="absolute bottom-4 right-1/3 w-24 h-24 bg-rose-400 rounded-full shadow-lg"></div>

        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 z-10">
          Intelligent tools for your team.
        </h1>
        <p className="text-white/90 text-lg mb-6 max-w-2xl z-10 font-medium px-4">
          Bring all your document, image, and data workflows together in one powerful platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 z-10 w-full sm:w-auto px-4 sm:px-0 mb-8">
          <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-sm">
            Start Now
          </button>
          <button className="w-full sm:w-auto bg-transparent hover:bg-white/10 border border-white/40 text-white px-8 py-3 rounded-full font-medium transition-colors backdrop-blur-sm">
            View details
          </button>
        </div>

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
