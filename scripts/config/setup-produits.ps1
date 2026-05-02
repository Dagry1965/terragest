Write-Host "Generating Terragest Produits Module..." -ForegroundColor Cyan

# =====================================================
# FEATURE STRUCTURE
# =====================================================

New-Item -ItemType Directory -Force -Path "src\features\produits"
New-Item -ItemType Directory -Force -Path "src\features\produits\repositories"
New-Item -ItemType Directory -Force -Path "src\features\produits\services"
New-Item -ItemType Directory -Force -Path "src\features\produits\types"

# =====================================================
# APP ROUTES
# =====================================================

New-Item -ItemType Directory -Force -Path "src\app\produits"
New-Item -ItemType Directory -Force -Path "src\app\produits\nouveau"

# =====================================================
# TYPE
# =====================================================

$produitType = @'
export interface Produit {

  id: string;

  organisationId: string;

  nom: string;

  categorie: string;

  unite: string;

  prixUnitaire: number;

  stockActuel: number;

  seuilAlerte: number;

  statut: string;

  createdAt: string;
}
'@

Set-Content `
"src\features\produits\types\Produit.ts" `
$produitType

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

import { Produit } from "../types/Produit";

const COLLECTION_NAME = "produits";

export const ProduitRepository = {

  async create(data: Produit) {

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
"src\features\produits\repositories\ProduitRepository.ts" `
$repository

# =====================================================
# SERVICE
# =====================================================

$service = @'
import { ProduitRepository } from "../repositories/ProduitRepository";

import { Produit } from "../types/Produit";

export const ProduitService = {

  async create(data: Produit) {

    return ProduitRepository.create(data);
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    return ProduitRepository.getAllByOrganisation(
      organisationId
    );
  },
};
'@

Set-Content `
"src\features\produits\services\ProduitService.ts" `
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

import { ProduitService } from "@/features/produits/services/ProduitService";

export default function NouveauProduitPage() {

  const router = useRouter();

  const { user } = useAuth();

  const [nom, setNom] = useState("");

  const [categorie, setCategorie] = useState("");

  const [unite, setUnite] = useState("");

  const [prixUnitaire, setPrixUnitaire] = useState("");

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

      await ProduitService.create({

        id: "",

        organisationId:
          utilisateur.organisationId,

        nom,

        categorie,

        unite,

        prixUnitaire:
          Number(prixUnitaire),

        stockActuel:
          Number(stockActuel),

        seuilAlerte:
          Number(seuilAlerte),

        statut: "ACTIF",

        createdAt:
          new Date().toISOString(),
      });

      router.push("/produits");

    } catch (err) {

      console.error(err);

      alert("Erreur création produit");

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="p-10">

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">

        <h1 className="text-2xl font-bold">
          Nouveau Produit
        </h1>

        <input
          type="text"
          placeholder="Nom produit"
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
          placeholder="Prix unitaire"
          className="w-full border rounded-lg p-3"
          value={prixUnitaire}
          onChange={(e) => setPrixUnitaire(e.target.value)}
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
            : "Créer produit"}
        </button>

      </div>

    </main>
  );
}
'@

Set-Content `
"src\app\produits\nouveau\page.tsx" `
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

import { ProduitService } from "@/features/produits/services/ProduitService";

import { Produit } from "@/features/produits/types/Produit";

export default function ProduitsPage() {

  const { user } = useAuth();

  const [produits, setProduits] = useState<Produit[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) {
      loadProduits();
    }

  }, [user]);

  const loadProduits = async () => {

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
        await ProduitService.getAllByOrganisation(
          utilisateur.organisationId
        );

      setProduits(data as Produit[]);

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
          Produits
        </h1>

        <Link
          href="/produits/nouveau"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Nouveau produit
        </Link>

      </div>

      <div className="grid gap-4">

        {produits.map((produit) => (

          <div
            key={produit.id}
            className="bg-white rounded-xl shadow-md p-4"
          >

            <h2 className="text-xl font-semibold">
              {produit.nom}
            </h2>

            <p className="text-gray-500">
              Catégorie : {produit.categorie}
            </p>

            <p className="text-gray-500">
              Unité : {produit.unite}
            </p>

            <p className="text-gray-500">
              Stock : {produit.stockActuel}
            </p>

            <p className="text-gray-500">
              Prix : {produit.prixUnitaire}
            </p>

          </div>

        ))}

      </div>

    </main>
  );
}
'@

Set-Content `
"src\app\produits\page.tsx" `
$listPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Produits Module generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Next:" -ForegroundColor Yellow
Write-Host "1. pnpm dev"
Write-Host "2. Open /produits"
Write-Host "3. Create produits"
Write-Host "4. Verify Firestore collection produits"
Write-Host ""