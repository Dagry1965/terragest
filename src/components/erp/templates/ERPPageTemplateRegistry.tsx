import type { ReactNode } from "react";
import type { ERPModule } from "@/runtime/modules";

import { ERPModuleActionPageTemplate } from "./ERPModuleActionPageTemplate";

export type ERPPageTemplateType =
  | "list"
  | "detail"
  | "details"
  | "create"
  | "edit"
  | "audit"
  | "import"
  | "export"
  | "relations"
  | "workflows";

export type ERPTemplateProps = {
  module?: ERPModule;
  type?: ERPPageTemplateType | string;
  data?: unknown;
  record?: unknown;
};

function GenericERPTemplate({
  module,
  type,
}: ERPTemplateProps): ReactNode {
  return (
    <ERPModuleActionPageTemplate
      module={module}
      type={type}
    />
  );
}

export const ERPPageTemplateRegistry: Record<
  string,
  (props: ERPTemplateProps) => ReactNode
> = {
  list: GenericERPTemplate,
  detail: GenericERPTemplate,
  details: GenericERPTemplate,
  create: GenericERPTemplate,
  edit: GenericERPTemplate,
  audit: GenericERPTemplate,
  import: GenericERPTemplate,
  export: GenericERPTemplate,
  relations: GenericERPTemplate,
  workflows: GenericERPTemplate,
};