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

backup(target, "q20h5e-b2-colored-status-badge");

let content = read(target);

if (content.includes("Q20H5E_B2_STATUS_BADGE")) {
  console.log("[SKIP] Q20H5E-B2 déjà appliqué.");
  process.exit(0);
}

const helperAnchor = `function getAmount(`;

const helper = `function normalizeRelatedStatusValue(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "");
}

function isRelatedStatusValue(value: unknown): boolean {
  // Q20H5E_B2_STATUS_BADGE
  const status = normalizeRelatedStatusValue(value);

  return [
    "brouillon",
    "draft",
    "validee",
    "valide",
    "retiree",
  ].includes(status);
}

function getRelatedStatusBadgeClass(value: unknown): string {
  const status = normalizeRelatedStatusValue(value);

  if (status === "validee" || status === "valide") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (status === "brouillon" || status === "draft") {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  if (status === "retiree") {
    return "border-slate-200 bg-slate-50 text-slate-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function formatRelatedStatusLabel(value: unknown): string {
  const status = normalizeRelatedStatusValue(value);

  if (status === "validee" || status === "valide") return "Validée";
  if (status === "brouillon" || status === "draft") return "Brouillon";
  if (status === "retiree") return "Retirée";

  return String(value ?? "");
}

`;

if (!content.includes(helperAnchor)) {
  throw new Error("Point d'insertion helper getAmount introuvable.");
}

content = content.replace(helperAnchor, helper + helperAnchor);

const oldBlock = `                    {[...configuredSubtitleParts, ...relationParts].map((part) => (
                      <span
                        key={part}
                        className="rounded-full bg-slate-100 px-3 py-1"
                      >
                        {part}
                      </span>
                    ))}`;

const newBlock = `                    {[...configuredSubtitleParts, ...relationParts].map((part) => {
                      const isStatus = isRelatedStatusValue(part);

                      return (
                        <span
                          key={part}
                          className={[
                            "rounded-full border px-3 py-1 font-black",
                            isStatus
                              ? getRelatedStatusBadgeClass(part)
                              : "border-slate-200 bg-slate-100 text-slate-600",
                          ].join(" ")}
                        >
                          {isStatus
                            ? formatRelatedStatusLabel(part)
                            : part}
                        </span>
                      );
                    })}`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc d'affichage configuredSubtitleParts introuvable.");
}

content = content.replace(oldBlock, newBlock);

write(target, content);

console.log("");
console.log("[Q20H5E_B2_DONE] Badge statut coloré dans ERPRelatedRecordsPanel.");
console.log("");
console.log("Next:");
console.log("  pnpm build");