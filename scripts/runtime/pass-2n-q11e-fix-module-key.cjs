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

const backup = `${file}.bak-q11e-fix-module-key`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

const oldBlock = `  const recordId = String((data?.id ?? "") as string);
  const isInterventionAuto =
    module.key === "interventionsauto" ||
    module.schema?.collection === "interventionsauto";

  const interventionLineCreateHref = recordId`;

const newBlock = `  const recordId = String((data?.id ?? "") as string);
  const moduleKey = String(
    ((module as any).key ??
      (module as any).id ??
      module.metadata?.key ??
      module.metadata?.slug ??
      module.schema?.collection ??
      "") as string
  );

  const isInterventionAuto =
    moduleKey === "interventionsauto" ||
    module.schema?.collection === "interventionsauto";

  const interventionLineCreateHref = recordId`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc module.key introuvable. Vérifie ERPRuntimeDetails.tsx autour de recordId.");
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(file, content, "utf8");

console.log("OK: module.key remplacé par une résolution compatible ERPModule.");