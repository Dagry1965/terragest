# TERRAGEST ERP RELATION RUNTIME AUDIT

Date : 2026-05-12 15:22:41

# 1. RELATION ENGINES

## relation-engine.ts

```ts
export type RelationType =
  | "one-to-one"
  | "one-to-many"
  | "many-to-one"
  | "many-to-many";

export type ERPRelation = {
  sourceModule: string;

  targetModule: string;

  relationType: RelationType;

  foreignKey: string;

  label: string;
};

const relationRegistry:
  ERPRelation[] = [
    {
      sourceModule:
        "exploitations",

      targetModule:
        "terrains",

      relationType:
        "one-to-many",

      foreignKey:
        "exploitationId",

      label:
        "Terrains de l’exploitation",
    },

    {
      sourceModule:
        "materiels",

      targetModule:
        "interventions",

      relationType:
        "one-to-many",

      foreignKey:
        "materielId",

      label:
        "Interventions matériel",
    },

    {
      sourceModule:
        "stocks",

      targetModule:
        "mouvements",

      relationType:
        "one-to-many",

      foreignKey:
        "stockId",

      label:
        "Mouvements de stock",
    },

    {
      sourceModule:
        "contrats",

      targetModule:
        "paiements",

      relationType:
        "one-to-many",

      foreignKey:
        "contratId",

      label:
        "Paiements du contrat",
    },
  ];

export function getRelations(
  module: string
) {
  return relationRegistry.filter(
    (relation) =>
      relation.sourceModule ===
        module ||
      relation.targetModule ===
        module
  );
}

export function getRelationBetween(
  sourceModule: string,
  targetModule: string
) {
  return relationRegistry.find(
    (relation) =>
      relation.sourceModule ===
        sourceModule &&
      relation.targetModule ===
        targetModule
  );
}

export function getAllRelations() {
  return relationRegistry;
}

```

## ERPRelationField.tsx

```ts
"use client";

import { useEffect, useMemo, useState } from "react";

import type { ERPModuleField } from "@/runtime/modules";

import { ERPRelationDataLoader }
from "@/runtime/modules/lifecycle/ERPRelationDataLoader";

type RelationOption = {
  id: string;
  label: string;
};

type ERPRelationFieldProps = {
  field: ERPModuleField;
  initialValue?: unknown;
  className?: string;
};

export function ERPRelationField({
  field,
  initialValue,
  className,
}: ERPRelationFieldProps) {

  const [options, setOptions] =
    useState<RelationOption[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const targetModule =
    field.references?.module ??
    field.relation;

  useEffect(() => {

    async function loadOptions() {

      if (!targetModule) {
        return;
      }

      setLoading(true);

      try {

        const result =
          await ERPRelationDataLoader.load(
            targetModule
          );

        setOptions(result);

      } catch (error) {

        console.error(
          "ERP RELATION FIELD LOAD ERROR",
          error
        );

        setOptions([]);

      } finally {

        setLoading(false);

      }
    }

    loadOptions();

  }, [targetModule]);

  const filteredOptions =
    useMemo(() => {

      const value =
        search.trim().toLowerCase();

      if (!value) {
        return options;
      }

      return options.filter((option) =>
        option.label
          .toLowerCase()
          .includes(value)
      );

    }, [options, search]);

  return (

    <div className="space-y-2">

      <input
        type="search"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        placeholder="Rechercher..."
        className={className}
      />

      <select
        key={`${field.key}-${String(initialValue ?? "")}-${options.length}`}
        name={field.key}
        required={field.required}
        defaultValue={String(initialValue ?? "")}
        className={className}
      >

        <option value="">
          {loading
            ? "Chargement..."
            : "Sélectionner"}
        </option>

        {filteredOptions.map((option) => (

          <option
            key={option.id}
            value={option.id}
          >
            {option.label}
          </option>

        ))}

      </select>

      {!loading &&
      options.length === 0 ? (

        <p
          className="
            text-xs
            text-slate-500
          "
        >
          Aucune donnée liée disponible.
        </p>

      ) : null}

    </div>

  );
}
```

## ERPRelationsGraph.tsx

```ts
"use client";

export function ERPRelationsGraph() {

  const relations = [
    {
      source: "Exploitation",
      target: "Terrains",
    },
    {
      source: "Terrains",
      target: "Matériels",
    },
    {
      source: "Matériels",
      target: "Interventions",
    },
    {
      source: "Interventions",
      target: "Maintenance",
    },
    {
      source: "Maintenance",
      target: "Stocks",
    },
  ];

  return (

    <div className="space-y-4">

      {relations.map((relation) => (

        <div
          key={`${relation.source}-${relation.target}`}
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <div
            className="
              rounded-xl
              bg-slate-900
              px-4
              py-2
              text-sm
              font-semibold
              text-white
            "
          >
            {relation.source}
          </div>

          <div className="flex-1 border-t border-dashed border-slate-300" />

          <div
            className="
              rounded-xl
              bg-slate-100
              px-4
              py-2
              text-sm
              font-semibold
              text-slate-900
            "
          >
            {relation.target}
          </div>

        </div>

      ))}

    </div>

  );
}
```

## RuntimeDataBinding.ts

```ts
import type {
  ERPModule,
} from "@/runtime/modules";

import {
  FirestoreRuntimeQuery,
  FirestoreRuntimeMutation,
} from "@/runtime/firestore";

export class RuntimeDataBinding {
  static async list(
    module: ERPModule
  ) {
    return FirestoreRuntimeQuery.list(
      module
    );
  }

  static async detail(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeQuery.detail(
      module,
      id
    );
  }

  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.create(
      module,
      data
    );
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.update(
      module,
      id,
      data
    );
  }

  static async delete(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeMutation.delete(
      module,
      id
    );
  }
}
```

## ERPRuntimeFieldValue.tsx

```ts
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModuleField } from "@/runtime/modules";

interface ERPRuntimeFieldValueProps {
  field: ERPModuleField;
  value: unknown;
}

export function ERPRuntimeFieldValue({
  field,
  value,
}: ERPRuntimeFieldValueProps) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-slate-500">—</span>;
  }

  if (field.type === "status") {
    return <ERPBadge tone="info">{String(value)}</ERPBadge>;
  }

  if (field.type === "boolean") {
    return (
      <ERPBadge tone={value ? "success" : "danger"}>
        {value ? "Oui" : "Non"}
      </ERPBadge>
    );
  }

  if (field.type === "currency") {
    return <span>{Number(value).toLocaleString("fr-FR")} FCFA</span>;
  }

  if (field.type === "date" || field.type === "datetime") {
    return <span>{String(value)}</span>;
  }

  return <span>{String(value)}</span>;
}

```

# 2. RELATION PATTERNS

## SEARCH : relation:

```txt
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:146 { key: "produitId", label: "Produit", type: "relation", relation: "produits", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:187 { key: "produitId", label: "Produit", type: "relation", relation: "produits", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:188 { key: "stockId", label: "Stock", type: "relation", relation: "stocks", required: true },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:231 { key: "materielId", label: "MatÃƒÂ©riel", type: "relation", relation: "materiels" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:232 { key: "produitId", label: "Produit consommÃƒÂ©", type: "relation", relation: "produits" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:272 { key: "materielId", label: "MatÃƒÂ©riel", type: "relation", relation: "materiels" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:273 { key: "produitId", label: "Produit utilisÃƒÂ©", type: "relation", relation: "produits" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:314 { key: "proprietaireId", label: "PropriÃƒÂ©taire", type: "relation", relation: "utilisateurs", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:17 { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:25 { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:26 { key: "commandeId", label: "Commande", type: "relation", relation: "commandes" },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:36 { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:148 relation: {
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:178 relation: {
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:213 relation: {
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:242 relation: {
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:265 relation: {
```

