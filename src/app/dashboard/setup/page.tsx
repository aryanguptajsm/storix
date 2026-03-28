"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Database, 
  Terminal, 
  Copy, 
  CheckCircle2, 
  ExternalLink,
  ArrowLeft,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SetupPage() {
  const sqlScript = `-- ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  store_name TEXT DEFAULT 'My Affiliate Store',
  store_description TEXT,
  theme TEXT DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price TEXT,
  original_price TEXT,
  discount_percentage TEXT,
  image_url TEXT,
  platform TEXT,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CLICKS TABLE
CREATE TABLE IF NOT EXISTS public.clicks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ENABLE SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;

-- 5. ACCESS POLICIES
CREATE POLICY "Public profiles are viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can manage own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Products are viewable" ON public.products FOR SELECT USING (true);
CREATE POLICY "Users can manage own products" ON public.products FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can log clicks" ON public.clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own clicks" ON public.clicks FOR SELECT USING (auth.uid() = user_id);

-- 6. AUTO-PROFILE TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, store_name, theme)
  VALUES (new.id, lower(split_part(new.email, '@', 1)) || (floor(random() * 9000) + 1000)::text, split_part(new.email, '@', 1) || '''s Store', 'default');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript);
    toast.success("SQL Script copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-24">
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2 text-muted hover:text-white transition-colors">
            <ArrowLeft size={16} />
            Back to Command Center
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Database className="text-primary" size={20} />
          <h1 className="text-3xl font-black tracking-tight uppercase">Initialization</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Terminal, title: "1. Copy Script", desc: "Get the secure SQL initialization logic." },
          { icon: ExternalLink, title: "2. Open Supabase", desc: "Navigate to your SQL Editor dashboard." },
          { icon: Zap, title: "3. Run & Launch", desc: "Execute and refresh your dashboard." },
        ].map((step, i) => (
          <Card key={i} className="glass border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <step.icon size={40} />
             </div>
             <CardHeader className="pb-2">
               <CardTitle className="text-sm font-black uppercase tracking-widest text-primary-light flex items-center gap-2">
                 <step.icon size={14} />
                 {step.title}
               </CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-xs text-muted font-medium leading-relaxed">{step.desc}</p>
             </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass relative overflow-hidden border-white/5">
        <CardHeader className="border-b border-white/5 flex flex-row items-center justify-between p-6">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">SQL Command Center</CardTitle>
            <p className="text-xs text-muted">Execute this script to establish your database infrastructure.</p>
          </div>
          <Button 
            onClick={copyToClipboard}
            className="gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold rounded-xl h-10 px-4"
          >
            <Copy size={14} />
            Copy All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
             <pre className="p-6 text-[11px] font-mono text-primary-light/80 bg-black/40 h-[400px] overflow-auto leading-relaxed custom-scrollbar">
               {sqlScript}
             </pre>
             <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Sparkles size={120} className="text-primary" />
        </div>
        <div className="space-y-2 relative z-10">
          <h3 className="text-xl font-black text-white">Ready for deployment?</h3>
          <p className="text-sm text-muted max-w-md">Once executed, your store will be fully synchronized with our AI product pipeline.</p>
        </div>
        <Link href="https://supabase.com/dashboard/project/lnckyrvxehzcjvyultkd/sql/new" target="_blank" className="w-full md:w-auto relative z-10">
          <Button className="w-full md:w-auto gap-3 px-8 h-14 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/25 group">
            Open SQL Editor
            <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
