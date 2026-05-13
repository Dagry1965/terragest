$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$OutDir = Join-Path $Root "src\runtime\modules\v2"
$DocDir = Join-Path $Root "docs\business-model\v2"

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
New-Item -ItemType Directory -Force -Path $DocDir | Out-Null

Write-Host "INSTALLATION MODELE METIER GLOBAL TERRAGEST V2" -ForegroundColor Cyan

$indexPath = Join-Path $OutDir "terragestBusinessModelV2.ts"

$content = @'
import type { ERPModule } from "@/runtime/modules";

export const terragestBusinessModelV2: ERPModule[] = [
  {
    metadata: {
      key: "utilisateurs",
      label: "Utilisateurs",
      description: "Propriétaires, responsables, gestionnaires, techniciens et comptables.",
      icon: "users",
      category: "Administration"
    },
    schema: {
      collection: "utilisateurs",
      fields: [
        { key: "nom", label: "Nom", type: "text", required: true },
        { key: "prenom", label: "Prénom", type: "text" },
        { key: "email", label: "Email", type: "email" },
        { key: "role", label: "Rôle", type: "select", options: ["Propriétaire", "Responsable", "Gestionnaire", "Technicien", "Comptable"] },
        { key: "statut", label: "Statut", type: "select", options: ["Actif", "Inactif"] }
      ]
    },
    features: {
      audit: true,
      realtime: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true
    }
  },

  {
    metadata: {
      key: "terrains",
      label: "Terrains",
      description: "Unité foncière centrale du système TerraGest.",
      icon: "map",
      category: "Foncier"
    },
    schema: {
      collection: "terrains",
      fields: [
        { key: "designation", label: "Désignation", type: "text", required: true },
        { key: "proprietaireId", label: "Propriétaire", type: "relation", relation: { module: "utilisateurs" }, required: true },
        { key: "localisation", label: "Localisation", type: "text" },
        { key: "surfaceTotale", label: "Surface totale", type: "number", required: true },
        { key: "surfaceDisponible", label: "Surface disponible", type: "number", required: true },
        { key: "vocationTerrain", label: "Vocation du terrain", type: "select", options: ["Agricole", "Elevage", "Piscicole", "Immobilier", "Mixte"] },
        { key: "statut", label: "Statut", type: "select", options: ["Disponible", "Exploité", "Litige", "Inactif"] },
        { key: "prixAcquisition", label: "Prix d'acquisition", type: "number" },
        { key: "dateAcquisition", label: "Date d'acquisition", type: "date" }
      ]
    },
    features: {
      audit: true,
      realtime: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true
    }
  },

  {
    metadata: {
      key: "contrats",
      label: "Contrats",
      description: "Cadre juridique et opérationnel des activités.",
      icon: "file-text",
      category: "Juridique"
    },
    schema: {
      collection: "contrats",
      fields: [
        { key: "reference", label: "Référence", type: "text", required: true },
        { key: "terrainId", label: "Terrain", type: "relation", relation: { module: "terrains" }, required: true },
        { key: "typeContrat", label: "Type de contrat", type: "select", options: ["Foncier", "Exploitation", "Location", "Partenariat", "Maintenance", "Fourniture"] },
        { key: "dateDebut", label: "Date début", type: "date", required: true },
        { key: "dateFin", label: "Date fin", type: "date" },
        { key: "montant", label: "Montant", type: "number" },
        { key: "documentUrl", label: "Document associé", type: "file" },
        { key: "statut", label: "Statut", type: "select", options: ["Brouillon", "Actif", "Suspendu", "Terminé"] }
      ]
    },
    features: {
      audit: true,
      realtime: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true
    }
  },

  {
    metadata: {
      key: "exploitations",
      label: "Exploitations",
      description: "Activités économiques exercées sur les terrains.",
      icon: "tractor",
      category: "Exploitation"
    },
    schema: {
      collection: "exploitations",
      fields: [
        { key: "nom", label: "Nom", type: "text", required: true },
        { key: "terrainId", label: "Terrain", type: "relation", relation: { module: "terrains" }, required: true },
        { key: "contratId", label: "Contrat actif", type: "relation", relation: { module: "contrats" }, required: true },
        { key: "typeExploitation", label: "Type", type: "select", options: ["Agricole", "Elevage", "Piscicole", "Immobilier"] },
        { key: "superficie", label: "Superficie exploitée", type: "number", required: true },
        { key: "localisation", label: "Localisation", type: "text" },
        { key: "dateDebut", label: "Date début", type: "date" },
        { key: "dateFin", label: "Date fin", type: "date" },
        { key: "statut", label: "Statut", type: "select", options: ["Active", "Suspendue", "Terminée"] }
      ]
    },
    features: {
      audit: true,
      realtime: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true
    }
  },

  {
    metadata: {
      key: "campagnes",
      label: "Campagnes",
      description: "Périodes opérationnelles des exploitations.",
      icon: "calendar",
      category: "Production"
    },
    schema: {
      collection: "campagnes",
      fields: [
        { key: "nom", label: "Nom", type: "text", required: true },
        { key: "exploitationId", label: "Exploitation", type: "relation", relation: { module: "exploitations" }, required: true },
        { key: "dateDebut", label: "Date début", type: "date", required: true },
        { key: "dateFin", label: "Date fin", type: "date" },
        { key: "objectifProduction", label: "Objectif de production", type: "number" },
        { key: "budgetPrevisionnel", label: "Budget prévisionnel", type: "number" },
        { key: "statut", label: "Statut", type: "select", options: ["Planifiée", "Active", "Terminée", "Verrouillée"] }
      ]
    },
    features: {
      audit: true,
      realtime: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true
    }
  },

  {
    metadata: {
      key: "mouvements",
      label: "Mouvements",
      description: "Achat, vente, production, consommation, perte, transfert et correction.",
      icon: "shuffle",
      category: "Operations"
    },
    schema: {
      collection: "mouvements",
      fields: [
        { key: "campagneId", label: "Campagne", type: "relation", relation: { module: "campagnes" }, required: true },
        { key: "type", label: "Type", type: "select", options: ["Achat", "Vente", "Production", "Consommation", "Perte", "Transfert", "Correction"] },
        { key: "quantite", label: "Quantité", type: "number", required: true },
        { key: "montant", label: "Montant", type: "number" },
        { key: "dateMouvement", label: "Date mouvement", type: "date", required: true },
        { key: "statut", label: "Statut", type: "select", options: ["Brouillon", "Validé", "Annulé"] }
      ]
    },
    features: {
      audit: true,
      realtime: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true
    }
  }
];
'@

[System.IO.File]::WriteAllText($indexPath, $content, [System.Text.UTF8Encoding]::new($false))

$docPath = Join-Path $DocDir "TERRAGEST_MODELE_METIER_GLOBAL_V2.md"

$doc = @'
# TERRAGEST — MODELE METIER GLOBAL V2

Chaîne métier centrale :

Utilisateurs -> Terrains -> Contrats -> Exploitations -> Campagnes -> Mouvements -> Stocks & Comptabilité

Règle ERP centrale :

Contrat -> autorise -> Exploitation -> autorise -> Campagne -> autorise -> Mouvements -> alimentent -> Stocks & Comptabilité -> produisent -> Rentabilité

Modules installés dans cette première version :
- utilisateurs
- terrains
- contrats
- exploitations
- campagnes
- mouvements

Modules à ajouter ensuite :
- ressources
- actifs
- produits
- stocks
- comptabilite
- immobilier
- documents
'@

[System.IO.File]::WriteAllText($docPath, $doc, [System.Text.UTF8Encoding]::new($false))

Write-Host "OK fichier modele : $indexPath" -ForegroundColor Green
Write-Host "OK documentation : $docPath" -ForegroundColor Green
Write-Host "TERMINE" -ForegroundColor Green