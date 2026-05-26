const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-A-planning-settings-runtime-repository-ui-readiness-audit.md"
);

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function read(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8");
}

function walk(dir, matcher, results = []) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return results;

  for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
    const entryPath = path.join(full, entry.name);
    const relPath = path.relative(ROOT, entryPath).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git"
      ) {
        continue;
      }
      walk(relPath, matcher, results);
    } else if (matcher(relPath, entry.name)) {
      results.push(relPath);
    }
  }

  return results;
}

function has(content, pattern) {
  if (!content) return false;
  if (pattern instanceof RegExp) return pattern.test(content);
  return content.includes(pattern);
}

function check(checks, id, label, ok, details = "", severity = "HIGH") {
  checks.push({
    id,
    label,
    ok: Boolean(ok),
    details,
    severity,
  });
}

function section(title, body = "") {
  return `\n## ${title}\n\n${body}`;
}

function bullet(items) {
  if (!items.length) return "- Aucun élément trouvé.\n";
  return items.map((item) => `- \`${item}\``).join("\n") + "\n";
}

fs.mkdirSync(REPORT_DIR, { recursive: true });

const checks = [];

const files = {
  settingsEngine:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  settingsResolver:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts",
  slotPolicyResolver:
    "src/runtime/scheduling/SchedulingSlotPolicy.ts",
  schedulingEngine:
    "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  guards:
    "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  planningView:
    "src/components/erp/scheduling/ERPSchedulingPlanningView.tsx",
  rendezvousModule:
    "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
};

const contents = Object.fromEntries(
  Object.entries(files).map(([key, relPath]) => [key, read(relPath)])
);

const schedulingFiles = walk("src", (relPath, name) => {
  return (
    /scheduling|planning|availability|slot|booking|opening|resource|settings/i.test(
      relPath
    ) && /\.(ts|tsx)$/.test(name)
  );
});

const repositoryCandidates = schedulingFiles.filter((file) =>
  /repository|repo|firestore|persistence/i.test(file)
);

const settingsCandidates = schedulingFiles.filter((file) =>
  /settings|resolver|policy/i.test(file)
);

const uiCandidates = schedulingFiles.filter((file) =>
  /components|app\/|page\.tsx|view|form|settings|param/i.test(file)
);

const routeCandidates = walk("src/app", (relPath, name) => {
  return (
    /\.(ts|tsx)$/.test(name) &&
    /scheduling|planning|param|settings|rendezvous/i.test(relPath)
  );
});

check(
  checks,
  "Q22E-9N-A-01",
  "RuntimeSchedulingSettingsEngine existe",
  exists(files.settingsEngine),
  files.settingsEngine
);

check(
  checks,
  "Q22E-9N-A-02",
  "RuntimeSchedulingSettingsResolver existe",
  exists(files.settingsResolver),
  files.settingsResolver
);

check(
  checks,
  "Q22E-9N-A-03",
  "SchedulingSlotPolicyResolver existe",
  exists(files.slotPolicyResolver) &&
    has(contents.slotPolicyResolver, "SchedulingSlotPolicyResolver"),
  files.slotPolicyResolver
);

check(
  checks,
  "Q22E-9N-A-04",
  "RuntimeSchedulingEngine consomme une policy de slots",
  has(contents.schedulingEngine, "SchedulingSlotPolicy") ||
    has(contents.schedulingEngine, "slotPolicy") ||
    has(contents.schedulingEngine, "SchedulingSlotPolicyResolver"),
  files.schedulingEngine
);

check(
  checks,
  "Q22E-9N-A-05",
  "La vue planning ne doit pas recalculer localement duration/buffer/capacity",
  !has(contents.planningView, /durationMinutes\s*[+\-*\/]/) &&
    !has(contents.planningView, /bufferMinutes\s*[+\-*\/]/) &&
    !has(contents.planningView, /capacity\s*[+\-*\/]/),
  files.planningView
);

