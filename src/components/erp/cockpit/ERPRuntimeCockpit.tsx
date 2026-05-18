import {
  ERPPageHeader,
  ERPSection,
  ERPStatCard,
  ERPEmptyState,
} from "@/components/erp/ui";

export function ERPRuntimeCockpit() {
  return (
    <div className="space-y-5 sm:space-y-4 sm:space-y-5 lg:space-y-6 lg:space-y-8">
      <ERPPageHeader
        eyebrow="Cockpit ERP"
        title="Supervision runtime"
        description="Monitoring ERP enterprise."
      />

      <div className="grid grid-cols-1 gap-4 sm:p-5 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
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