import type { ButtonHTMLAttributes, ReactNode } from "react";

type ERPButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ERPButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ERPButtonVariant;
}

const variants: Record<ERPButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white border-blue-500 hover:bg-blue-500 shadow-lg shadow-blue-950/40",
  secondary:
    "bg-white text-slate-950 border-white hover:bg-slate-200 shadow-lg shadow-black/20",
  ghost:
    "bg-slate-900 text-slate-100 border-slate-700 hover:bg-slate-800",
  danger:
    "bg-red-600 text-white border-red-500 hover:bg-red-500 shadow-lg shadow-red-950/30",
};

export function ERPButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: ERPButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-2xl border px-5 py-2.5 text-sm font-bold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}