"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { FormField } from "@/components/form/FormField";

import { Button } from "@/components/ui/Button";

import { required } from "@/utils/validation/validators";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { ProduitService } from "@/features/produits/services/ProduitService";

import { AuditService } from "@/features/audit/services/AuditService";

import { UNITE } from "@/features/produits/types/UNITE";

export default function NouveauProduitPage() {

  const router = useRouter();

  const auth = useAuth();

  const user = auth?.user;

  const [nom, setNom] =
    useState("");

  const [categorie, setCategorie] =
    useState("");

  const [unite, setUnite] =
    useState<UNITE>(UNITE.KG);

  const [prixUnitaire,
    setPrixUnitaire] =
    useState("");

  const [errors, setErrors] =
    useState<any>({});

  const [loading, setLoading] =
    useState(false);

  const validate = () => {

    const newErrors: any = {};

    if (!required(nom)) {

      newErrors.nom =
        "Nom obligatoire";
    }

    if (!required(categorie)) {

      newErrors.categorie =
        "Catégorie obligatoire";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleCreate = async () => {

    try {

      if (!user) {
        return;
      }

      if (!validate()) {

        toast.error(
          "Formulaire invalide"
        );

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

      await ProduitService.create({

        id: crypto.randomUUID(),

        organisationId:
          utilisateur.organisationId,

        nom,

        categorie,

        unite,

        prix: Number(prixUnitaire),

        prixUnitaire:
          Number(prixUnitaire),

        stockActuel: 0,

        seuilAlerte: 0,

        statut: "ACTIF",

        createdAt:
          new Date(),
      });

      await AuditService.log({

        organisationId:
          utilisateur.organisationId,

        utilisateurId:
          utilisateur.id,

        utilisateurNom:
          utilisateur.nom,

        action: "CREATE",

        module: "PRODUITS",

        cibleId:
          crypto.randomUUID(),

        cibleNom: nom,

        metadata: {

          categorie,

          unite,
        },

        createdAt:
          new Date(),
      });

      toast.success(
        "Produit créé"
      );

      router.push(
        "/produits"
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

      <div
        className="
          max-w-xl
          bg-white
          rounded-2xl
          shadow-md
          p-6
          space-y-6
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Nouveau Produit
        </h1>

        <FormField
          label="Nom"
          error={errors.nom}
          inputProps={{
            value: nom,
            onChange: (e) =>
              setNom(
                e.target.value
              ),
          }}
        />

        <FormField
          label="Catégorie"
          error={errors.categorie}
          inputProps={{
            value: categorie,
            onChange: (e) =>
              setCategorie(
                e.target.value
              ),
          }}
        />

        <FormField
          label="Unité"
          inputProps={{
            value: unite,
            onChange: (e) =>
              setUnite(
                e.target.value as UNITE
              ),
          }}
        />

        <FormField
          label="Prix unitaire"
          inputProps={{
            type: "number",
            value: prixUnitaire,
            onChange: (e) =>
              setPrixUnitaire(
                e.target.value
              ),
          }}
        />

        <Button
          onClick={handleCreate}
          disabled={loading}
          className="w-full"
        >

          {
            loading
              ? "Création..."
              : "Créer"
          }

        </Button>

      </div>

    </div>
  );
}