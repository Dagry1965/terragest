export type RuntimeContextSource =
  | "form"
  | "dashboard"
  | "business-rule"
  | "public"
  | "system"
  | "unknown";

export interface RuntimeContext {
  tenantId: string;
  workspace: string;
  userId?: string;
  source?: RuntimeContextSource;
}

export interface RuntimeParentContext {
  parentModuleKey: string;
  parentRecordId: string;
  parentForeignKey?: string;
}

export interface RuntimeContextOptions {
  context?: Partial<RuntimeContext>;
  parent?: RuntimeParentContext;
  source?: RuntimeContextSource;
}

export interface RuntimeRecordContext {
  tenantId: string;
  workspace: string;
  moduleKey: string;
  contextPath: string;
  userId?: string;
  parentModuleKey?: string;
  parentRecordId?: string;
  parentForeignKey?: string;
}
