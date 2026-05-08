import type { InputHTMLAttributes } from "react";

interface ERPInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function ERPInput({
  label,
  error,
  className = "",
  ...props
}: ERPInputProps) {
  return (
    <label className="block space-y-2">
      {label && (
        <span className="text-sm font-medium text-slate-300">
          {label}
        </span>
      )}

      <input
        className={`w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${className}`}
        {...props}
      />

      {error && (
        <span className="text-xs text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}
