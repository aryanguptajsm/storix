import React from "react";
import { createClient } from "@/lib/supabase-server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Plus, 
  MousePointerClick, 
  Package, 
  TrendingUp,
  ExternalLink,
  Sparkles,
  Zap,
  ArrowRight,
  Settings,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CopyLinkButton } from "@/components/dashboard/CopyLinkButton";
import Image from "next/image";
import { DashboardEntrance, AnimatedSection } from "@/components/dashboard/DashboardEntrance";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) {
    redirect("/login");
  }

  // Check if database is initialized
  const { error: probeError } = await supabase
    .from("products")
    .select("id")
    .limit(1);

  let configError = false;
  let productsTableExists = true;

  if (probeError && probeError.code === "PGRST205") {
    productsTableExists = false;
  } else if (probeError && probeError.message.includes("Invalid API key")) {
    configError = true;
  }

  let profile = null;
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  profile = existingProfile;

  // Auto-initialize profile
  if (!profile && !configError && productsTableExists) {
    const { data: newProfile, error: initError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: (user.email?.split("@")[0].toLowerCase() || "user") + "_" + user.id.slice(0, 5),
        store_name: (user.email?.split("@")[0] || "My") + "'s Store",
      })
      .select()
      .single();
    
    if (!initError) profile = newProfile;
  }

  // Fetch stats and recent products in parallel
  const [productsRes, clicksRes, recentRes] = await Promise.all([
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("clicks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5)
  ]);

  if (productsRes.error || clicksRes.error) {
     if (productsRes.error?.message.includes("key") || clicksRes.error?.message.includes("key")) {
       configError = true;
     }
  }

  const stats = {
    totalProducts: productsRes.count || 0,
    totalClicks: clicksRes.count || 0,
  };
  const recentProducts = recentRes.data || [];

  return (
    <div className="space-y-10 pb-20 relative min-h-screen">
      {/* Background Layering */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[#020205]" />
      <div className="fixed inset-0 grid-bg-premium opacity-40 pointer-events-none -z-10" />
      <div className="fixed inset-0 grid-bg-dots opacity-20 pointer-events-none -z-10" />
      <div className="fixed inset-0 noise-subtle pointer-events-none -z-10" />
      
      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-breathing" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-drift-slow" />
      
      <DashboardEntrance />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {configError && (
            <AnimatedSection delay={0.1}>
              <div className="p-8 rounded-[2.5rem] border border-warning/30 bg-warning/5 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8 animate-pulse-glow shadow-2xl shadow-warning/10 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-warning/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-warning/20 flex items-center justify-center text-warning shadow-lg shadow-warning/20 border border-warning/20">
                    <Settings size={32} className="animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white italic tracking-tight">Configuration Required</h3>
                    <p className="text-muted/70 max-w-md font-medium leading-relaxed">Your database nodes are disconnected. Re-establish connection via environment variable mapping.</p>
                  </div>
                </div>
                <Link href="https://supabase.com/dashboard/project/lnckyrvxehzcjvyultkd/settings/api" target="_blank" className="w-full md:w-auto relative z-10">
                   <Button className="w-full md:w-auto h-14 px-8 gap-3 bg-warning hover:bg-warning-dark shadow-xl shadow-warning/20 text-black font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95">
                     <ExternalLink size={18} />
                     Access API Console
                   </Button>
                </Link>
              </div>
            </AnimatedSection>
          )}

          {!configError && !productsTableExists && (
            <AnimatedSection delay={0.1}>
              <div className="p-8 rounded-[2.5rem] border border-danger/30 bg-danger/5 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8 animate-pulse-glow shadow-2xl shadow-danger/10 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-danger/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-danger/20 flex items-center justify-center text-danger shadow-lg shadow-danger/20 border border-danger/20">
                    <Zap size={32} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white italic tracking-tight">System Offline</h3>
                    <p className="text-muted/70 max-w-md font-medium leading-relaxed">Your merchant grid database has not been initialized. Execute the SQL protocol to begin.</p>
                  </div>
                </div>
                <Link href="/dashboard/setup" className="w-full md:w-auto relative z-10">
                   <Button variant="danger" className="w-full md:w-auto h-14 px-8 gap-3 bg-danger hover:bg-danger-dark shadow-xl shadow-danger/20 font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95">
                     <ArrowRight size={18} />
                     Run Setup Script
                   </Button>
                </Link>
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/5">
                    Terminal Active
                  </div>
                  <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_10px_#10B981] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-[0.9] italic">
                    Welcome back, <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-white to-secondary-light uppercase not-italic tracking-tighter block mt-2 animate-mesh-flow">
                       {profile?.store_name || "Agent"}
                    </span>
                  </h1>
                </div>
                <p className="text-sm md:text-base text-white/30 font-medium max-w-xl leading-relaxed">
                  Your affiliate commerce network is operating at <span className="text-primary-light/80 shadow-primary/20">peak efficiency</span>. Analyzing global intercept nodes...
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <CopyLinkButton username={profile?.username || ""} />
                <Link href={`/store/${profile?.username?.toLowerCase()}`} target="_blank" className="flex-1 lg:flex-initial">
                  <Button variant="secondary" className="w-full gap-2.5 bg-white/[0.03] border-white/5 hover:bg-white/[0.08] group h-12 px-6 text-xs font-black uppercase tracking-widest rounded-xl transition-all hover:glow-primary">
                    <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Live Store
                  </Button>
                </Link>
                <Link href="/dashboard/add-product" className="w-full sm:w-auto flex-1 lg:flex-initial">
                  <Button className="w-full gap-2.5 shadow-2xl shadow-primary/20 group h-12 px-8 text-xs font-black uppercase tracking-[0.2em] rounded-xl hover-lift bg-primary hover:bg-primary-light transition-all">
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                    New Unit
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedSection delay={0.4}>
            <div className="perspective-1000 group h-full">
              <Card size="medium" variant="glass" className="relative overflow-hidden group hover:glow-primary transition-all duration-700 h-full animate-glow-border border-beam">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Package size={80} />
                </div>
                <div className="absolute top-[-40px] right-[-40px] w-60 h-60 icon-glow-primary rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
                  <CardTitle className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted/50 font-display">
                    Fleet Capacity
                  </CardTitle>
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-xl shadow-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <Package className="w-4 h-4" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6 relative z-10">
                  <div className="text-6xl font-extrabold text-white tracking-tighter group-hover:scale-105 transition-transform duration-700 origin-left italic">
                    {stats.totalProducts}
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[70%] animate-shimmer" />
                    </div>
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">Active nodes</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="perspective-1000 group h-full">
              <Card size="medium" variant="glass" className="relative overflow-hidden group hover:glow-secondary transition-all duration-700 h-full animate-glow-border">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <MousePointerClick size={80} />
                </div>
                <div className="absolute top-[-40px] right-[-40px] w-60 h-60 icon-glow-secondary rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
                  <CardTitle className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted/50 font-display">
                    Engagement Intel
                  </CardTitle>
                  <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary shadow-xl shadow-secondary/10 border border-secondary/20 group-hover:scale-110 transition-transform duration-500">
                    <MousePointerClick className="w-4 h-4" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6 relative z-10">
                  <div className="text-6xl font-extrabold text-white tracking-tighter group-hover:scale-105 transition-transform duration-700 origin-left italic">
                    {stats.totalClicks}
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[45%] animate-shimmer" />
                    </div>
                    <span className="text-[9px] font-black text-secondary uppercase tracking-widest">Intercepts</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="perspective-1000 group h-full">
              <Card size="medium" variant="glass" className="relative overflow-hidden group hover:glow-accent transition-all duration-700 h-full animate-glow-border">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <TrendingUp size={80} />
                </div>
                <div className="absolute top-[-40px] right-[-40px] w-60 h-60 icon-glow-accent rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
                  <CardTitle className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted/50 font-display">
                    Revenue Stream
                  </CardTitle>
                  <div className="p-2.5 rounded-xl bg-accent/10 text-accent shadow-xl shadow-accent/10 border border-accent/20 group-hover:scale-110 transition-transform duration-500">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6 relative z-10">
                  <div className="text-6xl font-extrabold text-white tracking-tighter group-hover:scale-105 transition-transform duration-700 origin-left italic">
                    $0.00
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent w-[20%] animate-shimmer" />
                    </div>
                    <span className="text-[9px] font-black text-accent uppercase tracking-widest">Pending Sync</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.7}>
          <Card size="medium" variant="premium" className="shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group transition-all duration-1000 hover:border-primary/40 focus-within:border-primary/40">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-black/40 flex items-center justify-center text-primary border border-primary/20 shadow-2xl transition-all group-hover:scale-110 group-hover:rotate-6 duration-700 relative overflow-hidden animate-glow-pulse">
                     <div className="absolute inset-0 grid-bg-dots opacity-30" />
                     <Globe size={40} className="relative z-10" />
                  </div>
                </div>
                <div className="space-y-3 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <h3 className="text-3xl md:text-4xl font-extrabold text-white italic tracking-tighter">Main Grid Active</h3>
                      <div className="flex justify-center md:justify-start">
                         <span className="px-4 py-1.5 rounded-full bg-success/10 text-success text-[10px] font-black uppercase tracking-[0.2em] border border-success/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">Sync Healthy</span>
                      </div>
                  </div>
                  <p className="text-base text-white/50 font-medium max-w-lg leading-relaxed">
                     Your flagship storefront is broadcasting at maximum signal strength. All product nodes are verified and operational.
                  </p>
                </div>
              </div>
              
              <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full lg:w-auto p-4 px-8 rounded-xl bg-black/60 border border-white/10 font-mono text-lg text-primary-light flex items-center justify-between gap-8 shadow-inner hover:border-primary/30 transition-all duration-500">
                   <span className="opacity-20">/store/</span>
                   <span className="font-black tracking-tight">{profile?.username || "..."}</span>
                </div>
                <Link href={`/store/${profile?.username}`} target="_blank" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto h-16 rounded-2xl bg-primary px-10 font-black uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(16,185,129,0.3)] transition-all hover:bg-primary-light hover:scale-105 active:scale-95 group text-xs">
                     <span>Enter Station</span>
                     <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform duration-700" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatedSection delay={0.8}>
            <Card size="medium" variant="glass" className="hover:border-white/10 transition-all duration-700 overflow-hidden group h-full">
              <CardHeader className="border-b border-white/5 flex flex-row items-center justify-between p-8">
                <CardTitle className="text-xl font-extrabold italic tracking-tight">Recent Inventory Hangar</CardTitle>
                <Link href="/dashboard/products">
                  <Button variant="ghost" size="sm" className="text-[9px] text-primary-light hover:text-primary font-black uppercase tracking-[0.2em] border border-white/5 rounded-xl px-4">View All</Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                {recentProducts.length === 0 ? (
                  <div className="text-sm text-muted text-center py-28 flex flex-col items-center gap-6">
                    <div className="w-20 h-20 rounded-[2rem] bg-surface-light flex items-center justify-center opacity-50 border border-white/5 animate-float">
                      <Zap className="w-10 h-10" />
                    </div>
                    <p className="max-w-[280px] font-medium text-white/30 text-lg italic tracking-tight uppercase">No tactical data payload detected.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {recentProducts.map((product) => (
                      <div key={product.id} className="p-6 flex items-center justify-between group/item hover:bg-white/[0.04] transition-all cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-6 relative z-10">
                          <div className="w-14 h-14 rounded-2xl bg-white overflow-hidden flex-shrink-0 relative border border-white/10 group-hover/item:scale-110 transition-transform duration-500 shadow-xl">
                            {product.image_url ? (
                              <Image src={product.image_url} alt="" fill className="object-contain p-3" sizes="56px" />
                            ) : (
                              <Package className="w-full h-full p-4 text-muted/20" />
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-lg font-black text-foreground line-clamp-1 group-hover/item:text-primary transition-colors tracking-tight">{product.title}</span>
                            <span className="text-[10px] text-muted uppercase font-black tracking-[0.2em] flex items-center gap-2">
                               <Globe size={12} className="text-secondary" /> {product.platform}
                            </span>
                          </div>
                        </div>
                        <div className="text-right relative z-10">
                          <div className="text-2xl font-black text-secondary-light tracking-tighter italic">{product.price || "N/A"}</div>
                          <div className="text-[9px] text-muted font-black uppercase tracking-widest">{new Date(product.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.9}>
            <Card size="medium" variant="glass" className="hover:border-white/10 transition-all duration-700 h-full group">
              <CardHeader className="border-b border-white/5 p-8">
                <CardTitle className="text-xl font-extrabold italic tracking-tight">Strategic Intelligence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-8 p-8">
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-start gap-6 hover:border-primary/30 transition-all group/tip cursor-default hover:bg-primary/[0.03] animate-glow-border relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover/tip:opacity-[0.05]">
                    <Plus size={80} />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover/tip:rotate-12 transition-transform border border-primary/20 shadow-xl shadow-primary/10">
                    <Plus className="w-7 h-7" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-black text-xl text-foreground mb-2 italic">Scale Inventory Nodes</h4>
                    <p className="text-base text-muted/60 leading-relaxed font-medium">
                      Stations with <span className="text-primary-light font-bold">12+ active units</span> maintain a 300% higher intercept priority.
                    </p>
                  </div>
                </div>
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-start gap-6 hover:border-secondary/30 transition-all group/tip cursor-default hover:bg-secondary/[0.03] animate-glow-border relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover/tip:opacity-[0.05]">
                    <Sparkles size={80} />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary group-hover/tip:rotate-12 transition-transform border border-secondary/20 shadow-xl shadow-secondary/10">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-black text-xl text-foreground mb-2 italic">Refine Intercept Signals</h4>
                    <p className="text-base text-muted/60 leading-relaxed font-medium">
                      Optimize your <span className="text-secondary-light font-bold">AI broadcast signals</span> with tactical keywords for maximum reach.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
