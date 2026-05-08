$ErrorActionPreference = "Stop"

Write-Host "=== TERRAGEST ERP - BLOC 4 RUNTIME MODULE SYSTEM ===" -ForegroundColor Cyan

function Write-ERPFile {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path
  New-Item -ItemType Directory -Force $dir | Out-Null
  Set-Content -Path $Path -Value $Content -Encoding UTF8
  Write-Host "OK $Path" -ForegroundColor Green
}

New-Item -ItemType Directory -Force "src\runtime\modules\metadata" | Out-Null
New-Item -ItemType Directory -Force "src\runtime\modules\schemas" | Out-Null
New-Item -ItemType Directory -Force "src\runtime\modules\builders" | Out-Null
New-Item -ItemType Directory -Force "src\runtime\modules\renderers" | Out-Null
New-Item -ItemType Directory -Force "src\runtime\modules\factories" | Out-Null
New-Item -ItemType Directory -Force "src\runtime\modules\definitions" | Out-Null
New-Item -ItemType Directory -Force "src\runtime\modules\registry" | Out-Null

Write-ERPFile "src\runtime\modules\metadata\ERPModuleMetadata.ts" @'
export interface ERPModuleMetadata {
  key: string;
  label: string;
  description?: string;
  icon?: string;
  color?: string;
  category?: string;
  version?: string;
  enabled?: boolean;
  visible?: boolean;
  order?: number;
  tags?: string[];
  permissions?: string[];
  dependencies?: string[];

  routes?: {
    list?: string;
    details?: string;
    create?: string;
    edit?: string;
  };

  features?: {
    dashboard?: boolean;
    analytics?: boolean;
    workflows?: boolean;
    automation?: boolean;
    notifications?: boolean;
    observability?: boolean;
    audit?: boolean;
    realtime?: boolean;
  };
}
'@

Write-ERPFile "src\runtime\modules\schemas\ERPModuleSchema.ts" @'
export type ERPModuleFieldType =
  | "text"
  | "number"
  | "date"
  | "datetime"
  | "boolean"
  | "select"
  | "relation"
  | "status"
  | "currency"
  | "textarea"
  | "email"
  | "phone";

export interface ERPModuleFieldOption {
  label: string;
  value: string;
}

export interface ERPModuleField {
  key: string;
  label: string;
  type: ERPModuleFieldType | string;
  required?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  visibleInList?: boolean;
  visibleInForm?: boolean;
  visibleInDetails?: boolean;
  relation?: string;
  options?: ERPModuleFieldOption[];
  defaultValue?: unknown;
}

export interface ERPModuleSchema {
  module: string;
  collection: string;
  fields: ERPModuleField[];
  timestamps?: boolean;
  softDelete?: boolean;
}
'@

Write-ERPFile "src\runtime\modules\ERPModule.ts" @'
import type { ERPModuleMetadata } from "./metadata/ERPModuleMetadata";
import type { ERPModuleSchema } from "./schemas/ERPModuleSchema";

export interface ERPModuleAction {
  key: string;
  label: string;
  type?: "primary" | "secondary" | "danger" | "ghost";
  permission?: string;
  event?: string;
  href?: string;
}

export interface ERPModuleRelation {
  key: string;
  label: string;
  targetModule: string;
  type: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
}

export interface ERPModuleWorkflow {
  key: string;
  label: string;
  initialState?: string;
  states?: string[];
}

export interface ERPModule {
  metadata: ERPModuleMetadata;
  schema: ERPModuleSchema;
  actions?: ERPModuleAction[];
  relations?: ERPModuleRelation[];
  workflows?: ERPModuleWorkflow[];
}
'@

Write-ERPFile "src\runtime\modules\ERPModuleRegistry.ts" @'
import type { ERPModule } from "./ERPModule";

class ERPModuleRegistryClass {
  private modules = new Map<string, ERPModule>();

  register(module: ERPModule) {
    this.modules.set(module.metadata.key, module);
    return module;
  }

  registerMany(modules: ERPModule[]) {
    modules.forEach((module) => this.register(module));
    return modules;
  }

  get(key: string) {
    return this.modules.get(key);
  }

  has(key: string) {
    return this.modules.has(key);
  }

  all() {
    return Array.from(this.modules.values()).sort(
      (a, b) => (a.metadata.order ?? 999) - (b.metadata.order ?? 999)
    );
  }

  visible() {
    return this.all().filter((module) => module.metadata.visible !== false);
  }

  enabled() {
    return this.all().filter((module) => module.metadata.enabled !== false);
  }

  clear() {
    this.modules.clear();
  }
}

export const ERPModuleRegistry = new ERPModuleRegistryClass();
'@

Write-ERPFile "src\runtime\modules\builders\ERPModuleBuilder.ts" @'
import type { ERPModule } from "../ERPModule";
import type { ERPModuleField } from "../schemas/ERPModuleSchema";

