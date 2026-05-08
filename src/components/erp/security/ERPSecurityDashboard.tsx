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