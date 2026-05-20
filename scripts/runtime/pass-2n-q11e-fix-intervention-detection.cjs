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

const backup = `${file}.bak-q11e-fix-intervention-detection`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

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

  const isIntervention =
    runtimeModuleKey === "interventionsauto" ||
    runtimeModuleKey.includes("intervention") ||
    module.schema?.collection === "interventionsauto";
`;

const regex = /\s*const isIntervention\s*=[\s\S]*?;\s*/m;

if (!regex.test(content)) {
  throw new Error("Impossible de trouver const isIntervention dans ERPRuntimeDetails.tsx");
}

content = content.replace(regex, "\n" + helper + "\n");

fs.writeFileSync(file, content, "utf8");

console.log("OK: détection isIntervention renforcée.");