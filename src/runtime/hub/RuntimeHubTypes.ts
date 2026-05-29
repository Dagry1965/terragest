export type ERPRecordHubDisplayMode =
  | "cards"
  | "table"
  | "timeline"
  | "compact-list";

export type ERPRecordHubLayoutMode =
  | "wide"
  | "split"
  | "stacked";

export type ERPRecordHubSectionLayout =
  | "collapsible-list"
  | "cards"
  | "table"
  | "timeline";

export type ERPRecordHubRecord = Record<string, unknown> & {
  id?: string;
};

export type ERPRecordHubActionKind =
  | "open-record"
  | "create-record"
  | "open-document"
  | "custom";

export type ERPRecordHubActionConfig = {
  key: string;
  label: string;
  kind: ERPRecordHubActionKind;
  moduleKey?: string;
  hrefTemplate?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
};

export type ERPRecordHubSearchConfig = {
  placeholder?: string;
  filterFields?: string[];
  searchFields?: string[];
};

export type ERPRecordHubHeaderConfig = {
  titleFields: string[];
  subtitleFields?: string[];
  badgeFields?: string[];
  avatarField?: string;
  actions?: ERPRecordHubActionConfig[];
};

export type ERPRecordHubKpiConfig = {
  key: string;
  label: string;
  source?: "count" | "sum" | "computed" | "static";
  moduleKey?: string;
  foreignKey?: string;
  field?: string;
  format?: "number" | "currency" | "date" | "text";
};

export type ERPRecordHubPrimaryCollectionConfig = {
  moduleKey: string;
  foreignKey: string;
  label?: string;
  defaultDisplayMode?: ERPRecordHubDisplayMode;
  displayModes?: Record<string, ERPRecordHubDisplayMode>;
  displayModeSourceField?: string;
  selectionQueryParam?: string;
  cardFields?: string[];
  tableFields?: string[];
  labelFields?: string[];
  subtitleFields?: string[];
  actions?: ERPRecordHubActionConfig[];
};

export type ERPRecordHubRelatedSectionConfig = {
  key: string;
  label: string;
  moduleKey: string;
  foreignKey: string;
  layout?: ERPRecordHubSectionLayout;
  fields?: string[];
  labelFields?: string[];
  subtitleFields?: string[];
  actions?: ERPRecordHubActionConfig[];
};

export type ERPRecordHubConfig = {
  enabled: boolean;
  key: string;
  label: string;
  rootModule: string;
  layout?: ERPRecordHubLayoutMode;
  search?: ERPRecordHubSearchConfig;
  header: ERPRecordHubHeaderConfig;
  kpis?: ERPRecordHubKpiConfig[];
  primaryCollection: ERPRecordHubPrimaryCollectionConfig;
  selectedRecordDetails?: ERPRecordHubRelatedSectionConfig[];
};

export type ERPRecordHubRuntimeContext = {
  tenantId?: string;
  workspaceId?: string;
  userId?: string;
  moduleKey?: string;
  recordId?: string;
};

export type ERPRecordHubResolvedLayout = {
  layout: ERPRecordHubLayoutMode;
  primaryDisplayMode: ERPRecordHubDisplayMode;
  selectedDetailsLayout: "side-panel" | "bottom-sections";
};

export type ERPRecordHubResolvedKpi = {
  key: string;
  label: string;
  value: string | number;
  format?: ERPRecordHubKpiConfig["format"];
};

export type ERPRecordHubRelationDescriptor = {
  key: string;
  label: string;
  moduleKey: string;
  foreignKey: string;
  layout: ERPRecordHubSectionLayout;
};

export type ERPRecordHubResolveInput = {
  config: ERPRecordHubConfig;
  rootRecord?: ERPRecordHubRecord | null;
  selectedPrimaryRecord?: ERPRecordHubRecord | null;
  context?: ERPRecordHubRuntimeContext;
};

export type ERPRecordHubResolveResult = {
  config: ERPRecordHubConfig;
  layout: ERPRecordHubResolvedLayout;
  kpis: ERPRecordHubResolvedKpi[];
  relations: ERPRecordHubRelationDescriptor[];
};
