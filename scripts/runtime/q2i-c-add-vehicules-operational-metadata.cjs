const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const modulePath = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "vehicules",
  "vehicules.module.ts"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("vehicules.module.ts not found");
}

let content = fs.readFileSync(modulePath, "utf8");

const backupPath = modulePath + ".bak-q2i-c-operational-metadata";
fs.writeFileSync(backupPath, content, "utf8");

console.log("[BACKUP]", path.relative(ROOT, backupPath));

function extractObjectBlock(source, propertyName) {
  const marker = `${propertyName}:`;
  const start = source.indexOf(marker);

  if (start < 0) return null;

  const braceStart = source.indexOf("{", start);
  if (braceStart < 0) return null;

  let depth = 0;
  let inString = false;
  let stringChar = "";
  let escaped = false;

  for (let i = braceStart; i < source.length; i++) {
    const char = source[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === stringChar) {
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
      let end = i + 1;

      while (
        source[end] === "," ||
        source[end] === "\n" ||
        source[end] === "\r" ||
        source[end] === " "
      ) {
        if (source[end] === ",") {
          end++;
          break;
        }
        end++;
      }

      return source.slice(start, end).trimEnd();
    }
  }

  return null;
}

function removeTopLevelBlock(source, propertyName) {
  const block = extractObjectBlock(source, propertyName);
  if (!block) return source;
  return source.replace(block, "").replace(/\n{3,}/g, "\n\n");
}

function findTopLevelInsertionPoint(source) {
  const markers = [
    "\n  composition:",
    "\n  workflows:",
    "\n  actions:",
    "\n  permissions:",
    "\n  automation:",
    "\n  dashboard:",
  ];

  for (const marker of markers) {
    const index = source.indexOf(marker);
    if (index >= 0) return index;
  }

  const last = source.lastIndexOf("\n};");
  if (last >= 0) return last;

  fail("Unable to find insertion point");
}

content = removeTopLevelBlock(content, "operational");
content = removeTopLevelBlock(content, "rightPanel");

const operationalBlock = `
  operational: {
    enabled: true,
    title: "Véhicules",
    subtitle: "Vue opérationnelle des véhicules, rendez-vous et interventions atelier.",
    branding: {
      brandName: "AMARKHYS",
      runtimeLabel: "Runtime ERP",
      eyebrow: "AMARKHYS · Runtime ERP",
    },
    rightPanel: {
      enabled: true,
      title: "Parc véhicules",
      type: "summary",
      metrics: [
        {
          key: "total",
          label: "Véhicules affichés",
          type: "count",
          format: "number",
        },
        {
          key: "actifs",
          label: "Véhicules actifs",
          type: "countWhere",
          field: "statut",
          equals: "actif",
          format: "number",
        },
      ],
    },
  },
`;

const insertionPoint = findTopLevelInsertionPoint(content);

content =
  content.slice(0, insertionPoint).trimEnd() +
  "\n" +
  operationalBlock +
  content.slice(insertionPoint);

fs.writeFileSync(modulePath, content, "utf8");

const updated = fs.readFileSync(modulePath, "utf8");

const checks = [
  {
    label: "vehicules has operational.enabled",
    ok: updated.includes("operational:") && updated.includes("enabled: true"),
  },
  {
    label: "vehicules has operational title/subtitle",
    ok:
      /operational\s*:\s*\{[\s\S]*?title\s*:\s*"Véhicules"/.test(updated) &&
      /operational\s*:\s*\{[\s\S]*?subtitle\s*:/.test(updated),
  },
  {
    label: "vehicules branding uses valid contract",
    ok:
      updated.includes("brandName:") &&
      updated.includes("runtimeLabel:") &&
      updated.includes("eyebrow:") &&
      !/branding\s*:\s*\{[\s\S]*?\bicon\s*:/.test(updated) &&
      !/branding\s*:\s*\{[\s\S]*?\btone\s*:/.test(updated),
  },
  {
    label: "vehicules has operational.rightPanel.metrics",
    ok: /operational\s*:\s*\{[\s\S]*?rightPanel\s*:\s*\{[\s\S]*?metrics\s*:/.test(updated),
  },
  {
    label: "composition preserved",
    ok: updated.includes("composition") && updated.includes("children"),
  },
  {
    label: "client relation preserved",
    ok: updated.includes("clientId"),
  },
  {
    label: "rendezvous/interventions relation preserved",
    ok: updated.includes("rendezvous") || updated.includes("interventionsauto"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-I-C] Add vehicules operational metadata");
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] vehicules operational metadata added.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
