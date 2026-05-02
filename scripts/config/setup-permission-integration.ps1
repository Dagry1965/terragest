Write-Host "Generating Terragest Permission Integration..." -ForegroundColor Cyan

# =====================================================
# UPDATE INTERVENTION DETAIL PAGE
# =====================================================

$interventionPage = @'
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
'@

Set-Content `
-LiteralPath 'src\app\(private)\interventions\[id]\page.tsx' `
-Value $interventionPage

# =====================================================
# UPDATE PRODUITS PAGE
# =====================================================

$produitsPage = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { DataTable } from "@/components/data-table/DataTable";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { ProduitService } from "@/features/produits/services/ProduitService";

import { AuditService } from "@/features/audit/services/AuditService";

import { RoleGuard } from "@/features/auth/components/RoleGuard";

import { Produit } from "@/features/produits/types/Produit";

export default function ProduitsPage() {

  const router = useRouter();

  const { user } = useAuth();

  const [utilisateur,
    setUtilisateur] =
    useState<any>(null);

  const [produits, setProduits] =
    useState<Produit[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (user) {
      loadProduits();
    }

  }, [user]);

  const loadProduits = async () => {

    try {

      if (!user) {
        return;
      }

      const utilisateurData =
        await UtilisateurService.getById(
          user.uid
        );

      if (!utilisateurData) {
        return;
      }

      setUtilisateur(
        utilisateurData
      );

      const data =
        await ProduitService.getAllByOrganisation(
          utilisateurData.organisationId
        );

      setProduits(data as Produit[]);

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur chargement produits"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async (
    produitId: string
  ) => {

    if (!user || !utilisateur) {
      return;
    }

    const confirmed =
      window.confirm(
        "Supprimer ce produit ?"
      );

    if (!confirmed) {
      return;
    }

    try {

      const produit =
        produits.find(
          (item) =>
            item.id === produitId
        );

      await ProduitService.delete(
        produitId
      );

      await AuditService.log({

        organisationId:
          utilisateur.organisationId,

        utilisateurId:
          utilisateur.id,

        utilisateurNom:
          utilisateur.nom,

        action: "DELETE",

        module: "PRODUITS",

        cibleId: produitId,

        cibleNom:
          produit?.nom ?? "",

        createdAt:
          new Date().toISOString(),
      });

      toast.success(
        "Produit supprimé"
      );

      setProduits((prev) =>
        prev.filter(
          (item) =>
            item.id !== produitId
        )
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur suppression"
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

  return (

    <div className="p-10 space-y-6">

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <h1 className="text-3xl font-bold">
            Produits
          </h1>

          <p className="text-gray-500 mt-2">
            Gestion des produits
          </p>

        </div>

        <RoleGuard
          role={utilisateur?.role}
          permission="CAN_CREATE"
        >

          <Link
            href="/produits/nouveau"
            className="
              bg-black
              text-white
              px-4
              py-3
              rounded-xl
            "
          >
            Nouveau produit
          </Link>

        </RoleGuard>

      </div>

      <DataTable
        columns={[
          {
            key: "nom",
            label: "Nom",
          },
          {
            key: "categorie",
            label: "Catégorie",
          },
          {
            key: "unite",
            label: "Unité",
          },
          {
            key: "stockActuel",
            label: "Stock",
          },
          {
            key: "prixUnitaire",
            label: "Prix",
          },
        ]}
        data={produits}
        actions={[
          {
            label: "Voir",
            onClick: (row) =>
              router.push(
                `/produits/${row.id}`
              ),
          },
          {
            label: "Modifier",
            onClick: (row) =>
              router.push(
                `/produits/${row.id}/edit`
              ),
            className:
              "px-3 py-2 rounded-lg bg-blue-600 text-white",
          },
          ...(utilisateur?.role ===
            "ADMIN" ||

            utilisateur?.role ===
            "SUPERVISEUR"

            ? [
                {
                  label: "Supprimer",

                  onClick: (row: any) =>
                    handleDelete(
                      row.id
                    ),

                  className:
                    "px-3 py-2 rounded-lg bg-red-600 text-white",
                },
              ]

            : []),
        ]}
      />

    </div>
  );
}
'@

Set-Content `
"src\app\(private)\produits\page.tsx" `
$produitsPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Permission Integration generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- RoleGuard integration"
Write-Host "- Workflow permission control"
Write-Host "- Product permission control"
Write-Host "- ERP governance"
Write-Host ""