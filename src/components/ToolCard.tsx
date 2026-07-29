import { Star, ArrowUpRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  rating: number;
  isBeta?: boolean;
  isNew?: boolean;
  onClick?: () => void;
}

export function ToolCard({ title, subtitle, icon, iconColor, rating, isBeta, isNew, onClick }: ToolCardProps) {
  return (
    <div onClick={onClick} className="group relative bg-white dark:bg-slate-900/50 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-1">
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
      
      {/* Bottom right hover icon */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
        <ArrowUpRight className="w-4 h-4" />
      </div>

      <div className={`w-full flex justify-center mt-6 mb-4 sm:mt-8 sm:mb-6 group-hover:scale-110 transition-transform ${iconColor}`}>
        {icon}
      </div>
      <div className="mt-auto pr-4 sm:pr-6">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1 line-clamp-1">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{subtitle}</p>
        <div className="flex text-orange-400 gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < rating ? "fill-current" : "fill-slate-100 dark:fill-slate-800 text-slate-200 dark:text-slate-700"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
