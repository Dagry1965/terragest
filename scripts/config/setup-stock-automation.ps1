Write-Host "Generating Terragest Stock Automation..." -ForegroundColor Cyan

# =====================================================
# UPDATE RESSOURCE REPOSITORY
# =====================================================

$ressourceRepository = @'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
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

  async updateStock(
    id: string,
    stockActuel: number
  ) {

    const ref = doc(
      db,
      COLLECTION_NAME,
      id
    );

    await updateDoc(ref, {
      stockActuel,
    });
  },

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
    } as Ressource;
  },
};
'@

Set-Content `
"src\features\ressources\repositories\RessourceRepository.ts" `
$ressourceRepository

# =====================================================
# UPDATE PRODUIT REPOSITORY
# =====================================================

$produitRepository = @'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
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

  async updateStock(
    id: string,
    stockActuel: number
  ) {

    const ref = doc(
      db,
      COLLECTION_NAME,
      id
    );

    await updateDoc(ref, {
      stockActuel,
    });
  },

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
    } as Produit;
  },
};
'@

Set-Content `
"src\features\produits\repositories\ProduitRepository.ts" `
$produitRepository

# =====================================================
# STOCK SERVICE
# =====================================================

New-Item -ItemType Directory -Force -Path "src\services"

$stockService = @'
import { RessourceRepository } from "@/features/ressources/repositories/RessourceRepository";

import { ProduitRepository } from "@/features/produits/repositories/ProduitRepository";

export const StockService = {

  async applyMouvement(
    categorie: string,
    referenceId: string,
    sens: string,
    quantite: number
  ) {

    if (categorie === "RESSOURCE") {

      const ressource =
        await RessourceRepository.getById(
          referenceId
        );

      if (!ressource) {
        return;
      }

      const nouveauStock =
        sens === "ENTREE"
          ? ressource.stockActuel + quantite
          : ressource.stockActuel - quantite;

      await RessourceRepository.updateStock(
        referenceId,
        nouveauStock
      );
    }

    if (categorie === "PRODUIT") {

      const produit =
        await ProduitRepository.getById(
          referenceId
        );

      if (!produit) {
        return;
      }

      const nouveauStock =
        sens === "ENTREE"
          ? produit.stockActuel + quantite
          : produit.stockActuel - quantite;

      await ProduitRepository.updateStock(
        referenceId,
        nouveauStock
      );
    }
  },
};
'@

Set-Content `
"src\services\StockService.ts" `
$stockService

# =====================================================
# UPDATE MOUVEMENT SERVICE
# =====================================================

$mouvementService = @'
import { MouvementRepository } from "../repositories/MouvementRepository";

import { Mouvement } from "../types/Mouvement";

import { StockService } from "@/services/StockService";

export const MouvementService = {

  async create(data: Mouvement) {

    await MouvementRepository.create(data);

    await StockService.applyMouvement(
      data.categorie,
      data.referenceId,
      data.sens,
      data.quantite
    );
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
$mouvementService

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Stock Automation generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT:" -ForegroundColor Yellow
Write-Host "referenceId MUST contain"
Write-Host "real produit/ressource document ID"
Write-Host ""
Write-Host "ENTREE => stock +"
Write-Host "SORTIE => stock -"
Write-Host ""