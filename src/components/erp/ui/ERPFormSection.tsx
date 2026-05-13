import type { ReactNode } from "react";

type ERPFormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ERPFormSection({
  title,
  description,
  children,
}: ERPFormSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-black text-slate-950">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}