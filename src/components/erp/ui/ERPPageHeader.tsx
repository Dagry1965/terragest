type ERPPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function ERPPageHeader({
  eyebrow,
  title,
  description,
}: ERPPageHeaderProps) {
  return (
    <div className="space-y-2">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          {eyebrow}
        </p>
      )}

      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}