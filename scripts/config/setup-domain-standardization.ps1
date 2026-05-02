Write-Host "Generating Terragest Domain Standardization..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

New-Item -ItemType Directory -Force -Path "src\enums"
New-Item -ItemType Directory -Force -Path "src\constants"

# =====================================================
# MOUVEMENT SENS
# =====================================================

$mouvementSens = @'
export enum MOUVEMENT_SENS {

  ENTREE = "ENTREE",

  SORTIE = "SORTIE",
}
'@

Set-Content `
"src\enums\MouvementSens.ts" `
$mouvementSens

# =====================================================
# MOUVEMENT CATEGORIE
# =====================================================

$mouvementCategorie = @'
export enum MOUVEMENT_CATEGORIE {

  RESSOURCE = "RESSOURCE",

  PRODUIT = "PRODUIT",
}
'@

Set-Content `
"src\enums\MouvementCategorie.ts" `
$mouvementCategorie

# =====================================================
# UNITES
# =====================================================

$unites = @'
export enum UNITE {

  KG = "KG",

  LITRE = "LITRE",

  TONNE = "TONNE",

  UNITE = "UNITE",
}
'@

Set-Content `
"src\enums\Unite.ts" `
$unites

# =====================================================
# ROLES
# =====================================================

$roles = @'
export enum ROLE_UTILISATEUR {

  ADMIN = "ADMIN",

  GESTIONNAIRE = "GESTIONNAIRE",
}
'@

Set-Content `
"src\enums\RoleUtilisateur.ts" `
$roles

# =====================================================
# STATUTS
# =====================================================

$statuts = @'
export enum STATUT_STANDARD {

  ACTIF = "ACTIF",

  INACTIF = "INACTIF",

  SUSPENDU = "SUSPENDU",
}
'@

Set-Content `
"src\enums\StatutStandard.ts" `
$statuts

# =====================================================
# COLLECTIONS
# =====================================================

$collections = @'
export const COLLECTIONS = {

  UTILISATEURS: "utilisateurs",

  ORGANISATIONS: "organisations",

  TERRAINS: "terrains",

  EXPLOITATIONS: "exploitations",

  RESSOURCES: "ressources",

  PRODUITS: "produits",

  MOUVEMENTS: "mouvements",
};
'@

Set-Content `
"src\constants\collections.ts" `
$collections

# =====================================================
# ROUTES
# =====================================================

$routes = @'
export const ROUTES = {

  LOGIN: "/login",

  DASHBOARD: "/dashboard",

  TERRAINS: "/terrains",

  EXPLOITATIONS: "/exploitations",

  RESSOURCES: "/ressources",

  PRODUITS: "/produits",

  MOUVEMENTS: "/mouvements",
};
'@

Set-Content `
"src\constants\routes.ts" `
$routes

# =====================================================
# UPDATE MOUVEMENT TYPE
# =====================================================

$mouvementType = @'
import { MOUVEMENT_SENS } from "@/enums/MouvementSens";

export interface Mouvement {

  id: string;

  organisationId: string;

  typeMouvement: string;

  categorie: string;

  referenceId: string;

  referenceNom: string;

  quantite: number;

  unite: string;

  montant: number;

  sens: MOUVEMENT_SENS;

  commentaire: string;

  createdAt: string;
}
'@

Set-Content `
"src\features\mouvements\types\Mouvement.ts" `
$mouvementType

# =====================================================
# UPDATE UTILISATEUR TYPE
# =====================================================

$utilisateurType = @'
import { ROLE_UTILISATEUR } from "@/enums/RoleUtilisateur";

export interface Utilisateur {

  id: string;

  organisationId: string;

  nom: string;

  email: string;

  role: ROLE_UTILISATEUR;

  actif: boolean;
}
'@

Set-Content `
"src\types\utilisateur.ts" `
$utilisateurType

# =====================================================
# UPDATE PRODUIT TYPE
# =====================================================

$produitType = @'
import { UNITE } from "@/enums/Unite";

import { STATUT_STANDARD } from "@/enums/StatutStandard";

export interface Produit {

  id: string;

  organisationId: string;

  nom: string;

  categorie: string;

  unite: UNITE;

  prixUnitaire: number;

  stockActuel: number;

  seuilAlerte: number;

  statut: STATUT_STANDARD;

  createdAt: string;
}
'@

Set-Content `
"src\features\produits\types\Produit.ts" `
$produitType

# =====================================================
# UPDATE RESSOURCE TYPE
# =====================================================

$ressourceType = @'
import { UNITE } from "@/enums/Unite";

import { STATUT_STANDARD } from "@/enums/StatutStandard";

export interface Ressource {

  id: string;

  organisationId: string;

  nom: string;

  categorie: string;

  unite: UNITE;

  coutUnitaire: number;

  stockActuel: number;

  seuilAlerte: number;

  statut: STATUT_STANDARD;

  createdAt: string;
}
'@

Set-Content `
"src\features\ressources\types\Ressource.ts" `
$ressourceType

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Domain Standardization generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Enums"
Write-Host "- Constants"
Write-Host "- Typed domain"
Write-Host "- Firestore collections constants"
Write-Host "- Routes constants"
Write-Host ""
Write-Host "Next Step:" -ForegroundColor Cyan
Write-Host "Refactor progressively services/repositories/forms"
Write-Host "to use enums/constants everywhere."
Write-Host ""