import type { ERPModule } from "@/runtime/modules";
import { ERPEnterpriseForm } from "./enterprise";

interface ERPFormRendererProps {
  module: ERPModule;
  mode?: "create" | "edit";
}

export function ERPFormRenderer({
  module,
  mode = "create",
}: ERPFormRendererProps) {
  return <ERPEnterpriseForm module={module} mode={mode} />;
}