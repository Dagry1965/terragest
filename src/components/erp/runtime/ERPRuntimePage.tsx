"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

import {
  ERPPage,
  ERPEmptyState,
  ERPToast,
} from "../ui";

import { ERPEnterpriseForm } from "@/components/erp/forms/enterprise/ERPEnterpriseForm";
import { ERPRuntimeDetails } from "./ERPRuntimeDetails";
import {
  ERPRuntimeActionBar,
  type ERPRuntimeActionBarAction,
} from "@/components/erp/runtime/ERPRuntimeActionBar";

type ERPRuntimePageActionSource = ERPModuleAction & {
  href?: string;
  disabled?: boolean;
  variant?: string;
  description?: string;
};
import { ERPRuntimeTable } from "./ERPRuntimeTable";
import { ERPRelatedRecordsPanel } from "./ERPRelatedRecordsPanel";
import { ERPContextBanner } from "@/components/erp/context/ERPContextBanner";
import { ERPHubReturnBanner } from "@/components/erp/runtime/ERPHubReturnBanner";

import type { ERPModule, ERPModuleAction } from "@/runtime/modules/ERPModule";

import {
  RuntimeActionEngine,
} from "@/runtime/actions/RuntimeActionEngine";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding/RuntimeDataBinding";

import { ERPOperationalModulePage } from "@/components/erp/operational";
import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";

function showRuntimeActionFeedback(actionResult: unknown) {
  if (!actionResult || typeof actionResult !== "object") {
    return;
  }

  const result = actionResult as {
    success?: boolean;
    title?: string;
    message?: string;
    severity?: "success" | "warning" | "danger" | "info";
    effects?: string[];
    nextActions?: string[];
  };

  const success = result.success !== false;
  const tone =
    result.severity ??
    (success ? "success" : "danger");

  const title =
    result.title ??
    (success ? "Action effectuée" : "Action impossible");

  const details = [
    result.message,
    Array.isArray(result.effects) && result.effects.length > 0
      ? result.effects.join(" · ")
      : undefined,
    Array.isArray(result.nextActions) && result.nextActions.length > 0
      ? `Prochaine étape : ${result.nextActions.join(" · ")}`
      : undefined,
  ]
    .filter(Boolean)
    .join("\n");

  if (!details && !title) {
    return;
  }

  toast.custom(
    <ERPToast
      title={title}
      message={details || undefined}
      tone={tone}
    />
  );
}

function mapRuntimeActionsToActionBarActions(
  runtimeActions: ERPRuntimePageActionSource[] = [],
  onAction?: (action: ERPRuntimePageActionSource) => void
): ERPRuntimeActionBarAction[] {
  return runtimeActions
    .map((action) => {
      const runtimeAction = action as ERPRuntimePageActionSource;

      const key = String(runtimeAction.key ?? runtimeAction.label ?? "");
      const label = String(runtimeAction.label ?? key);

      if (!key || !label) {
        return null;
      }

      const href =
        typeof runtimeAction.href === "string"
          ? runtimeAction.href
          : undefined;

      const disabled =
        typeof runtimeAction.disabled === "boolean"
          ? runtimeAction.disabled
          : false;

      const tone =
        runtimeAction.variant === "danger"
          ? "danger"
          : runtimeAction.variant === "success"
            ? "success"
            : runtimeAction.variant === "warning"
              ? "warning"
              : runtimeAction.variant === "primary"
                ? "primary"
                : "default";

      return {
        key,
        label,
        href,
        disabled,
        tone,
        onClick:
          !href && onAction
            ? () => onAction(runtimeAction)
            : undefined,
        description:
          typeof runtimeAction.description === "string"
            ? runtimeAction.description
            : undefined,
      };
    })
    .filter(Boolean) as ERPRuntimeActionBarAction[];
}

