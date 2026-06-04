const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "business-rules",
  "runtimeBusinessRules.ts"
);

const reportPath = path.join(
  root,
  "docs",
  "audits",
  "BILLING-MODEL-D-D2-D-add-invoice-line-parent-context.md"
);

const passName = "BILLING-MODEL-D-D2-D";

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[${passName}] OK: ${message}`);
}

if (!fs.existsSync(target)) {
  fail(`Target not found: ${target}`);
}

let source = fs.readFileSync(target, "utf8");

const backup = `${target}.bak-billing-model-d-d2-d-parent-context`;
if (!fs.existsSync(backup)) {
  fs.writeFileSync(backup, source, "utf8");
  ok(`Backup created: ${backup}`);
}

if (source.includes('parentModuleKey:\n                "facturesauto"')) {
  ok("Parent context already present in invoice line creation.");
} else {
  const marker = `              factureId:
                factureIdForLines,

              designation:`;

  if (!source.includes(marker)) {
    fail("Could not find invoice line payload marker after factureId.");
  }

  source = source.replace(
    marker,
    `              factureId:
                factureIdForLines,

              parentModuleKey:
                "facturesauto",

              parentRecordId:
                factureIdForLines,

              parentForeignKey:
                "factureId",

              designation:`
  );

  fs.writeFileSync(target, source, "utf8");
  ok("Added parent context fields to lignesfactureauto creation payload.");
}

let report = "# BILLING-MODEL-D-D2-D — Ajout contexte parent aux lignes facture\n\n";

report += "## Résultat\n\n";
report += "- Ajout de `parentModuleKey = facturesauto` dans le payload de création `lignesfactureauto`.\n";
report += "- Ajout de `parentRecordId = factureIdForLines`.\n";
report += "- Ajout de `parentForeignKey = factureId`.\n";
report += "- Le guard `requiresParentContext` peut maintenant valider la création enfant.\n";
report += "- Le filtrage strict par `interventionId` reste inchangé.\n\n";

report += "## Cause diagnostiquée\n\n";
report += "- `lignesfactureauto` déclare `requiresParentContext: true`.\n";
report += "- Le payload précédent contenait `factureId`, mais pas les champs `parentModuleKey`, `parentRecordId`, `parentForeignKey` attendus par le guard parent/enfant.\n";
report += "- Résultat : la facture entête était créée, mais les lignes facture étaient bloquées.\n\n";

report += "## Prochaine étape\n\n";
report += "Build, commit, puis nouveau scénario D-D3 ou réparation contrôlée D-D2-E pour générer les lignes manquantes.\n";

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

ok(`Report written: ${path.relative(root, reportPath)}`);
ok("Next: run npm run build.");
