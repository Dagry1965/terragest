import type { ReactNode } from "react";

type ERPMetricCardVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "error";

export type ERPMetricCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  description?: string;
  helper?: string;
  status?: ReactNode;
  icon?: ReactNode;
  trend?: ReactNode | string;
  variant?: ERPMetricCardVariant;
  tone?: ERPMetricCardVariant;
  className?: string;
};

const variantClasses: Record<ERPMetricCardVariant, string> = {
  default: "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950",
  neutral: "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950",
  success: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40",
  warning: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40",
  danger: "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40",
  error: "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40",
  info: "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40",
};

export function ERPMetricCard({
  title,
  value,
  subtitle,
  description,
  helper,
  status,
  icon,
  trend,
  variant,
  tone,
  className = "",
}: ERPMetricCardProps) {
  const finalDescription = description ?? subtitle ?? helper;
  const finalVariant = variant ?? tone ?? "default";

  return (
    <section
      className={[
        "rounded-2xl border p-5 shadow-sm",
        variantClasses[finalVariant],
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
            {value}
          </p>
        </div>

        {icon && <div className="shrink-0">{icon}</div>}
      </div>

      {(finalDescription || status || trend) && (
        <div className="mt-4 flex items-center justify-between gap-3">
          {finalDescription && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {finalDescription}
            </p>
          )}

          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            {trend}
            {status}
          </div>
        </div>
      )}
    </section>
  );
}