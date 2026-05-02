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

import { MaterielService } from "@/features/materiels/services/MaterielService";

import { Materiel } from "@/features/materiels/types/Materiel";

export default function MaterielPage() {

  const router = useRouter();

  const { user } = useAuth();

  const [items, setItems] =
    useState<Materiel[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (user) {
      loadItems();
    }

  }, [user]);

  const loadItems = async () => {

    try {

      if (!user) {
        return;
      }

      const utilisateur =
        await UtilisateurService.getById(
          user.uid
        );

      if (!utilisateur) {
        return;
      }

      const data =
        await MaterielService.getAllByOrganisation(
          utilisateur.organisationId
        );

      setItems(data as Materiel[]);

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur chargement"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async (
    id: string
  ) => {

    const confirmed =
      window.confirm(
        "Supprimer ?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await MaterielService.delete(id);

      toast.success(
        "Suppression effectuée"
      );

      setItems((prev) =>
        prev.filter(
          (item) => item.id !== id
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

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Materiels
          </h1>

        </div>

        <Link
          href="/materiels/nouveau"
          className="bg-black text-white px-4 py-3 rounded-xl"
        >
          Nouveau
        </Link>

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
        ]}
        data={items}
        actions={[
          {
            label: "Voir",
            onClick: (row) =>
              router.push(
                "/materiels/" + row.id
              ),
          },
          {
            label: "Modifier",
            onClick: (row) =>
              router.push(
                "/materiels/" +
                row.id +
                "/edit"
              ),
            className:
              "px-3 py-2 rounded-lg bg-blue-600 text-white",
          },
          {
            label: "Supprimer",
            onClick: (row) =>
              handleDelete(row.id),
            className:
              "px-3 py-2 rounded-lg bg-red-600 text-white",
          },
        ]}
      />

    </div>
  );
}
