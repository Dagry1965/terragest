# AMARKHYS-REBUILD-08A — Audit facturesauto related panels / child governance

Date: 2026-06-01T01:28:57.977Z

## Objectif

Auditer les panneaux enfants affichés sous facturesauto : Encaissements et Échéances de paiement.

## Règle métier cible

- Garder le bloc métier Paiements enregistrés.
- Masquer le panneau brut Encaissements sous la facture.
- Garder Échéances de paiement seulement si échéancier actif / paiement en plusieurs fois.
- Interdire l’ajout direct d’encaissement depuis le panneau relation brut.
- Ne pas casser les actions métier de facture : paiement, reçu, PDF, WhatsApp.

## Synthèse

- OK: 10
- FAIL: 0

## Checks

### Modules

- OK — facturesauto module existe
- OK — encaissementsauto module existe
- OK — echeancespaiementauto module existe

### Factures metadata

- OK — facturesauto référence encaissementsauto
- OK — facturesauto référence echeancespaiementauto

### Child FK

- OK — encaissementsauto porte factureId
- OK — echeancespaiementauto porte factureId

### Gouvernance

- OK — panneaux enfants ont une gouvernance existante
- OK — RelatedRecordsPanel gère le bouton ajout
- OK — interventionsauto contient déjà une gouvernance enfant réutilisable

## Blocs metadata facturesauto

### Encaissements block

