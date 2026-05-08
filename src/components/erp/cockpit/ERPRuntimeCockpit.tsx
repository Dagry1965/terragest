import {
  ERPPageHeader,
  ERPSection,
  ERPStatCard,
  ERPEmptyState,
} from "@/components/erp/ui";

export function ERPRuntimeCockpit() {
  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="Cockpit ERP"
        title="Supervision runtime"
        description="Monitoring ERP enterprise."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <ERPStatCard label="Events" value="Live" />
        <ERPStatCard label="Workflows" value="Monitoring" />
        <ERPStatCard label="Queues" value="Stable" />
        <ERPStatCard label="Health" value="OK" />
      </div>

      <ERPSection>
        <ERPEmptyState
          title="Cockpit runtime pret"
          description="Connecter les flux runtime reels."
        />
      </ERPSection>
    </div>
  );
}