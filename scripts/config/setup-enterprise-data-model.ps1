Write-Host "Generating Terragest Enterprise Data Model..." -ForegroundColor Cyan

# =====================================================
# ROOT PATH
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "docs" -Force
mkdir "src\shared" -Force
mkdir "src\shared\types" -Force
mkdir "src\shared\constants" -Force

# =====================================================
# ORGANISATION MODEL
# =====================================================

$organisationModel = @'
export interface Organisation {

  id: string;

  nom: string;

  type: "HOLDING" |
        "FILIALE" |
        "COOPERATIVE" |
        "EXPLOITATION";

  parentOrganisationId?: string;

  pays: string;

  devise: string;

  timezone: string;

  actif: boolean;

  createdAt: string;

  updatedAt: string;
}
'@

Set-Content `
"$ROOT\src\shared\types\Organisation.ts" `
$organisationModel

# =====================================================
# USER MODEL
# =====================================================

$userModel = @'
export interface User {

  id: string;

  organisationId: string;

  nom: string;

  prenom: string;

  email: string;

  telephone?: string;

  role:
    | "SUPER_ADMIN"
    | "ADMIN"
    | "MANAGER"
    | "OPERATEUR"
    | "TECHNICIEN";

  actif: boolean;

  dernierLogin?: string;

  createdAt: string;

  updatedAt: string;
}
'@

Set-Content `
"$ROOT\src\shared\types\User.ts" `
$userModel

# =====================================================
# EXPLOITATION MODEL
# =====================================================

$exploitationModel = @'
export interface Exploitation {

  id: string;

  organisationId: string;

  nom: string;

  type:
    | "AGRICOLE"
    | "ELEVAGE"
    | "MIXTE";

  superficie?: number;

  localisation?: string;

  responsableId?: string;

  actif: boolean;

  createdAt: string;

  updatedAt: string;
}
'@

Set-Content `
"$ROOT\src\shared\types\Exploitation.ts" `
$exploitationModel

# =====================================================
# TERRAIN MODEL
# =====================================================

$terrainModel = @'
export interface Terrain {

  id: string;

  organisationId: string;

  exploitationId: string;

  nom: string;

  superficie: number;

  culture?: string;

  latitude?: number;

  longitude?: number;

  statut:
    | "ACTIF"
    | "EN_PREPARATION"
    | "EN_REPOS";

  createdAt: string;

  updatedAt: string;
}
'@

Set-Content `
"$ROOT\src\shared\types\Terrain.ts" `
$terrainModel

# =====================================================
# PRODUCT MODEL
# =====================================================

$productModel = @'
export interface Product {

  id: string;

  organisationId: string;

  nom: string;

  categorie:
    | "AGRICOLE"
    | "ANIMAL"
    | "MATERIEL"
    | "CONSOMMABLE";

  unite: string;

  prixUnitaire?: number;

  stockActuel?: number;

  seuilAlerte?: number;

  actif: boolean;

  createdAt: string;

  updatedAt: string;
}
'@

Set-Content `
"$ROOT\src\shared\types\Product.ts" `
$productModel

# =====================================================
# STOCK MOVEMENT MODEL
# =====================================================

$movementModel = @'
export interface StockMovement {

  id: string;

  organisationId: string;

  produitId: string;

  type:
    | "ENTREE"
    | "SORTIE"
    | "TRANSFERT";

  quantite: number;

  reference?: string;

  commentaire?: string;

  createdBy: string;

  createdAt: string;
}
'@

Set-Content `
"$ROOT\src\shared\types\StockMovement.ts" `
$movementModel

# =====================================================
# EQUIPMENT MODEL
# =====================================================

$equipmentModel = @'
export interface Equipment {

  id: string;

  organisationId: string;

  nom: string;

  type: string;

  marque?: string;

  modele?: string;

  numeroSerie?: string;

  statut:
    | "ACTIF"
    | "MAINTENANCE"
    | "PANNE";

  localisation?: string;

  createdAt: string;

  updatedAt: string;
}
'@

Set-Content `
"$ROOT\src\shared\types\Equipment.ts" `
$equipmentModel

# =====================================================
# INTERVENTION MODEL
# =====================================================

$interventionModel = @'
export interface Intervention {

  id: string;

  organisationId: string;

  type: string;

  statut:
    | "PLANIFIEE"
    | "EN_COURS"
    | "TERMINEE";

  terrainId?: string;

  materielId?: string;

  technicienId?: string;

  dateIntervention?: string;

  commentaire?: string;

  createdAt: string;

  updatedAt: string;
}
'@

Set-Content `
"$ROOT\src\shared\types\Intervention.ts" `
$interventionModel

# =====================================================
# FIRESTORE COLLECTIONS
# =====================================================

$collections = @'
export const FIRESTORE_COLLECTIONS = {

  ORGANISATIONS:
    "organisations",

  USERS:
    "users",

  EXPLOITATIONS:
    "exploitations",

  TERRAINS:
    "terrains",

  PRODUCTS:
    "products",

  STOCK_MOVEMENTS:
    "stock_movements",

  EQUIPMENTS:
    "equipments",

  INTERVENTIONS:
    "interventions",
};
'@

Set-Content `
"$ROOT\src\shared\constants\firestoreCollections.ts" `
$collections

# =====================================================
# ARCHITECTURE DOCUMENTATION
# =====================================================

$architectureDoc = @'
# Terragest Enterprise Data Model

## Core Modules

- Organisations
- Users
- Exploitations
- Terrains
- Products
- Stock Movements
- Equipments
- Interventions

--------------------------------------------------

## Architecture Principles

- Multi-tenant
- Organisation isolation
- Realtime ready
- AI ready
- IoT ready
- Cloud-native

--------------------------------------------------

## Firestore Strategy

Collections:

organisations/{id}
users/{id}
exploitations/{id}
terrains/{id}
products/{id}
stock_movements/{id}
equipments/{id}
interventions/{id}

--------------------------------------------------

## Security

- organisationId isolation
- RBAC
- audit logs
- realtime monitoring

--------------------------------------------------

## Scalability

- SaaS ready
- Multi-organisation
- Event-driven architecture
'@

Set-Content `
"$ROOT\docs\ENTERPRISE_DATA_MODEL.md" `
$architectureDoc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Enterprise Data Model generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Core business models"
Write-Host "- Firestore collections"
Write-Host "- Enterprise architecture"
Write-Host "- Shared types"
Write-Host "- Scalable SaaS data foundation"
Write-Host ""