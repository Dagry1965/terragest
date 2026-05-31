const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/employes/employes.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX7-E-align-employes-module-shape.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-06c-fix7-e-module-shape";
fs.copyFileSync(modulePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

const content = `import type { ERPModule } from "../../ERPModule";

export const employesModule = {
  metadata: {
    key: "employes",
    label: "Employés",
    icon: "users",
    category: "amarkhys",
    tags: ["atelier", "personnel", "mecanicien"],
  },

  schema: {
    collection: "employes",
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
} satisfies ERPModule;
`;

fs.writeFileSync(modulePath, content, "utf8");

const checks = [
  {
    label: "pas de key racine",
    ok: !/^\\s*key:\\s*"employes"/m.test(content),
  },
  {
    label: "metadata.key présent",
    ok: /metadata:\\s*\\{[\\s\\S]*key:\\s*"employes"/.test(content),
  },
  {
    label: "metadata.label présent",
    ok: /metadata:\\s*\\{[\\s\\S]*label:\\s*"Employés"/.test(content),
  },
  {
    label: "schema.collection présent",
    ok: /schema:\\s*\\{[\\s\\S]*collection:\\s*"employes"/.test(content),
  },
  {
    label: "fields présents",
    ok: content.includes("fields: ["),
  },
  {
    label: "satisfies ERPModule conservé",
    ok: content.includes("satisfies ERPModule"),
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-06C-FIX7-E — Align employes module shape",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Correction",
  "",
  "- Suppression de key/label/collection au niveau racine.",
  "- Déplacement de key/label dans metadata.",
  "- Conservation de schema.collection.",
  "- Conservation des champs employés.",
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

console.log("[AMARKHYS-REBUILD-06C-FIX7-E] Align employes module shape");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06C-FIX7-E] DONE");
console.log("[NEXT] pnpm build");