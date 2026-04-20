"use client";

import { Skeleton } from "./Skeleton";

export function BillingSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-96 opacity-40 mt-2" />
      </div>

      {/* Current Plan Card */}
      <div className="rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <Skeleton className="h-16 w-16 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-3 w-32 opacity-40" />
            </div>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <Skeleton className="h-12 w-40 rounded-xl" />
            <Skeleton className="h-12 w-64 rounded-xl hidden md:block" />
          </div>
        </div>
      </div>

      {/* Plan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-3xl border border-white/5 bg-black/40 p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-2 w-16 opacity-30" />
              </div>
            </div>
            <Skeleton className="h-10 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full opacity-30" />
              <Skeleton className="h-3 w-2/3 opacity-30" />
              <Skeleton className="h-3 w-3/4 opacity-30" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>

      {/* Redemption Card */}
      <div className="rounded-3xl border border-primary/10 bg-primary/5 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-lg">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-3 w-full opacity-40" />
          <Skeleton className="h-3 w-2/3 opacity-40" />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Skeleton className="h-14 w-64 rounded-2xl" />
          <Skeleton className="h-14 w-40 rounded-2xl" />
        </div>
      </div>

      {/* Add-ons */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-black/40 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20 opacity-40" />
                </div>
              </div>
              <Skeleton className="h-3 w-full opacity-30" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
