import { ReactNode } from "react";

type ERPWidgetCardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function ERPWidgetCard({
  title,
  description,
  children,
  className = "",
}: ERPWidgetCardProps) {
  return (
    <section
      className={[
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        "dark:border-slate-800 dark:bg-slate-950",
        className,
      ].join(" ")}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
          )}

          {description && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}