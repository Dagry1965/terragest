const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
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

backup(target, "q20h4d-soft-action-only-status-guidance");

let content = read(target);

if (content.includes("Q20H4D_ACTION_ONLY_STATUS_NOTICE")) {
  console.log("[SKIP] Q20H4D semble déjà appliqué.");
  process.exit(0);
}

const anchor = `  const statusGuidance =
    statusGovernance?.guidance?.[0] ?? null;`;

if (!content.includes(anchor)) {
  throw new Error("Bloc statusGuidance introuvable. Q20H4C doit être appliqué avant.");
}

const replacement = `  const statusGuidance =
    statusGovernance?.guidance?.[0] ?? null;

  const isStatusActionOnly =
    // Q20H4D_ACTION_ONLY_STATUS_NOTICE
    statusGovernance?.editMode === "action_only";`;

content = content.replace(anchor, replacement);

const renderAnchor = `        {statusGuidance && (`;

if (!content.includes(renderAnchor)) {
  throw new Error("Bloc rendu statusGuidance introuvable.");
}

const notice = `        {isStatusActionOnly && (
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-5
              py-3
              text-sm
              text-slate-700
              shadow-sm
            "
          >
            <span className="font-semibold text-slate-900">
              Statut piloté par les actions.
            </span>{" "}
            Le statut indique l’état métier de la fiche. Pour changer cet état,
            utilisez les boutons d’action prévus par le système.
          </div>
        )}

`;

content = content.replace(renderAnchor, notice + renderAnchor);

write(target, content);

console.log("");
console.log("[Q20H4D_DONE] Guidance action_only ajoutée dans ERPEnterpriseForm.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  tester /lignesinterventionauto/DEMO-LIGNE-001/edit");