# AMARKHYS-REBUILD-07C-F — Audit relation options records

Date: 2026-06-01T00:09:13.906Z

## Objectif

Vérifier si les options relationnelles contiennent le record brut nécessaire à RuntimeRelationFilterEngine.

## Synthèse

- OK: 12
- FAIL: 0

## Checks

### Loader

- OK — ERPRelationDataLoader existe
- OK — ERPRelationDataLoader retourne record brut dans option
- OK — ERPRelationDataLoader conserve id

### Engine

- OK — RuntimeRelationFilterEngine lit option.record
- OK — RuntimeRelationFilterEngine compare source/target
- OK — RuntimeRelationFilterEngine normalise valeurs

### FormField

- OK — ERPFormField map select avec safeFilteredOptions
- OK — ERPFormField utilise RuntimeRelationFilterEngine.apply

### Metadata

- OK — produitId filterBy typeArticle -> typeArticle
- OK — stockId filterBy produitId -> produitId
- OK — produitsauto possède champ typeArticle
- OK — stocksauto possède champ produitId

## Hits ERPRelationDataLoader — src/runtime/modules/lifecycle/ERPRelationDataLoader.ts

- data — L5: import { RuntimeDataBinding } from "@/runtime/data-binding";
- return — L53: return {
- return — L64: return (
- data — L67: (item) => item.metadata.key === moduleKey
- return — L78: return [];
- map — L93: return collections.map((collection) =>
- return — L93: return collections.map((collection) =>
- return — L103: return [];
- id: — L109: id: string;
- label — L110: label: string;
- record — L111: record: Record<string, unknown>;
- record — L117: const records =
- record — L120: for (const record of records) {
- record — L122: String(record.id ?? "").trim();
- label — L130: label: await ERPRelationDataLoader.getLabelAsync(
- record — L131: record as Record<string, unknown>,
- data — L132: module.metadata.key,
- record — L135: record: record as Record<string, unknown>,
- return — L143: return Array.from(merged.values());
- id: — L149: id: string,
- return — L156: return "";
- return — L163: return "";
- record — L168: const record =
- record — L174: if (!record) {
- label — L178: const label =
- record — L180: record as Record<string, unknown>,
- data — L181: module.metadata.key,
- label — L185: if (label && label !== relationId) {
- label — L186: return label;
- return — L186: return label;
- record — L195: const records =
- record — L198: const record =
- record — L199: records.find((item) =>
- record — L203: if (!record) {
- label — L207: const label =
- record — L209: record as Record<string, unknown>,
- data — L210: module.metadata.key,
- label — L214: if (label && label !== relationId) {
- label — L215: return label;
- return — L215: return label;
- return — L222: return relationId;
- record — L228: record: Record<string, unknown>,
- record — L234: record,
- label — L241: if (engineLabel.label) {
- label — L242: return engineLabel.label;
- return — L242: return engineLabel.label;
- record — L245: return ERPRelationDataLoader.getLabel(record, moduleKey);
- return — L245: return ERPRelationDataLoader.getLabel(record, moduleKey);
- record — L249: record: Record<string, unknown>,
- record — L253: String(record[key] ?? "").trim();
- return — L265: return false;
- return — L268: return /^[A-Za-z0-9_-]{16,}$/.test(text);
- label — L273: const labels: Record<string, string> = {
- label — L309: return labels[text] ?? text;
- return — L309: return labels[text] ?? text;
- return — L316: return "";
- return — L322: return text;
- return — L325: return date.toLocaleDateString("fr-FR");
- return — L332: return "";
- return — L338: return text;
- return — L341: return number.toLocaleString("fr-FR");
- return — L348: return "";
- return — L355: return isoTime[1].padStart(2, "0") + "h" + isoTime[2];
- return — L362: return colonTime[1].padStart(2, "0") + "h" + colonTime[2];
- return — L369: return (
- return — L380: return compactTime[1].padStart(2, "0") + "h" + compactTime[2];
- return — L386: return (
- return — L393: return text;
- return — L407: return "";
- return — L415: return (
- label — L423: // Generic business-time label.
- label — L424: // Never use startAt/endAt ISO for visible RDV labels because ISO is UTC-based.
- label — L425: // Visible labels must come from local business fields:
- return — L447: return start + " → " + end;
- return — L450: return start;
- data — L454: // Relation labels must be metadata-driven first.
- label — L454: // Relation labels must be metadata-driven first.
- data — L459: item.metadata.key === moduleKey ||
- record — L464: const raw = record[fieldKey];
- return — L467: return "";
- return — L473: return "";
- return — L480: return statusLabel(text) || text;
- return — L488: return Number.isFinite(amount)
- return — L493: return text;
- data — L496: const buildLabelFromMetadata = () => {
- label — L499: const labelFields =
- label — L500: (moduleDefinition?.composition as { labelFields?: string[] } | undefined)
- label — L501: ?.labelFields ?? [];
- data — L503: const metadataLabel = compact(
- label — L504: ...labelFields.map((fieldKey) => fieldLabelValue(fieldKey))
- map — L504: ...labelFields.map((fieldKey) => fieldLabelValue(fieldKey))
- data — L507: if (metadataLabel) {
- data — L508: return metadataLabel;
- return — L508: return metadataLabel;
- return — L511: return "";
- data — L514: const metadataDrivenLabel = buildLabelFromMetadata();
- data — L516: if (metadataDrivenLabel) {
- data — L517: return metadataDrivenLabel;
- return — L517: return metadataDrivenLabel;
- record — L523: record[key];
- return — L530: return "";
- return — L537: return String(raw);
- return — L540: return amount.toLocaleString("fr-FR") + " FCFA";
- return — L557: return clientLabel;
- return — L571: return vehicleLabel;
- return — L589: return rdvLabel;
- return — L601: return interventionLabel;
- return — L613: return productLabel;
- return — L631: return productLabel;
- return — L643: return stockLabel;
- return — L655: return invoiceLabel;
- return — L667: return lineLabel;
- return — L679: return movementLabel;
- return — L716: return compact(
- return — L733: return compact(
- return — L753: return compact(
- return — L778: return vehiculeLabel;
- return — L803: return personneLabel;
- return — L807: return compact(raisonSociale, codeClient);
- return — L811: return displayName;
- return — L821: return compact(typeIntervention, dateIntervention);
- return — L831: return compact(motif, dateRendezVous);
- label — L837: const label =
- label — L838: value("label");
- return — L847: return name;
- label — L850: if (label) {
- label — L851: return label;
- return — L851: return label;
- return — L855: return libelle;
- return — L859: return titre;
- return — L875: return referenceLabel;
- return — L879: return code;
- return — L898: return localisationLabel;
- return — L902: return typeExploitation;
- return — L912: return designation;
- return — L916: return produit;
- return — L929: return telephone;
- return — L933: return phone;
- return — L937: return email;
- return — L941: return id;
- return — L945: return "Enregistrement " + id.slice(0, 8);
- return — L948: return "Enregistrement";

## Hits RuntimeRelationFilterEngine — src/runtime/relations/RuntimeRelationFilterEngine.ts

- id: — L2: id: string;
- label — L3: label: string;
- record — L4: record?: Record<string, unknown>;
- sourceField — L8: sourceField?: string;
- targetField — L9: targetField?: string;
- formValues — L24: formValues?: Record<string, unknown>;
- return — L28: return value === undefined || value === null || value === "";
- return — L32: return value === undefined || value === null ? "" : String(value);
- sourceField — L46: if (filterBy?.sourceField && filterBy?.targetField) {
- targetField — L46: if (filterBy?.sourceField && filterBy?.targetField) {
- sourceField — L48: context.formValues?.[filterBy.sourceField];
- formValues — L48: context.formValues?.[filterBy.sourceField];
- record — L55: option.record?.[filterBy.targetField as string];
- option.record — L55: option.record?.[filterBy.targetField as string];
- targetField — L55: option.record?.[filterBy.targetField as string];
- return — L58: return filterBy.includeEmptyTarget
- return — L63: return normalizeRelationValue(targetValue) === sourceText;
- record — L71: .map((record) =>
- map — L71: .map((record) =>
- record — L72: normalizeRelationValue(record?.[excludeUsedBy.field as string])
- return — L82: return true;
- return — L85: return !usedValues.has(optionId);
- return — L89: return options;

## Hits ERPFormField — src/components/erp/forms/enterprise/ERPFormField.tsx

- data — L10: import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
- id: — L17: id: string;
- label — L18: label: string;
- record — L19: record?: Record<string, unknown>;
- formValues — L31: formValues?: Record<string, unknown>;
- return — L82: "returnTo",
- return — L141: return query
- return — L154: return "";
- return — L175: return "";
- return — L179: return date.toISOString().slice(0, 16);
- return — L182: return date.toISOString().slice(0, 10);
- return — L187: return value.toISOString().slice(0, 16);
- return — L190: return value.toISOString().slice(0, 10);
- return — L198: return date.toISOString().slice(0, 16);
- return — L201: return date.toISOString().slice(0, 10);
- return — L204: return String(value);
- return — L208: return "";
- return — L211: return String(value);
- return — L217: return (
- return — L228: return null;
- return — L231: return (
- data — L237: metadata?: {
- return — L243: return (
- data — L246: moduleRecord.metadata?.key === moduleKey ||
- data — L247: moduleRecord.metadata?.collection === moduleKey
- sourceField — L256: sourceField?: string;
- targetField — L257: targetField?: string;
- return — L264: return null;
- sourceField — L270: sourceField?: string;
- targetField — L271: targetField?: string;
- return — L276: return relationWithFilter.filterBy ?? null;
- return — L289: return null;
- return — L300: return relationWithExcludeUsedBy.excludeUsedBy ?? null;
- return — L307: return "";
- return — L315: return String(element?.value ?? "");
- return — L321: return (
- label — L329: label: string
- label — L332: String(label || "").trim();
- return — L335: return "";
- return — L338: return value
- return — L352: return (
- data — L354: data-field-key={field.key}
- return — L390: return "";
- return — L396: return text;
- return — L399: return firstTime[1].padStart(2, "0") + ":" + firstTime[2];
- formValues — L406: formValues = {},
- label — L428: label: string;
- formValues — L453: ? formValues[schedulingConfig.dateField]
- formValues — L458: ? formValues[schedulingConfig.durationField]
- return — L474: return;
- return — L482: return;
- label — L485: const label =
- label — L491: setLockedRelationLabel(label);
- return — L501: if (field.type !== "relation") return;
- return — L504: return;
- return — L510: if (!targetModule) return;
- sourceField — L536: !filterConfig?.sourceField
- return — L539: return;
- sourceField — L543: formValues[filterConfig.sourceField];
- formValues — L543: formValues[filterConfig.sourceField];
- formValues — L550: }, [field, formValues]);
- return — L556: return;
- return — L560: return;
- return — L568: return;
- return — L577: return;
- data — L604: // Generic ERP scheduling UI: any module declaring scheduling metadata
- return — L613: return;
- sourceField — L628: const resourceField =
- sourceField — L629: schedulingConfig.resourceField;
- sourceField — L632: resourceField
- sourceField — L633: ? String(formValues[resourceField] ?? "").trim()
- formValues — L633: ? String(formValues[resourceField] ?? "").trim()
- record — L643: // Generic ERP scheduling: only records sharing the configured resourceField
- sourceField — L643: // Generic ERP scheduling: only records sharing the configured resourceField
- record — L645: .filter((record) => {
- sourceField — L646: if (!resourceField) {
- return — L647: return true;
- return — L651: return false;
- record — L654: return String(record[resourceField] ?? "").trim() === resourceValue;
- return — L654: return String(record[resourceField] ?? "").trim() === resourceValue;
- sourceField — L654: return String(record[resourceField] ?? "").trim() === resourceValue;
- record — L656: .filter((record) => {
- return — L658: return true;
- return — L661: return blockingStatuses.includes(
- record — L662: String(record[schedulingConfig.statusField] ?? "")
- record — L665: .map((record) => ({
- map — L665: .map((record) => ({
- record — L666: id: String(record.id ?? record._id ?? ""),
- id: — L666: id: String(record.id ?? record._id ?? ""),
- record — L667: startAt: String(record[startField] ?? ""),
- record — L668: endAt: String(record[endField] ?? ""),
- record — L670: ? String(record[schedulingConfig.statusField] ?? "")
- data — L685: // Generic ERP scheduling: form passes metadata buffer to the runtime availability engine.
- label — L722: const label = (
- label — L724: {field.label}
- sourceField — L741: const schedulingResourceField =
- sourceField — L742: schedulingConfig?.resourceField;
- sourceField — L745: schedulingResourceField
- sourceField — L746: ? String(formValues[schedulingResourceField] ?? "").trim()
- formValues — L746: ? String(formValues[schedulingResourceField] ?? "").trim()
- sourceField — L750: Boolean(schedulingResourceField);
- label — L784: label: currentSchedulingValue,
- return — L795: return (
- label — L797: <label className="block space-y-2">
- label — L798: {label}
- map — L825: {safeSchedulingSlots.map((slot) => (
- label — L868: </label>
- label — L890: selectedOption?.label ||
- data — L902: // Generic metadata-driven relation filtering.
- RuntimeRelationFilterEngine.apply — L905: RuntimeRelationFilterEngine.apply({
- formValues — L911: formValues,
- label — L916: option.label
- sourceField — L923: filterConfig?.sourceField &&
- targetField — L924: filterConfig?.targetField
- safeFilteredOptions — L932: const safeFilteredOptions =
- id: — L938: id: String(currentValue),
- label — L939: label:
- label — L940: selectedOption?.label &&
- label — L942: ? selectedOption.label
- record — L944: record:
- record — L945: selectedOption?.record,
- return — L957: return (
- label — L960: {label}
- return — L986: return (
- label — L988: <label className="block space-y-2">
- label — L989: {label}
- map — L1028: {safeFilteredOptions.map((option) => (
- safeFilteredOptions — L1028: {safeFilteredOptions.map((option) => (
- label — L1030: {option.label}
- return — L1043: return;
- label — L1072: + Créer {field.label}
- label — L1075: </label>
- return — L1081: return (
- label — L1083: <label className="block space-y-2">
- label — L1084: {label}
- map — L1102: {(field.options ?? []).map((option, index) => (
- label — L1104: key={option.value ?? option.label ?? index}
- label — L1107: {option.label}
- return — L1123: return;
- label — L1154: + Créer {field.label}
- label — L1157: </label>
- return — L1163: return (
- label — L1165: <label className="block space-y-2">
- label — L1166: {label}
- return — L1198: return;
- label — L1229: + Créer {field.label}
- label — L1232: </label>
- return — L1238: return (
- label — L1240: <label className="block space-y-2">
- label — L1241: {label}
- label — L1250: placeholder={field.placeholder ?? field.label}
- label — L1268: </label>
- return — L1288: return (
- label — L1290: <label className="block space-y-2">
- label — L1291: {label}
- label — L1302: placeholder={field.placeholder ?? field.label}
- label — L1305: </label>

## Blocs metadata

### lignes.produitId

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

### lignes.stockId

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

### produits.typeArticle

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
        list: { visible: true, order: 4 },
        grid: { cols: 6 },
      }

### stocks.produitId

{
        key: "produitId",
        label: "Produit",
        type: "relation",
        relation: { module: "produitsauto" },
        required: true,
        searchable: true,
        list: { visible: true, order: 1 },
        grid: { cols: 6 },
      }
