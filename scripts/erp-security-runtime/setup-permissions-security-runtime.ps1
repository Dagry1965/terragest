$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Host "=== PERMISSIONS & SECURITY RUNTIME ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\runtime\security-runtime" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\security-runtime" | Out-Null

WriteFile "src\runtime\security-runtime\RuntimeRole.ts" @'
export type RuntimeRole =
  | "admin"
  | "supervisor"
  | "operator"
  | "viewer";

export interface RuntimeUser {
  id: string;
  name: string;
  role: RuntimeRole;
}
'@

WriteFile "src\runtime\security-runtime\RuntimePermission.ts" @'
export type RuntimePermission =
  | "module.read"
  | "module.create"
  | "module.update"
  | "module.delete"
  | "module.export"
  | "module.import"
  | "workflow.start"
  | "workflow.transition"
  | "workflow.validate"
  | "audit.read"
  | "relations.read"
  | "security.manage";
'@

WriteFile "src\runtime\security-runtime\RuntimeSecurityContext.ts" @'
import type { RuntimeUser } from "./RuntimeRole";

export class RuntimeSecurityContext {
  static currentUser(): RuntimeUser {
    return {
      id: "user-admin",
      name: "Administrateur ERP",
      role: "admin",
    };
  }
}
'@

WriteFile "src\runtime\security-runtime\RuntimePolicyRegistry.ts" @'
import type { RuntimeRole } from "./RuntimeRole";
import type { RuntimePermission } from "./RuntimePermission";

export const runtimeRolePermissions: Record<RuntimeRole, RuntimePermission[]> = {
  admin: [
    "module.read",
    "module.create",
    "module.update",
    "module.delete",
    "module.export",
    "module.import",
    "workflow.start",
    "workflow.transition",
    "workflow.validate",
    "audit.read",
    "relations.read",
    "security.manage",
  ],

  supervisor: [
    "module.read",
    "module.create",
    "module.update",
    "module.export",
    "workflow.start",
    "workflow.transition",
    "workflow.validate",
    "audit.read",
    "relations.read",
  ],

  operator: [
    "module.read",
    "module.create",
    "module.update",
    "workflow.start",
    "workflow.transition",
    "relations.read",
  ],

  viewer: [
    "module.read",
    "audit.read",
    "relations.read",
  ],
};
'@

WriteFile "src\runtime\security-runtime\RuntimePolicyEngine.ts" @'
import type { RuntimePermission } from "./RuntimePermission";
import type { RuntimeUser } from "./RuntimeRole";
import { runtimeRolePermissions } from "./RuntimePolicyRegistry";

export class RuntimePolicyEngine {
  static can(
    user: RuntimeUser,
    permission: RuntimePermission
  ): boolean {
    return runtimeRolePermissions[user.role].includes(permission);
  }

  static filterByPermission<T extends { permission?: RuntimePermission }>(
    user: RuntimeUser,
    items: T[]
  ): T[] {
    return items.filter((item) => {
      if (!item.permission) {
        return true;
      }

      return RuntimePolicyEngine.can(user, item.permission);
    });
  }
}
'@

WriteFile "src\runtime\security-runtime\RuntimeActionPermissionMapper.ts" @'
import type { ERPAction } from "@/runtime/actions";
import type { RuntimePermission } from "./RuntimePermission";

export class RuntimeActionPermissionMapper {
  static permissionFor(action: ERPAction): RuntimePermission | undefined {
    switch (action.key) {
      case "create":
        return "module.create";

      case "edit":
        return "module.update";

      case "delete":
        return "module.delete";

      case "export":
        return "module.export";

      case "import":
        return "module.import";

      case "workflow":
        return "workflow.start";

      case "audit":
        return "audit.read";

      case "relations":
        return "relations.read";

      case "details":
        return "module.read";

      default:
        return undefined;
    }
  }
}
'@

WriteFile "src\runtime\security-runtime\RuntimeActionGuard.ts" @'
import type { ERPAction } from "@/runtime/actions";
import { RuntimeSecurityContext } from "./RuntimeSecurityContext";
import { RuntimePolicyEngine } from "./RuntimePolicyEngine";
import { RuntimeActionPermissionMapper } from "./RuntimeActionPermissionMapper";

export class RuntimeActionGuard {
  static canExecute(action: ERPAction): boolean {
    const user = RuntimeSecurityContext.currentUser();
    const permission = RuntimeActionPermissionMapper.permissionFor(action);

    if (!permission) {
      return true;
    }

    return RuntimePolicyEngine.can(user, permission);
  }

  static filter(actions: ERPAction[]): ERPAction[] {
    return actions.filter((action) =>
      RuntimeActionGuard.canExecute(action)
    );
  }
}
'@

