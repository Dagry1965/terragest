Write-Host "Generating Terragest Ressources Module..." -ForegroundColor Cyan

# =====================================================
# FEATURE STRUCTURE
# =====================================================

New-Item -ItemType Directory -Force -Path "src\features\ressources"
New-Item -ItemType Directory -Force -Path "src\features\ressources\repositories"
New-Item -ItemType Directory -Force -Path "src\features\ressources\services"
New-Item -ItemType Directory -Force -Path "src\features\ressources\types"

# =====================================================
# APP ROUTES
# =====================================================

New-Item -ItemType Directory -Force -Path "src\app\ressources"
New-Item -ItemType Directory -Force -Path "src\app\ressources\nouveau"

# =====================================================
# TYPE
# =====================================================

$ressourceType = @'
export interface Ressource {

  id: string;

  organisationId: string;

  nom: string;

  categorie: string;

  unite: string;

  coutUnitaire: number;

  stockActuel: number;

  seuilAlerte: number;

  statut: string;

  createdAt: string;
}
'@

Set-Content `
"src\features\ressources\types\Ressource.ts" `
$ressourceType

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
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { Ressource } from "../types/Ressource";

const COLLECTION_NAME = "ressources";

export const RessourceRepository = {

  async create(data: Ressource) {

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
"src\features\ressources\repositories\RessourceRepository.ts" `
$repository

# =====================================================
# SERVICE
# =====================================================

$service = @'
import { RessourceRepository } from "../repositories/RessourceRepository";

import { Ressource } from "../types/Ressource";

export const RessourceService = {

  async create(data: Ressource) {

    return RessourceRepository.create(data);
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    return RessourceRepository.getAllByOrganisation(
      organisationId
    );
  },
};
'@

Set-Content `
"src\features\ressources\services\RessourceService.ts" `
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

import { RessourceService } from "@/features/ressources/services/RessourceService";

export default function NouvelleRessourcePage() {

  const router = useRouter();

  const { user } = useAuth();

  const [nom, setNom] = useState("");

  const [categorie, setCategorie] = useState("");

  const [unite, setUnite] = useState("");

  const [coutUnitaire, setCoutUnitaire] = useState("");

  const [stockActuel, setStockActuel] = useState("");

  const [seuilAlerte, setSeuilAlerte] = useState("");

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

      await RessourceService.create({

        id: "",

        organisationId:
          utilisateur.organisationId,

        nom,

        categorie,

        unite,

        coutUnitaire:
          Number(coutUnitaire),

        stockActuel:
          Number(stockActuel),

        seuilAlerte:
          Number(seuilAlerte),

        statut: "ACTIVE",

        createdAt:
          new Date().toISOString(),
      });

      router.push("/ressources");

    } catch (err) {

      console.error(err);

      alert("Erreur création ressource");

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="p-10">

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">

        <h1 className="text-2xl font-bold">
          Nouvelle Ressource
        </h1>

        <input
          type="text"
          placeholder="Nom ressource"
          className="w-full border rounded-lg p-3"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
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
          placeholder="Unité"
          className="w-full border rounded-lg p-3"
          value={unite}
          onChange={(e) => setUnite(e.target.value)}
        />

        <input
          type="number"
          placeholder="Coût unitaire"
          className="w-full border rounded-lg p-3"
          value={coutUnitaire}
          onChange={(e) => setCoutUnitaire(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock actuel"
          className="w-full border rounded-lg p-3"
          value={stockActuel}
          onChange={(e) => setStockActuel(e.target.value)}
        />

        <input
          type="number"
          placeholder="Seuil alerte"
          className="w-full border rounded-lg p-3"
          value={seuilAlerte}
          onChange={(e) => setSeuilAlerte(e.target.value)}
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-black text-white rounded-lg p-3"
        >
          {loading
            ? "Création..."
            : "Créer ressource"}
        </button>

      </div>

    </main>
  );
}
'@

Set-Content `
"src\app\ressources\nouveau\page.tsx" `
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

import { RessourceService } from "@/features/ressources/services/RessourceService";

import { Ressource } from "@/features/ressources/types/Ressource";

export default function RessourcesPage() {

  const { user } = useAuth();

  const [ressources, setRessources] = useState<Ressource[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) {
      loadRessources();
    }

  }, [user]);

  const loadRessources = async () => {

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
        await RessourceService.getAllByOrganisation(
          utilisateur.organisationId
        );

      setRessources(data as Ressource[]);

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
          Ressources
        </h1>

        <Link
          href="/ressources/nouveau"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Nouvelle ressource
        </Link>

      </div>

      <div className="grid gap-4">

        {ressources.map((ressource) => (

          <div
            key={ressource.id}
            className="bg-white rounded-xl shadow-md p-4"
          >

            <h2 className="text-xl font-semibold">
              {ressource.nom}
            </h2>

            <p className="text-gray-500">
              Catégorie : {ressource.categorie}
            </p>

            <p className="text-gray-500">
              Unité : {ressource.unite}
            </p>

            <p className="text-gray-500">
              Stock : {ressource.stockActuel}
            </p>

            <p className="text-gray-500">
              Coût : {ressource.coutUnitaire}
            </p>

          </div>

        ))}

      </div>

    </main>
  );
}
'@

Set-Content `
"src\app\ressources\page.tsx" `
$listPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Ressources Module generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Next:" -ForegroundColor Yellow
Write-Host "1. pnpm dev"
Write-Host "2. Open /ressources"
Write-Host "3. Create ressources"
Write-Host "4. Verify Firestore collection ressources"
Write-Host ""