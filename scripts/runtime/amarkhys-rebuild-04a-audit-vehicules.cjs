const fs = require("fs");
const path = require("path");

const root = process.cwd();

const candidates = [
  "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  "src/runtime/modules/generated/vehicules/vehicules.actions.ts",
  "src/runtime/modules/generated/vehicules/actions.ts",
  "src/runtime/modules/generated/vehicules/index.ts",
  "src/runtime/modules/generated/vehicules/vehicules.workflows.ts",
  "src/runtime/modules/generated/vehicules/vehicules.permissions.ts",
  "src/runtime/modules/generated/vehicules/vehicules.automation.ts",
  "src/runtime/modules/generated/vehicules/vehicules.dashboard.ts",
  "src/app/(private)/vehicules/hub/page.tsx",
  "src/app/(private)/vehicules/hub/VehicleOperationalHubClient.tsx",
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
];

const expectedStatuses = [
  "actif",
  "entretien",
  "immobilise",
  "archive",
];

const expectedFields = [
  "carburant",
  "energie",
  "dateMiseEnCirculation",
  "dateFinGarantie",
];

const expectedEnergyValues = [
  "Essence",
  "Diesel",
  "GPL",
  "GNV",
  "Bioéthanol",
  "Bioethanol",
  "Électrique",
  "Electrique",
  "Hybride",
  "Hydrogène",
  "Hydrogene",
];

const expectedActions = [
  "Activer véhicule",
  "Activer vehicule",
  "Mettre en entretien",
  "Immobiliser véhicule",
  "Immobiliser vehicule",
  "Archiver véhicule",
  "Archiver vehicule",
  "Ouvrir fiche véhicule",
  "Ouvrir fiche vehicule",
  "Ajouter RDV",
  "Ajouter rendez-vous",
  "Ajouter intervention",
];

const forbiddenLocalPatterns = [
  {
    key: "Action véhicule hardcodée dans ERPEnterpriseForm",
    file: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
    patterns: [
      "moduleKey === \"vehicules\"",
      "Archiver vehicule",
      "Archiver véhicule",
      "Activer vehicule",
      "Activer véhicule",
      "Immobiliser vehicule",
      "Immobiliser véhicule",
      "Mettre en entretien",
    ],
  },
  {
    key: "Firestore direct dans module/actions vehicules",
    file: "src/runtime/modules/generated/vehicules/vehicules.module.ts",
    regex: /firebase\/firestore|getDocs|addDoc|updateDoc|deleteDoc|collection\(|doc\(/,
  },
  {
    key: "Firestore direct dans actions vehicules",
    file: "src/runtime/modules/generated/vehicules/vehicules.actions.ts",
    regex: /firebase\/firestore|getDocs|addDoc|updateDoc|deleteDoc|collection\(|doc\(/,
  },
];

const reportRel = "docs/audits/AMARKHYS-REBUILD-04A-audit-vehicules.md";
const reportPath = path.join(root, reportRel);

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function count(content, pattern) {
  return (content.match(pattern) || []).length;
}

function lineHits(content, patterns) {
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        hits.push({
          pattern,
          line: index + 1,
          text: line.trim(),
        });
      }
    }
  });

  return hits;
}

function regexHits(content, regex) {
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    if (regex.test(line)) {
      hits.push({
        line: index + 1,
        text: line.trim(),
      });
    }
  });

  return hits;
}

function findVehicleFiles() {
  const dirs = [
    "src/runtime/modules/generated/vehicules",
    "src/runtime/modules/generated",
    "src/runtime/actions",
    "src/components/erp",
    "src/app",
  ];

  const found = [];

  function walk(absDir) {
    if (!fs.existsSync(absDir)) return;

    for (const item of fs.readdirSync(absDir)) {
      const abs = path.join(absDir, item);
      const stat = fs.statSync(abs);

      if (stat.isDirectory()) {
        if (
          item === "node_modules" ||
          item === ".next" ||
          item === ".git" ||
          item.includes(".bak")
        ) {
          continue;
        }

        walk(abs);
        continue;
      }

      const rel = path.relative(root, abs).replace(/\\/g, "/");

      if (
        /vehicules/i.test(rel) ||
        /vehicle/i.test(rel) ||
        /vehicule/i.test(rel)
      ) {
        if (/\.(ts|tsx|js|jsx|cjs|md)$/.test(item)) {
          found.push(rel);
        }
      }
    }
  }

  for (const dir of dirs) {
    walk(path.join(root, dir));
  }

  return Array.from(new Set(found)).sort();
}

const moduleContent = read("src/runtime/modules/generated/vehicules/vehicules.module.ts");
const actionsContent = read("src/runtime/modules/generated/vehicules/vehicules.actions.ts");
const formContent = read("src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx");

const checks = [];

checks.push({
  group: "Fichiers",
  label: "vehicules.module.ts existe",
  ok: exists("src/runtime/modules/generated/vehicules/vehicules.module.ts"),
});

checks.push({
  group: "Fichiers",
  label: "vehicules.actions.ts existe",
  ok: exists("src/runtime/modules/generated/vehicules/vehicules.actions.ts"),
});

checks.push({
  group: "Actions",
  label: "vehicules.actions.ts n'est pas vide",
  ok: actionsContent.trim().length > "export const vehiculesActions = [];".length,
});

checks.push({
  group: "Actions",
  label: "vehicules.module.ts contient une propriété actions",
  ok: moduleContent.includes("actions:"),
});

