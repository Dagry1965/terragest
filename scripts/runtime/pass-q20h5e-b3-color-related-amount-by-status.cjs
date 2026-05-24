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

backup(target, "q20h5e-b3-color-amount-by-status-v2");

let content = read(target);

if (content.includes("Q20H5E_B3_AMOUNT_STATUS_TONE")) {
  console.log("[SKIP] Q20H5E-B3 déjà appliqué.");
  process.exit(0);
}

if (!content.includes("normalizeRelatedStatusValue")) {
  throw new Error("Q20H5E-B2 doit être appliqué avant Q20H5E-B3.");
}

const helperAnchor = `function formatRelatedStatusLabel(value: unknown): string {`;

const helper = `function getRecordStatusValue(record: Record<string, unknown>): string {
  // Q20H5E_B3_AMOUNT_STATUS_TONE
  return normalizeRelatedStatusValue(record.statut ?? record.status);
}

function getRelatedAmountBoxClassByStatus(record: Record<string, unknown>): string {
  const status = getRecordStatusValue(record);

  if (status === "validee" || status === "valide") {
    return "border-emerald-200 bg-emerald-50";
  }

  if (status === "brouillon" || status === "draft") {
    return "border-amber-200 bg-amber-50";
  }

  if (status === "retiree") {
    return "border-slate-200 bg-slate-50";
  }

  return "border-slate-200 bg-slate-50";
}

function getRelatedAmountLabelClassByStatus(record: Record<string, unknown>): string {
  const status = getRecordStatusValue(record);

  if (status === "validee" || status === "valide") {
    return "text-emerald-700";
  }

  if (status === "brouillon" || status === "draft") {
    return "text-amber-700";
  }

  if (status === "retiree") {
    return "text-slate-600";
  }

  return "text-slate-600";
}

function getRelatedAmountValueClassByStatus(record: Record<string, unknown>): string {
  const status = getRecordStatusValue(record);

  if (status === "validee" || status === "valide") {
    return "text-emerald-950";
  }

  if (status === "brouillon" || status === "draft") {
    return "text-amber-950";
  }

  if (status === "retiree") {
    return "text-slate-700";
  }

  return "text-slate-950";
}

`;

if (!content.includes(helperAnchor)) {
  throw new Error("Point d'insertion formatRelatedStatusLabel introuvable.");
}

content = content.replace(helperAnchor, helper + helperAnchor);

const amountBlock = `          const amount = child.totalField
            ? getAmount(record, child.totalField)
            : null;`;

const amountReplacement = `          const amount = child.totalField
            ? getAmount(record, child.totalField)
            : null;

          const amountBoxClass =
            getRelatedAmountBoxClassByStatus(record);

          const amountLabelClass =
            getRelatedAmountLabelClassByStatus(record);

          const amountValueClass =
            getRelatedAmountValueClassByStatus(record);`;

if (!content.includes(amountBlock)) {
  throw new Error("Bloc const amount introuvable.");
}

content = content.replace(amountBlock, amountReplacement);

const oldAmountRender = `              {amount !== null ? (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-right">
                  <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                    Montant
                  </p>
                  <p className="mt-1 whitespace-nowrap text-base font-black text-slate-950">
                    {formatMoney(amount)}
                  </p>
                </div>
              ) : child.openLabel ? (`;

const newAmountRender = `              {amount !== null ? (
                <div
                  className={[
                    "rounded-2xl border px-4 py-3 text-right",
                    amountBoxClass,
                  ].join(" ")}
                >
                  <p
                    className={[
                      "text-xs font-black uppercase tracking-wide",
                      amountLabelClass,
                    ].join(" ")}
                  >
                    Montant
                  </p>
                  <p
                    className={[
                      "mt-1 whitespace-nowrap text-base font-black",
                      amountValueClass,
                    ].join(" ")}
                  >
                    {formatMoney(amount)}
                  </p>
                </div>
              ) : child.openLabel ? (`;

if (!content.includes(oldAmountRender)) {
  throw new Error("Bloc montant réel introuvable.");
}

content = content.replace(oldAmountRender, newAmountRender);

write(target, content);

console.log("");
console.log("[Q20H5E_B3_DONE] Montant coloré selon le statut de la ligne liée.");
console.log("");
console.log("Next:");
console.log("  pnpm build");