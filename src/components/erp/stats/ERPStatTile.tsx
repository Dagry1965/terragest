"use client";

export function ERPStatTile({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
      "
    >

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-950">
        {value}
      </p>

    </div>

  );
}