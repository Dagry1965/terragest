const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts"
);

let content = fs.readFileSync(target, "utf8");

const replacements = [
  ["vÃ©hicules", "véhicules"],
  ["VÃ©hicules", "Véhicules"],
  ["activitÃ©", "activité"],
  ["financiÃ¨re", "financière"],
  ["prÃ©vus", "prévus"],
  ["archivÃ©s", "archivés"],
  ["rÃ©cents", "récents"],
  ["rÃ¨glements", "règlements"],
  ["AccÃ¨s", "Accès"],
  ["opÃ©rations", "opérations"],
  ["CrÃ©er", "Créer"],
  ["confirmÃ©s", "confirmés"],
  ["planifiÃ©s", "planifiés"],
  ["Ãªtre", "être"],
  ["dÃ©jÃ", "déjà"],
  ["dÃ©passÃ©es", "dépassées"],
  ["impayÃ©es", "impayées"],
  ["rÃ©glÃ©es", "réglées"],
  ["Ã‰chÃ©ances", "Échéances"],
  ["Ã©chÃ©ances", "échéances"],
  ["prÃ©vus", "prévus"],
  ["soldÃ©es", "soldées"],
  ["nÃ©cessitant", "nécessitant"],
  ["opÃ©rationnel", "opérationnel"],
  ["PayÃ©es", "Payées"],
  ["encaissÃ©", "encaissé"],
  ["payÃ©es", "payées"],
  ["crÃ©Ã©s", "créés"],
  ["terminÃ©es", "terminées"],
  ["finalisÃ©s", "finalisés"],
  ["exÃ©cuter", "exécuter"],
  ["DerniÃ¨res", "Dernières"],
  ["rÃ©centes", "récentes"],
  ["non annulÃ©es", "non annulées"],

  ["Ã ", "à"],
  ["Ã©", "é"],
  ["Ã¨", "è"],
  ["Ãª", "ê"],
  ["Ã‰", "É"],
  ["Ã€", "À"],
  ["Ã´", "ô"],
  ["Ã»", "û"],
  ["Ã§", "ç"],

  ["â€™", "’"],
  ["dâ€™", "d’"],
  ["lâ€™", "l’"],
  ["aujourdâ€™hui", "aujourd’hui"],
];

for (const [bad, good] of replacements) {
  content = content.replaceAll(bad, good);
}

fs.writeFileSync(target, content, "utf8");

console.log("OK: AMARKHYS dashboard config encoding fixed.");