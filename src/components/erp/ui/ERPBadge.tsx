import type { ReactNode } from "react";

type ERPBadgeTone = "default" | "success" | "warning" | "danger" | "info";

interface ERPBadgeProps {
  children: ReactNode;
  tone?: ERPBadgeTone;
  className?: string;
}

const tones: Record<ERPBadgeTone, string> = {
  default: "bg-slate-800 text-slate-200 border-slate-700",
  success: "bg-emerald-950 text-emerald-300 border-emerald-800",
  warning: "bg-amber-950 text-amber-300 border-amber-800",
  danger: "bg-red-950 text-red-300 border-red-800",
  info: "bg-sky-950 text-sky-300 border-sky-800",
};

export function ERPBadge({
  children,
  tone = "default",
  className = "",
}: ERPBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
