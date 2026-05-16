$ErrorActionPreference = "Stop"

$path = "C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx"

$content = @'
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

        {loading && type === "list" ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
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
                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
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
'@

[System.IO.File]::WriteAllText(
  $path,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - ERPRuntimePage rewritten with runtime list loading."
Write-Host "Run: pnpm build"