"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { 
  ShoppingBag, 
  ExternalLink, 
  ArrowRight, 
  Package, 
  Sparkles,
  Zap,
  Tag,
  Share2,
  ChevronRight,
  TrendingUp,
  Award,
  Star
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { StoreSkeleton } from "@/components/ui/StoreSkeleton";

// New Premium Components
import { ProductCard } from "@/components/store/ProductCard";
import { StoreHeader } from "@/components/store/StoreHeader";
import { TrustSection } from "@/components/store/TrustSection";

interface Product {
  id: string;
  title: string;
  image_url: string;
  platform: string;
  price: string;
  original_price?: string;
  discount_percentage?: string;
  original_url: string;
  user_id?: string;
}

interface Profile {
  store_name: string;
  store_description: string;
  username: string;
  id: string;
  theme: "default" | "midnight" | "minimalist" | "neon";
}

export default function PublicStorePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackingId, setTrackingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadStore() {
      const supabase = createClient();
      try {
        console.log(`[STORE_FETCH] Attempting to load coordinates for: /${username}`);
        
        // Fetch profile - Normalize username to lowercase for query robustness
        const normalizedUsername = (username as string).toLowerCase();

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, store_name, store_description, username, theme")
          .eq("username", normalizedUsername)
          .single();

        if (profileError) {
          console.error("[STORE_FETCH_ERROR] Profile acquisition failure:", profileError);
          // Distinguish between Not Found (PGRST116) and other DB errors
          if (profileError.code === "PGRST116") {
             console.warn("[STORE_FETCH] Logic Error: Zero profiles matched coordinates.");
          }
          setLoading(false);
          return;
        }

        if (!profileData) {
          console.warn("[STORE_FETCH] Null mapping: Profile exists but data is void.");
          setLoading(false);
          return;
        }

        setProfile(profileData);

        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*")
          .eq("user_id", profileData.id)
          .order("created_at", { ascending: false });

        if (productsError) throw productsError;
        setProducts(productsData || []);
      } catch (err) {
        console.error("Error loading store:", err);
        toast.error("Failed to load store data.");
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      loadStore();
    }
  }, [username]);

  const handleBuyNow = async (product: Product) => {
    setTrackingId(product.id);
    try {
      const res = await fetch("/api/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          userId: profile?.id,
        }),
      });
      const data = await res.json();
      if (data.redirectUrl) {
        window.open(data.redirectUrl, "_blank");
      } else {
        window.open(product.original_url, "_blank");
      }
    } catch (err) {
      window.open(product.original_url, "_blank");
    } finally {
      setTrackingId(null);
    }
  };

  if (loading) {
    return <StoreSkeleton />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[var(--store-background)] flex flex-col items-center justify-center p-6 text-center">
        <div className="glass-morphism-dark p-12 rounded-[3rem] border border-[var(--store-border)] max-w-lg w-full shadow-2xl animate-fade-in">
          <div className="w-20 h-20 bg-[var(--store-primary)]/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-[var(--store-primary)] animate-float">
            <ShoppingBag size={40} />
          </div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
            Store Not Found
          </h1>
          <p className="text-muted text-lg mb-4 leading-relaxed">
            The coordinates <span className="text-[var(--store-primary)] font-bold">/{username}</span> don't match any active storefront in our database.
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Button size="lg" className="w-full h-14 rounded-2xl bg-[var(--store-primary)] hover:bg-[var(--store-primary)]/90 text-white shadow-xl shadow-[var(--store-primary)]/20 text-base font-bold">
                Back to Home Base
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider initialTheme={profile.theme}>
      <div className="min-h-screen bg-[var(--store-background)] text-[var(--store-foreground)] font-sans selection:bg-[var(--store-primary)]/20 scroll-smooth">
      
      <StoreHeader storeName={profile.store_name} />

      {/* Hero Section - The Wow Factor */}
      <section className="relative overflow-hidden bg-[var(--store-card)] border-b border-[var(--store-border)] pb-20 pt-12 md:py-24">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--store-primary)]/5 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--store-primary)]/10 rounded-full blur-[120px] animate-float pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism-premium text-[var(--store-primary)] text-xs font-black uppercase tracking-[0.2em] animate-fade-in shadow-sm">
              <Sparkles size={16} className="text-yellow-400 fill-yellow-400" />
              Official Influencer Storefront
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-[0.9] animate-slide-up">
                Discover the <br />
                <span className="text-[var(--store-primary)] inline-block hover:scale-110 transition-transform cursor-default">Best Deals</span> <br />
                Curated for You.
              </h1>
              <p className="text-xl text-slate-500 max-w-xl font-medium leading-relaxed animate-fade-in">
                {profile.store_description || "Step into our high-performance affiliate ecosystem. Every single product has been hand-vetted for maximum quality and value."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up pt-4">
               <Link href="#all-items">
                  <Button className="h-16 px-10 rounded-[2rem] bg-[var(--store-primary)] hover:bg-[var(--store-primary)]/90 text-white shadow-2xl shadow-[var(--store-primary)]/30 font-black text-xs uppercase tracking-[0.2em] gap-3 group">
                    Start Shopping
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </Button>
               </Link>
               <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-muted">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-[var(--store-card)] bg-slate-200 overflow-hidden shadow-sm">
                         <div className="w-full h-full bg-gradient-to-tr from-slate-300 to-slate-100" />
                      </div>
                    ))}
                  </div>
                  <span>Trusted by 5k+ shoppers</span>
               </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl animate-scale-in">
            <div className="relative aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] border border-[var(--store-border)] bg-gradient-to-br from-white to-slate-100 p-8">
              <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-[var(--store-primary)]/10 to-[var(--store-primary)]/5 flex flex-col items-center justify-center gap-8 border border-white/50 backdrop-blur-sm relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="relative">
                    <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center animate-float scale-110 group-hover:rotate-6 transition-transform">
                      <ShoppingBag size={80} className="text-[var(--store-primary)] opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-16 h-1 w-20 bg-gradient-to-r from-[var(--store-primary)] to-transparent rounded-full opacity-20 animate-pulse" />
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 px-6 py-3 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center gap-3 animate-slide-up">
                       <Zap size={24} className="text-yellow-500 fill-yellow-500" />
                       <div className="flex flex-col">
                          <span className="text-xs font-black tracking-tighter">LIVE PRICE FEED</span>
                          <span className="text-[10px] uppercase font-bold text-muted">Active Tracking</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col items-center gap-1 text-center">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--store-primary)] mt-2">Verified Store Quality</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Grid */}
      <main id="all-items" className="max-w-7xl mx-auto px-4 py-20 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-[var(--store-primary)] font-black uppercase text-[10px] tracking-[0.3em]">
               <TrendingUp size={16} />
               Trending Now
             </div>
             <h2 className="text-4xl md:text-5xl font-black flex items-center gap-3 tracking-tighter">
                Most Wanted Items
             </h2>
          </div>
          <div className="flex items-center gap-6 pb-2 border-b border-[var(--store-border)]">
             {['All Items', 'Best Sellers', 'New Arrivals'].map((tab, idx) => (
                <button key={tab} className={`text-xs font-black uppercase tracking-[0.2em] transition-all pb-2 relative group ${idx === 0 ? 'text-[var(--store-primary)]' : 'text-muted hover:text-[var(--store-foreground)]'}`}>
                   {tab}
                   {idx === 0 && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--store-primary)]" />}
                </button>
             ))}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-32 bg-[var(--store-card)] rounded-[4rem] border-4 border-dashed border-[var(--store-border)] animate-fade-in group">
            <div className="w-24 h-24 bg-[var(--store-primary)]/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
               <Package className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-3xl font-black mb-4">Inventory Refueling...</h3>
            <p className="text-slate-500 text-lg max-w-sm mx-auto font-medium">Our latest discovery is currently being cataloged. Check back in a flash!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onBuyNow={handleBuyNow}
                isLoading={trackingId === product.id}
              />
            ))}
          </div>
        )}
      </main>

      <TrustSection />

      {/* Footer - Elegant & Bold */}
      <footer className="bg-[var(--store-card)] border-t border-[var(--store-border)] py-24 relative overflow-hidden group">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[var(--store-primary)]/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center space-y-12">
          <div className="flex items-center gap-3 group/foot cursor-pointer">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center transition-all group-hover/foot:bg-[var(--store-primary)]">
               <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter leading-none">{profile.store_name}</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-muted opacity-40">The Future of Affiliate Commerce</span>
            <div className="flex items-center gap-3 text-muted font-bold text-xs uppercase tracking-widest mt-4">
              Curated with <span className="text-[var(--store-primary)] animate-pulse inline-block">❤️</span> via <span className="text-[var(--store-foreground)] font-black tracking-normal">Storix</span>
            </div>
          </div>

          <Link href="/">
            <div className="group relative">
               <div className="absolute inset-0 bg-[var(--store-primary)]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative inline-flex items-center gap-3 px-8 py-4 rounded-[2rem] bg-[var(--store-background)] border border-[var(--store-border)] hover:border-[var(--store-primary)]/40 hover:bg-[var(--store-primary)]/10 transition-all text-sm font-black text-muted-foreground group cursor-pointer shadow-sm">
                 <Sparkles size={18} className="text-[var(--store-primary)] group-hover:rotate-12 transition-transform" />
                 Launch your own storefront with Storix
                 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
          </Link>

          <div className="pt-12 border-t border-[var(--store-border)] w-full flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
             <span className="text-[10px] font-bold uppercase tracking-widest text-muted">© 2026 {profile.store_name} All Rights Reserved</span>
             <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
                <a href="#" className="hover:text-[var(--store-primary)] transition-colors">Privacy Ops</a>
                <a href="#" className="hover:text-[var(--store-primary)] transition-colors">Contact Base</a>
             </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}</style>
      </div>
    </ThemeProvider>
  );
}
