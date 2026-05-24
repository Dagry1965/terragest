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
  ERPReturnBreadcrumb,
} from "@/components/erp/navigation/ERPReturnBreadcrumb";
import {
  getWorkspaceThemeStyle,
} from "@/runtime/theme";

interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
  workflowActions?: ERPModuleAction[];
}

interface ERPFormRelationChangeContext {
  field?: {
    key: string;
    relation?: unknown;
    autoFill?: RuntimeRelationAutoFillConfig;
  };
  selectedOption?: {
    id: string;
    label: string;
    record?: Record<string, unknown>;
  };
}

interface RuntimeRelationAutoFillConfig {
  map?: Record<string, string[] | string>;
  recalculate?: boolean;
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

async function syncInterventionTotalsFromLines(
  interventionId: string
) {
  if (!interventionId) {
    return;
  }

  try {
    const { allERPModules } =
      await import("@/runtime/modules/definitions/coreModules");

    const linesModule =
      allERPModules.find(
        (item) => item.metadata.key === "lignesinterventionauto"
      );

    const interventionModule =
      allERPModules.find(
        (item) => item.metadata.key === "interventionsauto"
      );

    if (!linesModule || !interventionModule) {
      return;
    }

    const lines =
      await RuntimeDataBinding.list(linesModule);

    const relatedLines =
      lines.filter(
        (line) =>
          String(line.interventionId ?? "") === interventionId &&
          String(line.statut ?? "") !== "annulee"
      );

    const totals =
      relatedLines.reduce(
        (acc, line) => {
          const quantity = Number(line.quantite ?? 0);
          const unitPrice = Number(line.prixUnitaire ?? 0);

          const amount =
            Number(line.montantTotal ?? quantity * unitPrice) || 0;

          const type =
            String(line.typeLigne ?? "piece");

          if (type === "piece") {
            acc.pieces += amount;
          } else if (
            type === "main_oeuvre" ||
            type === "service"
          ) {
            acc.mainOeuvre += amount;
          } else if (type === "remise") {
            acc.remises += amount;
          } else {
            acc.autres += amount;
          }

          return acc;
        },
        {
          pieces: 0,
          mainOeuvre: 0,
          remises: 0,
          autres: 0,
        }
      );

    const coutTotal =
      totals.pieces +
      totals.mainOeuvre +
      totals.autres -
      totals.remises;

    await RuntimeDataBinding.update(
      interventionModule,
      interventionId,
      {
        coutPieces: totals.pieces,
        coutMainOeuvre: totals.mainOeuvre + totals.autres,
        coutTotal,
      }
    );
  } catch (error) {
    console.error(
      "[AMARKHYS_SYNC_INTERVENTION_TOTALS_ERROR]",
      error
    );
  }
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

  const queryLockedFields =
    searchParams
      .get("lockFields")
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

  const compositionLocking =
    module.composition as
      | {
          lockedFields?: string[];
          readOnlyFields?: string[];
          allowOverride?: string[];
        }
      | undefined;

  const hasParentContext =
    Boolean(
      queryValues.parentModuleKey ||
      queryValues.parentRecordId ||
      queryValues.parentForeignKey
    );

  const compositionLockedFields =
    compositionLocking?.lockedFields ?? [];

  const compositionReadOnlyFields =
    compositionLocking?.readOnlyFields ?? [];

  const lockedFields =
    mode === "create"
      ? Array.from(
          new Set([
            ...queryLockedFields,
          ])
        )
      : Array.from(
          new Set([
            ...compositionLockedFields,
            ...queryLockedFields,
          ])
        );

  const readOnlyFields =
    mode === "create"
      ? []
      : Array.from(
          new Set([
            ...compositionReadOnlyFields,
          ])
        );

  // Q15F_A2_ACTIVE_CREATE_LOCK_POLICY
  // Création directe : aucun champ composition.lockedFields n'est bloqué.
  // Création enfant : seuls les champs transmis par lockFields dans l'URL sont bloqués.
  // Edit/detail : les verrous de composition restent appliqués.

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

  function toFriendlyRuntimeErrorMessage(
    error: unknown
  ): string {
    const message =
      error instanceof Error
        ? error.message
        : "Enregistrement impossible.";

    if (
      message.includes(
        "Conflit de planning"
      ) ||
      message.includes(
        "ce véhicule possède déjà un rendez-vous"
      )
    ) {
      return "Ce véhicule a déjà un rendez-vous sur cette plage horaire. Choisissez un autre créneau ou modifiez le rendez-vous existant.";
    }

    if (
      message.includes(
        "dateRendezVous"
      ) ||
      message.includes(
        "heureRendezVous"
      ) ||
      message.includes(
        "créneau"
      )
    ) {
      return "Le rendez-vous doit avoir une date et une heure valides avant d'être enregistré.";
    }

    if (
      message.includes(
        "clientId manquant"
      )
    ) {
      return "Veuillez sélectionner un client avant d'enregistrer.";
    }

    if (
      message.includes(
        "vehiculeId manquant"
      )
    ) {
      return "Veuillez sélectionner un véhicule avant d'enregistrer.";
    }

    if (
      message.includes(
        "déjà été consommé"
      )
    ) {
      return "Ce rendez-vous a déjà généré une intervention. Aucune nouvelle intervention ne sera créée.";
    }

    return message;
  }


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

  function toRuntimeNumber(
    value: unknown,
    fallback = 0
  ): number {
    if (
      typeof value === "number" &&
      Number.isFinite(value)
    ) {
      return value;
    }

    if (typeof value === "string") {
      const parsed =
        Number(
          value
            .replace(",", ".")
            .trim()
        );

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return fallback;
  }

  function getRelationAutoFillConfig(
    field?: ERPFormRelationChangeContext["field"]
  ): RuntimeRelationAutoFillConfig | null {
    if (!field) {
      return null;
    }

    const fieldWithAutoFill =
      field as {
        autoFill?: RuntimeRelationAutoFillConfig;
        relation?: {
          autoFill?: RuntimeRelationAutoFillConfig;
        };
      };

    return (
      fieldWithAutoFill.autoFill ??
      (
        typeof fieldWithAutoFill.relation === "object" &&
        fieldWithAutoFill.relation
          ? fieldWithAutoFill.relation.autoFill
          : undefined
      ) ??
      null
    );
  }

  function resolveAutoFillValue(
    record: Record<string, unknown> | undefined,
    candidates: string[] | string
  ): unknown {
    if (!record) {
      return undefined;
    }

    const keys =
      Array.isArray(candidates)
        ? candidates
        : [candidates];

    for (const key of keys) {
      const value =
        record[key];

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        return value;
      }
    }

    return undefined;
  }

  function applyRelationAutoFill(
    currentValues: Record<string, unknown>,
    context?: ERPFormRelationChangeContext
  ): Record<string, unknown> {
    const autoFillConfig =
      getRelationAutoFillConfig(context?.field);

    const record =
      context?.selectedOption?.record;

    if (
      !autoFillConfig?.map ||
      !record
    ) {
      return currentValues;
    }

    const nextValues = {
      ...currentValues,
    };

    for (const [targetField, sourceFields] of Object.entries(autoFillConfig.map)) {
      const value =
        resolveAutoFillValue(
          record,
          sourceFields
        );

      if (
        value !== undefined &&
        value !== null
      ) {
        nextValues[targetField] = value;
      }
    }

    return autoFillConfig.recalculate
      ? applyLineItemFormCalculations(nextValues)
      : nextValues;
  }

  function applyLineItemFormCalculations(
    values: Record<string, unknown>
  ): Record<string, unknown> {
    if (module.metadata.key !== "lignesinterventionauto") {
      return values;
    }

    const quantity =
      toRuntimeNumber(values.quantite, 1);

    const unitPrice =
      toRuntimeNumber(
        values.prixUnitaireHT ??
          values.prixUnitaire,
        0
      );

    const taxRate =
      toRuntimeNumber(values.tauxTVA, 18);

    const montantHT =
      Math.round(quantity * unitPrice * 100) / 100;

    const montantTVA =
      Math.round((montantHT * taxRate / 100) * 100) / 100;

    const montantTTC =
      Math.round((montantHT + montantTVA) * 100) / 100;

    return {
      ...values,
      quantite: quantity,
      prixUnitaire: unitPrice,
      prixUnitaireHT: unitPrice,
      tauxTVA: taxRate,
      montantHT,
      montantTVA,
      montantTTC,
      montantTotal: montantHT,
    };
  }

  function handleFieldChange(
    key: string,
    value: unknown,
    context?: ERPFormRelationChangeContext
  ) {
    setFormValues((currentValues) => {
      const nextValues = {
        ...currentValues,
        [key]: value,
      };

      const autoFilledValues =
        applyRelationAutoFill(
          nextValues,
          context
        );

      if (
        module.metadata.key === "lignesinterventionauto" &&
        [
          "quantite",
          "prixUnitaire",
          "prixUnitaireHT",
          "tauxTVA",
          "produitId",
        ].includes(key)
      ) {
        return applyLineItemFormCalculations(autoFilledValues);
      }

      return autoFilledValues;
    });
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

      // AMARKHYS_SYNC_INTERVENTION_TOTALS_AFTER_SAVE
      if (module.metadata.key === "lignesinterventionauto") {
        const interventionId =
          String(
            preparedPayload.interventionId ??
            savedRecord?.interventionId ??
            formValues.interventionId ??
            ""
          );

        if (interventionId) {
          await syncInterventionTotalsFromLines(interventionId);
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

      const message =
        toFriendlyRuntimeErrorMessage(
          error
        );

      console.error(
        "ERP ENTERPRISE FORM ERROR",
        error
      );

      setErrors([
        {
          field: "formulaire",
          message,
        },
      ]);
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

    const currentInvoiceStatus =
      String(formValues.statutFacture ?? "");

    if (
      moduleKey === "facturesauto" &&
      currentInvoiceStatus !== "annulee"
    ) {
      return {
        label: "Annuler facture",
        nextStatus: "annulee",
        statusField: "statutFacture",
        confirmMessage:
          "Annuler cette facture ? Les paiements, échéances et historiques seront conservés.",
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
          [action.statusField ?? "statut"]: action.nextStatus,
        }
      );

      setFormValues((currentValues) => ({
        ...currentValues,
        [action.statusField ?? "statut"]: action.nextStatus,
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
        style={getWorkspaceThemeStyle(
          module.metadata.category === "amarkhys" ||
          module.metadata.key.endsWith("auto")
            ? "amarkhys-petronas"
            : module.metadata.category === "production" ||
                module.metadata.category === "agri"
              ? "agri-enterprise"
              : "default-enterprise"
        )}
        className="
          space-y-5 sm:space-y-6 lg:space-y-8
          rounded-2xl
          border
          border-[var(--erp-border)]
          bg-[var(--erp-bg)]
          bg-[var(--erp-bg)]
          p-3 sm:p-4 lg:p-6
          shadow-[0_14px_40px_rgba(15,23,42,0.07)]
          md:p-6
        "
        data-erp-form-theme={
          module.metadata.category === "amarkhys" ||
          module.metadata.key.endsWith("auto")
            ? "amarkhys-petronas"
            : module.metadata.category === "production" ||
                module.metadata.category === "agri"
              ? "agri-enterprise"
              : "default-enterprise"
        }
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
            rounded-2xl sm:rounded-3xl
            border
            border-[var(--erp-border-strong)]
            bg-[var(--erp-primary-soft)]
            p-6
            shadow-sm
          "
        >
          <div className="grid gap-4 sm:gap-5 lg:gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[var(--erp-secondary)]">
                Encaissement facture
              </p>

              <h2 className="mt-2 text-2xl font-black text-[var(--erp-text)] min-w-[220px] justify-center self-end mt-auto mb-0 lg:self-end shadow-[0_12px_30px_rgba(0,166,138,0.22)]">
              Enregistrer un paiement
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--erp-text-muted)]">
                Crée un encaissement lié à cette facture. Le montant payé, le reste à payer et le statut de paiement seront recalculés automatiquement.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-[var(--erp-border-strong)] bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--erp-text-muted)]">
                    Total TTC
                  </p>
                  <p className="mt-1 text-xl font-black text-[var(--erp-text)]">
                    {invoiceAmountSummary.montantTTC.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--erp-border-strong)] bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--erp-text-muted)]">
                    Déjà payé
                  </p>
                  <p className="mt-1 text-xl font-black text-[var(--erp-text)]">
                    {invoiceAmountSummary.montantPaye.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--erp-border-strong)] bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--erp-text-muted)]">
                    Reste à payer
                  </p>
                  <p className="mt-1 text-xl font-black text-[var(--erp-primary)]">
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
    bg-[var(--erp-primary)]
    px-6
    py-4
    text-sm
    font-black
    text-[var(--erp-text)]
    shadow-sm
    transition
    hover:brightness-110
    min-w-[220px] self-end lg:self-end shadow-[0_12px_30px_rgba(0,166,138,0.22)] mt-auto mb-0">
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
        <section className="rounded-2xl sm:rounded-3xl border border-[#D5E4E8] bg-[#F8FAFC] p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="mb-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#334155]">
              Workflow
            </p>
            <p className="text-sm text-[#111827]">
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
                      ? "bg-red-600 text-[var(--erp-text)] hover:bg-red-700"
                      : action.type === "secondary"
                        ? "bg-slate-200 text-[var(--erp-text)] hover:bg-slate-300"
                        : "bg-[var(--erp-surface)] text-[var(--erp-text)] hover:bg-[#1F2937] hover:border-[#00A68A]"
                  }
                `}
              >
                {action.label}
              </button>
            ))}
          </div>
        </section>
      )}
      <section className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] shadow-sm">
        <div className="bg-gradient-to-r from-white via-white to-[var(--erp-primary-soft)] px-8 py-8 text-[var(--erp-text)]">
          <p className="text-sm font-bold uppercase tracking-wide text-[#475569]">
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
              readOnlyFields={readOnlyFields}
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
                      readOnlyFields={readOnlyFields}
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
                      readOnlyFields={readOnlyFields}
                    />
                  ))}
                </ERPFormSection>
              )}
            </>
          )}
<div className="flex flex-wrap gap-3 rounded-2xl sm:rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-5 shadow-sm">
            {errors.length > 0 && (
              <div className="w-full rounded-2xl sm:rounded-3xl border border-red-200 bg-red-50 p-5">
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


                className="w-full rounded-2xl sm:rounded-3xl border border-amber-200 bg-amber-50 p-5"


              >


                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


                  <div>


                    <p className="text-xs font-black uppercase tracking-wide text-amber-700">


                      Action métier


                    </p>


            


                    <h3 className="mt-1 text-xl font-black text-[var(--erp-text)]">


                      {businessStatusAction.label}


                    </h3>


            


                    <p className="mt-2 text-sm leading-6 text-[var(--erp-text-muted)]">


                      Cette action conserve l’historique et évite une suppression brute.


                    </p>


                  </div>


            


                  <button


                    type="button"


                    disabled={saving}


                    onClick={handleBusinessStatusAction}


                    className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-black text-[var(--erp-text)] shadow-sm transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"


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
                className="w-full rounded-2xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-4 py-3 text-sm text-[var(--erp-text-muted)]"
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