WriteFile "src\runtime\security-runtime\RuntimeWorkflowGuard.ts" @'
import { RuntimeSecurityContext } from "./RuntimeSecurityContext";
import { RuntimePolicyEngine } from "./RuntimePolicyEngine";

export class RuntimeWorkflowGuard {
  static canStart(): boolean {
    const user = RuntimeSecurityContext.currentUser();

    return RuntimePolicyEngine.can(user, "workflow.start");
  }

  static canTransition(): boolean {
    const user = RuntimeSecurityContext.currentUser();

    return RuntimePolicyEngine.can(user, "workflow.transition");
  }

  static canValidate(): boolean {
    const user = RuntimeSecurityContext.currentUser();

    return RuntimePolicyEngine.can(user, "workflow.validate");
  }
}
'@

WriteFile "src\runtime\security-runtime\index.ts" @'
export type { RuntimeRole, RuntimeUser } from "./RuntimeRole";
export type { RuntimePermission } from "./RuntimePermission";

export { RuntimeSecurityContext } from "./RuntimeSecurityContext";
export { runtimeRolePermissions } from "./RuntimePolicyRegistry";
export { RuntimePolicyEngine } from "./RuntimePolicyEngine";
export { RuntimeActionPermissionMapper } from "./RuntimeActionPermissionMapper";
export { RuntimeActionGuard } from "./RuntimeActionGuard";
export { RuntimeWorkflowGuard } from "./RuntimeWorkflowGuard";
'@

WriteFile "src\components\erp\security-runtime\ERPRuntimeSecurityBadge.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import { RuntimeSecurityContext } from "@/runtime/security-runtime";

export function ERPRuntimeSecurityBadge() {
  const user = RuntimeSecurityContext.currentUser();

  return (
    <ERPBadge tone="success">
      Role {user.role}
    </ERPBadge>
  );
}
'@

WriteFile "src\components\erp\security-runtime\ERPSecurityContextPanel.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import {
  RuntimeSecurityContext,
  runtimeRolePermissions,
} from "@/runtime/security-runtime";

