"use client";

export function ERPPage({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">

      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}

      </div>

      <div className="space-y-6">
        {children}
      </div>

    </div>
  );
}