checks.push({
  group: "Actions",
  label: "vehicules.module.ts référence vehiculesActions",
  ok:
    moduleContent.includes("vehiculesActions") &&
    moduleContent.includes("actions: vehiculesActions"),
});

for (const status of expectedStatuses) {
  checks.push({
    group: "Statuts",
    label: `Statut attendu présent: ${status}`,
    ok: moduleContent.includes(status) || actionsContent.includes(status),
  });
}

for (const field of expectedFields) {
  checks.push({
    group: "Champs",
    label: `Champ attendu présent: ${field}`,
    ok: moduleContent.includes(field),
  });
}

checks.push({
  group: "Champs",
  label: "Valeurs énergie/carburant attendues détectées",
  ok: expectedEnergyValues.some((value) => moduleContent.includes(value)),
});

checks.push({
  group: "Hub",
  label: "Route /vehicules/hub existe",
  ok: exists("src/app/(private)/vehicules/hub/page.tsx"),
});

checks.push({
  group: "Hub",
  label: "VehicleOperationalHubClient existe",
  ok: exists("src/app/(private)/vehicules/hub/VehicleOperationalHubClient.tsx"),
});

const expectedActionHits = expectedActions.filter((action) => actionsContent.includes(action) || moduleContent.includes(action));
checks.push({
  group: "Actions",
  label: "Actions métier véhicule attendues détectées",
  ok: expectedActionHits.length >= 4,
  details: expectedActionHits,
});

const forbiddenFindings = [];

for (const rule of forbiddenLocalPatterns) {
  const content = read(rule.file);

  if (!content) {
    continue;
  }

  if (rule.patterns) {
    const hits = lineHits(content, rule.patterns);
    if (hits.length) {
      forbiddenFindings.push({
        key: rule.key,
        file: rule.file,
        hits,
      });
    }
  }

  if (rule.regex) {
    const hits = regexHits(content, rule.regex);
    if (hits.length) {
      forbiddenFindings.push({
        key: rule.key,
        file: rule.file,
        hits,
      });
    }
  }
}

checks.push({
  group: "Interdits locaux",
  label: "Aucun interdit local détecté par cet audit",
  ok: forbiddenFindings.length === 0,
  details: forbiddenFindings.map((item) => item.key),
});

const vehicleFiles = findVehicleFiles();

const grouped = checks.reduce((acc, check) => {
  acc[check.group] ||= [];
  acc[check.group].push(check);
  return acc;
}, {});

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const actionsScore = Math.round((expectedActionHits.length / 7) * 100);
const statusScore = Math.round(
  (expectedStatuses.filter((status) => moduleContent.includes(status) || actionsContent.includes(status)).length / expectedStatuses.length) * 100
);
const fieldsScore = Math.round(
  (expectedFields.filter((field) => moduleContent.includes(field)).length / expectedFields.length) * 100
);

const report = [];

report.push("# AMARKHYS-REBUILD-04A — Audit ciblé vehicules");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Contexte");
report.push("");
report.push("Audit ciblé du module vehicules après clôture clientsauto.");
report.push("");
report.push("## Scores indicatifs");
report.push("");
report.push(`- Actions détectées: ${actionsScore}%`);
report.push(`- Statuts détectés: ${statusScore}%`);
report.push(`- Champs spécifiques détectés: ${fieldsScore}%`);
report.push(`- Checks OK: ${okCount}`);
report.push(`- Checks FAIL: ${failCount}`);
report.push("");
report.push("## Fichiers candidats directs");
report.push("");

for (const rel of candidates) {
  report.push(`- ${exists(rel) ? "OK" : "MISSING"} ${rel}`);
}

report.push("");
report.push("## Fichiers véhicule détectés");
report.push("");

for (const rel of vehicleFiles) {
  report.push(`- ${rel}`);
}

report.push("");
report.push("## Résultats par groupe");
report.push("");

for (const [group, items] of Object.entries(grouped)) {
  report.push(`### ${group}`);
  report.push("");

  for (const item of items) {
    report.push(`- ${item.ok ? "OK" : "FAIL"} — ${item.label}`);
    if (item.details && item.details.length) {
      report.push(`  - Détails: ${JSON.stringify(item.details)}`);
    }
  }

  report.push("");
}

report.push("## Interdits locaux détaillés");
report.push("");

if (forbiddenFindings.length === 0) {
  report.push("- Aucun.");
} else {
  for (const finding of forbiddenFindings) {
    report.push(`### ${finding.key}`);
    report.push("");
    report.push(`Fichier: ${finding.file}`);
    report.push("");
    for (const hit of finding.hits) {
      report.push(`- L${hit.line}: ${hit.text}`);
    }
    report.push("");
  }
}

report.push("");
report.push("## Actions attendues détectées");
report.push("");
for (const action of expectedActionHits) {
  report.push(`- ${action}`);
}
report.push("");
report.push("## Prochaine étape recommandée");
report.push("");
report.push("Traiter uniquement les FAIL. Si actions manquantes, créer/aligner vehicules.actions.ts puis référencer depuis vehicules.module.ts. Si action véhicule hardcodée dans ERPEnterpriseForm, la retirer au profit de RuntimeActionBar.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-04A] Audit vehicules");
console.log("[REPORT]", reportRel);
console.log("[ACTIONS_SCORE]", actionsScore + "%");
console.log("[STATUS_SCORE]", statusScore + "%");
console.log("[FIELDS_SCORE]", fieldsScore + "%");
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.log("[NEXT] Open report and fix FAIL only.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-04A] DONE");