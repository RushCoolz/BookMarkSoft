"use client";
import { Star, ArrowUpRight } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

interface ToolCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  rating: number;
  isBeta?: boolean;
  id: string;
  isNew?: boolean;
  onClick?: () => void;
}

export function ToolCard({ title, subtitle, icon, iconColor, rating, isBeta, isNew, id, onClick }: ToolCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div onClick={onClick} className="group relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-white/40 dark:border-slate-700/30 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:bg-white/80 dark:hover:bg-slate-800/60 hover:shadow-2xl hover:shadow-blue-500/10 transition-colors cursor-pointer flex flex-col h-full overflow-hidden">
      {/* Premium subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
        {isBeta && (
          <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 tracking-wider">
            BETA
          </span>
        )}
        {isNew && (
          <span className="bg-blue-500 dark:bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
            NEW
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full transition-colors z-10 
          ${favorite 
            ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-500 opacity-100 scale-110' 
            : 'text-slate-300 dark:text-slate-600 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30 opacity-0 group-hover:opacity-100'
          }`}
      >
        <Star className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
      </button>
      
      {/* Bottom right hover icon */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
        <ArrowUpRight className="w-4 h-4" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className={`w-full flex justify-center mt-6 mb-4 sm:mt-8 sm:mb-6 ${iconColor}`}>
          {icon}
        </div>
        <div className="mt-auto pr-4 sm:pr-6">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1.5 tracking-tight line-clamp-1">{title}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">{subtitle}</p>
          <div className="flex text-orange-400 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "fill-current" : "fill-slate-100 dark:fill-slate-800 text-slate-200 dark:text-slate-700"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
