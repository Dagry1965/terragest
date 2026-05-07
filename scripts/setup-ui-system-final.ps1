Set-Location "C:\Users\Admin\terragest"

mkdir ".\src\theme" -Force
mkdir ".\src\components\erp\ui" -Force

@'
export const ERPTheme = {
  colors: {
    primary: "#0F172A",
    secondary: "#1E293B",
    accent: "#2563EB",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    background: "#F8FAFC",
    surface: "#FFFFFF",
    muted: "#64748B",
    border: "#E2E8F0",
  },

  radius: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
  },

  spacing: {
    page: "p-8",
    section: "p-6",
    card: "p-6",
    gap: "gap-6",
  },

  typography: {
    title: "text-4xl font-bold tracking-tight text-slate-950",
    subtitle: "text-sm text-slate-500",
    sectionTitle: "text-lg font-semibold text-slate-900",
    body: "text-sm text-slate-600",
  },

  shadows: {
    soft: "shadow-sm",
    elevated: "shadow-xl shadow-slate-200/50",
    glass: "shadow-2xl shadow-slate-200/40",
  },

  surfaces: {
    base: "bg-slate-50",
    card: "bg-white border border-slate-200",
    glass: "bg-white/75 border border-white/60 backdrop-blur-xl",
    premium: "bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200",
  },

  motion: {
    fast: "transition-all duration-150",
    normal: "transition-all duration-300",
    slow: "transition-all duration-500",
  },
};
'@ | Set-Content ".\src\theme\ERPTheme.ts" -Encoding UTF8

@'
"use client";

export function ERPButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}) {
  const variants = {
    primary: "bg-slate-950 text-white hover:bg-slate-800",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-2xl
        px-5 py-3 text-sm font-semibold shadow-sm
        transition-all duration-200 active:scale-[0.98]
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  );
}
'@ | Set-Content ".\src\components\erp\ui\ERPButton.tsx" -Encoding UTF8

@'
"use client";

export function ERPCard({
  title,
  children,
  premium = false,
}: {
  title?: string;
  children: React.ReactNode;
  premium?: boolean;
}) {
  return (
    <div
      className={`
        rounded-3xl p-6 transition-all duration-300
        ${
          premium
            ? "border border-white/60 bg-white/75 shadow-2xl shadow-slate-200/40 backdrop-blur-xl"
            : "border border-slate-200 bg-white shadow-sm"
        }
      `}
    >
      {title && (
        <h3 className="mb-5 text-lg font-semibold text-slate-900">
          {title}
        </h3>
      )}

      {children}
    </div>
  );
}
'@ | Set-Content ".\src\components\erp\ui\ERPCard.tsx" -Encoding UTF8

@'
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
'@ | Set-Content ".\src\components\erp\ui\ERPInput.tsx" -Encoding UTF8

@'
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
'@ | Set-Content ".\src\components\erp\ui\ERPSelect.tsx" -Encoding UTF8

@'
"use client";

export function ERPBadge({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "success" | "warning" | "danger";
}) {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-rose-100 text-rose-800",
  };

  return (
    <span
      className={`
        inline-flex rounded-full px-3 py-1
        text-xs font-semibold
        ${variants[variant]}
      `}
    >
      {label}
    </span>
  );
}
'@ | Set-Content ".\src\components\erp\ui\ERPBadge.tsx" -Encoding UTF8

@'
"use client";

export function ERPSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-4 w-1/3 rounded bg-slate-200" />
      <div className="mt-5 h-8 w-2/3 rounded bg-slate-200" />
      <div className="mt-4 h-24 rounded-2xl bg-slate-100" />
    </div>
  );
}
'@ | Set-Content ".\src\components\erp\ui\ERPSkeleton.tsx" -Encoding UTF8

@'
"use client";

export function ERPEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}
'@ | Set-Content ".\src\components\erp\ui\ERPEmptyState.tsx" -Encoding UTF8

@'
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
'@ | Set-Content ".\src\components\erp\ui\ERPToast.tsx" -Encoding UTF8

@'
"use client";

export function ERPTabs({
  tabs,
}: {
  tabs: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-2">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`
            rounded-xl px-4 py-2 text-sm font-medium transition-all
            ${
              index === 0
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
'@ | Set-Content ".\src\components\erp\ui\ERPTabs.tsx" -Encoding UTF8

@'
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
'@ | Set-Content ".\src\components\erp\ui\ERPModal.tsx" -Encoding UTF8

@'
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
'@ | Set-Content ".\src\components\erp\ui\ERPDrawer.tsx" -Encoding UTF8

@'
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
'@ | Set-Content ".\src\components\erp\ui\ERPChartCard.tsx" -Encoding UTF8

@'
export { ERPButton } from "./ERPButton";
export { ERPCard } from "./ERPCard";
export { ERPInput } from "./ERPInput";
export { ERPSelect } from "./ERPSelect";
export { ERPBadge } from "./ERPBadge";
export { ERPSkeleton } from "./ERPSkeleton";
export { ERPEmptyState } from "./ERPEmptyState";
export { ERPToast } from "./ERPToast";
export { ERPTabs } from "./ERPTabs";
export { ERPModal } from "./ERPModal";
export { ERPDrawer } from "./ERPDrawer";
export { ERPChartCard } from "./ERPChartCard";
'@ | Set-Content ".\src\components\erp\ui\index.ts" -Encoding UTF8

Write-Host ""
Write-Host "UI SYSTEM FINAL created successfully."
Write-Host ""