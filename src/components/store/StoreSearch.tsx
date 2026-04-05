"use client";

import React, { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function StoreSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/store/${query.trim().toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-md mx-auto mb-12 group">
      <div className="absolute inset-0 bg-primary/5 blur-xl group-focus-within:bg-primary/10 transition-colors pointer-events-none" />
      <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
        <div className="pl-4 text-white/30">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for another store..."
          className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/20 font-bold px-4 py-2"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
        >
          <ArrowRight size={18} />
        </button>
      </div>
      <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-3">Try searching by username</p>
    </form>
  );
}
