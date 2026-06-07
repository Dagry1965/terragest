const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q20h5k-final-clean-removed-readonly-form`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q20h5k-final-clean-removed-readonly-form`);
}

let content = fs.readFileSync(file, "utf8");

// 1) Add hard submit guard if missing.
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

// 2) Replace removed readonly banner block by clean ASCII-safe block.
content = content.replace(
  /\{isRemovedRecord \? \(\s*<section\s*data-removed-record-readonly-banner[\s\S]*?<\/section>\s*\) : null\}/,
  `{isRemovedRecord ? (
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

// 3) Clean targeted user-visible strings.
const exactReplacements = [
  [`// CrÃƒ©ation directe : aucun champ composition.lockedFields n'est bloquÃƒ©.`, `// Creation directe : aucun champ composition.lockedFields n'est bloque.`],
  [`// CrÃƒ©ation enfant : seuls les champs transmis par lockFields dans l'URL sont bloqu`, `// Creation enfant : seuls les champs transmis par lockFields dans l'URL sont bloques.`],
  [`// Edit/detail : les verrous de composition restent appliquÃƒ©s.`, `// Edit/detail : les verrous de composition restent appliques.`],

  [`"Les rÃƒ¨gles mÃƒ©tier ERP bloquent cet enregistrement."`, `"Les regles metier ERP bloquent cet enregistrement."`],
  [`"Supprimer cet Ãƒ©lÃƒ©ment ?"`, `"Supprimer cet element ?"`],
  [`"Action mÃƒ©tier impossible."`, `"Action metier impossible."`],

  [`label: "Archiver vÃƒ©hicule",`, `label: "Archiver vehicule",`],
  [`label: "Annuler Ãƒ©chÃƒ©ance",`, `label: "Annuler echeance",`],

  [`"Archiver ce client ? Il ne sera pas supprimÃƒ© et son historique sera conser`, `"Archiver ce client ? Il ne sera pas supprime et son historique sera conserve.",`],
  [`"Archiver ce vÃƒ©hicule ? Il ne sera pas supprimÃƒ© et son historique sera co`, `"Archiver ce vehicule ? Il ne sera pas supprime et son historique sera conserve.",`],

  [`CrÃƒ©e un encaissement liÃƒ© Ãƒ  cette facture. Le montant payÃƒ©, le r`, `Cree un encaissement lie a cette facture. Le montant paye, le reste a payer et l'historique seront mis a jour.`],
  [`DÃƒ©jÃƒ  payÃƒ©`, `Deja paye`],
  [`Reste Ãƒ  payer`, `Reste a payer`],
  [`Ces actions enregistrent d'abord le formulaire, puis exÃƒ©cutent le workf`, `Ces actions enregistrent d'abord le formulaire, puis executent le workflow.`],
  [`CrÃƒ©ation`, `Creation`],
  [`Formulaire mÃƒ©tier connectÃƒ© au binding runtime.`, `Formulaire metier connecte au binding runtime.`],
  [`Associe cet Ãƒ©lÃƒ©ment aux autres objets mÃƒ©tier.`, `Associe cet element aux autres objets metier.`],
  [`Validation mÃƒ©tier`, `Validation metier`],
  [`Action mÃƒ©tier`, `Action metier`],
];

for (const [bad, good] of exactReplacements) {
  content = content.split(bad).join(good);
}

// 4) Replace full known status guidance block text.
content = content.replace(
  /<span className="font-semibold text-slate-900">\s*Statut pilote par les actions\.\s*<\/span>\{" "\}\s*[\s\S]*?utilisez les boutons[\s\S]*?<\/div>/,
  `<span className="font-semibold text-slate-900">
              Statut pilote par les actions.
            </span>{" "}
            Le statut indique l'etat metier de la fiche. Pour changer cet etat,
            utilisez les boutons d'action prevus par le systeme.
          </div>`
);

// 5) Replace error bullet.
content = content.replace(
  /"¢ \{error\.field\} : \{error\.message\}/g,
  `- {error.field} : {error.message}`
);

// 6) Replace sensitive delete notice content.
content = content.replace(
  /Suppression masquee pour preserver l'historique\. Utilisez l'action meti[\s\S]*?<\/div>/,
  `Suppression masquee pour preserver l'historique. Utilisez l'action metier adaptee, comme "Retirer la ligne", afin que le stock, les totaux et la tracabilite soient corriges proprement.
              </div>`
);

// 7) Last safe mojibake fragments to ASCII.
const fragmentReplacements = [
  [/Ãƒ©/g, "e"],
  [/Ãƒ¨/g, "e"],
  [/Ãƒª/g, "e"],
  [/Ãƒ /g, "a"],
  [/Ãƒ§/g, "c"],
  [/Ãƒ/g, ""],
  [/""/g, "-"],
  [/"¢/g, "-"],
  [/"/g, ""],
  [/Â/g, ""],
];

for (const [bad, good] of fragmentReplacements) {
  content = content.replace(bad, good);
}

// 8) Ensure removed records do not show workflow actions.
content = content.replace(
  /mode === "edit" && workflowActions\.length > 0 && \(/g,
  `mode === "edit" && !isRemovedRecord && workflowActions.length > 0 && (`
);

// 9) Ensure disabled buttons.
content = content.replaceAll(
  "disabled={saving}",
  "disabled={saving || isRemovedRecord}"
);
content = content.replaceAll(
  "disabled={saving || isRemovedRecord || isRemovedRecord}",
  "disabled={saving || isRemovedRecord}"
);

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Final removed readonly form cleanup applied.");
console.log("Next: inspect remaining mojibake, pnpm build, UI test.");