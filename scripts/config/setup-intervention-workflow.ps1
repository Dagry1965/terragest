Write-Host "Generating Terragest Intervention Workflow..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\app\(private)\interventions\[id]" -Force

# =====================================================
# INTERVENTION DETAIL PAGE
# =====================================================

$interventionDetail = @'
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

export default function InterventionDetailPage() {

  const params = useParams();

  const { user } = useAuth();

  const [intervention,
    setIntervention] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadIntervention();

  }, []);

  const loadIntervention = async () => {

    try {

      const data =
        await InterventionService.getById(
          params.id as string
        );

      setIntervention(data);

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

      if (!user || !intervention) {
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

      const utilisateur =
        await UtilisateurService.getById(
          user.uid
        );

      if (utilisateur) {

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
      }

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

        </div>

      </Card>

    </div>
  );
}
'@

Set-Content `
-LiteralPath 'src\app\(private)\interventions\[id]\page.tsx' `
-Value $interventionDetail

# =====================================================
# UPDATE INTERVENTION NEW PAGE
# =====================================================

$newInterventionPage = @'
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";

import { FormField } from "@/components/form/FormField";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { InterventionService } from "@/features/interventions/services/InterventionService";

import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";

export default function NouveauInterventionPage() {

  const router = useRouter();

  const { user } = useAuth();

  const [nom, setNom] =
    useState("");

  const [categorie,
    setCategorie] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleCreate = async () => {

    try {

      if (!user) {
        return;
      }

      setLoading(true);

      const utilisateur =
        await UtilisateurService.getById(
          user.uid
        );

      if (!utilisateur) {
        return;
      }

      await InterventionService.create({

        organisationId:
          utilisateur.organisationId,

        nom,

        categorie,

        status:
          WorkflowStatus.BROUILLON,

        createdAt:
          new Date().toISOString(),
      });

      toast.success(
        "Intervention créée"
      );

      router.push(
        "/interventions"
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur création"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="p-10">

      <div className="
        max-w-xl
        bg-white
        rounded-2xl
        shadow-md
        p-6
        space-y-6
      ">

        <div>

          <h1 className="text-3xl font-bold">
            Nouvelle Intervention
          </h1>

        </div>

        <FormField
          label="Nom"
          inputProps={{
            value: nom,
            onChange: (e) =>
              setNom(e.target.value),
          }}
        />

        <FormField
          label="Catégorie"
          inputProps={{
            value: categorie,
            onChange: (e) =>
              setCategorie(
                e.target.value
              ),
          }}
        />

        <Button
          onClick={handleCreate}
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Création..."
            : "Créer"}
        </Button>

      </div>

    </div>
  );
}
'@

Set-Content `
"src\app\(private)\interventions\nouveau\page.tsx" `
$newInterventionPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Intervention Workflow generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Intervention workflow"
Write-Host "- Workflow transitions"
Write-Host "- Workflow badges"
Write-Host "- ERP state machine"
Write-Host ""