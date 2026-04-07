import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  size?: "default" | "medium" | "small";
  variant?: "glass" | "glass-morphism" | "premium" | "solid";
}

export function Card({ 
  children, 
  className = "", 
  glow = false,
  size = "default",
  variant = "solid"
}: CardProps) {
  const sizeStyles = {
    default: "p-10 md:p-12 rounded-[2.5rem]",
    medium: "p-8 md:p-10 rounded-[2rem]",
    small: "p-6 rounded-2xl",
  };

  const variants = {
    glass: "glass-premium backdrop-blur-xl border-white/5 bg-white/[0.01]",
    "glass-morphism": "glass-morphism",
    premium: "glass-premium-animated border-primary/20 bg-primary/[0.02] animate-glow-border",
    solid: "bg-surface border-border",
  };

  return (
    <div
      className={cn(
        "transition-all duration-500 relative overflow-hidden flex flex-col group",
        sizeStyles[size],
        variants[variant],
        glow && "animate-pulse-glow shadow-2xl shadow-primary/10",
        className
      )}
    >
      {children}
    </div>
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