export function ERPSecurityContextPanel() {
  const user = RuntimeSecurityContext.currentUser();
  const permissions = runtimeRolePermissions[user.role];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">
          Contexte securite
        </h2>

        <p className="text-sm text-slate-500">
          Permissions runtime appliquees aux actions et workflows.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">
            Utilisateur
          </p>
          <p className="mt-1 text-sm font-black text-slate-950">
            {user.name}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">
            Role
          </p>
          <p className="mt-1 text-sm font-black text-slate-950">
            {user.role}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {permissions.slice(0, 6).map((permission) => (
            <ERPBadge key={permission} tone="info">
              {permission}
            </ERPBadge>
          ))}
        </div>
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\security-runtime\ERPProtectedAction.tsx" @'
"use client";

import type { ReactNode } from "react";
import type { ERPAction } from "@/runtime/actions";
import { RuntimeActionGuard } from "@/runtime/security-runtime";

interface ERPProtectedActionProps {
  action: ERPAction;
  children: ReactNode;
}

export function ERPProtectedAction({
  action,
  children,
}: ERPProtectedActionProps) {
  if (!RuntimeActionGuard.canExecute(action)) {
    return null;
  }

  return <>{children}</>;
}
'@

WriteFile "src\components\erp\security-runtime\index.ts" @'
export { ERPRuntimeSecurityBadge } from "./ERPRuntimeSecurityBadge";
export { ERPSecurityContextPanel } from "./ERPSecurityContextPanel";
export { ERPProtectedAction } from "./ERPProtectedAction";
'@

WriteFile "src\components\erp\actions\ERPActionToolbar.tsx" @'
import type { ERPAction } from "@/runtime/actions";
import { RuntimeActionGuard } from "@/runtime/security-runtime";
import { ERPActionButton } from "./ERPActionButton";

interface ERPActionToolbarProps {
  actions: ERPAction[];
}

export function ERPActionToolbar({
  actions,
}: ERPActionToolbarProps) {
  const allowedActions = RuntimeActionGuard.filter(actions);

  return (
    <div className="flex flex-wrap gap-3">
      {allowedActions.map((action) => (
        <ERPActionButton
          key={action.key}
          action={action}
        />
      ))}
    </div>
  );
}
'@

WriteFile "src\components\erp\actions\ERPRowActions.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPActionRegistry } from "@/runtime/actions";
import { RuntimeActionGuard } from "@/runtime/security-runtime";
import { ERPActionButton } from "./ERPActionButton";

interface ERPRowActionsProps {
  module: ERPModule;
  id?: string;
}

export function ERPRowActions({
  module,
  id,
}: ERPRowActionsProps) {
  const actions =
    RuntimeActionGuard.filter(
      ERPActionRegistry.forRow(module, id)
    );

  return (
    <div className="flex justify-end gap-2">
      {actions.map((action) => (
        <ERPActionButton
          key={action.key}
          action={action}
        />
      ))}
    </div>
  );
}
'@

WriteFile "src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx" @'
"use client";

import { useState } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import {
  WorkflowRuntimeEngine,
  WorkflowRuntimeRegistry,
  type WorkflowRuntimeInstance,
} from "@/runtime/workflow-runtime";
import { RuntimeWorkflowGuard } from "@/runtime/security-runtime";

interface ERPWorkflowRuntimePanelProps {
  module: ERPModule;
  recordId?: string;
}

export function ERPWorkflowRuntimePanel({
  module,
  recordId = "demo-record",
}: ERPWorkflowRuntimePanelProps) {
  const workflows = WorkflowRuntimeRegistry.forModule(module.metadata.key);
  const workflow = workflows[0];

  const [instance, setInstance] =
    useState<WorkflowRuntimeInstance | null>(null);

  if (!workflow) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">
          Workflows
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Aucun workflow declare pour ce module.
        </p>
      </section>
    );
  }

  const currentStep = instance?.currentStep ?? workflow.initialStep;

  const availableTransitions = workflow.transitions.filter(
    (transition) => transition.from === currentStep
  );

  function startWorkflow() {
    if (!RuntimeWorkflowGuard.canStart()) {
      return;
    }

    setInstance(
      WorkflowRuntimeEngine.start(workflow.key, recordId)
    );
  }

  function executeTransition(to: string, requiresValidation?: boolean) {
    if (requiresValidation && !RuntimeWorkflowGuard.canValidate()) {
      return;
    }

    if (!RuntimeWorkflowGuard.canTransition()) {
      return;
    }

    setInstance(
      WorkflowRuntimeEngine.transition(workflow.key, recordId, to)
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Workflow runtime
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {workflow.label}
          </p>
        </div>

        <ERPBadge tone={instance?.status === "completed" ? "success" : "info"}>
          {instance?.status ?? "pret"}
        </ERPBadge>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-5">
        {workflow.steps.map((step) => {
          const active = step.key === currentStep;

          return (
            <div
              key={step.key}
              className={[
                "rounded-2xl border p-4 text-sm",
                active
                  ? "border-blue-300 bg-blue-50 text-blue-900"
                  : "border-slate-200 bg-slate-50 text-slate-500",
              ].join(" ")}
            >
              <p className="font-black">{step.label}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        {!instance && RuntimeWorkflowGuard.canStart() && (
          <ERPButton type="button" onClick={startWorkflow}>
            Demarrer workflow
          </ERPButton>
        )}

        {availableTransitions.map((transition) => {
          const hidden =
            transition.requiresValidation &&
            !RuntimeWorkflowGuard.canValidate();

          if (hidden || !RuntimeWorkflowGuard.canTransition()) {
            return null;
          }

          return (
            <ERPButton
              key={transition.to}
              type="button"
              variant={transition.requiresValidation ? "secondary" : "primary"}
              onClick={() =>
                executeTransition(
                  transition.to,
                  transition.requiresValidation
                )
              }
            >
              {transition.label}
            </ERPButton>
          );
        })}
      </div>

      {instance && (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <h3 className="text-sm font-black text-slate-900">
            Historique
          </h3>

          <div className="mt-3 space-y-2">
            {instance.history.map((entry) => (
              <div key={entry.id} className="text-sm text-slate-600">
                {entry.label} - {entry.to}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
'@

WriteFile "src\components\erp\workspace\ERPWorkspaceContextPanel.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPSecurityContextPanel } from "@/components/erp/security-runtime";

interface ERPWorkspaceContextPanelProps {
  module: ERPModule;
}

export function ERPWorkspaceContextPanel({
  module,
}: ERPWorkspaceContextPanelProps) {
  const features = Object.entries(module.metadata.features ?? {})
    .filter(([, enabled]) => enabled)
    .map(([feature]) => feature);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">
          Contexte module
        </h2>

        <div className="mt-5 space-y-4 text-sm">
          <div>
            <p className="font-bold text-slate-500">Collection</p>
            <p className="mt-1 text-slate-950">{module.schema.collection}</p>
          </div>

          <div>
            <p className="font-bold text-slate-500">Champs</p>
            <p className="mt-1 text-slate-950">{module.schema.fields.length}</p>
          </div>

          <div>
            <p className="font-bold text-slate-500">Capacites</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {features.map((feature) => (
                <ERPBadge key={feature} tone="info">
                  {feature}
                </ERPBadge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ERPSecurityContextPanel />
    </div>
  );
}
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== PERMISSIONS & SECURITY RUNTIME TERMINE ===" -ForegroundColor Green