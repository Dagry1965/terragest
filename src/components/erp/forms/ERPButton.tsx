"use client";

export function ERPButton({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <button
      className="
        rounded-xl
        bg-slate-900
        px-5
        py-3
        text-sm
        font-medium
        text-white
        transition-all
        hover:bg-slate-800
      "
    >
      {children}
    </button>
  );
}
