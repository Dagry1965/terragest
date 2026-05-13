"use client";

export function ERPWidgetCard({
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

      <div className="mb-5">

        <h3
          className="
            text-base
            font-semibold
            text-slate-900
          "
        >
          {title}
        </h3>

      </div>

      {children}

    </div>
  );
}
