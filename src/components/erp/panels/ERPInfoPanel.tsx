"use client";

export function ERPInfoPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <h3
        className="
          text-lg
          font-semibold
          text-slate-900
        "
      >
        {title}
      </h3>

      <div className="mt-4">
        {children}
      </div>

    </div>

  );
}