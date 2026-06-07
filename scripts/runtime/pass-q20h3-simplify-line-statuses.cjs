const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "lignesinterventionauto",
  "lignesinterventionauto.module.ts"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function backup(file, suffix) {
  const backupPath = `${file}.bak-${suffix}`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

if (!fs.existsSync(target)) {
  throw new Error(`Fichier introuvable: ${target}`);
}

backup(target, "q20h3-simplify-line-statuses");

let content = read(target);

if (content.includes("Q20H3_SIMPLIFIED_LINE_STATUSES")) {
  console.log("[SKIP] Q20H3 semble déjà appliqué.");
  process.exit(0);
}

/**
 * 1. Réduire les options visibles du champ statut.
 */
content = content.replace(
`        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validée", value: "validee" },
          { label: "Facturée", value: "facturee" },
          { label: "Annulée", value: "annulee" },
        ],`,
`        // Q20H3_SIMPLIFIED_LINE_STATUSES
        // Côté utilisateur, une ligne est seulement préparée ou confirmée.
        // Facturation/retrait sont gérés par relations/actions runtime, pas par statut manuel.
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validée", value: "validee" },
        ],`
);

content = content.replace(
`        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validée", value: "validee" },
          { label: "Facturée", value: "facturee" },
          { label: "Annulée", value: "annulee" },
        ],`,
`        // Q20H3_SIMPLIFIED_LINE_STATUSES
        // Côté utilisateur, une ligne est seulement préparée ou confirmée.
        // Facturation/retrait sont gérés par relations/actions runtime, pas par statut manuel.
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validée", value: "validee" },
        ],`
);

/**
 * 2. Réduire les états workflow.
 */
content = content.replace(
`      states: [
        { key: "brouillon", label: "Brouillon", color: "default" },
        { key: "validee", label: "Validée", color: "success" },
        { key: "facturee", label: "Facturée", color: "info" },
        { key: "annulee", label: "Annulée", color: "danger" },
      ],

      transitions: [
        { from: "brouillon", to: "validee", action: "Valider" },
        { from: "validee", to: "facturee", action: "Marquer facturée" },
        { from: "brouillon", to: "annulee", action: "Annuler" },
        { from: "validee", to: "annulee", action: "Annuler" },
      ],`,
`      // Q20H3_SIMPLIFIED_LINE_WORKFLOW
      // Le workflow visible reste volontairement simple.
      // Les états de facturation, retrait ou neutralisation sont techniques.
      states: [
        { key: "brouillon", label: "Brouillon", color: "default" },
        { key: "validee", label: "Validée", color: "success" },
      ],

      transitions: [
        { from: "brouillon", to: "validee", action: "Valider" },
      ],`
);

content = content.replace(
`      states: [
        { key: "brouillon", label: "Brouillon", color: "default" },
        { key: "validee", label: "Validée", color: "success" },
        { key: "facturee", label: "Facturée", color: "info" },
        { key: "annulee", label: "Annulée", color: "danger" },
      ],

      transitions: [
        { from: "brouillon", to: "validee", action: "Valider" },
        { from: "validee", to: "facturee", action: "Marquer facturée" },
        { from: "brouillon", to: "annulee", action: "Annuler" },
        { from: "validee", to: "annulee", action: "Annuler" },
      ],`,
`      // Q20H3_SIMPLIFIED_LINE_WORKFLOW
      // Le workflow visible reste volontairement simple.
      // Les états de facturation, retrait ou neutralisation sont techniques.
      states: [
        { key: "brouillon", label: "Brouillon", color: "default" },
        { key: "validee", label: "Validée", color: "success" },
      ],

      transitions: [
        { from: "brouillon", to: "validee", action: "Valider" },
      ],`
);

if (!content.includes("Q20H3_SIMPLIFIED_LINE_STATUSES")) {
  throw new Error("Le champ statut n'a pas été simplifié. Motif non trouvé.");
}

if (!content.includes("Q20H3_SIMPLIFIED_LINE_WORKFLOW")) {
  throw new Error("Le workflow ligne n'a pas été simplifié. Motif non trouvé.");
}

write(target, content);

console.log("");
console.log("[Q20H3_DONE] Statuts lignes intervention simplifiés.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("");
console.log("Tests:");
console.log("  /lignesinterventionauto/DEMO-LIGNE-001/edit");
console.log("  vérifier que le statut propose seulement Brouillon / Validée");
console.log("  vérifier que le bouton workflow propose seulement Valider si brouillon");