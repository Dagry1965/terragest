const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const modulePath = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "clientsauto",
  "clientsauto.module.ts"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("clientsauto.module.ts not found");
}

let content = fs.readFileSync(modulePath, "utf8");

const backupPath = modulePath + ".bak-q2i-b2-c-fix-operational-contract";
fs.writeFileSync(backupPath, content, "utf8");

console.log("[BACKUP]", path.relative(ROOT, backupPath));

const oldOperational = /  operational:\s*\{[\s\S]*?\n  \},\s*\n\s*rightPanel:\s*\{[\s\S]*?\n  \},/m;

if (!oldOperational.test(content)) {
  fail("Unable to locate current operational/rightPanel blocks");
}

const newOperational = `  operational: {
    enabled: true,
    title: "Clients",
    subtitle: "Vue opérationnelle des clients, véhicules et suivi atelier.",
    branding: {
      brandName: "AMARKHYS",
      runtimeLabel: "Runtime ERP",
      eyebrow: "AMARKHYS · Runtime ERP",
    },
    rightPanel: {
      enabled: true,
      title: "Portefeuille clients",
      type: "summary",
      metrics: [
        {
          key: "total",
          label: "Clients affichés",
          type: "count",
          format: "number",
        },
        {
          key: "actifs",
          label: "Clients actifs",
          type: "countWhere",
          field: "statut",
          equals: "actif",
          format: "number",
        },
        {
          key: "prospects",
          label: "Prospects",
          type: "countWhere",
          field: "statut",
          equals: "prospect",
          format: "number",
        },
      ],
    },
  },`;

content = content.replace(oldOperational, newOperational);

fs.writeFileSync(modulePath, content, "utf8");

const updated = fs.readFileSync(modulePath, "utf8");

const checks = [
  {
    label: "operational.enabled present",
    ok: updated.includes("operational:") && updated.includes("enabled: true"),
  },
  {
    label: "operational.title present outside branding",
    ok: /operational\s*:\s*\{[\s\S]*?title\s*:\s*"Clients"/.test(updated),
  },
  {
    label: "operational.subtitle present outside branding",
    ok: /operational\s*:\s*\{[\s\S]*?subtitle\s*:/.test(updated),
  },
  {
    label: "branding uses brandName/runtimeLabel/eyebrow",
    ok:
      updated.includes("brandName:") &&
      updated.includes("runtimeLabel:") &&
      updated.includes("eyebrow:"),
  },
  {
    label: "branding has no invalid icon/tone/title/subtitle",
    ok:
      !/branding\s*:\s*\{[\s\S]*?\bicon\s*:/.test(updated) &&
      !/branding\s*:\s*\{[\s\S]*?\btone\s*:/.test(updated) &&
      !/branding\s*:\s*\{[\s\S]*?\btitle\s*:/.test(updated) &&
      !/branding\s*:\s*\{[\s\S]*?\bsubtitle\s*:/.test(updated),
  },
  {
    label: "rightPanel is inside operational",
    ok: /operational\s*:\s*\{[\s\S]*?rightPanel\s*:\s*\{/.test(updated),
  },
  {
    label: "no top-level rightPanel remains",
    ok: !/\n  rightPanel\s*:\s*\{/.test(updated.replace(/operational\s*:\s*\{[\s\S]*?\n  \},/, "")),
  },
  {
    label: "composition.children preserved",
    ok: updated.includes("composition") && updated.includes("children"),
  },
  {
    label: "vehicules relation preserved",
    ok: updated.includes('moduleKey: "vehicules"') || updated.includes("moduleKey:'vehicules'"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-I-B2-C] Fix clientsauto operational contract");
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
console.log("[DONE] clientsauto operational contract fixed.");
console.log("");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\q2i-b-audit-clientsauto-operational-readiness-final.cjs");
console.log("  pnpm build");
