"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { Card, CardContent, CardHeader } from "./Card";
import { SkeletonContainer } from "./SkeletonContainer";
import { BarChart3, TrendingUp, DollarSign, Wallet } from "lucide-react";

const ANALYTICS_STEPS = [
  { id: 1, text: "Calculating Revenue Velocity...", icon: TrendingUp, color: "text-primary" },
  { id: 2, text: "Analyzing Traffic Distribution...", icon: BarChart3, color: "text-secondary" },
  { id: 3, text: "Verifying Financial Directives...", icon: DollarSign, color: "text-accent" },
  { id: 4, text: "Syncing Settlement Logs...", icon: Wallet, color: "text-white" },
];

export function AnalyticsSkeleton() {
  return (
    <SkeletonContainer steps={ANALYTICS_STEPS} title="Analytics Synchronization in Progress">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} size="small" variant="glass" className="overflow-hidden border-white/5 bg-white/[0.01]">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-white/5 mb-4">
              <Skeleton className="h-3 w-20 opacity-30" />
              <Skeleton className="h-8 w-8 rounded-xl" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-32" />
              <div className="flex gap-2">
                 <Skeleton className="h-5 w-16 rounded-full opacity-50" />
                 <Skeleton className="h-3 w-12 opacity-30" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <Card key={i} size="medium" variant="glass" className="p-1">
             <CardHeader className="flex flex-row items-center justify-between p-5 pb-2">
                <div className="space-y-2">
                   <Skeleton className="h-6 w-40" />
                   <Skeleton className="h-3 w-64 opacity-30" />
                </div>
                <Skeleton className="h-6 w-6 rounded-lg opacity-20" />
             </CardHeader>
             <CardContent className="h-[300px] w-full pt-8 px-6">
                <div className="relative h-full w-full bg-white/[0.02] rounded-2xl overflow-hidden">
                   <div className="absolute inset-0 shimmer opacity-20" />
                   {/* Mock Chart Lines */}
                   <div className="absolute inset-x-0 bottom-10 h-px bg-white/5" />
                   <div className="absolute inset-y-0 left-10 w-px bg-white/5" />
                </div>
             </CardContent>
          </Card>
        ))}
      </div>
    </SkeletonContainer>
  );
}
