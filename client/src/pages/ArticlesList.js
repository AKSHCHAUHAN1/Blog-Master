import React, { useState, useMemo } from "react";
import articleContent from "./article-content";
import Articles from "../components/Articles";
import Fuse from "fuse.js";

const ArticlesList = () => {
  const [query, setQuery] = useState("");

  // useMemo prevents unnecessary re-calculations on every render
  const fuse = useMemo(() => new Fuse(articleContent, {
    keys: ["title", "content"],
    threshold: 0.4,
  }), []);

  // Logical fallback: if no query, always show all articles
  const results = query.trim().length > 0 
    ? fuse.search(query).map(result => result.item) 
    : articleContent;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn'>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <h1 className='text-4xl md:text-5xl font-black text-slate-900 tracking-tight'>
          Premium <span className="text-green-600">Insights</span>
        </h1>
        
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      <div className='container mx-auto pb-20'>
        {/* Fixed Grid Layout: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Articles articles={results} />
        </div>
        
        {results.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No matches found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesList;