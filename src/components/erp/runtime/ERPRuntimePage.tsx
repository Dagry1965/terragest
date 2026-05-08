import { ERPPageTemplateRegistry } from "@/components/erp/templates";
import type { ERPModule } from "@/runtime/modules";
import type { ERPPageTemplateType } from "@/components/erp/templates";

interface ERPRuntimePageProps {
  module?: ERPModule;
  type?: ERPPageTemplateType;
  data?: Record<string, unknown>[];
  record?: Record<string, unknown>;
}

export function ERPRuntimePage({
  module,
  type = "list",
  data = [],
  record,
}: ERPRuntimePageProps) {
  return ERPPageTemplateRegistry.render({
    module,
    type,
    data,
    record,
  });
}