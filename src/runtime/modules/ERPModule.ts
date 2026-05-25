import type { ERPModuleMetadata } from "./metadata/ERPModuleMetadata";
import type { ERPModuleSchema } from "./schemas/ERPModuleSchema";

export interface ERPModuleAction {
  key: string;
  label: string;
  type?: "primary" | "secondary" | "danger" | "ghost";
  permission?: string;
  event?: string;
  href?: string;

  /**
   * Action métier runtime qui n'est pas forcément une transition workflow.
   * Exemple : retirer une ligne sans réintroduire un statut utilisateur "annulée".
   */
  runtimeOnly?: boolean;
}

export interface ERPModuleRelation {
  key: string;
  label: string;
  targetModule?: string;
  targetmodule?: string; // doublon conservé comme demandé
  type: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
}

export interface ERPWorkflowTransition {
  from: string;
  to: string;

  action: string;

  permissions?: string[];
}

export interface ERPWorkflowState {
  key: string;
  label: string;

  color?: string;

  terminal?: boolean;
}

export interface ERPModuleWorkflow {
  key: string;
  label: string;

  initialState?: string;

  stateField?: string;

  states?: Array<string | ERPWorkflowState>;

  transitions?: ERPWorkflowTransition[];
}

export interface ERPModuleVisibility {
  field: string;
  equals?: string | number | boolean;
  notEquals?: string | number | boolean;
  in?: Array<string | number | boolean>;
}

export interface ERPModulePersistence {
  firestore?: boolean;
  timestamps?: boolean;
  softDelete?: boolean;
}

export interface ERPModulePermissions {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  import?: boolean;
  export?: boolean;
}

export interface ERPModuleScheduling {
  /**
   * Q22D3A_GENERIC_SCHEDULING_METADATA
   * Generic ERP scheduling declaration.
   * Modules describe how their date/time/duration fields map to the Scheduling Runtime.
   */
  enabled: boolean;
  dateField: string;
  timeField: string;
  durationField?: string;
  startField?: string;
  endField?: string;
  statusField?: string;
  resourceField?: string;
  blockingStatuses?: string[];
  bufferMinutes?: number;

  /**
   * Q22F3A_SCHEDULING_CAPACITY_METADATA
   * Nombre maximal de bookings acceptés sur un même créneau.
   */
  capacity?: number;

  /**
   * Q22F2A_CALENDAR_EXCEPTIONS_METADATA
   * Dates ponctuelles qui sortent ou modifient la planification standard.
   */
  calendarExceptions?: Array<{
    date: string;
    isClosed?: boolean;
    periods?: Array<{
      start: string;
      end: string;
      capacity?: number;
    }>;
    reason?: string;
  }>;
}

export interface ERPModuleFormSection {
  key: string;
  title: string;
  description?: string;
  fields: string[];

  grid?: {
    cols?: number;
  };

 visibility?: {
    field: string;
    equals?: string | number | boolean;
    notEquals?: string | number | boolean;
  };

}
export interface ERPModuleFormTab {
  key: string;
  label: string;
  fields: string[];
sections?: ERPModuleFormSection[];
}

export interface ERPModuleFormConfig {
  layout?: "sections" | "tabs" | "stepper";
  tabs?: ERPModuleFormTab[];
}


export type ERPCompositionDisplayMode =
  | "inline"
  | "card"
  | "badge";

export type ERPCompositionRenderMode =
  | "detail"
  | "edit";

export type ERPCompositionPosition =
  | "before"
  | "after";

export interface ERPCompositionBreadcrumb {
  field: string;
  moduleKey: string;
  labelFields: string[];
  hrefPattern?: string;
}

export interface ERPCompositionRelation {
  field: string;
  moduleKey: string;
  labelFields: string[];
  snapshotFields?: string[];
  displayAs?: ERPCompositionDisplayMode;
  lockDerivedFields?: boolean;
  allowOverride?: boolean;
}

export interface ERPCompositionChild {
  key: string;
  moduleKey: string;
  foreignKey: string;
  prefillFromParent?: Record<string, string>;
  lockFields?: string[];
  title: string;
  createLabel?: string;
  displayIn?: ERPCompositionRenderMode[];
  position?: ERPCompositionPosition;
  lazy?: boolean;
  totalField?: string;
  mode?: "default" | "readonly";
  allowCreate?: boolean;
  badgeLabel?: string;
  description?: string;
  openLabel?: string;
  labelFields?: string[];
  subtitleFields?: string[];
  relations?: ERPCompositionRelation[];
}

export interface ERPCompositionRequiredParent {
  moduleKey: string;
  foreignKey: string;
}


export interface ERPCompositionContextBannerItem {
  relationField?: string;
  field?: string;
  moduleKey: string;
  labelFields?: string[];
  title?: string;
  icon?: string;
  tone?: string;
}

export interface ERPCompositionContextBanner {
  title?: string;
  items: ERPCompositionContextBannerItem[];
}

export interface ERPModuleComposition {
    contextBanner?: ERPCompositionContextBanner;
    labelFields?: string[];
  breadcrumbs?: ERPCompositionBreadcrumb[];
  relations?: ERPCompositionRelation[];
  lockedFields?: string[];
  readOnlyFields?: string[];

  /**
   * Q21D3A2_COMPUTED_FIELDS_METADATA
   * Declarative computed fields executed by RuntimeComputedFieldsEngine.
   * Modules declare formulas; forms and pages must not hardcode calculations.
   */
  computedFields?: Array<{
    target: string;
    formula: "multiply" | "taxIncluded" | "taxAmount" | "add" | "subtract";
    sources: string[];
    round?: number;
    defaultValue?: number;
  }>;
  allowOverride?: string[];
  children?: ERPCompositionChild[];

  /**
   * Q15F-B_REQUIRED_PARENT_CONTEXT
   * Quand true, le module ne peut être créé/modifié que depuis un parent valide.
   */
  requiresParentContext?: boolean;

  /**
   * Parents autorisés pour ce module enfant.
   * Exemple : lignesinterventionauto -> interventionsauto via interventionId.
   */
  allowedParents?: ERPCompositionRequiredParent[];
}

export interface ERPModule {
  metadata: ERPModuleMetadata;
  schema: ERPModuleSchema;

  permissions?: ERPModulePermissions;

  persistence?: ERPModulePersistence;

  visibility?: ERPModuleVisibility;

  form?: ERPModuleFormConfig;

  scheduling?: ERPModuleScheduling;

  actions?: ERPModuleAction[];

  relations?: ERPModuleRelation[];

  
  composition?: ERPModuleComposition;
workflows?: ERPModuleWorkflow[];
}
