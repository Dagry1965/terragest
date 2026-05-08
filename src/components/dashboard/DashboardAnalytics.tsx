"use client";

export interface DashboardAnalyticsProps {
  produits: any[];
  stocks: any[];
  materiels: any[];
  exploitations: any[];
}

export function DashboardAnalytics({
  produits,
  stocks,
  materiels,
  exploitations,
}: DashboardAnalyticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="text-sm text-gray-500">Produits</div>
        <div className="text-3xl font-bold">{produits?.length ?? 0}</div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="text-sm text-gray-500">Stocks</div>
        <div className="text-3xl font-bold">{stocks?.length ?? 0}</div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="text-sm text-gray-500">Matériels</div>
        <div className="text-3xl font-bold">{materiels?.length ?? 0}</div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="text-sm text-gray-500">Exploitations</div>
        <div className="text-3xl font-bold">{exploitations?.length ?? 0}</div>
      </div>
    </div>
  );
}

export default DashboardAnalytics;
