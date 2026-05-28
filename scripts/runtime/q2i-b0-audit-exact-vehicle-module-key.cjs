const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const moduleKeys = ["vehicules", "vehiculesauto"];

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

function findModuleFiles(moduleKey) {
  const roots = [
    path.join(ROOT, "src", "runtime", "modules", "generated"),
    path.join(ROOT, "src", "runtime", "modules", "definitions", "generated"),
    path.join(ROOT, "src", "runtime", "modules", "definitions"),
  ];

  const matches = [];

  for (const root of roots) {
    for (const file of walk(root)) {
      if (!/\.(ts|tsx)$/.test(file)) continue;

      const content = read(file);

      const strong =
        content.includes(`key: "${moduleKey}"`) ||
        content.includes(`key: '${moduleKey}'`) ||
        content.includes(`metadata: { key: "${moduleKey}"`) ||
        content.includes(`metadata: { key: '${moduleKey}'`);

      const weak = path.basename(file).includes(moduleKey) || content.includes(moduleKey);

      if (strong || weak) {
        matches.push({
          file: path.relative(ROOT, file),
          strong,
          weak,
          hasCompositionChildren: content.includes("composition") && content.includes("children"),
          hasOperationalBranding: content.includes("operational") && content.includes("branding"),
          hasRightPanelMetrics: content.includes("rightPanel") && content.includes("metrics"),
          hasClientId: content.includes("clientId"),
          hasVehiculeId: content.includes("vehiculeId"),
          mentionsRendezvous: content.includes("rendezvous"),
          mentionsInterventions: content.includes("interventionsauto") || content.includes("interventions"),
        });
      }
    }
  }

  return matches;
}

function findRouteFiles(moduleKey) {
  const appRoot = path.join(ROOT, "src", "app");

  return walk(appRoot)
    .filter((file) => file.endsWith("page.tsx") || file.endsWith("page.ts"))
    .map((file) => path.relative(ROOT, file))
    .filter((file) => file.includes(moduleKey));
}

console.log("");
console.log("[Q2-I-B0] Audit exact vehicle module key");
console.log("");

for (const key of moduleKeys) {
  const moduleFiles = findModuleFiles(key);
  const routeFiles = findRouteFiles(key);

  console.log(`[MODULE] ${key}`);
  console.log(JSON.stringify({
    moduleFiles,
    routeFiles,
  }, null, 2));
  console.log("");
}

const vehiculesFiles = findModuleFiles("vehicules");
const vehiculesAutoFiles = findModuleFiles("vehiculesauto");

const vehiculesStrong = vehiculesFiles.some((item) => item.strong);
const vehiculesAutoStrong = vehiculesAutoFiles.some((item) => item.strong);

console.log("[DECISION]");
if (vehiculesStrong && !vehiculesAutoStrong) {
  console.log("Use module key: vehicules");
} else if (!vehiculesStrong && vehiculesAutoStrong) {
  console.log("Use module key: vehiculesauto");
} else if (vehiculesStrong && vehiculesAutoStrong) {
  console.log("Ambiguous: both vehicules and vehiculesauto have strong module definitions");
} else {
  console.log("No strong vehicle module definition found");
}

console.log("");
console.log("[DONE] Send this output before Q2-I-B/C.");
