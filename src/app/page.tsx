"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  ShoppingBag,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Layout,
  TrendingUp,
  Globe,
  Shield,
  Star,
  Layers,
  MousePointerClick,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 25;
    const moveY = (clientY - window.innerHeight / 2) / 25;
    setMousePos({ x: moveX, y: moveY });
  };

  useEffect(() => {
    async function checkAuth() {
      const user = await getUser();
      if (user) {
        router.push("/dashboard");
      } else {
        setChecking(false);
      }
    }
    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse-glow" />
          <div className="relative animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full shadow-lg shadow-primary/20" />
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Zap,
      title: "Instant Web Scraping",
      desc: "Connect your Amazon or Flipkart links. We automatically pull HD images and real-time pricing.",
      gradient: "from-amber-500 to-orange-600",
      shadow: "shadow-amber-500/20",
    },
    {
      icon: Sparkles,
      title: "Gemini AI Titles",
      desc: "Built-in AI optimizes your product titles for higher click-through rates and better SEO.",
      gradient: "from-violet-500 to-purple-600",
      shadow: "shadow-violet-500/20",
    },
    {
      icon: TrendingUp,
      title: "Click Analytics",
      desc: "Track every conversion. Know exactly which products are performing and optimize for revenue.",
      gradient: "from-cyan-500 to-blue-600",
      shadow: "shadow-cyan-500/20",
    },
  ];

  const steps = [
    { num: "01", title: "Paste a Link", desc: "Drop any Amazon or Flipkart product URL", icon: MousePointerClick },
    { num: "02", title: "AI Optimizes", desc: "Gemini generates the perfect title & tags", icon: Sparkles },
    { num: "03", title: "Publish & Earn", desc: "Share your store link and earn from every click", icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black selection:bg-primary/30 selection:text-white overflow-x-hidden noise-overlay">


      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 group-hover:scale-110 transition-all duration-300">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent tracking-tighter">
              Storix
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {["Features", "How it Works", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {item}
              </a>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2" />
            <Link href="/login">
              <Button variant="ghost" className="text-white/60 hover:text-white">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="ml-1 rounded-full px-6 shadow-lg shadow-primary/25">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white/60">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="rounded-full px-4">Start</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">

        {/* ═══════ HERO ═══════ */}
        <section 
          className="relative pt-32 md:pt-44 pb-20 md:pb-32 px-4 sm:px-6 overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          {/* Animated Background Layers */}
          <div className="absolute inset-0 -z-10">
            {/* 1. Base Mesh Flow */}
            <div className="absolute inset-0 mesh-primary opacity-40 animate-mesh-flow" />
            
            {/* 2. Interactive Grid with Mouse Glow */}
            <div 
              className="absolute inset-0 grid-bg-subtle opacity-30 transition-opacity duration-500"
              style={{
                maskImage: `radial-gradient(circle at ${50 + mousePos.x/2}% ${50 + mousePos.y/2}%, black, transparent 80%)`,
                WebkitMaskImage: `radial-gradient(circle at ${50 + mousePos.x/2}% ${50 + mousePos.y/2}%, black, transparent 80%)`,
              }}
            />
            
            {/* 3. Sweeping Light Beams */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-[-20%] w-[140%] h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-beam-sweep" />
              <div className="absolute bottom-[20%] left-[-20%] w-[140%] h-[2px] bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-beam-sweep animation-delay-2000" />
            </div>

            {/* 4. Drifting Orbs (Enhanced) */}
            <div 
              className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-morph transition-transform duration-700 ease-out"
              style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
            />
            <div 
              className="absolute bottom-10 right-[10%] w-[450px] h-[450px] bg-accent/8 rounded-full blur-[120px] animate-morph animation-delay-400 transition-transform duration-700 ease-out"
              style={{ transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)` }}
            />
            
            {/* 5. Floating 3D Elements with Parallax */}
            <div 
              className="absolute top-1/3 right-[12%] opacity-20 animate-float-slow hidden lg:block transition-transform duration-500 ease-out"
              style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px) rotate(12deg)` }}
            >
              <Zap className="w-32 h-32 text-primary filter drop-shadow(0 0 20px rgba(108,92,231,0.3))" />
            </div>
            <div 
              className="absolute bottom-1/3 left-[12%] opacity-20 animate-float-delayed hidden lg:block transition-transform duration-500 ease-out"
              style={{ transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px) rotate(-12deg)` }}
            >
              <Layers className="w-32 h-32 text-secondary filter drop-shadow(0 0 20px rgba(0,206,201,0.2))" />
            </div>

            {/* 6. Orbiting particle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-primary/40 animate-orbit" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto text-center relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8 animate-fade-in-up backdrop-blur-sm">
              <div className="relative">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles className="w-4 h-4 text-amber-400 opacity-30" />
                </div>
              </div>
              <span className="text-sm font-semibold text-white/70">AI-Powered Affiliate Magic</span>
              <div className="w-px h-4 bg-white/10" />
              <span className="text-xs font-bold text-primary">New</span>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black tracking-tighter mb-6 leading-[0.95] animate-fade-in-up animation-delay-100 perspective-1000">
              <span className="text-white hover-tilt inline-block preserve-3d transition-transform duration-300">
                Build Your Affiliate
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent animate-gradient-x text-glow block animate-pulse-breathing">
                  Storefront in Minutes
                </span>
                {/* Decorative underline/glow */}
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-10 animate-fade-in-up animation-delay-200 leading-relaxed font-medium">
              Paste product links, let AI generate high-converting titles, and launch your stunning affiliate store. Start earning from every click.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-8 text-base rounded-2xl min-w-[240px] shadow-2xl shadow-primary/30 hover:shadow-primary/50 group hover-shine hover-tilt preserve-3d transition-all">
                  Start Building Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/store/demo">
                <Button variant="secondary" size="lg" className="h-14 px-8 text-base rounded-2xl min-w-[200px] border-white/10 hover:border-white/20 backdrop-blur-md group hover-lift hover-tilt preserve-3d transition-all">
                  Live Demo
                  <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-4 mt-10 animate-fade-in-up animation-delay-400">
              <div className="flex -space-x-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-black overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${
                        ["#10B981", "#34D399", "#00CEC9", "#059669", "#A7F3D0"][i]
                      }, ${
                        ["#34D399", "#059669", "#55EFC4", "#10B981", "#10B981"][i]
                      })`,
                    }}
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                </div>
                <span className="text-xs text-white/40 font-medium">Trusted by 5,000+ affiliate creators</span>
              </div>
            </div>

            {/* ─── 3D Browser Mockup ─── */}
            <div 
              className="mt-16 md:mt-24 relative max-w-5xl mx-auto animate-fade-in-up animation-delay-500 perspective-1000 group"
              style={{ transform: `rotateX(${mousePos.y * -0.2}deg) rotateY(${mousePos.x * 0.2}deg)` }}
            >
              {/* Complex Glow behind mockup */}
              <div className="absolute -inset-10 bg-gradient-to-t from-primary/20 via-accent/10 to-transparent blur-[100px] -z-10 group-hover:opacity-100 opacity-60 transition-opacity duration-700" />
              <div className="absolute -inset-4 bg-primary/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Reflection/fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none rounded-3xl" />

              <div className="relative rounded-2xl md:rounded-3xl border border-white/[0.08] bg-[#13131E]/80 p-2 md:p-3 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(108,92,231,0.1)] overflow-hidden glass-shine">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.04] bg-white/[0.02]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B6B] opacity-60" />
                    <div className="w-3 h-3 rounded-full bg-[#FDCB6E] opacity-60" />
                    <div className="w-3 h-3 rounded-full bg-[#00B894] opacity-60" />
                  </div>
                  <div className="flex-1 mx-6">
                    <div className="h-7 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center px-4">
                      <div className="w-3 h-3 rounded-full border border-white/20 mr-3" />
                      <div className="h-1.5 w-32 bg-white/[0.1] rounded-full" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-4 h-1 bg-white/10 rounded-full" />
                  </div>
                </div>

                {/* Content area */}
                <div className="aspect-[16/9] rounded-xl bg-black overflow-hidden relative">
                  {/* Fake dashboard content with living elements */}
                  <div className="absolute inset-0 p-6 md:p-10 flex flex-col gap-6">
                    {/* Top bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl gradient-primary shadow-lg shadow-primary/20 animate-pulse-glow" />
                        <div className="space-y-2">
                          <div className="h-3 w-24 bg-white/[0.1] rounded-full" />
                          <div className="h-2 w-16 bg-white/[0.05] rounded-full" />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-9 w-20 bg-white/[0.05] rounded-xl border border-white/5" />
                        <div className="h-9 w-9 bg-primary/20 rounded-xl border border-primary/20 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Product grid / Stats */}
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div 
                          key={i} 
                          className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 flex flex-col gap-3 hover:bg-white/[0.05] hover:border-primary/30 transition-all group/card"
                        >
                          <div className={`aspect-video rounded-xl relative overflow-hidden ${
                            i % 3 === 0 ? 'bg-primary/10' : i % 2 === 0 ? 'bg-accent/10' : 'bg-secondary/10'
                          }`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                            <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 w-3/4 bg-white/[0.1] rounded-full" />
                            <div className="h-2 w-1/2 bg-white/[0.05] rounded-full" />
                          </div>
                          <div className="mt-auto flex justify-between items-center">
                            <div className="h-5 w-12 bg-white/[0.05] rounded-lg" />
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                              <ArrowRight className="w-3 h-3 text-primary" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Floating Notification (Premium touch) */}
                  <div className="absolute bottom-6 right-6 w-48 glass-premium p-3 rounded-2xl border border-white/10 animate-bounce-subtle z-20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-success" />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Sale!</div>
                        <div className="text-xs font-black text-white">+₹2,490</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ FEATURES ═══════ */}
        <section id="features" className="py-24 md:py-32 px-4 sm:px-6 relative">
          <div className="absolute inset-0 dot-grid opacity-50 -z-10" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Layers size={14} className="text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Core Features</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-5 text-white tracking-tight leading-tight">
                Scale your earnings<br className="hidden md:block" /> with AI
              </h2>
              <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                Everything you need to build, track, and optimize your affiliate stores in one beautiful dashboard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 hover:border-primary/20 transition-all duration-500 hover-lift card-3d overflow-hidden glass-morphism"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="card-3d-inner relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-7 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl ${feature.shadow}`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                    <p className="text-white/50 leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ HOW IT WORKS ═══════ */}
        <section id="how-it-works" className="py-24 md:py-32 px-4 sm:px-6 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-5 text-white tracking-tight">
                Three steps to <span className="text-gradient">launch</span>
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto font-medium">
                From zero to earning in under 5 minutes. No design or coding skills needed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

              {steps.map((step, i) => (
                <div key={i} className="relative group">
                  <div className="text-center flex flex-col items-center">
                    {/* Step number circle */}
                    <div className="relative mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500 hover-glow">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[10px] font-black text-white/60">
                        {step.num}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/40 font-medium max-w-xs">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ SHOWCASE ═══════ */}
        <section className="py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            <div className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <Globe size={14} className="text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Global Reach</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight tracking-tight">
                Your Store, Your Brand,<br />
                <span className="text-gradient">Everywhere.</span>
              </h2>
              <p className="text-lg text-white/50 mb-10 leading-relaxed font-medium">
                Storix provides a custom subdomain and a blazing fast storefront that looks premium on every device. No design skills required.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Shield, text: "Mobile-first responsive design", color: "text-green-400 bg-green-400/10" },
                  { icon: TrendingUp, text: "Built-in click tracking & analytics", color: "text-blue-400 bg-blue-400/10" },
                  { icon: Sparkles, text: "AI-optimized meta tags & SEO", color: "text-purple-400 bg-purple-400/10" },
                  { icon: Zap, text: "Sub-second page loads globally", color: "text-amber-400 bg-amber-400/10" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-white/60 font-semibold group-hover:text-white transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D-style showcase grid */}
            <div className="flex-1 relative w-full max-w-lg">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] -z-10 animate-morph" />
              <div className="grid grid-cols-2 gap-4" style={{ perspective: "800px" }}>
                <div className="space-y-4 mt-12">
                  <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.06] p-5 shadow-2xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-2" style={{ transform: "rotateY(4deg)" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <TrendingUp size={16} className="text-primary" />
                      </div>
                      <span className="text-xs font-bold text-white/40">Analytics</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div className="h-full w-[72%] bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                      </div>
                      <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div className="h-full w-[58%] bg-gradient-to-r from-cyan-500 to-cyan-500/60 rounded-full" />
                      </div>
                      <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-gradient-to-r from-pink-500 to-pink-500/60 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.06] p-5 hover:border-cyan-500/20 transition-all duration-500 hover:-translate-y-2" style={{ transform: "rotateY(4deg)" }}>
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/10 flex items-center justify-center">
                      <Globe size={32} className="text-cyan-500/40" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.06] p-5 hover:border-pink-500/20 transition-all duration-500 hover:-translate-y-2" style={{ transform: "rotateY(-4deg)" }}>
                    <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/5 border border-pink-500/10 flex flex-col items-center justify-center gap-3 p-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center">
                        <ShoppingBag size={20} className="text-pink-400/60" />
                      </div>
                      <div className="h-2 w-2/3 bg-white/[0.06] rounded-full" />
                      <div className="h-2 w-1/2 bg-white/[0.04] rounded-full" />
                      <div className="h-6 w-full bg-pink-500/10 rounded-lg mt-2" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#0A0A0A] border border-white/[0.06] p-5 hover:border-amber-500/20 transition-all duration-500 hover:-translate-y-2" style={{ transform: "rotateY(-4deg)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-white/30 uppercase">Revenue</span>
                      <span className="text-xs font-black text-green-400">+24%</span>
                    </div>
                    <div className="text-2xl font-black text-white/80">₹12.4K</div>
                    <div className="text-[10px] text-white/20 font-medium mt-1">This month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ CTA ═══════ */}
        <section className="py-24 md:py-32 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto relative">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-pink-500/10 to-primary/10 rounded-[3.5rem] blur-2xl -z-10" />

            <div className="rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 relative overflow-hidden bg-[#0A0A0A] border border-white/[0.06] shadow-2xl text-center">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/8 rounded-full -translate-y-1/2 translate-x-1/3 blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/8 rounded-full translate-y-1/2 -translate-x-1/3 blur-[100px]" />
              <div className="absolute inset-0 grid-pattern opacity-30" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight tracking-tight">
                  Ready to build your<br />
                  <span className="text-gradient">passive income?</span>
                </h2>
                <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto font-medium">
                  Join the new era of affiliate marketing. Fast, automated, and AI-powered.
                </p>
                <Link href="/signup">
                  <Button size="lg" className="h-16 px-12 text-lg rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 group hover-shine">
                    Get Started for Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="py-12 md:py-16 px-4 sm:px-6 border-t border-white/[0.04] bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter">Storix</span>
            </div>
            <p className="text-white/30 text-sm max-w-xs font-medium">
              The AI-powered platform for affiliate creators to build stunning storefronts in minutes.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-white/30">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20 font-medium">
          <p>© 2026 Storix Inc. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Powered by Gemini AI</span>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <span>Built with Next.js</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
