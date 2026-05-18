"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ERPPage,
  ERPEmptyState,
} from "../ui";

import { ERPEnterpriseForm } from "@/components/erp/forms/enterprise/ERPEnterpriseForm";
import { ERPRuntimeDetails } from "./ERPRuntimeDetails";
import { ERPRuntimeTable } from "./ERPRuntimeTable";

import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  RuntimeActionEngine,
} from "@/runtime/actions/RuntimeActionEngine";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding/RuntimeDataBinding";

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

  const params =
    new URLSearchParams();

  params.set(
    "factureId",
    factureId
  );

  if (record.clientId) {
    params.set(
      "clientId",
      String(record.clientId)
    );
  }

  if (record.vehiculeId) {
    params.set(
      "vehiculeId",
      String(record.vehiculeId)
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
    new Date().toISOString().split("T")[0]
  );

  params.set(
    "statut",
    "valide"
  );

  params.set(
    "returnTo",
    "/facturesauto/" + factureId
  );

  params.set(
    "lockFields",
    "factureId,clientId,vehiculeId"
  );

  return "/encaissementsauto/nouveau?" + params.toString();
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

  const [loading, setLoading] =
    useState(false);

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

  const moduleLabel =
    module?.metadata?.label ?? "Module ERP";

  const moduleDescription =
    module?.metadata?.description;

  const resolvedTitle =
    title ?? `${moduleLabel} — ${getRuntimePageTypeLabel(type)}`;


  const createActionLabel =
    module?.metadata?.key === "rendezvous"
      ? "Nouveau rendez-vous"
      : `Nouveau ${moduleLabel}`;

  const createActionHref =
    module
      ? `/${module.metadata.key}/nouveau`
      : "#";

  const runtimeActions =
    type !== "list" && record
      ? RuntimeActionEngine.getAvailableActions({
          actions: module?.actions ?? [],
          userPermissions: ["*"],
          workflow: module?.workflows?.[0],
          record,
        })
      : [];

  const isInvoiceDetailPage =
    type === "detail" &&
    module?.metadata?.key === "facturesauto" &&
    Boolean(record?.id ?? record?._id);

  const invoicePaymentHref =
    isInvoiceDetailPage && record
      ? buildInvoicePaymentHref(record)
      : "#";

  return (
    <ERPPage
      title={resolvedTitle}
      description={
        description ??
        moduleDescription ??
        "Page générée automatiquement par le Runtime ERP."
      }
    >
      <div className="space-y-6">
        {type === "list" && module && (
          <div className="flex items-center justify-end">
            <a
              href={createActionHref}
              className="
                rounded-2xl
                bg-[var(--erp-table-head)]
                px-5
                py-3
                text-sm
                font-bold
                text-[var(--erp-table-head-text)]
                shadow-sm
                transition
                hover:bg-[#007F6D]
              "
            >
              {createActionLabel}
            </a>
          </div>
        )}

        {type === "detail" && runtimeActions.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {runtimeActions.map((action) => (
              <button
                key={action.key}
                type="button"
                onClick={() =>
                  RuntimeActionEngine.execute({
                    module,
                    action,
                    record,
                  })
                }
                className={`
                  rounded-2xl
                  px-4
                  py-2
                  text-sm
                  font-bold
                  transition
                  ${
                    action.type === "danger"
                      ? "bg-red-600 text-[var(--erp-table-head-text)] hover:bg-red-700"
                      : action.type === "secondary"
                        ? "bg-slate-200 text-[var(--erp-text)] hover:bg-slate-300"
                        : "bg-[var(--erp-table-head)] text-[var(--erp-table-head-text)] hover:bg-[#007F6D]"
                  }
                `}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {loading && type === "list" ? (
          <div className="rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 text-sm text-slate-500">
            Chargement des données...
          </div>
        ) : null}

        {type === "create" && module && (
          <ERPEnterpriseForm
            module={module}
            mode="create"
          />
        )}

        {type === "edit" && module && record && (
          <ERPEnterpriseForm
            module={module}
            mode="edit"
            initialData={record}
            workflowActions={runtimeActions}
          />
        )}

        {type === "detail" && module && record && (
          <ERPRuntimeDetails
            module={module}
            data={record}
          />
        )}

        {type === "list" &&
          module?.metadata?.routes?.create && (
            <div className="flex justify-end">
              <Link
                href={module.metadata.routes.create}
                className="w-full justify-center sm:w-auto rounded-2xl bg-[var(--erp-primary)] px-5 py-3 text-sm font-black text-white shadow-[0_8px_18px_rgba(0,155,125,0.16)] transition hover:-translate-y-0.5 hover:bg-[#007F6D] hover:shadow-[0_14px_30px_rgba(0,127,109,0.24)] active:translate-y-0"
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
            description="Aucun module runtime n'a été trouvé."
          />
        )}
      </div>
    </ERPPage>
  );
}