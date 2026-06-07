const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/modules/ERPModule.ts",
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
];

const checks = [];

function read(rel) {
  const file = path.join(ROOT, rel);

  if (!fs.existsSync(file)) {
    checks.push({ level: "FAIL", file: rel, message: "Fichier introuvable" });
    return "";
  }

  return fs.readFileSync(file, "utf8");
}

function checkContains(rel, content, pattern, message) {
  checks.push({
    level: content.includes(pattern) ? "OK" : "FAIL",
    file: rel,
    message,
    pattern,
  });
}

function checkNotContains(rel, content, pattern, message) {
  checks.push({
    level: content.includes(pattern) ? "FAIL" : "OK",
    file: rel,
    message,
    pattern,
  });
}

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const erpModule = contents["src/runtime/modules/ERPModule.ts"];
const modulePage = contents["src/components/erp/operational/ERPOperationalModulePage.tsx"];

console.log("");
console.log("[Q2-D-F-C-OPERATIONAL-BRANDING-METADATA-DRIVEN-AUDIT]");
console.log("");

checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "ERPOperationalBrandingConfig",
  "Contrat ERPOperationalBrandingConfig présent"
);

checkContains(
  "src/runtime/modules/ERPModule.ts",
  erpModule,
  "branding?: ERPOperationalBrandingConfig",
  "ERPOperationalModuleConfig supporte branding"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "config?.branding",
  "ERPOperationalModulePage lit config.branding"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "brandName",
  "ERPOperationalModulePage utilise brandName"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "runtimeLabel",
  "ERPOperationalModulePage utilise runtimeLabel"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "eyebrow",
  "ERPOperationalModulePage utilise eyebrow"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "{eyebrow}",
  "Header opérationnel affiche eyebrow metadata-driven"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "AMARKHYS · Runtime ERP",
  "ERPOperationalModulePage ne hardcode plus AMARKHYS · Runtime ERP"
);

checkNotContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "AMARKHYS · Runtime ERP",
  "ERPOperationalModulePage ne hardcode plus AMARKHYS mojibake"
);

for (const rel of [
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
]) {
  const content = contents[rel];

  checkContains(rel, content, "branding:", `${rel} déclare operational.branding`);
  checkContains(rel, content, 'brandName: "AMARKHYS"', `${rel} déclare brandName`);
  checkContains(rel, content, 'runtimeLabel: "Runtime ERP"', `${rel} déclare runtimeLabel`);
  checkContains(rel, content, "eyebrow:", `${rel} déclare eyebrow`);
}

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;

for (const check of checks) {
  console.log(`[${check.level}] ${check.file}`);
  console.log("     " + check.message);
  if (check.level === "FAIL" && check.pattern) {
    console.log("     pattern: " + check.pattern);
  }
}

console.log("");
console.log("[SUMMARY]");
console.log("OK:", okCount);
console.log("FAIL:", failCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-D-F-C — Audit operational branding metadata-driven",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- [${check.level}] ${check.file} — ${check.message}`),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "Le branding opérationnel est metadata-driven."
    : "Corriger les FAIL avant commit.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-D-F-C-operational-branding-metadata-driven-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-D-F-C-operational-branding-metadata-driven-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant commit.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK — branding opérationnel metadata-driven validé.");
