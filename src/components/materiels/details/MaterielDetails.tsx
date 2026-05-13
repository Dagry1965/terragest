// src/components/materiels/details/MaterielDetails.tsx

"use client";

import { useRouter } from "next/navigation";

import { MaterielItem } from "@/domains/materiels/store/MaterielsStore";

import { MaintenanceWorkflowService } from "@/domains/maintenance/services/MaintenanceWorkflowService";

import { EntityDetailsLayout } from "@/components/erp/details/EntityDetailsLayout";

import { ERPButton, ERPStatusBadge } from "@/components/erp/ui";

interface MaterielDetailsProps {
  materiel: MaterielItem;
}

export function MaterielDetails({ materiel }: MaterielDetailsProps) {
  const router = useRouter();

  function declarePanne() {
    MaintenanceWorkflowService.declarePanne(
      materiel.id,
      "Panne déclarée depuis UI"
    );

    router.refresh();
  }

  function resolvePanne() {
    MaintenanceWorkflowService.resolvePanne(materiel.id);
    router.refresh();
  }

  return (
    <EntityDetailsLayout
      title={materiel.nom}
      subtitle="Gestion maintenance matériel"
    >
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <ERPStatusBadge label={materiel.statut} variant="info" />
        </div>

        <div className="flex gap-4">
          <ERPButton type="button" variant="danger" onClick={declarePanne}>
            Déclarer panne
          </ERPButton>

          <ERPButton type="button" variant="primary" onClick={resolvePanne}>
            Résoudre
          </ERPButton>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Historique</h2>

        <div className="flex flex-col gap-3">
          {materiel.historique.map((entry, index) => (
            <div
              key={index}
              className="border-l-2 border-slate-300 pl-4 text-sm text-slate-700"
            >
              {entry}
            </div>
          ))}
        </div>
      </div>
    </EntityDetailsLayout>
  );
}
