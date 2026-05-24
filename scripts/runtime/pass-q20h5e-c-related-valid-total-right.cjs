const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRelatedRecordsPanel.tsx"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function backup(file, suffix) {
  const backupPath = `${file}.bak-${suffix}`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

if (!fs.existsSync(target)) {
  throw new Error(`Fichier introuvable: ${target}`);
}

backup(target, "q20h5e-c-valid-total-right-v2");

let content = read(target);

if (content.includes("Q20H5E_C_VALID_TOTAL_RIGHT")) {
  console.log("[SKIP] Q20H5E-C déjà appliqué.");
  process.exit(0);
}

if (!content.includes("normalizeRelatedStatusValue")) {
  throw new Error("Q20H5E-B2/B3 doivent être appliqués avant Q20H5E-C.");
}

const helperAnchor = `function getRelatedAmountValueClassByStatus(record: Record<string, unknown>): string {`;

const helper = `function isRelatedRecordCountable(record: Record<string, unknown>): boolean {
  // Q20H5E_C_VALID_TOTAL_RIGHT
  // Le total visible du panneau ne compte que les lignes confirmées.
  const status = normalizeRelatedStatusValue(record.statut ?? record.status);

  return (
    (status === "validee" || status === "valide") &&
    !record.removedAt
  );
}

`;

if (!content.includes(helperAnchor)) {
  throw new Error("Point d'insertion helper amount status introuvable.");
}

content = content.replace(helperAnchor, helper + helperAnchor);

const totalBlock = `  const total = records.reduce(
    (sum, record) => sum + getAmount(record, child.totalField),
    0
  );`;

const totalReplacement = `  const total = records.reduce(
    (sum, record) =>
      isRelatedRecordCountable(record)
        ? sum + getAmount(record, child.totalField)
        : sum,
    0
  );`;

if (!content.includes(totalBlock)) {
  throw new Error("Bloc calcul total réel introuvable.");
}

content = content.replace(totalBlock, totalReplacement);

const headerTextBlock = `            {loading
              ? "Chargement..."
              : child.badgeLabel
                ? \`\${records.length} \${child.badgeLabel}\`
                : child.totalField
                  ? \`\${records.length} ligne(s) · total \${formatMoney(total)}\`
                  : \`\${records.length} enregistrement(s)\`}`;

const headerTextReplacement = `            {loading
              ? "Chargement..."
              : child.badgeLabel
                ? \`\${records.length} \${child.badgeLabel}\`
                : child.totalField
                  ? \`\${records.length} ligne(s)\`
                  : \`\${records.length} enregistrement(s)\`}`;

if (!content.includes(headerTextBlock)) {
  throw new Error("Bloc texte header total réel introuvable.");
}

content = content.replace(headerTextBlock, headerTextReplacement);

const actionBlock = `        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600">`;

const actionReplacement = `        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {child.totalField ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-right shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                Total lignes validées
              </p>
              <p className="mt-1 whitespace-nowrap text-base font-black text-emerald-950">
                {formatMoney(total)}
              </p>
            </div>
          ) : null}

          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600">`;

if (!content.includes(actionBlock)) {
  throw new Error("Bloc actions header introuvable.");
}

content = content.replace(actionBlock, actionReplacement);

write(target, content);

console.log("");
console.log("[Q20H5E_C_DONE] Total lignes validées affiché à droite du panneau.");
console.log("");
console.log("Next:");
console.log("  pnpm build");