"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { 
  ShoppingBag, 
  ExternalLink, 
  ArrowRight, 
  Package, 
  Sparkles,
  Zap,
  Tag,
  Share2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface Product {
  id: string;
  title: string;
  image_url: string;
  platform: string;
  price: string;
  original_url: string;
  user_id: string;
}

interface Profile {
  store_name: string;
  store_description: string;
  username: string;
  id: string;
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
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, store_name, store_description, username")
          .eq("username", username)
          .single();

        if (profileError || !profileData) {
          toast.error("Store not found.");
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
          userId: profile?.id, // Track click for this store owner
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
    return (
      <div className="min-h-screen bg-[#0F0F13] flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse-glow" />
          <div className="relative animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0F0F13] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black text-white mb-4">404: Station Offline</h1>
        <p className="text-muted max-w-md mb-8">This store hasn't been deployed yet or the link is expired.</p>
        <Link href="/">
          <Button>Back to Command Center</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F13] text-white selection:bg-primary/30 pb-24">
      {/* Dynamic Header */}
      <header className="relative py-20 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="w-20 h-20 rounded-[2rem] gradient-primary p-0.5 shadow-2xl shadow-primary/20 mb-8 animate-bounce-subtle">
            <div className="w-full h-full rounded-[1.9rem] bg-[#0F0F13] flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-primary-light" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            {profile.store_name}
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            {profile.store_description || "Curated collection of high-performance products."}
          </p>
          <div className="mt-8 flex gap-3">
            <Button variant="secondary" className="gap-2 rounded-full px-6 bg-white/5 border-white/10 hover:bg-white/10">
              <Share2 size={16} />
              Share Store
            </Button>
            <div className="h-10 w-[1px] bg-white/5 mx-2" />
            <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F0F13] bg-surface-light flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                 </div>
               ))}
               <div className="w-10 h-10 rounded-full border-2 border-[#0F0F13] bg-surface-light flex items-center justify-center text-[10px] font-bold text-muted">
                 +12
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-6xl mx-auto py-20 px-6">
        {products.length === 0 ? (
          <div className="text-center py-32 glass rounded-3xl border border-dashed border-white/10">
            <Package className="w-12 h-12 text-muted/20 mx-auto mb-4" />
            <p className="text-muted">No products launched yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group glass border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden flex flex-col shadow-lg hover:shadow-primary/5">
                <div className="relative aspect-square bg-white flex items-center justify-center p-6 overflow-hidden">
                   {product.image_url ? (
                     <Image
                       src={product.image_url}
                       alt={product.title}
                       fill
                       className="object-contain group-hover:scale-110 transition-transform duration-700 p-6"
                     />
                   ) : (
                     <Package className="w-12 h-12 text-muted/20" />
                   )}
                   <div className="absolute top-3 left-3 px-2 py-1 rounded-md glass border-white/10 text-[9px] font-black text-foreground uppercase tracking-widest z-10 shadow-sm">
                     {product.platform}
                   </div>
                   <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Tag size={12} className="text-primary-light" />
                    <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">Verified Affiliate</span>
                  </div>
                  <h3 className="font-bold text-lg line-clamp-2 leading-tight mb-4 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="mt-auto space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-black text-white tracking-tighter">
                        {product.price || "Check Price"}
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/5 text-secondary animate-pulse-glow">
                        <Zap size={14} fill="currentColor" />
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full h-11 rounded-xl bg-primary hover:bg-primary-light shadow-xl shadow-primary/20 gap-2 font-bold group/btn"
                      onClick={() => handleBuyNow(product)}
                      disabled={trackingId === product.id}
                    >
                      {trackingId === product.id ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Redirecting...
                        </span>
                      ) : (
                        <>
                          <span>Grab Deal</span>
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer / Badge */}
      <footer className="py-20 flex flex-col items-center gap-6 border-t border-white/5">
        <div className="flex items-center gap-2 text-muted/40 font-bold text-xs uppercase tracking-[0.3em]">
          Powered by
          <span className="text-primary text-sm font-black tracking-normal uppercase">Storix</span>
        </div>
        <Link href="/">
          <div className="px-4 py-2 rounded-full glass border-white/10 hover:border-primary/30 transition-all text-xs font-bold text-muted flex items-center gap-2 group cursor-pointer">
            <Sparkles size={14} className="text-primary group-hover:rotate-12 transition-transform" />
            Build your own affiliate empire
            <ChevronRight size={14} />
          </div>
        </Link>
      </footer>

      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function ChevronRight({ size = 16 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