export interface ERPTableDefinition {
  module: string;
  collection: string;
  columns: {
    key: string;
    label: string;
    sortable?: boolean;
    searchable?: boolean;
    filterable?: boolean;
  }[];
}

export interface ERPFormDefinition {
  module: string;
  collection: string;
  fields: ERPModuleField[];
}

export interface ERPDetailsDefinition {
  module: string;
  collection: string;
  fields: ERPModuleField[];
}

export interface ERPModuleRuntimeDefinition {
  module: ERPModule;
  table: ERPTableDefinition;
  form: ERPFormDefinition;
  details: ERPDetailsDefinition;
}

export class ERPModuleBuilder {
  static buildTable(module: ERPModule): ERPTableDefinition {
    return {
      module: module.metadata.key,
      collection: module.schema.collection,
      columns: module.schema.fields
        .filter((field) => field.visibleInList !== false)
        .map((field) => ({
          key: field.key,
          label: field.label,
          sortable: field.sortable,
          searchable: field.searchable,
          filterable: field.filterable,
        })),
    };
  }

  static buildForm(module: ERPModule): ERPFormDefinition {
    return {
      module: module.metadata.key,
      collection: module.schema.collection,
      fields: module.schema.fields.filter(
        (field) => field.visibleInForm !== false
      ),
    };
  }

  static buildDetails(module: ERPModule): ERPDetailsDefinition {
    return {
      module: module.metadata.key,
      collection: module.schema.collection,
      fields: module.schema.fields.filter(
        (field) => field.visibleInDetails !== false
      ),
    };
  }

  static buildRuntime(module: ERPModule): ERPModuleRuntimeDefinition {
    return {
      module,
      table: this.buildTable(module),
      form: this.buildForm(module),
      details: this.buildDetails(module),
    };
  }
}
'@

Write-ERPFile "src\runtime\modules\factories\RuntimeTableFactory.ts" @'
import type { ERPModule } from "../ERPModule";
import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";

export class RuntimeTableFactory {
  static create(module: ERPModule) {
    return ERPModuleBuilder.buildTable(module);
  }
}
'@

Write-ERPFile "src\runtime\modules\factories\RuntimeFormFactory.ts" @'
import type { ERPModule } from "../ERPModule";
import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";

export class RuntimeFormFactory {
  static create(module: ERPModule) {
    return ERPModuleBuilder.buildForm(module);
  }
}
'@

Write-ERPFile "src\runtime\modules\factories\RuntimePageFactory.ts" @'
import type { ERPModule } from "../ERPModule";
import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";

export type RuntimePageType = "list" | "create" | "edit" | "details";

export class RuntimePageFactory {
  static create(module: ERPModule, pageType: RuntimePageType) {
    const runtime = ERPModuleBuilder.buildRuntime(module);

    return {
      type: pageType,
      module: module.metadata,
      schema: module.schema,
      runtime,
      route:
        pageType === "list"
          ? module.metadata.routes?.list
          : pageType === "create"
            ? module.metadata.routes?.create
            : pageType === "edit"
              ? module.metadata.routes?.edit
              : module.metadata.routes?.details,
    };
  }
}
'@

Write-ERPFile "src\runtime\modules\renderers\ERPModuleRenderer.ts" @'
import type { ERPModule } from "../ERPModule";
import { RuntimePageFactory, type RuntimePageType } from "../factories/RuntimePageFactory";

export class ERPModuleRenderer {
  static renderPage(module: ERPModule, pageType: RuntimePageType) {
    return RuntimePageFactory.create(module, pageType);
  }

  static renderList(module: ERPModule) {
    return this.renderPage(module, "list");
  }

  static renderCreate(module: ERPModule) {
    return this.renderPage(module, "create");
  }

  static renderEdit(module: ERPModule) {
    return this.renderPage(module, "edit");
  }

  static renderDetails(module: ERPModule) {
    return this.renderPage(module, "details");
  }
}
'@

Write-ERPFile "src\runtime\modules\definitions\coreModules.ts" @'
import type { ERPModule } from "../ERPModule";

