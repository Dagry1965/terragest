"use client";

export function ERPCard({
  title,
  children,
  premium = false,
}: {
  title?: string;
  children: React.ReactNode;
  premium?: boolean;
}) {
  return (
    <div
      className={`
        rounded-3xl p-6 transition-all duration-300
        ${
          premium
            ? "border border-white/60 bg-white/75 shadow-2xl shadow-slate-200/40 backdrop-blur-xl"
            : "border border-slate-200 bg-white shadow-sm"
        }
      `}
    >
      {title && (
        <h3 className="mb-5 text-lg font-semibold text-slate-900">
          {title}
        </h3>
      )}

      {children}
    </div>
  );
}
