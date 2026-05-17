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

import {
  InvoicePaymentsHistory,
} from "@/components/erp/billing/InvoicePaymentsHistory";

import {
  InvoicePaymentSchedule,
} from "@/components/erp/billing/InvoicePaymentSchedule";

import {
  InvoiceDocumentActions,
} from "@/components/erp/billing/InvoiceDocumentActions";

import {
  RuntimeUniqueConstraintEngine,
} from "@/runtime/validation/RuntimeUniqueConstraintEngine";

import {
  ClientVehiclesReadonlyCard,
} from "@/components/erp/relations/ClientVehiclesReadonlyCard";

import {
  ERPReturnBreadcrumb,
} from "@/components/erp/navigation/ERPReturnBreadcrumb";

interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
  workflowActions?: ERPModuleAction[];
}

function buildInvoicePaymentHref(
  invoice: Record<string, unknown>
): string {
  const factureId =
    String(
      invoice.id ??
      invoice._id ??
      ""
    );

  const montantTTC =
    Number(invoice.montantTTC ?? 0);

  const montantPaye =
    Number(invoice.montantPaye ?? 0);

  const resteAPayer =
    Number(invoice.resteAPayer ?? 0);

  const montant =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(
          montantTTC - montantPaye,
          0
        );

  const params =
    new URLSearchParams();

  params.set(
    "factureId",
    factureId
  );

  if (invoice.clientId) {
    params.set(
      "clientId",
      String(invoice.clientId)
    );
  }

  if (invoice.vehiculeId) {
    params.set(
      "vehiculeId",
      String(invoice.vehiculeId)
    );
  }

  if (montant > 0) {
    params.set(
      "montant",
      String(montant)
    );
  }

  params.set(
    "datePaiement",
    new Date()
      .toISOString()
      .split("T")[0]
  );

  params.set(
    "statut",
    "valide"
  );

  params.set(
    "returnTo",
    "/facturesauto/" + factureId + "/edit"
  );

  params.set(
    "lockFields",
    "factureId,clientId,vehiculeId"
  );

  return "/encaissementsauto/nouveau?" + params.toString();
}

