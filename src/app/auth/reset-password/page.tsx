"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updatePassword, getUser } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Lock, Shield, Check, Eye, EyeOff, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [strength, setStrength] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const user = await getUser();
      if (!user) {
        toast.error("Invalid or expired session. Please request a new recovery link.");
        router.push("/auth/forgot-password");
      } else {
        setVerifying(false);
      }
    }
    checkSession();
  }, [router]);

  useEffect(() => {
    // Basic password strength logic
    let s = 0;
    if (password.length > 8) s += 25;
    if (/[A-Z]/.test(password)) s += 25;
    if (/[0-9]/.test(password)) s += 25;
    if (/[^A-Za-z0-9]/.test(password)) s += 25;
    setStrength(s);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    setLoading(true);
    try {
      await updatePassword(password);
      toast.success("Security Credentials Updated!", {
        description: "Your new password is now active. Proceed to dashboard.",
      });
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted font-black uppercase tracking-widest text-[10px]">Verifying Recovery Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 grid-bg-subtle opacity-20 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-10 stagger-1 animate-stagger-fade">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-xl shadow-primary/5 relative scale-in-center">
            <div className="absolute inset-0 icon-glow opacity-50" />
            <Shield size={32} className="text-primary relative z-10" />
          </div>
          <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">Reset Command Center</h1>
          <p className="text-muted font-medium">Establish your new security credentials below.</p>
        </div>

        <Card className="glass border-white/5 shadow-2xl overflow-hidden hover-tilt preserve-3d perspective-1000 stagger-2 animate-stagger-fade">
          <CardHeader className="pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
               <CardTitle className="text-lg font-black uppercase tracking-widest text-[10px] text-muted">Awaiting Input</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5 group">
                  <label className="block text-sm font-bold text-muted uppercase tracking-widest text-[10px]">New Security Key (Password)</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/30 group-focus-within:text-primary transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/5 text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all font-mono text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted/30 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {/* Strength Meter */}
                  <div className="h-1.5 w-full bg-white/5 rounded-full mt-2 overflow-hidden flex gap-1">
                     <div className={`h-full transition-all duration-500 rounded-full ${strength > 0 ? "bg-danger" : ""}`} style={{ width: `${strength}%` }} />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted/40 mt-1.5">Strength: {strength}% Intensity</p>
                </div>

                <div className="space-y-1.5 group">
                  <label className="block text-sm font-bold text-muted uppercase tracking-widest text-[10px]">Confirm Security Key</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/30 group-focus-within:text-primary transition-colors">
                      <Check size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new key"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/5 text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full py-7 rounded-xl font-black uppercase tracking-widest gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40" loading={loading}>
                <Sparkles size={18} className="text-secondary-light" />
                Finalize Update
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
