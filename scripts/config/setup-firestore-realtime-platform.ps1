Write-Host "Generating Terragest Firestore Realtime Platform..." -ForegroundColor Cyan

# =====================================================
# ROOT PATH
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\lib\firestore" -Force
mkdir "src\lib\firestore\repositories" -Force
mkdir "src\lib\firestore\hooks" -Force
mkdir "src\lib\firestore\services" -Force

# =====================================================
# FIRESTORE REALTIME SERVICE
# =====================================================

$realtimeService = @'
import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/firebase";

export const FirestoreRealtimeService = {

  subscribe(
    collectionName: string,
    callback: any
  ) {

    const q =
      query(
        collection(
          db,
          collectionName
        )
      );

    return onSnapshot(
      q,
      (snapshot) => {

        const data =
          snapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data(),
            })
          );

        callback(data);
      }
    );
  },
};
'@

Set-Content `
"$ROOT\src\lib\firestore\services\FirestoreRealtimeService.ts" `
$realtimeService

# =====================================================
# PRODUCTS REPOSITORY
# =====================================================

$productRepository = @'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/firebase";

const COLLECTION =
"products";

export const ProductsRepository = {

  async create(
    payload: any
  ) {

    return addDoc(
      collection(
        db,
        COLLECTION
      ),
      payload
    );
  },

  async update(
    id: string,
    payload: any
  ) {

    return updateDoc(
      doc(
        db,
        COLLECTION,
        id
      ),
      payload
    );
  },

  async delete(
    id: string
  ) {

    return deleteDoc(
      doc(
        db,
        COLLECTION,
        id
      )
    );
  },
};
'@

Set-Content `
"$ROOT\src\lib\firestore\repositories\ProductsRepository.ts" `
$productRepository

# =====================================================
# REALTIME PRODUCTS HOOK
# =====================================================

$productsHook = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  FirestoreRealtimeService,
} from "@/lib/firestore/services/FirestoreRealtimeService";

export const useRealtimeProducts =
() => {

  const [products,
    setProducts] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      FirestoreRealtimeService.subscribe(

        "products",

        (
          data: any[]
        ) => {

          setProducts(
            data
          );

          setLoading(
            false
          );
        }
      );

    return () =>
      unsubscribe();

  }, []);

  return {

    products,

    loading,
  };
}
'@

Set-Content `
"$ROOT\src\lib\firestore\hooks\useRealtimeProducts.ts" `
$productsHook

# =====================================================
# REALTIME DASHBOARD
# =====================================================

$realtimeDashboard = @'
"use client";

import {
  AppLayout,
} from "@/components/layout/AppLayout";

import {
  useRealtimeProducts,
} from "@/lib/firestore/hooks/useRealtimeProducts";

export default function RealtimeProductsPage() {

  const {
    products,
    loading,
  } =
    useRealtimeProducts();

  if (loading) {

    return (

      <AppLayout>

        <div className="
          p-10
        ">

          Loading realtime products...

        </div>

      </AppLayout>
    );
  }

  return (

    <AppLayout>

      <div className="
        p-10
        space-y-8
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          Realtime Products
        </h1>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        ">

          {products.map(
            (product) => (

              <div
                key={product.id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  p-6
                "
              >

                <h2 className="
                  text-2xl
                  font-bold
                ">

                  {product.nom}

                </h2>

                <p className="
                  text-gray-500
                  mt-2
                ">

                  {product.categorie}

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </AppLayout>
  );
}
'@

mkdir `
"$ROOT\src\app\(private)\realtime-products" `
-Force

Set-Content `
"$ROOT\src\app\(private)\realtime-products\page.tsx" `
$realtimeDashboard

# =====================================================
# REALTIME FORM
# =====================================================

$realtimeForm = @'
"use client";

import {
  useState,
} from "react";

import {
  ProductsRepository,
} from "@/lib/firestore/repositories/ProductsRepository";

export const ProductRealtimeForm = () => {

  const [nom,
    setNom] =
    useState("");

  const [categorie,
    setCategorie] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleSubmit =
    async () => {

      try {

        setLoading(true);

        await ProductsRepository.create({

          nom,

          categorie,

          createdAt:
            new Date(),
        });

        setNom("");

        setCategorie("");

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-8
      space-y-4
    ">

      <h1 className="
        text-3xl
        font-bold
      ">
        Nouveau Produit
      </h1>

      <input
        placeholder="Nom"
        value={nom}
        onChange={(e) =>
          setNom(
            e.target.value
          )
        }
        className="
          w-full
          border
          rounded-xl
          px-4
          py-3
        "
      />

      <input
        placeholder="Categorie"
        value={categorie}
        onChange={(e) =>
          setCategorie(
            e.target.value
          )
        }
        className="
          w-full
          border
          rounded-xl
          px-4
          py-3
        "
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          bg-black
          text-white
          px-6
          py-3
          rounded-xl
        "
      >

        {loading
          ? "Creation..."
          : "Créer"}

      </button>

    </div>
  );
}
'@

Set-Content `
"$ROOT\src\components\ui\ProductRealtimeForm.tsx" `
$realtimeForm

# =====================================================
# FIRESTORE RULES DOC
# =====================================================

$rulesDoc = @'
rules_version = '2';

service cloud.firestore {

  match /databases/{database}/documents {

    match /products/{document} {

      allow read, write:
      if request.auth != null;
    }
  }
}
'@

Set-Content `
"$ROOT\docs\FIRESTORE_RULES_EXAMPLE.txt" `
$rulesDoc

# =====================================================
# DOCUMENTATION
# =====================================================

$realtimeDoc = @'
# Terragest Firestore Realtime Platform

## Features

- Firestore realtime subscriptions
- Live products dashboard
- Dynamic CRUD forms
- Realtime updates
- Firebase synchronization

--------------------------------------------------

## Architecture

- FirestoreRealtimeService
- Realtime hooks
- Firestore repositories
- Live dashboards

--------------------------------------------------

## Benefits

- Live synchronization
- Multi-user realtime
- Dynamic dashboards
- Enterprise realtime architecture
'@

Set-Content `
"$ROOT\docs\FIRESTORE_REALTIME.md" `
$realtimeDoc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Firestore Realtime Platform generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Firestore realtime subscriptions"
Write-Host "- Realtime repositories"
Write-Host "- Live dashboards"
Write-Host "- Dynamic realtime forms"
Write-Host "- Enterprise realtime architecture"
Write-Host ""