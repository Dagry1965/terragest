import type {
  ERPRecordHubDisplayMode,
  ERPRecordHubPrimaryCollectionConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";

function readRecordLabel(record: ERPRecordHubRecord, fields: string[] = []): string {
  const values = fields
    .map((field) => record[field])
    .filter((value): value is string | number => typeof value === "string" || typeof value === "number");

  if (values.length > 0) return values.join(" · ");

  return String(record.id ?? "Élément");
}

export type ERPRecordHubPrimaryCollectionProps = {
  config: ERPRecordHubPrimaryCollectionConfig;
  displayMode: ERPRecordHubDisplayMode;
  records: ERPRecordHubRecord[];
  selectedRecordId?: string | null;
  onSelectRecord?: (recordId: string | null) => void;
};

export function ERPRecordHubPrimaryCollection({
  config,
  displayMode,
  records,
  selectedRecordId = null,
  onSelectRecord,
}: ERPRecordHubPrimaryCollectionProps) {
  const title = config.label ?? "Relation principale";

  if (records.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
        Aucun élément lié à afficher pour {title}.
      </section>
    );
  }

  if (displayMode === "cards") {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
          <span className="text-xs text-slate-500">{records.length} élément(s)</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {records.map((record) => {
            const isSelected = record.id === selectedRecordId;

            return (
              <button
                key={record.id ?? readRecordLabel(record, config.labelFields)}
                type="button"
                onClick={() => onSelectRecord?.(record.id ?? null)}
                className={[
                  "rounded-2xl border p-4 text-left shadow-sm transition",
                  isSelected
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/40",
                ].join(" ")}
              >
                <p className="text-sm font-semibold text-slate-950">
                  {readRecordLabel(record, config.labelFields ?? config.cardFields)}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {readRecordLabel(record, config.subtitleFields)}
                </p>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
        <span className="text-xs text-slate-500">{records.length} élément(s)</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <tbody className="divide-y divide-slate-100 bg-white">
            {records.map((record) => {
              const isSelected = record.id === selectedRecordId;

              return (
                <tr
                  key={record.id ?? readRecordLabel(record, config.labelFields)}
                  className={isSelected ? "bg-emerald-50" : "hover:bg-slate-50"}
                >
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onSelectRecord?.(record.id ?? null)}
                      className="text-left font-medium text-slate-950 hover:text-emerald-700"
                    >
                      {readRecordLabel(record, config.labelFields ?? config.tableFields)}
                    </button>
                    <p className="mt-1 text-xs text-slate-500">
                      {readRecordLabel(record, config.subtitleFields)}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
