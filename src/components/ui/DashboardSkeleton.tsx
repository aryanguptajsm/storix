"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { Card, CardHeader, CardContent } from "./Card";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-11 w-36 rounded-xl" />
          <Skeleton className="h-11 w-36 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="glass border-white/5">
            <CardHeader className="pb-2 border-b border-white/5">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass border-white/5">
          <CardHeader className="border-b border-white/5">
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-white/5">
          <CardHeader className="border-b border-white/5">
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
