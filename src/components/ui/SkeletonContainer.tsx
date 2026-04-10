import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export function SkeletonContainer({ children, className }: SkeletonContainerProps) {
  return (
    <div className={cn("min-h-[40vh] animate-fade-in", className)}>
      {children}
    </div>
  );
}
