const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const modulePageRel = "src/components/erp/operational/ERPOperationalModulePage.tsx";
const tableRel = "src/components/erp/operational/ERPOperationalTable.tsx";
const rdvRel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";

const modulePageFile = path.join(ROOT, modulePageRel);
const tableFile = path.join(ROOT, tableRel);
const rdvFile = path.join(ROOT, rdvRel);

for (const file of [modulePageFile, tableFile, rdvFile]) {
  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + file);
  }
}

function backup(file, suffix) {
  fs.writeFileSync(file + suffix, fs.readFileSync(file, "utf8"), "utf8");
  console.log("[BACKUP]", path.relative(ROOT, file + suffix));
}

/**
 * 1. Remonter fortement la page opérationnelle.
 */
{
  backup(modulePageFile, ".bak-q2a-e3-lift-operational-page");

  let content = fs.readFileSync(modulePageFile, "utf8");

  content = content
    .replace('className="-mt-3 space-y-4"', 'className="-mt-8 space-y-3"')
    .replace('className="space-y-5"', 'className="-mt-8 space-y-3"')
    .replace("p-4 lg:p-5", "p-4 lg:p-4")
    .replace("mt-3 flex flex-col gap-2", "mt-2 flex flex-col gap-1")
    .replace("mt-4 flex flex-wrap gap-2", "mt-3 flex flex-wrap gap-2")
    .replace("text-3xl font-black tracking-tight", "text-2xl font-black tracking-tight")
    .replace("lg:text-[2.65rem]", "lg:text-[2.25rem]");

  fs.writeFileSync(modulePageFile, content, "utf8");
  console.log("[WRITTEN]", modulePageRel);
}

/**
 * 2. Supprimer codeRendezVous du tableau operational de rendezvous.module.ts.
 * On ne supprime PAS le champ du schema, seulement sa colonne operational.
 */
{
  backup(rdvFile, ".bak-q2a-e3-remove-code-rdv-operational-column");

  let content = fs.readFileSync(rdvFile, "utf8");

  const before = content;

  content = content.replace(
    /fields:\s*\[\s*"codeRendezVous",/m,
    'fields: ['
  );

  content = content.replace(
    /\s*"codeRendezVous",\s*\r?\n/g,
    "\n"
  );

  if (content.includes('fields: [\n        "codeRendezVous"')) {
    throw new Error("codeRendezVous encore présent dans operational.table.fields");
  }

  fs.writeFileSync(rdvFile, content, "utf8");

  if (before === content) {
    console.log("[INFO] Aucun codeRendezVous trouvé dans operational.table.fields ou déjà supprimé.");
  }

  console.log("[WRITTEN]", rdvRel);
}

/**
 * 3. Sécurité générique dans ERPOperationalTable :
 * - exclure codeRendezVous si le module operational demande hiddenOperationalFields
 * - permettre metadata simple plus tard
 * - fallback spécifique minimal mais placé dans composant générique via fonction centrale
 */
{
  backup(tableFile, ".bak-q2a-e3-hide-business-code-column-safety");

  let content = fs.readFileSync(tableFile, "utf8");

  if (!content.includes("function isOperationalColumnHidden")) {
    const marker = "function getRecordId(record: Record<string, unknown>): string {";

    const helper = `
function isOperationalColumnHidden(
  module: ERPModule,
  fieldKey: string
): boolean {
  const hiddenFields = (
    module.operational as unknown as {
      hiddenFields?: string[];
      hiddenOperationalFields?: string[];
    }
  )?.hiddenFields ?? (
    module.operational as unknown as {
      hiddenFields?: string[];
      hiddenOperationalFields?: string[];
    }
  )?.hiddenOperationalFields ?? [];

  if (hiddenFields.includes(fieldKey)) {
    return true;
  }

  /**
   * Protection UX opérationnelle :
   * le code métier reste dans le détail, la recherche et Firestore,
   * mais il peut être retiré des vues opérationnelles trop denses.
   */
  if (
    module.metadata.key === "rendezvous" &&
    fieldKey === "codeRendezVous"
  ) {
    return true;
  }

  return false;
}

`;

    const index = content.indexOf(marker);

    if (index < 0) {
      throw new Error("Point insertion introuvable: getRecordId");
    }

    content = content.slice(0, index) + helper + content.slice(index);
  }

  if (!content.includes(".filter((key) => !isOperationalColumnHidden(module, key))")) {
    content = content.replace(
      /const columns = useMemo\(\s*\(\) =>\s*fieldKeys\s*\.map\(\(key\) => \(\{/,
      `const columns = useMemo(
    () =>
      fieldKeys
        .filter((key) => !isOperationalColumnHidden(module, key))
        .map((key) => ({`
    );
  }

  fs.writeFileSync(tableFile, content, "utf8");
  console.log("[WRITTEN]", tableRel);
}

console.log("");
console.log("[DONE] Q2-A-E3 page remontée + colonne code RDV masquée.");
console.log("");
console.log("Next:");
console.log("pnpm build");
