"use client";

import { useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";

import { ERPButton } from "@/components/erp/ui";

import { ERPFormField } from "./ERPFormField";
import { ERPFormSection } from "./ERPFormSection";
import { ERPFormSummaryPanel } from "./ERPFormSummaryPanel";
import { ERPFormTabs } from "./ERPFormTabs";

import {
  RuntimePermissionEngine,
} from "@/runtime/permissions/RuntimePermissionEngine";

import {
  RuntimeValidationEngine,
} from "@/runtime/validation/RuntimeValidationEngine";

import {
  RuntimeVisibilityEngine,
} from "@/runtime/visibility/RuntimeVisibilityEngine";

import type {
  RuntimeValidationError,
} from "@/runtime/validation/RuntimeValidationTypes";

import {
  erpRuntimeValidationBridge,
} from "@/runtime/rules/ERPRuntimeValidationBridge";

import {
  generateTerrainCode,
} from "@/runtime/business/terrains/generateTerrainCode";

import {
  generateContratCode,
} from "@/runtime/business/contrats/generateContratCode";

import {
  attachContratToTerrain,
} from "@/runtime/business/contrats/attachContratToTerrain";
import {
recomputeTerrainSurfaceDisponible,
}
from "@/runtime/business/exploitations/recomputeTerrainSurfaceDisponible";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryValues =
    Object.fromEntries(
      Array.from(searchParams.entries()).filter(
        ([key]) =>
          key !== "returnTo" &&
          key !== "lockFields"
      )
    );

  const [saving, setSaving] = useState(false);

  const [errors, setErrors] =
    useState<RuntimeValidationError[]>([]);

  const [formValues, setFormValues] =
    useState<Record<string, unknown>>({
      ...initialData,
      ...queryValues,
    });

  const form =
    ERPModuleBuilder.buildForm(module);

  const currentUserRole = "admin";

  const visibleFields =
    form.fields.filter(
      (field) =>
        RuntimeVisibilityEngine.isVisible(
          field,
          formValues
        ) &&
        RuntimePermissionEngine.canAccessField(
          field,
          currentUserRole
        )
    );

  const mainFields =
    visibleFields.filter(
      (field) => field.type !== "relation"
    );

  const relationFields =
    visibleFields.filter(
      (field) => field.type === "relation"
    );

  const returnTo =
    searchParams.get("returnTo");

  function handleFieldChange(
    key: string,
    value: unknown
  ) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  async function prepareTerrainPayloadBeforeCreate(
    payload: Record<string, unknown>
  ) {
    if (module.metadata.key !== "terrains") {
      return payload;
    }

    const existingTerrains =
      await RuntimeDataBinding.list(module);

    const code =
      await generateTerrainCode(
        payload,
        existingTerrains
      );

    return {
      ...payload,
      code,
      pays: "Congo-Brazzaville",
      statut: payload.statut || "inactif",
      surfaceDisponible:
        payload.surfaceDisponible ||
        payload.surfaceTotale ||
        0,
    };
  }

  async function prepareTerrainPayloadBeforeUpdate(
    payload: Record<string, unknown>
  ) {
    if (module.metadata.key !== "terrains") {
      return payload;
    }

    const existingTerrains =
      await RuntimeDataBinding.list(module);

    const nomChanged =
      String(initialData.nom ?? "").trim() !==
      String(payload.nom ?? "").trim();

    const villeChanged =
      String(initialData.ville ?? "").trim() !==
      String(payload.ville ?? "").trim();

    const shouldRegenerateCode =
      !payload.code ||
      nomChanged ||
      villeChanged;

    const code =
      shouldRegenerateCode
        ? await generateTerrainCode(
            payload,
            existingTerrains
          )
        : String(payload.code);

    return {
      ...payload,
      code,
      pays: "Congo-Brazzaville",
      surfaceDisponible:
        payload.surfaceDisponible ||
        payload.surfaceTotale ||
        0,
    };
  }

  async function prepareContratPayloadBeforeCreate(
    payload: Record<string, unknown>
  ) {
    if (module.metadata.key !== "contrats") {
      return payload;
    }

    const existingContrats =
      await RuntimeDataBinding.list(module);

    const code =
      await generateContratCode(
        payload,
        existingContrats
      );

    return {
      ...payload,
      code,
      statut: payload.statut || "brouillon",
    };
  }

  async function prepareContratPayloadBeforeUpdate(
    payload: Record<string, unknown>
  ) {
    if (module.metadata.key !== "contrats") {
      return payload;
    }

    const existingContrats =
      await RuntimeDataBinding.list(module);

    const typeChanged =
      String(initialData.typeContrat ?? "").trim() !==
      String(payload.typeContrat ?? "").trim();

    const objetChanged =
      String(initialData.objetContrat ?? "").trim() !==
      String(payload.objetContrat ?? "").trim();

    const shouldRegenerateCode =
      !payload.code || typeChanged || objetChanged;

    const code =
      shouldRegenerateCode
        ? await generateContratCode(
            payload,
            existingContrats
          )
        : String(payload.code);

    return {
      ...payload,
      code,
    };
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setSaving(true);

    const formData =
      new FormData(event.currentTarget);

    const payload: Record<string, unknown> = {
      ...formValues,
    };

    form.fields
      .filter(
        (field) =>
          RuntimeVisibilityEngine.isVisible(
            field,
            payload
          )
      )
      .forEach((field) => {
      let value: unknown =
        formData.get(field.key) ??
        formValues[field.key];

      if (
        field.type === "number" &&
        value !== null
      ) {
        if (value === "") {
          value = null;
        } else {
          const numericValue =
            Number(value);

          value =
            Number.isNaN(numericValue)
              ? null
              : numericValue;
        }
      }

      payload[field.key] =
        value ?? "";
    });

    let preparedPayload =
      payload;

    if (module.metadata.key === "terrains") {
      preparedPayload =
        mode === "create"
          ? await prepareTerrainPayloadBeforeCreate(payload)
          : await prepareTerrainPayloadBeforeUpdate(payload);
    }

    if (module.metadata.key === "contrats") {
      preparedPayload =
        mode === "create"
          ? await prepareContratPayloadBeforeCreate(payload)
          : await prepareContratPayloadBeforeUpdate(payload);
    }

    const validationErrors =
      RuntimeValidationEngine.validate(
        module,
        preparedPayload
      );

    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      setSaving(false);
      return;
    }

    const businessRulesValid =
      erpRuntimeValidationBridge.validate(
        module.metadata.key,
        preparedPayload
      );

    if (!businessRulesValid) {
      setErrors([
        {
          field: "businessRules",
          message:
            "Les règles métier ERP bloquent cet enregistrement.",
        },
      ]);

      setSaving(false);
      return;
    }

    try {
      if (mode === "create") {
        const created =
          await RuntimeDataBinding.create(
            module,
            preparedPayload
          );

if (
module.metadata.key ===
"exploitations"
) {

await
recomputeTerrainSurfaceDisponible(

String(
preparedPayload.terrainId
)

);

}

        if (module.metadata.key === "contrats") {
          await attachContratToTerrain({
            ...preparedPayload,
            id: created.id,
          });
        }
      } else if (mode === "edit") {
        const recordId =
          initialData.id ??
          initialData._id ??
          preparedPayload.id ??
          preparedPayload._id;

        if (!recordId) {
          throw new Error(
            "ERP UPDATE ERROR: missing record id"
          );
        }

        await RuntimeDataBinding.update(
          module,
          String(recordId),
          preparedPayload
        );

if (
module.metadata.key ===
"exploitations"
) {

await
recomputeTerrainSurfaceDisponible(

String(
preparedPayload.terrainId
)

);

}

        if (module.metadata.key === "contrats") {
          await attachContratToTerrain({
            ...preparedPayload,
            id: recordId,
          });
        }
      }

      router.push(
        returnTo ??
          module.metadata.routes?.list ??
          `/${module.metadata.key}`
      );

      router.refresh();
    } catch (error) {
      console.error(
        "ERP ENTERPRISE FORM ERROR",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="space-y-8"
      onSubmit={handleSubmit}
    >
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-8 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-200">
            {mode === "create"
              ? "Création"
              : "Modification"}
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
          {module.form?.layout === "tabs" ? (
            <ERPFormTabs
              module={module}
              initialData={formValues}
              formValues={formValues}
              onFieldChange={handleFieldChange}
            />
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
                    value={formValues[field.key]}
                    onChange={handleFieldChange}
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
                      value={formValues[field.key]}
                      onChange={handleFieldChange}
                    />
                  ))}
                </ERPFormSection>
              )}
            </>
          )}

          <div className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
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

            <ERPButton
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Enregistrement..."
                : "Enregistrer"}
            </ERPButton>

            <ERPButton
              variant="secondary"
              type="button"
              disabled={saving}
              onClick={() =>
                router.push(
                  returnTo ??
                    module.metadata.routes?.list ??
                    `/${module.metadata.key}`
                )
              }
            >
              Annuler
            </ERPButton>

            {mode === "edit" && Boolean(initialData?.id) ? (
              <ERPButton
                type="button"
                variant="danger"
                onClick={async () => {
                  const confirmed = window.confirm(
                    "Supprimer cet élément ?"
                  );

                  if (!confirmed) {
                    return;
                  }

                  await RuntimeDataBinding.delete(
                    module,
                    String(initialData.id)
                  );

                  router.push(
                    module.metadata.routes?.list ??
                      `/${module.metadata.key}`
                  );
                }}
              >
                Supprimer
              </ERPButton>
            ) : null}
          </div>
        </div>

        <ERPFormSummaryPanel module={module} />
      </section>
    </form>
  );
}