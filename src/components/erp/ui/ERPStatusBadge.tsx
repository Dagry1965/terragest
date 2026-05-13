type ERPStatusBadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "error";

type ERPStatusBadgeProps = {
  status?: string;
  label?: string;
  tone?: ERPStatusBadgeVariant;
  variant?: ERPStatusBadgeVariant;
  className?: string;
};

const toneClasses: Record<ERPStatusBadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  danger: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  error: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

export function ERPStatusBadge({
  status,
  label,
  tone,
  variant,
  className = "",
}: ERPStatusBadgeProps) {
  const finalTone = variant ?? tone ?? "default";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[finalTone],
        className,
      ].join(" ")}
    >
      {label ?? status ?? "Statut"}
    </span>
  );
}