## SEARCH : labelField

```txt
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:151 labelField: "nom",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:181 labelField: "id",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:216 labelField: "nom",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:245 labelField: "nom",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:268 labelField: "id",
```

## SEARCH : collection:

```txt
C:\Users\Admin\terragest\src\runtime\data\adapters\ERPStorageAdapter.ts:3 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\ERPStorageAdapter.ts:8 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\ERPStorageAdapter.ts:14 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\ERPStorageAdapter.ts:19 collection: string
C:\Users\Admin\terragest\src\runtime\data\adapters\MemoryERPStorageAdapter.ts:12 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\MemoryERPStorageAdapter.ts:26 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\MemoryERPStorageAdapter.ts:45 collection: string,
C:\Users\Admin\terragest\src\runtime\data\adapters\MemoryERPStorageAdapter.ts:59 collection: string
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:48 collection: string;
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:7 collection: string;
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:19 collection: string;
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:25 collection: string;
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:40 collection: module.schema.collection,
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:56 collection: module.schema.collection,
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:66 collection: module.schema.collection,
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:30 collection: "utilisateurs",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:78 collection: "produits",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:142 collection: "stocks",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:183 collection: "mouvements",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:226 collection: "maintenance",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:267 collection: "interventions",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:308 collection: "terrains",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:475 collection: "fournisseurs",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:559 collection: "taches",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:600 collection: "incidents",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:647 collection: "parcelles",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:688 collection: "recoltes",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:729 collection: "intrants",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:150 collection: "produits",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:180 collection: "stocks",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:215 collection: "utilisateurs",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:244 collection: "terrains",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:267 collection: "parcelles",
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:78 collection: key,
C:\Users\Admin\terragest\src\runtime\modules\metadata\ERPModuleMetadata.ts:39 collection: string;
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:138 collection: string;
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPInMemoryPersistenceDriver.ts:13 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPInMemoryPersistenceDriver.ts:46 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPInMemoryPersistenceDriver.ts:57 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPPersistenceDriver.ts:4 collection: string;
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPPersistenceDriver.ts:12 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPPersistenceDriver.ts:17 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\drivers\ERPPersistenceDriver.ts:22 collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\repositories\ERPRuntimeRepository.ts:20 private readonly collection: string,
C:\Users\Admin\terragest\src\runtime\persistence\repositories\ERPRuntimeRepository.ts:37 collection: this.collection,
```

## SEARCH : module:

