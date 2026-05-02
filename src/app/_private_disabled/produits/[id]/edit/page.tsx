"use client";

import toast from "react-hot-toast";

import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useRouter
} from "next/navigation";

import { FormField }
from "@/components/form/FormField";

import { Button }
from "@/components/ui/Button";

import { ProduitService }
from "@/features/produits/services/ProduitService";

import { UNITE }
from "@/features/produits/types/UNITE";

export default function EditProduitPage() {

  const params = useParams();

  const router = useRouter();

  const [nom, setNom] =
    useState("");

  const [categorie,
    setCategorie] =
    useState("");

  const [unite,
    setUnite] =
    useState<UNITE>(
      UNITE.KG
    );

  const [prixUnitaire,
    setPrixUnitaire] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  useEffect(() => {

    loadProduit();

  }, []);

  const loadProduit =
    async () => {

      try {

        const produit =
          await ProduitService
            .getById(
              params.id as string
            );

        if (!produit) {

          toast.error(
            "Produit introuvable"
          );

          return;
        }

        setNom(
          produit.nom
        );

        setCategorie(
          produit.categorie
        );

        setUnite(
          produit.unite
        );

        setPrixUnitaire(
          String(
            produit.prixUnitaire
          )
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Erreur chargement"
        );
      }
    };

  const handleSave =
    async () => {

      try {

        setLoading(true);

        await ProduitService
          .update(

            params.id as string,

            {

              nom,

              categorie,

              unite,

              prixUnitaire:
                Number(
                  prixUnitaire
                ),
            }
          );

        toast.success(
          "Produit modifié"
        );

        router.push(
          "/produits"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Erreur modification"
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
          Modifier Produit
        </h1>

        <FormField
          label="Nom"
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
          onClick={handleSave}
          disabled={loading}
          className="w-full"
        >

          {
            loading
              ? "Enregistrement..."
              : "Enregistrer"
          }

        </Button>

      </div>

    </div>
  );
}