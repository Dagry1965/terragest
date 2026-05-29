# Q2-OP-A1 Client Operational Sheet exact target audit

Reference: approved visual target Mode_Phare / FICHE CLIENT OPERATIONNELLE.

- OK: 55
- INFO: 0
- WARN: 0
- FAIL: 0
- HIGH FAIL: 0

## Mandatory target sections

- Titre FICHE CLIENT OPERATIONNELLE
- Sous-texte vue 360 client
- Carte identité client
- KPI Véhicules
- KPI Interventions actives
- KPI Factures impayées
- KPI CA cumulé
- KPI Dernière visite
- KPI Prochain RDV
- Bloc Véhicules du client
- Bloc Activité récente
- Bloc À venir
- Bloc Adaptation selon le type de client
- Bloc Navigation rapide
- Bloc Parcours détaillé : du véhicule à la facture
- Bloc Bénéfices métier

## Checks

| Area | Status | Severity | Message |
|---|---:|---:|---|
| files | OK | LOW | clientHubPage exists: src/app/(private)/clientsauto/hub/page.tsx |
| files | OK | LOW | clientLoader exists: src/runtime/hub/RuntimeClientOperationalHubLoader.ts |
| files | OK | LOW | hubTypes exists: src/runtime/hub/RuntimeHubTypes.ts |
| files | OK | LOW | hubPage exists: src/components/erp/hub/ERPRecordHubPage.tsx |
| files | OK | LOW | hubHeader exists: src/components/erp/hub/ERPRecordHubHeader.tsx |
| files | OK | LOW | hubKpiStrip exists: src/components/erp/hub/ERPRecordHubKpiStrip.tsx |
| files | OK | LOW | hubPrimary exists: src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx |
| files | OK | LOW | hubSelected exists: src/components/erp/hub/ERPRecordHubSelectedDetails.tsx |
| files | OK | LOW | clientsModule exists: src/runtime/modules/generated/clientsauto/clientsauto.module.ts |
| files | OK | LOW | vehiclesModule exists: src/runtime/modules/generated/vehicules/vehicules.module.ts |
| files | OK | LOW | rendezvousModule exists: src/runtime/modules/generated/rendezvous/rendezvous.module.ts |
| files | OK | LOW | interventionsModule exists: src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts |
| files | OK | LOW | linesModule exists: src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts |
| files | OK | LOW | invoicesModule exists: src/runtime/modules/generated/facturesauto/facturesauto.module.ts |
| files | OK | LOW | paymentsModule exists: src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts |
| target-sections | OK | HIGH | Detected target section: Titre FICHE CLIENT OPERATIONNELLE |
| target-sections | OK | HIGH | Detected target section: Sous-texte vue 360 client |
| target-sections | OK | HIGH | Detected target section: Carte identité client |
| target-sections | OK | HIGH | Detected target section: KPI Véhicules |
| target-sections | OK | HIGH | Detected target section: KPI Interventions actives |
| target-sections | OK | HIGH | Detected target section: KPI Factures impayées |
| target-sections | OK | HIGH | Detected target section: KPI CA cumulé |
| target-sections | OK | HIGH | Detected target section: KPI Dernière visite |
| target-sections | OK | HIGH | Detected target section: KPI Prochain RDV |
| target-sections | OK | HIGH | Detected target section: Bloc Véhicules du client |
| target-sections | OK | HIGH | Detected target section: Bloc Activité récente |
| target-sections | OK | HIGH | Detected target section: Bloc À venir |
| target-sections | OK | HIGH | Detected target section: Bloc Adaptation selon le type de client |
| target-sections | OK | HIGH | Detected target section: Bloc Navigation rapide |
| target-sections | OK | HIGH | Detected target section: Bloc Parcours détaillé : du véhicule à la facture |
| target-sections | OK | HIGH | Detected target section: Bloc Bénéfices métier |
| data-chain | OK | HIGH | Detected relation chain: Client -> Véhicules |
| data-chain | OK | HIGH | Detected relation chain: Véhicule -> Rendez-vous |
| data-chain | OK | HIGH | Detected relation chain: Véhicule -> Interventions |
| data-chain | OK | HIGH | Detected relation chain: Intervention -> Lignes |
| data-chain | OK | HIGH | Detected relation chain: Intervention -> Factures |
| data-chain | OK | HIGH | Detected relation chain: Factures -> Encaissements |
| runtime-boundary | OK | HIGH | Client hub page does not import firebase/firestore |
| runtime-boundary | OK | HIGH | Client hub uses runtime/generic hub concepts |
| adaptive-display | OK | HIGH | Runtime types support adaptive display by client type |
| mojibake | OK | HIGH | src/app/(private)/clientsauto/hub/page.tsx has no mojibake |
| mojibake | OK | HIGH | src/runtime/hub/RuntimeClientOperationalHubLoader.ts has no mojibake |
| mojibake | OK | HIGH | src/runtime/hub/RuntimeHubTypes.ts has no mojibake |
| mojibake | OK | HIGH | src/components/erp/hub/ERPRecordHubPage.tsx has no mojibake |
| mojibake | OK | HIGH | src/components/erp/hub/ERPRecordHubHeader.tsx has no mojibake |
| mojibake | OK | HIGH | src/components/erp/hub/ERPRecordHubKpiStrip.tsx has no mojibake |
| mojibake | OK | HIGH | src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx has no mojibake |
| mojibake | OK | HIGH | src/components/erp/hub/ERPRecordHubSelectedDetails.tsx has no mojibake |
| mojibake | OK | HIGH | src/runtime/modules/generated/clientsauto/clientsauto.module.ts has no mojibake |
| mojibake | OK | HIGH | src/runtime/modules/generated/vehicules/vehicules.module.ts has no mojibake |
| mojibake | OK | HIGH | src/runtime/modules/generated/rendezvous/rendezvous.module.ts has no mojibake |
| mojibake | OK | HIGH | src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts has no mojibake |
| mojibake | OK | HIGH | src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts has no mojibake |
| mojibake | OK | HIGH | src/runtime/modules/generated/facturesauto/facturesauto.module.ts has no mojibake |
| mojibake | OK | HIGH | src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts has no mojibake |

## Recommendation

Proceed with Q2-OP-B: implement the exact Client Operational Sheet layout and runtime view model.