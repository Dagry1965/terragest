"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";

import { ERPButton } from "@/components/erp/ui";

import { ERPFormField } from "./ERPFormField";
import { ERPFormSection } from "./ERPFormSection";
import { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";
import { ERPFormTabs } from "./ERPFormTabs";
import {
  RuntimeValidationEngine,
} from "@/runtime/validation/RuntimeValidationEngine";

import type {
  RuntimeValidationError,
} from "@/runtime/validation/RuntimeValidationTypes";

interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
}

export function ERPEnterpriseForm({
  module,
  mode = "create",
  initialData = {},
}: ERPEnterpriseFormProps) {
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<RuntimeValidationError[]>([]);

  const router = useRouter();

  const form = ERPModuleBuilder.buildForm(module);

  const mainFields = form.fields.filter(
    (field) => field.type !== "relation"
  );

  const relationFields = form.fields.filter(
    (field) => field.type === "relation"
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    //  CORRECTION : on récupère d'abord toutes les données du formulaire
    const formData = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = {};

    form.fields.forEach((field) => {
      let value: unknown = formData.get(field.key);

      // Gestion basique des types (nombre, etc.)
      if (field.type === "number" && value !== null) {
        value = value === "" ? null : Number(value);
      }

      payload[field.key] = value ?? "";
    });

    //  CORRECTION : on valide APRÈS avoir rempli le payload
    const validationErrors = RuntimeValidationEngine.validate(module, payload);
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      console.log("ERP VALIDATION ERRORS", validationErrors);
      setSaving(false);
      return;
    }

    try {
      if (mode === "create") {
        await RuntimeDataBinding.create(module, payload);
      } else if (mode === "edit" && initialData.id) {
        await RuntimeDataBinding.update(
          module,
          String(initialData.id),
          payload
        );
      }

      router.push(
        module.metadata.routes?.list ?? `/${module.metadata.key}`
      );
      router.refresh();

      console.log("ERP ENTERPRISE FORM SAVED", {
        module: module.metadata.key,
        mode,
        payload,
      });
    } catch (error) {
      console.error("ERP ENTERPRISE FORM ERROR", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-8 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-200">
            {mode === "create" ? "Création" : "Modification"}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {module.metadata.label}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
            Formulaire métier connecté au binding runtime.
          </p>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
<div className="rounded-xl bg-yellow-50 p-4 text-sm text-slate-900">
  layout: {module.form?.layout ?? "aucun"}
  <br />
  tabs: {module.form?.tabs?.length ?? 0}
</div>


          {module.form?.layout === "tabs" ? (
            <ERPFormTabs module={module} initialData={initialData} />
          ) : (
            <>
              <ERPFormSection
                title="Informations principales"
                description="Renseigne les champs principaux du module."
              >
                {mainFields.map((field) => (
                  <ERPFormField
                    key={field.key}
                    field={field}
                    initialValue={initialData[field.key]}
                  />
                ))}
              </ERPFormSection>

              {relationFields.length > 0 && (
                <ERPFormSection
                  title="Relations"
                  description="Associe cet élément aux autres objets métier."
                >
                  {relationFields.map((field) => (
                    <ERPFormField
                      key={field.key}
                      field={field}
                      initialValue={initialData[field.key]}
                    />
                  ))}
                </ERPFormSection>
              )}
            </>
          )}

          <div className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            {/* Affichage des erreurs de validation */}
            {errors.length > 0 && (
              <div className="w-full rounded-3xl border border-red-200 bg-red-50 p-5">
                <h3 className="text-sm font-black text-red-700">
                  Validation métier
                </h3>
                <div className="mt-3 space-y-2">
                  {errors.map((error, index) => (
                    <div
                      key={index}
                      className="text-sm text-red-600"
                    >
                      • {error.field} : {error.message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ERPButton type="submit" disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </ERPButton>

            {/*  CORRECTION : type="button" pour éviter une double soumission */}
            <ERPButton
              variant="secondary"
              type="button"
              disabled={saving}
              onClick={() => {
                // Tu peux ajouter ici la logique "Enregistrer et continuer" plus tard
                console.log("Enregistrer et continuer cliqué");
                // Exemple : handleSubmit + ne pas rediriger
              }}
            >
              Enregistrer et continuer
            </ERPButton>

            <ERPButton
              variant="secondary"
              type="button"
              disabled={saving}
              onClick={() =>
                router.push(
                  module.metadata.routes?.list ?? `/${module.metadata.key}`
                )
              }
            >
              Annuler
            </ERPButton>
          </div>
        </div>

        <ERPFormSummaryPanel module={module} />
      </section>
    </form>
  );
}