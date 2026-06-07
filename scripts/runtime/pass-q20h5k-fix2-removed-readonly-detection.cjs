const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q20h5k-fix2-removed-readonly-detection`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q20h5k-fix2-removed-readonly-detection`);
}

let content = fs.readFileSync(file, "utf8");

// 1) Strong removed-record detection.
// Use several technical markers, because removedAt may not always be enough
// depending on the data shape passed by runtime detail/edit pages.
content = content.replace(
  /const isRemovedRecord\s*=\s*forceReadOnlyBecauseRemoved \|\| Boolean\(initialData\?\.removedAt\);/,
  `const isRemovedRecord =
    forceReadOnlyBecauseRemoved ||
    Boolean(initialData?.removedAt) ||
    Boolean(initialData?.removedFromStatus) ||
    Boolean(initialData?.removedReason) ||
    Boolean(initialData?.stockReversalMovementId);`
);

// 2) Hard guard in submit handler. Even if a button is still visible,
// a removed record must never be persisted again from the form.
if (!content.includes("Q20H5K_REMOVED_RECORD_SUBMIT_GUARD")) {
  content = content.replace(
    `async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setSaving(true);`,
    `async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // Q20H5K_REMOVED_RECORD_SUBMIT_GUARD
    // Removed records are audit records. They must not be edited again from the form.
    if (isRemovedRecord) {
      setErrors([
        {
          field: "removedRecord",
          message: "Cette ligne a ete retiree et ne peut plus etre modifiee.",
        },
      ]);
      return;
    }

    setSaving(true);`
  );
}

// 3) Ensure workflow actions are hidden for removed records.
content = content.replace(
  /mode === "edit" && workflowActions\.length > 0 && \(/,
  `mode === "edit" && !isRemovedRecord && workflowActions.length > 0 && (`
);

// 4) Ensure submit is blocked at form level.
content = content.replace(
  /onSubmit=\{handleSubmit\}/g,
  `onSubmit={isRemovedRecord ? (event) => event.preventDefault() : handleSubmit}`
);

// 5) Ensure readonly banner exists after breadcrumb.
if (!content.includes("data-removed-record-readonly-banner")) {
  content = content.replace(
    `<ERPReturnBreadcrumb />`,
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
            Ligne retiree - lecture seule
          </div>
          <p className="mt-1 text-sm font-medium text-slate-600">
            Cette ligne a ete retiree du flux actif. Elle reste conservee pour l'audit, la tracabilite, les mouvements stock et les totaux, mais elle ne peut plus etre modifiee.
          </p>
        </section>
      ) : null}`
  );
}

// 6) If banner exists but with accented text that got broken, normalize to ASCII safe text.
content = content.replace(
  /Ligne retirée\s*—\s*lecture seule/g,
  "Ligne retiree - lecture seule"
);

content = content.replace(
  /Cette ligne a été retirée du flux actif\. Elle reste conservée pour l'audit,[\s\S]*?elle ne peut plus être modifiée\./g,
  "Cette ligne a ete retiree du flux actif. Elle reste conservee pour l'audit, la tracabilite, les mouvements stock et les totaux, mais elle ne peut plus etre modifiee."
);

// 7) Clean specific visible broken UI texts with ASCII safe wording.
const replacements = [
  [
    /Statut pilot[\s\S]{0,25} par les actions\./g,
    "Statut pilote par les actions."
  ],
  [
    /Le statut indique[\s\S]{0,160}systeme\./g,
    "Le statut indique l'etat metier de la fiche. Pour changer cet etat, utilisez les boutons d'action prevus par le systeme."
  ],
  [
    /Suppression masqu[\s\S]{0,260}proprement\./g,
    "Suppression masquee pour preserver l'historique. Utilisez l'action metier adaptee, comme Retirer la ligne, afin que le stock, les totaux et la tracabilite soient corriges proprement."
  ],
  [
    /Cette action conserve[\s\S]{0,120}suppression brutale\./g,
    "Cette action conserve l'historique et evite une suppression brutale."
  ],
  [
    /• \{error\.field\} : \{error\.message\}/g,
    "- {error.field} : {error.message}"
  ],
  [
    /ÃƒÆ’Ã‚/g,
    ""
  ],
  [
    /Ãƒ¢â"š¬â"ž¢/g,
    "'"
  ],
  [
    /Ãƒ¢â"š¬Ã‚¢/g,
    "-"
  ],
  [
    /Ãƒ¢â"š¬Ã…/g,
    '"'
  ],
  [
    /Ãƒ¢â"š¬Ã‚/g,
    '"'
  ],
  [
    /é/g,
    "e"
  ],
  [
    /è/g,
    "e"
  ],
  [
    /ê/g,
    "e"
  ],
  [
    /à/g,
    "a"
  ],
  [
    /ç/g,
    "c"
  ],
  [
    /Â/g,
    ""
  ]
];

for (const [bad, good] of replacements) {
  content = content.replace(bad, good);
}

// 8) Ensure button disabling remains.
content = content.replaceAll(
  "disabled={saving}",
  "disabled={saving || isRemovedRecord}"
);

// Avoid repeated duplicated expression.
content = content.replaceAll(
  "disabled={saving || isRemovedRecord || isRemovedRecord}",
  "disabled={saving || isRemovedRecord}"
);

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Removed readonly detection strengthened and visible mojibake cleaned.");
console.log("Next:");
console.log("  pnpm build");
console.log("  test http://localhost:3000/lignesinterventionauto/02DDBb85YycfiOU2wRDg/edit");