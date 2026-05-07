"use client";

export function ERPSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-4 w-1/3 rounded bg-slate-200" />
      <div className="mt-5 h-8 w-2/3 rounded bg-slate-200" />
      <div className="mt-4 h-24 rounded-2xl bg-slate-100" />
    </div>
  );
}
