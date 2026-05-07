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
