"use client";

export function ERPFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {

  return (

    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <div className="mb-6">

        <h2
          className="
            text-lg
            font-semibold
            text-slate-900
          "
        >
          {title}
        </h2>

        {description && (

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
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
