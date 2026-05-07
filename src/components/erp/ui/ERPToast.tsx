"use client";

export function ERPToast({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-300/40 backdrop-blur-xl">
      <p className="text-sm font-semibold text-slate-900">
        {title}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
}
