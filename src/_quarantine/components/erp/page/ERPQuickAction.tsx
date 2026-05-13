"use client";

export function ERPQuickAction({
  title,
  description,
}: {
  title: string;
  description: string;
}) {

  return (

    <button
      className="
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        text-left
        shadow-sm
        transition-all
        hover:border-slate-300
        hover:shadow-md
      "
    >

      <p
        className="
          text-sm
          font-semibold
          text-slate-900
        "
      >
        {title}
      </p>

      <p
        className="
          mt-2
          text-sm
          text-slate-500
        "
      >
        {description}
      </p>

    </button>
  );
}
