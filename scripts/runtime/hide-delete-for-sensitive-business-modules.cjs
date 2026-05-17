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
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

/**
 * 1) Ajouter helper module sensible avant le return si absent.
 */
if (!content.includes("function isSensitiveBusinessModule()")) {
  const formIndex = content.indexOf("<form");

  if (formIndex === -1) {
    console.error("FORM TAG NOT FOUND");
    process.exit(1);
  }

  const returnIndex = content.lastIndexOf("  return (", formIndex);

  if (returnIndex === -1) {
    console.error("RETURN MARKER NOT FOUND");
    process.exit(1);
  }

  const helper = `  function isSensitiveBusinessModule() {
    return [
      "clientsauto",
      "vehicules",
      "facturesauto",
      "encaissementsauto",
      "echeancespaiementauto",
    ].includes(module.metadata.key);
  }

  const sensitiveBusinessModule =
    isSensitiveBusinessModule();

`;

  content =
    content.slice(0, returnIndex) +
    helper +
    content.slice(returnIndex);
}

/**
 * 2) Modifier condition du bouton Supprimer.
 */
content = content.replace(
  `{mode === "edit" && Boolean(initialData?.id) ? (`,
  `{mode === "edit" && Boolean(initialData?.id) && !sensitiveBusinessModule ? (`
);

/**
 * 3) Ajouter un message explicatif pour les modules sensibles.
 */
if (!content.includes("data-sensitive-delete-hidden-notice")) {
  const deleteBlockMarker =
    `{mode === "edit" && Boolean(initialData?.id) && !sensitiveBusinessModule ? (`;

  const index = content.indexOf(deleteBlockMarker);

  if (index === -1) {
    console.error("DELETE BUTTON BLOCK NOT FOUND");
    process.exit(1);
  }

  const notice = `            {mode === "edit" && Boolean(initialData?.id) && sensitiveBusinessModule ? (
              <div
                data-sensitive-delete-hidden-notice
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                Suppression masquée pour ce module sensible. Utilisez l’action métier
                d’archivage ou d’annulation afin de conserver l’historique.
              </div>
            ) : null}

`;

  content =
    content.slice(0, index) +
    notice +
    content.slice(index);
}

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED ERPEnterpriseForm hide delete for sensitive modules");