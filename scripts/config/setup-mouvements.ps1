Write-Host "Generating Terragest Mouvements Module..." -ForegroundColor Cyan

# =====================================================
# FEATURE STRUCTURE
# =====================================================

New-Item -ItemType Directory -Force -Path "src\features\mouvements"
New-Item -ItemType Directory -Force -Path "src\features\mouvements\repositories"
New-Item -ItemType Directory -Force -Path "src\features\mouvements\services"
New-Item -ItemType Directory -Force -Path "src\features\mouvements\types"

# =====================================================
# APP ROUTES
# =====================================================

New-Item -ItemType Directory -Force -Path "src\app\mouvements"
New-Item -ItemType Directory -Force -Path "src\app\mouvements\nouveau"

# =====================================================
# TYPE
# =====================================================

$mouvementType = @'
export interface Mouvement {

  id: string;

  organisationId: string;

  typeMouvement: string;

  categorie: string;

  referenceId: string;

  referenceNom: string;

  quantite: number;

  unite: string;

  montant: number;

  sens: "ENTREE" | "SORTIE";

  commentaire: string;

  createdAt: string;
}
'@

Set-Content `
"src\features\mouvements\types\Mouvement.ts" `
$mouvementType

# =====================================================
# REPOSITORY
# =====================================================

$repository = @'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { Mouvement } from "../types/Mouvement";

const COLLECTION_NAME = "mouvements";

export const MouvementRepository = {

  async create(data: Mouvement) {

    return addDoc(
      collection(db, COLLECTION_NAME),
      data
    );
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    const q = query(
      collection(db, COLLECTION_NAME),
      where(
        "organisationId",
        "==",
        organisationId
      ),
      orderBy(
        "createdAt",
        "desc"
      )
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
'@

Set-Content `
"src\features\mouvements\repositories\MouvementRepository.ts" `
$repository

# =====================================================
# SERVICE
# =====================================================

$service = @'
import { MouvementRepository } from "../repositories/MouvementRepository";

import { Mouvement } from "../types/Mouvement";

export const MouvementService = {

  async create(data: Mouvement) {

    return MouvementRepository.create(data);
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    return MouvementRepository.getAllByOrganisation(
      organisationId
    );
  },
};
'@

Set-Content `
"src\features\mouvements\services\MouvementService.ts" `
$service

# =====================================================
# CREATE PAGE
# =====================================================

$createPage = @'
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
'@

Set-Content `
"src\app\mouvements\nouveau\page.tsx" `
$createPage

# =====================================================
# LIST PAGE
# =====================================================

$listPage = @'
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
'@

Set-Content `
"src\app\mouvements\page.tsx" `
$listPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Mouvements Module generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Next:" -ForegroundColor Yellow
Write-Host "1. pnpm dev"
Write-Host "2. Open /mouvements"
Write-Host "3. Create mouvements"
Write-Host "4. Verify Firestore collection mouvements"
Write-Host ""