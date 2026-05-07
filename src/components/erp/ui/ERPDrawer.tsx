"use client";

export function ERPDrawer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="rounded-l-3xl border-l border-slate-200 bg-white p-8 shadow-2xl shadow-slate-300/50">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>

      <div className="mt-6">
        {children}
      </div>
    </aside>
  );
}
