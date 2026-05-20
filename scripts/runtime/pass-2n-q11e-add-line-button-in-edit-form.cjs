const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q11e-edit-add-line`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

if (!content.includes(`from "next/link"`)) {
  content = content.replace(
    /("use client";\s*)/,
    `$1\nimport Link from "next/link";\n`
  );
}

const functionRegex = /export function ERPEnterpriseForm\s*\([\s\S]*?\)\s*\{/m;
const functionMatch = content.match(functionRegex);

if (!functionMatch) {
  throw new Error("Impossible de trouver export function ERPEnterpriseForm.");
}

if (!content.includes("const isEditingInterventionAuto")) {
  const helper = `
  const runtimeModuleKey = String(
    ((module as any).key ??
      (module as any).id ??
      (module.metadata as any)?.key ??
      (module.metadata as any)?.name ??
      (module.metadata as any)?.label ??
      module.schema?.collection ??
      "") as string
  ).toLowerCase();

  const currentRecordId = String(
    ((initialValues as any)?.id ??
      (initialValues as any)?._id ??
      "") as string
  );

  const isEditingInterventionAuto =
    currentRecordId.length > 0 &&
    (runtimeModuleKey === "interventionsauto" ||
      runtimeModuleKey.includes("intervention") ||
      module.schema?.collection === "interventionsauto");

  const editInterventionLineHref = currentRecordId
    ? \`/lignesinterventionauto/nouveau?interventionId=\${encodeURIComponent(
        currentRecordId
      )}&returnTo=\${encodeURIComponent(
        \`/interventionsauto/\${currentRecordId}/edit\`
      )}&lockFields=interventionId\`
    : "/lignesinterventionauto/nouveau";
`;

  const insertAt = functionMatch.index + functionMatch[0].length;
  content = content.slice(0, insertAt) + helper + content.slice(insertAt);
}

if (!content.includes("data-amarkhys-edit-add-intervention-line")) {
  const buttonBlock = `
        {isEditingInterventionAuto ? (
          <div
            data-amarkhys-edit-add-intervention-line
            className="mb-6 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-black text-emerald-950">
                Lignes d’intervention
              </p>
              <p className="mt-1 text-xs font-medium text-emerald-700">
                Ajoutez les pièces, la main d’œuvre, les services ou les remises liés à cette intervention.
              </p>
            </div>

            <Link
              href={editInterventionLineHref}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-emerald-800"
            >
              Ajouter une ligne
            </Link>
          </div>
        ) : null}
`;

  const formRegex = /(<form[\s\S]*?>)/m;
  const formMatch = content.match(formRegex);

  if (!formMatch) {
    throw new Error("Impossible de trouver la balise <form>.");
  }

  const insertAt = formMatch.index + formMatch[0].length;
  content = content.slice(0, insertAt) + buttonBlock + content.slice(insertAt);
}

fs.writeFileSync(file, content, "utf8");

console.log("OK: bouton Ajouter une ligne ajouté dans le formulaire edit intervention.");