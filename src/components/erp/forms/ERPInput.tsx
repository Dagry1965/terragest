"use client";

export function ERPInput({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {

  return (

    <div className="space-y-2">

      <label
        className="
          text-sm
          font-medium
          text-slate-700
        "
      >
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-sm
          outline-none
          transition-all
          focus:border-slate-500
          focus:ring-2
          focus:ring-slate-200
        "
      />

    </div>
  );
}