```txt
C:\Users\Admin\terragest\src\app\(private)\runtime\[module]\page.tsx:7 module: string;
C:\Users\Admin\terragest\src\components\erp\actions\ERPRowActions.tsx:7 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx:14 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:11 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:18 function createRows(module: ERPModule): Record<string, unknown>[] {
C:\Users\Admin\terragest\src\components\erp\event-runtime\ERPEventRuntimePanel.tsx:14 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\forms\ERPDynamicForm.tsx:26 module: string;
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:38 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:182 module: module.metadata.key,
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:226 module: module.metadata.key,
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormActions.tsx:6 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormSummaryPanel.tsx:6 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormTabs.tsx:17 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\live-operational\ERPLiveOperationalPanel.tsx:4 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\navigation\ERPBreadcrumbs.tsx:5 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\realtime\ERPRealtimeSyncBadge.tsx:21 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeDetails.tsx:7 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeForm.tsx:6 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:98 module: "stocks",
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeOverviewPage.tsx:103 module: "paiements",
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx:56 module: {module?.metadata?.key ?? "aucun"}
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:9 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:13 function createDemoRows(module: ERPModule): Record<string, unknown>[] {
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeWorkersPanel.tsx:13 module: string;
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeWorkersPanel.tsx:73 module: worker.module,
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartAnomaliesPanel.tsx:6 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartOperationalIntelligencePanel.tsx:8 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartPredictionsPanel.tsx:5 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartRecommendationsPanel.tsx:7 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\smart-intelligence\SmartScorePanel.tsx:6 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartInsightsPanel.tsx:6 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartPriorityPanel.tsx:6 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartRecommendationsPanel.tsx:5 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\smart-runtime\ERPSmartRuntimePanel.tsx:7 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:24 module: unknown,
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActivityPanel.tsx:5 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleDashboardTemplate.tsx:8 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleHeader.tsx:8 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleKpiGrid.tsx:5 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleListTemplate.tsx:10 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleTabs.tsx:5 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:5 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx:14 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceActivity.tsx:5 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx:8 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceContextPanel.tsx:6 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceLayout.tsx:15 module: ERPModule;
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceQuickActions.tsx:6 module: ERPModule;
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:13 module: string;
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:31 module: payload.module,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:51 module: payload.module,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:62 module: payload.module,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:71 module: payload.module,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:86 module: payload.module,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:98 module: payload.module,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:115 module: payload.module,
C:\Users\Admin\terragest\src\core\actions\erp-action-engine.ts:135 module: payload.module,
C:\Users\Admin\terragest\src\core\audit\audit-service.ts:2 module: string;
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:6 module: string;
C:\Users\Admin\terragest\src\core\automation\automation-engine.ts:32 module: string,
C:\Users\Admin\terragest\src\core\collaboration\collaborative-runtime.ts:6 module: string;
C:\Users\Admin\terragest\src\core\dead-letter\dead-letter-queue.ts:18 module: job.module,
C:\Users\Admin\terragest\src\core\dead-letter\dead-letter-queue.ts:58 module: job.module,
C:\Users\Admin\terragest\src\core\event-bus\event-bus.ts:8 module: string;
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:28 module: "materiels",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:41 module: "materiels",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:54 module: "materiels",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:64 module: "materiels",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:93 module: "stocks",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:103 module: "stocks",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:130 module: "contrats",
C:\Users\Admin\terragest\src\core\event-bus\register-event-subscribers.ts:140 module: "contrats",
C:\Users\Admin\terragest\src\core\events\domain-events.ts:3 module: string;
C:\Users\Admin\terragest\src\core\hooks\erp-hooks.ts:2 module: string;
C:\Users\Admin\terragest\src\core\hooks\erp-hooks.ts:30 module: string,
C:\Users\Admin\terragest\src\core\hooks\erp-hooks.ts:37 module: string
C:\Users\Admin\terragest\src\core\hooks\erp-hooks.ts:43 module: string,
C:\Users\Admin\terragest\src\core\jobs\job-queue.ts:11 module: string;
C:\Users\Admin\terragest\src\core\jobs\job-worker.ts:20 module: job.module,
C:\Users\Admin\terragest\src\core\jobs\job-worker.ts:38 module: job.module,
C:\Users\Admin\terragest\src\core\lifecycle\job-lifecycle.ts:18 module: job.module,
C:\Users\Admin\terragest\src\core\modules\module-registry.ts:73 module: (typeof coreERPModules)[number]
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:22 module: string;
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:31 module:
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:56 module:
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:79 module:
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:102 module:
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:116 module: string
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:103 module: string,
C:\Users\Admin\terragest\src\core\permissions\permission-engine.ts:122 module: string
C:\Users\Admin\terragest\src\core\persistence\runtime-persistence.ts:26 module: string
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:8 sourceModule: string;
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:10 targetModule: string;
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:22 sourceModule:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:25 targetModule:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:39 sourceModule:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:42 targetModule:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:56 sourceModule:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:59 targetModule:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:73 sourceModule:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:76 targetModule:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:91 module: string
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:103 sourceModule: string,
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:104 targetModule: string
C:\Users\Admin\terragest\src\core\retry\retry-engine.ts:32 module: job.module,
C:\Users\Admin\terragest\src\core\retry\retry-engine.ts:59 module: job.module,
C:\Users\Admin\terragest\src\core\router\worker-router.ts:65 module: job.module,
C:\Users\Admin\terragest\src\core\router\worker-router.ts:79 module: job.module,
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:12 module: "materiels",
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:31 module: "materiels",
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:45 module: "stocks",
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:65 module: "stocks",
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:79 module: "contrats",
C:\Users\Admin\terragest\src\core\rules\register-rules.ts:98 module: "contrats",
C:\Users\Admin\terragest\src\core\rules\rules-engine.ts:4 module: string;
C:\Users\Admin\terragest\src\core\rules\rules-engine.ts:31 module: string
C:\Users\Admin\terragest\src\core\rules\rules-engine.ts:41 module: string,
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:6 module: string;
C:\Users\Admin\terragest\src\core\runtime\runtime-timeline.ts:70 module: string
C:\Users\Admin\terragest\src\core\schemas\exploitations.schema.ts:4 module: "exploitations",
C:\Users\Admin\terragest\src\core\schemas\materiels.schema.ts:4 module: "materiels",
C:\Users\Admin\terragest\src\core\schemas\terrains.schema.ts:4 module: "terrains",
C:\Users\Admin\terragest\src\core\schemas\types.ts:31 module: string;
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:6 module: "materiels",
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:44 module: "contrats",
C:\Users\Admin\terragest\src\core\status\register-statuses.ts:80 module: "workflows",
C:\Users\Admin\terragest\src\core\status\status-engine.ts:17 module: string;
C:\Users\Admin\terragest\src\core\status\status-engine.ts:33 module: string
C:\Users\Admin\terragest\src\core\status\status-engine.ts:42 module: string,
C:\Users\Admin\terragest\src\core\supervision\supervision-service.ts:2 module: string;
C:\Users\Admin\terragest\src\core\transactions\business-transaction-engine.ts:10 module: string;
C:\Users\Admin\terragest\src\core\transitions\transition-engine.ts:10 module: string;
C:\Users\Admin\terragest\src\core\transitions\transition-engine.ts:37 module: payload.module,
C:\Users\Admin\terragest\src\core\transitions\transition-engine.ts:55 module: payload.module,
C:\Users\Admin\terragest\src\core\worker-loop\worker-loop.ts:35 module: job.module,
C:\Users\Admin\terragest\src\core\workers\analytics-worker.ts:13 module: job.module,
C:\Users\Admin\terragest\src\core\workers\export-worker.ts:13 module: job.module,
C:\Users\Admin\terragest\src\core\workers\maintenance-worker.ts:13 module: job.module,
C:\Users\Admin\terragest\src\core\workers\notification-worker.ts:13 module: job.module,
C:\Users\Admin\terragest\src\core\workers\workflow-worker.ts:17 module: job.module,
C:\Users\Admin\terragest\src\core\workflows\workflow-engine.ts:3 module: string;
C:\Users\Admin\terragest\src\features\audit\types\AuditLog.ts:13 module: string;
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:139 module:
C:\Users\Admin\terragest\src\features\materiels\runtime\EnterpriseMaterielFlow.ts:163 module:
C:\Users\Admin\terragest\src\features\workflow\types\WorkflowHistory.ts:5 module: string;
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:51 module: (typeof coreERPModules)[number]
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:87 module: (typeof coreERPModules)[number]
C:\Users\Admin\terragest\src\platform\policies\types\Policy.ts:2 module: string;
C:\Users\Admin\terragest\src\runtime\actions\ERPActionRegistry.ts:10 module: ERPModule
C:\Users\Admin\terragest\src\runtime\actions\ERPActionRegistry.ts:20 module: ERPModule
C:\Users\Admin\terragest\src\runtime\actions\ERPActionRegistry.ts:26 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\actions\ERPActionRegistry.ts:64 module: ERPModule
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:5 module: ERPModule
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:14 module: ERPModule
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:67 module: ERPModule
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:73 module: ERPModule
C:\Users\Admin\terragest\src\runtime\ai\anomalies\ERPAIAnomaly.ts:3 module: string;
C:\Users\Admin\terragest\src\runtime\ai\anomalies\ERPAIAnomalyDetector.ts:15 module: "monitoring",
C:\Users\Admin\terragest\src\runtime\ai\anomalies\ERPAIAnomalyDetector.ts:26 module: "health",
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsight.ts:10 module: string;
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:18 module: "runtime",
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:27 module: "monitoring",
C:\Users\Admin\terragest\src\runtime\ai\insights\ERPAIInsightEngine.ts:36 module: "platform",
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendation.ts:5 module: string;
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:13 module: "security",
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:22 module: "persistence",
C:\Users\Admin\terragest\src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts:31 module: "streams",
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:5 module: string;
C:\Users\Admin\terragest\src\runtime\automation\ERPAutomationEngine.ts:29 module: string,
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:24 module: "stocks",
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:32 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\automation\ERPRuntimeAutomationSeed.ts:40 module: "paiements",
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:44 module:
C:\Users\Admin\terragest\src\runtime\automation\runtimeAutomations.ts:89 module:
C:\Users\Admin\terragest\src\runtime\automation\seedERPRuntimeAutomation.ts:16 module: "runtime",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:52 module:
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationEngine.ts:100 module:
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:10 module: "stocks",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:18 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:26 module: "paiements",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRegistry.ts:34 module: "interventions",
C:\Users\Admin\terragest\src\runtime\automation\engine\ERPAutomationRule.ts:16 module: string;
C:\Users\Admin\terragest\src\runtime\automation\timeline\ERPAutomationExecution.ts:5 module: string;
C:\Users\Admin\terragest\src\runtime\business-rules\RuntimeBusinessRule.ts:5 module: string;
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:22 module:
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:43 module:
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:66 module:
C:\Users\Admin\terragest\src\runtime\business-rules\runtimeBusinessRules.ts:87 module:
C:\Users\Admin\terragest\src\runtime\compliance\ERPComplianceChecker.ts:36 module: ERPModuleDefinition,
C:\Users\Admin\terragest\src\runtime\context\RuntimeContextEngine.ts:12 module:
C:\Users\Admin\terragest\src\runtime\core\CentralRuntimeRegistry.ts:73 registerModule(module: RuntimeModuleContract) {
C:\Users\Admin\terragest\src\runtime\core\RuntimeModuleConnector.ts:10 module: RuntimeModuleContract
C:\Users\Admin\terragest\src\runtime\core\types\RuntimeEvent.ts:5 module: string;
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:7 static async create(module: ERPModule, payload: Record<string, unknown>) {
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:12 module: module.metadata.key,
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:20 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:28 module: module.metadata.key,
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:35 static async delete(module: ERPModule, id: string) {
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:40 module: module.metadata.key,
C:\Users\Admin\terragest\src\runtime\data\ERPDataEngine.ts:47 static async list(module: ERPModule) {
C:\Users\Admin\terragest\src\runtime\data\ERPDataRepository.ts:18 module: string
C:\Users\Admin\terragest\src\runtime\data\ERPDataRepository.ts:28 module: string,
C:\Users\Admin\terragest\src\runtime\data\ERPDataRepository.ts:41 module: string,
C:\Users\Admin\terragest\src\runtime\data\ERPDataRepository.ts:59 module: string,
C:\Users\Admin\terragest\src\runtime\data\ERPDataRepository.ts:84 module: string,
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:9 module: string
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:17 module: string,
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:29 module: string,
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:41 module: string,
C:\Users\Admin\terragest\src\runtime\data\ERPModuleDataService.ts:55 module: string,
C:\Users\Admin\terragest\src\runtime\data\ERPModuleRuntimeDataBridge.ts:12 module: string
C:\Users\Admin\terragest\src\runtime\data\ERPModuleRuntimeDataBridge.ts:29 module: string,
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:12 module: ERPModule
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:20 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:30 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:40 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\data-binding\RuntimeDataBinding.ts:52 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:88 module:
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:155 module: "terragest",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:288 module: "terragest",
C:\Users\Admin\terragest\src\runtime\domain\TerragestDomainRuntimeBridge.ts:295 module: "terragest",
C:\Users\Admin\terragest\src\runtime\domain\adapters\TerragestBusinessRuleAdapter.ts:9 module: rule.module,
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:22 module: string;
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:33 module: "terrains",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:42 module: "terrains",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:50 module: "terrains",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:59 module: "terrains",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:69 module: "exploitations",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:77 module: "exploitations",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:85 module: "exploitations",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:93 module: "exploitations",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:102 module: "exploitations",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:110 module: "exploitations",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:120 module: "contrats",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:128 module: "contrats",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:136 module: "contrats",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:146 module: "campagnes",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:154 module: "campagnes",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:162 module: "campagnes",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:170 module: "campagnes",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:178 module: "campagnes",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:187 module: "campagnes",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:195 module: "campagnes",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:204 module: "campagnes",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:213 module: "produits",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:221 module: "produits",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:229 module: "produits",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:238 module: "stocks",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:247 module: "stocks",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:256 module: "mouvementsStock",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:265 module: "operations",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:273 module: "operations",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:282 module: "materiels",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:291 module: "materiels",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:300 module: "ventes",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:308 module: "ventes",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:316 module: "ventes",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:326 module: "paiements",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:334 module: "paiements",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:342 module: "paiements",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:351 module: "biensImmobiliers",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:359 module: "biensImmobiliers",
C:\Users\Admin\terragest\src\runtime\domain\rules\TerragestBusinessRules.ts:368 module: "audit",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeBus.ts:10 sourceModule: string;
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:7 sourceModule: "materiels",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:19 sourceModule: "stocks",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts:31 sourceModule: "exploitations",
C:\Users\Admin\terragest\src\runtime\event-runtime\ERPEventRuntimeTypes.ts:10 sourceModule: string;
C:\Users\Admin\terragest\src\runtime\events\ERPDomainEvent.ts:16 module: string;
C:\Users\Admin\terragest\src\runtime\events\ERPEventBus.ts:5 module: string;
C:\Users\Admin\terragest\src\runtime\events\ERPRuntimeEventOrchestrator.ts:39 module:
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:9 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:19 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeMutation.ts:31 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:10 module: ERPModule
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeQuery.ts:18 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRealtime.ts:15 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:18 module: ERPModule
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:31 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:49 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:67 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\firestore\FirestoreRuntimeRepository.ts:86 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormDefinition.ts:9 module: string;
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:31 module: string,
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:42 "No core module definition for module:",
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:36 module: RuntimeFormModule;
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:99 module: module?.metadata?.key,
C:\Users\Admin\terragest\src\runtime\generation\ERPDashboardGenerationEngine.ts:16 module: string;
C:\Users\Admin\terragest\src\runtime\generation\ERPDashboardGenerationEngine.ts:25 module: string,
C:\Users\Admin\terragest\src\runtime\generation\ERPFormGenerationEngine.ts:17 module: string;
C:\Users\Admin\terragest\src\runtime\generation\ERPFormGenerationEngine.ts:26 module: string,
C:\Users\Admin\terragest\src\runtime\generation\ERPMenuGenerationEngine.ts:13 module: string,
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleGenerationEngine.ts:18 module: ERPGeneratedModule
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleGenerationEngine.ts:53 module: module.key,
C:\Users\Admin\terragest\src\runtime\generation\ERPModuleRuntimeFactory.tsx:17 module: string;
C:\Users\Admin\terragest\src\runtime\generation\ERPPermissionsGenerationEngine.ts:3 module: string;
C:\Users\Admin\terragest\src\runtime\generation\ERPPermissionsGenerationEngine.ts:11 module: string
C:\Users\Admin\terragest\src\runtime\generation\ERPRoutesGenerationEngine.ts:3 module: string;
C:\Users\Admin\terragest\src\runtime\generation\ERPRoutesGenerationEngine.ts:17 module: string
C:\Users\Admin\terragest\src\runtime\generation\ERPTableGenerationEngine.ts:14 module: string;
C:\Users\Admin\terragest\src\runtime\generation\ERPTableGenerationEngine.ts:23 module: string,
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:3 module: string;
C:\Users\Admin\terragest\src\runtime\generation\ERPWorkflowGenerationEngine.ts:11 module: string
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataGenerationBridge.ts:23 module:
C:\Users\Admin\terragest\src\runtime\metadata\ERPMetadataRegistry.ts:35 module: ERPModuleMetadata
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleRegistry.ts:8 private getModuleKey(module: ERPAnyModule): string {
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleRegistry.ts:19 register(module: ERPAnyModule) {
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:30 module: ERPModule;
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:37 static buildTable(module: ERPModule): ERPTableDefinition {
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:39 module: module.metadata.key,
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:53 static buildForm(module: ERPModule): ERPFormDefinition {
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:55 module: module.metadata.key,
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:63 static buildDetails(module: ERPModule): ERPDetailsDefinition {
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:65 module: module.metadata.key,
C:\Users\Admin\terragest\src\runtime\modules\builders\ERPModuleBuilder.ts:73 static buildRuntime(module: ERPModule): ERPModuleRuntimeDefinition {
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:46 { key: "terrains", label: "Terrains possÃƒÂ©dÃƒÂ©s", targetModule: "terrains", type: "one-to-many" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:77 module: "produits",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:99 { key: "stocks", label: "Stocks liÃƒÂ©s", targetModule: "stocks", type: "one-to-many" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:100 { key: "mouvements", label: "Mouvements de stock", targetModule: "mouvements", type: "one-to-many" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:101 { key: "maintenance", label: "Maintenance", targetModule: "maintenance", type: "one-to-many" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:102 { key: "interventions", label: "Interventions", targetModule: "interventions", type: "one-to-many" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:141 module: "stocks",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:182 module: "mouvements",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:225 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:266 module: "interventions",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:307 module: "terrains",
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:432 { key: "proprietaire", label: "PropriÃƒÂ©taire", targetModule: "utilisateurs", type: "many-to-one" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:433 { key: "exploitations", label: "Exploitations liÃƒÂ©es", targetModule: "exploitations", type: "one-to-many" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:434 { key: "contrats", label: "Contrats fonciers", targetModule: "contrats", type: "one-to-many" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:474 module: "fournisseurs",
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeFormFactory.ts:5 static create(module: ERPModule) {
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:7 static create(module: ERPModule, pageType: RuntimePageType) {
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimePageFactory.ts:12 module: module.metadata,
C:\Users\Admin\terragest\src\runtime\modules\factories\RuntimeTableFactory.ts:5 static create(module: ERPModule) {
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:149 module: "produits",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:179 module: "stocks",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:214 module: "utilisateurs",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:243 module: "terrains",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:266 module: "parcelles",
C:\Users\Admin\terragest\src\runtime\modules\factory\createBusinessModule.ts:76 module: key,
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleLifecycleManager.ts:6 module: ERPModule
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPModuleLifecycleManager.ts:22 module: ERPModule
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleDetailRenderer.tsx:4 module: ERPModuleDefinition;
C:\Users\Admin\terragest\src\runtime\modules\renderer\ERPModuleListRenderer.tsx:6 module: ERPModuleDefinition;
C:\Users\Admin\terragest\src\runtime\modules\renderers\ERPModuleRenderer.ts:5 static renderPage(module: ERPModule, pageType: RuntimePageType) {
C:\Users\Admin\terragest\src\runtime\modules\renderers\ERPModuleRenderer.ts:9 static renderList(module: ERPModule) {
C:\Users\Admin\terragest\src\runtime\modules\renderers\ERPModuleRenderer.ts:13 static renderCreate(module: ERPModule) {
C:\Users\Admin\terragest\src\runtime\modules\renderers\ERPModuleRenderer.ts:17 static renderEdit(module: ERPModule) {
C:\Users\Admin\terragest\src\runtime\modules\renderers\ERPModuleRenderer.ts:21 static renderDetails(module: ERPModule) {
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:6 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:16 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\mutations\RuntimeMutationEngine.ts:28 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\navigation\ERPRelationNavigation.tsx:13 module: string;
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:14 module: string,
C:\Users\Admin\terragest\src\runtime\notifications\RuntimeNotification.ts:5 module: string;
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditBridge.ts:25 module:
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:5 module: string;
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeAuditTrail.ts:37 module: string
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:26 module: "materiels",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:35 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:42 module: "paiements",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:51 module: "stocks",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:60 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\observability\ERPRuntimeSeed.ts:69 module: "stocks",
C:\Users\Admin\terragest\src\runtime\observability\seedERPRuntimeObservability.ts:10 module: "runtime",
C:\Users\Admin\terragest\src\runtime\observability\alerts\ERPAlert.ts:10 module: string;
C:\Users\Admin\terragest\src\runtime\observability\generated\achats\achats.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\clients\clients.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\commandes\commandes.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\depenses\depenses.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\devis\devis.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\employes\employes.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\factures\factures.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\fournisseurs\fournisseurs.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\incidents\incidents.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\intrants\intrants.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\livraisons\livraisons.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\parcelles\parcelles.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\recettes\recettes.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\recoltes\recoltes.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\taches\taches.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\generated\vehicules\vehicules.observability.ts:3 module:
C:\Users\Admin\terragest\src\runtime\observability\traces\ERPTrace.ts:4 module: string;
C:\Users\Admin\terragest\src\runtime\orchestration\RuntimeModuleOrchestrator.ts:14 module: string,
C:\Users\Admin\terragest\src\runtime\permissions\ERPProtectedAction.tsx:12 module: string;
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermission.ts:3 module: string;
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:10 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:16 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:22 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:28 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:34 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:40 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:46 module: "stocks",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:52 module: "produits",
C:\Users\Admin\terragest\src\runtime\permissions\runtimePermissions.ts:58 module: "exploitations",
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:12 module: string,
C:\Users\Admin\terragest\src\runtime\permissions\RuntimePermissionsEngine.ts:43 module: string,
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:16 module: "materiels",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:22 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:28 module: "stocks",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:39 module: "paiements",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:44 module: "contrats",
C:\Users\Admin\terragest\src\runtime\persistence\ERPPersistenceSeed.ts:50 module: "paiements",
C:\Users\Admin\terragest\src\runtime\policies\ERPPolicyEngine.ts:5 module: string;
C:\Users\Admin\terragest\src\runtime\policies\ERPPolicyEngine.ts:29 module: string
C:\Users\Admin\terragest\src\runtime\policies\ERPPolicyEngine.ts:39 module: string,
C:\Users\Admin\terragest\src\runtime\policies\ERPRuntimeAuthorizationBridge.ts:8 module: string,
C:\Users\Admin\terragest\src\runtime\policies\generated\achats\achats.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\clients\clients.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\commandes\commandes.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\depenses\depenses.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\devis\devis.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\employes\employes.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\factures\factures.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\fournisseurs\fournisseurs.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\incidents\incidents.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\intrants\intrants.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\livraisons\livraisons.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\parcelles\parcelles.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\recettes\recettes.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\recoltes\recoltes.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\taches\taches.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\policies\generated\vehicules\vehicules.policy.ts:3 module:
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:5 static async list(module: ERPModule) {
C:\Users\Admin\terragest\src\runtime\query\RuntimeQueryEngine.ts:9 static async detail(module: ERPModule, id: string) {
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:29 module: "cockpit",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:38 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:45 module: "materiels",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:54 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:63 module: "stocks",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:72 module: "paiements",
C:\Users\Admin\terragest\src\runtime\realtime\ERPRealtimeSeed.ts:81 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:9 module: string
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:25 module: string
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:38 module: string
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:6 function getStore(module: ERPModule): RuntimeRecord[] {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:17 static async findMany(module: ERPModule): Promise<RuntimeRecord[]> {
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:28 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:37 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:53 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:79 static async seed(module: ERPModule): Promise<RuntimeRecord[]> {
C:\Users\Admin\terragest\src\runtime\resilience\ERPRuntimeResilienceSeed.ts:14 module: "stocks",
C:\Users\Admin\terragest\src\runtime\resilience\ERPRuntimeResilienceSeed.ts:23 module: "paiements",
C:\Users\Admin\terragest\src\runtime\resilience\ERPRuntimeResilienceSeed.ts:33 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\resilience\queue\ERPQueueJob.ts:11 module: string;
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:57 module: job.module,
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:73 module: "runtime",
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:111 module: job.module,
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:138 module: job.module,
C:\Users\Admin\terragest\src\runtime\resilience\worker\ERPQueueWorker.ts:155 module: job.module,
C:\Users\Admin\terragest\src\runtime\rules\ERPBusinessRuleEngine.ts:5 module: string;
C:\Users\Admin\terragest\src\runtime\rules\ERPBusinessRuleEngine.ts:27 module: string
C:\Users\Admin\terragest\src\runtime\rules\ERPBusinessRuleEngine.ts:37 module: string,
C:\Users\Admin\terragest\src\runtime\rules\ERPRuntimeValidationBridge.ts:8 module: string,
C:\Users\Admin\terragest\src\runtime\rules\registry\RuleRegistry.ts:26 module: string
C:\Users\Admin\terragest\src\runtime\rules\types\Rule.ts:2 module: string;
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchema.ts:19 module: string;
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchemaRegistry.ts:34 module: schema.moduleKey,
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchemaRegistry.ts:77 module: string
C:\Users\Admin\terragest\src\runtime\security\RuntimeSecurityManager.ts:81 module:
C:\Users\Admin\terragest\src\runtime\security\audit\ERPSecurityAuditLog.ts:10 module: string;
C:\Users\Admin\terragest\src\runtime\security\guards\ERPAccessGuard.ts:14 module: string,
C:\Users\Admin\terragest\src\runtime\security\guards\ERPAccessGuard.ts:43 module: string,
C:\Users\Admin\terragest\src\runtime\security\permissions\ERPPermission.ts:15 module: string;
C:\Users\Admin\terragest\src\runtime\security\permissions\ERPPermissionRegistry.ts:21 module: module.key,
C:\Users\Admin\terragest\src\runtime\security\policies\ERPPolicy.ts:6 module: string;
C:\Users\Admin\terragest\src\runtime\security\policies\ERPPolicyRegistry.ts:42 module: module.key,
C:\Users\Admin\terragest\src\runtime\security\policies\ERPPolicyRegistry.ts:47 module: module.key,
C:\Users\Admin\terragest\src\runtime\security\policies\ERPPolicyRegistry.ts:52 module: module.key,
C:\Users\Admin\terragest\src\runtime\security\policies\ERPPolicyRegistry.ts:57 module: module.key,
C:\Users\Admin\terragest\src\runtime\security\policies\ERPPolicyRegistry.ts:62 module: module.key,
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartAnomalyDetector.ts:5 static detect(module: ERPModule): SmartAnomaly[] {
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartOperationalIntelligence.ts:8 static analyse(module: ERPModule) {
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartPredictionEngine.ts:5 static predict(module: ERPModule): SmartPrediction[] {
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartRecommendationEngine.ts:5 static recommend(module: ERPModule): SmartRecommendation[] {
C:\Users\Admin\terragest\src\runtime\smart-intelligence\SmartScoringEngine.ts:12 static score(module: ERPModule): SmartScore {
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartPriorityEngine.ts:9 static priorities(module: ERPModule): ERPSmartPriority[] {
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRecommendations.ts:4 static generate(module: ERPModule): string[] {
C:\Users\Admin\terragest\src\runtime\smart-runtime\ERPSmartRuntimeEngine.ts:5 static analyse(module: ERPModule): ERPSmartInsight[] {
C:\Users\Admin\terragest\src\runtime\state\ERPStateBadge.tsx:10 module: string;
C:\Users\Admin\terragest\src\runtime\state\RuntimeState.ts:3 module: string;
C:\Users\Admin\terragest\src\runtime\state\RuntimeStateEngine.ts:9 module: string
C:\Users\Admin\terragest\src\runtime\state\RuntimeStateEngine.ts:23 module: string,
C:\Users\Admin\terragest\src\runtime\state\RuntimeStateEngine.ts:43 module: string,
C:\Users\Admin\terragest\src\runtime\state\RuntimeStateEngine.ts:66 module: string,
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:14 module:
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:31 module:
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:48 module:
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:65 module:
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:89 module:
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:103 module:
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:117 module:
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:138 module:
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:152 module:
C:\Users\Admin\terragest\src\runtime\state\runtimeStates.ts:166 module:
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:16 module: "runtime",
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:23 module: "workers",
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:30 module: "security",
C:\Users\Admin\terragest\src\runtime\streams\ERPStreamsSeed.ts:37 module: "monitoring",
C:\Users\Admin\terragest\src\runtime\streams\events\ERPStreamEvent.ts:9 module: string;
C:\Users\Admin\terragest\src\runtime\streams\history\ERPStreamHistoryStore.ts:26 module: string
C:\Users\Admin\terragest\src\runtime\tenant\isolation\ERPTenantIsolation.ts:31 `Tenant cannot access module: ${moduleKey}`
C:\Users\Admin\terragest\src\runtime\testing\engine\ERPTestingTypes.ts:21 module: string;
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:12 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:22 module: "paiements",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:32 module: "runtime",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:42 module: "security",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:52 module: "monitoring",
C:\Users\Admin\terragest\src\runtime\testing\registry\ERPTestingRegistry.ts:62 module: "automation",
C:\Users\Admin\terragest\src\runtime\ui\ERPUIComposition.ts:18 static compose(module: ERPModule): ERPUIComposition {
C:\Users\Admin\terragest\src\runtime\validation\RuntimeValidationEngine.ts:16 module: ERPModule,
C:\Users\Admin\terragest\src\runtime\workers\engine\ERPWorkerEngine.ts:42 module: string,
C:\Users\Admin\terragest\src\runtime\workers\engine\ERPWorkerTypes.ts:25 module: string;
C:\Users\Admin\terragest\src\runtime\workers\engine\ERPWorkerTypes.ts:36 module: string;
C:\Users\Admin\terragest\src\runtime\workers\scheduler\ERPSchedulerRegistry.ts:9 module: "stocks",
C:\Users\Admin\terragest\src\runtime\workers\scheduler\ERPSchedulerRegistry.ts:18 module: "paiements",
C:\Users\Admin\terragest\src\runtime\workers\scheduler\ERPSchedulerRegistry.ts:27 module: "reporting",
C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowHistoryEntry.ts:3 module: string;
C:\Users\Admin\terragest\src\runtime\workflow-ui\ERPWorkflowActions.tsx:10 module: string;
C:\Users\Admin\terragest\src\runtime\workflow-ui\maintenance.workflow.ts:9 module:
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:25 module: string
C:\Users\Admin\terragest\src\runtime\workflow-ui\WorkflowRuntimeEngine.ts:35 module: string,
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:3 module: string;
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:23 module: string
C:\Users\Admin\terragest\src\runtime\workflows\ERPWorkflowRuntimeEngine.ts:33 module: string,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:35 byModule(module: string) {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:63 module: definition.module,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:76 module: definition.module,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:84 module: definition.module,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:94 module: definition.module,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:129 module: execution.module,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:137 module: execution.module,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts:147 module: execution.module,
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:30 module: string;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts:40 module: string;
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:8 module: "maintenance",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:46 module: "stocks",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts:73 module: "paiements",
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts:32 byModule(module: string) {
C:\Users\Admin\terragest\src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts:4 module: string;
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\contrats.form.ts:14 module: "contrats",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\exploitations.form.ts:15 module: "exploitations",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\interventions.form.ts:15 module: "interventions",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\maintenance.form.ts:15 module: "maintenance",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\materiels.form.ts:15 module: "materiels",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\paiements.form.ts:14 module: "paiements",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\produits.form.ts:14 module: "produits",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\stocks.form.ts:14 module: "stocks",
C:\Users\Admin\terragest\src\_quarantine\runtime-forms\definitions\terrains.form.ts:15 module: "terrains",
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\ExploitationsBusinessSchema.ts:8 module: "exploitations",
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\MaterielsBusinessSchema.ts:8 module: "materiels",
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\ProduitsBusinessSchema.ts:8 module: "produits",
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\StocksBusinessSchema.ts:8 module: "stocks",
C:\Users\Admin\terragest\src\_quarantine\runtime-schemas\TerrainsBusinessSchema.ts:8 module: "terrains",
```

