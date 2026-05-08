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