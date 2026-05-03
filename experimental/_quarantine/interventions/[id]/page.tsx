"use client";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { useParams } from "next/navigation";

import { Card } from "@/components/ui/Card";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { InterventionService } from "@/features/interventions/services/InterventionService";

import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";

import { WorkflowStatusBadge } from "@/features/workflow/components/WorkflowStatusBadge";

import { WorkflowActions } from "@/features/workflow/components/WorkflowActions";

import { AuditService } from "@/features/audit/services/AuditService";

import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function InterventionDetailPage() {

  const params = useParams();

  const { user } = useAuth();

  const [intervention,
    setIntervention] =
    useState<any>(null);

  const [utilisateur,
    setUtilisateur] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      if (!user) {
        return;
      }

      const [
        interventionData,
        utilisateurData,
      ] = await Promise.all([

        InterventionService.getById(
          params.id as string
        ),

        UtilisateurService.getById(
          user.uid
        ),
      ]);

      setIntervention(
        interventionData
      );

      setUtilisateur(
        utilisateurData
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur chargement"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleChangeStatus = async (
    status: WorkflowStatus
  ) => {

    try {

      if (
        !user ||
        !intervention ||
        !utilisateur
      ) {
        return;
      }

      const ancienStatus =
        intervention.status;

      await InterventionService.update(
        intervention.id,
        {
          status,
        }
      );

      await AuditService.log({

        organisationId:
          utilisateur.organisationId,

        utilisateurId:
          utilisateur.id,

        utilisateurNom:
          utilisateur.nom,

        action: "WORKFLOW_UPDATE",

        module: "INTERVENTIONS",

        cibleId:
          intervention.id,

        cibleNom:
          intervention.nom,

        metadata: {
          ancienStatus,
          nouveauStatus:
            status,
        },

        createdAt:
          new Date().toISOString(),
      });

      setIntervention({
        ...intervention,
        status,
      });

      toast.success(
        "Workflow mis à jour"
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur workflow"
      );
    }
  };

  if (loading) {

    return (
      <main className="p-10">
        Chargement...
      </main>
    );
  }

  if (!intervention) {

    return (
      <main className="p-10">
        Intervention introuvable
      </main>
    );
  }

  return (

    <div className="p-10 space-y-8">

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <h1 className="text-4xl font-bold">

            {intervention.nom}

          </h1>

          <p className="text-gray-500 mt-2">

            Workflow intervention ERP

          </p>

        </div>

        <WorkflowStatusBadge
          status={intervention.status}
        />

      </div>

      <Card>

        <div className="space-y-6">

          <div>

            <p className="text-gray-500">
              Catégorie
            </p>

            <p className="font-semibold">
              {intervention.categorie}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Statut
            </p>

            <div className="mt-2">

              <WorkflowStatusBadge
                status={intervention.status}
              />

            </div>

          </div>

          <RoleGuard
            role={utilisateur?.role}
            permission="CAN_VALIDATE"
          >

            <div>

              <p className="text-gray-500 mb-4">
                Transitions workflow
              </p>

              <WorkflowActions
                status={intervention.status}
                onChangeStatus={
                  handleChangeStatus
                }
              />

            </div>

          </RoleGuard>

        </div>

      </Card>

    </div>
  );
}
