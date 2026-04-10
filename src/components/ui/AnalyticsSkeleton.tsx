import { Skeleton } from "./Skeleton";

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <Skeleton className="h-3 w-20 opacity-40" />
              <Skeleton className="h-8 w-8 rounded-xl" />
            </div>
            <Skeleton className="h-10 w-28" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full opacity-50" />
              <Skeleton className="h-3 w-12 opacity-30" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-52 opacity-30" />
              </div>
            </div>
            <div className="h-[280px] w-full bg-white/[0.01] rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 shimmer opacity-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
