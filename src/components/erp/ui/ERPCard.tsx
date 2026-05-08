import type { ReactNode } from "react";

interface ERPCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
  premium?: boolean;
}

export function ERPCard({
  title,
  description,
  children,
  className = "",
  actions,
  premium = false,
}: ERPCardProps) {
  const premiumClass = premium
    ? "border-blue-500/30 bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950/30 shadow-xl shadow-blue-950/20"
    : "border-slate-800 bg-slate-950/80 shadow-sm";

  return (
    <section
      className={`rounded-2xl border p-6 backdrop-blur ${premiumClass} ${className}`}
    >
      {(title || description || actions) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-slate-100">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-slate-400">
                {description}
              </p>
            )}
          </div>

          {actions && <div>{actions}</div>}
        </div>
      )}

      {children}
    </section>
  );
}
