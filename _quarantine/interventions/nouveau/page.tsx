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
