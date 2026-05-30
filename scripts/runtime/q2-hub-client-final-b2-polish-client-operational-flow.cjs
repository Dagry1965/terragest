const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const fullPath = path.join(root, file);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", file);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2-hub-client-final-b2-polish-flow`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

const replacements = [
  {
    label: "kpi-grid",
    from: 'className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"',
    to: 'className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"',
  },
  {
    label: "kpi-card-size",
    from: 'className="rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"',
    to: 'className="min-h-[128px] rounded-[1.75rem] bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200"',
  },
  {
    label: "kpi-label",
    from: '<p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>',
    to: '<p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>',
  },
  {
    label: "kpi-value",
    from: '<p className="mt-2 text-2xl font-extrabold leading-tight text-slate-950">{value}</p>',
    to: '<p className="mt-3 text-2xl font-black leading-tight text-slate-950 md:text-3xl">{value}</p>',
  },
  {
    label: "vehicle-section-padding",
    from: '<section className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">',
    to: '<section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">',
  },
  {
    label: "vehicle-card-clickable",
    from: '"rounded-[1.75rem] border p-5 text-left shadow-sm transition",',
    to: '"cursor-pointer rounded-[1.75rem] border p-5 text-left shadow-sm transition focus:outline-none focus:ring-4 focus:ring-emerald-100",',
  },
  {
    label: "vehicle-placeholder",
    from: '<div className="mb-5 h-44 rounded-[1.5rem] bg-gradient-to-br from-slate-200 to-slate-100" />',
    to: '<div className="mb-4 flex h-28 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-slate-200 to-slate-100 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Vehicule</div>',
  },
  {
    label: "vehicle-fields-spacing",
    from: '<div className="mt-5 grid gap-2 text-sm text-slate-600">',
    to: '<div className="mt-4 grid gap-2 text-sm text-slate-600">',
  },
  {
    label: "vehicle-link-spacing",
    from: '<span className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 ring-1 ring-slate-200">',
    to: '<span className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 ring-1 ring-slate-200">',
  },
  {
    label: "operational-section-padding",
    from: 'className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200"',
    to: 'className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8"',
  },
];

for (const replacement of replacements) {
  if (!source.includes(replacement.from)) {
    console.warn("[WARN] replacement marker not found:", replacement.label);
    continue;
  }

  source = source.replace(replacement.from, replacement.to);
  console.log("[PATCHED]", replacement.label);
}

const vehicleHintMarker = `                />

                {vehicles.length === 0 ? (`;

const vehicleHintReplacement = `                />

                <p className="mb-5 text-sm font-medium text-slate-500">
                  Selectionnez un vehicule pour afficher ses rendez-vous, interventions, lignes, factures et encaissements.
                </p>

                {vehicles.length === 0 ? (`;

if (source.includes(vehicleHintMarker) && !source.includes("Selectionnez un vehicule pour afficher ses rendez-vous")) {
  source = source.replace(vehicleHintMarker, vehicleHintReplacement);
  console.log("[PATCHED] vehicle-selection-hint");
} else {
  console.warn("[WARN] vehicle selection hint marker not found or already patched");
}

const rdvRowFrom = `                                  <tr
                                    key={recordId(appointment)}
                                    className={isSelected ? "bg-emerald-50" : "hover:bg-slate-50"}
                                  >`;

const rdvRowTo = `                                  <tr
                                    key={recordId(appointment)}
                                    onClick={() => {
                                      setSelectedRendezvousId(recordId(appointment));
                                      setSelectedInterventionId(null);
                                    }}
                                    className={[
                                      "cursor-pointer transition",
                                      isSelected ? "bg-emerald-50" : "hover:bg-slate-50",
                                    ].join(" ")}
                                  >`;

if (source.includes(rdvRowFrom)) {
  source = source.replace(rdvRowFrom, rdvRowTo);
  console.log("[PATCHED] rendezvous-row-clickable");
} else if (source.includes("cursor-pointer transition") && source.includes("setSelectedRendezvousId(recordId(appointment))")) {
  console.log("[SKIP] rendezvous row already clickable");
} else {
  console.warn("[WARN] rendezvous row marker not found");
}

const required = [
  "min-h-[128px]",
  "Selectionnez un vehicule pour afficher ses rendez-vous",
  "cursor-pointer transition",
  "setSelectedRendezvousId(recordId(appointment))",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Required marker missing:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", file);
console.log("[Q2-HUB-CLIENT-FINAL-B2] Client operational hub UI flow polished.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");