"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem('bookmarksoft-favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => {
      let newFavorites;
      if (prev.includes(toolId)) {
        newFavorites = prev.filter(id => id !== toolId);
      } else {
        newFavorites = [...prev, toolId];
      }
      
      // Save to localStorage immediately
      localStorage.setItem('bookmarksoft-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (toolId: string) => {
    if (!isLoaded) return false;
    return favorites.includes(toolId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
