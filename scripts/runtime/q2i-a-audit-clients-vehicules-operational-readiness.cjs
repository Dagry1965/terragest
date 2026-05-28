const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const candidates = {
  clients: ["clientsauto", "clients"],
  vehicules: ["vehiculesauto", "vehicules"],
};

const files = {
  coreModules: path.join(ROOT, "src", "runtime", "modules", "definitions", "coreModules.ts"),
  generatedDir: path.join(ROOT, "src", "runtime", "modules", "generated"),
  generatedDefinitionsDir: path.join(ROOT, "src", "runtime", "modules", "definitions", "generated"),
  operationalTable: path.join(ROOT, "src", "components", "erp", "operational", "ERPOperationalTable.tsx"),
  operationalExpanded: path.join(ROOT, "src", "components", "erp", "operational", "ERPOperationalExpandedChildren.tsx"),
  operationalResolver: path.join(ROOT, "src", "runtime", "operational", "RuntimeOperationalChildrenResolver.ts"),
};

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walk(full, results);
      continue;
    }

    results.push(full);
  }

  return results;
}

function findFilesContaining(patterns, roots) {
  const found = [];

  for (const root of roots) {
    for (const file of walk(root)) {
      if (!/\.(ts|tsx|js|jsx)$/.test(file)) continue;

      const content = read(file);

      if (patterns.some((pattern) => content.includes(pattern))) {
        found.push({
          file,
          relative: path.relative(ROOT, file),
          content,
        });
      }
    }
  }

  return found;
}

function findModuleFiles(moduleKey) {
  const roots = [
    path.join(ROOT, "src", "runtime", "modules"),
    path.join(ROOT, "src", "app"),
  ];

  return findFilesContaining(
    [
      `key: "${moduleKey}"`,
      `key: '${moduleKey}'`,
      `metadata: { key: "${moduleKey}"`,
      `metadata: { key: '${moduleKey}'`,
      moduleKey,
    ],
    roots
  );
}

function routeExists(routeName) {
  const routeRoots = [
    path.join(ROOT, "src", "app", "(private)", routeName),
    path.join(ROOT, "src", "app", routeName),
    path.join(ROOT, "src", "app", "(private)", "dashboard", routeName),
  ];

  return routeRoots.some((routePath) => fs.existsSync(routePath));
}

function appRouteMatches(routeName) {
  const appRoot = path.join(ROOT, "src", "app");
  return walk(appRoot)
    .filter((file) => file.endsWith("page.tsx") || file.endsWith("page.ts"))
    .map((file) => path.relative(ROOT, file))
    .filter((file) => file.includes(routeName));
}

function analyzeModule(moduleKey) {
  const moduleFiles = findModuleFiles(moduleKey);

  const moduleLikeFiles = moduleFiles.filter((item) =>
    item.relative.includes("runtime\\modules") ||
    item.relative.includes("runtime/modules")
  );

  const combined = moduleLikeFiles.map((item) => item.content).join("\n\n");

  return {
    moduleKey,
    found: moduleLikeFiles.length > 0,
    files: Array.from(new Set(moduleLikeFiles.map((item) => item.relative))),
    routes: {
      standardExists: routeExists(moduleKey),
      routeFiles: appRouteMatches(moduleKey),
    },
    hasCompositionChildren:
      combined.includes("composition") && combined.includes("children"),
    hasOperationalBranding:
      combined.includes("operational") && combined.includes("branding"),
    hasRightPanelMetrics:
      combined.includes("rightPanel") && combined.includes("metrics"),
    hasClientRelation:
      combined.includes("clientId") ||
      combined.includes("clientAutoId") ||
      combined.includes("clientautoId") ||
      combined.includes("client"),
    hasVehiculeRelation:
      combined.includes("vehiculeId") ||
      combined.includes("vehiculeAutoId") ||
      combined.includes("vehiculeautoId") ||
      combined.includes("vehicleId") ||
      combined.includes("vehicule"),
    mentionsRendezvous:
      combined.includes("rendezvous") ||
      combined.includes("rendez-vous") ||
      combined.includes("rdv"),
    mentionsInterventions:
      combined.includes("interventionsauto") ||
      combined.includes("interventions"),
    mentionsFactures:
      combined.includes("facturesauto") ||
      combined.includes("factures"),
  };
}

function pickExisting(candidates) {
  const analyses = candidates.map(analyzeModule);
  return analyses.find((analysis) => analysis.found) ?? analyses[0];
}

const clients = pickExisting(candidates.clients);
const vehicules = pickExisting(candidates.vehicules);

const operationalTable = read(files.operationalTable);
const operationalExpanded = read(files.operationalExpanded);
const operationalResolver = read(files.operationalResolver);

