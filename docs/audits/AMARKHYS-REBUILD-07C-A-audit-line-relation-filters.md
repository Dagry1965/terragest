# AMARKHYS-REBUILD-07C-A — Audit relation filters lignes intervention

Date: 2026-06-01T00:09:13.664Z

## Objectif

Auditer la chaîne générique typeArticle/typeLigne -> produitId -> stockId.

## Synthèse

- OK: 14
- FAIL: 0

## Checks

### Module lignes

- OK — champ typeArticle/typeLigne présent
- OK — produitId présent
- OK — produitId pointe vers produitsauto
- OK — produitId filtré par typeArticle/typeLigne
- OK — stockId présent
- OK — stockId pointe vers stocksauto
- OK — stockId dépend de produitId

### Module produits

- OK — produitsauto possède typeArticle/typeLigne/type

### Module stocks

- OK — stocksauto possède produitId

### Runtime générique

- OK — RuntimeRelationFilterEngine existe
- OK — ERPFormField utilise moteur relation/filter
- OK — ERPEnterpriseForm propage formValues
- OK — ERPFormTabs propage formValues
- OK — RelationDataLoader existe

## Blocs lignesinterventionauto

### typeArticle/typeLigne

{
        key: "typeArticle",
        label: "Type article",
        type: "select",
        defaultValue: "piece",
        options: [
          { label: "Pièce", value: "piece" },
          { label: "Main d’œuvre", value: "main_oeuvre" },
          { label: "Service", value: "service" },
          { label: "Remise", value: "remise" },
        ],
        grid: { cols: 4 },
      }

### produitId

{
        key: "produitId",
        label: "Produit / pièce",
        type: "relation",
        relation: {
    module: "produitsauto",
    filterBy: {
      sourceField: "typeArticle",
      targetField: "typeArticle",
    },
  },
        dependsOn: "typeArticle",
        autoFill: {
          map: {
            produitCode: ["code", "reference"],
            produitNom: ["nom", "designation"],
            designation: ["nom", "designation"],
            typeArticle: ["typeArticle"],
            typeLigne: ["typeArticle"],
            prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
            prixUnitaire: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
            tauxTVA: ["tauxTVA"],
          },
          recalculate: true,
        },
        searchable: true,
  helperText: "Produit filtré selon le type d’article sélectionné.",
        list: { order: 2 },
        grid: { cols: 6 },
      }

### stockId

{
        key: "stockId",
        label: "Stock source",
        type: "relation",
        relation: {
    module: "stocksauto",
    filterBy: {
      sourceField: "produitId",
      targetField: "produitId",
    },
  },
        dependsOn: "produitId",
        searchable: true,
        grid: { cols: 6 },
        helperText: "Stock source filtré selon le produit sélectionné.",
      }

## Hits lignes — src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts

