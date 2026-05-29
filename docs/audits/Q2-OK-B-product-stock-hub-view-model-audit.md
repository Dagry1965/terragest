# Q2-OK-B Product / Stock Hub view model audit

- OK: 41
- INFO: 2
- WARN: 3
- FAIL: 1
- HIGH FAIL: 0

## Files

- loader: `src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts` — FOUND
- types: `src/runtime/hub/RuntimeHubTypes.ts` — FOUND
- kpiResolver: `src/runtime/hub/RuntimeHubKpiResolver.ts` — FOUND
- engine: `src/runtime/hub/RuntimeHubEngine.ts` — FOUND
- configResolver: `src/runtime/hub/RuntimeHubConfigResolver.ts` — FOUND
- page: `src/app/(private)/produitsauto/hub/page.tsx` — FOUND
- client: `src/app/(private)/produitsauto/hub/ProductStockOperationalHubClient.tsx` — FOUND
- hubPage: `src/components/erp/hub/ERPRecordHubPage.tsx` — FOUND
- hubHeader: `src/components/erp/hub/ERPRecordHubHeader.tsx` — FOUND
- hubKpiStrip: `src/components/erp/hub/ERPRecordHubKpiStrip.tsx` — FOUND
- hubPrimary: `src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx` — FOUND
- hubSelected: `src/components/erp/hub/ERPRecordHubSelectedDetails.tsx` — FOUND

## Checks

| Area | Status | Severity | Message |
|---|---:|---:|---|
| loader | OK | LOW | File exists: src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts |
| types | OK | LOW | File exists: src/runtime/hub/RuntimeHubTypes.ts |
| kpiResolver | OK | LOW | File exists: src/runtime/hub/RuntimeHubKpiResolver.ts |
| engine | OK | LOW | File exists: src/runtime/hub/RuntimeHubEngine.ts |
| configResolver | OK | LOW | File exists: src/runtime/hub/RuntimeHubConfigResolver.ts |
| page | OK | LOW | File exists: src/app/(private)/produitsauto/hub/page.tsx |
| client | OK | LOW | File exists: src/app/(private)/produitsauto/hub/ProductStockOperationalHubClient.tsx |
| hubPage | OK | LOW | File exists: src/components/erp/hub/ERPRecordHubPage.tsx |
| hubHeader | OK | LOW | File exists: src/components/erp/hub/ERPRecordHubHeader.tsx |
| hubKpiStrip | OK | LOW | File exists: src/components/erp/hub/ERPRecordHubKpiStrip.tsx |
| hubPrimary | OK | LOW | File exists: src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx |
| hubSelected | OK | LOW | File exists: src/components/erp/hub/ERPRecordHubSelectedDetails.tsx |
| boundary | OK | HIGH | Server page remains server-side |
| boundary | OK | HIGH | Server page does not reference runtime loader |
| boundary | OK | HIGH | Server page does not import firebase/firestore |
| boundary | OK | HIGH | Client component has use client |
| boundary | OK | HIGH | Client loads runtime loader through client boundary |
| loader-kpi | OK | HIGH | Loader has stock total terminology |
| loader-kpi | OK | HIGH | Loader has stock count terminology |
| loader-kpi | OK | HIGH | Loader has open orders / orders count terminology |
| loader-kpi | OK | HIGH | Loader has recent movements terminology |
| loader-kpi | FAIL | MEDIUM | Loader does not expose clear KPI structure |
| loader-viewmodel | WARN | MEDIUM | Loader collection model unclear |
| loader-viewmodel | OK | MEDIUM | Loader has selected item terminology |
| loader-labels | OK | MEDIUM | Loader appears to prepare display labels |
| loader-labels | INFO | LOW | Loader manipulates ids; verify UI maps them to business labels |
| types | OK | MEDIUM | Hub types include KPI/display concepts |
| types | OK | MEDIUM | Hub types include selected/details/items concepts |
| kpi-strip | OK | HIGH | KPI strip renders KPI values |
| kpi-strip | INFO | MEDIUM | KPI strip has fallback behavior; verify why values show dashes |
| selected-panel | OK | MEDIUM | Selected panel renders selected item |
| selected-panel | WARN | HIGH | Selected panel may expose raw technical ids |
| selected-panel | OK | MEDIUM | Selected panel supports business labels |
| primary-collection | WARN | HIGH | Primary collection may expose raw ids |
| primary-collection | OK | MEDIUM | Primary collection supports labels/subtitles |
| mojibake | OK | HIGH | loader has no mojibake pattern |
| mojibake | OK | HIGH | types has no mojibake pattern |
| mojibake | OK | HIGH | kpiResolver has no mojibake pattern |
| mojibake | OK | HIGH | engine has no mojibake pattern |
| mojibake | OK | HIGH | configResolver has no mojibake pattern |
| mojibake | OK | HIGH | page has no mojibake pattern |
| mojibake | OK | HIGH | client has no mojibake pattern |
| mojibake | OK | HIGH | hubPage has no mojibake pattern |
| mojibake | OK | HIGH | hubHeader has no mojibake pattern |
| mojibake | OK | HIGH | hubKpiStrip has no mojibake pattern |
| mojibake | OK | HIGH | hubPrimary has no mojibake pattern |
| mojibake | OK | HIGH | hubSelected has no mojibake pattern |

## Recommendation

Runtime boundary is likely stable. Implement display polish in loader/view model and generic hub components.