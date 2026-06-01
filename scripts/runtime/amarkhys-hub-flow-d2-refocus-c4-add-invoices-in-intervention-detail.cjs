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
  "AMARKHYS-HUB-FLOW-D2-REFOCUS-C4-add-invoices-in-intervention-detail.md"
);

const BACKUP = `${TARGET}.bak-c4-add-invoices-in-intervention-detail`;

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

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C4] Add invoices inside selected intervention detail row");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");

writeUtf8NoBom(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

const requiredMarkers = [
  "INTERVENTION_LINES_DETAIL_ROW",
  "parentRecord={intervention}",
  "child={lignesInterventionChild}",
  "facturesChild",
  "child={facturesChild}",
  "ERPRelatedRecordsPanel",
  "INTERVENTION_COMPACT_ROW",
];

for (const marker of requiredMarkers) {
  if (!before.includes(marker)) {
    fail(`Missing required marker before patch: ${marker}`);
  }
}

if (before.includes("INTERVENTION_INVOICES_DETAIL_BLOCK")) {
  fail("C4 invoice detail block already appears to be installed. Stop to avoid duplicate patch.");
}

let after = before;

const anchor = `                                          <ERPRelatedRecordsPanel
                                            parentModule={interventionsautoModule}
                                            parentRecord={intervention}
                                            child={lignesInterventionChild}
                                            mode="detail"
                                          />`;

if (!after.includes(anchor)) {
  fail("Could not find C3 intervention lines panel anchor.");
}

const insertion = `${anchor}

                                          <div
                                            data-amarkhys-hub-flow-d2-refocus-c4="INTERVENTION_INVOICES_DETAIL_BLOCK"
                                            className="mt-5 border-t border-slate-200 pt-4"
                                          >
                                            <div className="mb-3">
                                              <p className="text-xs font-bold uppercase tracking-wide text-slate-700">
                                                Factures de l'intervention sélectionnée
                                              </p>
                                              <p className="mt-1 text-sm text-slate-500">
                                                Documents de facturation rattachés uniquement à cette intervention.
                                              </p>
                                            </div>

                                            <ERPRelatedRecordsPanel
                                              parentModule={interventionsautoModule}
                                              parentRecord={intervention}
                                              child={facturesChild}
                                              mode="detail"
                                            />
                                          </div>`;

after = after.replace(anchor, insertion);

/**
 * C4 keeps downstream factures/encaissements untouched for now.
 * The old downstream factures panel may still exist after the intervention section.
 * It will be refocused/removed later only after the nested detail is validated.
 */
const checks = [
  ["component changed", after !== before],
  ["C3 detail row preserved", after.includes("INTERVENTION_LINES_DETAIL_ROW")],
  ["C4 invoice block added", after.includes("INTERVENTION_INVOICES_DETAIL_BLOCK")],
  ["line child panel preserved", after.includes("child={lignesInterventionChild}")],
  ["invoice child panel added inside detail", after.includes("parentRecord={intervention}") && after.includes("child={facturesChild}")],
  ["compact table preserved", after.includes("INTERVENTION_COMPACT_ROW")],
  ["selected rendezvous filtering preserved", after.includes("interventionsForSelectedRendezvous")],
  ["selected intervention behavior preserved", after.includes("setSelectedInterventionId")],
  ["encaissements downstream preserved", after.includes("InvoicePaymentsHistory")],
  ["old expand labels not reintroduced", !after.includes("Voir les lignes") && !after.includes("Masquer les lignes")],
  ["selected vehicle card not reintroduced", !after.includes("Véhicule sélectionné") && !after.includes("Vehicule sélectionné")],
];

const okCount = checks.filter(([, passed]) => passed).length;
const failCount = checks.length - okCount;

if (failCount > 0) {
  const failed = checks
    .filter(([, passed]) => !passed)
    .map(([name]) => name)
    .join(", ");
  fail(`Checks failed before write: ${failed}`);
}

writeUtf8NoBom(TARGET, after);
ok(`Written: ${path.relative(ROOT, TARGET)}`);

const report = [
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C4 — Add invoices in intervention detail",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Goal",
  "",
  "Add invoices inside the full-width detail row of the selected intervention.",
  "",
  "## Scope",
  "",
  "- Reused existing generic `ERPRelatedRecordsPanel`.",
  "- Reused existing `facturesChild` metadata.",
  "- Kept lines of intervention as first detail block.",
  "- Added factures under the intervention lines.",
  "- Preserved compact intervention table.",
  "- Preserved selected rendez-vous filtering.",
  "- Did not move encaissements yet.",
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

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C4] DONE");
console.log("[NEXT] pnpm build");