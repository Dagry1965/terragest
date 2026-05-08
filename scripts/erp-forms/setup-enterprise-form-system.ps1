$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Host "=== ERP ENTERPRISE FORM SYSTEM ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\forms\enterprise" | Out-Null

WriteFile "src\components\erp\forms\enterprise\ERPFormField.tsx" @'
import { ERPInput, ERPSelect } from "@/components/erp/ui";
import type { ERPModuleField } from "@/runtime/modules";

interface ERPFormFieldProps {
  field: ERPModuleField;
}

export function ERPFormField({ field }: ERPFormFieldProps) {
  if (field.type === "select" || field.type === "status") {
    return (
      <ERPSelect
        label={field.label}
        required={field.required}
        options={
          field.options ?? [
            { label: "Actif", value: "actif" },
            { label: "En suivi", value: "en-suivi" },
            { label: "A controler", value: "a-controler" },
          ]
        }
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <ERPSelect
        label={field.label}
        required={field.required}
        options={[
          { label: "Oui", value: "true" },
          { label: "Non", value: "false" },
        ]}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="block space-y-2">
        <span className="text-sm font-bold text-slate-700">
          {field.label}
          {field.required ? " *" : ""}
        </span>

        <textarea
          className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          placeholder={field.label}
        />
      </label>
    );
  }

  return (
    <ERPInput
      label={field.label}
      required={field.required}
      type={
        field.type === "number"
          ? "number"
          : field.type === "date"
            ? "date"
            : field.type === "email"
              ? "email"
              : "text"
      }
      placeholder={field.label}
    />
  );
}
'@

WriteFile "src\components\erp\forms\enterprise\ERPFormSection.tsx" @'
import type { ReactNode } from "react";

interface ERPFormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ERPFormSection({
  title,
  description,
  children,
}: ERPFormSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-black text-slate-950">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\forms\enterprise\ERPFormActions.tsx" @'
import Link from "next/link";
import { ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPFormActionsProps {
  module: ERPModule;
}

export function ERPFormActions({ module }: ERPFormActionsProps) {
  const backHref = module.metadata.routes?.list ?? `/${module.metadata.key}`;

  return (
    <div className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <ERPButton type="button">
        Enregistrer
      </ERPButton>

      <ERPButton variant="secondary" type="button">
        Enregistrer et continuer
      </ERPButton>

      <Link href={backHref}>
        <ERPButton variant="ghost" type="button">
          Annuler
        </ERPButton>
      </Link>
    </div>
  );
}
'@

WriteFile "src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPFormSummaryPanelProps {
  module: ERPModule;
}

export function ERPFormSummaryPanel({
  module,
}: ERPFormSummaryPanelProps) {
  const requiredFields = module.schema.fields.filter((field) => field.required);

  return (
    <aside className="space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">
          Controle du formulaire
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Ce formulaire est genere depuis le schema central du module.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <ERPBadge tone="info">{module.schema.fields.length} champs</ERPBadge>
          <ERPBadge tone="warning">{requiredFields.length} obligatoires</ERPBadge>
          <ERPBadge tone="success">Schema valide</ERPBadge>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">
          Apres validation
        </h2>

        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <p>1. Enregistrement des donnees</p>
          <p>2. Verification des regles metier</p>
          <p>3. Mise a jour de l'audit</p>
          <p>4. Declenchement possible du workflow</p>
        </div>
      </section>
    </aside>
  );
}
'@

WriteFile "src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPFormField } from "./ERPFormField";
import { ERPFormSection } from "./ERPFormSection";
import { ERPFormActions } from "./ERPFormActions";
import { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";

interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
}

export function ERPEnterpriseForm({
  module,
  mode = "create",
}: ERPEnterpriseFormProps) {
  const form = ERPModuleBuilder.buildForm(module);

  const mainFields = form.fields.filter(
    (field) => field.type !== "relation"
  );

  const relationFields = form.fields.filter(
    (field) => field.type === "relation"
  );

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-8 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-200">
            {mode === "create" ? "Creation" : "Modification"}
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {module.metadata.label}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
            Formulaire metier centralise, pilote par le schema du module.
          </p>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <ERPFormSection
            title="Informations principales"
            description="Renseigne les champs principaux du module."
          >
            {mainFields.map((field) => (
              <ERPFormField key={field.key} field={field} />
            ))}
          </ERPFormSection>

          {relationFields.length > 0 && (
            <ERPFormSection
              title="Relations"
              description="Associe cet element aux autres objets metier."
            >
              {relationFields.map((field) => (
                <ERPFormField key={field.key} field={field} />
              ))}
            </ERPFormSection>
          )}

          <ERPFormActions module={module} />
        </div>

        <ERPFormSummaryPanel module={module} />
      </section>
    </div>
  );
}
'@

WriteFile "src\components\erp\forms\enterprise\index.ts" @'
export { ERPEnterpriseForm } from "./ERPEnterpriseForm";
export { ERPFormField } from "./ERPFormField";
export { ERPFormSection } from "./ERPFormSection";
export { ERPFormActions } from "./ERPFormActions";
export { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";
'@

WriteFile "src\components\erp\forms\ERPFormRenderer.tsx" @'
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
'@

WriteFile "src\components\erp\templates\ERPPageTemplateRegistry.tsx" @'
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
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== ERP ENTERPRISE FORM SYSTEM TERMINE ===" -ForegroundColor Green
