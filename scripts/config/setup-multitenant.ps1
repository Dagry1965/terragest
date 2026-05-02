Write-Host "Generating Terragest Multi-Tenant MVP..." -ForegroundColor Cyan

# =====================================================
# USER SERVICE
# =====================================================

$utilisateurService = @'
import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { Utilisateur } from "@/types/utilisateur";

const COLLECTION_NAME = "utilisateurs";

export const UtilisateurService = {

  async getById(id: string) {

    const ref = doc(
      db,
      COLLECTION_NAME,
      id
    );

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Utilisateur;
  },
};
'@

Set-Content `
"src\services\UtilisateurService.ts" `
$utilisateurService

# =====================================================
# TERRAIN REPOSITORY FILTERED
# =====================================================

$terrainRepository = @'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
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
"src\features\terrains\repositories\TerrainRepository.ts" `
$terrainRepository

# =====================================================
# TERRAIN SERVICE FILTERED
# =====================================================

$terrainService = @'
import { TerrainRepository } from "../repositories/TerrainRepository";

import { Terrain } from "@/types/terrain";

export const TerrainService = {

  async create(data: Terrain) {

    return TerrainRepository.create(data);
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    return TerrainRepository.getAllByOrganisation(
      organisationId
    );
  },
};
'@

Set-Content `
"src\features\terrains\services\TerrainService.ts" `
$terrainService

# =====================================================
# UPDATE TERRAINS PAGE
# =====================================================

$terrainListPage = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { useAuth } from "@/providers/AuthProvider";

import { TerrainService } from "@/features/terrains/services/TerrainService";

import { UtilisateurService } from "@/services/UtilisateurService";

import { Terrain } from "@/types/terrain";

export default function TerrainsPage() {

  const { user } = useAuth();

  const [terrains, setTerrains] = useState<Terrain[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) {
      loadTerrains();
    }

  }, [user]);

  const loadTerrains = async () => {

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
        await TerrainService.getAllByOrganisation(
          utilisateur.organisationId
        );

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
Write-Host "Terragest Multi-Tenant MVP generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT:" -ForegroundColor Yellow
Write-Host "Create Firestore collection: utilisateurs"
Write-Host "Document ID MUST = Firebase Auth UID"
Write-Host ""
Write-Host "Example fields:"
Write-Host "organisationId: org_demo"
Write-Host "nom: Admin"
Write-Host "email: admin@terragest.com"
Write-Host "role: ADMIN"
Write-Host "actif: true"
Write-Host ""