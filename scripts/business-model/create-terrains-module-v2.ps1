$ErrorActionPreference = "Stop"

$Root =
"C:\Users\Admin\terragest"

. "$Root\scripts\shared\encoding.ps1"

function Ensure-Dir($Path) {

  if (!(Test-Path $Path)) {

    New-Item `
      -ItemType Directory `
      -Path $Path `
      -Force | Out-Null
  }
}

Write-Host ""
Write-Host "=== TERRAINS MODULE V2 ==="
Write-Host ""

Ensure-Dir `
"$Root\src\runtime\modules\v2"

Ensure-Dir `
"$Root\src\seeds\v2"

Ensure-Dir `
"$Root\docs\business-model\v2\modules"

$TerrainModule = @'
import type {
  ERPModule,
}
from "@/runtime/modules";

export const terrainsModuleV2:
  ERPModule = {

  metadata: {

    key:
      "terrains",

    label:
      "Terrains",

    description:
      "Gestion foncière centrale ERP.",

    icon:
      "map",

    category:
      "Foncier",

    features: {

      dashboard:
        true,

      analytics:
        true,

      workflows:
        true,

      realtime:
        true,

      audit:
        true,
    },
  },

  schema: {

    collection:
      "terrains",

    fields: [

      {
        key:
          "code",

        label:
          "Code terrain",

        type:
          "text",

        required:
          true,
      },

      {
        key:
          "nom",

        label:
          "Nom",

        type:
          "text",

        required:
          true,
      },

      {
        key:
          "description",

        label:
          "Description",

        type:
          "textarea",
      },

      {
        key:
          "proprietaireId",

        label:
          "Propriétaire",

        type:
          "relation",
        relation: {
          module:
            "utilisateurs",
        },
        required:
          true,
      },

      {
        key:
          "vocationTerrain",

        label:
          "Vocation",

        type:
          "select",

        required:
          true,

        options: [
          { label: "Agricole", value: "Agricole" },
          { label: "Habitation", value: "Habitation" },
          { label: "Commercial", value: "Commercial" },
          { label: "Mixte", value: "Mixte" },
        ],
      },

      {
        key:
          "surfaceTotale",

        label:
          "Surface totale",

        type:
          "number",

        required:
          true,
      },

      {
        key:
          "surfaceAgricole",

        label:
          "Surface agricole",

        type:
          "number",
      },

      {
        key:
          "surfaceHabitation",

        label:
          "Surface habitation",

        type:
          "number",
      },

      {
        key:
          "surfaceExploitee",

        label:
          "Surface exploitée",

        type:
          "number",
      },

      {
        key:
          "surfaceDisponible",

        label:
          "Surface disponible",

        type:
          "number",
      },

      {
        key:
          "adresse",

        label:
          "Adresse",

        type:
          "text",
      },

      {
        key:
          "commune",

        label:
          "Commune",

        type:
          "text",
      },

      {
        key:
          "region",

        label:
          "Région",

        type:
          "text",
      },

      {
        key:
          "pays",

        label:
          "Pays",

        type:
          "text",
      },

      {
        key:
          "latitude",

        label:
          "Latitude",

        type:
          "number",
      },

      {
        key:
          "longitude",

        label:
          "Longitude",

        type:
          "number",
      },

      {
        key:
          "cadastre",

        label:
          "Cadastre",

        type:
          "text",
      },

      {
        key:
          "referenceFoncier",

        label:
          "Référence foncière",

        type:
          "text",
      },

      {
        key:
          "statutTerrain",

        label:
          "Statut",

        type:
          "select",

        required:
          true,

        options: [
          { label: "Disponible", value: "Disponible" },
          { label: "Exploité", value: "Exploité" },
          { label: "Partiel", value: "Partiel" },
          { label: "Litige", value: "Litige" },
          { label: "Inactif", value: "Inactif" },
        ],
      },
    ],
  },
};
'@

$TerrainRules = @'
# TERRAINS BUSINESS RULES V2

## Règles critiques

- un terrain doit avoir un propriétaire
- surfaceTotale > 0
- surfaceDisponible >= 0
- surfaceExploitee <= surfaceTotale
- terrain en litige interdit nouvelles exploitations

## Calculs

surfaceDisponible =
surfaceTotale -
surfaceExploitee -
surfaceHabitation

## Relations

terrain
→ contrats
→ exploitations
→ campagnes
→ actifs
→ immobilier
'@

$TerrainSeed = @'
export const terrainsSeedV2 = [

  {
    code:
      "TR-001",

    nom:
      "Terrain Agricole Nord",

    vocationTerrain:
      { label: "Agricole", value: "Agricole" },

    surfaceTotale:
      12000,

    surfaceAgricole:
      10000,

    surfaceHabitation:
      500,

    surfaceExploitee:
      6000,

    surfaceDisponible:
      5500,

    commune:
      "Bonoua",

    region:
      "Sud-Comoé",

    pays:
      "Côte d'Ivoire",

    statutTerrain:
      { label: "Exploité", value: "Exploité" },
  },
];
'@

Write-Utf8NoBomFile `
"$Root\src\runtime\modules\v2\terrainsModuleV2.ts" `
$TerrainModule

Write-Utf8NoBomFile `
"$Root\docs\business-model\v2\modules\terrains.md" `
$TerrainRules

Write-Utf8NoBomFile `
"$Root\src\seeds\v2\terrainsSeedV2.ts" `
$TerrainSeed

Write-Host ""
Write-Host "DONE TERRAINS MODULE V2"
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. build"
Write-Host "2. review module"
Write-Host "3. prepare contrats module"