const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  runtimePage: path.join(root, "src/components/erp/runtime/ERPRuntimePage.tsx"),
  planningView: path.join(root, "src/components/erp/scheduling/ERPSchedulingPlanningView.tsx"),
  enterpriseForm: path.join(root, "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"),
  rendezvousModule: path.join(root, "src/runtime/modules/generated/rendezvous/rendezvous.module.ts"),
  guards: path.join(root, "src/runtime/guards/processRuntimeBeforeMutationGuards.ts"),
};

const checks = [
  {
    file: "runtimePage",
    label: "Bouton Planning automatique pour module.scheduling.enabled",
    pattern: /Q22E4C_AUTO_SCHEDULING_PLANNING_ACTION|schedulingPlanningAction/,
  },
  {
    file: "runtimePage",
    label: "Planning list action pointe vers /{moduleKey}/planning",
    pattern: /href:\s*`\/\$\{module\.metadata\.key\}\/planning`/,
  },
  {
    file: "planningView",
    label: "Planning utilise RuntimeSchedulingEngine",
    pattern: /RuntimeSchedulingEngine\.getAvailableSlotsWithBookings/,
  },
  {
    file: "planningView",
    label: "Bouton Planifier construit une URL create avec query params",
    pattern: /buildPlanningCreateHref/,
  },
  {
    file: "planningView",
    label: "Fallback create générique /{moduleKey}/nouveau",
    pattern: /`\/\$\{moduleKey\}\/nouveau`/,
  },
  {
    file: "enterpriseForm",
    label: "Formulaire lit useSearchParams",
    pattern: /useSearchParams/,
  },
  {
    file: "enterpriseForm",
    label: "Formulaire hydrate create depuis query params",
    pattern: /Q22E7E_APPLY_CREATE_QUERY_VALUES|queryInitialValuesAppliedRef/,
  },
  {
    file: "rendezvousModule",
    label: "Rendezvous déclare scheduling.enabled",
    pattern: /scheduling:\s*{[\s\S]*enabled:\s*true/,
  },
  {
    file: "rendezvousModule",
    label: "Rendezvous scheduling date/time fields",
    pattern: /dateField:\s*"dateRendezVous"[\s\S]*timeField:\s*"heureRendezVous"/,
  },
  {
    file: "rendezvousModule",
    label: "Rendezvous capacity configurée",
    pattern: /capacity:\s*1/,
  },
  {
    file: "guards",
    label: "Guards runtime scheduling présents",
    pattern: /scheduling|RuntimeSchedulingEngine|capacity|calendarExceptions|bufferMinutes/i,
  },
];

function fail(message) {
  console.error(`\n[ERROR] ${message}`);
  process.exit(1);
}

function read(fileKey) {
  const filePath = files[fileKey];

  if (!fs.existsSync(filePath)) {
    fail(`Fichier introuvable: ${path.relative(root, filePath)}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

console.log("\n[Q22E-8] Audit end-to-end scheduling runtime\n");

let hasError = false;

for (const check of checks) {
  const content = read(check.file);
  const ok = check.pattern.test(content);

  if (ok) {
    console.log(`[OK] ${check.label}`);
  } else {
    console.log(`[FAIL] ${check.label}`);
    console.log(`     File: ${path.relative(root, files[check.file])}`);
    hasError = true;
  }
}

const backupFiles = [];

for (const filePath of Object.values(files)) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);

  if (!fs.existsSync(dir)) {
    continue;
  }

  for (const file of fs.readdirSync(dir)) {
    if (file.startsWith(base + ".bak")) {
      backupFiles.push(path.join(dir, file));
    }
  }
}

if (backupFiles.length > 0) {
  console.log("\n[WARN] Backups détectés :");
  for (const file of backupFiles) {
    console.log(` - ${path.relative(root, file)}`);
  }
} else {
  console.log("\n[OK] Aucun backup runtime ciblé détecté.");
}

if (hasError) {
  console.error("\n[Q22E8_AUDIT_FAILED]");
  process.exit(1);
}

console.log("\n[Q22E8_AUDIT_OK] Parcours scheduling runtime cohérent.");