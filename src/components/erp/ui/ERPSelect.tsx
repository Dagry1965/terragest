import type { SelectHTMLAttributes } from "react";

interface ERPSelectOption {
  label: string;
  value: string;
}

interface ERPSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: ERPSelectOption[];
  error?: string;
}

export function ERPSelect({
  label,
  options = [],
  error,
  className = "",
  children,
  ...props
}: ERPSelectProps) {
  return (
    <label className="block space-y-2">
      {label && (
        <span className="text-sm font-medium text-slate-300">
          {label}
        </span>
      )}

      <select
        className={`w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${className}`}
        {...props}
      >
        {children ??
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>

      {error && (
        <span className="text-xs text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}
