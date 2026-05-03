$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " GENERIC FIRESTORE CORE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# CREATE DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\lib\firestore",
  "$ProjectRoot\src\hooks",
  "$ProjectRoot\src\types"
)

foreach ($dir in $dirs) {

  if (!(Test-Path $dir)) {

    New-Item `
      -ItemType Directory `
      -Path $dir `
      -Force | Out-Null

    Write-Host "Created: $dir"
  }
}

# -------------------------------------------------
# BASE ENTITY
# -------------------------------------------------

$baseEntity = @'
export type BaseEntity = {
  id?: string;

  createdAt?: string;

  updatedAt?: string;
};

export type BaseAuditEntity =
BaseEntity & {

  createdBy?: string;

  updatedBy?: string;
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\types\BaseEntity.ts",
  $baseEntity
)

Write-Host "Created: BaseEntity.ts"

# -------------------------------------------------
# BASE REPOSITORY
# -------------------------------------------------

$baseRepository = @'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/config";

export class BaseRepository<T> {

  constructor(
    protected collectionName: string
  ) {}

  async create(data: T) {

    return await addDoc(
      collection(
        db,
        this.collectionName
      ),
      {
        ...data,
        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),
      }
    );
  }

  async update(
    id: string,
    data: Partial<T>
  ) {

    return await updateDoc(
      doc(
        db,
        this.collectionName,
        id
      ),
      {
        ...data,
        updatedAt:
          new Date().toISOString(),
      }
    );
  }

  async delete(id: string) {

    return await deleteDoc(
      doc(
        db,
        this.collectionName,
        id
      )
    );
  }

  async getById(id: string) {

    const snapshot =
      await getDoc(
        doc(
          db,
          this.collectionName,
          id
        )
      );

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  }

  async getAll() {

    const snapshot =
      await getDocs(
        collection(
          db,
          this.collectionName
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  }

  subscribe(
    callback: (data: any[]) => void
  ) {

    return onSnapshot(
      collection(
        db,
        this.collectionName
      ),
      (snapshot) => {

        callback(
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          )
        );
      }
    );
  }
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\lib\firestore\BaseRepository.ts",
  $baseRepository
)

Write-Host "Created: BaseRepository.ts"

# -------------------------------------------------
# GENERIC COLLECTION HOOK
# -------------------------------------------------

$useCollection = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import { BaseRepository }
from "@/lib/firestore/BaseRepository";

export function useCollection<T>(
  collectionName: string
) {

  const [data, setData] =
    useState<T[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const repository =
      new BaseRepository<T>(
        collectionName
      );

    const unsubscribe =
      repository.subscribe(
        (items) => {

          setData(items);

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, [collectionName]);

  return {
    data,
    loading,
  };
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\hooks\useCollection.ts",
  $useCollection
)

Write-Host "Created: useCollection.ts"

Write-Host ""
Write-Host "======================================="
Write-Host " FIRESTORE CORE COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. firebase deploy"
Write-Host ""