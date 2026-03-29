"use client";

import React from "react";
import { Zap, ShieldCheck, Sparkles, ShoppingBag, TrendingUp, Clock, Award, Globe } from "lucide-react";

export function TrustSection() {
  const items = [
    { 
      icon: Zap, 
      title: "Lightning Redirection", 
      desc: "Fastest checkout experience via verified affiliate links.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    { 
      icon: ShieldCheck, 
      title: "Verified Sources", 
      desc: "Every listing is carefully inspected for quality and reliability.",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    { 
      icon: TrendingUp, 
      title: "Price Match Tech", 
      desc: "We scan for the lowest possible prices across across multiple sectors.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    { 
      icon: Clock, 
      title: "Fresh Inventory", 
      desc: "Our catalog is updated daily with the latest trends and deals.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
  ];

  return (
    <section className="bg-[var(--store-card)] border-y border-[var(--store-border)] relative overflow-hidden py-24">
      {/* Background Decorator */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--store-primary)] rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[var(--store-primary)] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism-premium text-[var(--store-primary)] text-[10px] font-black uppercase tracking-[0.3em]">
             <Award size={14} className="animate-float" />
             Premium Shopping Experience
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Why Shop at <span className="text-[var(--store-primary)]">Storix</span> Powered Stores?
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            We provide a curated layer of trust and intelligence on top of your favorite shopping platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center text-center gap-6 p-8 rounded-[2.5rem] bg-[var(--store-background)] border border-[var(--store-border)] hover:border-[var(--store-primary)] transition-all duration-500 group hover-lift"
            >
              <div className={`w-20 h-20 rounded-[2rem] ${item.bg} ${item.color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                <item.icon size={36} strokeWidth={2.5} />
              </div>
              <div className="space-y-3">
                <h4 className="font-black text-xl tracking-tight">{item.title}</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed uppercase tracking-tighter opacity-80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Global Stats Mockup */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 border-t border-[var(--store-border)]/50 pt-20">
          {[
            { label: "Partnered Brands", value: "250+" },
            { label: "Monthly Redirects", value: "1.2M" },
            { label: "Active Stores", value: "45k+" },
            { label: "Trust Score", value: "99.9%" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1 group">
               <span className="text-3xl md:text-4xl font-black text-[var(--store-foreground)] group-hover:text-[var(--store-primary)] transition-colors">{stat.value}</span>
               <span className="text-[10px] uppercase font-black tracking-[0.2em] text-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