function buildInvoicePaymentHref(
  record: Record<string, unknown>
): string {
  const factureId =
    String(record.id ?? record._id ?? "");

  const montantTTC =
    Number(record.montantTTC ?? 0);

  const montantPaye =
    Number(record.montantPaye ?? 0);

  const resteAPayer =
    Number(record.resteAPayer ?? 0);

  const montant =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(montantTTC - montantPaye, 0);

  return buildRuntimeFactureEncaissementCreateHref({
    factureId,
    clientId: record.clientId ? String(record.clientId) : undefined,
    vehiculeId: record.vehiculeId ? String(record.vehiculeId) : undefined,
    montant: montant > 0 ? montant : undefined,
    datePaiement: new Date().toISOString().split("T")[0],
    statut: "valide",
    returnTo: "/facturesauto/" + factureId + "/edit",
  });
}

function getRuntimePageTypeLabel(type: string): string {
  switch (type) {
    case "list":
      return "liste";
    case "create":
      return "création";
    case "edit":
      return "modification";
    case "detail":
      return "fiche";
    default:
      return type;
  }
}

interface ERPRuntimePageProps {
  title?: string;
  description?: string;
  module?: ERPModule;
  type?: "list" | "create" | "detail" | "edit" | string;
  record?: Record<string, unknown>;
  data?: Record<string, unknown>[];
}

