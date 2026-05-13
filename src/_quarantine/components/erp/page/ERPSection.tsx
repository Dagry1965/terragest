"use client";

export function ERPSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          {title}
        </h2>
      </div>

      {children}

    </section>
  );
}
