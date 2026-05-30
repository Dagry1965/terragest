# Q2-OP-G1 Operational Sheet genericity audit

Goal: preserve the exact approved Client Operational Sheet visual target while preparing migration to a generic ERP Operational Sheet template.

- OK: 43
- INFO: 6
- WARN: 7
- FAIL: 0
- HIGH FAIL: 0

## Migration direction

- ERPClientOperationalSheet -> ERPOperationalSheet
- ClientOperationalSearchBox -> ERPOperationalSearchBox
- ClientOperationalTodayCards -> ERPOperationalTodayPanel
- RuntimeClientOperationalHubLoader -> RuntimeOperationalSheetLoader
- RuntimeClientOperationalSearchLoader -> RuntimeOperationalSearchLoader
- RuntimeClientOperationalTodayLoader -> RuntimeOperationalTodayLoader

## Checks

| Area | Status | Severity | Message |
|---|---:|---:|---|
| files | OK | LOW | clientPage exists: src/app/(private)/clientsauto/hub/page.tsx |
| files | OK | LOW | clientSheet exists: src/components/erp/hub/ERPClientOperationalSheet.tsx |
| files | OK | LOW | clientSearchBox exists: src/components/erp/hub/ClientOperationalSearchBox.tsx |
| files | OK | LOW | clientTodayCards exists: src/components/erp/hub/ClientOperationalTodayCards.tsx |
| files | OK | LOW | clientLoader exists: src/runtime/hub/RuntimeClientOperationalHubLoader.ts |
| files | OK | LOW | clientSearchLoader exists: src/runtime/hub/RuntimeClientOperationalSearchLoader.ts |
| files | OK | LOW | clientTodayLoader exists: src/runtime/hub/RuntimeClientOperationalTodayLoader.ts |
| files | OK | LOW | hubTypes exists: src/runtime/hub/RuntimeHubTypes.ts |
| files | OK | LOW | hubIndex exists: src/components/erp/hub/index.ts |
| specialization-inventory | WARN | MEDIUM | ERPClientOperationalSheet is currently client-specific and should be migrated later |
| specialization-inventory | WARN | MEDIUM | ClientOperationalSearchBox is currently client-specific and should be migrated later |
| specialization-inventory | WARN | MEDIUM | ClientOperationalTodayCards is currently client-specific and should be migrated later |
| specialization-inventory | WARN | MEDIUM | RuntimeClientOperationalHubLoader is currently client-specific and should be migrated later |
| specialization-inventory | WARN | MEDIUM | RuntimeClientOperationalSearchLoader is currently client-specific and should be migrated later |
| specialization-inventory | WARN | MEDIUM | RuntimeClientOperationalTodayLoader is currently client-specific and should be migrated later |
| hardcode | OK | HIGH | No AMARKHYS hardcode detected in operational sheet scope |
| hardcode | WARN | MEDIUM | Garage wording detected; acceptable only as configurable wording for this workspace |
| boundary | OK | HIGH | Client hub page does not import firebase/firestore |
| boundary | OK | HIGH | Client hub server page does not import runtime loader directly |
| boundary | OK | HIGH | Client hub server page delegates to client component |
| boundary | OK | MEDIUM | Search loader remains behind client boundary |
| boundary | OK | MEDIUM | Today loader remains behind client boundary |
| visual-target | OK | HIGH | Visual target marker present: FICHE CLIENT OPÉRATIONNELLE |
| visual-target | OK | HIGH | Visual target marker present: Vue 360° |
| visual-target | OK | HIGH | Visual target marker present: VÉHICULES DU CLIENT |
| visual-target | OK | HIGH | Visual target marker present: ACTIVITÉ RÉCENTE |
| visual-target | OK | HIGH | Visual target marker present: À VENIR |
| visual-target | OK | HIGH | Visual target marker present: ADAPTATION SELON LE TYPE DE CLIENT |
| visual-target | OK | HIGH | Visual target marker present: NAVIGATION RAPIDE |
| visual-target | OK | HIGH | Visual target marker present: PARCOURS DÉTAILLÉ |
| visual-target | OK | HIGH | Visual target marker present: BÉNÉFICES MÉTIER |
| behavior | OK | HIGH | Behavior marker present: clientId |
| behavior | OK | HIGH | Behavior marker present: selectedVehicleId |
| behavior | OK | HIGH | Behavior marker present: returnTo |
| behavior | OK | HIGH | Behavior marker present: RuntimeDataBinding |
| behavior | OK | HIGH | Behavior marker present: vehiclesCount |
| behavior | OK | HIGH | Behavior marker present: activeInterventionsCount |
| behavior | OK | HIGH | Behavior marker present: unpaidInvoicesCount |
| behavior | OK | HIGH | Behavior marker present: revenueTotal |
| behavior | OK | HIGH | Behavior marker present: recentActivity |
| behavior | OK | HIGH | Behavior marker present: upcomingAppointments |
| migration-readiness | INFO | LOW | Generic target not yet created: ERPOperationalSheet |
| migration-readiness | INFO | LOW | Generic target not yet created: ERPOperationalSearchBox |
| migration-readiness | INFO | LOW | Generic target not yet created: ERPOperationalTodayPanel |
| migration-readiness | INFO | LOW | Generic target not yet created: RuntimeOperationalSheetLoader |
| migration-readiness | INFO | LOW | Generic target not yet created: RuntimeOperationalSearchLoader |
| migration-readiness | INFO | LOW | Generic target not yet created: RuntimeOperationalTodayLoader |
| mojibake | OK | HIGH | src/app/(private)/clientsauto/hub/page.tsx has no mojibake |
| mojibake | OK | HIGH | src/components/erp/hub/ERPClientOperationalSheet.tsx has no mojibake |
| mojibake | OK | HIGH | src/components/erp/hub/ClientOperationalSearchBox.tsx has no mojibake |
| mojibake | OK | HIGH | src/components/erp/hub/ClientOperationalTodayCards.tsx has no mojibake |
| mojibake | OK | HIGH | src/runtime/hub/RuntimeClientOperationalHubLoader.ts has no mojibake |
| mojibake | OK | HIGH | src/runtime/hub/RuntimeClientOperationalSearchLoader.ts has no mojibake |
| mojibake | OK | HIGH | src/runtime/hub/RuntimeClientOperationalTodayLoader.ts has no mojibake |
| mojibake | OK | HIGH | src/runtime/hub/RuntimeHubTypes.ts has no mojibake |
| mojibake | OK | HIGH | src/components/erp/hub/index.ts has no mojibake |

## Recommendation

Proceed with a progressive generic migration. Do not change the approved visual layout. First extract generic operational search/today/template contracts, then map clientsauto through metadata.