check(
  checks,
  "Q22E-9N-A-06",
  "Les guards ne doivent pas recalculer localement la policy scheduling",
  !has(contents.guards, /durationMinutes\s*[+\-*\/]/) &&
    !has(contents.guards, /bufferMinutes\s*[+\-*\/]/) &&
    !has(contents.guards, /capacity\s*[+\-*\/]/),
  files.guards
);

check(
  checks,
  "Q22E-9N-A-07",
  "Metadata rendezvous expose des paramètres scheduling exploitables",
  has(contents.rendezvousModule, /scheduling/i) ||
    has(contents.rendezvousModule, /planning/i) ||
    has(contents.rendezvousModule, /bufferMinutes|durationMinutes|capacity|openingHours/i),
  files.rendezvousModule,
  "INFO"
);

check(
  checks,
  "Q22E-9N-A-08",
  "Repository settings scheduling détecté",
  repositoryCandidates.length > 0,
  repositoryCandidates.join(", ") || "Aucun repository scheduling/settings détecté",
  "INFO"
);

check(
  checks,
  "Q22E-9N-A-09",
  "Routes/pages de paramétrage scheduling détectées",
  routeCandidates.some((file) => /settings|param/i.test(file)),
  routeCandidates.join(", ") || "Aucune route settings/param scheduling détectée",
  "INFO"
);

check(
  checks,
  "Q22E-9N-A-10",
  "UI settings scheduling détectée",
  uiCandidates.some((file) => /settings|param/i.test(file)),
  uiCandidates.join(", ") || "Aucune UI settings scheduling détectée",
  "INFO"
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-A — Planning settings runtime repository/UI readiness audit

Date: ${new Date().toISOString()}

## Objectif

Auditer l'existant avant de créer un repository ou une interface de paramétrage planning.

Doctrine appliquée:

- Settings / metadata déclarent.
- Resolver calcule la configuration effective.
- Policy résout les paramètres métier.
- Engine calcule les slots.
- Guards protègent.
- Repository persiste.
- Vue affiche/édite sans recalculer les règles métier.

`;

report += section(
  "Résumé",
  `- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}
`
);

report += section(
  "Fichiers scheduling détectés",
  bullet(schedulingFiles)
);

report += section(
  "Settings / resolvers / policy détectés",
  bullet(settingsCandidates)
);

report += section(
  "Repository candidates",
  bullet(repositoryCandidates)
);

report += section(
  "Routes/pages candidates",
  bullet(routeCandidates)
);

report += section(
  "UI candidates",
  bullet(uiCandidates)
);

report += section("Checks détaillés");

for (const c of checks) {
  report += `\n### ${c.ok ? "OK" : "FAIL"} — ${c.id}\n\n`;
  report += `- Label: ${c.label}\n`;
  report += `- Severity: ${c.severity}\n`;
  report += `- Details: ${c.details || "-"}\n`;
}

report += section("Décision recommandée");

if (highFails.length > 0) {
  report += `Des échecs HIGH existent. Ne pas créer encore l'UI de paramètres.

Priorité recommandée:
1. Corriger la chaîne runtime/settings/policy.
2. Refaire l'audit.
3. Ensuite seulement décider repository ou UI.

`;
} else if (repositoryCandidates.length === 0) {
  report += `La chaîne runtime semble prête, mais aucun repository settings scheduling clair n'a été détecté.

Suite recommandée:
- Q22E-9N-B — RuntimeSchedulingSettingsRepository générique.

But:
- persister les paramètres planning par tenant/workspace/module/resource si nécessaire;
- ne pas hardcoder AMARKHYS;
- exposer une API runtime consommable plus tard par l'UI settings.

`;
} else {
  report += `Un repository ou candidat repository existe déjà.

Suite recommandée:
- inspecter le repository existant avant d'en créer un nouveau;
- si suffisant, passer à Q22E-9N-B — UI générique de paramètres planning;
- sinon renforcer le repository existant.

`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-A] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).replace(/\\/g, "/")}`);

if (highFails.length > 0) {
  console.log("");
  console.log("[HIGH FAILS]");
  for (const fail of highFails) {
    console.log(`- ${fail.id}: ${fail.label}`);
  }
}