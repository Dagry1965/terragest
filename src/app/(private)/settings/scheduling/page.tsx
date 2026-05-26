import { ERPSchedulingSettingsPanel } from "@/components/erp/scheduling/settings/ERPSchedulingSettingsPanel";

export default function SchedulingSettingsPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <ERPSchedulingSettingsPanel
        tenantId="runtime"
        workspaceId="default"
        moduleKey="rendezvous"
        defaultScope="module"
      />
    </main>
  );
}
