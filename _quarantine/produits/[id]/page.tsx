"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";

import { DeleteButton } from "@/components/dialogs/DeleteButton";

import { Card } from "@/components/ui/Card";

import { SkeletonCard } from "@/components/ui/SkeletonCard";

import { EmptyState } from "@/components/ui/EmptyState";

import { ProduitService } from "@/features/produits/services/ProduitService";

import { Produit } from "@/features/produits/types/Produit";

export default function ProduitDetailPage() {

  const params = useParams();

  const [produit, setProduit] =
    useState<Produit | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadProduit();

  }, []);

  const loadProduit = async () => {

    try {

      const data =
        await ProduitService.getById(
          params.id as string
        );

      setProduit(data);

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur chargement produit"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async () => {

    if (!produit) {
      return;
    }

    await ProduitService.delete(
      produit.id
    );

    window.location.href =
      "/produits";
  };

  if (loading) {

    return (

      <div className="p-10">

        <SkeletonCard />

      </div>

    );
  }

  if (!produit) {

    return (

      <div className="p-10">

        <EmptyState
          title="Produit introuvable"
        />

      </div>

    );
  }

  return (

    <div className="p-10 space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            {produit.nom}
          </h1>

          <p className="text-gray-500 mt-2">
            Détail produit ERP
          </p>

        </div>

        <div className="flex items-center gap-3">

          <Link
            href={`/produits/${produit.id}/edit`}
            className="px-4 py-3 rounded-xl bg-black text-white"
          >
            Modifier
          </Link>

          <DeleteButton
            itemName={produit.nom}
            onDelete={handleDelete}
          />

        </div>

      </div>

      <Card>

        <div className="space-y-4">

          <div>

            <p className="text-gray-500">
              Catégorie
            </p>

            <p className="font-semibold">
              {produit.categorie}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Unité
            </p>

            <p className="font-semibold">
              {produit.unite}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Stock actuel
            </p>

            <p className="font-semibold">
              {produit.stockActuel}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Prix unitaire
            </p>

            <p className="font-semibold">
              {produit.prixUnitaire}
            </p>

          </div>

        </div>

      </Card>

    </div>
  );
}
