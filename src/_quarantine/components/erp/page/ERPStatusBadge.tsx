"use client";

export function ERPStatusBadge({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "success" | "warning" | "danger";
}) {

  const variants = {

    default:
      "bg-slate-100 text-slate-700",

    success:
      "bg-emerald-100 text-emerald-700",

    warning:
      "bg-amber-100 text-amber-800",

    danger:
      "bg-rose-100 text-rose-800",
  };

  return (

    <div
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${variants[variant]}
      `}
    >
      {label}
    </div>
  );
}
