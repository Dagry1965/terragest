type ERPEmptyStateProps = {
  title: string;
  description?: string;
};

export function ERPEmptyState({
  title,
  description,
}: ERPEmptyStateProps) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <div className="max-w-xl">
        <h2 className="text-lg font-semibold text-slate-950">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-slate-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}