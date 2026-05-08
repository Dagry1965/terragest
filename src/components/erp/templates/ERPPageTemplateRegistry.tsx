import type { ERPModule } from "@/runtime/modules";
import { ERPEmptyState } from "@/components/erp/ui";
import { ERPFormRenderer } from "@/components/erp/forms/ERPFormRenderer";
import { ERPRuntimeDetails } from "@/components/erp/runtime/ERPRuntimeDetails";
import { ERPModuleListTemplate } from "./ERPModuleListTemplate";
import { ERPModuleDashboardTemplate } from "./ERPModuleDashboardTemplate";

export type ERPPageTemplateType =
  | "list"
  | "dashboard"
  | "create"
  | "edit"
  | "details";

interface RenderOptions {
  module?: ERPModule;
  type?: ERPPageTemplateType;
  data?: Record<string, unknown>[];
  record?: Record<string, unknown>;
}

export const ERPPageTemplateRegistry = {
  render({
    module,
    type = "list",
    data = [],
    record,
  }: RenderOptions) {
    if (!module) {
      return (
        <ERPEmptyState
          title="Module introuvable"
          description="La definition du module est absente."
        />
      );
    }

    if (type === "dashboard") {
      return <ERPModuleDashboardTemplate module={module} />;
    }

    if (type === "create") {
      return <ERPFormRenderer module={module} mode="create" />;
    }

    if (type === "edit") {
      return <ERPFormRenderer module={module} mode="edit" />;
    }

    if (type === "details") {
      return <ERPRuntimeDetails module={module} data={record} />;
    }

    return <ERPModuleListTemplate module={module} data={data} />;
  },
};