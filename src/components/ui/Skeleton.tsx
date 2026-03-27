interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-white/5 border border-white/5 ${className}`}
    >
      <div className="absolute inset-0 shimmer opacity-50" />
    </div>
  );
}
