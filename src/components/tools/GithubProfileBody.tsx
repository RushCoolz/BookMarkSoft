"use client";
import React, { useState } from "react";
import { ToolContainer, ToolMain } from "./SharedComponents";
import { Search, Github, Users, Star, GitFork, ExternalLink } from "lucide-react";

export function GithubProfileBody() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any | null>(null);
  const [repos, setRepos] = useState<any[]>([]);

  const searchGithub = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username.trim())}`);
      if (!userRes.ok) {
        if (userRes.status === 404) throw new Error("User not found");
        throw new Error("API rate limit exceeded or network error");
      }
      const userData = await userRes.json();
      setUser(userData);

      const reposRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username.trim())}/repos?sort=updated&per_page=6`);
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        setRepos(reposData);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch GitHub data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full space-y-6">
          
          <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Developer Tools</h2>
              <p className="text-3xl font-black text-slate-800 dark:text-slate-100">
                GitHub Profile Finder
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-white dark:bg-slate-900 rounded-full items-center justify-center text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              <Github className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text"
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchGithub()}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-slate-500/50"
              />
              <button 
                onClick={searchGithub}
                disabled={loading || !username}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
                Search
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {user && (
              <div className="mt-8 space-y-8">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                  <img src={user.avatar_url} alt={user.login} className="w-32 h-32 rounded-full border-4 border-slate-100 dark:border-slate-800 shadow-sm" />
                  <div className="flex-1">
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white">{user.name || user.login}</h1>
                    <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline font-medium block mb-2">@{user.login}</a>
                    {user.bio && <p className="text-slate-600 dark:text-slate-400 mb-4">{user.bio}</p>}
                    
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5"><Users className="w-4 h-4"/> <strong>{user.followers}</strong> followers</div>
                      <div className="flex items-center gap-1.5"><strong>{user.following}</strong> following</div>
                      <div className="flex items-center gap-1.5"><strong>{user.public_repos}</strong> repos</div>
                    </div>
                  </div>
                </div>

                {repos.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Recently Updated Repositories</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {repos.map((repo) => (
                        <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="block p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-blue-600 dark:text-blue-400 break-all">{repo.name}</h4>
                            <ExternalLink className="w-4 h-4 text-slate-400" />
                          </div>
                          <p className="text-sm text-slate-500 line-clamp-2 mb-4">{repo.description || "No description provided."}</p>
                          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                            {repo.language && <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>{repo.language}</span>}
                            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5"/> {repo.stargazers_count}</span>
                            <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5"/> {repo.forks_count}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
      </ToolMain>
    </ToolContainer>
  );
}