function getInvoiceAmountSummary(
  invoice: Record<string, unknown>
) {
  const montantTTC =
    Number(invoice.montantTTC ?? 0);

  const montantPaye =
    Number(invoice.montantPaye ?? 0);

  const resteAPayer =
    Number(invoice.resteAPayer ?? 0);

  const computedReste =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(
          montantTTC - montantPaye,
          0
        );

  return {
    montantTTC,
    montantPaye,
    resteAPayer: computedReste,
  };
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

  const lockedFields =
    searchParams
      .get("lockFields")
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

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

  const isInvoiceEditForm =
    mode === "edit" &&
    module.metadata.key === "facturesauto" &&
    Boolean(initialData.id ?? initialData._id);

  const invoicePaymentHref =
    isInvoiceEditForm
      ? buildInvoicePaymentHref(initialData)
      : "#";

  const invoiceAmountSummary =
    getInvoiceAmountSummary(initialData);

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

    const currentRecordId =
      mode === "edit"
        ? String(
            initialData.id ??
              initialData._id ??
              preparedPayload.id ??
              preparedPayload._id ??
              ""
          )
        : "";

    const uniqueConstraintErrors =
      await RuntimeUniqueConstraintEngine.validate(
        module,
        preparedPayload,
        currentRecordId
      );

    const allValidationErrors = [
      ...validationErrors,
      ...uniqueConstraintErrors,
    ];

    setErrors(allValidationErrors);

    if (allValidationErrors.length > 0) {
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

  async function handleDeleteRecord() {
    const confirmed = window.confirm(
      "Supprimer cet élément ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await RuntimeDataBinding.delete(
        module,
        String(initialData.id)
      );

      router.push(
        module.metadata.routes?.list ??
          `/${module.metadata.key}`
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Suppression impossible.";

      setErrors([
        {
          field: "delete",
          message,
        },
      ]);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }


  function getBusinessStatusAction() {
    if (mode !== "edit") {
      return null;
    }

    const moduleKey = module.metadata.key;
    const currentStatus = String(formValues.statut ?? "");

    if (moduleKey === "clientsauto" && currentStatus !== "archive") {
      return {
        label: "Archiver client",
        nextStatus: "archive",
        confirmMessage:
          "Archiver ce client ? Il ne sera pas supprimé et son historique sera conservé.",
      };
    }

    if (moduleKey === "vehicules" && currentStatus !== "archive") {
      return {
        label: "Archiver véhicule",
        nextStatus: "archive",
        confirmMessage:
          "Archiver ce véhicule ? Il ne sera pas supprimé et son historique sera conservé.",
      };
    }

    if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {
      return {
        label: "Annuler encaissement",
        nextStatus: "annule",
        confirmMessage:
          "Annuler cet encaissement ? Le paiement restera conservé dans l’historique.",
      };
    }

    if (moduleKey === "echeancespaiementauto" && currentStatus !== "annulee") {
      return {
        label: "Annuler échéance",
        nextStatus: "annulee",
        confirmMessage:
          "Annuler cette échéance ? Elle restera conservée dans l’historique.",
      };
    }

    return null;
  }

  async function handleBusinessStatusAction() {
    const action = getBusinessStatusAction();

    if (!action || !initialData?.id) {
      return;
    }

    const confirmed = window.confirm(action.confirmMessage);

    if (!confirmed) {
      return;
    }

    setSaving(true);

    try {
      await RuntimeDataBinding.update(
        module,
        String(initialData.id),
        {
          statut: action.nextStatus,
        }
      );

      setFormValues((currentValues) => ({
        ...currentValues,
        statut: action.nextStatus,
      }));

      setErrors([]);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Action métier impossible.";

      setErrors([
        {
          field: "businessAction",
          message,
        },
      ]);
    } finally {
      setSaving(false);
    }
  }

  const businessStatusAction = getBusinessStatusAction();

  function isSensitiveBusinessModule() {
    return [
      "clientsauto",
      "vehicules",
      "facturesauto",
      "encaissementsauto",
      "echeancespaiementauto",
    ].includes(module.metadata.key);
  }

  const sensitiveBusinessModule =
    isSensitiveBusinessModule();

  return (
    <form
      ref={formRef}
      className="space-y-8"
      onSubmit={handleSubmit}
    >
      <ERPReturnBreadcrumb />

      {isInvoiceEditForm ? (
        <div data-invoice-document-actions>
          <InvoiceDocumentActions invoice={initialData} />
        </div>
      ) : null}

      {isInvoiceEditForm ? (
        <section
          data-invoice-edit-payment-action
          className="
            rounded-3xl
            border
            border-emerald-300/30
            bg-emerald-500/10
            p-6
            shadow-sm
          "
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                Encaissement facture
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Enregistrer un paiement
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Crée un encaissement lié à cette facture. Le montant payé, le reste à payer et le statut de paiement seront recalculés automatiquement.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Total TTC
                  </p>
                  <p className="mt-1 text-xl font-black text-slate-950">
                    {invoiceAmountSummary.montantTTC.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Déjà payé
                  </p>
                  <p className="mt-1 text-xl font-black text-slate-950">
                    {invoiceAmountSummary.montantPaye.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Reste à payer
                  </p>
                  <p className="mt-1 text-xl font-black text-emerald-700">
                    {invoiceAmountSummary.resteAPayer.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
              </div>
            </div>

            <a
              href={invoicePaymentHref}
              className="
                inline-flex
                items-center
                justify-center
                rounded-2xl
                bg-emerald-600
                px-6
                py-4
                text-sm
                font-black
                text-white
                shadow-sm
                transition
                hover:bg-emerald-500
              "
            >
              Enregistrer un paiement
            </a>
          </div>
        </section>
      ) : null}

      {isInvoiceEditForm ? (
        <div data-invoice-payments-history>
          <InvoicePaymentsHistory
            factureId={String(initialData.id ?? initialData._id ?? "")}
            montantTTC={Number(initialData.montantTTC ?? 0)}
          />
        </div>
      ) : null}

      {isInvoiceEditForm ? (
        <div data-invoice-payment-schedule>
          <InvoicePaymentSchedule
            factureId={String(initialData.id ?? initialData._id ?? "")}
            clientId={initialData.clientId ? String(initialData.clientId) : undefined}
            vehiculeId={initialData.vehiculeId ? String(initialData.vehiculeId) : undefined}
            montantTTC={Number(initialData.montantTTC ?? 0)}
            montantPaye={Number(initialData.montantPaye ?? 0)}
            resteAPayer={Number(initialData.resteAPayer ?? 0)}
          />
        </div>
      ) : null}

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
              lockedFields={lockedFields}
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
                    lockedFields={lockedFields}
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
                      lockedFields={lockedFields}
                    />
                  ))}
                </ERPFormSection>
              )}
            </>
          )}

          {mode === "edit" &&
          module.metadata.key === "clientsauto" &&
          Boolean(initialData?.id) ? (
            <div data-client-vehicles-readonly-card>
              <ClientVehiclesReadonlyCard
                clientId={String(initialData.id)}
              />
            </div>
          ) : null}

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

            {businessStatusAction ? (


              <div


                data-business-status-actions


                className="w-full rounded-3xl border border-amber-200 bg-amber-50 p-5"


              >


                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


                  <div>


                    <p className="text-xs font-black uppercase tracking-wide text-amber-700">


                      Action métier


                    </p>


            


                    <h3 className="mt-1 text-xl font-black text-slate-950">


                      {businessStatusAction.label}


                    </h3>


            


                    <p className="mt-2 text-sm leading-6 text-slate-600">


                      Cette action conserve l’historique et évite une suppression brute.


                    </p>


                  </div>


            


                  <button


                    type="button"


                    disabled={saving}


                    onClick={handleBusinessStatusAction}


                    className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"


                  >


                    {businessStatusAction.label}


                  </button>


                </div>


              </div>


            ) : null}



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

                        {mode === "edit" && Boolean(initialData?.id) && sensitiveBusinessModule ? (
              <div
                data-sensitive-delete-hidden-notice
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                Suppression masquée pour ce module sensible. Utilisez l’action métier
                d’archivage ou d’annulation afin de conserver l’historique.
              </div>
            ) : null}

{mode === "edit" && Boolean(initialData?.id) && !sensitiveBusinessModule ? (
              <ERPButton
                type="button"
                variant="danger"
                disabled={saving}
                onClick={handleDeleteRecord}
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