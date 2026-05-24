const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(
  ROOT,
  `${rel}.bak-q20h5k-clean-remaining-form-mojibake`
);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q20h5k-clean-remaining-form-mojibake`);
}

let content = fs.readFileSync(file, "utf8");

// Targeted line repairs. Avoid broad destructive replacements.
const lines = content.split(/\r?\n/);

const fixed = lines.map((line) => {
  const indent = line.match(/^\s*/)?.[0] ?? "";

  if (
    line.includes('"ce véhicule possède') &&
    line.includes("rendez-vous")
  ) {
    return `${indent}"ce véhicule possède déjà un rendez-vous"`;
  }

  if (
    line.includes('return "Ce véhicule a') &&
    line.includes("rendez-vous sur cette plage")
  ) {
    return `${indent}return "Ce véhicule a déjà un rendez-vous sur cette plage horaire. Choisissez une autre heure ou modifiez le rendez-vous existant.";`;
  }

  if (
    line.includes('"déj') &&
    line.includes("consomm")
  ) {
    return `${indent}"déjà été consommé"`;
  }

  if (
    line.includes('return "Ce rendez-vous a') &&
    line.includes("intervention")
  ) {
    return `${indent}return "Ce rendez-vous a déjà généré une intervention. Aucune nouvelle intervention ne sera créée.";`;
  }

  if (
    line.includes("Annuler cet encaissement ?")
  ) {
    return `${indent}"Annuler cet encaissement ? Le paiement restera conservé dans l'historique.";`;
  }

  if (
    line.includes("Annuler cette échéance ?")
  ) {
    return `${indent}"Annuler cette échéance ? Elle restera conservée dans l'historique.";`;
  }

  if (
    line.includes("Crée un encaissement lié") ||
    line.includes("Crée un encaissement li")
  ) {
    return `${indent}Crée un encaissement lié à cette facture. Le montant payé, le reste à payer et l'historique de paiement seront mis à jour proprement.`;
  }

  if (
    line.includes("Déj") &&
    line.includes("pay")
  ) {
    return `${indent}Déjà payé`;
  }

  if (
    line.includes("Reste") &&
    line.includes("payer")
  ) {
    return `${indent}Reste à payer`;
  }

  if (
    line.includes("Le statut indique") &&
    line.includes("état métier")
  ) {
    return `${indent}Le statut indique l'état métier de la fiche. Pour changer cet état,`;
  }

  if (
    line.includes("utilisez les boutons") &&
    line.includes("action")
  ) {
    return `${indent}utilisez les boutons d'action prévus par le système.`;
  }

  if (
    line.includes("Ãƒ¢") &&
    line.includes("error.field")
  ) {
    return `${indent}• {error.field} : {error.message}`;
  }

  if (
    line.includes("Cette action conserve") &&
    line.includes("historique")
  ) {
    return `${indent}Cette action conserve l'historique et évite une suppression brutale.`;
  }

  if (
    line.includes("Suppression masquée pour préserver")
  ) {
    return `${indent}Suppression masquée pour préserver l'historique. Utilisez l'action métier`;
  }

  if (
    line.includes("adaptée, comme") &&
    line.includes("Retirer la ligne")
  ) {
    return `${indent}adaptée, comme "Retirer la ligne", afin que le stock, les totaux et`;
  }

  return line;
});

content = fixed.join("\n");

// Final small known fragments.
const replacements = [
  ["déjÃƒÆ’Ã‚ ", "déjà"],
  ["ÃƒÆ’Ã‚ ", "à"],
  ["ÃƒÆ’Ã‚©", "é"],
  ["ÃƒÆ’Ã‚¨", "è"],
  ["ÃƒÆ’Ã‚ª", "ê"],
  ["ÃƒÆ’Ã‚§", "ç"],
  ["Ãƒ¢ââ€š¬Ã‚¢", "•"],
  ["lÃƒ¢ââ€š¬ââ€ž¢historique", "l'historique"],
  ["dÃƒ¢ââ€š¬ââ€ž¢action", "d'action"],
  ["Ãƒ¢ââ€š¬Ã…", "\""],
  ["Ãƒ¢ââ€š¬Ã‚", "\""],
];

for (const [bad, good] of replacements) {
  content = content.split(bad).join(good);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Remaining ERPEnterpriseForm mojibake cleaned.");
console.log("Next: inspect encoding, then pnpm build.");