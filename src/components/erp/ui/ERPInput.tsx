"use client";

export function ERPInput({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full rounded-2xl border border-slate-300 bg-white
          px-4 py-3 text-sm text-slate-900 outline-none
          transition-all duration-200
          placeholder:text-slate-400
          focus:border-slate-500 focus:ring-4 focus:ring-slate-200/70
        "
      />
    </div>
  );
}
