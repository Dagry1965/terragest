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
        bg-white
        p-6
        shadow-sm
      "
    >
      <p
        className="
          text-sm
          text-slate-500
        "
      >
        {label}
      </p>

      <h2
        className="
          mt-3
          text-4xl
          font-bold
          text-slate-950
        "
      >
        {value}
      </h2>
    </div>
  );
}