## SEARCH : ERPRelation

```txt
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:5 import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:39 await ERPRelationDataLoader.load(
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:7 export function ERPRelationGraph() {
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:7 import { ERPRelationDataLoader }
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:8 from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:15 type ERPRelationFieldProps = {
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:21 export function ERPRelationField({
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:25 }: ERPRelationFieldProps) {
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:53 await ERPRelationDataLoader.load(
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:3 export function ERPRelationsGraph() {
C:\Users\Admin\terragest\src\components\erp\relations\index.ts:1 export { ERPRelationField } from "./ERPRelationField";
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:7 export type ERPRelation = {
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:20 ERPRelation[] = [
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:4 import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:74 await ERPRelationDataLoader.load(targetModule);
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:4 export class ERPRelationDataLoader {
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:18 label: ERPRelationDataLoader.getLabel(record),
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:8 export class ERPRelationResolver {
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:32 export type ERPRelationType =
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:118 relationType?: ERPRelationType;
C:\Users\Admin\terragest\src\runtime\navigation\ERPRelationNavigation.tsx:18 export function ERPRelationNavigation({
```

## SEARCH : Relation

```txt
C:\Users\Admin\terragest\src\app\(private)\contrats\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\contrats\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\exploitations\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\exploitations\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\interventions\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\interventions\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\maintenance\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\maintenance\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\materiels\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\materiels\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\paiements\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\paiements\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\produits\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\produits\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\stocks\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\stocks\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\terrains\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\terrains\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\components\erp\datatable\ERPEnterpriseDataTable.tsx:34 } else if (field.type === "relation") {
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:97 (field) => field.type !== "relation"
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:100 const relationFields =
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:102 (field) => field.type === "relation"
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:296 {relationFields.length > 0 && (
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:298 title="Relations"
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:301 {relationFields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:5 import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:7 type RelationOption = {
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:21 const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:24 async function loadRelation() {
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:25 if (field.type !== "relation") {
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:31 field.relation;
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:39 await ERPRelationDataLoader.load(
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:43 setRelationOptions(options);
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:46 "ERP RELATION LOAD ERROR",
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:50 setRelationOptions([]);
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:54 loadRelation();
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:68 * RELATION
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:71 if (field.type === "relation") {
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:77 key={`${field.key}-${String(initialValue ?? "")}-${relationOptions.length}`}
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPFormField.tsx:87 {relationOptions.map((option) => (
C:\Users\Admin\terragest\src\components\erp\layout\ERPCommandPanel.tsx:38 <ERPButton variant="ghost" type="button">Relations</ERPButton>
C:\Users\Admin\terragest\src\components\erp\layout\ERPTabNavigation.tsx:6 "Relations",
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:4 getAllRelations,
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:5 } from "@/core/relations/relation-engine";
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:7 export function ERPRelationGraph() {
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:8 const relations =
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:9 getAllRelations();
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:15 ERP Relation Graph
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:20 {relations.map(
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:21 (relation) => (
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:23 key={`${relation.sourceModule}-${relation.targetModule}`}
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:38 relation.sourceModule
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:48 relation.targetModule
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:55 {relation.label}
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:60 relation.relationType
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:68 {relations.length === 0 && (
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:70 Aucune relation ERP.
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:7 import { ERPRelationDataLoader }
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:8 from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:10 type RelationOption = {
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:15 type ERPRelationFieldProps = {
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:21 export function ERPRelationField({
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:25 }: ERPRelationFieldProps) {
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:28 useState<RelationOption[]>([]);
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:38 field.relation;
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:53 await ERPRelationDataLoader.load(
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:62 "ERP RELATION FIELD LOAD ERROR",
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:3 export function ERPRelationsGraph() {
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:5 const relations = [
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:32 {relations.map((relation) => (
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:35 key={`${relation.source}-${relation.target}`}
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:60 {relation.source}
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:76 {relation.target}
C:\Users\Admin\terragest\src\components\erp\relations\index.ts:1 export { ERPRelationField } from "./ERPRelationField";
C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimeTable.tsx:27 } else if (field.type === "relation") {
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:57 case "relations":
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:58 return "Relations";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:46 Voir les relations
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:15 | "relations"
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:49 relations: GenericERPTemplate,
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceTabs.tsx:7 "Relations",
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:16 relations?: boolean;
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:49 relations: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:74 relations: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:95 relations: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:110 relations: true,
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:1 export type RelationType =
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:7 export type ERPRelation = {
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:12 relationType: RelationType;
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:19 const relationRegistry:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:20 ERPRelation[] = [
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:28 relationType:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:45 relationType:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:62 relationType:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:79 relationType:
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:90 export function getRelations(
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:93 return relationRegistry.filter(
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:94 (relation) =>
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:95 relation.sourceModule ===
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:97 relation.targetModule ===
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:102 export function getRelationBetween(
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:106 return relationRegistry.find(
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:107 (relation) =>
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:108 relation.sourceModule ===
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:110 relation.targetModule ===
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:115 export function getAllRelations() {
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:116 return relationRegistry;
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:113 module.relations
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:115 (relation) =>
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:116 relation.targetModule
C:\Users\Admin\terragest\src\runtime\actions\ERPAction.ts:10 | "relations"
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:25 case "relations":
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:26 toast.success("Chargement des relations");
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:51 key: "relations",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:52 label: "Relations",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:53 href: `${basePath}/relations`,
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:25 | "relations"
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:39 relations: string[];
C:\Users\Admin\terragest\src\runtime\core\context\RuntimeContext.ts:5 correlationId?: string;
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:5 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:23 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:45 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:65 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:98 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:118 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:151 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:170 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:190 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:210 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:230 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:249 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:268 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:290 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:312 relations: [
C:\Users\Admin\terragest\src\runtime\forms\DynamicFormRegistry.ts:20 field.type === "relation"
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:4 import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:16 relation?: string;
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:20 type RelationOption = {
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:52 const [relationOptions, setRelationOptions] = useState<
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:53 Record<string, RelationOption[]>
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:57 async function loadRelations() {
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:58 const relationFields = fields.filter(
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:59 (field) => field.type === "relation"
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:62 const loadedOptions: Record<string, RelationOption[]> = {};
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:64 for (const field of relationFields) {
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:65 const targetModule = field.relation;
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:74 await ERPRelationDataLoader.load(targetModule);
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:77 "Erreur chargement relation",
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:87 setRelationOptions(loadedOptions);
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:90 loadRelations();
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:125 {field.type === "relation" ? (
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:140 {(relationOptions[field.key] ?? []).map((option) => (
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:13 export interface ERPModuleRelation {
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:75 relations?: ERPModuleRelation[];
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:7 | "relation"
C:\Users\Admin\terragest\src\runtime\modules\ERPModuleDefinition.ts:18 relationModule?: string;
C:\Users\Admin\terragest\src\runtime\modules\index.ts:4 ERPModuleRelation,
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:24 case "relation":
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:59 "relations",
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:84 relations:
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:85 module.relations?.map(
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:86 (relation) => relation.key
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:45 relations: [
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:98 relations: [
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:146 { key: "produitId", label: "Produit", type: "relation", relation: "produits", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:187 { key: "produitId", label: "Produit", type: "relation", relation: "produits", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:188 { key: "stockId", label: "Stock", type: "relation", relation: "stocks", required: true },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:231 { key: "materielId", label: "MatÃƒÂ©riel", type: "relation", relation: "materiels" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:232 { key: "produitId", label: "Produit consommÃƒÂ©", type: "relation", relation: "produits" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:272 { key: "materielId", label: "MatÃƒÂ©riel", type: "relation", relation: "materiels" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:273 { key: "produitId", label: "Produit utilisÃƒÂ©", type: "relation", relation: "produits" },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:314 { key: "proprietaireId", label: "PropriÃƒÂ©taire", type: "relation", relation: "utilisateurs", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:431 relations: [
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:17 { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:25 { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:26 { key: "commandeId", label: "Commande", type: "relation", relation: "commandes" },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:36 { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:146 type: "relation",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:148 relation: {
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:176 type: "relation",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:178 relation: {
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:212 type: "relation",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:213 relation: {
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:241 type: "relation",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:242 relation: {
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:264 type: "relation",
C:\Users\Admin\terragest\src\runtime\modules\factory\businessFields.ts:265 relation: {
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:4 export class ERPRelationDataLoader {
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationDataLoader.ts:18 label: ERPRelationDataLoader.getLabel(record),
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:8 export class ERPRelationResolver {
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:10 static getRelations(
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:45 static validateRelations() {
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:68 `[RELATION_TARGET_MISSING] ${module.metadata.key}.${field.key}`
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:20 | "relation"
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:32 export type ERPRelationType =
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:80 relation?: string;
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:109 * RELATIONAL INTELLIGENCE
C:\Users\Admin\terragest\src\runtime\modules\schemas\ERPModuleSchema.ts:118 relationType?: ERPRelationType;
C:\Users\Admin\terragest\src\runtime\navigation\ERPRelationNavigation.tsx:18 export function ERPRelationNavigation({
C:\Users\Admin\terragest\src\runtime\navigation\ERPRelationNavigation.tsx:58 Navigation relationnelle
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:2 RuntimeRelationsEngine,
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:4 from "@/runtime/relations/RuntimeRelationsEngine";
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:18 const relations =
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:19 RuntimeRelationsEngine
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:24 return relations.map(
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:25 (relation) => ({
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:28 relation.target,
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:31 relation.source,
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:34 relation.target,
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:36 relationType:
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:37 relation.type,
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:42 relation.target
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:43 }?${relation.foreignKey}=${
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:47 relation.target
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationLink.ts:11 relationType?: string;
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelation.ts:1 export interface RuntimeRelation {
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:2 RuntimeRelation,
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:4 from "@/runtime/relations/RuntimeRelation";
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:6 export const runtimeRelations:
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:7 RuntimeRelation[] = [
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:2 runtimeRelations,
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:4 from "@/runtime/relations/runtimeRelations";
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:6 export class RuntimeRelationsEngine {
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:8 static getRelations(
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:12 return runtimeRelations.filter(
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:14 (relation) =>
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:16 relation.source ===
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:19 relation.target ===
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:28 return runtimeRelations.filter(
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:30 (relation) =>
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:32 relation.source ===
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:41 return runtimeRelations.filter(
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:43 (relation) =>
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:45 relation.target ===
C:\Users\Admin\terragest\src\runtime\repositories\RuntimeRepository.ts:95 } else if (field.type === "relation") {
C:\Users\Admin\terragest\src\runtime\schemas\ERPBusinessSchemaRegistry.ts:22 case "relation":
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:28 case "relations":
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:29 return "relations.read";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePermission.ts:12 | "relations.read"
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:16 "relations.read",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:29 "relations.read",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:38 "relations.read",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:44 "relations.read",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:20 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:28 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:42 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:50 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:64 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:72 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:86 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:94 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:108 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:116 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:130 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:138 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:152 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:160 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:174 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:182 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:198 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:206 relations: []
```

