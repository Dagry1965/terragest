Write-Host ""
Write-Host "Setting up Produits clean architecture..." `
-ForegroundColor Cyan

# =====================================================
# ROOT
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# DIRECTORIES
# =====================================================

New-Item `
  -ItemType Directory `
  -Force `
  -Path "src\features\produits\types" | Out-Null

New-Item `
  -ItemType Directory `
  -Force `
  -Path "src\features\produits\services" | Out-Null

New-Item `
  -ItemType Directory `
  -Force `
  -Path "src\features\produits\repositories" | Out-Null

New-Item `
  -ItemType Directory `
  -Force `
  -Path "src\features\stocks\types" | Out-Null

New-Item `
  -ItemType Directory `
  -Force `
  -Path "src\features\stocks\services" | Out-Null

# =====================================================
# UNITE ENUM
# =====================================================

$unite = @'
export enum UNITE {

  KG = "kg",

  TONNE = "tonne",

  LITRE = "litre",

  SAC = "sac",

  UNITE = "unite",
}
'@

Set-Content `
  -LiteralPath `
  "src\features\produits\types\UNITE.ts" `
  -Value $unite

Write-Host "Created UNITE.ts" `
  -ForegroundColor Yellow

# =====================================================
# PRODUIT TYPE
# =====================================================

$produit = @'
import { UNITE }
from "./UNITE";

export interface Produit {

  id: string;

  nom: string;

  categorie: string;

  unite: UNITE;

  prix: number;

  prixUnitaire: number;

  organisationId: string;

  stockActuel: number;

  seuilAlerte: number;

  statut: string;

  createdAt: Date;
}
'@

Set-Content `
  -LiteralPath `
  "src\features\produits\types\Produit.ts" `
  -Value $produit

Write-Host "Created Produit.ts" `
  -ForegroundColor Yellow

# =====================================================
# PRODUIT REPOSITORY
# =====================================================

$repository = @'
import type { Produit }
from "../types/Produit";

import { UNITE }
from "../types/UNITE";

export class ProduitRepository {

  static async getById(
    id: string
  ): Promise<Produit> {

    return {

      id,

      nom: "Produit demo",

      categorie: "Agricole",

      unite: UNITE.KG,

      prix: 0,

      prixUnitaire: 0,

      organisationId: "demo-org",

      stockActuel: 100,

      seuilAlerte: 10,

      statut: "ACTIF",

      createdAt: new Date(),
    };
  }

  static async create(
    data: Produit
  ) {

    return true;
  }

  static async update(
    id: string,
    data: Partial<Produit>
  ) {

    return true;
  }

  static async getAllByOrganisation(
    organisationId: string
  ): Promise<Produit[]> {

    return [];
  }

  static async delete(
    id: string
  ) {

    return true;
  }
}
'@

Set-Content `
  -LiteralPath `
  "src\features\produits\repositories\ProduitRepository.ts" `
  -Value $repository

Write-Host "Created ProduitRepository.ts" `
  -ForegroundColor Yellow

# =====================================================
# PRODUIT SERVICE
# =====================================================

$service = @'
import type { Produit }
from "../types/Produit";

import { ProduitRepository }
from "../repositories/ProduitRepository";

export class ProduitService {

  static async create(
    data: Produit
  ) {

    return ProduitRepository.create(
      data
    );
  }

  static async getAllByOrganisation(
    organisationId: string
  ) {

    return ProduitRepository
      .getAllByOrganisation(
        organisationId
      );
  }

  static async getById(
    id: string
  ) {

    return ProduitRepository
      .getById(id);
  }

  static async update(
    id: string,
    data: Partial<Produit>
  ) {

    return ProduitRepository.update(
      id,
      data
    );
  }

  static async delete(
    id: string
  ) {

    return ProduitRepository.delete(
      id
    );
  }
}
'@

Set-Content `
  -LiteralPath `
  "src\features\produits\services\ProduitService.ts" `
  -Value $service

Write-Host "Created ProduitService.ts" `
  -ForegroundColor Yellow

# =====================================================
# STOCK ENUM
# =====================================================

$mouvement = @'
export enum MOUVEMENT_STOCK {

  ENTREE = "ENTREE",

  SORTIE = "SORTIE",

  AJUSTEMENT = "AJUSTEMENT",

  TRANSFERT = "TRANSFERT",
}
'@

Set-Content `
  -LiteralPath `
  "src\features\stocks\types\MOUVEMENT_STOCK.ts" `
  -Value $mouvement

Write-Host "Created MOUVEMENT_STOCK.ts" `
  -ForegroundColor Yellow

# =====================================================
# STOCK SERVICE
# =====================================================

$stockService = @'
import type { Produit }
from "@/features/produits/types/Produit";

import { MOUVEMENT_STOCK }
from "../types/MOUVEMENT_STOCK";

export class StockService {

  static calculerNouveauStock(

    stockActuel: number,

    quantite: number,

    type: MOUVEMENT_STOCK

  ): number {

    switch (type) {

      case MOUVEMENT_STOCK.ENTREE:

        return stockActuel + quantite;

      case MOUVEMENT_STOCK.SORTIE:

        return stockActuel - quantite;

      case MOUVEMENT_STOCK.AJUSTEMENT:

        return quantite;

      default:

        return stockActuel;
    }
  }

  static verifierRupture(
    produit: Produit
  ): boolean {

    return (
      produit.stockActuel <=
      produit.seuilAlerte
    );
  }
}
'@

Set-Content `
  -LiteralPath `
  "src\features\stocks\services\StockService.ts" `
  -Value $stockService

Write-Host "Created StockService.ts" `
  -ForegroundColor Yellow

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Produits clean architecture setup completed." `
-ForegroundColor Green

Write-Host ""
Write-Host "Now run:" `
-ForegroundColor Cyan

Write-Host "pnpm build" `
-ForegroundColor White

Write-Host ""