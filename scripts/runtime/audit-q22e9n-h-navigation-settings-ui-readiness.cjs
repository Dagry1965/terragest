const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-H-navigation-settings-ui-readiness-audit.md"
);

function full(rel) {
  return path.join(ROOT, rel);
}

function exists(rel) {
  return fs.existsSync(full(rel));
}

function read(rel) {
  const file = full(rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function walk(dir, matcher, results = []) {
  const root = full(dir);
  if (!fs.existsSync(root)) return results;

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    const rel = path.relative(ROOT, absolute).split(path.sep).join("/");

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git"
      ) {
        continue;
      }

      walk(rel, matcher, results);
      continue;
    }

    if (matcher(rel, entry.name)) {
      results.push(rel);
    }
  }

  return results;
}

function has(content, pattern) {
  if (!content) return false;
  if (pattern instanceof RegExp) return pattern.test(content);
  return content.includes(pattern);
}

function grep(files, tokens) {
  return [
    ...new Set(
      files.filter((file) => {
        const content = read(file);
        return tokens.some((token) =>
          token instanceof RegExp ? token.test(content) : content.includes(token)
        );
      })
    ),
  ];
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

fs.mkdirSync(REPORT_DIR, { recursive: true });

const files = {
  route:
    "src/app/(private)/settings/scheduling/page.tsx",
  panel:
    "src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx",
  actions:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts",
  service:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const sourceFiles = walk("src", (rel, name) =>
  name.endsWith(".ts") || name.endsWith(".tsx")
);

const navCandidates = grep(sourceFiles, [
  "/dashboard",
  "/settings",
  "navigation",
  "sidebar",
  "menu",
  "navItems",
  "items:",
  "href:",
  "ERPTop",
  "AppShell",
  "Sidebar",
]);

const schedulingRouteReferences = grep(sourceFiles, [
  "/settings/scheduling",
]);

const settingsRouteCandidates = sourceFiles.filter((file) =>
  file.includes("/settings/") ||
  has(read(file), /settings|paramètres|parametres|configuration/i)
);

const directFirestoreInPanelOrRoute = grep([files.panel, files.route], [
  "firebase/firestore",
  "runtimeFirestore",
  "collection(",
  "doc(",
  "setDoc(",
  "getDoc(",
]);

const repositoryUsageInPanelOrRoute = grep([files.panel, files.route], [
  "RuntimeSchedulingSettingsRepository",
]);

const checks = [];

check(
  checks,
  "Q22E-9N-H-01",
  "Route /settings/scheduling existe",
  exists(files.route),
  files.route
);

check(
  checks,
  "Q22E-9N-H-02",
  "Route utilise le panel générique",
  has(content.route, "ERPSchedulingSettingsPanel"),
  files.route
);

check(
  checks,
  "Q22E-9N-H-03",
  "Panel utilise les server actions",
  has(content.panel, "readRuntimeSchedulingSettingsAction") &&
    has(content.panel, "saveRuntimeSchedulingSettingsAction"),
  files.panel
);

check(
  checks,
  "Q22E-9N-H-04",
  "Route/panel ne touchent pas Firestore directement",
  directFirestoreInPanelOrRoute.length === 0,
  directFirestoreInPanelOrRoute.join(", ") || "OK"
);

check(
  checks,
  "Q22E-9N-H-05",
  "Route/panel ne consomment pas le repository directement",
  repositoryUsageInPanelOrRoute.length === 0,
  repositoryUsageInPanelOrRoute.join(", ") || "OK"
);

check(
  checks,
  "Q22E-9N-H-06",
  "Server actions et service existent encore",
  exists(files.actions) && exists(files.service),
  `${files.actions}, ${files.service}`
);

check(
  checks,
  "Q22E-9N-H-07",
  "Aucune référence navigation vers /settings/scheduling pour l'instant",
  schedulingRouteReferences.length === 0,
  schedulingRouteReferences.join(", ") || "Aucune référence détectée",
  "INFO"
);

check(
  checks,
  "Q22E-9N-H-08",
  "Candidats navigation détectés pour insertion contrôlée",
  navCandidates.length > 0,
  navCandidates.slice(0, 80).join(", ") || "Aucun candidat",
  "INFO"
);

check(
  checks,
  "Q22E-9N-H-09",
  "Candidats settings/configuration détectés",
  settingsRouteCandidates.length > 0,
  settingsRouteCandidates.slice(0, 80).join(", ") || "Aucun candidat",
  "INFO"
);

check(
  checks,
  "Q22E-9N-H-10",
  "Pas de hardcode AMARKHYS/garage dans l'UI settings scheduling",
  !has(content.panel, /amarkhys|garage/i) &&
    !has(content.route, /amarkhys|garage/i),
  `${files.panel}, ${files.route}`
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-H — Navigation/settings UI runtime usage readiness audit

Date: ${new Date().toISOString()}

## Objectif

Auditer l'intégration de l'UI paramètres planning dans la navigation avant modification.

Doctrine:
- Ne pas patcher localement un menu au hasard.
- Identifier le bon point de navigation existant.
- Garder l'UI générique.
- Aucun accès Firestore/repository depuis l'UI.
- Accès uniquement via server actions.

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Fichiers inspectés

${Object.values(files).map((file) => `- \`${file}\``).join("\n")}

## Références existantes à /settings/scheduling

${
  schedulingRouteReferences.length
    ? schedulingRouteReferences.map((file) => `- \`${file}\``).join("\n")
    : "- Aucune."
}

## Candidats navigation

${
  navCandidates.length
    ? navCandidates.slice(0, 120).map((file) => `- \`${file}\``).join("\n")
    : "- Aucun."
}

## Candidats settings/configuration

${
  settingsRouteCandidates.length
    ? settingsRouteCandidates.slice(0, 120).map((file) => `- \`${file}\``).join("\n")
    : "- Aucun."
}

## Checks détaillés

`;

for (const c of checks) {
  report += `\n### ${c.ok ? "OK" : "FAIL"} — ${c.id}\n\n`;
  report += `- Label: ${c.label}\n`;
  report += `- Severity: ${c.severity}\n`;
  report += `- Details: ${c.details || "-"}\n`;
}

report += `\n## Décision recommandée\n\n`;

if (highFails.length > 0) {
  report += `Des échecs HIGH existent. Ne pas connecter la navigation avant correction.\n`;
} else {
  report += `Aucun échec HIGH. La route et l'UI sont prêtes.

Suite recommandée:
- Inspecter les candidats navigation listés.
- Connecter /settings/scheduling au point de navigation le plus générique.
- Éviter un lien AMARKHYS/garage.
`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-H-A] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);