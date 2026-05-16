const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/components/erp/runtime/ERPRuntimePage.tsx"
);

if (!fs.existsSync(target)) {
  throw new Error(`File not found: ${target}`);
}

let content = fs.readFileSync(target, "utf8");
const original = content;

// 1. Ajouter createActionLabel / createActionHref après resolvedTitle si absent
if (!content.includes("const createActionLabel")) {
  content = content.replace(
    /(const resolvedTitle\s*=\s*[\s\S]*?;\s*)\n\s*const runtimeActions\s*=/,
    `$1

  const createActionLabel =
    module?.metadata?.key === "rendezvous"
      ? "Nouveau rendez-vous"
      : \`Nouveau \${moduleLabel}\`;

  const createActionHref =
    module
      ? \`/\${module.metadata.key}/nouveau\`
      : "#";

  const runtimeActions =`
  );
}

// 2. Ajouter bouton Nouveau en haut du bloc <div className="space-y-6">
if (!content.includes("{createActionLabel}")) {
  content = content.replace(
    /<div className="space-y-6">\s*/,
    `<div className="space-y-6">
        {type === "list" && module && (
          <div className="flex items-center justify-end">
            <a
              href={createActionHref}
              className="
                rounded-2xl
                bg-slate-950
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-sm
                transition
                hover:bg-slate-800
              "
            >
              {createActionLabel}
            </a>
          </div>
        )}

        `
  );
}

if (content === original) {
  throw new Error("Aucune modification appliquée. ERPRuntimePage.tsx n'a pas le format attendu.");
}

fs.writeFileSync(target, content, "utf8");

console.log("OK bouton Nouveau ajouté en vue liste.");
console.log("Fichier modifié :", path.relative(ROOT, target));