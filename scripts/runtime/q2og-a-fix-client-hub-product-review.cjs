const fs = require("fs");
const path = require("path");

const root = process.cwd();

function write(relativePath, content) {
  const full = path.join(root, relativePath);
  const backup = full + ".bak-q2og-a-product-review-fix";

  if (!fs.existsSync(backup)) {
    fs.writeFileSync(backup, fs.readFileSync(full, "utf8"), "utf8");
    console.log("[BACKUP] " + path.relative(root, backup));
  }

  fs.writeFileSync(full, content.trimStart(), "utf8");
  console.log("[WRITTEN] " + relativePath);
}

console.log("[Q2-OG-A] Fix Client Hub product review blockers");
console.log("[ROOT] " + root);

write("src/components/erp/hub/ERPRecordHubSelectedDetails.tsx", `
import Link from "next/link";
import type {
  ERPRecordHubActionConfig,
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

function readFields(record: ERPRecordHubRecord, fields: string[] = []): string {
  const values = fields
    .map((field) => record[field])
    .filter((value): value is string | number => typeof value === "string" || typeof value === "number");

  return values.length > 0 ? values.join(" · ") : readFallbackLabel(record);
}

function buildHref(template: string | undefined, record: ERPRecordHubRecord): string | null {
  if (!template || !record.id) {
    return null;
  }

  return template.replaceAll("{id}", String(record.id));
}

function actionClassName(action: ERPRecordHubActionConfig): string {
  if (action.variant === "primary") {
    return "rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800";
  }

  if (action.variant === "danger") {
    return "rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 shadow-sm transition hover:border-red-300 hover:bg-red-50";
  }

  return "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700";
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
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-6 xl:self-start">
      <div className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Dossier sélectionné
        </p>

        <h2 className="mt-2 text-lg font-semibold text-slate-950">
          {selectedRecord ? readFallbackLabel(selectedRecord) : "Aucune sélection"}
        </h2>

        <p className="mt-1 text-sm text-emerald-800/80">
          Sélectionnez un élément à gauche pour afficher ses détails opérationnels.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const records = relatedRecordsBySection[section.key] ?? [];
          const actions = section.actions ?? [];

          return (
            <section
              key={section.key}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-950">
                    {section.label}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {section.moduleKey}
                  </p>
                </div>

                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                  {records.length}
                </span>
              </div>

              {records.length === 0 ? (
                <p className="mt-3 rounded-xl border border-dashed border-slate-200 bg-white px-3 py-4 text-sm text-slate-500">
                  Aucun élément lié à afficher.
                </p>
              ) : (
                <div className="mt-3 space-y-2">
                  {records.map((record) => (
                    <article
                      key={record.id ?? readFallbackLabel(record)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-sm"
                    >
                      <p className="font-semibold text-slate-900">
                        {readFields(record, section.labelFields)}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {readFields(record, section.subtitleFields)}
                      </p>

                      {actions.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {actions.map((action) => {
                            const href = buildHref(action.hrefTemplate, record);

                            if (!href) {
                              return null;
                            }

                            return (
                              <Link
                                key={action.key}
                                href={href}
                                className={actionClassName(action)}
                              >
                                {action.label}
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
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
`);

const auditPath = path.join(root, "scripts/runtime/q2og-audit-client-hub-product-review.cjs");

let audit = fs.readFileSync(auditPath, "utf8");

// "Fiche véhicule" doit être vérifié dans la route/config, pas dans le composant générique.
audit = audit.replace(
  '[primary, "Fiche véhicule", "Primary collection shows vehicle navigation"],',
  '[route, "Fiche véhicule", "Route config exposes vehicle navigation label"],'
);

fs.writeFileSync(auditPath, audit, "utf8");
console.log("[PATCHED] scripts/runtime/q2og-audit-client-hub-product-review.cjs");

console.log("[Q2-OG-A] DONE");