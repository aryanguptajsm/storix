"use client";

import React from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  size?: "default" | "medium" | "small";
  variant?: "glass" | "glass-morphism" | "premium" | "solid";
  hoverEffect?: boolean;
}

export function Card({ 
  children, 
  className = "", 
  glow = false,
  size = "default",
  variant = "solid",
  hoverEffect = true
}: CardProps) {
  const sizeStyles = {
    default: "p-6 md:p-10 rounded-[3rem]",
    medium: "p-5 md:p-7 rounded-[2.5rem]",
    small: "p-4 md:p-6 rounded-3xl",
  };

  const variants = {
    glass: "glass-premium backdrop-blur-2xl border-white/10 bg-white/[0.015] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_20px_40px_-15px_rgba(0,0,0,0.6)]",
    "glass-morphism": "glass-morphism shadow-[inset_0_1px_2px_rgba(255,255,255,0.03)]",
    premium: "glass-premium-animated border-primary/30 bg-primary/[0.03] animate-glow-border shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_0_30px_rgba(0,0,0,0.8)]",
    solid: "bg-[#0A0A0E] border-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.02),inset_0_-2px_4px_rgba(0,0,0,0.7)]",
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { 
        y: -4, 
        scale: 1.01,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      } : {}}
      className={cn(
        "relative overflow-hidden flex flex-col group",
        sizeStyles[size],
        variants[variant],
        glow && "animate-pulse-glow shadow-2xl shadow-primary/10",
        hoverEffect && "hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/10 transition-colors duration-300",
        className
      )}
    >
      {/* Premium Texture Overlay */}
      <div className="absolute inset-0 noise-subtle opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-500" />
      
      {/* Subtle Gradient Glow on Hover */}
      <div className="absolute -inset-[100%] bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}


export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mb-6 relative z-10", className)}>{children}</div>;
}

export function CardTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-lg font-black text-foreground tracking-tight italic", className)}>
      {children}
    </h3>
  );
}

export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("relative z-10", className)}>{children}</div>;
}