- produitId — L38: key: "produitId",
- filter — L43: filterBy: {
- typeArticle — L44: sourceField: "typeArticle",
- typeArticle — L45: targetField: "typeArticle",
- typeArticle — L48: dependsOn: "typeArticle",
- dependsOn — L48: dependsOn: "typeArticle",
- typeArticle — L54: typeArticle: ["typeArticle"],
- typeArticle — L55: typeLigne: ["typeArticle"],
- typeLigne — L55: typeLigne: ["typeArticle"],
- stockId — L68: key: "stockId",
- filter — L73: filterBy: {
- produitId — L74: sourceField: "produitId",
- produitId — L75: targetField: "produitId",
- produitId — L78: dependsOn: "produitId",
- dependsOn — L78: dependsOn: "produitId",
- typeArticle — L99: key: "typeArticle",
- typeLigne — L121: key: "typeLigne",
- dependsOn — L190: dependsOn: ["quantite", "prixUnitaire"],
- typeLigne — L271: "typeLigne",
- produitId — L272: "produitId",
- stockId — L273: "stockId",
- typeArticle — L276: "typeArticle",
- typeLigne — L295: "typeLigne",
- produitId — L303: "produitId",
- stockId — L304: "stockId",
- typeArticle — L307: "typeArticle",
- produitId — L365: relationField: "produitId",
- stockId — L375: relationField: "stockId",
- typeLigne — L399: "typeLigne",
- produitId — L435: field: "produitId",
- stockId — L445: field: "stockId",
- typeArticle — L460: "typeArticle",
- typeArticle — L475: "typeArticle",

## Hits produits — src/runtime/modules/generated/produitsauto/produitsauto.module.ts

- typeArticle — L77: key: "typeArticle",
- typeArticle — L352: "typeArticle",
- typeArticle — L371: "typeArticle",

## Hits stocks — src/runtime/modules/generated/stocksauto/stocksauto.module.ts

- produitId — L28: key: "produitId",
- produitId — L106: "produitId",
- produitId — L119: "produitId",
- produitId — L154: // produitId is resolved by RuntimeRelationLabelEngine through ERPRelationDataLoader.
- ERPRelationDataLoader — L154: // produitId is resolved by RuntimeRelationLabelEngine through ERPRelationDataLoader.
- produitId — L155: labelFields: ["produitId", "emplacement", "typeStock", "quantite", "statut"],

## Hits ERPFormField — src/components/erp/forms/enterprise/ERPFormField.tsx

- ERPRelationDataLoader — L8: import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
- RuntimeRelationFilterEngine — L9: import { RuntimeRelationFilterEngine } from "@/runtime/relations";
- formValues — L31: formValues?: Record<string, unknown>;
- filter — L89: .filter(Boolean);
- filter — L269: filterBy?: {
- filter — L276: return relationWithFilter.filterBy ?? null;
- formValues — L406: formValues = {},
- formValues — L453: ? formValues[schedulingConfig.dateField]
- formValues — L458: ? formValues[schedulingConfig.durationField]
- ERPRelationDataLoader — L486: await ERPRelationDataLoader.resolveLabel(
- ERPRelationDataLoader — L514: await ERPRelationDataLoader.load(targetModule);
- filter — L531: const filterConfig =
- filter — L536: !filterConfig?.sourceField
- filter — L543: formValues[filterConfig.sourceField];
- formValues — L543: formValues[filterConfig.sourceField];
- formValues — L550: }, [field, formValues]);
- formValues — L633: ? String(formValues[resourceField] ?? "").trim()
- filter — L645: .filter((record) => {
- filter — L656: .filter((record) => {
- filter — L673: .filter((booking) =>
- formValues — L746: ? String(formValues[schedulingResourceField] ?? "").trim()
- filter — L765: schedulingSlots.filter((slot) => slot.available).length;
- filter — L895: const filterConfig =
- filter — L902: // Generic metadata-driven relation filtering.
- filter — L903: // ERPFormField provides UI context; RuntimeRelationFilterEngine applies filterBy/excludeUsedBy.
- RuntimeRelationFilterEngine — L903: // ERPFormField provides UI context; RuntimeRelationFilterEngine applies filterBy/excludeUsedBy.
- filter — L904: const filteredByContext =
- RuntimeRelationFilterEngine — L905: RuntimeRelationFilterEngine.apply({
- filter — L907: filterBy: filterConfig,
- formValues — L911: formValues,
- filter — L914: const filteredOptions =
- filter — L915: filteredByContext.filter((option) =>
- filter — L923: filterConfig?.sourceField &&
- filter — L924: filterConfig?.targetField
- filter — L928: filteredOptions.some((option) =>
- filter — L934: ? filteredOptions
- filter — L947: ...filteredOptions,
- filter — L949: : filteredOptions;

## Hits ERPEnterpriseForm — src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx

- filter — L101: options: field.options.filter((option) =>
- filter — L303: lines.filter(
- typeLigne — L319: String(line.typeLigne ?? "piece");
- filter — L448: Array.from(searchParams.entries()).filter(
- filter — L460: .filter(Boolean) ?? [];
- produitId — L518: "produitId",
- stockId — L519: "stockId",
- filter — L530: .filter((field) =>
- filter — L570: .filter(
- formValues — L600: const [formValues, setFormValues] =
- filter — L623: Object.entries(queryValues).filter(
- filter — L672: .filter(
- formValues — L676: formValues
- filter — L691: visibleFields.filter(
- filter — L696: visibleFields.filter(
- formValues — L705: ...formValues,
- filter — L995: filterBy?: {
- filter — L1000: if (relationConfig.filterBy?.sourceField === changedFieldKey) {
- produitId — L1053: "produitId",
- formValues — L1226: ...formValues,
- filter — L1230: .filter(
- formValues — L1240: formValues[field.key];
- formValues — L1433: formValues.interventionId ??
- formValues — L1733: initialData={formValues}
- formValues — L1734: formValues={formValues}
- formValues — L1750: value={formValues[field.key]}
- formValues — L1751: formValues={formValues}
- formValues — L1769: value={formValues[field.key]}
- formValues — L1770: formValues={formValues}

## Hits ERPFormTabs — src/components/erp/forms/enterprise/ERPFormTabs.tsx

- formValues — L21: formValues?: Record<string, unknown>;
- formValues — L31: formValues = {},
- filter — L62: fields.filter(
- formValues — L67: formValues
- formValues — L118: ? formValues[
- formValues — L125: ? formValues[
- filter — L137: visibleFields.filter((field) =>
- formValues — L180: value={formValues[field.key]}
- formValues — L181: formValues={formValues}
- formValues — L200: value={formValues[field.key]}
- formValues — L201: formValues={formValues}

## Hits RuntimeRelationFilterEngine — src/runtime/relations/RuntimeRelationFilterEngine.ts

- filter — L20: filterBy?: RuntimeRelationFilterConfig | null;
- formValues — L24: formValues?: Record<string, unknown>;
- RuntimeRelationFilterEngine — L35: export class RuntimeRelationFilterEngine {
- filter — L37: const filterBy = context.filterBy;
- filter — L46: if (filterBy?.sourceField && filterBy?.targetField) {
- filter — L48: context.formValues?.[filterBy.sourceField];
- formValues — L48: context.formValues?.[filterBy.sourceField];
- filter — L53: options = options.filter((option) => {
- filter — L55: option.record?.[filterBy.targetField as string];
- filter — L58: return filterBy.includeEmptyTarget
- filter — L74: .filter(Boolean)
- filter — L77: options = options.filter((option) => {

## Lecture attendue

- Si le moteur générique existe, le renforcer ou l'utiliser, pas créer un filtre local.
- produitId doit dépendre de typeArticle/typeLigne.
- stockId doit dépendre de produitId.
- Le cycle attendu est refresh -> rebuild criteria -> replace options.
