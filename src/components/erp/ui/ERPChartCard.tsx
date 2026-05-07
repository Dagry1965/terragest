"use client";

export function ERPChartCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-100 p-6 shadow-xl shadow-slate-200/50">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      <div className="mt-6 h-28 rounded-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300" />
    </div>
  );
}
