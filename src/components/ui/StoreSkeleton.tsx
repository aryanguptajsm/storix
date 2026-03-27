"use client";

import React from "react";
import { Skeleton } from "./Skeleton";

export function StoreSkeleton() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans">
      {/* Navbar Skeleton */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="w-32 h-6" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </nav>

      {/* Hero Skeleton */}
      <section className="bg-white mt-2">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <Skeleton className="w-40 h-6 rounded-full" />
            <Skeleton className="w-full h-12 rounded-xl" />
            <Skeleton className="w-2/3 h-6" />
          </div>
          <div className="flex-1 w-full max-w-md">
            <Skeleton className="aspect-[16/9] rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Categories Skeleton */}
      <div className="bg-white border-y border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="w-24 h-4" />
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
        <div className="flex justify-between mb-8">
          <Skeleton className="w-32 h-8" />
          <Skeleton className="w-16 h-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/5] rounded-2xl" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-2/3 h-4" />
              <div className="flex justify-between items-center">
                <Skeleton className="w-20 h-8" />
                <Skeleton className="w-24 h-10 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
