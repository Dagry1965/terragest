"use client";

export function ERPModal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl shadow-slate-300/40 backdrop-blur-xl">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>

      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
