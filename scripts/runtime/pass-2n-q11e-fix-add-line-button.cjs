const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "src", "components", "erp", "runtime", "ERPRuntimeDetails.tsx");

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q11e-add-line-button`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

if (!content.includes(`from "next/link"`)) {
  content = content.replace(
    /("use client";\s*)/,
    `$1\nimport Link from "next/link";\n`
  );
}

if (!content.includes("interventionLineCreateHref")) {
  const functionMatch = content.match(/export function ERPRuntimeDetails\s*\([\s\S]*?\)\s*\{/);

  if (!functionMatch) {
    throw new Error("Impossible de trouver la fonction ERPRuntimeDetails.");
  }

  const insertAfter = functionMatch.index + functionMatch[0].length;

  const helper = `

  const recordId = String((data?.id ?? "") as string);
  const isInterventionAuto =
    module.key === "interventionsauto" ||
    module.schema?.collection === "interventionsauto";

  const interventionLineCreateHref = recordId
    ? \`/lignesinterventionauto/nouveau?interventionId=\${encodeURIComponent(
        recordId
      )}&returnTo=\${encodeURIComponent(
        \`/interventionsauto/\${recordId}\`
      )}&lockFields=interventionId\`
    : "/lignesinterventionauto/nouveau";
`;

  content =
    content.slice(0, insertAfter) +
    helper +
    content.slice(insertAfter);
}

const buttonBlock = `
          {isInterventionAuto && recordId ? (
            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-950">
                  Lignes d’intervention
                </p>
                <p className="text-xs text-emerald-700">
                  Ajoutez les pièces, la main d’œuvre, les services ou les remises liés à cette intervention.
                </p>
              </div>

              <Link
                href={interventionLineCreateHref}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Ajouter une ligne
              </Link>
            </div>
          ) : null}
`;

if (!content.includes("Ajoutez les pièces, la main d’œuvre")) {
  if (content.includes("Lignes existantes")) {
    const lines = content.split("\n");
    const index = lines.findIndex((line) => line.includes("Lignes existantes"));

    if (index === -1) {
      throw new Error("Bloc Lignes existantes introuvable malgré détection.");
    }

    lines.splice(index, 0, buttonBlock);
    content = lines.join("\n");
  } else {
    throw new Error(
      "Le bloc 'Lignes existantes' est introuvable. Il faut inspecter manuellement ERPRuntimeDetails.tsx."
    );
  }
}

fs.writeFileSync(file, content, "utf8");

console.log("OK: bouton Ajouter une ligne restauré dans ERPRuntimeDetails.tsx");