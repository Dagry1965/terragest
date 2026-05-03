$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " PRODUITS MODULE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# CREATE DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\produits\types",
  "$ProjectRoot\src\features\produits\repositories",
  "$ProjectRoot\src\features\produits\services",
  "$ProjectRoot\src\features\produits\hooks"
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
# PRODUCT TYPE
# -------------------------------------------------

$productType = @'
import {
  BaseAuditEntity,
}
from "@/types/BaseEntity";

export type Product =
BaseAuditEntity & {

  nom: string;

  categorie: string;

  unite: string;

  quantite: number;

  prix: number;

  actif: boolean;
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\produits\types\Product.ts",
  $productType
)

Write-Host "Created: Product.ts"

# -------------------------------------------------
# PRODUCTS REPOSITORY
# -------------------------------------------------

$repository = @'
import { BaseRepository }
from "@/lib/firestore/BaseRepository";

import { Product }
from "@/features/produits/types/Product";

class ProductsRepositoryClass
extends BaseRepository<Product> {

  constructor() {

    super("produits");
  }
}

export const ProductsRepository =
  new ProductsRepositoryClass();
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\produits\repositories\ProductsRepository.ts",
  $repository
)

Write-Host "Created: ProductsRepository.ts"

# -------------------------------------------------
# PRODUCT SERVICE
# -------------------------------------------------

$service = @'
import { Product }
from "@/features/produits/types/Product";

import { ProductsRepository }
from "@/features/produits/repositories/ProductsRepository";

export const ProductService = {

  async create(
    product: Product
  ) {

    if (!product.nom) {

      throw new Error(
        "Nom obligatoire"
      );
    }

    if (product.prix < 0) {

      throw new Error(
        "Prix invalide"
      );
    }

    return await ProductsRepository.create(
      product
    );
  },

  async getAll() {

    return await ProductsRepository.getAll();
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\produits\services\ProductService.ts",
  $service
)

Write-Host "Created: ProductService.ts"

# -------------------------------------------------
# USE PRODUCTS HOOK
# -------------------------------------------------

$hook = @'
"use client";

import { useCollection }
from "@/hooks/useCollection";

import { Product }
from "@/features/produits/types/Product";

export function useProducts() {

  return useCollection<Product>(
    "produits"
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\produits\hooks\useProducts.ts",
  $hook
)

Write-Host "Created: useProducts.ts"

Write-Host ""
Write-Host "======================================="
Write-Host " PRODUITS MODULE COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. firebase deploy"
Write-Host ""