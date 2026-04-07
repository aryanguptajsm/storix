"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { Card, CardHeader, CardContent } from "./Card";
import { SkeletonContainer } from "./SkeletonContainer";
import { Settings, User, Shield, CreditCard } from "lucide-react";

const SETTINGS_STEPS = [
  { id: 1, text: "Accessing Command Profiles...", icon: User, color: "text-primary" },
  { id: 2, text: "Verifying Security Keys...", icon: Shield, color: "text-secondary" },
  { id: 3, text: "Syncing Payout Vectors...", icon: CreditCard, color: "text-accent" },
  { id: 4, text: "Recalibrating Interface...", icon: Settings, color: "text-white" },
];

export function SettingsSkeleton() {
  return (
    <SkeletonContainer steps={SETTINGS_STEPS} title="Interface Recalibration in Progress">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Tabs Skeleton */}
        <div className="lg:col-span-3 space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl opacity-20" />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="lg:col-span-9 space-y-8">
          <Card size="medium" variant="glass" className="overflow-hidden border-white/5 bg-white/[0.01]">
            <CardHeader className="p-6 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-3 w-48 opacity-50" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              <div className="flex items-center gap-6">
                <Skeleton className="h-24 w-24 rounded-3xl" />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-56 opacity-50" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-3 w-20 opacity-30" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SkeletonContainer>
  );
}

