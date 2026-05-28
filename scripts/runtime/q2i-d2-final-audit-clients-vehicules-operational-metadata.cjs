const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const modules = {
  clientsauto: path.join(ROOT, "src", "runtime", "modules", "generated", "clientsauto", "clientsauto.module.ts"),
  vehicules: path.join(ROOT, "src", "runtime", "modules", "generated", "vehicules", "vehicules.module.ts"),
};

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function extractObjectBlock(source, propertyName) {
  const start = source.indexOf(`${propertyName}:`);
  if (start < 0) return "";

  const braceStart = source.indexOf("{", start);
  if (braceStart < 0) return "";

  let depth = 0;
  let inString = false;
  let stringChar = "";
  let escaped = false;

  for (let i = braceStart; i < source.length; i++) {
    const char = source[i];

    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === stringChar) {
        inString = false;
        stringChar = "";
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      stringChar = char;
      continue;
    }

    if (char === "{") depth++;
    if (char === "}") depth--;

    if (depth === 0) {
      return source.slice(start, i + 1);
    }
  }

  return "";
}

function hasValidOperational(content) {
  const operational = extractObjectBlock(content, "operational");

  return (
    operational.includes("enabled: true") &&
    /\btitle\s*:/.test(operational) &&
    /\bsubtitle\s*:/.test(operational) &&
    operational.includes("branding:") &&
    operational.includes("brandName:") &&
    operational.includes("runtimeLabel:") &&
    operational.includes("eyebrow:") &&
    operational.includes("rightPanel:") &&
    operational.includes("metrics:")
  );
}

function brandingIsClean(content) {
  const operational = extractObjectBlock(content, "operational");
  const branding = extractObjectBlock(operational, "branding");

  return (
    branding.includes("brandName:") &&
    branding.includes("runtimeLabel:") &&
    branding.includes("eyebrow:") &&
    !/\bicon\s*:/.test(branding) &&
    !/\btone\s*:/.test(branding) &&
    !/\btitle\s*:/.test(branding) &&
    !/\bsubtitle\s*:/.test(branding)
  );
}

function findCurrentPassBackups() {
  const dirs = [
    path.join(ROOT, "src", "runtime", "modules", "generated", "clientsauto"),
    path.join(ROOT, "src", "runtime", "modules", "generated", "vehicules"),
  ];

  const backups = [];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    for (const file of fs.readdirSync(dir)) {
      if (file.includes(".bak-")) {
        backups.push(path.relative(ROOT, path.join(dir, file)));
      }
    }
  }

  return backups;
}

const clients = read(modules.clientsauto);
const vehicules = read(modules.vehicules);
const currentPassBackups = findCurrentPassBackups();

const checks = [
  { label: "clientsauto module exists", ok: fs.existsSync(modules.clientsauto) },
  { label: "vehicules module exists", ok: fs.existsSync(modules.vehicules) },
  { label: "clientsauto has valid operational metadata", ok: hasValidOperational(clients) },
  { label: "vehicules has valid operational metadata", ok: hasValidOperational(vehicules) },
  { label: "clientsauto branding contract is clean", ok: brandingIsClean(clients) },
  { label: "vehicules branding contract is clean", ok: brandingIsClean(vehicules) },
  { label: "clientsauto has composition.children", ok: clients.includes("composition") && clients.includes("children") },
  { label: "vehicules has composition.children", ok: vehicules.includes("composition") && vehicules.includes("children") },
  { label: "clientsauto links to vehicules", ok: clients.includes("moduleKey") && clients.includes("vehicules") },
  { label: "vehicules links to rendezvous or interventionsauto", ok: vehicules.includes("rendezvous") || vehicules.includes("interventionsauto") },
  { label: "clientsauto rightPanel has metrics", ok: extractObjectBlock(clients, "operational").includes("rightPanel:") && extractObjectBlock(clients, "operational").includes("metrics:") },
  { label: "vehicules rightPanel has metrics", ok: extractObjectBlock(vehicules, "operational").includes("rightPanel:") && extractObjectBlock(vehicules, "operational").includes("metrics:") },
  { label: "No current-pass clientsauto/vehicules backup .bak-* files", ok: currentPassBackups.length === 0, details: currentPassBackups },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-I-D2] Final audit clientsauto + vehicules operational metadata");
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);

  if (!check.ok && check.details?.length) {
    for (const detail of check.details) console.log("       - " + detail);
  }
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) process.exit(1);

console.log("");
console.log("[DONE] Q2-I-D2 final audit passed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