## SEARCH : relations

```txt
C:\Users\Admin\terragest\src\app\(private)\contrats\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\contrats\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\exploitations\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\exploitations\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\interventions\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\interventions\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\maintenance\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\maintenance\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\materiels\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\materiels\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\paiements\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\paiements\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\produits\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\produits\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\stocks\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\stocks\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\app\(private)\terrains\relations\page.tsx:7 type="relations"
C:\Users\Admin\terragest\src\app\(private)\terrains\relations\page.tsx:8 actionLabel="Relations"
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:298 title="Relations"
C:\Users\Admin\terragest\src\components\erp\layout\ERPCommandPanel.tsx:38 <ERPButton variant="ghost" type="button">Relations</ERPButton>
C:\Users\Admin\terragest\src\components\erp\layout\ERPTabNavigation.tsx:6 "Relations",
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:4 getAllRelations,
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:5 } from "@/core/relations/relation-engine";
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:8 const relations =
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:9 getAllRelations();
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:20 {relations.map(
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:68 {relations.length === 0 && (
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:3 export function ERPRelationsGraph() {
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:5 const relations = [
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationsGraph.tsx:32 {relations.map((relation) => (
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:57 case "relations":
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleActionPageTemplate.tsx:58 return "Relations";
C:\Users\Admin\terragest\src\components\erp\templates\ERPModuleWorkflowPanel.tsx:46 Voir les relations
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:15 | "relations"
C:\Users\Admin\terragest\src\components\erp\templates\ERPPageTemplateRegistry.tsx:49 relations: GenericERPTemplate,
C:\Users\Admin\terragest\src\components\erp\workspace\ERPWorkspaceTabs.tsx:7 "Relations",
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:16 relations?: boolean;
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:49 relations: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:74 relations: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:95 relations: true,
C:\Users\Admin\terragest\src\core\modules\capabilities\module-capabilities-engine.ts:110 relations: true,
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:90 export function getRelations(
C:\Users\Admin\terragest\src\core\relations\relation-engine.ts:115 export function getAllRelations() {
C:\Users\Admin\terragest\src\platform\bootstrap\loadFeatures.ts:113 module.relations
C:\Users\Admin\terragest\src\runtime\actions\ERPAction.ts:10 | "relations"
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:25 case "relations":
C:\Users\Admin\terragest\src\runtime\actions\ERPActionExecutor.ts:26 toast.success("Chargement des relations");
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:51 key: "relations",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:52 label: "Relations",
C:\Users\Admin\terragest\src\runtime\actions\ERPActionResolver.ts:53 href: `${basePath}/relations`,
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:25 | "relations"
C:\Users\Admin\terragest\src\runtime\core\RuntimeContracts.ts:39 relations: string[];
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:5 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:23 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:45 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:65 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:98 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:118 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:151 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:170 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:190 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:210 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:230 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:249 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:268 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:290 relations: [
C:\Users\Admin\terragest\src\runtime\domain\models\TerragestDomainModel.ts:312 relations: [
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:57 async function loadRelations() {
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:90 loadRelations();
C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts:75 relations?: ERPModuleRelation[];
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:59 "relations",
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:84 relations:
C:\Users\Admin\terragest\src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts:85 module.relations?.map(
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:45 relations: [
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:98 relations: [
C:\Users\Admin\terragest\src\runtime\modules\definitions\coreModules.ts:431 relations: [
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:10 static getRelations(
C:\Users\Admin\terragest\src\runtime\modules\lifecycle\ERPRelationResolver.ts:45 static validateRelations() {
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:2 RuntimeRelationsEngine,
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:4 from "@/runtime/relations/RuntimeRelationsEngine";
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:18 const relations =
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:19 RuntimeRelationsEngine
C:\Users\Admin\terragest\src\runtime\navigation\RuntimeNavigationEngine.ts:24 return relations.map(
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:4 from "@/runtime/relations/RuntimeRelation";
C:\Users\Admin\terragest\src\runtime\relations\runtimeRelations.ts:6 export const runtimeRelations:
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:2 runtimeRelations,
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:4 from "@/runtime/relations/runtimeRelations";
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:6 export class RuntimeRelationsEngine {
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:8 static getRelations(
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:12 return runtimeRelations.filter(
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:28 return runtimeRelations.filter(
C:\Users\Admin\terragest\src\runtime\relations\RuntimeRelationsEngine.ts:41 return runtimeRelations.filter(
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:28 case "relations":
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimeActionPermissionMapper.ts:29 return "relations.read";
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePermission.ts:12 | "relations.read"
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:16 "relations.read",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:29 "relations.read",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:38 "relations.read",
C:\Users\Admin\terragest\src\runtime\security-runtime\RuntimePolicyRegistry.ts:44 "relations.read",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:20 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:28 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:42 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:50 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:64 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:72 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:86 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:94 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:108 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:116 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:130 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:138 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:152 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:160 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:174 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:182 relations: []
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:198 "relations",
C:\Users\Admin\terragest\src\_quarantine\runtime-generated\GeneratedRuntimeModules.ts:206 relations: []
```

