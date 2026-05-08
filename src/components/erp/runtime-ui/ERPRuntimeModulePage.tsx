import {
  ERPPageHeader,
  ERPSection,
  ERPStatCard,
} from "@/components/erp/ui";

import { ERPFormRenderer } from "@/components/erp/forms";
import { ERPDataTableRuntime } from "./ERPDataTableRuntime";

import {
  resolveERPGeneratedSchema,
} from "@/runtime/ui-generation";

type ERPRuntimeModulePageProps = {
  moduleKey: string;
  mode?: "list" | "create" | "edit" | "details";
  rows?: Record<string, unknown>[];
};

export function ERPRuntimeModulePage({
  moduleKey,
  mode = "list",
  rows = [],
}: ERPRuntimeModulePageProps) {
  const schema =
    resolveERPGeneratedSchema(moduleKey);

  const isForm =
    mode === "create" || mode === "edit";

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="Runtime UI Generation"
        title={schema.moduleLabel}
        description={
          schema.description ??
          "Module genere par le runtime ERP."
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <ERPStatCard label="Schema" value="OK" helper={`${schema.fields.length} champs`} />
        <ERPStatCard label="Mode" value={mode} helper="Template runtime" />
        <ERPStatCard label="UI" value="Enterprise" helper="Design system central" />
        <ERPStatCard label="Runtime" value="Pret" helper="Generation active" />
      </div>

      <ERPSection>
        {isForm ? (
          <ERPFormRenderer schema={schema} />
        ) : (
          <ERPDataTableRuntime schema={schema} rows={rows} />
        )}
      </ERPSection>
    </div>
  );
}