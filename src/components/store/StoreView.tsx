"use client";

import React from "react";
import {
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Package,
  ChevronRight,
  ArrowUp,
  Search,
} from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProductCard } from "@/components/store/ProductCard";
import { StoreHeader } from "@/components/store/StoreHeader";
import { TrustSection } from "@/components/store/TrustSection";
import { Button } from "@/components/ui/Button";

interface Product {
  id: string;
  title: string;
  image_url: string;
  platform: string;
  price: string;
  original_price?: string;
  discount_percentage?: string;
  original_url: string;
}

interface Profile {
  store_name: string;
  store_description: string;
  username: string;
  id: string;
  theme: "default" | "midnight" | "minimalist" | "neon" | "amazon" | "flipkart";
  store_logo?: string | null;
}

interface StoreViewProps {
  profile: Profile;
  products: Product[];
}

export function StoreView({ profile, products }: StoreViewProps) {
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBuyNow = (product: Product) => {
    // Open the product URL IMMEDIATELY — no waiting for the API
    window.open(product.original_url, "_blank");

    // Fire-and-forget: track the click in the background
    fetch("/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        userId: profile?.id,
        redirectUrl: product.original_url,
      }),
    }).catch(() => {});
  };

  return (
    <ThemeProvider initialTheme={profile.theme}>
      <div className="min-h-screen bg-[var(--store-background)] text-[var(--store-foreground)] font-sans selection:bg-[var(--store-primary)]/20 scroll-smooth">

      <StoreHeader storeName={profile.store_name} storeLogo={profile.store_logo} />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-4 sm:px-6 overflow-hidden bg-[var(--store-card)]">
        {/* Background effects */}
        {profile.theme !== 'amazon' && profile.theme !== 'flipkart' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--store-primary)]/[0.03] to-transparent" />
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--store-primary)]/[0.06] rounded-full blur-[120px] animate-morph" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[var(--store-primary)]/[0.04] rounded-full blur-[120px] animate-float" />
            <div className="absolute inset-0 grid-bg-subtle opacity-20" />
            <div className="absolute inset-0 dot-grid opacity-30" />
            
            {/* 3D Floating Icons */}
            <div className="absolute top-1/4 left-[10%] opacity-20 animate-float-slow hidden md:block">
              <ShoppingBag className="w-16 h-16 text-[var(--store-primary)] rotate-12" />
            </div>
            <div className="absolute bottom-1/4 right-[10%] opacity-20 animate-float-delayed hidden md:block">
              <Sparkles className="w-20 h-20 text-[var(--store-primary)] -rotate-12" />
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism-premium mb-6 md:mb-8 animate-fade-in shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[var(--store-primary)]" />
            <span className="text-[10px] md:text-xs font-bold text-[var(--store-foreground)]/60 tracking-widest uppercase">Curated Collection</span>
          </div>

          <h1 className="text-[clamp(2rem,6vw,5rem)] font-black tracking-tight mb-5 md:mb-7 leading-[1.1] animate-slide-up perspective-1000">
            <span className="block text-[var(--store-foreground)] hover-tilt inline-block preserve-3d">{profile.store_name}</span>
            <span className="text-gradient block text-shadow-glow">Affiliate Hub</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-[var(--store-foreground)]/40 mb-8 md:mb-12 animate-fade-in leading-relaxed px-4 font-medium">
            {profile.store_description || "Welcome to my hand-picked collection of premium products. Browse through the best deals curated just for you."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link href="#products">
              <Button className="h-14 px-8 md:px-10 rounded-2xl bg-[var(--store-primary)] hover:bg-[var(--store-primary)]/90 text-white shadow-xl shadow-[var(--store-primary)]/25 font-bold text-xs uppercase tracking-[0.15em] gap-2.5 group hover-shine">
                Start Shopping
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </Link>
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[var(--store-foreground)]/30">
              <div className="flex -space-x-2.5">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 md:w-9 md:h-9 rounded-full border-[3px] border-[var(--store-card)] bg-gradient-to-br from-slate-200 to-slate-100 shadow-sm" />
                ))}
              </div>
              <span className="text-[10px] md:text-xs">Trusted by 5k+ shoppers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* ─── Product Grid ─── */}
      <section id="products" className="py-16 md:py-28 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10 md:mb-14">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="h-0.5 w-10 bg-[var(--store-primary)] rounded-full" />
                <span className="text-[var(--store-primary)] font-bold text-[10px] uppercase tracking-[0.25em]">Featured Gear</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[var(--store-foreground)] tracking-tight">Prime Selection</h2>
            </div>
            <p className="text-[var(--store-foreground)]/30 text-sm max-w-sm md:text-right font-medium">
              Every item has been vetted for quality, performance, and value.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-4 md:gap-6 pb-2 border-b border-[var(--store-border)] mb-10 overflow-x-auto no-scrollbar whitespace-nowrap">
            {['All Items', 'Best Sellers', 'New Arrivals'].map((tab, idx) => (
              <button key={tab} className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] transition-all pb-2 relative ${idx === 0 ? 'text-[var(--store-primary)]' : 'text-[var(--store-foreground)]/30 hover:text-[var(--store-foreground)]/60'}`}>
                {tab}
                {idx === 0 && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--store-primary)] rounded-full" />}
              </button>
            ))}
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24 md:py-36 bg-[var(--store-card)]/30 rounded-[3rem] border-2 border-dashed border-[var(--store-border)] animate-fade-in group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--store-primary)]/[0.02] to-transparent pointer-events-none" />
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[var(--store-primary)]/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-700 shadow-2xl shadow-[var(--store-primary)]/5">
                <Package className="w-10 h-10 md:w-12 md:h-12 text-[var(--store-primary)]/40" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">Fleet Resupply in Progress</h3>
              <p className="text-[var(--store-foreground)]/40 text-sm md:text-lg max-w-md mx-auto font-medium px-8 leading-relaxed">
                Our scouts are currently vetting new gear for this collection. Stand by for the next drop!
              </p>
              <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-muted animate-pulse">
                <Search size={12} />
                Scanning for premium deals...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-10">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                >
                  <ProductCard
                    product={product}
                    onBuyNow={handleBuyNow}
                    priority={index < 4}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[70] w-14 h-14 rounded-2xl bg-[var(--store-primary)] text-white shadow-2xl shadow-[var(--store-primary)]/40 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-1 active:scale-95 group ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-6 h-6 group-hover:animate-bounce-slow" />
      </button>

      {/* ─── Footer ─── */}
      <footer className="bg-[var(--store-card)] border-t border-[var(--store-border)] py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--store-primary)]/15 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-8 md:space-y-10">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-10 h-10 bg-[var(--store-primary)] rounded-xl flex items-center justify-center transition-all group-hover:shadow-lg group-hover:shadow-[var(--store-primary)]/20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter">{profile.store_name}</span>
          </div>

          <Link href="/">
            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-[var(--store-primary)]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[var(--store-background)] border border-[var(--store-border)] hover:border-[var(--store-primary)]/30 hover:bg-[var(--store-primary)]/5 transition-all text-sm font-bold text-[var(--store-foreground)]/40 shadow-sm">
                <Sparkles size={16} className="text-[var(--store-primary)] group-hover:rotate-12 transition-transform" />
                Launch your own storefront with Storix
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          <div className="pt-8 border-t border-[var(--store-border)] w-full flex flex-col md:flex-row items-center justify-between gap-4 text-[var(--store-foreground)]/20">
            <span className="text-[10px] font-semibold uppercase tracking-widest">© 2026 {profile.store_name}. All Rights Reserved</span>
            <div className="flex items-center gap-6 text-[10px] font-semibold uppercase tracking-widest">
              <a href="#" className="hover:text-[var(--store-primary)] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[var(--store-primary)] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      </div>
    </ThemeProvider>
  );
}
