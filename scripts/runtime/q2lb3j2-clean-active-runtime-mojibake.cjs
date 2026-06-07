const fs = require("fs");
const path = require("path");

const root = process.cwd();

function abs(file) {
  return path.join(root, file);
}

function read(file) {
  return fs.readFileSync(abs(file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(abs(file), content, "utf8");
}

let changed = 0;

// 1) ERPRuntimePage.tsx — nettoyer les libellés visibles
{
  const file = "src/components/erp/runtime/ERPRuntimePage.tsx";
  let content = read(file);
  const before = content;

  content = content
    .replaceAll("Action effectuée", "Action effectuée")
    .replaceAll("Action effectuée", "Action effectuée")
    .replaceAll("Prochaine étape", "Prochaine étape")
    .replaceAll("Prochaine étape", "Prochaine étape")
    .replaceAll(" · ", " · ")
    .replaceAll(" Ãƒ"š· ", " · ")
    .replaceAll("création", "création")
    .replaceAll("title=\"Actions métier\"", "title=\"Actions métier\"")
    .replaceAll("title=\"Actions métier\"", "title=\"Actions métier\"")
    .replaceAll("title=\"Actions métier\"", "title=\"Actions métier\"")
    .replaceAll(
      "Vue opérationnelle générée par le Runtime ERP.",
      "Vue opérationnelle générée par le Runtime ERP."
    )
    .replaceAll(
      "title ?? `${moduleLabel} ââ"šÂ¬" ${getRuntimePageTypeLabel(type)}`",
      "title ?? `${moduleLabel} — ${getRuntimePageTypeLabel(type)}`"
    );

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  }
}

// 2) ERPRuntimeActionBar.tsx — nettoyer le titre visible si besoin
{
  const file = "src/components/erp/runtime/ERPRuntimeActionBar.tsx";
  let content = read(file);
  const before = content;

  content = content
    .replaceAll("Actions métier", "Actions métier")
    .replaceAll("Actions métier", "Actions métier")
    .replaceAll("Actions métier", "Actions métier");

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  }
}

// 3) RuntimeActionEngine.ts — nettoyer uniquement les zones actives touchées
{
  const file = "src/runtime/actions/RuntimeActionEngine.ts";
  let content = read(file);
  const before = content;

  // Messages relation governance visibles
  content = content
    .replaceAll(
      "Cette action n'est pas disponible car un enregistrement lié existe déjà.",
      "Cette action n'est pas disponible car un enregistrement lié existe déjà."
    )
    .replaceAll(
      "Cette action n'est pas disponible car un enregistrement lié existe déjà.",
      "Cette action n'est pas disponible car un enregistrement lié existe déjà."
    )
    .replaceAll(
      "Cette action est désactivée car un enregistrement lié existe déjà.",
      "Cette action est désactivée car un enregistrement lié existe déjà."
    )
    .replaceAll(
      "Cette action est désactivée car un enregistrement lié existe déjà.",
      "Cette action est désactivée car un enregistrement lié existe déjà."
    )
    .replaceAll("Action désactivée", "Action désactivée")
    .replaceAll("annulée", "annulée");

  // Nettoyer le commentaire runtimeOnly corrompu sans changer la logique.
  content = content.replace(
    /(\/\/ Q20H5C_RUNTIME_ONLY_ACTIONS[\s\S]*?)(\s*if \(\s*\n\s*allowedActionKeys)/,
    `// Q20H5C_RUNTIME_ONLY_ACTIONS
          // Une action runtimeOnly est une action métier contrôlée
          // qui ne correspond pas forcément à une transition de statut.
$2`
  );

  // Nettoyer le commentaire retrait ligne corrompu sans changer la logique.
  content = content.replace(
    /(\/\/ Q20H5C_B2_REMOVE_LINE_ACTION[\s\S]*?)(\s*if \(\s*\n\s*module\?\.metadata\?\.key === "lignesinterventionauto")/,
    `// Q20H5C_B2_REMOVE_LINE_ACTION
      // Action métier non-transitionnelle : retirer proprement une ligne
      // sans réintroduire un statut utilisateur "annulée".
$2`
  );

  // Remplacer les messages visibles très corrompus du retrait ligne par des messages lisibles.
  content = content.replace(
    /reason:\s*"Ligne retir[\s\S]*?mÃ[\s\S]*?tier\.",/,
    `reason: "Ligne retirée depuis l'action métier.",`
  );

  content = content.replace(
    /\?\s*"Cette ligne est d[\s\S]*?li[\s\S]*?e[\s\S]*?"/,
    `? "Cette ligne est déjà liée à une opération métier."`
  );

  content = content.replace(
    /"Cette action n'est pas disponible dans l'[\s\S]*?tat actuel\.",/,
    `"Cette action n'est pas disponible dans l'état actuel.",`
  );

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  }
}

// 4) Supprimer scripts intermédiaires si encore présents
[
  "scripts/runtime/q2lb3g2-remove-intervention-facturee-references.cjs",
  "scripts/runtime/q2lb3i-b1d-fix-runtime-action-engine-method-placement.cjs",
  "scripts/runtime/q2lb3i-b2c-show-disabled-action-reasons.cjs",
].forEach((file) => {
  const fullPath = abs(file);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log("[REMOVED]", file);
  }
});

console.log("[Q2-L-B3-J2] Changed source files:", changed);