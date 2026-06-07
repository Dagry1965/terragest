const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRelatedRecordsPanel.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q12h-d-fix-open-links`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

// 1. Remplace buildChildEditHref pour prendre parentModule/parentRecord/mode
const oldFunctionRegex =
/function buildChildEditHref\(\s*child: ERPCompositionChild,\s*record: Record<string, unknown>\s*\): string \{\s*const id = getRecordId\(record\);\s*if \(!id\) return "#";\s*return "\/" \+ child\.moduleKey \+ "\/" \+ id \+ "\/edit";\s*\}/m;

const newFunction = `function buildChildEditHref(
  child: ERPCompositionChild,
  record: Record<string, unknown>,
  parentModule: ERPModule,
  parentRecord: Record<string, unknown>,
  mode: "detail" | "edit"
): string {
  const id = getRecordId(record);

  if (!id) return "#";

  const parentId = getRecordId(parentRecord);
  const params = new URLSearchParams();

  if (parentId) {
    params.set(
      "returnTo",
      "/" +
        parentModule.metadata.key +
        "/" +
        parentId +
        (mode === "edit" ? "/edit" : "")
    );

    params.set("returnLabel", "Retour");
  }

  const query = params.toString();

  return (
    "/" +
    child.moduleKey +
    "/" +
    encodeURIComponent(id) +
    "/edit" +
    (query ? "?" + query : "")
  );
}`;

if (!oldFunctionRegex.test(content)) {
  throw new Error("Fonction buildChildEditHref introuvable ou déjà modifiée.");
}

content = content.replace(oldFunctionRegex, newFunction);

// 2. Remplace l'appel href
content = content.replace(
  `href={buildChildEditHref(child, record)}`,
  `href={buildChildEditHref(
                child,
                record,
                parentModule,
                parentRecord,
                mode
              )}`
);

// 3. Nettoyage backup éventuel / mojibake
content = content.replace(/·/g, "·");
content = content.replace(/lié/g, "lié");

fs.writeFileSync(file, content, "utf8");

console.log("OK: liens ouvrir des enregistrements liés corrigés.");