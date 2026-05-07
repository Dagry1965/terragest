"use client";

import { ERPPage }
from "@/components/erp/page/ERPPage";

import { ERPMetricCard }
from "@/components/erp/page/ERPMetricCard";

import { ERPStatusBadge }
from "@/components/erp/page/ERPStatusBadge";

import { ERPWidgetCard }
from "@/components/erp/page/ERPWidgetCard";

import { ERPAnalyticsCard }
from "@/components/erp/analytics/ERPAnalyticsCard";

import { ERPWorkflowBoard }
from "@/components/erp/workflow/ERPWorkflowBoard";

import { ERPModuleCard }
from "@/components/erp/navigation/ERPModuleCard";

import { ERPNotificationCard }
from "@/components/erp/notifications/ERPNotificationCard";

import { ERPActivityFeed }
from "@/components/erp/activity/ERPActivityFeed";

import { ERPTrendCard }
from "@/components/erp/charts/ERPTrendCard";

import { ERPEventTimeline }
from "@/components/erp/timeline/ERPEventTimeline";

import { ERPAutomationCard }
from "@/components/erp/automation/ERPAutomationCard";

import { ERPKPIGrid }
from "@/components/erp/kpi/ERPKPIGrid";

import { ERPSystemHealth }
from "@/components/erp/monitoring/ERPSystemHealth";

import { ERPRuntimeStatus }
from "@/components/erp/runtime/ERPRuntimeStatus";

import { ERPRelationsGraph }
from "@/components/erp/relations/ERPRelationsGraph";

import { ERPLiveEvents }
from "@/components/erp/live/ERPLiveEvents";

import { ERPFirestoreSync }
from "@/components/erp/firestore/ERPFirestoreSync";

import { ERPAutomationTimeline }
from "@/components/erp/automation/ERPAutomationTimeline";

import { ERPAIInsights }
from "@/components/erp/ai/ERPAIInsights";
import { ERPFinancialOverview }
from "@/components/erp/finance/ERPFinancialOverview";
import { ERPSecurityPanel }
from "@/components/erp/security/ERPSecurityPanel";
import { ERPAuditTrail }
from "@/components/erp/audit/ERPAuditTrail";
import { ERPWorkerQueue }
from "@/components/erp/workers/ERPWorkerQueue";

import { ERPObservabilityCenter }
from "@/components/erp/observability/ERPObservabilityCenter";

export default function DashboardPage() {
  return (
    <ERPPage
      title="Cockpit ERP"
      subtitle="Pilotage ERP - Runtime opérationnel Terragest_V2."
    >
      <ERPKPIGrid />

<ERPWidgetCard title="Vue financière ERP">

  <ERPFinancialOverview />

</ERPWidgetCard>

<ERPWidgetCard title="Santé système ERP">
  <ERPSystemHealth />
</ERPWidgetCard>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <ERPMetricCard title="Exploitations" value="24" subtitle="exploitations actives" status={<ERPStatusBadge label="ACTIVE" variant="success" />} />
        <ERPMetricCard title="Matériels actifs" value="182" subtitle="équipements suivis" status={<ERPStatusBadge label="STABLE" />} />
        <ERPMetricCard title="Interventions" value="13" subtitle="interventions ouvertes" variant="warning" status={<ERPStatusBadge label="WARNING" variant="warning" />} />
        <ERPMetricCard title="Alertes" value="4" subtitle="alertes critiques" variant="danger" status={<ERPStatusBadge label="CRITIQUE" variant="danger" />} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ERPAnalyticsCard title="Coûts maintenance" value="€ 48K" trend="+12% ce mois" status="warning" />
        <ERPAnalyticsCard title="Disponibilité flotte" value="94%" trend="+4% cette semaine" status="success" />
        <ERPAnalyticsCard title="Incidents critiques" value="3" trend="-2 incidents cette semaine" status="danger" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ERPWidgetCard title="Workflow supervision">
          <ERPWorkflowBoard />
        </ERPWidgetCard>

        <ERPWidgetCard title="Notifications ERP">
          <div className="space-y-4">
            <ERPNotificationCard title="Maintenance critique" message="Le matériel TR-204 nécessite une intervention immédiate." status="danger" />
            <ERPNotificationCard title="Workflow en attente" message="2 validations superviseur sont requises." status="warning" />
            <ERPNotificationCard title="Runtime opérationnel" message="Tous les services ERP sont actifs." status="success" />
          </div>
        </ERPWidgetCard>

        <ERPWidgetCard title="Automations ERP">
          <div className="space-y-4">
            <ERPAutomationCard title="Maintenance automatique" description="Déclenchement workflow maintenance préventive." status="success" />
            <ERPAutomationCard title="Analyse incidents" description="2 workflows nécessitent validation." status="warning" />
            <ERPAutomationCard title="Observability runtime" description="Détection d’une anomalie critique." status="danger" />
          </div>
        </ERPWidgetCard>
      </div>

      <ERPWidgetCard title="Analytics ERP">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <ERPTrendCard title="Performance exploitation" value="+18%" trend="+4% cette semaine" />
          <ERPTrendCard title="Disponibilité matériels" value="94%" trend="+2% aujourd’hui" />
          <ERPTrendCard title="Rendement opérationnel" value="87%" trend="+6% ce mois" />
        </div>
      </ERPWidgetCard>
<ERPWidgetCard title="Synchronisation Firestore">

  <ERPFirestoreSync />

</ERPWidgetCard>


<ERPWidgetCard title="Runtime ERP">

  <ERPRuntimeStatus />

</ERPWidgetCard>


      <ERPWidgetCard title="Activité ERP">
        <ERPActivityFeed />
      </ERPWidgetCard>

      <ERPWidgetCard title="Timeline ERP">
        <ERPEventTimeline />
      </ERPWidgetCard>

<ERPWidgetCard title="Observability ERP">

  <ERPObservabilityCenter />

</ERPWidgetCard>

<ERPWidgetCard title="Workers ERP">

  <ERPWorkerQueue />

</ERPWidgetCard>

<ERPWidgetCard title="Audit ERP">

  <ERPAuditTrail />

</ERPWidgetCard>


<ERPWidgetCard title="Sécurité ERP">

  <ERPSecurityPanel />

</ERPWidgetCard>



<ERPWidgetCard title="Insights IA ERP">

  <ERPAIInsights />

</ERPWidgetCard>

<ERPWidgetCard title="Automations live ERP">

  <ERPAutomationTimeline />

</ERPWidgetCard>
<ERPWidgetCard title="Événements live ERP">

  <ERPLiveEvents />

</ERPWidgetCard>

<ERPWidgetCard title="Relations ERP">

  <ERPRelationsGraph />

</ERPWidgetCard>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Modules ERP
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <ERPModuleCard title="Exploitations" description="Pilotage des exploitations et terrains." href="/exploitations" />
          <ERPModuleCard title="Matériels" description="Gestion des équipements et maintenance." href="/materiels" />
          <ERPModuleCard title="Interventions" description="Suivi des workflows opérationnels." href="/interventions/workflow" />
          <ERPModuleCard title="Stocks" description="Supervision des flux et inventaires." href="/stocks" />
        </div>
      </div>
    </ERPPage>
  );
}