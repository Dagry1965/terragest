const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q20h5k-fix-removed-readonly-safe`);

function u(parts) {
  return parts.join("");
}

if (!fs.existsSync(file)) {
  console.error(`[ERROR] File not found: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q20h5k-fix-removed-readonly-safe`);
}

let content = fs.readFileSync(file, "utf8");

// Ensure submit is blocked for removed records.
content = content.replace(
  /onSubmit=\{handleSubmit\}/,
  "onSubmit={isRemovedRecord ? (event) => event.preventDefault() : handleSubmit}"
);

// Insert readonly banner after breadcrumb.
const bannerTitle =
  "Ligne retir\u00e9e \u2014 lecture seule";

const bannerText =
  "Cette ligne a \u00e9t\u00e9 retir\u00e9e du flux actif. Elle reste conserv\u00e9e pour l'audit, la tra\u00e7abilit\u00e9, les mouvements stock et les totaux, mais elle ne peut plus \u00eatre modifi\u00e9e.";

if (!content.includes("data-removed-record-readonly-banner")) {
  content = content.replace(
    "<ERPReturnBreadcrumb />",
    `<ERPReturnBreadcrumb />

      {isRemovedRecord ? (
        <section
          data-removed-record-readonly-banner
          className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-5
            py-4
            shadow-sm
          "
        >
          <div className="text-sm font-black text-slate-900">
            ${bannerTitle}
          </div>
          <p className="mt-1 text-sm font-medium text-slate-600">
            ${bannerText}
          </p>
        </section>
      ) : null}`
  );
}

// Disable save buttons controlled by saving.
content = content.replaceAll(
  "disabled={saving}",
  "disabled={saving || isRemovedRecord}"
);

// Prevent business status actions on removed records.
content = content.replace(
  "const businessStatusAction = getBusinessStatusAction();",
  "const businessStatusAction = isRemovedRecord ? null : getBusinessStatusAction();"
);

// Clean known mojibake in this file.
const replacements = [
  ["crÃ©ation", "cr\u00e9ation"],
  ["gÃ©nÃ©rÃ©e", "g\u00e9n\u00e9r\u00e9e"],
  ["donnÃ©es", "donn\u00e9es"],
  ["CrÃ©ation", "Cr\u00e9ation"],
  ["sÃ©lectionner", "s\u00e9lectionner"],
  ["vÃ©hicule", "v\u00e9hicule"],
  ["dÃ©jÃ", "d\u00e9j\u00e0"],
  ["Ã©tÃ©", "\u00e9t\u00e9"],
  ["consommÃ©", "consomm\u00e9"],
  ["gÃ©nÃ©rÃ©", "g\u00e9n\u00e9r\u00e9"],
  ["rÃ¨gles", "r\u00e8gles"],
  ["mÃ©tier", "m\u00e9tier"],
  ["crÃ©neau", "cr\u00e9neau"],
  ["Ãªtre", "\u00eatre"],
  ["Supprimer cet Ã©lÃ©ment ?", "Supprimer cet \u00e9l\u00e9ment ?"],
  ["Action mÃ©tier impossible.", "Action m\u00e9tier impossible."],
  ["Archiver vÃ©hicule", "Archiver v\u00e9hicule"],
  ["Annuler Ã©chÃ©ance", "Annuler \u00e9ch\u00e9ance"],
  ["DÃ©jÃ payÃ©", "D\u00e9j\u00e0 pay\u00e9"],
  ["CrÃ©e un encaissement liÃ© Ã cette facture", "Cr\u00e9e un encaissement li\u00e9 \u00e0 cette facture"],
  ["lÃ¢â‚¬â„¢historique", "l'historique"],
  ["dÃ¢â‚¬â„¢action", "d'action"],
  ["Ã¢â‚¬Å“", "\u201c"],
  ["Ã¢â‚¬Â", "\u201d"],
  ["â€™", "'"],
  ["â€”", "\u2014"],
  ["â€“", "\u2013"],
  ["Â", ""]
];

for (const [bad, good] of replacements) {
  content = content.split(bad).join(good);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Removed record readonly patch applied with safe UTF-8 strings.");
console.log("Next: pnpm build");