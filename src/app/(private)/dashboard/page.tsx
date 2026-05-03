import { KPICard }
from "@/components/dashboard/KPICard";

import { RecentActivities }
from "@/components/dashboard/RecentActivities";

import { AlertsPanel }
from "@/components/dashboard/AlertsPanel";

export default function DashboardPage() {

  return (
    <div className="space-y-6">

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Dashboard
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Vue globale de votre ERP agricole
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        <KPICard
          title="Exploitations"
          value="24"
          subtitle="+12% ce mois"
        />

        <KPICard
          title="Produits"
          value="128"
          subtitle="+8 nouveaux"
        />

        <KPICard
          title="Stocks"
          value="87%"
          subtitle="DisponibilitÃ©"
        />

        <KPICard
          title="MatÃ©riels"
          value="16"
          subtitle="2 maintenances"
        />
      </div>

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        <div className="xl:col-span-2">
          <RecentActivities />
        </div>

        <AlertsPanel />
      </div>
    </div>
  );
}