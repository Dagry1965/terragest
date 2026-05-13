# TERRAGEST_V2 - RUNTIME MODULE REGISTRY USAGE

Date: 2026-05-13 20:19:00

## Utilisation de coreERPModules

- .\src\app\(private)\compliance\page.tsx:3 - import { registerCoreERPModules } from "@/runtime/modules/registerCoreERPModules";
- .\src\app\(private)\compliance\page.tsx:6 - registerCoreERPModules();
- .\src\app\(private)\runtime\[module]\page.tsx:2 - import { registerCoreERPModules } from "@/runtime/modules/registerCoreERPModules";
- .\src\app\(private)\runtime\[module]\page.tsx:14 - registerCoreERPModules();
- .\src\runtime\modules\definitions\coreModules.ts:9 - export const coreERPModules: ERPModule[] = [
- .\src\runtime\modules\definitions\coreModules.ts:176 - coreERPModules,
- .\src\runtime\modules\index.ts:33 - coreERPModules,
- .\src\runtime\modules\registerCoreERPModules.ts:9 - export function registerCoreERPModules() {

## Utilisation de allERPModules

- .\src\components\erp\generic\GenericCreatePage.tsx:2 - import { allERPModules } from "@/runtime/modules/definitions/coreModules";
- .\src\components\erp\generic\GenericCreatePage.tsx:16 - allERPModules.find((item) => item.metadata.key === moduleKey);
- .\src\components\erp\generic\GenericDetailPage.tsx:5 - import { allERPModules } from "@/runtime/modules/definitions/coreModules";
- .\src\components\erp\generic\GenericDetailPage.tsx:24 - allERPModules.find((item) => item.metadata.key === moduleKey);
- .\src\components\erp\generic\GenericEditPage.tsx:5 - import { allERPModules } from "@/runtime/modules/definitions/coreModules";
- .\src\components\erp\generic\GenericEditPage.tsx:24 - allERPModules.find((item) => item.metadata.key === moduleKey);
- .\src\components\erp\generic\GenericListPage.tsx:1 - import { allERPModules } from "@/runtime/modules/definitions/coreModules";
- .\src\components\erp\generic\GenericListPage.tsx:9 - const runtimeModule = allERPModules.find(
- .\src\core\modules\module-registry.ts:2 - allERPModules,
- .\src\core\modules\module-registry.ts:73 - module: (typeof allERPModules)[number]
- .\src\core\modules\module-registry.ts:157 - allERPModules.map(
- .\src\hooks\useRealtimeCollection.ts:5 - import { allERPModules } from "@/runtime/modules";
- .\src\hooks\useRealtimeCollection.ts:21 - const module = allERPModules.find(
- .\src\platform\bootstrap\loadFeatures.ts:12 - allERPModules,
- .\src\platform\bootstrap\loadFeatures.ts:51 - module: (typeof allERPModules)[number]
- .\src\platform\bootstrap\loadFeatures.ts:87 - module: (typeof allERPModules)[number]
- .\src\platform\bootstrap\loadFeatures.ts:138 - allERPModules.map(
- .\src\runtime\dashboard\generic\ERPDashboardModuleResolver.ts:2 - import { allERPModules } from "@/runtime/modules/definitions/coreModules";
- .\src\runtime\dashboard\generic\ERPDashboardModuleResolver.ts:6 - allERPModules.find(
- .\src\runtime\dashboard\ERPBusinessAlertEngine.ts:10 - allERPModules,
- .\src\runtime\dashboard\ERPBusinessAlertEngine.ts:24 - allERPModules.find(
- .\src\runtime\dashboard\ERPBusinessMetricsEngine.ts:10 - allERPModules,
- .\src\runtime\dashboard\ERPBusinessMetricsEngine.ts:22 - allERPModules.find(
- .\src\runtime\forms\DynamicFormRegistry.ts:10 - import { allERPModules } from "@/runtime/modules/definitions/coreModules";
- .\src\runtime\forms\DynamicFormRegistry.ts:36 - allERPModules.find(
- .\src\runtime\forms\DynamicFormRegistry.ts:57 - return allERPModules.map(
- .\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:1 - import { allERPModules } from "../definitions/coreModules";
- .\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:35 - return allERPModules.map((module) => ({
- .\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:93 - return allERPModules.map((module) => ({
- .\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:124 - allERPModules.map((module) => [
- .\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:154 - allERPModules.map((module) => [
- .\src\runtime\modules\definitions\coreModules.ts:175 - export const allERPModules: ERPModule[] = mergeERPModules(
- .\src\runtime\modules\lifecycle\ERPModuleAuditor.ts:1 - import { allERPModules } from "../definitions/coreModules";
- .\src\runtime\modules\lifecycle\ERPModuleAuditor.ts:10 - for (const module of allERPModules) {
- .\src\runtime\modules\lifecycle\ERPModuleAuditor.ts:23 - allERPModules.some(
- .\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:2 - import { allERPModules } from "../definitions/coreModules";
- .\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:6 - const module = allERPModules.find(
- .\src\runtime\modules\lifecycle\ERPRelationResolver.ts:5 - import { allERPModules }
- .\src\runtime\modules\lifecycle\ERPRelationResolver.ts:15 - allERPModules.find(
- .\src\runtime\modules\lifecycle\ERPRelationResolver.ts:38 - return allERPModules.find(
- .\src\runtime\modules\lifecycle\ERPRelationResolver.ts:49 - for (const module of allERPModules) {
- .\src\runtime\modules\lifecycle\ERPRelationResolver.ts:59 - allERPModules.find(
- .\src\runtime\modules\registry\registerCoreModules.ts:2 - import { allERPModules } from "../definitions/coreModules";
- .\src\runtime\modules\registry\registerCoreModules.ts:5 - ERPModuleRegistry.registerMany(allERPModules);
- .\src\runtime\modules\index.ts:34 - allERPModules,
- .\src\runtime\modules\registerCoreERPModules.ts:2 - allERPModules,
- .\src\runtime\modules\registerCoreERPModules.ts:13 - allERPModules