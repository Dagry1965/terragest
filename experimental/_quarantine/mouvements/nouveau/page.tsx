"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { MouvementService } from "@/features/mouvements/services/MouvementService";

export default function NouveauMouvementPage() {

  const router = useRouter();

  const { user } = useAuth();

  const [typeMouvement, setTypeMouvement] = useState("");

  const [categorie, setCategorie] = useState("");

  const [referenceNom, setReferenceNom] = useState("");

  const [quantite, setQuantite] = useState("");

  const [unite, setUnite] = useState("");

  const [montant, setMontant] = useState("");

  const [sens, setSens] = useState("ENTREE");

  const [commentaire, setCommentaire] = useState("");

  const [loading, setLoading] = useState(false);

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

      await MouvementService.create({

        id: "",

        organisationId:
          utilisateur.organisationId,

        typeMouvement,

        categorie,

        referenceId: "",

        referenceNom,

        quantite:
          Number(quantite),

        unite,

        montant:
          Number(montant),

        sens:
          sens as "ENTREE" | "SORTIE",

        commentaire,

        createdAt:
          new Date().toISOString(),
      });

      router.push("/mouvements");

    } catch (err) {

      console.error(err);

      alert("Erreur création mouvement");

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="p-10">

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">

        <h1 className="text-2xl font-bold">
          Nouveau Mouvement
        </h1>

        <input
          type="text"
          placeholder="Type mouvement"
          className="w-full border rounded-lg p-3"
          value={typeMouvement}
          onChange={(e) => setTypeMouvement(e.target.value)}
        />

        <input
          type="text"
          placeholder="Catégorie"
          className="w-full border rounded-lg p-3"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        />

        <input
          type="text"
          placeholder="Référence"
          className="w-full border rounded-lg p-3"
          value={referenceNom}
          onChange={(e) => setReferenceNom(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantité"
          className="w-full border rounded-lg p-3"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
        />

        <input
          type="text"
          placeholder="Unité"
          className="w-full border rounded-lg p-3"
          value={unite}
          onChange={(e) => setUnite(e.target.value)}
        />

        <input
          type="number"
          placeholder="Montant"
          className="w-full border rounded-lg p-3"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
        />

        <select
          className="w-full border rounded-lg p-3"
          value={sens}
          onChange={(e) => setSens(e.target.value)}
        >

          <option value="ENTREE">
            ENTREE
          </option>

          <option value="SORTIE">
            SORTIE
          </option>

        </select>

        <textarea
          placeholder="Commentaire"
          className="w-full border rounded-lg p-3"
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-black text-white rounded-lg p-3"
        >
          {loading
            ? "Création..."
            : "Créer mouvement"}
        </button>

      </div>

    </main>
  );
}
