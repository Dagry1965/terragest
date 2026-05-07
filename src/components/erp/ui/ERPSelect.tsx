"use client";

export function ERPSelect({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        className="
          w-full rounded-2xl border border-slate-300 bg-white
          px-4 py-3 text-sm text-slate-900 outline-none
          transition-all duration-200
          focus:border-slate-500 focus:ring-4 focus:ring-slate-200/70
        "
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