export function ERPRuntimePage({
  title,
  description,
  module,
  type = "list",
  record,
  data = [],
}: ERPRuntimePageProps) {
  const [runtimeData, setRuntimeData] =
    useState<Record<string, unknown>[]>(
      data
    );

  const [currentRecord, setCurrentRecord] =
    useState<Record<string, unknown> | undefined>(
      record
    );

  const [loading, setLoading] =
    useState(false);

  const [runtimeActions, setRuntimeActions] =
    useState<ERPRuntimePageActionSource[]>([]);

  useEffect(() => {
    setCurrentRecord(record);
  }, [record]);

  useEffect(() => {
    async function loadData() {
      if (
        type !== "list" ||
        !module
      ) {
        return;
      }

      try {
        setLoading(true);

        const rows =
          await RuntimeDataBinding.list(
            module
          );

        setRuntimeData(rows);
      } catch (error) {
        console.error(
          "[RUNTIME LIST LOAD ERROR]",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [module, type]);


  

  // Q2_L_B3_I_B2_ASYNC_RELATION_GOVERNED_ACTIONS
  // Resolve action availability asynchronously so relation-based governance
  // can disable actions before the user clicks.
  useEffect(() => {
    let mounted = true;

    async function loadRuntimeActions() {
      const removedRecord =
        Boolean(currentRecord?.removedAt);

      if (
        (type !== "detail" && type !== "edit") ||
        !module ||
        !currentRecord ||
        removedRecord
      ) {
        if (mounted) {
          setRuntimeActions([]);
        }

        return;
      }

      const actions =
        await RuntimeActionEngine.getAvailableActionsAsync({
          actions: module.actions ?? [],
          workflow: module.workflows?.[0],
          record: currentRecord,
        });

      if (mounted) {
        setRuntimeActions(
          actions as ERPRuntimePageActionSource[]
        );
      }
    }

    void loadRuntimeActions();

    return () => {
      mounted = false;
    };
  }, [module, type, currentRecord]);
async function handleRuntimeAction(action: NonNullable<ERPModule["actions"]>[number]) {

    if (!module || !currentRecord) {
      return;
    }
    let actionResult: unknown;

    try {
      actionResult =
        await RuntimeActionEngine.execute({
          module,
          action,
          record: currentRecord,
        });
    } catch (error) {
      console.error(
        "ERP RUNTIME ACTION ERROR",
        {
          module: module?.metadata?.key,
          action: action.key,
          error,
        }
      );

      actionResult = {
        success: false,
        severity: "danger",
        title: "Action impossible",
        message:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue pendant l'execution de l'action.",
        action,
        record: currentRecord,
      };
    }

    showRuntimeActionFeedback(actionResult);

    const recordId =
      String(
        currentRecord.id ??
        currentRecord._id ??
        currentRecord.uid ??
        ""
      );

    if (recordId) {
      const freshRecord =
        await RuntimeDataBinding.detail(
          module,
          recordId
        );

      if (freshRecord) {
        setCurrentRecord(freshRecord);
      }
    }

    return actionResult;
  }


  const shouldUseOperationalPage =
    type === "list" &&
    Boolean(module?.operational?.enabled);

  const moduleLabel =
    module?.metadata?.label ?? "Module ERP";

  const moduleDescription =
    module?.metadata?.description;

  const resolvedTitle =
    title ?? `${moduleLabel} ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ${getRuntimePageTypeLabel(type)}`;


  const createActionLabel =
    module?.metadata?.key === "rendezvous"
      ? "Nouveau rendez-vous"
      : `Nouveau ${moduleLabel}`;

  const createActionHref =
    module
      ? `/${module.metadata.key}/nouveau`
      : "#";

  const isRemovedRecord = Boolean(currentRecord?.removedAt);

  const moduleHrefActions =
    // Q22E4B_LIST_NAVIGATION_ACTIONS
    // Generic runtime: list pages may expose module actions with href.
    type === "list"
      ? (module?.actions ?? []).filter((action) =>
          Boolean(action.href)
        )
      : [];

  const hasPlanningAction =
    moduleHrefActions.some((action) =>
      String(action.href ?? "").includes("/planning")
    );

  const schedulingPlanningAction =
    // Q22E4C_AUTO_SCHEDULING_PLANNING_ACTION
    // Any module declaring scheduling.enabled gets a generic Planning entry.
    // The first consumer is rendezvous, but this remains runtime-driven.
    type === "list" &&
    module?.scheduling?.enabled &&
    !hasPlanningAction
      ? [
          {
            key: "runtime-planning",
            label: "Planning",
            href: `/${module.metadata.key}/planning`,
            type: "secondary" as const,
          },
        ]
      : [];

  const listNavigationActions = [
    ...schedulingPlanningAction,
    ...moduleHrefActions,
  ];

  const isInvoiceDetailPage =
    type === "detail" &&
    module?.metadata?.key === "facturesauto" &&
    Boolean(currentRecord?.id ?? currentRecord?._id);

  const invoicePaymentHref =
    isInvoiceDetailPage && currentRecord
      ? buildInvoicePaymentHref(currentRecord)
      : "#";

  const relatedChildren =
    module?.composition?.children?.filter((child) => {
      if (!currentRecord) {
          return false;
        }

      if (type !== "detail" && type !== "edit") {
        return false;
      }

      return (child.displayIn ?? ["detail"]).includes(
        type as "detail" | "edit"
      );
    }) ?? [];

  const relatedChildrenBefore =
    relatedChildren.filter((child) => child.position === "before");

  const relatedChildrenAfter =
    relatedChildren.filter((child) => child.position !== "before");


  
  if (shouldUseOperationalPage && module) {
    return (
      <ERPPage
        title={title ?? module.metadata.label}
        description={
          description ??
          module.operational?.subtitle ??
          module.metadata.description ??
          "Vue opérationnelle générée par le Runtime ERP."
        }
      >
        <ERPOperationalModulePage
          module={module}
          data={runtimeData}
        />
      </ERPPage>
    );
  }

return (
    <ERPPage
      title={resolvedTitle}
      description={
        description ??
        moduleDescription ??
        "Page gÃ©nÃ©rÃ©e automatiquement par le Runtime ERP."
      }
    >
      <div className="space-y-6">
        {type === "list" && module && <ERPHubReturnBanner />}

        {type === "list" && module && (
          <div className="flex flex-wrap items-center justify-end gap-3">
            {listNavigationActions.map((action) => (
              <Link
                key={action.key}
                href={action.href ?? "#"}
                className={[
                  "rounded-2xl px-5 py-3 text-sm font-bold shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition",
                  action.type === "secondary"
                    ? "bg-slate-100 text-[var(--erp-text)] hover:bg-slate-200"
                    : action.type === "danger"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-[var(--erp-table-head)] text-[var(--erp-table-head-text)] hover:bg-[#007F6D]",
                ].join(" ")}
              >
                {action.label}
              </Link>
            ))}

            <Link
              href={createActionHref}
              className="
                rounded-2xl
                bg-[var(--erp-table-head)]
                px-5
                py-3
                text-sm
                font-bold
                text-[var(--erp-table-head-text)]
                shadow-[0_14px_40px_rgba(15,23,42,0.07)]
                transition
                hover:bg-[#007F6D]
              "
            >
              {createActionLabel}
            </Link>
          </div>
        )}

        {loading && type === "list" ? (
          <div className="rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 text-sm text-[var(--erp-text-muted)]">
            Chargement des donnÃ©es...
          </div>
        ) : null}

        {module && currentRecord && (type === "detail" || type === "edit") ? (
          <ERPContextBanner
            module={module}
            record={currentRecord}
            mode={type}
          />
        ) : null}

        <div data-erp-related-children-before className="space-y-4">
          {module && currentRecord && relatedChildrenBefore.map((child) => (
            <ERPRelatedRecordsPanel
              key={child.key}
              parentModule={module}
              parentRecord={currentRecord}
              child={child}
              mode={type as "detail" | "edit"}
            />
          ))}
        </div>


        {(type === "detail" || type === "edit") && runtimeActions.length > 0 ? (
          <div data-runtime-action-bar-placement="runtime-page">
            <ERPRuntimeActionBar
              title="Actions métier"
              description="Actions runtime disponibles pour cet enregistrement."
              actions={mapRuntimeActionsToActionBarActions(
                runtimeActions as ERPRuntimePageActionSource[],
                (runtimeAction) => {
                  void handleRuntimeAction(runtimeAction);
                }
              )}
              compact
            />
          </div>
        ) : null}

        {type === "create" && module && (
          <ERPEnterpriseForm
            module={module}
            mode="create"
          />
        )}

        {type === "edit" && module && currentRecord && (
          <ERPEnterpriseForm
            module={module}
            mode="edit"
            initialData={currentRecord}
            forceReadOnlyBecauseRemoved={isRemovedRecord}
          />
        )}

        {type === "detail" && module && currentRecord && (
          <ERPRuntimeDetails
            module={module}
            data={currentRecord}
          />
        )}

        <div data-erp-related-children-after className="space-y-4">
          {module && currentRecord && relatedChildrenAfter.map((child) => (
            <ERPRelatedRecordsPanel
              key={child.key}
              parentModule={module}
              parentRecord={currentRecord}
              child={child}
              mode={type as "detail" | "edit"}
            />
          ))}
        </div>


        {type === "list" &&
          module?.metadata?.routes?.create && (
            <div className="flex justify-end">
              <Link
                href={module.metadata.routes.create}
                className="w-full justify-center sm:w-auto rounded-2xl bg-[var(--erp-primary)] px-5 py-3 text-sm font-black text-[var(--erp-table-head-text)] shadow-[0_8px_18px_rgba(0,155,125,0.16)] transition hover:-translate-y-0.5 hover:bg-[#007F6D] hover:shadow-[0_14px_30px_rgba(0,127,109,0.24)] active:translate-y-0"
              >
                Nouveau
              </Link>
            </div>
          )}

        {type === "list" && module && (
          <ERPRuntimeTable
            module={module}
            data={runtimeData}
          />
        )}

        {!module && (
          <ERPEmptyState
            title="Module introuvable"
            description="Aucun module runtime n'a Ã©tÃ© trouvÃ©."
          />
        )}
      </div>
    </ERPPage>
  );
}