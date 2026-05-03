"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { MouvementService } from "@/features/mouvements/services/MouvementService";

import { Mouvement } from "@/features/mouvements/types/Mouvement";

export default function MouvementsPage() {

  const { user } = useAuth();

  const [mouvements, setMouvements] = useState<Mouvement[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) {
      loadMouvements();
    }

  }, [user]);

  const loadMouvements = async () => {

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
        await MouvementService.getAllByOrganisation(
          utilisateur.organisationId
        );

      setMouvements(data as Mouvement[]);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

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

    <main className="p-10 space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Mouvements
        </h1>

        <Link
          href="/mouvements/nouveau"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Nouveau mouvement
        </Link>

      </div>

      <div className="grid gap-4">

        {mouvements.map((mouvement) => (

          <div
            key={mouvement.id}
            className="bg-white rounded-xl shadow-md p-4"
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                {mouvement.typeMouvement}
              </h2>

              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {mouvement.sens}
              </span>

            </div>

            <p className="text-gray-500">
              Catégorie : {mouvement.categorie}
            </p>

            <p className="text-gray-500">
              Référence : {mouvement.referenceNom}
            </p>

            <p className="text-gray-500">
              Quantité : {mouvement.quantite} {mouvement.unite}
            </p>

            <p className="text-gray-500">
              Montant : {mouvement.montant}
            </p>

            <p className="text-gray-500">
              Commentaire : {mouvement.commentaire}
            </p>

          </div>

        ))}

      </div>

    </main>
  );
}
