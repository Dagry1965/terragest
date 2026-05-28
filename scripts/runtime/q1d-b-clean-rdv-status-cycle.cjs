const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rdvModuleFile = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "rendezvous",
  "rendezvous.module.ts"
);

const rdvActionsFile = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "rendezvous",
  "rendezvous.actions.ts"
);

for (const file of [rdvModuleFile, rdvActionsFile]) {
  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + file);
  }
}

{
  const original = fs.readFileSync(rdvModuleFile, "utf8");
  let content = original;

  fs.writeFileSync(
    rdvModuleFile + ".bak-q1d-b-clean-rdv-status-cycle",
    original,
    "utf8"
  );

  /**
   * Q1-D-B
   * RDV = cycle planning / présence.
   * La facturation n'appartient pas au statut RDV.
   */

  // 1. Retirer Facturé du select statut RDV.
  content = content.replace(
    /\s*\{\s*label:\s*"Facturé",\s*value:\s*"facture"\s*\},?/g,
    ""
  );

  content = content.replace(
    /\s*\{\s*label:\s*"FacturÃ©",\s*value:\s*"facture"\s*\},?/g,
    ""
  );

  // 2. Retirer l'état facture du workflow RDV.
  content = content.replace(
    /\s*\{\s*key:\s*"facture",\s*label:\s*"Facturé",\s*color:\s*"default"\s*\},?/g,
    ""
  );

  content = content.replace(
    /\s*\{\s*key:\s*"facture",\s*label:\s*"FacturÃ©",\s*color:\s*"default"\s*\},?/g,
    ""
  );

  // 3. Retirer la transition terminé -> facturé.
  content = content.replace(
    /\s*\{\s*from:\s*"termine",\s*to:\s*"facture",\s*action:\s*"Facturer"\s*\},?/g,
    ""
  );

  // 4. Remplacer l'annulation unique par annulation depuis états actifs.
  content = content.replace(
    /\{\s*from:\s*"planifie",\s*to:\s*"annule",\s*action:\s*"Annuler"\s*\}/,
    `{ from: "planifie", to: "annule", action: "Annuler" },
        { from: "confirme", to: "annule", action: "Annuler" },
        { from: "en_cours", to: "annule", action: "Annuler" }`
  );

  const problems = [];

  if (content.includes('value: "facture"')) {
    problems.push("value facture encore présent dans rendezvous.module.ts");
  }

  if (content.includes('to: "facture"')) {
    problems.push("transition vers facture encore présente");
  }

  if (!content.includes('{ from: "confirme", to: "annule", action: "Annuler" }')) {
    problems.push("annulation depuis confirme absente");
  }

  if (!content.includes('{ from: "en_cours", to: "annule", action: "Annuler" }')) {
    problems.push("annulation depuis en_cours absente");
  }

  if (problems.length > 0) {
    console.log("[FAIL] rendezvous.module.ts incomplet:");
    for (const problem of problems) console.log(" - " + problem);
    process.exit(1);
  }

  fs.writeFileSync(rdvModuleFile, content, "utf8");
  console.log("[WRITTEN]", path.relative(ROOT, rdvModuleFile));
}

{
  const original = fs.readFileSync(rdvActionsFile, "utf8");
  let content = original;

  fs.writeFileSync(
    rdvActionsFile + ".bak-q1d-b-clean-rdv-actions",
    original,
    "utf8"
  );

  // Retirer l'action Facturer du RDV.
  content = content.replace(
    /\s*\{\s*key:\s*"Facturer",[\s\S]*?permission:\s*"rendezvous\.workflow",\s*\},?/,
    ""
  );

  if (content.includes('key: "Facturer"')) {
    console.log("[FAIL] Action Facturer encore présente dans rendezvous.actions.ts");
    process.exit(1);
  }

  fs.writeFileSync(rdvActionsFile, content, "utf8");
  console.log("[WRITTEN]", path.relative(ROOT, rdvActionsFile));
}

console.log("");
console.log("[DONE] Q1-D-B cycle RDV nettoyé : plus de Facturé, annulation élargie.");
console.log("");
console.log("Next:");
console.log("pnpm build");
