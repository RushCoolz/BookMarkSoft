"use client";
import { Star, Home } from "lucide-react";
import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import { toolCategories, generateToolId } from "@/data/tools";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  // Find all tools that match the favorite IDs
  const allTools = toolCategories.flatMap(cat => cat.tools);
  const favoriteTools = allTools.filter(tool => favorites.includes(generateToolId(tool.title)));

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-3">
          <Star className="w-8 h-8 text-orange-500 fill-current" />
          Your Favorites
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Tools you have starred for quick access are saved securely in your browser.
        </p>
      </div>

      {favoriteTools.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Star className="w-10 h-10 text-slate-300 dark:text-slate-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">No favorites yet</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
            You haven't added any tools to your favorites. Click the star icon on any tool card to save it here for quick access later!
          </p>
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Explore Tools
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-5">
          {favoriteTools.map((tool, index) => (
            <Link href={`/tools/${generateToolId(tool.title)}`} key={index} className="block hover:no-underline">
              <ToolCard {...tool} id={generateToolId(tool.title)} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
