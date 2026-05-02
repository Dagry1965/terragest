"use client";

import { useEffect, useState }
from "react";

import { useParams }
from "next/navigation";

import { ProduitService }
from "@/features/produits/services/ProduitService";

import { UNITE }
from "@/features/produits/types/UNITE";

import { Button }
from "@/components/ui/Button";

export default function EditProduitPage() {

  const params = useParams();

  const [nom, setNom] =
    useState("");

  const [categorie, setCategorie] =
    useState("");

  const [unite, setUnite] =
    useState<UNITE>(UNITE.KG);

  const [prixUnitaire, setPrixUnitaire] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    async function loadProduit() {

      const produit =
        await ProduitService.getById(
          params.id as string
        );

      setNom(produit.nom);

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
    }

    loadProduit();

  }, [params.id]);

  async function handleSave() {

    try {

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

    } finally {

      setSaving(false);
    }
  }

  return (

    <div className="
      p-10
      space-y-6
    ">

      <h1 className="
        text-3xl
        font-bold
      ">

        Modifier Produit

      </h1>

      <input
        value={nom}
        onChange={(e) =>
          setNom(e.target.value)
        }
        placeholder="Nom"
        className="
          border
          p-3
          rounded-lg
          w-full
        "
      />

      <input
        value={categorie}
        onChange={(e) =>
          setCategorie(e.target.value)
        }
        placeholder="Catégorie"
        className="
          border
          p-3
          rounded-lg
          w-full
        "
      />

      <input
        value={prixUnitaire}
        onChange={(e) =>
          setPrixUnitaire(
            e.target.value
          )
        }
        placeholder="Prix unitaire"
        className="
          border
          p-3
          rounded-lg
          w-full
        "
      />

      <Button
        onClick={handleSave}
        disabled={saving}
        className="w-full"
      >

        {
          saving
            ? "Sauvegarde..."
            : "Sauvegarder"
        }

      </Button>

    </div>
  );
}