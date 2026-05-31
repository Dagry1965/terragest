const fs = require("fs");
const path = require("path");

const root = process.cwd();

const employesDir = path.join(root, "src/runtime/modules/generated/employes");
const modulePath = path.join(employesDir, "employes.module.ts");
const actionsPath = path.join(employesDir, "employes.actions.ts");
const indexPath = path.join(employesDir, "index.ts");
const coreModulesPath = path.join(root, "src/runtime/modules/definitions/coreModules.ts");
const interventionsPath = path.join(root, "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts");
const reportPath = path.join(root, "docs/audits/AMARKHYS-REBUILD-06C-FIX7-B-create-employes-module.md");

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(coreModulesPath)) fail("Missing coreModules.ts");
if (!fs.existsSync(interventionsPath)) fail("Missing interventionsauto.module.ts");

fs.mkdirSync(employesDir, { recursive: true });

const backups = [];

function backupIfExists(file, suffix) {
  if (fs.existsSync(file)) {
    const backup = file + suffix;
    fs.copyFileSync(file, backup);
    backups.push(path.relative(root, backup));
  }
}

backupIfExists(modulePath, ".bak-rebuild-06c-fix7-b");
backupIfExists(actionsPath, ".bak-rebuild-06c-fix7-b");
backupIfExists(indexPath, ".bak-rebuild-06c-fix7-b");
backupIfExists(coreModulesPath, ".bak-rebuild-06c-fix7-b");
backupIfExists(interventionsPath, ".bak-rebuild-06c-fix7-b");

const moduleContent = `import type { ERPModule } from "../../ERPModule";

export const employesModule = {
  key: "employes",
  label: "Employés",
  collection: "employes",
  description: "Employés, techniciens et mécaniciens de l'atelier.",

  schema: {
    fields: [
      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
        list: { visible: true, order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "prenom",
        label: "Prénom",
        type: "text",
        required: false,
        list: { visible: true, order: 2 },
        grid: { cols: 6 },
      },
      {
        key: "fonction",
        label: "Fonction",
        type: "select",
        required: false,
        options: [
          { label: "Mécanicien", value: "mecanicien" },
          { label: "Technicien", value: "technicien" },
          { label: "Chef d'atelier", value: "chef_atelier" },
          { label: "Réceptionnaire", value: "receptionnaire" },
          { label: "Administration", value: "administration" },
        ],
        list: { visible: true, order: 3 },
        grid: { cols: 6 },
      },
      {
        key: "telephone",
        label: "Téléphone",
        type: "phone",
        required: false,
        list: { visible: true, order: 4 },
        grid: { cols: 6 },
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        required: false,
        list: { visible: false },
        grid: { cols: 6 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "actif",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Inactif", value: "inactif" },
        ],
        list: { visible: true, order: 5 },
        grid: { cols: 6 },
      },
    ],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "identite",
        label: "Identité",
        fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],
        sections: [
          {
            key: "infos",
            title: "Informations employé",
            fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],
          },
        ],
      },
    ],
  },

  list: {
    defaultSort: { field: "nom", direction: "asc" },
    searchFields: ["nom", "prenom", "fonction", "telephone", "email"],
  },

  detail: {
    titleFields: ["prenom", "nom"],
    subtitleFields: ["fonction", "telephone", "email"],
  },

  metadata: {
    icon: "users",
    category: "amarkhys",
    tags: ["atelier", "personnel", "mecanicien"],
  },
} satisfies ERPModule;
`;

const actionsContent = `export const employesActions = [];
`;

const indexContent = `export { employesModule } from "./employes.module";
export { employesActions } from "./employes.actions";
`;

fs.writeFileSync(modulePath, moduleContent, "utf8");
fs.writeFileSync(actionsPath, actionsContent, "utf8");
fs.writeFileSync(indexPath, indexContent, "utf8");

let core = fs.readFileSync(coreModulesPath, "utf8");

if (!core.includes('generated/employes')) {
  const firstImportMatch = core.match(/^import .*$/m);
  if (firstImportMatch) {
    core = core.replace(firstImportMatch[0], `${firstImportMatch[0]}
import { employesModule } from "../generated/employes";`);
  } else {
    core = `import { employesModule } from "../generated/employes";
` + core;
  }
}

if (!core.includes("employesModule")) {
  core = core.replace(/\[\s*/, "[\n  employesModule,\n");
} else if (!/\[\s*[\s\S]*employesModule/.test(core)) {
  core = core.replace(/(coreERPModules\s*=\s*\[\s*)/, "$1\n  employesModule,\n");
}

fs.writeFileSync(coreModulesPath, core, "utf8");

let interventions = fs.readFileSync(interventionsPath, "utf8");

// Ajouter relationLabelFields.mecanicienId dans l'objet existant.
if (/relationLabelFields:\s*\{/.test(interventions) && !/relationLabelFields:\s*\{[\s\S]*?mecanicienId/.test(interventions)) {
  interventions = interventions.replace(
    /relationLabelFields:\s*\{/,
    `relationLabelFields: {
        mecanicienId: ["prenom", "nom", "fonction", "telephone"],`
  );
}

fs.writeFileSync(interventionsPath, interventions, "utf8");

const checks = [
  {
    label: "employes.module.ts créé",
    ok: fs.existsSync(modulePath) && fs.readFileSync(modulePath, "utf8").includes("employesModule"),
  },
  {
    label: "employes.actions.ts créé",
    ok: fs.existsSync(actionsPath),
  },
  {
    label: "index.ts exporte employesModule",
    ok: fs.existsSync(indexPath) && fs.readFileSync(indexPath, "utf8").includes("employesModule"),
  },
  {
    label: "coreModules importe employesModule",
    ok: fs.readFileSync(coreModulesPath, "utf8").includes("employesModule"),
  },
  {
    label: "interventionsauto relationLabelFields mecanicienId",
    ok: /relationLabelFields:\s*\{[\s\S]*?mecanicienId/.test(fs.readFileSync(interventionsPath, "utf8")),
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-06C-FIX7-B — Create employes runtime module",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Correction",
  "",
  "- Création du module runtime employes.",
  "- Création actions/index employes.",
  "- Enregistrement dans coreModules.",
  "- Ajout relationLabelFields.mecanicienId dans interventionsauto.",
  "",
  "## Backups",
  "",
  ...backups.map((b) => `- ${b}`),
  "",
  "## Checks",
  "",
  ...checks.map((c) => `- ${c.ok ? "OK" : "FAIL"} — ${c.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-06C-FIX7-B] Create employes runtime module");
console.log("[REPORT]", path.relative(root, reportPath));
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) process.exit(1);

console.log("[AMARKHYS-REBUILD-06C-FIX7-B] DONE");
console.log("[NEXT] Rerun relation audit, build, then UI check.");