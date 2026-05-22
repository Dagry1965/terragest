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
  if (!fs.existsSync(file)) {
    return;
  }

  const target = `${file}.bak-${suffix}`;

  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.replace(from, to);
}

function main() {
  const file = p(
    "src",
    "runtime",
    "modules",
    "generated",
    "facturesauto",
    "facturesauto.module.ts"
  );

  backup(file, "q18h1-govern-invoice-fields");

  let content = read(file);

  content = content.replace(
    `        label: "TVA",`,
    `        label: "Taux TVA (%)",`
  );

  if (!content.includes("composition: {")) {
    content = replaceOnce(
      content,
      `  actions: facturesautoActions,`,
      `  composition: {
    lockedFields: [
      "numeroFacture",
      "clientId",
      "vehiculeId",
      "interventionId",
    ],

    readOnlyFields: [
      "statutPaiement",
      "montantTTC",
      "montantPaye",
      "resteAPayer",
      "dernierEnvoiFactureAt",
      "canalDernierEnvoiFacture",
      "destinataireDernierEnvoiFacture",
      "nombreEnvoisFacture",
    ],
  },

  actions: facturesautoActions,`,
      "insert invoice composition governance"
    );
  }

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18H1_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester edition facture");
}

main();