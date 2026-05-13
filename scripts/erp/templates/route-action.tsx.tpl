import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function {{PascalName}}{{ActionPascal}}Page() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="{{ModuleKey}}"
      action="{{ActionKey}}"
    />
  );
}