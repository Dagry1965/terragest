"use client";

import { useState } from "react";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";
import { ERPButton } from "@/components/erp/ui";
import { ERPFormField } from "./ERPFormField";
import { ERPFormSection } from "./ERPFormSection";
import { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";

interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
}

export function ERPEnterpriseForm({
  module,
  mode = "create",
}: ERPEnterpriseFormProps) {
  const [saving, setSaving] = useState(false);
  const form = ERPModuleBuilder.buildForm(module);

  const mainFields = form.fields.filter(
    (field) => field.type !== "relation"
  );

  const relationFields = form.fields.filter(
    (field) => field.type === "relation"
  );

  async function handleSave() {
    setSaving(true);

    const payload: Record<string, unknown> = {};

    form.fields.forEach((field) => {
      payload[field.key] = field.defaultValue ?? "";
    });

    if (mode === "create") {
      await RuntimeDataBinding.create(module, payload);
    }

    setSaving(false);
  }

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
            Formulaire metier connecte au binding runtime.
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

          <div className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <ERPButton
              type="button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </ERPButton>

            <ERPButton variant="secondary" type="button">
              Enregistrer et continuer
            </ERPButton>

            <ERPButton variant="ghost" type="button">
              Annuler
            </ERPButton>
          </div>
        </div>

        <ERPFormSummaryPanel module={module} />
      </section>
    </div>
  );
}