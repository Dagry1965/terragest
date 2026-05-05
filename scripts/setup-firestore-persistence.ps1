# =========================================================
# TERRAGEST - FIRESTORE PERSISTENCE
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " FIRESTORE PERSISTENCE"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\infrastructure\firebase",

  ".\src\infrastructure\repositories",

  ".\src\infrastructure\repositories\firestore"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"
  }
}

# =========================================================
# FIREBASE CLIENT
# =========================================================

$firebase = @'
// src/infrastructure/firebase/firebase.ts

import { initializeApp }
from "firebase/app";

import {
  getFirestore
}
from "firebase/firestore";

const firebaseConfig = {

  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,

  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app =
  initializeApp(
    firebaseConfig
  );

export const db =
  getFirestore(app);
'@

Set-Content `
  ".\src\infrastructure\firebase\firebase.ts" `
  $firebase

Write-Host ""
Write-Host "[CREATED] firebase.ts"

# =========================================================
# GENERIC REPOSITORY
# =========================================================

$repository = @'
// src/infrastructure/repositories/firestore/BaseFirestoreRepository.ts

import {

  addDoc,

  collection,

  doc,

  getDoc,

  getDocs,

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
}
'@

Set-Content `
  ".\src\infrastructure\repositories\firestore\BaseFirestoreRepository.ts" `
  $repository

Write-Host "[CREATED] BaseFirestoreRepository.ts"

# =========================================================
# MATERIAL REPOSITORY
# =========================================================

$materialRepository = @'
// src/domains/materiels/repositories/MaterielsRepository.ts

import {
  BaseFirestoreRepository
}
from "@/infrastructure/repositories/firestore/BaseFirestoreRepository";

import {
  MaterielItem
}
from "@/domains/materiels/store/MaterielsStore";

export class MaterielsRepository
extends BaseFirestoreRepository<MaterielItem> {

  constructor() {

    super(
      "materiels"
    );
  }
}

export const materielsRepository =
  new MaterielsRepository();
'@

New-Item `
  -ItemType Directory `
  -Path ".\src\domains\materiels\repositories" `
  -Force `
  | Out-Null

Set-Content `
  ".\src\domains\materiels\repositories\MaterielsRepository.ts" `
  $materialRepository

Write-Host "[CREATED] MaterielsRepository.ts"

# =========================================================
# ENV TEMPLATE
# =========================================================

$env = @'
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
'@

Set-Content `
  ".\.env.local.example" `
  $env

Write-Host "[CREATED] .env.local.example"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " FIRESTORE READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host "1. Configure Firebase"
Write-Host "2. Copy .env.local.example -> .env.local"
Write-Host "3. Fill Firebase keys"
Write-Host "4. pnpm add firebase"
Write-Host "5. pnpm build"
Write-Host ""