const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRuntimeDetails.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q12f-remove-special-intervention-lines`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

// 1. Supprime les helpers spécifiques lignes intervention.
const helperPatterns = [
  /function formatInterventionLineMoney\([\s\S]*?\n}\n\n/g,
  /function getInterventionLineTitle\([\s\S]*?\n}\n\n/g,
  /function getInterventionLineStatus\([\s\S]*?\n}\n\n/g,
  /function buildInterventionLineHref\([\s\S]*?\n}\n\n/g,
];

for (const pattern of helperPatterns) {
  content = content.replace(pattern, "");
}

// 2. Supprime les variables spécifiques ajoutées par les anciennes passes Q11E.
content = content.replace(
  /\s*const recordId = String\([\s\S]*?const interventionLineCreateHref = recordId[\s\S]*?: "\/lignesinterventionauto\/nouveau";\s*/m,
  "\n"
);

content = content.replace(
  /\s*const interventionLineHref =\s*isIntervention[\s\S]*?: "#";\s*/m,
  "\n"
);

// 3. Supprime les states spécifiques aux lignes intervention.
content = content.replace(
  /\s*const \[interventionLines,\s*setInterventionLines\]\s*=\s*useState<Record<string, unknown>\[\]>\(\[\]\);\s*/m,
  "\n"
);

content = content.replace(
  /\s*const \[interventionLinesLoading,\s*setInterventionLinesLoading\]\s*=\s*useState\(false\);\s*/m,
  "\n"
);

// 4. Supprime le useEffect AMARKHYS_INTERVENTION_LINES_LOADER.
content = content.replace(
  /\s*useEffect\(\(\) => \{\s*\/\/ AMARKHYS_INTERVENTION_LINES_LOADER[\s\S]*?\}, \[isIntervention, entityId\]\);\s*/m,
  "\n"
);

// 5. Supprime le total spécifique.
content = content.replace(
  /\s*const interventionLinesTotal\s*=\s*interventionLines\.reduce\([\s\S]*?\);\s*/m,
  "\n"
);

// 6. Supprime le bloc JSX spécial "Lignes de l’intervention".
content = content.replace(
  /\s*\{isIntervention \? \(\s*<ERPCard\s+title="Lignes de l’intervention"[\s\S]*?<\/ERPCard>\s*\) : null\}\s*/m,
  "\n"
);

// 7. Supprime isIntervention si plus utilisé.
const isInterventionOccurrences =
  (content.match(/\bisIntervention\b/g) ?? []).length;

if (isInterventionOccurrences <= 1) {
  content = content.replace(
    /\s*const isIntervention\s*=[\s\S]*?;\s*/m,
    "\n"
  );
}

// 8. Nettoyage lignes vides excessives.
content = content.replace(/\n{4,}/g, "\n\n\n");

fs.writeFileSync(file, content, "utf8");

console.log("OK: bloc spécial lignes intervention supprimé de ERPRuntimeDetails.tsx");