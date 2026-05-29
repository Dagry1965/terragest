import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";

function readFields(record: ERPRecordHubRecord | null | undefined, fields: string[] = []): string {
  if (!record) return "—";

  const values = fields
    .map((field) => record[field])
    .filter((value): value is string | number => typeof value === "string" || typeof value === "number");

  return values.length > 0 ? values.join(" · ") : "—";
}

export type ERPRecordHubHeaderProps = {
  config: ERPRecordHubConfig;
  rootRecord?: ERPRecordHubRecord | null;
};

export function ERPRecordHubHeader({ config, rootRecord = null }: ERPRecordHubHeaderProps) {
  const title = readFields(rootRecord, config.header.titleFields);
  const subtitle = readFields(rootRecord, config.header.subtitleFields);
  const badges = config.header.badgeFields ?? [];

  return (
    <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            {config.label}
          </p>
          <h1 className="mt-2 truncate text-2xl font-semibold text-slate-950">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {badges.map((field) => (
            <span
              key={field}
              className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
            >
              {String(rootRecord?.[field] ?? field)}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
