/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, suffix) {
  const target = `${file}.bak-${suffix}`;

  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function replaceAll(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.split(from).join(to);
}

function patchRuntimeLineItemEngine() {
  const file = p(
    "src",
    "runtime",
    "line-items",
    "RuntimeLineItemEngine.ts"
  );

  backup(file, "q16c3b-prix-vente-priority");

  let content = read(file);

  const oldCandidates = `  const candidates = [
    product.prixPromo,
    product.prixUnitaireHT,
    product.prixVente,
    product.prixUnitaire,
  ];`;

  const newCandidates = `  const candidates = [
    // Prix atelier de référence.
    product.prixVente,
    product.prixUnitaireHT,
    product.prixUnitaire,

    // Prix promotionnel réservé aux usages promo/boutique futurs.
    product.prixPromo,
  ];`;

  content = replaceAll(
    content,
    oldCandidates,
    newCandidates,
    "RuntimeLineItemEngine price candidates"
  );

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchLignesInterventionAutoFill() {
  const file = p(
    "src",
    "runtime",
    "modules",
    "generated",
    "lignesinterventionauto",
    "lignesinterventionauto.module.ts"
  );

  backup(file, "q16c3b-prix-vente-autofill");

  let content = read(file);

  content = replaceAll(
    content,
    `prixUnitaireHT: ["prixPromo", "prixUnitaireHT", "prixVente", "prixUnitaire"],`,
    `prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],`,
    "autoFill prixUnitaireHT"
  );

  content = replaceAll(
    content,
    `prixUnitaire: ["prixPromo", "prixUnitaireHT", "prixVente", "prixUnitaire"],`,
    `prixUnitaire: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],`,
    "autoFill prixUnitaire"
  );

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function main() {
  console.log("");
  console.log("[PASS] 2N-Q16C3B - Prioritize prixVente for line item snapshots");

  patchRuntimeLineItemEngine();
  patchLignesInterventionAutoFill();

  console.log("");
  console.log("[Q16C3B_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester choix produit avec prixVente=10000 et prixPromo=8000");
}

main();