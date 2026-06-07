const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts"
);

let content = fs.readFileSync(target, "utf8");

const replacements = [
  ["véhicules", "véhicules"],
  ["Véhicules", "Véhicules"],
  ["activité", "activité"],
  ["financière", "financière"],
  ["prévus", "prévus"],
  ["archivés", "archivés"],
  ["récents", "récents"],
  ["règlements", "règlements"],
  ["Accès", "Accès"],
  ["opérations", "opérations"],
  ["Créer", "Créer"],
  ["confirmés", "confirmés"],
  ["planifiés", "planifiés"],
  ["être", "être"],
  ["déjÃ", "déjà"],
  ["dépassées", "dépassées"],
  ["impayées", "impayées"],
  ["réglées", "réglées"],
  ["Échéances", "Échéances"],
  ["échéances", "échéances"],
  ["prévus", "prévus"],
  ["soldées", "soldées"],
  ["nécessitant", "nécessitant"],
  ["opérationnel", "opérationnel"],
  ["Payées", "Payées"],
  ["encaissé", "encaissé"],
  ["payées", "payées"],
  ["créés", "créés"],
  ["terminées", "terminées"],
  ["finalisés", "finalisés"],
  ["exécuter", "exécuter"],
  ["Dernières", "Dernières"],
  ["récentes", "récentes"],
  ["non annulées", "non annulées"],

  ["à", "à"],
  ["é", "é"],
  ["è", "è"],
  ["ê", "ê"],
  ["É", "É"],
  ["À", "À"],
  ["ô", "ô"],
  ["û", "û"],
  ["ç", "ç"],

  ["'", "’"],
  ["d'", "d’"],
  ["l'", "l’"],
  ["aujourd'hui", "aujourd’hui"],
];

for (const [bad, good] of replacements) {
  content = content.replaceAll(bad, good);
}

fs.writeFileSync(target, content, "utf8");

console.log("OK: AMARKHYS dashboard config encoding fixed.");