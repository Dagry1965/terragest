# Q22E-9N-G — Scheduling settings UI audit

Date: 2026-05-26T16:34:37.753Z

## Objectif

Auditer l'UI générique de paramètres planning.

Règles:
- UI générique.
- Pas de Firestore direct.
- Pas de repository direct.
- Appel uniquement aux server actions.
- Les mappings structurels sont affichés mais pas sauvegardés comme settings éditables.

## Résumé

- Checks: 12
- OK: 12
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx`
- `src/app/(private)/settings/scheduling/page.tsx`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts`

## Checks détaillés


### OK — Q22E-9N-G-01

- Label: ERPSchedulingSettingsPanel existe
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-G-02

- Label: Route settings/scheduling existe
- Severity: HIGH
- Details: src/app/(private)/settings/scheduling/page.tsx

### OK — Q22E-9N-G-03

- Label: UI appelle les server actions read/save
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-G-04

- Label: UI ne touche pas directement Firestore
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-G-05

- Label: UI ne consomme pas le repository directement
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-G-06

- Label: UI ne hardcode pas AMARKHYS/garage
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-G-07

- Label: UI évite la sauvegarde des mappings structurels non persistables
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-G-08

- Label: UI affiche les mappings structurels en lecture seule
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-G-09

- Label: UI édite les paramètres persistables
- Severity: HIGH
- Details: src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx

### OK — Q22E-9N-G-10

- Label: Page utilise le panel générique
- Severity: HIGH
- Details: src/app/(private)/settings/scheduling/page.tsx

### OK — Q22E-9N-G-11

- Label: Page ne touche pas Firestore ni repository
- Severity: HIGH
- Details: src/app/(private)/settings/scheduling/page.tsx

### OK — Q22E-9N-G-12

- Label: Actions existent toujours
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts

## Décision recommandée

Aucun échec HIGH. L'UI générique de paramètres planning est prête pour test visuel et commit.
