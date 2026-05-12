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
Write-Host "=== CONTRATS MODULE V2 ==="
Write-Host ""

Ensure-Dir `
"$Root\src\runtime\modules\v2"

Ensure-Dir `
"$Root\src\seeds\v2"

Ensure-Dir `
"$Root\docs\business-model\v2\modules"

$ContratsModule = @'
import type {
  ERPModule,
}
from "@/runtime/modules";

export const contratsModuleV2:
  ERPModule = {

  metadata: {

    key:
      "contrats",

    label:
      "Contrats",

    description:
      "Gestion contractuelle ERP.",

    icon:
      "file-text",

    category:
      "Juridique",

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
      "contrats",

    fields: [

      {
        key:
          "code",

        label:
          "Code contrat",

        type:
          "text",

        required:
          true,
      },

      {
        key:
          "nom",

        label:
          "Nom contrat",

        type:
          "text",

        required:
          true,
      },

      {
        key:
          "terrainId",

        label:
          "Terrain",

        type:
          "relation",

        relation: {
          module:
            "terrains",
        },

        required:
          true,
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
          "typeContrat",

        label:
          "Type contrat",

        type:
          "select",

        required:
          true,

        options: [

          {
            label:
              "Location",

            value:
              "Location",
          },

          {
            label:
              "Concession",

            value:
              "Concession",
          },

          {
            label:
              "Achat",

            value:
              "Achat",
          },

          {
            label:
              "Partenariat",

            value:
              "Partenariat",
          },
        ],
      },

      {
        key:
          "dateDebut",

        label:
          "Date début",

        type:
          "date",

        required:
          true,
      },

      {
        key:
          "dateFin",

        label:
          "Date fin",

        type:
          "date",

        required:
          true,
      },

      {
        key:
          "montantContrat",

        label:
          "Montant contrat",

        type:
          "number",
      },

      {
        key:
          "statutContrat",

        label:
          "Statut contrat",

        type:
          "select",

        required:
          true,

        options: [

          {
            label:
              "Actif",

            value:
              "Actif",
          },

          {
            label:
              "Suspendu",

            value:
              "Suspendu",
          },

          {
            label:
              "Expiré",

            value:
              "Expiré",
          },

          {
            label:
              "Résilié",

            value:
              "Résilié",
          },
        ],
      },

      {
        key:
          "documentContrat",

        label:
          "Document contrat",

        type:
          "file",
      },

      {
        key:
          "description",

        label:
          "Description",

        type:
          "textarea",
      },
    ],
  },
};
'@

$ContratsRules = @'
# CONTRATS BUSINESS RULES V2

## Règles critiques

- un contrat doit être lié à un terrain
- un contrat doit avoir un propriétaire
- dateDebut < dateFin
- un contrat expiré interdit nouvelles campagnes
- un contrat résilié bloque exploitation
- un terrain en litige interdit contrat actif

## Chronologie

contrat
→ exploitation
→ campagne
→ mouvements

Aucune entité fille
ne peut dépasser
les dates du contrat.

## Gestion documentaire

Le document contrat
représente la référence juridique officielle.
'@

$ContratsSeed = @'
export const contratsSeedV2 = [

  {
    code:
      "CTR-001",

    nom:
      "Contrat Exploitation Agricole Nord",

    terrainId:
      "terrain-001",

    typeContrat:
      "Location",

    dateDebut:
      "2026-01-01",

    dateFin:
      "2028-12-31",

    montantContrat:
      2500000,

    statutContrat:
      "Actif",
  },
];
'@

Write-Utf8NoBomFile `
"$Root\src\runtime\modules\v2\contratsModuleV2.ts" `
$ContratsModule

Write-Utf8NoBomFile `
"$Root\docs\business-model\v2\modules\contrats.md" `
$ContratsRules

Write-Utf8NoBomFile `
"$Root\src\seeds\v2\contratsSeedV2.ts" `
$ContratsSeed

Write-Host ""
Write-Host "DONE CONTRATS MODULE V2"
Write-Host ""
Write-Host "NEXT:"
Write-Host "pnpm build"