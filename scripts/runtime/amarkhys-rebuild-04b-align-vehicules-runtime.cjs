const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/vehicules/vehicules.module.ts";
const actionsRel = "src/runtime/modules/generated/vehicules/vehicules.actions.ts";
const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-04B-align-vehicules-runtime.md";

const modulePath = path.join(root, moduleRel);
const actionsPath = path.join(root, actionsRel);
const formPath = path.join(root, formRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) fail("Missing file: " + path.relative(root, filePath));
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function backup(filePath, suffix) {
  const backupPath = filePath + suffix;
  fs.copyFileSync(filePath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

function findMatching(source, openIndex, openChar, closeChar) {
  let depth = 0;
  let quote = null;
  let escape = false;

  for (let i = openIndex; i < source.length; i++) {
    const ch = source[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (ch === "\\") {
      escape = true;
      continue;
    }

    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }

    if (ch === openChar) depth++;
    if (ch === closeChar) {
      depth--;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function ensureImport(source) {
  const importLine = 'import { vehiculesActions } from "./vehicules.actions";';
  if (source.includes(importLine)) return source;

  const lines = source.split(/\r?\n/);
  let lastImport = -1;

  for (let i = 0; i < lines.length; i++) {
    if (/^import\s+/.test(lines[i])) lastImport = i;
  }

  if (lastImport === -1) {
    return importLine + "\n" + source;
  }

  lines.splice(lastImport + 1, 0, importLine);
  return lines.join("\n");
}

function ensureActionsProperty(source) {
  if (source.includes("actions: vehiculesActions")) return source;

  const marker = "export const vehiculesModule";
  const start = source.indexOf(marker);
  if (start === -1) fail("Cannot find vehiculesModule export");

  const open = source.indexOf("{", start);
  if (open === -1) fail("Cannot find vehiculesModule opening brace");

  return source.slice(0, open + 1) + "\n  actions: vehiculesActions," + source.slice(open + 1);
}

function findFieldsArray(source) {
  const schemaIndex = source.indexOf("schema:");
  if (schemaIndex === -1) fail("Cannot find schema");

  const fieldsIndex = source.indexOf("fields:", schemaIndex);
  if (fieldsIndex === -1) fail("Cannot find fields");

  const open = source.indexOf("[", fieldsIndex);
  if (open === -1) fail("Cannot find fields opening bracket");

  const close = findMatching(source, open, "[", "]");
  if (close === -1) fail("Cannot find fields closing bracket");

  return { open, close };
}

function ensureField(source, fieldName, fieldText) {
  if (
    source.includes(`name: "${fieldName}"`) ||
    source.includes(`key: "${fieldName}"`)
  ) {
    return source;
  }

  const { close } = findFieldsArray(source);
  return source.slice(0, close) + fieldText + source.slice(close);
}

function removeVehicleFormAction(source) {
  const marker = 'if (moduleKey === "vehicules" && currentStatus !== "archive")';
  const index = source.indexOf(marker);

  if (index === -1) {
    return { source, removed: false };
  }

  const open = source.indexOf("{", index);
  if (open === -1) fail("Cannot find vehicules form action opening brace");

  const close = findMatching(source, open, "{", "}");
  if (close === -1) fail("Cannot find vehicules form action closing brace");

  let end = close + 1;
  while (/\s/.test(source[end] || "")) end++;

  const replacement =
    '    // vehicules status actions are declared in vehicules.actions.ts and rendered by the runtime action bar.\n\n';

  return {
    source: source.slice(0, index) + replacement + source.slice(end),
    removed: true,
  };
}

const actionsContent = `export const vehiculesActions = [
  {
    key: "vehicules.activer",
    label: "Activer véhicule",
    action: "Activer",
    intent: "activate",
    type: "workflow",
    runtimeOnly: true,
    variant: "primary",
    tone: "success",
    visibleWhen: {
      field: "statut",
      in: ["entretien", "immobilise", "archive"],
    },
    set: {
      statut: "actif",
    },
  },
  {
    key: "vehicules.mettre-en-entretien",
    label: "Mettre en entretien",
    action: "Mettre en entretien",
    intent: "maintenance",
    type: "workflow",
    runtimeOnly: true,
    variant: "secondary",
    tone: "warning",
    visibleWhen: {
      field: "statut",
      in: ["actif"],
    },
    set: {
      statut: "entretien",
    },
  },
  {
    key: "vehicules.immobiliser",
    label: "Immobiliser véhicule",
    action: "Immobiliser",
    intent: "immobilize",
    type: "workflow",
    runtimeOnly: true,
    variant: "secondary",
    tone: "danger",
    visibleWhen: {
      field: "statut",
      in: ["actif", "entretien"],
    },
    set: {
      statut: "immobilise",
    },
  },
  {
    key: "vehicules.archiver",
    label: "Archiver véhicule",
    action: "Archiver",
    intent: "archive",
    type: "workflow",
    runtimeOnly: true,
    variant: "danger",
    tone: "danger",
    confirm: true,
    confirmation: "Archiver ce véhicule ? Les éléments liés resteront consultables mais ne devront plus être modifiés librement.",
    visibleWhen: {
      field: "statut",
      in: ["actif", "entretien", "immobilise"],
    },
    set: {
      statut: "archive",
    },
  },
  {
    key: "vehicules.ouvrir-fiche-vehicule",
    label: "Ouvrir fiche véhicule",
    action: "Ouvrir fiche véhicule",
    intent: "open-operational-hub",
    type: "navigation",
    variant: "secondary",
    href: "/vehicules/hub",
    targetModuleKey: "vehicules",
    preserveRecordContext: true,
  },
  {
    key: "vehicules.ajouter-rdv",
    label: "Ajouter RDV",
    action: "Ajouter RDV",
    intent: "create-child",
    type: "navigation",
    variant: "secondary",
    href: "/rendezvous/nouveau",
    targetModuleKey: "rendezvous",
    parentModuleKey: "vehicules",
    parentForeignKey: "vehiculeId",
    preserveParentContext: true,
  },
  {
    key: "vehicules.ajouter-intervention",
    label: "Ajouter intervention",
    action: "Ajouter intervention",
    intent: "create-child",
    type: "navigation",
    variant: "secondary",
    href: "/interventionsauto/nouveau",
    targetModuleKey: "interventionsauto",
    parentModuleKey: "vehicules",
    parentForeignKey: "vehiculeId",
    preserveParentContext: true,
  },
] as any[];
`;

const energieField = `
    {
      name: "energie",
      label: "Énergie",
      type: "select",
      required: false,
      options: [
        { label: "Essence", value: "essence" },
        { label: "Diesel", value: "diesel" },
        { label: "GPL", value: "gpl" },
        { label: "GNV", value: "gnv" },
        { label: "Bioéthanol", value: "bioethanol" },
        { label: "Électrique", value: "electrique" },
        { label: "Hybride", value: "hybride" },
        { label: "Hydrogène", value: "hydrogene" },
      ],
    },
`;

const dateFinGarantieField = `
    {
      name: "dateFinGarantie",
      label: "Date fin garantie",
      type: "date",
      required: false,
    },
`;

console.log("[AMARKHYS-REBUILD-04B] Align vehicules runtime");
console.log("[ROOT]", root);

backup(actionsPath, ".bak-rebuild-04b-vehicules-runtime");
backup(modulePath, ".bak-rebuild-04b-vehicules-runtime");
backup(formPath, ".bak-rebuild-04b-vehicules-runtime");

write(actionsPath, actionsContent);

let moduleContent = read(modulePath);
moduleContent = ensureImport(moduleContent);
moduleContent = ensureActionsProperty(moduleContent);
moduleContent = ensureField(moduleContent, "energie", energieField);
moduleContent = ensureField(moduleContent, "dateFinGarantie", dateFinGarantieField);
write(modulePath, moduleContent);

let formContent = read(formPath);
const formResult = removeVehicleFormAction(formContent);
formContent = formResult.source;
write(formPath, formContent);

const checks = [
  {
    label: "vehicules.actions.ts contient 7 actions",
    ok: (read(actionsPath).match(/key:\s*"/g) || []).length === 7,
  },
  {
    label: "vehicules.module.ts importe vehiculesActions",
    ok: read(modulePath).includes('import { vehiculesActions } from "./vehicules.actions";'),
  },
  {
    label: "vehicules.module.ts référence actions: vehiculesActions",
    ok: read(modulePath).includes("actions: vehiculesActions"),
  },
  {
    label: "champ energie présent",
    ok: read(modulePath).includes('name: "energie"'),
  },
  {
    label: "champ dateFinGarantie présent",
    ok: read(modulePath).includes('name: "dateFinGarantie"'),
  },
  {
    label: "action véhicule retirée de ERPEnterpriseForm",
    ok:
      !read(formPath).includes('moduleKey === "vehicules" && currentStatus !== "archive"') &&
      !read(formPath).includes('label: "Archiver vehicule"'),
  },
  {
    label: "actions véhicule restent hors ERPEnterpriseForm",
    ok:
      !read(formPath).includes("vehicules.activer") &&
      !read(formPath).includes("Activer véhicule") &&
      !read(formPath).includes("Immobiliser véhicule"),
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-04B — Alignement runtime vehicules",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Corrections appliquées",
  "",
  "- Création / remplissage de vehicules.actions.ts.",
  "- Branchement de vehiculesActions dans vehicules.module.ts.",
  "- Ajout des champs energie et dateFinGarantie si absents.",
  "- Retrait de l'action Archiver vehicule hardcodée dans ERPEnterpriseForm.",
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
write(reportPath, report);

console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.error("[AMARKHYS-REBUILD-04B] FAIL");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-04B] DONE");
console.log("[NEXT] Rerun 04A audit, then pnpm build.");