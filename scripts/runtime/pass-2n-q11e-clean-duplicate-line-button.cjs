const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRuntimeDetails.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q11e-clean-duplicate-line-button`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

// Supprime uniquement le bloc vert ajouté par erreur dans "Lignes existantes"
const wrongBlockRegex =
/\s*\{isInterventionAuto && recordId \? \(\s*<div className="mb-6 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50\/70 p-4 sm:flex-row sm:items-center sm:justify-between">[\s\S]*?<Link\s+href=\{interventionLineCreateHref\}[\s\S]*?Ajouter une ligne[\s\S]*?<\/Link>\s*<\/div>\s*\) : null\}/m;

if (!wrongBlockRegex.test(content)) {
  console.log("INFO: bloc vert dupliqué non trouvé. Aucun nettoyage nécessaire pour ce bloc.");
} else {
  content = content.replace(wrongBlockRegex, "");
  console.log("OK: bloc vert dupliqué supprimé.");
}

// Supprime les variables ajoutées uniquement pour le bloc vert si elles ne servent plus
content = content.replace(
/\s*const moduleKey = String\(\s*\(\(module as any\)\.key \?\?[\s\S]*?module\.schema\?\.collection \?\?\s*""\) as string\s*\)\s*\);\s*const isInterventionAuto =\s*moduleKey === "interventionsauto" \|\|\s*module\.schema\?\.collection === "interventionsauto";\s*const interventionLineCreateHref = recordId\s*\?[\s\S]*?: "\/lignesinterventionauto\/nouveau";\s*/m,
"\n"
);

fs.writeFileSync(file, content, "utf8");

console.log("OK: ERPRuntimeDetails.tsx nettoyé.");