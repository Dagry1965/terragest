$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {
  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent
  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {
    $BackupDir = Join-Path $ProjectRoot "backup\security-rbac-enterprise"
    Ensure-Dir $BackupDir

    $SafeName = $Path
    $SafeName = $SafeName.Replace("\", "__")
    $SafeName = $SafeName.Replace("/", "__")
    $SafeName = $SafeName.Replace(":", "")

    Copy-Item -LiteralPath $FullPath -Destination (Join-Path $BackupDir "$SafeName.bak") -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Host ""
Write-Host "SECURITY + RBAC ENTERPRISE" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\security"
Ensure-Dir "src\runtime\security\roles"
Ensure-Dir "src\runtime\security\permissions"
Ensure-Dir "src\runtime\security\policies"
Ensure-Dir "src\runtime\security\guards"
Ensure-Dir "src\runtime\security\audit"
Ensure-Dir "src\runtime\security\sessions"
Ensure-Dir "src\components\erp\security"

Write-Utf8 "src\runtime\security\roles\ERPRole.ts" @'
export type ERPRoleKey =
  | "super_admin"
  | "admin"
  | "manager"
  | "operator"
  | "viewer";

export type ERPRole = {
  key: ERPRoleKey;
  label: string;
  description?: string;
};
'@

Write-Utf8 "src\runtime\security\roles\ERPRoleRegistry.ts" @'
import type { ERPRole } from "./ERPRole";

export const ERPRoleRegistry: ERPRole[] = [
  {
    key: "super_admin",
    label: "Super Admin",
    description: "Acces complet plateforme ERP.",
  },
  {
    key: "admin",
    label: "Administrateur",
    description: "Administration fonctionnelle ERP.",
  },
  {
    key: "manager",
    label: "Manager",
    description: "Pilotage et validation des processus.",
  },
  {
    key: "operator",
    label: "Operateur",
    description: "Execution operationnelle.",
  },
  {
    key: "viewer",
    label: "Lecteur",
    description: "Consultation seule.",
  },
];
'@

Write-Utf8 "src\runtime\security\permissions\ERPPermission.ts" @'
export type ERPPermissionAction =
  | "read"
  | "create"
  | "update"
  | "delete"
  | "approve"
  | "export"
  | "import"
  | "audit"
  | "execute"
  | "admin";

export type ERPPermission = {
  key: string;
  module: string;
  action: ERPPermissionAction;
  label: string;
};
'@

Write-Utf8 "src\runtime\security\permissions\ERPPermissionRegistry.ts" @'
import { ERPRegistry } from "@/runtime/registry";
import type { ERPPermission } from "./ERPPermission";

const actions = [
  "read",
  "create",
  "update",
  "delete",
  "approve",
  "export",
  "import",
  "audit",
  "execute",
  "admin",
] as const;

export const ERPPermissionRegistry: ERPPermission[] =
  ERPRegistry.modules().flatMap((module) =>
    actions.map((action) => ({
      key: `${module.key}:${action}`,
      module: module.key,
      action,
      label: `${module.label} - ${action}`,
    }))
  );
'@

Write-Utf8 "src\runtime\security\policies\ERPPolicy.ts" @'
import type { ERPRoleKey } from "../roles/ERPRole";
import type { ERPPermissionAction } from "../permissions/ERPPermission";

export type ERPPolicy = {
  role: ERPRoleKey;
  module: string;
  actions: ERPPermissionAction[];
};
'@

Write-Utf8 "src\runtime\security\policies\ERPPolicyRegistry.ts" @'
import { ERPRegistry } from "@/runtime/registry";
import type { ERPPolicy } from "./ERPPolicy";

const allActions = [
  "read",
  "create",
  "update",
  "delete",
  "approve",
  "export",
  "import",
  "audit",
  "execute",
  "admin",
] as const;

const managerActions = [
  "read",
  "create",
  "update",
  "approve",
  "export",
  "audit",
  "execute",
] as const;

const operatorActions = [
  "read",
  "create",
  "update",
  "execute",
] as const;

const viewerActions = [
  "read",
] as const;

export const ERPPolicyRegistry: ERPPolicy[] =
  ERPRegistry.modules().flatMap((module) => [
    {
      role: "super_admin",
      module: module.key,
      actions: [...allActions],
    },
    {
      role: "admin",
      module: module.key,
      actions: [...allActions],
    },
    {
      role: "manager",
      module: module.key,
      actions: [...managerActions],
    },
    {
      role: "operator",
      module: module.key,
      actions: [...operatorActions],
    },
    {
      role: "viewer",
      module: module.key,
      actions: [...viewerActions],
    },
  ]);
'@

Write-Utf8 "src\runtime\security\sessions\ERPSecuritySession.ts" @'
import type { ERPRoleKey } from "../roles/ERPRole";

export type ERPSecuritySession = {
  userId: string;
  displayName: string;
  role: ERPRoleKey;
  tenantId?: string;
};
'@

Write-Utf8 "src\runtime\security\sessions\ERPSessionContext.ts" @'
import type { ERPSecuritySession } from "./ERPSecuritySession";

let currentSession: ERPSecuritySession = {
  userId: "admin",
  displayName: "Admin ERP",
  role: "super_admin",
  tenantId: "default",
};

export const ERPSessionContext = {
  current() {
    return currentSession;
  },

  set(session: ERPSecuritySession) {
    currentSession = session;
  },
};
'@

Write-Utf8 "src\runtime\security\audit\ERPSecurityAuditLog.ts" @'
export type ERPSecurityAuditLevel =
  | "info"
  | "warning"
  | "denied";

export type ERPSecurityAuditEntry = {
  id: string;
  userId: string;
  role: string;
  module: string;
  action: string;
  allowed: boolean;
  level: ERPSecurityAuditLevel;
  timestamp: string;
};
'@

Write-Utf8 "src\runtime\security\audit\ERPSecurityAuditStore.ts" @'
import type { ERPSecurityAuditEntry } from "./ERPSecurityAuditLog";

class ERPSecurityAuditStoreClass {
  private entries: ERPSecurityAuditEntry[] = [];

  add(entry: ERPSecurityAuditEntry) {
    this.entries.unshift(entry);
    this.entries = this.entries.slice(0, 300);
  }

  all() {
    return this.entries;
  }

  denied() {
    return this.entries.filter((entry) => !entry.allowed);
  }
}

export const ERPSecurityAuditStore =
  new ERPSecurityAuditStoreClass();
'@

Write-Utf8 "src\runtime\security\guards\ERPAccessGuard.ts" @'
import type { ERPPermissionAction } from "../permissions/ERPPermission";
import type { ERPSecuritySession } from "../sessions/ERPSecuritySession";

import { ERPPolicyRegistry } from "../policies/ERPPolicyRegistry";
import { ERPSessionContext } from "../sessions/ERPSessionContext";
import { ERPSecurityAuditStore } from "../audit/ERPSecurityAuditStore";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export const ERPAccessGuard = {
  can(
    module: string,
    action: ERPPermissionAction,
    session: ERPSecuritySession = ERPSessionContext.current()
  ) {
    const policy =
      ERPPolicyRegistry.find(
        (item) =>
          item.role === session.role &&
          item.module === module
      );

    const allowed =
      Boolean(policy?.actions.includes(action));

    ERPSecurityAuditStore.add({
      id: createId("sec_audit"),
      userId: session.userId,
      role: session.role,
      module,
      action,
      allowed,
      level: allowed ? "info" : "denied",
      timestamp: new Date().toISOString(),
    });

    return allowed;
  },

  require(
    module: string,
    action: ERPPermissionAction,
    session?: ERPSecuritySession
  ) {
    const allowed =
      this.can(module, action, session);

    if (!allowed) {
      throw new Error(
        `Access denied: ${module}:${action}`
      );
    }

    return true;
  },
};
'@

Write-Utf8 "src\runtime\security\ERPSecuritySnapshot.ts" @'
import { ERPRoleRegistry } from "./roles/ERPRoleRegistry";
import { ERPPermissionRegistry } from "./permissions/ERPPermissionRegistry";
import { ERPPolicyRegistry } from "./policies/ERPPolicyRegistry";
import { ERPSecurityAuditStore } from "./audit/ERPSecurityAuditStore";
import { ERPSessionContext } from "./sessions/ERPSessionContext";

export function getERPSecuritySnapshot() {
  const audit = ERPSecurityAuditStore.all();

  return {
    session: ERPSessionContext.current(),
    roles: ERPRoleRegistry,
    permissions: ERPPermissionRegistry,
    policies: ERPPolicyRegistry,
    audit,
    denied: ERPSecurityAuditStore.denied(),
    rolesCount: ERPRoleRegistry.length,
    permissionsCount: ERPPermissionRegistry.length,
    policiesCount: ERPPolicyRegistry.length,
    auditCount: audit.length,
    deniedCount: ERPSecurityAuditStore.denied().length,
  };
}
'@

Write-Utf8 "src\runtime\security\ERPSecuritySeed.ts" @'
import { ERPAccessGuard } from "./guards/ERPAccessGuard";

let seeded = false;

export function seedERPSecurityRuntime() {
  if (seeded) {
    return;
  }

  seeded = true;

  ERPAccessGuard.can("materiels", "read");
  ERPAccessGuard.can("stocks", "execute");
  ERPAccessGuard.can("paiements", "audit");
  ERPAccessGuard.can("contrats", "export");
}
'@

Write-Utf8 "src\runtime\security\index.ts" @'
export * from "./roles/ERPRole";
export * from "./roles/ERPRoleRegistry";
export * from "./permissions/ERPPermission";
export * from "./permissions/ERPPermissionRegistry";
export * from "./policies/ERPPolicy";
export * from "./policies/ERPPolicyRegistry";
export * from "./sessions/ERPSecuritySession";
export * from "./sessions/ERPSessionContext";
export * from "./audit/ERPSecurityAuditLog";
export * from "./audit/ERPSecurityAuditStore";
export * from "./guards/ERPAccessGuard";
export * from "./ERPSecuritySnapshot";
export * from "./ERPSecuritySeed";
'@

Write-Utf8 "src\components\erp\security\ERPSecurityMetrics.tsx" @'
import { ERPStatCard } from "@/components/erp/ui";
import type { getERPSecuritySnapshot } from "@/runtime/security";

type Snapshot = ReturnType<typeof getERPSecuritySnapshot>;

type ERPSecurityMetricsProps = {
  snapshot: Snapshot;
};

export function ERPSecurityMetrics({
  snapshot,
}: ERPSecurityMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Roles" value={snapshot.rolesCount} helper="RBAC" />
      <ERPStatCard label="Permissions" value={snapshot.permissionsCount} helper="Actions securisees" />
      <ERPStatCard label="Policies" value={snapshot.policiesCount} helper="Regles d'acces" />
      <ERPStatCard label="Audit" value={snapshot.auditCount} helper="Controles traces" />
      <ERPStatCard label="Denied" value={snapshot.deniedCount} helper="Acces refuses" />
      <ERPStatCard label="Session" value={snapshot.session.role} helper={snapshot.session.displayName} />
      <ERPStatCard label="Tenant" value={snapshot.session.tenantId ?? "default"} helper="Isolation preparee" />
      <ERPStatCard label="Runtime" value="Actif" helper="Access guard" />
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\security\ERPRolesPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPSecuritySnapshot } from "@/runtime/security";

type Snapshot = ReturnType<typeof getERPSecuritySnapshot>;

type ERPRolesPanelProps = {
  snapshot: Snapshot;
};

export function ERPRolesPanel({
  snapshot,
}: ERPRolesPanelProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Roles ERP
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Roles globaux disponibles dans le runtime.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.roles.map((role) => (
          <div
            key={role.key}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="font-semibold text-slate-900">{role.label}</p>
            <p className="mt-1 text-sm text-slate-500">
              {role.description}
            </p>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\security\ERPPoliciesPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPSecuritySnapshot } from "@/runtime/security";

type Snapshot = ReturnType<typeof getERPSecuritySnapshot>;

type ERPPoliciesPanelProps = {
  snapshot: Snapshot;
};

export function ERPPoliciesPanel({
  snapshot,
}: ERPPoliciesPanelProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Policies
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Extrait des regles RBAC par module.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.policies.slice(0, 12).map((policy) => (
          <div
            key={`${policy.role}-${policy.module}`}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">
                {policy.module}
              </p>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {policy.role}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {policy.actions.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\security\ERPSecurityAuditPanel.tsx" @'
import { ERPSection, ERPEmptyState } from "@/components/erp/ui";
import type { getERPSecuritySnapshot } from "@/runtime/security";

type Snapshot = ReturnType<typeof getERPSecuritySnapshot>;

type ERPSecurityAuditPanelProps = {
  snapshot: Snapshot;
};

export function ERPSecurityAuditPanel({
  snapshot,
}: ERPSecurityAuditPanelProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Audit securite
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Traces des controles d'acces runtime.
        </p>
      </div>

      {snapshot.audit.length === 0 ? (
        <ERPEmptyState
          title="Aucun audit"
          description="Les controles d'acces apparaitront ici."
        />
      ) : (
        <div className="space-y-4">
          {snapshot.audit.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">
                    {entry.module}:{entry.action}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {entry.userId} - {entry.role}
                  </p>
                </div>

                <span
                  className={[
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    entry.allowed
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700",
                  ].join(" ")}
                >
                  {entry.allowed ? "allowed" : "denied"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\security\ERPSecurityDashboard.tsx" @'
import { ERPPageHeader } from "@/components/erp/ui";
import {
  getERPSecuritySnapshot,
  seedERPSecurityRuntime,
} from "@/runtime/security";

import { ERPSecurityMetrics } from "./ERPSecurityMetrics";
import { ERPRolesPanel } from "./ERPRolesPanel";
import { ERPPoliciesPanel } from "./ERPPoliciesPanel";
import { ERPSecurityAuditPanel } from "./ERPSecurityAuditPanel";

seedERPSecurityRuntime();

export function ERPSecurityDashboard() {
  const snapshot = getERPSecuritySnapshot();

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Security"
        title="Security & RBAC Enterprise"
        description="Roles, permissions, policies, guards, session runtime et audit securite."
      />

      <ERPSecurityMetrics snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ERPRolesPanel snapshot={snapshot} />
        <ERPPoliciesPanel snapshot={snapshot} />
        <ERPSecurityAuditPanel snapshot={snapshot} />
      </div>
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\security\index.ts" @'
export * from "./ERPSecurityMetrics";
export * from "./ERPRolesPanel";
export * from "./ERPPoliciesPanel";
export * from "./ERPSecurityAuditPanel";
export * from "./ERPSecurityDashboard";
'@

Write-Utf8 "src\app\(private)\security\page.tsx" @'
import { ERPSecurityDashboard } from "@/components/erp/security";

export default function Page() {
  return <ERPSecurityDashboard />;
}
'@

Write-Host ""
Write-Host "SECURITY + RBAC ENTERPRISE INSTALLE" -ForegroundColor Green
Write-Host "Executer : pnpm build" -ForegroundColor Yellow