const checks = [
  {
    label: "Module clients found",
    ok: clients.found,
    details: clients.files,
  },
  {
    label: "Module vehicules found",
    ok: vehicules.found,
    details: vehicules.files,
  },
  {
    label: "Clients route or page files exist",
    ok: clients.routes.standardExists || clients.routes.routeFiles.length > 0,
    details: clients.routes.routeFiles,
    warning: true,
  },
  {
    label: "Vehicules route or page files exist",
    ok: vehicules.routes.standardExists || vehicules.routes.routeFiles.length > 0,
    details: vehicules.routes.routeFiles,
    warning: true,
  },
  {
    label: "Clients module has composition.children",
    ok: clients.hasCompositionChildren,
    warning: true,
  },
  {
    label: "Vehicules module has composition.children",
    ok: vehicules.hasCompositionChildren,
    warning: true,
  },
  {
    label: "Clients module has operational.branding",
    ok: clients.hasOperationalBranding,
    warning: true,
  },
  {
    label: "Vehicules module has operational.branding",
    ok: vehicules.hasOperationalBranding,
    warning: true,
  },
  {
    label: "Clients module has rightPanel.metrics",
    ok: clients.hasRightPanelMetrics,
    warning: true,
  },
  {
    label: "Vehicules module has rightPanel.metrics",
    ok: vehicules.hasRightPanelMetrics,
    warning: true,
  },
  {
    label: "Clients module mentions vehicule relation",
    ok: clients.hasVehiculeRelation || clients.mentionsRendezvous || clients.mentionsInterventions,
    warning: true,
  },
  {
    label: "Vehicules module mentions client relation",
    ok: vehicules.hasClientRelation,
    warning: true,
  },
  {
    label: "Vehicules module mentions rendezvous or interventions",
    ok: vehicules.mentionsRendezvous || vehicules.mentionsInterventions,
    warning: true,
  },
  {
    label: "ERPOperationalTable exists",
    ok: fs.existsSync(files.operationalTable),
  },
  {
    label: "ERPOperationalTable can render expanded children",
    ok: operationalTable.includes("ERPOperationalExpandedChildren"),
  },
  {
    label: "ERPOperationalExpandedChildren consumes RuntimeOperationalChildrenResolver",
    ok: operationalExpanded.includes("RuntimeOperationalChildrenResolver.resolveExpandedChildren"),
  },
  {
    label: "RuntimeOperationalChildrenResolver supports composition.children",
    ok: operationalResolver.includes("composition") && operationalResolver.includes("children"),
  },
  {
    label: "RuntimeOperationalChildrenResolver exposes real child module",
    ok: operationalResolver.includes("module: ERPModule") && operationalResolver.includes("module: childModule"),
  },
  {
    label: "No direct Firestore usage in operational resolver",
    ok:
      !operationalResolver.includes("firebase/firestore") &&
      !operationalResolver.includes("collection(") &&
      !operationalResolver.includes("getDocs("),
  },
];

const hardFailures = checks.filter((check) => !check.ok && !check.warning);
const warnings = checks.filter((check) => !check.ok && check.warning);

console.log("");
console.log("[Q2-I-A] Audit clientsauto / vehiculesauto operational readiness");
console.log("");

console.log("[DETECTED]");
console.log(`clients module candidate  : ${clients.moduleKey}`);
console.log(`vehicules module candidate: ${vehicules.moduleKey}`);
console.log("");

console.log("[CLIENTS]");
console.log(JSON.stringify({
  moduleKey: clients.moduleKey,
  found: clients.found,
  files: clients.files,
  routes: clients.routes,
  hasCompositionChildren: clients.hasCompositionChildren,
  hasOperationalBranding: clients.hasOperationalBranding,
  hasRightPanelMetrics: clients.hasRightPanelMetrics,
  hasVehiculeRelation: clients.hasVehiculeRelation,
  mentionsRendezvous: clients.mentionsRendezvous,
  mentionsInterventions: clients.mentionsInterventions,
  mentionsFactures: clients.mentionsFactures,
}, null, 2));

console.log("");
console.log("[VEHICULES]");
console.log(JSON.stringify({
  moduleKey: vehicules.moduleKey,
  found: vehicules.found,
  files: vehicules.files,
  routes: vehicules.routes,
  hasCompositionChildren: vehicules.hasCompositionChildren,
  hasOperationalBranding: vehicules.hasOperationalBranding,
  hasRightPanelMetrics: vehicules.hasRightPanelMetrics,
  hasClientRelation: vehicules.hasClientRelation,
  hasVehiculeRelation: vehicules.hasVehiculeRelation,
  mentionsRendezvous: vehicules.mentionsRendezvous,
  mentionsInterventions: vehicules.mentionsInterventions,
  mentionsFactures: vehicules.mentionsFactures,
}, null, 2));

console.log("");
console.log("[CHECKS]");
for (const check of checks) {
  const prefix = check.ok ? "[OK]" : check.warning ? "[WARN]" : "[FAIL]";
  console.log(`${prefix} ${check.label}`);

  if (check.details?.length) {
    for (const detail of check.details) {
      console.log("       - " + detail);
    }
  }
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.filter((check) => check.ok).length} WARN: ${warnings.length} FAIL: ${hardFailures.length}`);

if (hardFailures.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] Q2-I-A audit completed.");
console.log("");
console.log("Next if build is OK:");
console.log("  Q2-I-B — add operational metadata for clients module");
console.log("  Q2-I-C — add operational metadata for vehicules module");
