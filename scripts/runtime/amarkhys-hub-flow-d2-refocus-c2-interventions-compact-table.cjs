const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "hub",
  "ERPClientOperationalSheet.tsx"
);

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "AMARKHYS-HUB-FLOW-D2-REFOCUS-C2-interventions-compact-table.md"
);

const BACKUP = `${TARGET}.bak-c2-interventions-compact-table`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function writeUtf8NoBom(filePath, content) {
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2] Convert interventions to compact table without detail");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");

writeUtf8NoBom(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

const requiredMarkers = [
  "Interventions liées au rendez-vous",
  "selectedAppointment",
  "appointmentInterventions",
];

for (const marker of requiredMarkers) {
  if (!before.includes(marker)) {
    fail(`Missing required marker before patch: ${marker}`);
  }
}

if (before.includes("InterventionCompactTable")) {
  fail("InterventionCompactTable already exists. Stop to avoid duplicate patch.");
}

let after = before;

/**
 * Step 1 — add local helper component before main export.
 * This is intentionally local to the hub for this visual pass only.
 * It does not create new business logic and does not touch runtime data rules.
 */
const helperMarker = "export default function ERPClientOperationalSheet";

if (!after.includes(helperMarker)) {
  fail(`Missing helper insertion marker: ${helperMarker}`);
}

const helper = `
function InterventionCompactTable({
  interventions,
  selectedInterventionId,
  onSelectIntervention,
}: {
  interventions: Array<Record<string, unknown>>;
  selectedInterventionId?: string | null;
  onSelectIntervention?: (id: string) => void;
}) {
  if (!interventions.length) {
    return <EmptyCard>Aucune intervention liée à ce rendez-vous.</EmptyCard>;
  }

  const formatText = (value: unknown, fallback = "—") => {
    if (value === null || value === undefined || value === "") return fallback;
    return String(value);
  };

  const formatAmount = (value: unknown) => {
    const numberValue = Number(value);
    if (!Number.isFinite(numberValue)) return "—";
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(numberValue);
  };

  const formatDate = (value: unknown) => {
    if (!value) return "—";
    if (typeof value === "object" && value !== null && "seconds" in value) {
      const seconds = Number((value as { seconds?: unknown }).seconds);
      if (Number.isFinite(seconds)) {
        return new Intl.DateTimeFormat("fr-FR").format(new Date(seconds * 1000));
      }
    }

    const date = new Date(String(value));
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat("fr-FR").format(date);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <tr>
            <th className="w-12 px-4 py-3">#</th>
            <th className="px-4 py-3">Intervention</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Statut</th>
            <th className="px-4 py-3 text-right">Montant</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {interventions.map((intervention, index) => {
            const id = String(intervention.id ?? "");
            const isSelected = selectedInterventionId === id;

            return (
              <tr
                key={id || index}
                className={[
                  "transition hover:bg-slate-50",
                  isSelected ? "bg-emerald-50/60" : "",
                  onSelectIntervention ? "cursor-pointer" : "",
                ].join(" ")}
                onClick={() => {
                  if (id && onSelectIntervention) {
                    onSelectIntervention(id);
                  }
                }}
              >
                <td className="px-4 py-3 text-slate-400">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-900">
                    {formatText(
                      intervention.numeroIntervention ??
                        intervention.reference ??
                        intervention.code ??
                        intervention.titre ??
                        intervention.id
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {formatText(
                      intervention.resume ??
                        intervention.description ??
                        intervention.typeIntervention ??
                        intervention.natureIntervention,
                      "Intervention atelier"
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {formatDate(
                    intervention.dateIntervention ??
                      intervention.dateDebut ??
                      intervention.createdAt
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {formatText(intervention.statut ?? intervention.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-slate-900">
                  {formatAmount(
                    intervention.montantTTC ??
                      intervention.totalTTC ??
                      intervention.montantTotal ??
                      intervention.total
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

`;

after = after.replace(helperMarker, `${helper}${helperMarker}`);

/**
 * Step 2 — replace only the intervention cards mapping block if present.
 * This intentionally does not add expand/collapse detail yet.
 */
const cardMapPattern =
/\{\s*appointmentInterventions\.map\(\(intervention\)\s*=>\s*\([\s\S]*?\)\)\s*\}/;

if (!cardMapPattern.test(after)) {
  fail("Could not find appointmentInterventions card map block. Manual inspection needed.");
}

const replacement = `{selectedAppointment ? (
                    <InterventionCompactTable
                      interventions={appointmentInterventions}
                      selectedInterventionId={selectedInterventionId}
                      onSelectIntervention={setSelectedInterventionId}
                    />
                  ) : (
                    <EmptyCard>Sélectionnez un rendez-vous pour afficher les interventions liées.</EmptyCard>
                  )}`;

after = after.replace(cardMapPattern, replacement);

const checks = [
  ["helper added", after.includes("function InterventionCompactTable")],
  ["intervention title preserved", after.includes("Interventions liées au rendez-vous")],
  ["rdv block preserved", after.includes("Choisir un rendez-vous")],
  ["selected vehicle card not reintroduced", !after.includes("Véhicule sélectionné") && !after.includes("Vehicule sélectionné")],
  ["no detail panel added in C2", !after.includes("Détail de l’intervention") && !after.includes("Detail de l’intervention")],
  ["compact table rendered", after.includes("<InterventionCompactTable")],
  ["appointment filtering still referenced", after.includes("appointmentInterventions")],
];

const okCount = checks.filter(([, passed]) => passed).length;
const failCount = checks.length - okCount;

if (failCount > 0) {
  const failed = checks.filter(([, passed]) => !passed).map(([name]) => name).join(", ");
  fail(`Checks failed before write: ${failed}`);
}

writeUtf8NoBom(TARGET, after);
ok(`Written: ${path.relative(ROOT, TARGET)}`);

const report = [
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C2 — Interventions compact table",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Goal",
  "",
  "Convert interventions linked to the selected appointment into a compact table without adding detail rows yet.",
  "",
  "## Scope",
  "",
  "- Preserved selected appointment filtering.",
  "- Preserved RDV block.",
  "- Preserved invoices/payments downstream logic.",
  "- Did not add intervention detail, invoices detail, or payment detail.",
  "- Did not relaunch D2-REFOCUS-B.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => `- ${passed ? "OK" : "FAIL"} — ${name}`),
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
writeUtf8NoBom(REPORT, report);

console.log(`[REPORT] ${path.relative(ROOT, REPORT)}`);
console.log(`[OK] ${okCount}`);
console.log(`[FAIL] ${failCount}`);

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2] DONE");
console.log("[NEXT] pnpm build");