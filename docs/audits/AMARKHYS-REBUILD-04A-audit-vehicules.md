# AMARKHYS-REBUILD-04A — Audit ciblé vehicules

Date: 2026-05-31T15:41:59.533Z

## Contexte

Audit ciblé du module vehicules après clôture clientsauto.

## Scores indicatifs

- Actions détectées: 100%
- Statuts détectés: 100%
- Champs spécifiques détectés: 100%
- Checks OK: 18
- Checks FAIL: 0

## Fichiers candidats directs

- OK src/runtime/modules/generated/vehicules/vehicules.module.ts
- OK src/runtime/modules/generated/vehicules/vehicules.actions.ts
- MISSING src/runtime/modules/generated/vehicules/actions.ts
- OK src/runtime/modules/generated/vehicules/index.ts
- OK src/runtime/modules/generated/vehicules/vehicules.workflows.ts
- OK src/runtime/modules/generated/vehicules/vehicules.permissions.ts
- OK src/runtime/modules/generated/vehicules/vehicules.automation.ts
- OK src/runtime/modules/generated/vehicules/vehicules.dashboard.ts
- OK src/app/(private)/vehicules/hub/page.tsx
- OK src/app/(private)/vehicules/hub/VehicleOperationalHubClient.tsx
- OK src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx

## Fichiers véhicule détectés

- src/app/(private)/vehicules/[id]/edit/page.tsx
- src/app/(private)/vehicules/[id]/page.tsx
- src/app/(private)/vehicules/analytics/page.tsx
- src/app/(private)/vehicules/audit/page.tsx
- src/app/(private)/vehicules/dashboard/page.tsx
- src/app/(private)/vehicules/export/page.tsx
- src/app/(private)/vehicules/hub/VehicleOperationalHubClient.tsx
- src/app/(private)/vehicules/hub/page.tsx
- src/app/(private)/vehicules/import/page.tsx
- src/app/(private)/vehicules/nouveau/page.tsx
- src/app/(private)/vehicules/page.tsx
- src/app/(private)/vehicules/relations/page.tsx
- src/app/(private)/vehicules/workflows/page.tsx
- src/components/erp/relations/ClientVehiclesReadonlyCard.tsx
- src/runtime/modules/generated/vehicules/index.ts
- src/runtime/modules/generated/vehicules/vehicules.actions.ts
- src/runtime/modules/generated/vehicules/vehicules.automation.ts
- src/runtime/modules/generated/vehicules/vehicules.dashboard.ts
- src/runtime/modules/generated/vehicules/vehicules.module.ts
- src/runtime/modules/generated/vehicules/vehicules.permissions.ts
- src/runtime/modules/generated/vehicules/vehicules.workflows.ts

## Résultats par groupe

### Fichiers

- OK — vehicules.module.ts existe
- OK — vehicules.actions.ts existe

### Actions

- OK — vehicules.actions.ts n'est pas vide
- OK — vehicules.module.ts contient une propriété actions
- OK — vehicules.module.ts référence vehiculesActions
- OK — Actions métier véhicule attendues détectées
  - Détails: ["Activer véhicule","Mettre en entretien","Immobiliser véhicule","Archiver véhicule","Ouvrir fiche véhicule","Ajouter RDV","Ajouter intervention"]

### Statuts

- OK — Statut attendu présent: actif
- OK — Statut attendu présent: entretien
- OK — Statut attendu présent: immobilise
- OK — Statut attendu présent: archive

### Champs

- OK — Champ attendu présent: carburant
- OK — Champ attendu présent: energie
- OK — Champ attendu présent: dateMiseEnCirculation
- OK — Champ attendu présent: dateFinGarantie
- OK — Valeurs énergie/carburant attendues détectées

### Hub

- OK — Route /vehicules/hub existe
- OK — VehicleOperationalHubClient existe

### Interdits locaux

- OK — Aucun interdit local détecté par cet audit

## Interdits locaux détaillés

- Aucun.

## Actions attendues détectées

- Activer véhicule
- Mettre en entretien
- Immobiliser véhicule
- Archiver véhicule
- Ouvrir fiche véhicule
- Ajouter RDV
- Ajouter intervention

## Prochaine étape recommandée

Traiter uniquement les FAIL. Si actions manquantes, créer/aligner vehicules.actions.ts puis référencer depuis vehicules.module.ts. Si action véhicule hardcodée dans ERPEnterpriseForm, la retirer au profit de RuntimeActionBar.
