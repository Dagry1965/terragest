# Q2-OA — Runtime Record Hub Readiness Audit

- Date: 2026-05-29T00:56:04.037Z
- Root: `C:\Users\Admin\terragest`

## Objectif

Auditer l’existant avant de créer le Runtime Hub générique.

Le but est de confirmer ce qui peut être réutilisé pour construire un système de hub relationnel opérationnel générique :

- Client → Véhicules → Rendez-vous → Interventions → Factures
- Produit → Stocks → Mouvements → Commandes → Réceptions → Alertes

Cette passe ne modifie pas l’application.

## Résumé

- OK: 60
- WARN: 7
- FAIL: 0
- HIGH FAIL: 0

## Notes de design

### Décision produit

Le besoin doit être traité comme un ERP Record Hub générique, pas comme une page AMARKHYS codée localement.

### Principe UX

Utiliser toute la largeur utile de la page sans surcharge : résumé en haut, relation principale au centre, détails contextuels après sélection.

### Premier cas métier

Client Operational Hub : Client → Véhicules → Rendez-vous → Interventions → Factures.

### Deuxième cas métier

Product / Stock Operational Hub : Produit → Stocks → Mouvements → Commandes → Réceptions → Alertes.

### Principe technique

Réutiliser ERPOperationalModulePage, les tokens Q2-M, RuntimeOperationalChildrenResolver, metadata operational, relationLabelFields et composition metadata.

### À éviter

Pas de requêtes Firestore locales dans une page hub, pas de logique conditionnelle AMARKHYS dispersée, pas de duplication carte/tableau sans resolver générique.

## Architecture cible proposée

```text
ERPRecordHubRuntime
├─ RuntimeHubEngine
├─ RuntimeHubConfigResolver
├─ RuntimeHubDataLoader
├─ RuntimeHubLayoutResolver
├─ RuntimeHubKpiResolver
├─ RuntimeHubRelationResolver
└─ RuntimeHubActionResolver

ERPRecordHub UI
├─ ERPRecordHubPage
├─ ERPRecordHubSearchBar
├─ ERPRecordHubHeader
├─ ERPRecordHubKpiStrip
├─ ERPRecordHubPrimaryCollection
├─ ERPRecordHubCardGrid
├─ ERPRecordHubDataTable
├─ ERPRecordHubSelectedDetails
└─ ERPRecordHubQuickActions
```

## Layout UX cible

```text
┌──────────────────────────────────────────────────────────────┐
│ Recherche / filtres / actions rapides                        │
├──────────────────────────────────────────────────────────────┤
│ Header record + badges + KPIs                                │
├────────────────────────┬─────────────────────────────────────┤
│ Relation principale    │ Résumé contexte / actions            │
│ cartes/table/timeline  │ détail sélectionné                   │
├────────────────────────┴─────────────────────────────────────┤
│ Sections liées contextuelles : interventions, factures, etc.  │
└──────────────────────────────────────────────────────────────┘
```

## Metadata cible exemple

```ts
operationalHub: {
  enabled: true,
  rootModule: 'clientsauto',
  search: {
    placeholder: 'Rechercher un client...',
    filterFields: ['typeClient'],
  },
  header: {
    titleFields: ['nom', 'prenom'],
    subtitleFields: ['telephone', 'email'],
    badgeFields: ['typeClient'],
  },
  kpis: [
    'vehiculesCount',
    'activeInterventionsCount',
    'unpaidInvoicesCount',
    'totalBilledAmount',
  ],
  primaryCollection: {
    moduleKey: 'vehicules',
    foreignKey: 'clientId',
    displayModes: {
      particulier: 'cards',
      flotte: 'table',
      entreprise: 'table',
    },
  },
  selectedRecordDetails: [
    { moduleKey: 'interventionsauto', foreignKey: 'vehiculeId', layout: 'collapsible-list' },
    { moduleKey: 'facturesauto', foreignKey: 'vehiculeId', layout: 'collapsible-list' },
  ],
}
```

## Checks

