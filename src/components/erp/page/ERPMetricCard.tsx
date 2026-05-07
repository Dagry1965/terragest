"use client";

export function ERPMetricCard({
  title,
  value,
  subtitle,
  status,
  variant = "default",
}: {
  title: string;
  value: string;
  subtitle?: string;
  status?: React.ReactNode;
  variant?: "default" | "warning" | "danger";
}) {

  const variants = {

    default:
      "border-slate-200 bg-white",

    warning:
      "border-amber-200 bg-amber-50",

    danger:
      "border-rose-200 bg-rose-50",
  };

  return (

    <div
      className={`
        rounded-2xl
        border
        p-6
        shadow-sm
        ${variants[variant]}
      `}
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            {value}
          </p>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        {status}

      </div>

    </div>
  );
}
