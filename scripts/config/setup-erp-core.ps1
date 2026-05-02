Write-Host "Generating Terragest ERP Core..." -ForegroundColor Cyan

# =====================================================
# ORGANISATION REPOSITORY
# =====================================================

$organisationRepository = @'
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { Organisation } from "@/types/organisation";

const COLLECTION_NAME = "organisations";

export const OrganisationRepository = {

  async create(data: Organisation) {

    return addDoc(
      collection(db, COLLECTION_NAME),
      data
    );
  },

  async getAll() {

    const snapshot = await getDocs(
      collection(db, COLLECTION_NAME)
    );

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
'@

Set-Content `
"src\features\organisations\repositories\OrganisationRepository.ts" `
$organisationRepository

# =====================================================
# TERRAIN REPOSITORY
# =====================================================

$terrainRepository = @'
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { Terrain } from "@/types/terrain";

const COLLECTION_NAME = "terrains";

export const TerrainRepository = {

  async create(data: Terrain) {

    return addDoc(
      collection(db, COLLECTION_NAME),
      data
    );
  },

  async getAll() {

    const snapshot = await getDocs(
      collection(db, COLLECTION_NAME)
    );

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
'@

Set-Content `
"src\features\terrains\repositories\TerrainRepository.ts" `
$terrainRepository

# =====================================================
# TERRAIN SERVICE
# =====================================================

$terrainService = @'
import { TerrainRepository } from "../repositories/TerrainRepository";

import { Terrain } from "@/types/terrain";

export const TerrainService = {

  async create(data: Terrain) {

    return TerrainRepository.create(data);
  },

  async getAll() {

    return TerrainRepository.getAll();
  },
};
'@

Set-Content `
"src\features\terrains\services\TerrainService.ts" `
$terrainService

# =====================================================
# TERRAIN CREATE PAGE
# =====================================================

New-Item -ItemType Directory -Force -Path "src\app\terrains"
New-Item -ItemType Directory -Force -Path "src\app\terrains\nouveau"

$terrainCreatePage = @'
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { TerrainService } from "@/features/terrains/services/TerrainService";

export default function NouveauTerrainPage() {

  const router = useRouter();

  const [nom, setNom] = useState("");

  const [surfaceTotale, setSurfaceTotale] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {

    try {

      setLoading(true);

      await TerrainService.create({
        id: "",
        organisationId: "org_demo",
        nom,
        surfaceTotale: Number(surfaceTotale),
        statut: "ACTIF",
      });

      router.push("/terrains");

    } catch (err) {

      console.error(err);

      alert("Erreur création terrain");

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="p-10">

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">

        <h1 className="text-2xl font-bold">
          Nouveau Terrain
        </h1>

        <input
          type="text"
          placeholder="Nom terrain"
          className="w-full border rounded-lg p-3"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <input
          type="number"
          placeholder="Surface totale"
          className="w-full border rounded-lg p-3"
          value={surfaceTotale}
          onChange={(e) => setSurfaceTotale(e.target.value)}
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-black text-white rounded-lg p-3"
        >
          {loading
            ? "Création..."
            : "Créer terrain"}
        </button>

      </div>

    </main>
  );
}
'@

Set-Content `
"src\app\terrains\nouveau\page.tsx" `
$terrainCreatePage

# =====================================================
# TERRAIN LIST PAGE
# =====================================================

$terrainListPage = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { TerrainService } from "@/features/terrains/services/TerrainService";

import { Terrain } from "@/types/terrain";

export default function TerrainsPage() {

  const [terrains, setTerrains] = useState<Terrain[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadTerrains();

  }, []);

  const loadTerrains = async () => {

    try {

      const data = await TerrainService.getAll();

      setTerrains(data as Terrain[]);

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
          Terrains
        </h1>

        <Link
          href="/terrains/nouveau"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Nouveau terrain
        </Link>

      </div>

      <div className="grid gap-4">

        {terrains.map((terrain) => (

          <div
            key={terrain.id}
            className="bg-white rounded-xl shadow-md p-4"
          >

            <h2 className="text-xl font-semibold">
              {terrain.nom}
            </h2>

            <p className="text-gray-500">
              Surface : {terrain.surfaceTotale}
            </p>

            <p className="text-gray-500">
              Statut : {terrain.statut}
            </p>

          </div>

        ))}

      </div>

    </main>
  );
}
'@

Set-Content `
"src\app\terrains\page.tsx" `
$terrainListPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest ERP Core generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Next:" -ForegroundColor Yellow
Write-Host "1. pnpm dev"
Write-Host "2. Open /terrains"
Write-Host "3. Create terrains"
Write-Host "4. Verify Firestore"
Write-Host ""