export const coreERPModules: ERPModule[] = [
  {
    metadata: {
      key: "exploitations",
      label: "Exploitations",
      description: "Gestion des exploitations agricoles et opérationnelles.",
      icon: "building-2",
      category: "Métier",
      enabled: true,
      visible: true,
      order: 10,
      routes: {
        list: "/exploitations",
        create: "/exploitations/nouveau",
        details: "/exploitations/details",
        edit: "/exploitations/edit",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "exploitations",
      collection: "exploitations",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Exploitation", type: "text", required: true, searchable: true, sortable: true },
        { key: "responsable", label: "Responsable", type: "text", searchable: true },
        { key: "type", label: "Type", type: "select", filterable: true },
        { key: "statut", label: "État", type: "status", filterable: true },
      ],
    },
  },
  {
    metadata: {
      key: "materiels",
      label: "Matériels",
      description: "Gestion du parc matériel, états, pannes et maintenance.",
      icon: "tractor",
      category: "Opérations",
      enabled: true,
      visible: true,
      order: 20,
      routes: {
        list: "/materiels",
        create: "/materiels/nouveau",
        details: "/materiels/details",
        edit: "/materiels/edit",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        observability: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "materiels",
      collection: "materiels",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Matériel", type: "text", required: true, searchable: true, sortable: true },
        { key: "type", label: "Type", type: "select", filterable: true },
        { key: "etat", label: "État", type: "status", filterable: true },
        { key: "exploitationId", label: "Exploitation", type: "relation", relation: "exploitations" },
      ],
    },
  },
  {
    metadata: {
      key: "terrains",
      label: "Terrains",
      description: "Gestion des terrains, surfaces et affectations.",
      icon: "map",
      category: "Métier",
      enabled: true,
      visible: true,
      order: 30,
      routes: {
        list: "/terrains",
        create: "/terrains/nouveau",
        details: "/terrains/details",
        edit: "/terrains/edit",
      },
      features: {
        dashboard: true,
        analytics: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "terrains",
      collection: "terrains",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Terrain", type: "text", required: true, searchable: true, sortable: true },
        { key: "surface", label: "Surface", type: "number", sortable: true },
        { key: "localisation", label: "Localisation", type: "text", searchable: true },
        { key: "exploitationId", label: "Exploitation", type: "relation", relation: "exploitations" },
      ],
    },
  },
  {
    metadata: {
      key: "stocks",
      label: "Stocks",
      description: "Suivi des stocks, mouvements et niveaux d’alerte.",
      icon: "boxes",
      category: "Logistique",
      enabled: true,
      visible: true,
      order: 40,
      routes: {
        list: "/stocks",
        create: "/stocks/nouveau",
        details: "/stocks/details",
        edit: "/stocks/edit",
      },
      features: {
        dashboard: true,
        analytics: true,
        automation: true,
        notifications: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "stocks",
      collection: "stocks",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "produit", label: "Produit", type: "text", required: true, searchable: true },
        { key: "quantite", label: "Quantité", type: "number", sortable: true },
        { key: "seuil", label: "Seuil d’alerte", type: "number" },
        { key: "statut", label: "État", type: "status", filterable: true },
      ],
    },
  },
  {
    metadata: {
      key: "produits",
      label: "Produits",
      description: "Catalogue des produits agricoles, animaux, intrants et marchandises.",
      icon: "package",
      category: "Référentiel",
      enabled: true,
      visible: true,
      order: 50,
      routes: {
        list: "/produits",
        create: "/produits/nouveau",
        details: "/produits/details",
        edit: "/produits/edit",
      },
      features: {
        dashboard: true,
        analytics: true,
        audit: true,
      },
    },
    schema: {
      module: "produits",
      collection: "produits",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Produit", type: "text", required: true, searchable: true, sortable: true },
        { key: "categorie", label: "Catégorie", type: "select", filterable: true },
        { key: "unite", label: "Unité", type: "text" },
        { key: "statut", label: "État", type: "status", filterable: true },
      ],
    },
  },
];
'@

Write-ERPFile "src\runtime\modules\registry\registerCoreModules.ts" @'
import { ERPModuleRegistry } from "../ERPModuleRegistry";
import { coreERPModules } from "../definitions/coreModules";

export function registerCoreModules() {
  ERPModuleRegistry.registerMany(coreERPModules);
  return ERPModuleRegistry.all();
}
'@

Write-ERPFile "src\runtime\modules\index.ts" @'
export type {
  ERPModule,
  ERPModuleAction,
  ERPModuleRelation,
  ERPModuleWorkflow,
} from "./ERPModule";

export { ERPModuleRegistry } from "./ERPModuleRegistry";

export type { ERPModuleMetadata } from "./metadata/ERPModuleMetadata";

export type {
  ERPModuleSchema,
  ERPModuleField,
  ERPModuleFieldOption,
  ERPModuleFieldType,
} from "./schemas/ERPModuleSchema";

export {
  ERPModuleBuilder,
  type ERPTableDefinition,
  type ERPFormDefinition,
  type ERPDetailsDefinition,
  type ERPModuleRuntimeDefinition,
} from "./builders/ERPModuleBuilder";

export { ERPModuleRenderer } from "./renderers/ERPModuleRenderer";
export { RuntimePageFactory, type RuntimePageType } from "./factories/RuntimePageFactory";
export { RuntimeFormFactory } from "./factories/RuntimeFormFactory";
export { RuntimeTableFactory } from "./factories/RuntimeTableFactory";

export { coreERPModules } from "./definitions/coreModules";
export { registerCoreModules } from "./registry/registerCoreModules";
'@

Write-Host ""
Write-Host "=== BUILD TERRAGEST ===" -ForegroundColor Cyan

pnpm build

Write-Host ""
Write-Host "=== BLOC 4 RUNTIME MODULE SYSTEM FINALISÉ ===" -ForegroundColor Green