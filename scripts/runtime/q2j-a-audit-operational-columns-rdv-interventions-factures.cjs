const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const modules = [
  {
    key: "rendezvous",
    file: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
    expectedFields: ["codeRendezVous", "dateRendezVous", "heureRendezVous", "clientId", "vehiculeId", "statut"],
    expectedRelations: {
      clientId: ["nom", "prenom", "telephone"],
      vehiculeId: ["marque", "modele", "immatriculation"],
    },
    expectedChildren: ["interventionsauto"],
  },
  {
    key: "interventionsauto",
    file: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    expectedFields: ["dateIntervention", "typeIntervention", "clientId", "vehiculeId", "statut"],
    expectedRelations: {
      clientId: ["nom", "prenom", "telephone"],
      vehiculeId: ["marque", "modele", "immatriculation"],
      rendezVousId: ["dateRendezVous", "heureRendezVous", "typeService"],
    },
    expectedChildren: ["lignesinterventionauto", "facturesauto"],
  },
  {
    key: "facturesauto",
    file: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
    expectedFields: ["numeroFacture", "dateFacture", "clientId", "vehiculeId", "montantTTC", "statut"],
    expectedRelations: {
      clientId: ["nom", "prenom", "telephone"],
      vehiculeId: ["marque", "modele", "immatriculation"],
      interventionId: ["dateIntervention", "typeIntervention", "statut"],
    },
    expectedChildren: ["encaissementsauto", "echeancespaiementauto"],
  },
];

function read(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : "";
}

function extractBlock(source, marker, openChar, closeChar) {
  const start = source.indexOf(marker);
  if (start < 0) return "";

  const open = source.indexOf(openChar, start);
  if (open < 0) return "";

  let depth = 0;
  let inString = false;
  let stringChar = "";
  let escaped = false;

  for (let i = open; i < source.length; i++) {
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

    if (char === openChar) depth++;
    if (char === closeChar) depth--;

    if (depth === 0) return source.slice(open, i + 1);
  }

  return "";
}

function objectBlock(source, name) {
  return extractBlock(source, `${name}:`, "{", "}");
}

function arrayBlock(source, name) {
  return extractBlock(source, `${name}:`, "[", "]");
}

function valuesFromArray(block) {
  return [...block.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
}

function inspect(config) {
  const content = read(config.file);
  const operational = objectBlock(content, "operational");
  const branding = objectBlock(operational, "branding");
  const table = objectBlock(operational, "table");
  const rightPanel = objectBlock(operational, "rightPanel");
  const relationLabelFields = objectBlock(table, "relationLabelFields");
  const composition = objectBlock(content, "composition");
  const childrenArray = arrayBlock(composition, "children");

  const tableFields = valuesFromArray(arrayBlock(table, "fields"));
  const hiddenFields = valuesFromArray(arrayBlock(table, "hiddenFields"));
  const childModuleKeys = [...childrenArray.matchAll(/moduleKey\s*:\s*["']([^"']+)["']/g)].map((m) => m[1]);

  const relationReports = Object.entries(config.expectedRelations).map(([field, expected]) => {
    const actual = valuesFromArray(arrayBlock(relationLabelFields, field));
    return {
      field,
      expected,
      actual,
      ok: expected.every((value) => actual.includes(value)),
    };
  });

  const checks = [
    ["module file exists", Boolean(content)],
    ["operational.enabled present", operational.includes("enabled: true")],
    ["operational has title/subtitle", operational.includes("title:") && operational.includes("subtitle:")],
    ["branding contract valid", branding.includes("brandName:") && branding.includes("runtimeLabel:") && branding.includes("eyebrow:") && !branding.includes("icon:") && !branding.includes("tone:")],
    ["kpis present", operational.includes("kpis:")],
    ["rightPanel metrics present", rightPanel.includes("metrics:")],
    ["operational.table present", Boolean(table)],
    ["operational.table fields present", tableFields.length > 0],
    ["expected table fields present", config.expectedFields.every((field) => tableFields.includes(field))],
    ["hidden technical fields present", hiddenFields.includes("tenantId") && hiddenFields.includes("workspaceId") && hiddenFields.includes("removedAt")],
    ["relationLabelFields present", Boolean(relationLabelFields)],
    ["expected relation labels present", relationReports.every((report) => report.ok)],
    ["composition.children present", Boolean(childrenArray)],
    ["expected child modules present", config.expectedChildren.some((child) => childModuleKeys.includes(child))],
    ["no duplicate relationLabelFields", (content.match(/relationLabelFields\s*:/g) || []).length <= 1],
  ];

  return {
    key: config.key,
    file: config.file,
    tableFields,
    hiddenFields,
    childModuleKeys,
    relationReports,
    checks,
  };
}

console.log("");
console.log("[Q2-J-A] Audit operational columns rendezvous / interventionsauto / facturesauto");
console.log("");

const reports = modules.map(inspect);
let ok = 0;
let fail = 0;

for (const report of reports) {
  console.log("");
  console.log(`[MODULE] ${report.key}`);
  console.log(JSON.stringify({
    file: report.file,
    tableFields: report.tableFields,
    hiddenFields: report.hiddenFields,
    childModuleKeys: report.childModuleKeys,
    relationReports: report.relationReports,
  }, null, 2));

  console.log("");
  console.log("[CHECKS]");

  for (const [label, passed] of report.checks) {
    console.log(`${passed ? "[OK]" : "[FAIL]"} ${label}`);
    passed ? ok++ : fail++;
  }
}

console.log("");
console.log("[GLOBAL SUMMARY]");
console.log(`[SUMMARY] OK: ${ok} FAIL: ${fail}`);

if (fail > 0) {
  console.log("");
  console.log("[DONE] Q2-J-A audit completed with findings.");
  process.exit(1);
}

console.log("");
console.log("[DONE] Q2-J-A audit passed.");
