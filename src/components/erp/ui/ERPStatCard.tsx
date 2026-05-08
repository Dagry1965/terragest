type ERPStatCardProps = {
  label: string;
  value: string | number;
  helper?: string;
};

export function ERPStatCard({
  label,
  value,
  helper,
}: ERPStatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-slate-950">
        {value}
      </p>

      {helper && (
        <p className="mt-1 text-sm text-slate-500">
          {helper}
        </p>
      )}
    </div>
  );
}