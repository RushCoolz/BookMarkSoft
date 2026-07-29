"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  name: string;
  email: string;
  avatar: string;
  plan: string;
};

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Use useEffect to avoid hydration mismatches with localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bookmarksoft_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = (email: string) => {
    // Generate a beautiful mock user based on their email
    const nameStr = email.split("@")[0];
    const cleanName = nameStr.charAt(0).toUpperCase() + nameStr.slice(1);
    
    const mockUser = {
      name: cleanName,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}&backgroundColor=c0aede,b6e3f4,d1d4f9,ffdfbf`,
      plan: "Free",
    };
    
    setUser(mockUser);
    localStorage.setItem("bookmarksoft_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bookmarksoft_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