| Scope | Status | Severity | Message |
|---|---:|---:|---|
| operational-page | OK | HIGH | Foundation file found: src/components/erp/operational/ERPOperationalModulePage.tsx |
| operational-page | OK | MEDIUM | Expected reference detected: ERPOperationalKpiStrip |
| operational-page | OK | MEDIUM | Expected reference detected: ERPOperationalFilters |
| operational-page | OK | MEDIUM | Expected reference detected: ERPOperationalTable |
| operational-page | OK | MEDIUM | Expected reference detected: ERPOperationalRightPanel |
| operational-table | OK | HIGH | Foundation file found: src/components/erp/operational/ERPOperationalTable.tsx |
| operational-table | OK | MEDIUM | Expected reference detected: ERPOperationalExpandedChildren |
| expanded-children | OK | HIGH | Foundation file found: src/components/erp/operational/ERPOperationalExpandedChildren.tsx |
| expanded-children | OK | MEDIUM | Expected reference detected: RuntimeOperationalChildrenResolver |
| children-resolver | OK | HIGH | Foundation file found: src/runtime/operational/RuntimeOperationalChildrenResolver.ts |
| children-resolver | WARN | LOW | Expected reference not detected or renamed: metadata.key |
| tokens | OK | HIGH | Foundation file found: src/components/erp/operational/operationalUiTokens.ts |
| tokens | OK | MEDIUM | Expected reference detected: operationalUiTokens |
| runtime-page | OK | HIGH | Foundation file found: src/components/erp/runtime/ERPRuntimePage.tsx |
| runtime-page | OK | MEDIUM | Expected reference detected: ERPOperationalModulePage |
| structure | OK | HIGH | Directory found: src/runtime |
| structure | OK | HIGH | Directory found: src/components/erp |
| structure | OK | HIGH | Directory found: src/app |
| runtime-data | OK | HIGH | RuntimeDataBinding detected in 37 file(s) |
| runtime-relations | OK | MEDIUM | relationLabelFields detected in 6 file(s) |
| runtime-operational | OK | HIGH | operational detected in 7 file(s) |
| runtime-composition | OK | MEDIUM | composition detected in 22 file(s) |
| runtime-kpis | OK | LOW | kpi detected in 45 file(s) |
| runtime-actions | OK | MEDIUM | actions detected in 52 file(s) |
| runtime-module-key | OK | HIGH | moduleKey detected in 113 file(s) |
| modules | OK | HIGH | Module detected: clientsauto |
| modules | OK | MEDIUM | clientsauto has operational metadata |
| modules | OK | LOW | clientsauto has relation label fields |
| modules | OK | LOW | clientsauto has composition metadata |
| modules | OK | HIGH | Module detected: vehicules |
| modules | OK | MEDIUM | vehicules has operational metadata |
| modules | OK | LOW | vehicules has relation label fields |
| modules | OK | LOW | vehicules has composition metadata |
| modules | OK | HIGH | Module detected: rendezvous |
| modules | OK | MEDIUM | rendezvous has operational metadata |
| modules | OK | LOW | rendezvous has relation label fields |
| modules | OK | LOW | rendezvous has composition metadata |
| modules | OK | HIGH | Module detected: interventionsauto |
| modules | OK | MEDIUM | interventionsauto has operational metadata |
| modules | OK | LOW | interventionsauto has relation label fields |
| modules | OK | LOW | interventionsauto has composition metadata |
| modules | OK | HIGH | Module detected: facturesauto |
| modules | OK | MEDIUM | facturesauto has operational metadata |
| modules | OK | LOW | facturesauto has relation label fields |
| modules | OK | LOW | facturesauto has composition metadata |
| modules | OK | HIGH | Module detected: produitsauto |
| modules | OK | MEDIUM | produitsauto has operational metadata |
| modules | OK | LOW | produitsauto has relation label fields |
| modules | OK | LOW | produitsauto has composition metadata |
| modules | OK | HIGH | Module detected: stocksauto |
| modules | OK | MEDIUM | stocksauto has operational metadata |
| modules | OK | LOW | stocksauto has relation label fields |
| modules | OK | LOW | stocksauto has composition metadata |
| modules | OK | HIGH | Module detected: commandesstockauto |
| modules | WARN | LOW | commandesstockauto has no operational metadata detected |
| modules | WARN | LOW | commandesstockauto has no relation label fields detected |
| modules | OK | LOW | commandesstockauto has composition metadata |
| modules | OK | HIGH | Module detected: receptionsstockauto |
| modules | WARN | LOW | receptionsstockauto has no operational metadata detected |
| modules | WARN | LOW | receptionsstockauto has no relation label fields detected |
| modules | OK | LOW | receptionsstockauto has composition metadata |
| modules | OK | HIGH | Module detected: mouvementsstockauto |
| modules | WARN | LOW | mouvementsstockauto has no operational metadata detected |
| modules | WARN | LOW | mouvementsstockauto has no relation label fields detected |
| modules | OK | LOW | mouvementsstockauto has composition metadata |
| hub-existing | OK | HIGH | No existing Record Hub implementation detected. Safe to create a new generic foundation. |
| cleanup | OK | HIGH | No Q2-O/Q2-N/Q2-M backup detected |

## Décision

Q2-OA est **validé techniquement**. La prochaine étape peut être Q2-OB — création de la foundation ERPRecordHub.
