import type { ReactNode } from "react";

interface ERPFormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ERPFormSection({
  title,
  description,
  children,
}: ERPFormSectionProps) {
  return (
    <section className="rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
      <div className="mb-6">
        <h2 className="text-lg font-black text-[var(--erp-text)]">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-[var(--erp-text-muted)]">
            {description}
          </p>
        )}
      </div>

      {/* Nouveau container GRID */}
      <div className="grid grid-cols-12 gap-6">
        {children}
      </div>
    </section>
  );
}
