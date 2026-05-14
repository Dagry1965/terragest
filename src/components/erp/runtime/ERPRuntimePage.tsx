"use client";

import Link from "next/link";

import {
  ERPPage,
  ERPEmptyState,
} from "../ui";

import { ERPEnterpriseForm } from "@/components/erp/forms/enterprise/ERPEnterpriseForm";
import { ERPRuntimeDetails } from "./ERPRuntimeDetails";
import { ERPRuntimeTable } from "./ERPRuntimeTable";

import type { ERPModule } from "@/runtime/modules/ERPModule";
import { ERPModuleIcon }
from "@/components/erp/ui/ERPModuleIcon";

import {
  RuntimeActionEngine,
} from "@/runtime/actions/RuntimeActionEngine";

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
  const moduleLabel =
    module?.metadata?.label ?? "Module ERP";

  const moduleDescription =
    module?.metadata?.description;

  const resolvedTitle =
    title ?? `${moduleLabel} — ${type}`;

const runtimeActions =
  RuntimeActionEngine.getAvailableActions({
    actions: module?.actions ?? [],
    userPermissions: ["*"],
    workflow: module?.workflows?.[0],
    record,
  });
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
{runtimeActions.length > 0 && (
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
)}
 <div className="rounded-xl bg-yellow-50 p-4 text-sm text-slate-900">
  </div>

        {/* FORMULAIRE DE CRÉATION */}
        {type === "create" && module && (
          <ERPEnterpriseForm
            module={module}
            mode="create"
          />
        )}

        {/* FORMULAIRE D'ÉDITION */}
        {type === "edit" && module && record && (
          <ERPEnterpriseForm
            module={module}
            mode="edit"
            initialData={record}
          />
        )}

        {/* PAGE DE DÉTAIL */}
        {type === "detail" && module && record && (
          <ERPRuntimeDetails
            module={module}
            data={record}
          />
        )}

        {/* BOUTON NOUVEAU */}
        {type === "list" &&
          module?.metadata?.routes?.create && (
            <div className="flex justify-end">
              <Link
                href={module.metadata.routes.create}
                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
              >
                Nouveau
              </Link>
            </div>
          )}

        {/* TABLEAU LISTE */}
        {type === "list" && module && (
          <ERPRuntimeTable
            module={module}
            data={data}
          />
        )}

        {/* MODULE INTROUVABLE */}
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
