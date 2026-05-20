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
  fs.writeFileSync(
    file,
    content.replace(/\r\n/g, "\n"),
    "utf8"
  );

  console.log("[Q15F_A2_WRITTEN]", path.relative(ROOT, file));
}

function backup(file) {
  const backupPath = file + ".bak-q15f-a2-create-lock-policy";

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log("[Q15F_A2_BACKUP]", path.relative(ROOT, backupPath));
  }
}

backup(target);

let content = read(target);

if (content.includes("Q15F_A2_ACTIVE_CREATE_LOCK_POLICY")) {
  console.log("[Q15F_A2_SKIP] Patch déjà présent.");
  process.exit(0);
}

const oldBlock = `  const lockedFields =
    Array.from(
      new Set([
        ...(compositionLocking?.lockedFields ?? []),
        ...queryLockedFields,
      ])
    );

  const readOnlyFields =
    Array.from(
      new Set(
        compositionLocking?.readOnlyFields ?? []
      )
    );
`;

const newBlock = `  const hasParentContext =
    Boolean(
      queryValues.parentModuleKey ||
      queryValues.parentRecordId ||
      queryValues.parentForeignKey
    );

  const compositionLockedFields =
    compositionLocking?.lockedFields ?? [];

  const compositionReadOnlyFields =
    compositionLocking?.readOnlyFields ?? [];

  const lockedFields =
    mode === "create"
      ? Array.from(
          new Set([
            ...queryLockedFields,
          ])
        )
      : Array.from(
          new Set([
            ...compositionLockedFields,
            ...queryLockedFields,
          ])
        );

  const readOnlyFields =
    mode === "create"
      ? []
      : Array.from(
          new Set([
            ...compositionReadOnlyFields,
          ])
        );

  // Q15F_A2_ACTIVE_CREATE_LOCK_POLICY
  // Création directe : aucun champ composition.lockedFields n'est bloqué.
  // Création enfant : seuls les champs transmis par lockFields dans l'URL sont bloqués.
  // Edit/detail : les verrous de composition restent appliqués.
`;

if (!content.includes(oldBlock)) {
  throw new Error(
    "[Q15F_A2_MISSING_BLOCK] Bloc lockedFields/readOnlyFields actif introuvable. Inspecter ERPEnterpriseForm.tsx autour des lignes 316-345."
  );
}

content = content.replace(oldBlock, newBlock);

write(target, content);

console.log("");
console.log("[Q15F_A2_DONE] Politique active de verrouillage corrigée.");
console.log("");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\check-encoding.cjs");
console.log("  pnpm build");