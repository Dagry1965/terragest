const fs = require("fs");
const path = require("path");

const root = process.cwd();

const planningPath = path.join(
  root,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const checks = [
  {
    label: "Mode Jour/Semaine présent",
    pattern: /useState<"day" \| "week">\("day"\)/,
  },
  {
    label: "Helper addDays présent",
    pattern: /function addDays\(date: Date, amount: number\)/,
  },
  {
    label: "Helper startOfWeekMonday présent",
    pattern: /function startOfWeekMonday\(date: Date\)/,
  },
  {
    label: "Helper formatDayLabel présent",
    pattern: /function formatDayLabel\(dateOnly: string\)/,
  },
  {
    label: "weekDates sur 7 jours",
    pattern: /Array\.from\(\{\s*length:\s*7\s*\}/s,
  },
  {
    label: "buildPlanningForDate générique présent",
    pattern: /const buildPlanningForDate = useCallback/,
  },
  {
    label: "weekPlanning basé sur buildPlanningForDate",
    pattern: /const weekPlanning = useMemo/,
  },
  {
    label: "Bouton Jour présent",
    pattern: />\s*Jour\s*</,
  },
  {
    label: "Bouton Semaine présent",
    pattern: />\s*Semaine\s*</,
  },
  {
    label: "Vue semaine conditionnelle présente",
    pattern: /viewMode === "week"/,
  },
  {
    label: "Aucune logique garage hardcodée",
    pattern: /\bgarage\b/i,
    negative: true,
  },
  {
    label: "Aucune logique AMARKHYS hardcodée",
    pattern: /\bAMARKHYS\b/i,
    negative: true,
  },
];

function fail(message) {
  console.error(`\n[ERROR] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(planningPath)) {
  fail(`Fichier introuvable: ${planningPath}`);
}

const content = fs.readFileSync(planningPath, "utf8");

let hasError = false;

console.log("\n[Q22E-7B] Audit vue semaine planning runtime\n");

for (const check of checks) {
  const matched = check.pattern.test(content);
  const ok = check.negative ? !matched : matched;

  if (ok) {
    console.log(`[OK] ${check.label}`);
  } else {
    console.log(`[FAIL] ${check.label}`);
    hasError = true;
  }
}

const backupFiles = fs
  .readdirSync(path.dirname(planningPath))
  .filter((file) => file.includes("ERPSchedulingPlanningView.tsx.bak"));

if (backupFiles.length > 0) {
  console.log("\n[WARN] Backup(s) détecté(s) :");
  for (const file of backupFiles) {
    console.log(` - ${path.join("src/components/erp/scheduling", file)}`);
  }
  console.log("\nNettoyer après validation si tout est OK.");
} else {
  console.log("\n[OK] Aucun backup local détecté dans le dossier scheduling.");
}

if (hasError) {
  console.error("\n[Q22E7B_AUDIT_FAILED]");
  process.exit(1);
}

console.log("\n[Q22E7B_AUDIT_OK] Vue semaine générique conforme.");