# TERRAGEST ERP - Audit coherent

Generated: 05/08/2026 09:21:48
ProjectRoot: C:\Users\Admin\terragest

## 1. Inventaire des scripts existants

Scripts PowerShell detectes: **384**

| Famille | Nombre |
|---|---:|
| config | 101 |
| erp | 67 |
| maintenance | 16 |
| setup | 11 |
| saas | 8 |
| generators | 7 |
| erp-layout | 7 |
| crud | 6 |
| tests | 6 |
| shared | 5 |
| architecture | 5 |
| erp-templates | 4 |
| platform | 3 |
| analytics | 3 |
| stabilization | 3 |
| runtime | 3 |
| runtime-pages | 3 |
| security | 3 |
| fix | 3 |
| bootstrap | 3 |
| observability | 3 |
| layout | 2 |
| persistence | 2 |
| payments | 2 |
| data | 2 |
| audit | 2 |
| enterprise | 2 |
| erp-actions | 2 |
| os | 1 |
| ai | 1 |
| alerts | 1 |
| notifications | 1 |
| ui-system | 1 |
| offline | 1 |
| rules | 1 |
| realtime | 1 |
| runtime-modules | 1 |
| automation | 1 |
| processes | 1 |
| testing | 1 |
| quality | 1 |
| pwa | 1 |
| materiels | 1 |
| erp-enterprise-consolidation | 1 |
| erp-data-binding | 1 |
| erp-connect-all | 1 |
| erp-forms | 1 |
| erp-firestore-runtime | 1 |
| erp-event-runtime | 1 |
| debug | 1 |
| env | 1 |
| encoding | 1 |
| erp-automation-runtime | 1 |
| erp-audit | 1 |
| erp-alignment | 1 |
| features | 1 |
| erp-workspace | 1 |
| erp-workflow-runtime | 1 |
| integrations | 1 |
| governance | 1 |
| core | 1 |
| erp-security-runtime | 1 |
| erp-production-hardening | 1 |
| erp-os | 1 |
| dashboard | 1 |
| erp-smart-runtime | 1 |
| erp-smart-intelligence | 1 |

## 2. Audits existants reutilisables

- OK: scripts\audit\audit-terragest-architecture.ps1
- OK: scripts\erp-audit\audit-module-connections.ps1
- OK: scripts\maintenance\find-broken-imports.ps1

Audit architecture existant lance: scripts\\audit\\audit-terragest-architecture.ps1

## 3. Structure applicative detectee

| Dossier | Statut |
|---|---|
| src\app | OK |
| src\core | OK |
| src\runtime | OK |
| src\features | OK |
| src\components | OK |
| src\components\erp | OK |
| src\components\erp\ui | OK |
| src\components\erp\layout | OK |
| src\components\erp\generic | OK |

Volumetrie:
- .ts: 1003
- .tsx: 719
- pages Next.js: 189

## 4. Audit module par module

| Module | Liste | Creation | Details | Edition | Registry | Schema | Runtime |
|---|---|---|---|---|---|---|---|
| exploitations | OK | OK | OK | OK | OK | OK | OK |
| materiels | OK | OK | OK | OK | OK | OK | OK |
| terrains | OK | OK | OK | OK | OK | OK | OK |
| stocks | OK | OK | OK | OK | OK | OK | OK |
| produits | OK | OK | OK | OK | OK | OK | OK |
| interventions | OK | OK | OK | OK | OK | OK | OK |
| maintenance | OK | OK | OK | OK | OK | OK | OK |
| contrats | OK | OK | OK | OK | OK | OK | OK |
| paiements | OK | OK | OK | OK | OK | OK | OK |

## 5. Dette UI et coherence ERP

| Indicateur | Nombre | Lecture |
|---|---:|---|
| Pages avec className manuel | 103 | A absorber progressivement par src/components/erp/ui |
| Sidebar detectees | 10 | Une seule source cible: ERPAppShell + ModuleRegistry |
| Topbar/Header detectes | 13 | Eviter les variantes page par page |
| Tables/DataTables detectees | 37 | Converger vers ERPDataTable |
| Registry detectes | 26 | Doit piloter modules, navigation et pages |
| Schemas detectes | 29 | Doivent piloter formulaires/listes/details |
| Runtime files | 309 | Colonne vertebrale ERP |

## 6. Scripts existants a reutiliser dans l'ordre

- OK scripts\audit\audit-terragest-architecture.ps1
- OK scripts\erp-audit\audit-module-connections.ps1
- OK scripts\erp\setup-erp-convergence-core.ps1
- OK scripts\erp\setup-erp-ui-core.ps1
- OK scripts\erp-layout\setup-enterprise-layout-system.ps1
- OK scripts\erp-alignment\erp-ui-architecture-alignment.ps1
- OK scripts\runtime-modules\finish-runtime-module-system.ps1
- OK scripts\erp-connect-all\connect-all-modules.ps1
- OK scripts\tests\setup-testing-environment.ps1

## 7. Deduction des prochaines etapes

1. UI core present: continuer la convergence des pages vers les composants ERP UI.
2. Remplacer progressivement les styles manuels des pages par ERPAppShell, ERPCard, ERPButton, ERPDataTable, ERPForm.
3. Registry present: brancher navigation, dashboard et routes dessus.
4. Modules de base complets sur les checks structurels. Passer aux tests fonctionnels et donnees demo.
5. Ajouter tests apres stabilisation UI/navigation: tests rules, workflows, runtime, modules, navigation.
6. Ne pas lancer les scripts setup massifs sans commit propre et build vert avant/apres.
