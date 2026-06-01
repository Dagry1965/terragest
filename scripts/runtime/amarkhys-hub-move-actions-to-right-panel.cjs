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
  "AMARKHYS-HUB-MOVE-ACTIONS-TO-RIGHT-PANEL.md"
);

const BACKUP = `${TARGET}.bak-move-actions-to-right-panel`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

console.log("[AMARKHYS-HUB-MOVE-ACTIONS-TO-RIGHT-PANEL] Move runtime actions into right panel");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = read(TARGET);
write(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

let after = before;

const actionMarker = 'data-amarkhys-hub-actions="CLIENT_CONTEXT_ACTIONS"';

if (!after.includes(actionMarker)) {
  fail("Bloc Actions client introuvable.");
}

const actionStart = after.lastIndexOf("<div", after.indexOf(actionMarker));
if (actionStart < 0) {
  fail("Début du bloc Actions client introuvable.");
}

const actionEnd = after.indexOf("</div>", after.indexOf(actionMarker));
if (actionEnd < 0) {
  fail("Fin du bloc Actions client introuvable.");
}

const actionBlock = after.slice(actionStart, actionEnd + "</div>".length);

// 1. Retirer Actions client de la colonne principale.
after = after.slice(0, actionStart) + after.slice(actionEnd + "</div>".length);

// 2. Remplacer Bénéfices métier par Actions client dans la colonne droite.
// Le titre peut être encodé correctement ou en mojibake, donc regex souple.
const benefitsRegex =
  /<section className="rounded-\[2\.25rem\] bg-white p-6 shadow-sm ring-1 ring-slate-200">\s*<SectionTitle title="B[^"]*FICES M[^"]*" \/>[\s\S]*?<\/section>/;

if (!benefitsRegex.test(after)) {
  fail("Bloc Bénéfices métier introuvable.");
}

const rightPanelActionSection = `              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-orange-200 bg-orange-50/40">
                <SectionTitle title="ACTIONS CLIENT" />

                ${actionBlock.replace(
                  'className="border-orange-200 bg-orange-50/40"',
                  'className="border-orange-200 bg-white/80"'
                )}
              </section>`;

after = after.replace(benefitsRegex, rightPanelActionSection);

// 3. Rendre la barre plus compacte dans le panneau droit.
after = after.replace(
  'title="Actions client"\n                  description="Actions disponibles selon le client, le véhicule, le parcours atelier, la facture et les impayés."',
  'title="Actions client"\n                  description="Relance, paiement et ouverture des éléments liés au client."'
);

const checks = [
  ["component changed", after !== before],
  ["action marker preserved", after.includes(actionMarker)],
  ["benefits section removed", !/SectionTitle title="B[^"]*FICES M[^"]*"/.test(after)],
  ["right actions title added", after.includes('SectionTitle title="ACTIONS CLIENT"')],
  ["runtime action bar preserved", after.includes("<ERPRuntimeActionBar")],
  ["navigation panel preserved", after.includes('SectionTitle title="NAVIGATION RAPIDE"')],
  ["vehicle dossier preserved", after.includes('SectionTitle title="DOSSIER V') || after.includes('SectionTitle title="DOSSIER VÃ')],
];

const failed = checks.filter(([, passed]) => !passed);

if (failed.length > 0) {
  fail(`Checks failed: ${failed.map(([name]) => name).join(", ")}`);
}

write(TARGET, after);
ok(`Written: ${path.relative(ROOT, TARGET)}`);

const report = [
  "# AMARKHYS-HUB-MOVE-ACTIONS-TO-RIGHT-PANEL",
  "",
  "## Objectif",
  "",
  "Déplacer le bloc Runtime / Actions client dans la colonne droite à la place du bloc Bénéfices métier.",
  "",
  "## Résultat attendu",
  "",
  "- Le bloc Actions client n'apparaît plus sous Situation client.",
  "- Le bloc Actions client apparaît dans la colonne droite.",
  "- Le bloc Bénéfices métier est supprimé.",
  "- Navigation rapide reste visible.",
  "- Dossier véhicule sélectionné reste visible.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => `- ${passed ? "OK" : "FAIL"} — ${name}`),
  "",
].join("\n");

write(REPORT, report);
ok(`Report: ${path.relative(ROOT, REPORT)}`);

console.log("[AMARKHYS-HUB-MOVE-ACTIONS-TO-RIGHT-PANEL] DONE");
console.log("[NEXT] pnpm build");