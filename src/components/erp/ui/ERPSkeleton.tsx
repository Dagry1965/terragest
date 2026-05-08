interface ERPSkeletonProps {
  className?: string;
}

export function ERPSkeleton({ className = "" }: ERPSkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-800/80 ${className}`}
    />
  );
}
