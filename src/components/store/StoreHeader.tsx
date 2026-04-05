"use client";

import React from "react";
import { ShoppingBag, Share2, Menu, Sparkles, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface StoreHeaderProps {
  storeName: string;
  storeLogo?: string | null;
}

export function StoreHeader({ storeName, storeLogo }: StoreHeaderProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${storeName} | Storix`,
        text: `Check out this amazing storefront on Storix!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      // We assume sonner is available since it's in package.json
      import("sonner").then(({ toast }) => toast.success("Store link copied to clipboard!"));
    }
  };

  return (
    <nav className="fixed top-0 z-[60] w-full bg-[var(--store-card)]/40 border-b border-[var(--store-border)] backdrop-blur-3xl transition-all duration-500 hover:bg-[var(--store-card)]/60">
      {/* Glow effect under header */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-[var(--store-primary)]/5 blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 md:h-22 flex items-center justify-between relative z-10">
        {/* Left: Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 md:gap-4 group cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 md:w-13 md:h-13 bg-gradient-to-br from-[var(--store-primary)] to-[var(--store-primary)]/40 rounded-2xl flex items-center justify-center shadow-2xl shadow-[var(--store-primary)]/20 group-hover:scale-105 transition-transform duration-500 overflow-hidden border border-white/10">
              {storeLogo ? (
                <img src={storeLogo} alt={storeName} className="w-full h-full object-cover" />
              ) : (
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white" />
              )}
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border-2 border-[var(--store-primary)] flex items-center justify-center animate-pulse">
               <Sparkles className="w-2.5 h-2.5 text-[var(--store-primary)] fill-[var(--store-primary)]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-black tracking-tighter leading-none text-[var(--store-foreground)] group-hover:text-[var(--store-primary)] transition-colors duration-300">
              {storeName}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-[0.2em] opacity-50">Fleet Verified</span>
            </div>
          </div>
        </Link>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden lg:flex items-center gap-4 mr-4 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="flex -space-x-2.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[var(--store-card)] bg-gradient-to-br from-slate-200 to-slate-50 overflow-hidden shadow-sm ring-1 ring-white/10" />
              ))}
            </div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest whitespace-nowrap">
              <span className="text-[var(--store-foreground)]">12k+</span> shoppers
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleShare}
              className="w-10 h-10 md:w-12 md:h-12 rounded-2xl text-[var(--store-foreground)]/60 hover:bg-[var(--store-primary)]/10 hover:text-[var(--store-primary)] border border-transparent hover:border-[var(--store-primary)]/20 transition-all group"
            >
              <Share2 size={18} className="group-hover:scale-110 transition-transform" />
            </Button>

            <Link href="#products" className="hidden sm:block">
              <Button 
                className="h-10 md:h-13 px-5 md:px-8 rounded-2xl bg-[var(--store-primary)] text-white hover:bg-[var(--store-primary)]/90 shadow-xl shadow-[var(--store-primary)]/25 transition-all font-black text-[10px] md:text-xs uppercase tracking-[0.2em] group border-t border-white/20"
              >
                <span>Browse Store</span>
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden w-10 h-10 rounded-2xl border border-white/5"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
