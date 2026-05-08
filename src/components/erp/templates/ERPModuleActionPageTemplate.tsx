import {
  ERPPageHeader,
  ERPSection,
  ERPEmptyState,
  ERPStatCard,
} from "@/components/erp/ui";

import { ERPFormRenderer } from "@/components/erp/forms";
import {
  resolveERPGeneratedSchema,
} from "@/runtime/ui-generation";

type ERPModuleActionPageTemplateProps = {
  module?: unknown;
  type?: string;
  moduleLabel?: string;
  moduleName?: string;
  actionLabel?: string;
  title?: string;
  description?: string;
};

function getModuleValue(
  module: unknown,
  key: string
): string | undefined {
  if (!module || typeof module !== "object") {
    return undefined;
  }

  const value = (module as Record<string, unknown>)[key];

  if (typeof value === "string") {
    return value;
  }

  return undefined;
}

function formatActionType(type?: string) {
  switch (type) {
    case "list":
      return "Liste";
    case "details":
    case "detail":
      return "Details";
    case "create":
      return "Creation";
    case "edit":
      return "Edition";
    case "audit":
      return "Audit";
    case "import":
      return "Import";
    case "export":
      return "Export";
    case "relations":
      return "Relations";
    case "workflows":
      return "Workflows";
    default:
      return "Action ERP";
  }
}

function normalizeModuleKey(label: string) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function ERPModuleActionPageTemplate({
  module,
  type,
  moduleLabel,
  moduleName,
  actionLabel,
  title,
  description,
}: ERPModuleActionPageTemplateProps) {
  const resolvedModule =
    moduleLabel ??
    moduleName ??
    getModuleValue(module, "label") ??
    getModuleValue(module, "name") ??
    getModuleValue(module, "title") ??
    "Module ERP";

  const resolvedAction =
    actionLabel ??
    title ??
    formatActionType(type);

  const schema =
    resolveERPGeneratedSchema(
      getModuleValue(module, "key") ??
      getModuleValue(module, "slug") ??
      normalizeModuleKey(resolvedModule)
    );

  const showForm =
    type === "create" || type === "edit";

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow={resolvedModule}
        title={resolvedAction}
        description={
          description ??
          getModuleValue(module, "description") ??
          "Page raccordee au template ERP enterprise centralise."
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <ERPStatCard label="Module" value={resolvedModule} helper="Registry compatible" />
        <ERPStatCard label="Action" value={resolvedAction} helper="Template central" />
        <ERPStatCard label="Schema" value="OK" helper={`${schema.fields.length} champs`} />
        <ERPStatCard label="Runtime" value="Pret" helper="Generation UI active" />
      </div>

      <ERPSection>
        {showForm ? (
          <ERPFormRenderer schema={schema} />
        ) : (
          <ERPEmptyState
            title={`${resolvedAction} pret`}
            description="Cette page est stabilisee et prete pour le branchement des donnees runtime reelles."
          />
        )}
      </ERPSection>
    </div>
  );
}