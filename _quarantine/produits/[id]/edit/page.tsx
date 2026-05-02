"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import { FormField } from "@/components/form/FormField";

import { Button } from "@/components/ui/Button";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { ProduitService } from "@/features/produits/services/ProduitService";

import { AuditService } from "@/features/audit/services/AuditService";

export default function EditProduitPage() {

  const params = useParams();

  const router = useRouter();

  const { user } = useAuth();

  const [nom, setNom] =
    useState("");

  const [categorie, setCategorie] =
    useState("");

  const [unite, setUnite] =
    useState("");

  const [prixUnitaire,
    setPrixUnitaire] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    loadProduit();

  }, []);

  const loadProduit = async () => {

    try {

      const produit =
        await ProduitService.getById(
          params.id as string
        );

      if (!produit) {
        return;
      }

      setNom(produit.nom);

      setCategorie(
        produit.categorie
      );

      setUnite(produit.unite);

      setPrixUnitaire(
        String(
          produit.prixUnitaire
        )
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur chargement produit"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleSave = async () => {

    try {

      if (!user) {
        return;
      }

      setSaving(true);

      await ProduitService.update(
        params.id as string,
        {
          nom,
          categorie,
          unite,
          prixUnitaire:
            Number(prixUnitaire),
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

          action: "UPDATE",

          module: "PRODUITS",

          cibleId:
            params.id as string,

          cibleNom: nom,

          metadata: {
            categorie,
            unite,
          },

          createdAt:
            new Date().toISOString(),
        });
      }

      toast.success(
        "Produit modifié"
      );

      router.push(
        `/produits/${params.id}`
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur modification"
      );

    } finally {

      setSaving(false);

    }
  };

  if (loading) {

    return (
      <div className="p-10">
        Chargement...
      </div>
    );
  }

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
            Modifier Produit
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

        <FormField
          label="Unité"
          inputProps={{
            value: unite,
            onChange: (e) =>
              setUnite(
                e.target.value
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
          onClick={handleSave}
          disabled={saving}
          className="w-full"
        >
          {saving
            ? "Sauvegarde..."
            : "Sauvegarder"}
        </Button>

      </div>

    </div>
  );
}
