# AMARKHYS-REBUILD-05E-C — Branchement readonlyIf dans ERPEnterpriseForm

Date: 2026-05-31T20:06:19.293Z

## Décision ERP

readonlyIf est une metadata générique ERPModuleField. Elle doit être évaluée par le renderer formulaire générique.

## Correction appliquée

- Ajout evaluateERPConditionalRule.
- Support equals / notEquals / in / notIn.
- Calcul readonlyIfFields depuis visibleFields + initialData + formValues.
- Injection de readonlyIfFields dans readOnlyFields.

## Checks

- OK — helper evaluateERPConditionalRule ajouté
- OK — operator equals supporté
- OK — operator notEquals supporté
- OK — operator in supporté
- OK — operator notIn supporté
- OK — readonlyIfFields calculé
- OK — readonlyIfFields injecté dans readOnlyFields
- OK — fichier modifié

## Synthèse

- OK: 8
- FAIL: 0
