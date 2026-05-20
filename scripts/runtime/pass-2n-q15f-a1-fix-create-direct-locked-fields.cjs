const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
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
  fs.writeFileSync(file, content.replace(/\r\n/g, "\n"), "utf8");
  console.log("[Q15F_A1_WRITTEN]", path.relative(ROOT, file));
}

function backup(file) {
  const backupPath = file + ".bak-q15f-a1-create-direct-locks";
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log("[Q15F_A1_BACKUP]", path.relative(ROOT, backupPath));
  }
}

backup(target);

let content = read(target);

if (!content.includes("Q15E_INHERITED_LOCKED_FIELDS")) {
  throw new Error(
    "Bloc Q15E_INHERITED_LOCKED_FIELDS introuvable dans ERPEnterpriseForm.tsx"
  );
}

if (!content.includes("Q15F_A1_CREATE_DIRECT_LOCK_POLICY")) {
  const pattern =
    /const lockedFields =\s*Array\.from\(\s*new Set\(\[\s*([\s\S]*?)\s*\]\)\s*\);\s*\n\s*\/\/ Q15E_INHERITED_LOCKED_FIELDS/;

  const match = content.match(pattern);

  if (!match) {
    throw new Error(
      "Impossible de localiser le calcul lockedFields. Inspecte ERPEnterpriseForm.tsx autour de Q15E_INHERITED_LOCKED_FIELDS."
    );
  }

  const replacement = `const moduleCompositionLockedFields =
    module.composition?.lockedFields ?? [];

  const lockedFields =
    mode === "create"
      ? Array.from(
          new Set([
            ...inheritedLockedFields,
          ])
        )
      : Array.from(
          new Set([
            ...moduleCompositionLockedFields,
            ...inheritedLockedFields,
          ])
        );

  // Q15E_INHERITED_LOCKED_FIELDS
  // Q15F_A1_CREATE_DIRECT_LOCK_POLICY
  // En création directe, on ne verrouille pas les champs métier du module.
  // En création enfant, seuls les champs lockFields transmis par l’URL sont verrouillés.
  // En edit/detail, les lockedFields déclarés dans composition restent appliqués.`;

  content = content.replace(pattern, replacement);
}

write(target, content);

console.log("");
console.log("[Q15F_A1_DONE] Création directe débloquée sans casser le verrouillage parent/enfant.");
console.log("");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\check-encoding.cjs");
console.log("  pnpm build");