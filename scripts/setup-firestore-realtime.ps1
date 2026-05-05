# =========================================================
# TERRAGEST - FIRESTORE REALTIME
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " FIRESTORE REALTIME"
Write-Host "========================================="
Write-Host ""

# =========================================================
# UPDATE BASE REPOSITORY
# =========================================================

$repository = @'
// src/infrastructure/repositories/firestore/BaseFirestoreRepository.ts

import {

  addDoc,

  collection,

  doc,

  getDoc,

  getDocs,

  onSnapshot,

  updateDoc
}
from "firebase/firestore";

import { db }
from "@/infrastructure/firebase/firebase";

export class BaseFirestoreRepository<T> {

  constructor(

    private collectionName:
      string
  ) {}

  async create(
    data: T
  ) {

    return addDoc(

      collection(
        db,
        this.collectionName
      ),

      data as object
    );
  }

  async findAll() {

    const snapshot =
      await getDocs(

        collection(
          db,
          this.collectionName
        )
      );

    return snapshot.docs.map(
      doc => ({

        id:
          doc.id,

        ...doc.data()
      })
    );
  }

  async findById(
    id: string
  ) {

    const snapshot =
      await getDoc(

        doc(
          db,
          this.collectionName,
          id
        )
      );

    if (!snapshot.exists()) {

      return null;
    }

    return {

      id:
        snapshot.id,

      ...snapshot.data()
    };
  }

  async update(

    id: string,

    data: Partial<T>
  ) {

    await updateDoc(

      doc(
        db,
        this.collectionName,
        id
      ),

      data as object
    );
  }

  subscribe(
    callback:
      (data: unknown[]) => void
  ) {

    return onSnapshot(

      collection(
        db,
        this.collectionName
      ),

      snapshot => {

        const data =
          snapshot.docs.map(
            doc => ({

              id:
                doc.id,

              ...doc.data()
            })
          );

        callback(data);
      }
    );
  }
}
'@

Set-Content `
  ".\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts" `
  $repository

Write-Host ""
Write-Host "[UPDATED] BaseFirestoreRepository.ts"

# =========================================================
# UPDATE MATERIAL STORE
# =========================================================

$materialStore = @'
// src/domains/materiels/store/MaterielsStore.ts

import {
  materielsRepository
}
from "@/domains/materiels/repositories/MaterielsRepository";

export interface MaterielItem {

  id: string;

  nom: string;

  statut: string;

  historique:
    string[];
}

class MaterielsStoreManager {

  private items:
    MaterielItem[] = [];

  async load() {

    const data =
      await materielsRepository
        .findAll();

    this.items =
      data as MaterielItem[];

    console.log(
      "[MATERIELS LOADED]",
      this.items.length
    );
  }

  subscribe() {

    materielsRepository.subscribe(

      data => {

        this.items =
          data as MaterielItem[];

        console.log(
          "[MATERIELS REALTIME]",
          this.items.length
        );
      }
    );
  }

  async add(
    item: MaterielItem
  ) {

    this.items.unshift(
      item
    );

    await materielsRepository
      .create(item);

    console.log(
      "[MATERIEL CREATED]",
      item.nom
    );
  }

  find(
    id: string
  ) {

    return this.items.find(
      item =>
        item.id === id
    );
  }

  async setStatus(

    id: string,

    statut: string
  ) {

    const item =
      this.find(id);

    if (!item) {

      return;
    }

    item.statut =
      statut;

    item.historique.unshift(

      `${new Date().toLocaleString()} - ${statut}`
    );

    await materielsRepository
      .update(id, {

        statut,

        historique:
          item.historique
      });
  }

  all() {

    return this.items;
  }
}

export const MaterielsStore =
  new MaterielsStoreManager();
'@

Set-Content `
  ".\src\domains\materiels\store\MaterielsStore.ts" `
  $materialStore

Write-Host "[UPDATED] MaterielsStore.ts"

# =========================================================
# UPDATE RUNTIME BOOTSTRAP
# =========================================================

$bootstrap = @'
// src/platform/runtime/RuntimeBootstrap.ts

import { MaterielsStore }
from "@/domains/materiels/store/MaterielsStore";

export class RuntimeBootstrap {

  static async initialize() {

    console.log(
      "[BOOTSTRAP] Runtime initialization"
    );

    await MaterielsStore.load();

    MaterielsStore.subscribe();

    console.log(
      "[BOOTSTRAP] Runtime realtime ready"
    );
  }
}
'@

Set-Content `
  ".\src\platform\runtime\RuntimeBootstrap.ts" `
  $bootstrap

Write-Host "[UPDATED] RuntimeBootstrap.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " FIRESTORE REALTIME READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-firestore-realtime.ps1"
Write-Host "pnpm build"
Write-Host ""