"use client";

import { useEffect, useRef, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import type { ERPModule } from "@/runtime/modules";
import type { ERPModuleAction } from "@/runtime/modules/ERPModule";
import { ERPModuleBuilder } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";
import { RuntimeActionEngine } from "@/runtime/actions/RuntimeActionEngine";
import {
  RuntimeNotificationCenter,
} from "@/runtime/notifications/RuntimeNotificationCenter";

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
  workflowActions?: ERPModuleAction[];
}

export function ERPEnterpriseForm({
  module,
  mode = "create",
  initialData = {},
  workflowActions = [],
}: ERPEnterpriseFormProps) {
  const router = useRouter();

  const formRef =
    useRef<HTMLFormElement | null>(null);

  const pendingWorkflowActionRef =
    useRef<ERPModuleAction | null>(null);
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

  const form =
    ERPModuleBuilder.buildForm(module);

  function resolveInitialFormValues() {
    const defaultValues =
      Object.fromEntries(
        form.fields
          .filter(
            (field) =>
              field.defaultValue !== undefined
          )
          .map((field) => [
            field.key,
            field.defaultValue,
          ])
      );

    if (mode === "create") {
      return {
        ...defaultValues,
        ...initialData,
        ...queryValues,
      };
    }

    return {
      ...initialData,
      ...queryValues,
    };
  }

  const [formValues, setFormValues] =
    useState<Record<string, unknown>>(
      () => resolveInitialFormValues()
    );

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

  const errorByField =
    Object.fromEntries(
      errors.map((error) => [
        error.field,
        error.message,
      ])
    ) as Record<string, string>;

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

  useEffect(() => {
    if (errors.length === 0) {
      return;
    }

    const firstError =
      errors[0];

    if (!firstError?.field) {
      return;
    }

    const target =
      document.querySelector(
        `[data-field-key="${firstError.field}"]`
      );

    target?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [errors]);

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

    

    const workflowAction =
      pendingWorkflowActionRef.current;
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
      pendingWorkflowActionRef.current = null;
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
      let savedRecord: Record<string, unknown> | null = null;

      if (mode === "create") {
        const created =
          await RuntimeDataBinding.create(
            module,
            preparedPayload
          );

        savedRecord = {
          ...preparedPayload,
          ...(created && typeof created === "object"
            ? created
            : {}),
        };

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

        const updated =
          await RuntimeDataBinding.update(
            module,
            String(recordId),
            preparedPayload
          );

        savedRecord = {
          ...initialData,
          ...preparedPayload,
          id: String(recordId),
          ...(updated && typeof updated === "object"
            ? updated
            : {}),
        };

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

      if (workflowAction && savedRecord) {
        const workflowResult =
          await RuntimeActionEngine.execute({
            module,
            action: workflowAction,
            record: savedRecord,
          });

        pendingWorkflowActionRef.current = null;

        if (!workflowResult?.success) {
          RuntimeNotificationCenter.workflowError({
            module,
            action: workflowAction,
            record: savedRecord,
            result: workflowResult,
          });

          setErrors([
            {
              field: "workflow",
              message:
                workflowResult && "message" in workflowResult
                  ? String(workflowResult.message)
                  : workflowResult && "error" in workflowResult
                    ? String(workflowResult.error)
                    : "Action workflow impossible.",
            },
          ]);

          setSaving(false);
          return;
        }

        RuntimeNotificationCenter.workflowSuccess({
          module,
          action: workflowAction,
          record: savedRecord,
          result: workflowResult,
        });
      }

      router.push(
        returnTo ??
          module.metadata.routes?.list ??
          `/${module.metadata.key}`
      );

      router.refresh();
    } catch (error) {
      pendingWorkflowActionRef.current = null;

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
      ref={formRef}
      className="space-y-8"
      onSubmit={handleSubmit}
    >
      {mode === "edit" && workflowActions.length > 0 && (
        <section className="rounded-3xl border border-blue-100 bg-blue-50 p-4">
          <div className="mb-3">
            <p className="text-xs font-black uppercase tracking-wide text-blue-700">
              Workflow
            </p>
            <p className="text-sm text-blue-900">
              Ces actions enregistrent d'abord le formulaire, puis exécutent le workflow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {workflowActions.map((action) => (
              <button
                key={action.key}
                type="button"
                onClick={() => {
                  pendingWorkflowActionRef.current = action;
                  formRef.current?.requestSubmit();
                }}
                className={`
                  rounded-2xl
                  px-4
                  py-2
                  text-sm
                  font-bold
                  transition
                  ${
                    action.type === "danger"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : action.type === "secondary"
                        ? "bg-slate-200 text-slate-900 hover:bg-slate-300"
                        : "bg-slate-950 text-white hover:bg-slate-800"
                  }
                `}
              >
                {action.label}
              </button>
            ))}
          </div>
        </section>
      )}
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
              fieldErrors={errorByField}
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
                    error={errorByField[field.key]}
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
                      error={errorByField[field.key]}
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