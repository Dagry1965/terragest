const fs = require("fs");
const path = require("path");

const root = process.cwd();

const fileRel = "src/components/erp/billing/InvoicePaymentsHistory.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-08C-B-hide-add-payment-history-button.md";

const filePath = path.join(root, fileRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("Missing file: " + fileRel);
}

const backupPath = filePath + ".bak-rebuild-08c-b-hide-add-payment-history-button";
fs.copyFileSync(filePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(filePath, "utf8");
const before = content;

const label = "Ajouter un paiement";
const labelIndex = content.indexOf(label);

if (labelIndex === -1) {
  fail("Cannot find label: " + label);
}

const linkStart = content.lastIndexOf("<Link", labelIndex);
const buttonStart = content.lastIndexOf("<button", labelIndex);
const anchorStart = content.lastIndexOf("<a", labelIndex);

const start = Math.max(linkStart, buttonStart, anchorStart);

if (start === -1) {
  fail("Cannot find JSX tag before Ajouter un paiement");
}

let closeTag = "";
const openSlice = content.slice(start, start + 40);

if (openSlice.startsWith("<Link")) closeTag = "</Link>";
else if (openSlice.startsWith("<button")) closeTag = "</button>";
else if (openSlice.startsWith("<a")) closeTag = "</a>";
else fail("Unsupported JSX tag around Ajouter un paiement");

const end = content.indexOf(closeTag, labelIndex);

if (end === -1) {
  fail("Cannot find closing tag: " + closeTag);
}

const removedBlock = content.slice(start, end + closeTag.length);

if (!removedBlock.includes(label)) {
  fail("Selected block does not contain Ajouter un paiement");
}

content = content.slice(0, start) + content.slice(end + closeTag.length);

fs.writeFileSync(filePath, content, "utf8");

const checks = [
  {
    label: "Ajouter un paiement supprimé",
    ok: !content.includes("Ajouter un paiement"),
  },
  {
    label: "Paiements enregistrés conservé",
    ok: content.includes("Paiements enregistrés"),
  },
  {
    label: "Modifier ce paiement conservé",
    ok: content.includes("Modifier ce paiement"),
  },
  {
    label: "Historique conservé",
    ok:
      content.includes("Liste des paiements liés à cette facture") ||
      content.includes("Aucun paiement enregistré"),
  },
  {
    label: "Fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-08C-B — Hide add payment history button",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Décision",
  "",
  "- Garder le bouton métier Enregistrer un paiement dans le bloc vert facture.",
  "- Masquer Ajouter un paiement dans Paiements enregistrés.",
  "- Conserver l’historique et les actions de paiement.",
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- ${check.ok ? "OK" : "FAIL"} — ${check.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
  "## Bloc supprimé",
  "",
  "```tsx",
  removedBlock,
  "```",
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-08C-B] Hide add payment history button");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-08C-B] DONE");
console.log("[NEXT] Run 08C-A audit, build, UI check.");