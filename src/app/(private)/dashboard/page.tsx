import { AnalyticsCards }
from "@/features/analytics/components/AnalyticsCards";

import { StockValueChart }
from "@/features/analytics/components/StockValueChart";

import { ProductsCategoryChart }
from "@/features/analytics/components/ProductsCategoryChart";

import { AlertsPanel }
from "@/features/alerts/components/AlertsPanel";

import { RecentActivities }
from "@/components/dashboard/RecentActivities";

import { RoleGuard }
from "@/features/auth/guards/RoleGuard";

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
          ERP Agricole Enterprise
        </p>
      </div>

      <RoleGuard permission="canViewAnalytics">

        <AnalyticsCards />

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >
          <StockValueChart />

          <ProductsCategoryChart />
        </div>

      </RoleGuard>

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