const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT_DIR = path.join(ROOT, "docs", "audits");
const REPORT_FILE = path.join(
  REPORT_DIR,
  "Q22E-9N-H-C-scheduling-settings-navigation-audit.md"
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

fs.mkdirSync(REPORT_DIR, { recursive: true });

const files = {
  navigationEngine: "src/runtime/navigation/ERPNavigationEngine.ts",
  erpAppShell: "src/components/erp/layout/ERPAppShell.tsx",
  erpSidebar: "src/components/erp/shell/ErpSidebar.tsx",
  coreSidebar: "src/core/layout/Sidebar.tsx",
  route: "src/app/(private)/settings/scheduling/page.tsx",
};

const content = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, read(rel)])
);

const checks = [];

check(
  checks,
  "Q22E-9N-H-C-01",
  "ERPNavigationEngine existe",
  exists(files.navigationEngine),
  files.navigationEngine
);

check(
  checks,
  "Q22E-9N-H-C-02",
  "Navigation runtime contient le workspace Paramètres ERP",
  has(content.navigationEngine, 'key: "settings"') &&
    has(content.navigationEngine, 'label: "Paramètres ERP"'),
  files.navigationEngine
);

check(
  checks,
  "Q22E-9N-H-C-03",
  "Navigation runtime contient le lien /settings/scheduling",
  has(content.navigationEngine, 'key: "settings-scheduling"') &&
    has(content.navigationEngine, 'href: "/settings/scheduling"') &&
    has(content.navigationEngine, 'label: "Planning"'),
  files.navigationEngine
);

check(
  checks,
  "Q22E-9N-H-C-04",
  "Le lien est ajouté dans le moteur runtime, pas dans la sidebar AMARKHYS",
  !has(content.erpSidebar, 'href: "/settings/scheduling"') &&
    !has(content.erpSidebar, 'settings-scheduling'),
  files.erpSidebar
);

check(
  checks,
  "Q22E-9N-H-C-05",
  "Les shells génériques consomment getERPWorkspacesNavigation",
  has(content.erpAppShell, "getERPWorkspacesNavigation") &&
    has(content.erpSidebar, "getERPWorkspacesNavigation") &&
    has(content.coreSidebar, "getERPWorkspacesNavigation"),
  `${files.erpAppShell}, ${files.erpSidebar}, ${files.coreSidebar}`
);

check(
  checks,
  "Q22E-9N-H-C-06",
  "Route settings/scheduling existe toujours",
  exists(files.route),
  files.route
);

check(
  checks,
  "Q22E-9N-H-C-07",
  "Navigation settings ne hardcode pas AMARKHYS/garage",
  !has(content.navigationEngine, /amarkhys|garage/i),
  files.navigationEngine
);

check(
  checks,
  "Q22E-9N-H-C-08",
  "Navigation settings ne touche pas Firestore",
  !has(content.navigationEngine, "firebase/firestore") &&
    !has(content.navigationEngine, "runtimeFirestore") &&
    !has(content.navigationEngine, "collection(") &&
    !has(content.navigationEngine, "doc(") &&
    !has(content.navigationEngine, "setDoc(") &&
    !has(content.navigationEngine, "getDoc("),
  files.navigationEngine
);

const highFails = checks.filter((c) => !c.ok && c.severity === "HIGH");
const infoFails = checks.filter((c) => !c.ok && c.severity === "INFO");

let report = `# Q22E-9N-H-C — Scheduling settings navigation audit

Date: ${new Date().toISOString()}

## Objectif

Auditer le branchement de /settings/scheduling dans la navigation runtime.

## Résumé

- Checks: ${checks.length}
- OK: ${checks.filter((c) => c.ok).length}
- FAIL: ${checks.filter((c) => !c.ok).length}
- FAIL_HIGH: ${highFails.length}
- FAIL_INFO: ${infoFails.length}

## Fichiers inspectés

${Object.values(files).map((file) => `- \`${file}\``).join("\n")}

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
  report += `Des échecs HIGH existent. Corriger la navigation avant commit.\n`;
} else {
  report += `Aucun échec HIGH. La navigation runtime expose proprement /settings/scheduling.\n`;
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("");
console.log("[Q22E-9N-H-C] DONE");
console.log(`[CHECKS] ${checks.length}`);
console.log(`[OK] ${checks.filter((c) => c.ok).length}`);
console.log(`[FAIL] ${checks.filter((c) => !c.ok).length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);
console.log(`[FAIL_INFO] ${infoFails.length}`);
console.log(`[REPORT] ${path.relative(ROOT, REPORT_FILE).split(path.sep).join("/")}`);