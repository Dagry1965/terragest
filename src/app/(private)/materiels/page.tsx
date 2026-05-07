"use client";

import { ERPPage }
from "@/components/erp/page/ERPPage";

import { ERPMetricCard }
from "@/components/erp/page/ERPMetricCard";

import { ERPStatusBadge }
from "@/components/erp/page/ERPStatusBadge";

import { ERPWidgetCard }
from "@/components/erp/page/ERPWidgetCard";

export default function MaterielsPage() {

  return (

    <ERPPage
      title="Matériels"
      subtitle="Supervision des équipements et actifs opérationnels."
    >

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <ERPMetricCard
          title="Matériels actifs"
          value="182"
          subtitle="équipements opérationnels"
          status={
            <ERPStatusBadge
              label="STABLE"
              variant="success"
            />
          }
        />

        <ERPMetricCard
          title="En maintenance"
          value="12"
          subtitle="maintenance en cours"
          variant="warning"
          status={
            <ERPStatusBadge
              label="PENDING"
              variant="warning"
            />
          }
        />

        <ERPMetricCard
          title="Critiques"
          value="4"
          subtitle="intervention urgente"
          variant="danger"
          status={
            <ERPStatusBadge
              label="CRITIQUE"
              variant="danger"
            />
          }
        />

        <ERPMetricCard
          title="Disponibilité"
          value="94%"
          subtitle="santé opérationnelle"
          status={
            <ERPStatusBadge
              label="HEALTHY"
              variant="success"
            />
          }
        />

      </div>

      <ERPWidgetCard title="Activité matériels">

        <div className="space-y-4">

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

            <p className="font-medium text-slate-900">
              Maintenance déclenchée sur TR-204
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Workflow maintenance runtime exécuté
            </p>

          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

            <p className="font-medium text-amber-900">
              Révision préventive en attente
            </p>

            <p className="mt-1 text-sm text-amber-700">
              2 équipements nécessitent validation
            </p>

          </div>

          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">

            <p className="font-medium text-rose-900">
              Panne critique détectée
            </p>

            <p className="mt-1 text-sm text-rose-700">
              Intervention urgente recommandée
            </p>

          </div>

        </div>

      </ERPWidgetCard>

    </ERPPage>
  );
}
