import type { ReactNode } from "react";

export type ERPPageProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function ERPPage({
  title,
  subtitle,
  description,
  actions,
  children,
  className = "",
}: ERPPageProps) {
  const finalDescription = description ?? subtitle;

  return (
    <main className={["space-y-6 p-6", className].join(" ")}>
      {(title || finalDescription || actions) && (
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            {title && (
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                {title}
              </h1>
            )}

            {finalDescription && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {finalDescription}
              </p>
            )}
          </div>

          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}

      {children}
    </main>
  );
}