## SEARCH : relation-engine

```txt
C:\Users\Admin\terragest\src\components\erp\relation-graph\ERPRelationGraph.tsx:5 } from "@/core/relations/relation-engine";
```

## SEARCH : relationField

```txt
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:100 const relationFields =
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:296 {relationFields.length > 0 && (
C:\Users\Admin\terragest\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx:301 {relationFields.map((field) => (
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:15 type ERPRelationFieldProps = {
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:21 export function ERPRelationField({
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:25 }: ERPRelationFieldProps) {
C:\Users\Admin\terragest\src\components\erp\relations\index.ts:1 export { ERPRelationField } from "./ERPRelationField";
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:58 const relationFields = fields.filter(
C:\Users\Admin\terragest\src\runtime\forms\ERPFormEngine.tsx:64 for (const field of relationFields) {
```

## SEARCH : relation field

```txt
C:\Users\Admin\terragest\src\components\erp\relations\ERPRelationField.tsx:62 "ERP RELATION FIELD LOAD ERROR",
```

# 3. DETECTED RELATION MODULES


# 4. ANALYSIS

- Existing relation engines :
- Existing relation loaders :
- Existing relation graphs :
- Existing runtime relation components :
- Relation duplication detected :
- Missing runtime capabilities :
- Should RuntimeRelationRegistry be created ?
