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

backup(target, "q20h4c-show-status-guidance");

let content = read(target);

if (content.includes("Q20H4C_STATUS_GUIDANCE")) {
  console.log("[SKIP] Q20H4C semble déjà appliqué.");
  process.exit(0);
}

if (!content.includes(`RuntimeStatusGovernanceEngine`)) {
  throw new Error("RuntimeStatusGovernanceEngine non importé. Q20H-4B doit être appliqué avant.");
}

const anchorAfterRelationFields = `  const relationFields =
    visibleFields.filter(
      (field) => field.type === "relation"
    );`;

if (!content.includes(anchorAfterRelationFields)) {
  throw new Error("Bloc relationFields introuvable.");
}

const statusGuidanceBlock = `${anchorAfterRelationFields}

  const statusGovernance =
    RuntimeStatusGovernanceEngine.resolve({
      moduleKey: module.metadata.key,
      record: {
        ...initialData,
        ...formValues,
      },
    });

  const statusGuidance =
    statusGovernance?.guidance?.[0] ?? null;`;

content = content.replace(anchorAfterRelationFields, statusGuidanceBlock);

const renderAnchor = `        {errors.length > 0 && (`;

if (!content.includes(renderAnchor)) {
  throw new Error("Point d'insertion rendu erreurs introuvable.");
}

const guidanceRender = `        {statusGuidance && (
          <div
            className="
              rounded-2xl
              border
              border-emerald-100
              bg-emerald-50/70
              px-5
              py-4
              text-sm
              text-emerald-950
              shadow-sm
            "
          >
            <div className="font-semibold">
              {statusGuidance.title}
            </div>
            <p className="mt-1 leading-6 text-emerald-900/80">
              {statusGuidance.message}
            </p>
          </div>
        )}

`;

content = content.replace(renderAnchor, guidanceRender + renderAnchor);

write(target, content);

console.log("");
console.log("[Q20H4C_DONE] Guidance statut affichée dans ERPEnterpriseForm.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  tester /lignesinterventionauto/DEMO-LIGNE-001/edit");