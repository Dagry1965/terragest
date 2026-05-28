const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const erpModuleRel = "src/runtime/modules/ERPModule.ts";
const rdvModuleRel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";

const erpModuleFile = path.join(ROOT, erpModuleRel);
const rdvModuleFile = path.join(ROOT, rdvModuleRel);

for (const file of [erpModuleFile, rdvModuleFile]) {
  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + file);
  }
}

function backup(file, suffix) {
  const backupFile = file + suffix;
  fs.writeFileSync(backupFile, fs.readFileSync(file, "utf8"), "utf8");
  console.log("[BACKUP]", path.relative(ROOT, backupFile));
}

/**
 * 1. Ajouter les types operational dans ERPModule.ts
 */
{
  backup(erpModuleFile, ".bak-q2a-b-operational-metadata-types");

  let content = fs.readFileSync(erpModuleFile, "utf8");

  if (!content.includes("export interface ERPOperationalModuleConfig")) {
    const insertAfter = "export interface ERPBusinessCodeConfig";

    const index = content.indexOf(insertAfter);

    if (index < 0) {
      throw new Error("Point insertion introuvable: ERPBusinessCodeConfig");
    }

    const before = content.slice(0, index);
    const after = content.slice(index);

    const operationalTypes = `
export type ERPOperationalKpiTone =
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "gray"
  | "purple";

export interface ERPOperationalKpiConfig {
  key: string;
  label: string;
  field?: string;
  count?: boolean;
  equals?: unknown;
  tone?: ERPOperationalKpiTone;
  icon?: string;
  description?: string;
}

export interface ERPOperationalFilterConfig {
  key: string;
  label: string;
  field: string;
  type?: "text" | "select" | "date" | "dateRange" | "relation";
  options?: Array<{
    label: string;
    value: string;
  }>;
  placeholder?: string;
}

export interface ERPOperationalTableConfig {
  title?: string;
  description?: string;
  fields?: string[];
  enableSearch?: boolean;
  enableSelection?: boolean;
  enableDensityToggle?: boolean;
}

export interface ERPOperationalRightPanelConfig {
  enabled?: boolean;
  title?: string;
  type?: "planning" | "summary" | "actions";
}

export interface ERPOperationalModuleConfig {
  enabled?: boolean;
  title?: string;
  subtitle?: string;
  kpis?: ERPOperationalKpiConfig[];
  filters?: ERPOperationalFilterConfig[];
  table?: ERPOperationalTableConfig;
  rightPanel?: ERPOperationalRightPanelConfig;
}

`;

    content = before + operationalTypes + after;
  }

  if (!content.includes("operational?: ERPOperationalModuleConfig;")) {
    content = content.replace(
      /metadata: ERPModuleMetadata;/,
      `metadata: ERPModuleMetadata;

    operational?: ERPOperationalModuleConfig;`
    );
  }

  if (!content.includes("operational?: ERPOperationalModuleConfig;")) {
    throw new Error("Champ operational non ajouté à ERPModule.");
  }

  fs.writeFileSync(erpModuleFile, content, "utf8");
  console.log("[WRITTEN]", erpModuleRel);
}

/**
 * 2. Ajouter operational dans rendezvous.module.ts
 */
{
  backup(rdvModuleFile, ".bak-q2a-b-rendezvous-operational-config");

  let content = fs.readFileSync(rdvModuleFile, "utf8");

  if (!content.includes("operational:")) {
    const marker = `
  scheduling: {`;

    const index = content.indexOf(marker);

    if (index < 0) {
      throw new Error("Point insertion introuvable: scheduling");
    }

    const operationalBlock = `
  operational: {
    enabled: true,
    title: "Rendez-vous",
    subtitle: "Vue opérationnelle des rendez-vous atelier.",
    kpis: [
      {
        key: "total",
        label: "Total",
        count: true,
        tone: "blue",
        icon: "calendar",
        description: "Nombre total de rendez-vous affichés.",
      },
      {
        key: "confirmes",
        label: "Confirmés",
        field: "statut",
        equals: "confirme",
        tone: "green",
        icon: "check",
      },
      {
        key: "en_cours",
        label: "En cours",
        field: "statut",
        equals: "en_cours",
        tone: "orange",
        icon: "clock",
      },
      {
        key: "annules",
        label: "Annulés",
        field: "statut",
        equals: "annule",
        tone: "gray",
        icon: "x",
      },
    ],
    filters: [
      {
        key: "statut",
        label: "Statut",
        field: "statut",
        type: "select",
        options: [
          { label: "Planifié", value: "planifie" },
          { label: "Confirmé", value: "confirme" },
          { label: "En cours", value: "en_cours" },
          { label: "Terminé", value: "termine" },
          { label: "Annulé", value: "annule" },
        ],
      },
      {
        key: "typeService",
        label: "Type de service",
        field: "typeService",
        type: "select",
        options: [
          { label: "Vidange", value: "vidange" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "Réparation", value: "reparation" },
          { label: "Contrôle", value: "controle" },
          { label: "Autre", value: "autre" },
        ],
      },
      {
        key: "vehiculeId",
        label: "Véhicule",
        field: "vehiculeId",
        type: "relation",
      },
    ],
    table: {
      title: "Liste des rendez-vous",
      description: "Rendez-vous issus du runtime ERP.",
      fields: [
        "codeRendezVous",
        "clientId",
        "vehiculeId",
        "dateRendezVous",
        "heureRendezVous",
        "typeService",
        "statut",
        "consumedByInterventionId",
      ],
      enableSearch: true,
      enableSelection: true,
      enableDensityToggle: true,
    },
    rightPanel: {
      enabled: true,
      title: "Planning du jour",
      type: "planning",
    },
  },
`;

    content = content.slice(0, index) + operationalBlock + content.slice(index);
  }

  if (!content.includes("operational:")) {
    throw new Error("Config operational non ajoutée au module rendezvous.");
  }

  fs.writeFileSync(rdvModuleFile, content, "utf8");
  console.log("[WRITTEN]", rdvModuleRel);
}

console.log("");
console.log("[DONE] Q2-A-B metadata operational ajoutée.");
console.log("");
console.log("Next:");
console.log("pnpm build");
