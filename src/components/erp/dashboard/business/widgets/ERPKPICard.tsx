interface ERPKPICardProps {
  label: string;
  value: number;
}

export function ERPKPICard({
  label,
  value,
}: ERPKPICardProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        bg-[#0B201D]
        p-4 sm:p-4 sm:p-5 lg:p-6
        shadow-[0_8px_24px_rgba(15,23,42,0.08)]
      "
    >
      <p
        className="
          text-sm
          text-slate-300
        "
      >
        {label}
      </p>

      <h2
        className="
          mt-3
          text-xl sm:text-2xl sm:text-xl sm:text-2xl sm:text-3xl lg:text-4xl
          font-bold
          text-white
        "
      >
        {value}
      </h2>
    </div>
  );
}