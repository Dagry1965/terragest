Write-Host "=== TERRAGEST_V2 - SETUP ERP SCHEMAS ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/schemas" | Out-Null

@'
export type ERPFieldType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "status"
  | "currency";

export type ERPField = {
  key: string;
  label: string;
  type: ERPFieldType;
  required?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  list?: boolean;
};

export type ERPStatus = {
  value: string;
  label: string;
  color:
    | "gray"
    | "blue"
    | "green"
    | "yellow"
    | "red";
};

export type ERPModuleSchema = {
  module: string;

  title: string;

  description?: string;

  fields: ERPField[];

  statuses?: ERPStatus[];

  features?: {
    audit?: boolean;
    workflow?: boolean;
    supervision?: boolean;
  };
};
'@ | Set-Content -Encoding UTF8 "src/core/schemas/types.ts"

@'
import { ERPModuleSchema } from "./types";

export const exploitationsSchema: ERPModuleSchema = {
  module: "exploitations",

  title: "Exploitations",

  description:
    "Gestion des exploitations agricoles et patrimoniales.",

  fields: [
    {
      key: "nom",
      label: "Nom",
      type: "text",
      required: true,
      searchable: true,
      sortable: true,
      list: true,
    },

    {
      key: "type",
      label: "Type",
      type: "text",
      searchable: true,
      list: true,
    },

    {
      key: "responsable",
      label: "Responsable",
      type: "text",
      searchable: true,
      list: true,
    },

    {
      key: "surface",
      label: "Surface",
      type: "number",
      sortable: true,
      list: true,
    },

    {
      key: "status",
      label: "Statut",
      type: "status",
      sortable: true,
      list: true,
    },
  ],

  statuses: [
    {
      value: "active",
      label: "Active",
      color: "green",
    },

    {
      value: "inactive",
      label: "Inactive",
      color: "gray",
    },

    {
      value: "warning",
      label: "Surveillance",
      color: "yellow",
    },
  ],

  features: {
    audit: true,
    workflow: true,
    supervision: true,
  },
};
'@ | Set-Content -Encoding UTF8 "src/core/schemas/exploitations.schema.ts"

@'
import { ERPModuleSchema } from "./types";

export const terrainsSchema: ERPModuleSchema = {
  module: "terrains",

  title: "Terrains",

  description:
    "Gestion des terrains et parcelles.",

  fields: [
    {
      key: "nom",
      label: "Nom",
      type: "text",
      required: true,
      searchable: true,
      sortable: true,
      list: true,
    },

    {
      key: "localisation",
      label: "Localisation",
      type: "text",
      searchable: true,
      list: true,
    },

    {
      key: "surface",
      label: "Surface",
      type: "number",
      sortable: true,
      list: true,
    },

    {
      key: "status",
      label: "Statut",
      type: "status",
      sortable: true,
      list: true,
    },
  ],

  statuses: [
    {
      value: "disponible",
      label: "Disponible",
      color: "green",
    },

    {
      value: "occupe",
      label: "Occupé",
      color: "blue",
    },

    {
      value: "maintenance",
      label: "Maintenance",
      color: "yellow",
    },
  ],

  features: {
    audit: true,
    workflow: true,
  },
};
'@ | Set-Content -Encoding UTF8 "src/core/schemas/terrains.schema.ts"

@'
import { ERPModuleSchema } from "./types";

export const materielsSchema: ERPModuleSchema = {
  module: "materiels",

  title: "Matériels",

  description:
    "Gestion des matériels, états et maintenance.",

  fields: [
    {
      key: "nom",
      label: "Nom",
      type: "text",
      required: true,
      searchable: true,
      sortable: true,
      list: true,
    },

    {
      key: "categorie",
      label: "Catégorie",
      type: "text",
      searchable: true,
      list: true,
    },

    {
      key: "etat",
      label: "État",
      type: "status",
      sortable: true,
      list: true,
    },

    {
      key: "cout",
      label: "Coût",
      type: "currency",
      sortable: true,
      list: true,
    },
  ],

  statuses: [
    {
      value: "operationnel",
      label: "Opérationnel",
      color: "green",
    },

    {
      value: "maintenance",
      label: "Maintenance",
      color: "yellow",
    },

    {
      value: "panne",
      label: "En panne",
      color: "red",
    },
  ],

  features: {
    audit: true,
    workflow: true,
    supervision: true,
  },
};
'@ | Set-Content -Encoding UTF8 "src/core/schemas/materiels.schema.ts"

@'
import { exploitationsSchema } from "./exploitations.schema";
import { terrainsSchema } from "./terrains.schema";
import { materielsSchema } from "./materiels.schema";

export const schemaRegistry = {
  exploitations: exploitationsSchema,
  terrains: terrainsSchema,
  materiels: materielsSchema,
};

export function getSchema(moduleKey: string) {
  return schemaRegistry[
    moduleKey as keyof typeof schemaRegistry
  ];
}
'@ | Set-Content -Encoding UTF8 "src/core/schemas/schema-registry.ts"

Write-Host "=== ERP SCHEMAS créés avec succès ===" -ForegroundColor Green