{
        key: "encaissements-facture",
        moduleKey: "encaissementsauto",
        foreignKey: "factureId",
        title: "Encaissements",
        description: "Paiements enregistrés pour cette facture.",
        displayIn: [],
        lazy: true,
        position: "after",
        allowCreate: false,
        createLabel: "Ajouter un encaissement",
        openLabel: "Ouvrir encaissement",
        labelFields: ["numeroRecu", "montant", "datePaiement", "statut"],
        subtitleFields: ["clientId", "vehiculeId", "modePaiement", "referenceTransaction"],
        totalField: "montant",
        prefillFromParent: {
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["factureId", "clientId", "vehiculeId"],
        relations: [
          {
            field: "clientId",
            moduleKey: "clientsauto",
            labelFields: ["prenom", "nom", "telephone"],
          },
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
        ],
      }

### Échéances block

{
        key: "echeances-facture",
        moduleKey: "echeancespaiementauto",
        foreignKey: "factureId",
        title: "Échéances de paiement",
        description: "Plan de paiement et relances liées à cette facture.",
        displayIn: [],
        lazy: true,
        position: "after",
        allowCreate: false,
        createLabel: "Ajouter une échéance",
        openLabel: "Ouvrir échéance",
        labelFields: ["montantPrevu", "montantPaye", "dateEcheance", "statut"],
        subtitleFields: ["clientId", "vehiculeId", "canalRelance"],
        totalField: "montantPrevu",
        prefillFromParent: {
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["factureId", "clientId", "vehiculeId"],
        relations: [
          {
            field: "clientId",
            moduleKey: "clientsauto",
            labelFields: ["prenom", "nom", "telephone"],
          },
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
        ],
      }

## Champs FK enfants

### encaissementsauto.factureId

{
        key: "factureId",
        label: "Facture",
        type: "relation",
        relation: {
          module: "facturesauto",
        },
        required: true,
        searchable: true,
        list: { visible: true, order: 1 },
        grid: { cols: 6 },
      }

### echeancespaiementauto.factureId

{
        key: "factureId",
        label: "Facture",
        type: "relation",
        relation: {
          module: "facturesauto",
        },
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 6 },
      }

## Hits

- facturesauto — visible — L36: list: { visible: true, order: 1 },
- facturesauto — visible — L45: list: { visible: true, order: 4 },
- facturesauto — visible — L58: list: { visible: false },
- facturesauto — visible — L71: list: { visible: true, order: 7 },
- facturesauto — visible — L82: list: { visible: true, order: 2 },
- facturesauto — visible — L93: list: { visible: true, order: 3 },
- facturesauto — visible — L104: list: { visible: false },
- facturesauto — visible — L111: list: { visible: false },
- facturesauto — visible — L119: list: { visible: false },
- facturesauto — visible — L130: list: { visible: true, order: 5 },
- facturesauto — visible — L138: list: { visible: false },
- facturesauto — visible — L146: list: { visible: true, order: 6 },
- facturesauto — visible — L159: list: { visible: false },
- facturesauto — visible — L172: list: { visible: false },
- facturesauto — visible — L179: list: { visible: false },
- facturesauto — visible — L193: list: { visible: false },
- facturesauto — visible — L200: list: { visible: false },
- facturesauto — visible — L208: list: { visible: false },
- facturesauto — visible — L215: list: { visible: false },
- facturesauto — relations — L250: key: "relations",
- facturesauto — hidden — L449: hiddenFields: [
- facturesauto — create — L455: "createdAt",
- facturesauto — children — L551: children: [
- facturesauto — child — L551: children: [
- facturesauto — encaissementsauto — L554: moduleKey: "encaissementsauto",
- facturesauto — factureId — L555: foreignKey: "factureId",
- facturesauto — display — L558: displayIn: [],
- facturesauto — allowCreate — L561: allowCreate: false,
- facturesauto — create — L562: createLabel: "Ajouter un encaissement",
- facturesauto — Ajouter — L562: createLabel: "Ajouter un encaissement",
- facturesauto — factureId — L571: lockFields: ["factureId", "clientId", "vehiculeId"],
- facturesauto — relations — L572: relations: [
- facturesauto — echeancespaiementauto — L587: moduleKey: "echeancespaiementauto",
- facturesauto — factureId — L588: foreignKey: "factureId",
- facturesauto — display — L591: displayIn: [],
- facturesauto — allowCreate — L594: allowCreate: false,
- facturesauto — create — L595: createLabel: "Ajouter une échéance",
- facturesauto — Ajouter — L595: createLabel: "Ajouter une échéance",
- facturesauto — factureId — L604: lockFields: ["factureId", "clientId", "vehiculeId"],
- facturesauto — relations — L605: relations: [

- encaissementsauto — encaissementsauto — L4: encaissementsautoActions,
- encaissementsauto — encaissementsauto — L5: } from "./encaissementsauto.actions";
- encaissementsauto — encaissementsauto — L7: export const encaissementsautoModule: ERPModule = {
- encaissementsauto — encaissementsauto — L9: key: "encaissementsauto",
- encaissementsauto — encaissementsauto — L29: collection: "encaissementsauto",
- encaissementsauto — factureId — L33: key: "factureId",
- encaissementsauto — visible — L41: list: { visible: true, order: 1 },
- encaissementsauto — visible — L52: list: { visible: true, order: 2 },
- encaissementsauto — visible — L63: list: { visible: false },
- encaissementsauto — visible — L71: list: { visible: true, order: 3 },
- encaissementsauto — visible — L79: list: { visible: true, order: 4 },
- encaissementsauto — visible — L95: list: { visible: true, order: 5 },
- encaissementsauto — visible — L103: list: { visible: false },
- encaissementsauto — visible — L117: list: { visible: true, order: 6 },
- encaissementsauto — visible — L125: list: { visible: false },
- encaissementsauto — visible — L138: list: { visible: false },
- encaissementsauto — visible — L145: list: { visible: false },
- encaissementsauto — visible — L158: list: { visible: false },
- encaissementsauto — visible — L165: list: { visible: false },
- encaissementsauto — visible — L173: list: { visible: false },
- encaissementsauto — visible — L180: list: { visible: false },
- encaissementsauto — factureId — L194: "factureId",
- encaissementsauto — factureId — L206: "factureId",
- encaissementsauto — relations — L217: key: "relations",
- encaissementsauto — requiresParentContext — L282: requiresParentContext: true,
- encaissementsauto — allowedParents — L283: allowedParents: [
- encaissementsauto — factureId — L286: foreignKey: "factureId",
- encaissementsauto — factureId — L289: lockedFields: ["factureId", "clientId", "vehiculeId"],
- encaissementsauto — factureId — L290: labelFields: ["factureId", "numeroRecu", "montant", "datePaiement", "statut"],
- encaissementsauto — factureId — L296: relationField: "factureId",
- encaissementsauto — encaissementsauto — L338: actions: encaissementsautoActions,

- echeancespaiementauto — echeancespaiementauto — L4: echeancespaiementautoActions,
- echeancespaiementauto — echeancespaiementauto — L5: } from "./echeancespaiementauto.actions";
- echeancespaiementauto — echeancespaiementauto — L7: export const echeancespaiementautoModule: ERPModule = {
- echeancespaiementauto — echeancespaiementauto — L9: key: "echeancespaiementauto",
- echeancespaiementauto — echeancespaiementauto — L29: collection: "echeancespaiementauto",
- echeancespaiementauto — factureId — L33: key: "factureId",
- echeancespaiementauto — factureId — L141: "factureId",
- echeancespaiementauto — factureId — L153: "factureId",
- echeancespaiementauto — relations — L164: key: "relations",
- echeancespaiementauto — echeancespaiementauto — L202: actions: echeancespaiementautoActions,
- echeancespaiementauto — requiresParentContext — L206: requiresParentContext: true,
- echeancespaiementauto — allowedParents — L207: allowedParents: [
- echeancespaiementauto — factureId — L210: foreignKey: "factureId",
- echeancespaiementauto — factureId — L213: lockedFields: ["factureId", "clientId", "vehiculeId"],
- echeancespaiementauto — factureId — L214: labelFields: ["factureId", "montantPrevu", "montantPaye", "dateEcheance", "statut"],
- echeancespaiementauto — factureId — L220: relationField: "factureId",

- ERPRelatedRecordsPanel — child — L18: child: ERPCompositionChild;
- ERPRelatedRecordsPanel — visible — L120: // Le total visible du panneau ne compte que les lignes confirmées.
- ERPRelatedRecordsPanel — child — L167: childModuleKey?: string
- ERPRelatedRecordsPanel — child — L169: if (childModuleKey === "encaissementsauto") {
- ERPRelatedRecordsPanel — encaissementsauto — L169: if (childModuleKey === "encaissementsauto") {
- ERPRelatedRecordsPanel — create — L172: record.createdAt,
- ERPRelatedRecordsPanel — child — L179: childModuleKey === "echeancespaiementauto" ||
- ERPRelatedRecordsPanel — echeancespaiementauto — L179: childModuleKey === "echeancespaiementauto" ||
- ERPRelatedRecordsPanel — child — L180: childModuleKey === "echeancesauto"
- ERPRelatedRecordsPanel — create — L186: record.createdAt,
- ERPRelatedRecordsPanel — child — L192: if (childModuleKey === "rendezvous") {
- ERPRelatedRecordsPanel — create — L201: record.createdAt,
- ERPRelatedRecordsPanel — child — L207: if (childModuleKey === "interventionsauto") {
- ERPRelatedRecordsPanel — create — L210: record.createdAt,
- ERPRelatedRecordsPanel — child — L216: if (childModuleKey === "lignesinterventionauto") {
- ERPRelatedRecordsPanel — create — L219: record.createdAt,
- ERPRelatedRecordsPanel — create — L220: record.createdOn,
- ERPRelatedRecordsPanel — create — L227: record.createdAt,
- ERPRelatedRecordsPanel — create — L228: record.createdOn,
- ERPRelatedRecordsPanel — child — L243: childModuleKey?: string
- ERPRelatedRecordsPanel — child — L248: childModuleKey
- ERPRelatedRecordsPanel — child — L262: childModuleKey?: string
- ERPRelatedRecordsPanel — child — L266: getRecordSortValue(left, childModuleKey).localeCompare(
- ERPRelatedRecordsPanel — child — L267: getRecordSortValue(right, childModuleKey),
- ERPRelatedRecordsPanel — child — L426: childModule?: ERPModule
- ERPRelatedRecordsPanel — visible — L443: const visibleFields =
- ERPRelatedRecordsPanel — child — L444: childModule?.schema?.fields
- ERPRelatedRecordsPanel — visible — L450: const label = getBusinessLabelFromRecord(record, visibleFields.slice(0, 3));
- ERPRelatedRecordsPanel — child — L472: child: ERPCompositionChild,
- ERPRelatedRecordsPanel — child — L480: params.set(child.foreignKey, parentRecordId);
- ERPRelatedRecordsPanel — child — L483: child.prefillFromParent ?? {};
- ERPRelatedRecordsPanel — child — L511: params.set("parentForeignKey", child.foreignKey);
- ERPRelatedRecordsPanel — child — L521: child.lockFields?.length
- ERPRelatedRecordsPanel — child — L522: ? child.lockFields
- ERPRelatedRecordsPanel — child — L523: : [child.foreignKey];
- ERPRelatedRecordsPanel — child — L530: return "/" + child.moduleKey + "/nouveau?" + params.toString();
- ERPRelatedRecordsPanel — child — L534: child: ERPCompositionChild,
- ERPRelatedRecordsPanel — child — L564: child.moduleKey +
- ERPRelatedRecordsPanel — relations — L574: relations: ERPCompositionRelation[] = []
- ERPRelatedRecordsPanel — relations — L579: relations.map(async (relation) => {
- ERPRelatedRecordsPanel — related — L596: const relatedRecords = await RuntimeDataBinding.list(module);
- ERPRelatedRecordsPanel — relatedRecords — L596: const relatedRecords = await RuntimeDataBinding.list(module);
- ERPRelatedRecordsPanel — related — L600: relatedRecords.forEach((record) => {
- ERPRelatedRecordsPanel — relatedRecords — L600: relatedRecords.forEach((record) => {
- ERPRelatedRecordsPanel — child — L620: child,
- ERPRelatedRecordsPanel — child — L634: const childModule = useMemo(
- ERPRelatedRecordsPanel — child — L637: (module) => module.metadata.key === child.moduleKey
- ERPRelatedRecordsPanel — child — L639: [child.moduleKey]
- ERPRelatedRecordsPanel — create — L642: const createHref = useMemo(
- ERPRelatedRecordsPanel — child — L645: child,
- ERPRelatedRecordsPanel — child — L651: [child, parentRecordId, parentModuleKey, mode]
- ERPRelatedRecordsPanel — child — L655: if (!parentRecordId || !childModule) {
- ERPRelatedRecordsPanel — child — L662: const moduleForLoad = childModule;
- ERPRelatedRecordsPanel — related — L672: const related = data.filter(
- ERPRelatedRecordsPanel — child — L674: String(record[child.foreignKey] ?? "") === parentRecordId &&
- ERPRelatedRecordsPanel — related — L679: related,
- ERPRelatedRecordsPanel — child — L680: child.relations ?? []
- ERPRelatedRecordsPanel — relations — L680: child.relations ?? []
- ERPRelatedRecordsPanel — related — L684: setRecords(related);
- ERPRelatedRecordsPanel — child — L704: }, [parentRecordId, childModule, child]);
- ERPRelatedRecordsPanel — child — L717: child.moduleKey
- ERPRelatedRecordsPanel — child — L719: [activeRecords, sortDirection, child.moduleKey]
- ERPRelatedRecordsPanel — child — L725: ? sum + getAmount(record, child.totalField)
- ERPRelatedRecordsPanel — child — L730: if (!parentRecordId || !childModule) {
- ERPRelatedRecordsPanel — related — L736: data-erp-related-records-panel={child.key}
- ERPRelatedRecordsPanel — child — L736: data-erp-related-records-panel={child.key}
- ERPRelatedRecordsPanel — hidden — L737: className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)]"
- ERPRelatedRecordsPanel — child — L742: {child.title}
- ERPRelatedRecordsPanel — child — L748: : child.badgeLabel
- ERPRelatedRecordsPanel — child — L749: ? `${activeRecords.length} ${child.badgeLabel}`
- ERPRelatedRecordsPanel — child — L750: : child.totalField
- ERPRelatedRecordsPanel — child — L755: {child.description ? (
- ERPRelatedRecordsPanel — child — L757: {child.description}
- ERPRelatedRecordsPanel — child — L763: {child.totalField ? (
- ERPRelatedRecordsPanel — child — L790: {(child.allowCreate ?? child.mode !== "readonly") ? (
- ERPRelatedRecordsPanel — allowCreate — L790: {(child.allowCreate ?? child.mode !== "readonly") ? (
- ERPRelatedRecordsPanel — create — L792: href={createHref}
- ERPRelatedRecordsPanel — child — L795: {child.createLabel ?? "Ajouter"}
- ERPRelatedRecordsPanel — create — L795: {child.createLabel ?? "Ajouter"}
- ERPRelatedRecordsPanel — Ajouter — L795: {child.createLabel ?? "Ajouter"}
- ERPRelatedRecordsPanel — child — L810: const configuredLabel = getConfiguredRecordLabel(record, child.labelFields);
- ERPRelatedRecordsPanel — child — L811: const label = configuredLabel || getChildRecordLabel(record, childModule);
- ERPRelatedRecordsPanel — child — L814: child.subtitleFields
- ERPRelatedRecordsPanel — child — L816: const amount = child.totalField
- ERPRelatedRecordsPanel — child — L817: ? getAmount(record, child.totalField)
- ERPRelatedRecordsPanel — child — L829: const relationParts = (child.relations ?? [])
- ERPRelatedRecordsPanel — relations — L829: const relationParts = (child.relations ?? [])
- ERPRelatedRecordsPanel — child — L846: child,
- ERPRelatedRecordsPanel — child — L908: ) : child.openLabel ? (
- ERPRelatedRecordsPanel — child — L910: {child.openLabel}

- ERPRuntimePage — factureId — L99: const factureId =
- ERPRuntimePage — factureId — L117: factureId,
- ERPRuntimePage — factureId — L123: returnTo: "/facturesauto/" + factureId + "/edit",
- ERPRuntimePage — create — L131: case "create":
- ERPRuntimePage — create — L146: type?: "list" | "create" | "detail" | "edit" | string;
- ERPRuntimePage — create — L258: const createActionLabel =
- ERPRuntimePage — create — L263: const createActionHref =
- ERPRuntimePage — related — L331: const relatedChildren =
- ERPRuntimePage — children — L332: module?.composition?.children?.filter((child) => {
- ERPRuntimePage — child — L332: module?.composition?.children?.filter((child) => {
- ERPRuntimePage — child — L341: return (child.displayIn ?? ["detail"]).includes(
- ERPRuntimePage — display — L341: return (child.displayIn ?? ["detail"]).includes(
- ERPRuntimePage — related — L346: const relatedChildrenBefore =
- ERPRuntimePage — related — L347: relatedChildren.filter((child) => child.position === "before");
- ERPRuntimePage — child — L347: relatedChildren.filter((child) => child.position === "before");
- ERPRuntimePage — related — L349: const relatedChildrenAfter =
- ERPRuntimePage — related — L350: relatedChildren.filter((child) => child.position !== "before");
- ERPRuntimePage — child — L350: relatedChildren.filter((child) => child.position !== "before");
- ERPRuntimePage — create — L403: href={createActionHref}
- ERPRuntimePage — create — L417: {createActionLabel}
- ERPRuntimePage — related — L436: <div data-erp-related-children-before className="space-y-4">
- ERPRuntimePage — children — L436: <div data-erp-related-children-before className="space-y-4">
- ERPRuntimePage — child — L436: <div data-erp-related-children-before className="space-y-4">
- ERPRuntimePage — related — L437: {module && currentRecord && relatedChildrenBefore.map((child) => (
- ERPRuntimePage — child — L437: {module && currentRecord && relatedChildrenBefore.map((child) => (
- ERPRuntimePage — child — L439: key={child.key}
- ERPRuntimePage — child — L442: child={child}
- ERPRuntimePage — create — L465: {type === "create" && module && (
- ERPRuntimePage — create — L468: mode="create"
- ERPRuntimePage — related — L488: <div data-erp-related-children-after className="space-y-4">
- ERPRuntimePage — children — L488: <div data-erp-related-children-after className="space-y-4">
- ERPRuntimePage — child — L488: <div data-erp-related-children-after className="space-y-4">
- ERPRuntimePage — related — L489: {module && currentRecord && relatedChildrenAfter.map((child) => (
- ERPRuntimePage — child — L489: {module && currentRecord && relatedChildrenAfter.map((child) => (
- ERPRuntimePage — child — L491: key={child.key}
- ERPRuntimePage — child — L494: child={child}
- ERPRuntimePage — create — L502: module?.metadata?.routes?.create && (
- ERPRuntimePage — create — L505: href={module.metadata.routes.create}

## Lecture attendue

- Si facturesauto déclare encaissementsauto comme related panel brut : metadata à corriger.
- Si ERPRelatedRecordsPanel affiche systématiquement un bouton Ajouter : renforcer gouvernance générique allowCreate=false.
- Si Échéances est toujours visible : ajouter visibilité conditionnelle selon échéancier actif.
- Ne pas supprimer les modules enfants ; seulement gouverner leur affichage depuis le parent.
