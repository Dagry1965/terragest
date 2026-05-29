import type {
  ERPRecordHubRecord,
  ERPRecordHubRelationDescriptor,
} from "@/runtime/hub";

function readFallbackLabel(record: ERPRecordHubRecord): string {
  const preferredFields = ["nom", "name", "label", "code", "immatriculation", "numero", "titre"];

  for (const field of preferredFields) {
    const value = record[field];

    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
  }

  return String(record.id ?? "Élément lié");
}

export type ERPRecordHubSelectedDetailsProps = {
  sections: ERPRecordHubRelationDescriptor[];
  selectedRecord?: ERPRecordHubRecord | null;
  relatedRecordsBySection?: Record<string, ERPRecordHubRecord[]>;
};

export function ERPRecordHubSelectedDetails({
  sections,
  selectedRecord = null,
  relatedRecordsBySection = {},
}: ERPRecordHubSelectedDetailsProps) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Détails contextuels
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-950">
          {selectedRecord ? readFallbackLabel(selectedRecord) : "Aucune sélection"}
        </h2>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const records = relatedRecordsBySection[section.key] ?? [];

          return (
            <section key={section.key} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-950">{section.label}</h3>
                <span className="text-xs text-slate-500">{records.length}</span>
              </div>

              {records.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500">Aucun élément lié à afficher.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {records.map((record) => (
                    <article key={record.id ?? readFallbackLabel(record)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                      <p className="font-medium text-slate-900">{readFallbackLabel(record)}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </aside>
  );
}
