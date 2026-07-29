"use client";
import { useState, useEffect } from "react";
import { Cloud, Search } from "lucide-react";
import { ToolCard } from "./ToolCard";
import Link from "next/link";
import { toolCategories, generateToolId } from "../data/tools";
export function ToolsGrid() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
  const filteredCategories = toolCategories.map(cat => {
    return {
      ...cat,
      tools: cat.tools.filter(t => 
        t.title.toLowerCase().includes(searchQuery) || 
        t.subtitle.toLowerCase().includes(searchQuery)
      )
    }
  }).filter(cat => cat.tools.length > 0);

  if (filteredCategories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Search className="w-16 h-16 text-slate-200 dark:text-slate-700 mb-4" />
        <h2 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">No tools found</h2>
        <p className="text-slate-400 dark:text-slate-500 text-sm">We couldn't find any tools matching "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {filteredCategories.map((category) => (
        <div key={category.id} id={category.id} className="scroll-mt-24">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">{category.title}</h2>
            <button className="text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 bg-white dark:bg-slate-800/50 px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700/50">
              <Cloud className="w-4 h-4 text-blue-500 dark:text-blue-400"/> View All in {category.title.split(' ')[0]}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-5">
            {category.tools.map((tool, index) => (
              <Link href={`/tools/${generateToolId(tool.title)}`} key={index} className="block hover:no-underline">
                <ToolCard {...tool} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
