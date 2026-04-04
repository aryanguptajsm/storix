"use client";

import React, { useState } from "react";
import Link from "next/link";
import { resetPasswordForEmail } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Mail, ArrowLeft, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPasswordForEmail(email);
      setSubmitted(true);
      toast.success("Recovery link sent!", {
        description: "Check your inbox for instructions to reset your password.",
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to send recovery email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 grid-bg-subtle opacity-20 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-10 stagger-1 animate-stagger-fade">
          <Link href="/login" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-xs font-black uppercase tracking-widest mb-6 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-xl shadow-primary/5 relative">
            <div className="absolute inset-0 icon-glow opacity-50" />
            <Sparkles size={32} className="text-primary relative z-10" />
          </div>
          <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">Password Recovery</h1>
          <p className="text-muted font-medium">Enter your email to receive a secure recovery link.</p>
        </div>

        {!submitted ? (
          <Card className="glass border-white/5 shadow-2xl overflow-hidden hover-tilt preserve-3d perspective-1000 stagger-2 animate-stagger-fade">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5 group">
                  <label className="block text-sm font-bold text-muted uppercase tracking-widest text-[10px]">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/30 group-focus-within:text-primary transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="commander@storix.ai"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/5 text-foreground font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all font-mono text-sm"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full py-7 rounded-xl font-black uppercase tracking-widest gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40" loading={loading}>
                  <Send size={18} />
                  Transmit Reset Link
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass border-primary/20 bg-primary/5 shadow-2xl overflow-hidden stagger-2 animate-stagger-fade">
            <CardContent className="p-10 text-center space-y-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto border border-success/20">
                <Send size={24} className="text-success" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">Transmission Successful</h3>
                <p className="text-muted text-sm leading-relaxed">
                  We've dispatched a recovery link to <span className="text-primary font-bold">{email}</span>. 
                  Please check your inbox (and spam folder) to reset your password.
                </p>
              </div>
              <Button variant="secondary" className="w-full py-4" onClick={() => setSubmitted(false)}>
                I didn't receive an email
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
