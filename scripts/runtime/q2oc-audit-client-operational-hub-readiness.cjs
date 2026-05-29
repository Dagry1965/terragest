const fs = require("fs");
const path = require("path");

const root = process.cwd();

const reportPath = path.join(
  root,
  "docs",
  "audits",
  "Q2-OC-client-operational-hub-readiness.md"
);

const checks = [];

function add(scope, status, severity, message) {
  checks.push({ scope, status, severity, message });
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(dir, predicate, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, predicate, results);
      continue;
    }

    if (predicate(full)) {
      results.push(full);
    }
  }

  return results;
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

console.log("[Q2-OC] Client Operational Hub readiness audit");
console.log("[ROOT] " + root);

const foundationFiles = [
  "src/runtime/hub/RuntimeHubTypes.ts",
  "src/runtime/hub/RuntimeHubConfigResolver.ts",
  "src/runtime/hub/RuntimeHubEngine.ts",
  "src/runtime/hub/index.ts",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/index.ts",
];

for (const file of foundationFiles) {
  if (exists(file)) {
    add("foundation", "OK", "HIGH", "Found " + file);
  } else {
    add("foundation", "FAIL", "HIGH", "Missing " + file);
  }
}

const runtimeModuleFiles = walk(path.join(root, "src", "runtime", "modules"), (file) => {
  return file.endsWith(".ts") || file.endsWith(".tsx");
});

const clientModuleMatches = runtimeModuleFiles.filter((file) => {
  const content = fs.readFileSync(file, "utf8");
  return content.includes("clientsauto");
});

if (clientModuleMatches.length === 0) {
  add("clientsauto", "FAIL", "HIGH", "No runtime module file containing clientsauto was found");
} else {
  for (const file of clientModuleMatches) {
    add("clientsauto", "OK", "HIGH", "clientsauto detected in " + rel(file));

    const content = fs.readFileSync(file, "utf8");

    if (content.includes("operationalHub")) {
      add("clientsauto", "WARN", "LOW", "operationalHub already exists in " + rel(file));
    }

    if (content.includes("operational")) {
      add("clientsauto", "OK", "MEDIUM", "operational metadata detected in " + rel(file));
    } else {
      add("clientsauto", "WARN", "LOW", "operational metadata not detected in " + rel(file));
    }

    if (content.includes("vehicules")) {
      add("clientsauto", "OK", "MEDIUM", "vehicules relationship text detected in " + rel(file));
    } else {
      add("clientsauto", "WARN", "LOW", "vehicules relationship text not detected in " + rel(file));
    }
  }
}

const targetModules = ["vehicules", "rendezvous", "interventionsauto", "facturesauto"];

for (const moduleKey of targetModules) {
  const matches = runtimeModuleFiles.filter((file) => fs.readFileSync(file, "utf8").includes(moduleKey));

  if (matches.length === 0) {
    add("related-modules", "FAIL", "HIGH", "Missing related module: " + moduleKey);
  } else {
    add("related-modules", "OK", "HIGH", "Related module detected: " + moduleKey);
  }
}

const appFiles = walk(path.join(root, "src", "app"), (file) => file.endsWith(".tsx") || file.endsWith(".ts"));

const clientRoutes = appFiles.filter((file) => {
  const normalized = rel(file);
  return normalized.includes("clientsauto") || normalized.includes("clients");
});

if (clientRoutes.length === 0) {
  add("routes", "WARN", "MEDIUM", "No client route detected under src/app");
} else {
  for (const file of clientRoutes) {
    add("routes", "OK", "LOW", "Client-related route detected: " + rel(file));
  }
}

const backups = walk(root, (file) => {
  const name = path.basename(file);
  return name.includes(".bak-q2oc");
});

if (backups.length > 0) {
  for (const backup of backups) {
    add("cleanup", "FAIL", "HIGH", "Q2-OC backup still present: " + rel(backup));
  }
} else {
  add("cleanup", "OK", "HIGH", "No Q2-OC backup detected");
}

const ok = checks.filter((check) => check.status === "OK");
const warn = checks.filter((check) => check.status === "WARN");
const fail = checks.filter((check) => check.status === "FAIL");
const highFail = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH");

const lines = [];

lines.push("# Q2-OC — Client Operational Hub Readiness");
lines.push("");
lines.push("- Date: " + new Date().toISOString());
lines.push("- Root: `" + root + "`");
lines.push("");
lines.push("## Objectif");
lines.push("");
lines.push("Préparer le branchement du premier hub opérationnel réel : `clientsauto`.");
lines.push("");
lines.push("Le branchement doit rester générique : metadata `operationalHub`, route hub réutilisable, UI `ERPRecordHubPage`, sans logique AMARKHYS hardcodée.");
lines.push("");
lines.push("## Résumé");
lines.push("");
lines.push("- OK: " + ok.length);
lines.push("- WARN: " + warn.length);
lines.push("- FAIL: " + fail.length);
lines.push("- HIGH FAIL: " + highFail.length);
lines.push("");
lines.push("## Checks");
lines.push("");
lines.push("| Scope | Status | Severity | Message |");
lines.push("|---|---:|---:|---|");

for (const check of checks) {
  lines.push("| " + check.scope + " | " + check.status + " | " + check.severity + " | " + check.message.replaceAll("|", "\\|") + " |");
}

lines.push("");
lines.push("## Décision");
lines.push("");

if (highFail.length > 0) {
  lines.push("Q2-OC n’est pas prêt. Corriger les HIGH FAIL avant branchement.");
} else {
  lines.push("Q2-OC est prêt techniquement pour un premier branchement metadata + route hub client.");
}

fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

console.log("[REPORT] " + rel(reportPath));
console.log("[OK] " + ok.length);
console.log("[WARN] " + warn.length);
console.log("[FAIL] " + fail.length);
console.log("[FAIL_HIGH] " + highFail.length);

if (highFail.length > 0) {
  process.exit(1);
}

console.log("[Q2-OC] Audit completed without HIGH failure.");