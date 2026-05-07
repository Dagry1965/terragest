"use client";

export function ERPTrendCard({
  title,
  value,
  trend,
}: {
  title: string;
  value: string;
  trend: string;
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p
        className="
          mt-3
          text-4xl
          font-bold
          text-slate-950
        "
      >
        {value}
      </p>

      <p
        className="
          mt-2
          text-sm
          font-medium
          text-emerald-600
        "
      >
        {trend}
      </p>

      <div
        className="
          mt-5
          h-24
          rounded-xl
          bg-gradient-to-r
          from-slate-100
          to-slate-200
        "
      />

    </div>

  );
}