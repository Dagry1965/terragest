# AMARKHYS-REBUILD-05A — Audit boutons/actions rendezvous par contexte page

Date: 2026-05-31T16:45:18.895Z

## Contexte terrain

- /rendezvous : Planning, Nouveau, Exporter
- /rendezvous/nouveau : Reporter RDV, Confirmer le RDV, Annuler
- /rendezvous/planning : Retour liste, Nouveau, Planifier
- /rendezvous/dashboard : aucun
- /rendezvous/workflows : aucun

## Règle ERP cible

Une action record-level ne doit jamais être affichée en contexte create/nouveau, car aucun record métier n'existe encore.

## Synthèse

- OK: 11
- FAIL: 1

## Checks

### Fichiers

- OK — rendezvous.module.ts existe
- OK — rendezvous.actions.ts existe

### Actions rendezvous

- OK — Actions RDV détectées dans module ou actions

### Create page

- OK — /rendezvous/nouveau existe
- OK — Create page utilise une page générique ou runtime
- OK — Aucun bouton métier RDV hardcodé directement dans /rendezvous/nouveau/page.tsx

### Generic create

- OK — GenericCreatePage existe
- OK — GenericCreatePage contient un contexte create identifiable

### Runtime actions

- OK — ERPRuntimeActionBar existe
- OK — ERPRuntimePage existe
- OK — Un filtre create/no-record est détecté dans action bar ou runtime page

### ERPEnterpriseForm

- FAIL — ERPEnterpriseForm ne contient pas directement les actions RDV relevées

## Fichiers inspectés

### module

Fichier: src/runtime/modules/generated/rendezvous/rendezvous.module.ts
Existe: YES
Lignes: 484

Actions RDV détectées:
- Annuler — L478: { from: "planifie", to: "annule", action: "Annuler" },
- Annuler — L479: { from: "confirme", to: "annule", action: "Annuler" },
- Annuler — L480: { from: "en_cours", to: "annule", action: "Annuler" },

Marqueurs contexte/actions:
- actions — L5: } from "./rendezvous.actions";
- type: — L44: type: "text",
- list — L48: list: { visible: true, order: 1 },
- type: — L54: type: "relation",
- list — L58: list: { visible: true, order: 2 },
- type: — L64: type: "relation",
- list — L75: list: { visible: true, order: 3 },
- type: — L81: type: "date",
- list — L83: list: { visible: true, order: 4 },
- type: — L89: type: "text",
- list — L91: list: { visible: true, order: 5 },
- type: — L97: type: "number",
- list — L99: list: { visible: false },
- type: — L105: type: "text",
- list — L106: list: { visible: false },
- type: — L112: type: "text",
- list — L113: list: { visible: false },
- type: — L119: type: "relation",
- list — L122: list: { visible: false },
- type: — L129: type: "select",
- list — L137: list: { visible: true, order: 6 },
- type: — L143: type: "textarea",
- list — L144: list: { visible: false },
- type: — L150: type: "textarea",
- list — L151: list: { visible: false },
- type: — L157: type: "select",
- list — L166: list: { visible: true, order: 7 },
- form — L172: form: {
- detail — L208: key: "details",
- actions — L230: actions: rendezvousActions,
- type: — L280: type: "select",
- type: — L293: type: "select",
- type: — L306: type: "relation",
- mode — L330: "modele",
- create — L340: "createdAt",
- type: — L349: type: "planning",
- type: — L354: type: "count",
- form — L355: format: "number",
- type: — L360: type: "countWhere",
- form — L363: format: "number",
- type: — L368: type: "countWhere",
- form — L371: format: "number",
- context — L403: contextBanner: {
- mode — L415: labelFields: ["marque", "modele", "immatriculation"],
- detail — L428: displayIn: ["detail", "edit"],
- edit — L428: displayIn: ["detail", "edit"],
- create — L432: createLabel: "Créer une intervention",
- mode — L452: labelFields: ["marque", "modele", "immatriculation"],

### actions

Fichier: src/runtime/modules/generated/rendezvous/rendezvous.actions.ts
Existe: YES
Lignes: 37

Actions RDV détectées:
- Reporter RDV — L8: label: "Reporter RDV",
- Confirmer le RDV — L14: label: "Confirmer le RDV",
- Annuler — L31: key: "Annuler",
- Annuler — L32: label: "Annuler",

Marqueurs contexte/actions:
- type: — L9: type: "secondary",
- runtimeOnly — L10: runtimeOnly: true,
- type: — L15: type: "primary",
- type: — L21: type: "secondary",
- type: — L27: type: "secondary",
- type: — L33: type: "danger",

### workflows

Fichier: src/runtime/modules/generated/rendezvous/rendezvous.workflows.ts
Existe: YES
Lignes: 1

### createPage

Fichier: src/app/(private)/rendezvous/nouveau/page.tsx
Existe: YES
Lignes: 11

### listPage

Fichier: src/app/(private)/rendezvous/page.tsx
Existe: YES
Lignes: 11

### planningPage

Fichier: src/app/(private)/rendezvous/planning/page.tsx
Existe: YES
Lignes: 11

### detailPage

Fichier: src/app/(private)/rendezvous/[id]/page.tsx
Existe: YES
Lignes: 23

### editPage

Fichier: src/app/(private)/rendezvous/[id]/edit/page.tsx
Existe: YES
Lignes: 23

### genericCreatePage

Fichier: src/components/erp/generic/GenericCreatePage.tsx
Existe: YES
Lignes: 19

Marqueurs suspects:
- create mode — L18: return <ERPRuntimePage module={runtimeModule} type="create" />;

Marqueurs contexte/actions:
- create — L18: return <ERPRuntimePage module={runtimeModule} type="create" />;

### genericDetailPage

Fichier: src/components/erp/generic/GenericDetailPage.tsx
Existe: YES
Lignes: 70

Marqueurs contexte/actions:
- record — L13: record?: Record<string, unknown> | null;
- record — L20: record,
- record — L27: useState<Record<string, unknown> | null | undefined>(record);
- record — L29: const [loading, setLoading] = useState(Boolean(id && runtimeModule && !record));
- record — L32: if (!id || !runtimeModule || record) {
- detail — L38: RuntimeDataBinding.detail(runtimeModule, id)
- record — L53: }, [id, runtimeModule, record]);
- detail — L66: type="detail"
- record — L67: record={runtimeRecord ?? undefined}

### genericEditPage

Fichier: src/components/erp/generic/GenericEditPage.tsx
Existe: YES
Lignes: 70

Marqueurs contexte/actions:
- record — L13: record?: Record<string, unknown> | null;
- record — L20: record,
- record — L27: useState<Record<string, unknown> | null | undefined>(record);
- record — L29: const [loading, setLoading] = useState(Boolean(id && runtimeModule && !record));
- record — L32: if (!id || !runtimeModule || record) {
- detail — L38: RuntimeDataBinding.detail(runtimeModule, id)
- record — L53: }, [id, runtimeModule, record]);
- edit — L66: type="edit"
- record — L67: record={runtimeRecord ?? undefined}

### runtimePage

Fichier: src/components/erp/runtime/ERPRuntimePage.tsx
Existe: YES
Lignes: 529

Marqueurs suspects:
- runtime action bar — L14: ERPRuntimeActionBar,
- runtime action bar — L15: type ERPRuntimeActionBarAction,
- runtime action bar — L16: } from "@/components/erp/runtime/ERPRuntimeActionBar";
- runtime action bar — L44: ): ERPRuntimeActionBarAction[] {
- hardcoded button — L83: onClick:
- runtime action bar — L93: .filter(Boolean) as ERPRuntimeActionBarAction[];
- actions passed to form — L272: const runtimeActions =
- actions passed to form — L285: const moduleHrefActions =
- actions passed to form — L316: const listNavigationActions = [
- runtime action bar — L451: <ERPRuntimeActionBar
- actions passed to form — L454: actions={mapRuntimeActionsToActionBarActions(
- create mode — L468: mode="create"

Marqueurs contexte/actions:
- form — L11: import { ERPEnterpriseForm } from "@/components/erp/forms/enterprise/ERPEnterpriseForm";
- ERPEnterpriseForm — L11: import { ERPEnterpriseForm } from "@/components/erp/forms/enterprise/ERPEnterpriseForm";
- ERPRuntimeActionBar — L14: ERPRuntimeActionBar,
- ERPRuntimeActionBar — L15: type ERPRuntimeActionBarAction,
- ERPRuntimeActionBar — L16: } from "@/components/erp/runtime/ERPRuntimeActionBar";
- context — L26: import { ERPContextBanner } from "@/components/erp/context/ERPContextBanner";
- actions — L32: } from "@/runtime/actions/RuntimeActionEngine";
- ERPRuntimeActionBar — L44: ): ERPRuntimeActionBarAction[] {
- ERPRuntimeActionBar — L93: .filter(Boolean) as ERPRuntimeActionBarAction[];
- record — L97: record: Record<string, unknown>
- record — L100: String(record.id ?? record._id ?? "");
- record — L103: Number(record.montantTTC ?? 0);
- record — L106: Number(record.montantPaye ?? 0);
- record — L109: Number(record.resteAPayer ?? 0);
- record — L118: clientId: record.clientId ? String(record.clientId) : undefined,
- record — L119: vehiculeId: record.vehiculeId ? String(record.vehiculeId) : undefined,
- edit — L123: returnTo: "/facturesauto/" + factureId + "/edit",
- type: — L127: function getRuntimePageTypeLabel(type: string): string {
- list — L129: case "list":
- list — L130: return "liste";
- create — L131: case "create":
- edit — L133: case "edit":
- detail — L135: case "detail":
- create — L146: type?: "list" | "create" | "detail" | "edit" | string;
- detail — L146: type?: "list" | "create" | "detail" | "edit" | string;
- edit — L146: type?: "list" | "create" | "detail" | "edit" | string;
- list — L146: type?: "list" | "create" | "detail" | "edit" | string;
- record — L147: record?: Record<string, unknown>;
- list — L155: type = "list",
- record — L156: record,
- record — L166: record
- record — L173: setCurrentRecord(record);
- record — L174: }, [record]);
- list — L179: type !== "list" ||
- list — L189: await RuntimeDataBinding.list(
- actions — L208: async function handleRuntimeAction(action: NonNullable<ERPModule["actions"]>[number]) {
- record — L217: record: currentRecord,
- record — L220: const recordId =
- record — L228: if (recordId) {
- detail — L230: await RuntimeDataBinding.detail(
- record — L232: recordId
- list — L245: type === "list" &&
- create — L258: const createActionLabel =
- create — L263: const createActionHref =
- nouveau — L265: ? `/${module.metadata.key}/nouveau`
- detail — L275: (type === "detail" || type === "edit") && !isRemovedRecord
- edit — L275: (type === "detail" || type === "edit") && !isRemovedRecord
- actions — L279: actions: module?.actions ?? [],
- record — L281: record: currentRecord,
- list — L287: // Generic runtime: list pages may expose module actions with href.

### runtimeActionBar

Fichier: src/components/erp/runtime/ERPRuntimeActionBar.tsx
Existe: YES
Lignes: 146

Marqueurs suspects:
- runtime action bar — L6: export type ERPRuntimeActionBarTone =
- runtime action bar — L14: export type ERPRuntimeActionBarAction = {
- runtime action bar — L22: tone?: ERPRuntimeActionBarTone;
- hardcoded button — L24: onClick?: () => void | Promise<void>;
- runtime action bar — L27: export type ERPRuntimeActionBarProps = {
- runtime action bar — L30: actions?: ERPRuntimeActionBarAction[];
- runtime action bar — L36: tone: ERPRuntimeActionBarTone = "default",
- runtime action bar — L42: const tones: Record<ERPRuntimeActionBarTone, string> = {
- runtime action bar — L67: action: ERPRuntimeActionBarAction;
- hardcoded button — L90: <button
- hardcoded button — L95: onClick={action.onClick}
- runtime action bar — L102: export function ERPRuntimeActionBar({
- actions passed to form — L105: actions = [],
- runtime action bar — L108: }: ERPRuntimeActionBarProps) {
- actions passed to form — L109: const visibleActions = actions.filter((action) => !action.hidden);

Marqueurs contexte/actions:
- ERPRuntimeActionBar — L6: export type ERPRuntimeActionBarTone =
- ERPRuntimeActionBar — L14: export type ERPRuntimeActionBarAction = {
- ERPRuntimeActionBar — L22: tone?: ERPRuntimeActionBarTone;
- ERPRuntimeActionBar — L27: export type ERPRuntimeActionBarProps = {
- actions — L30: actions?: ERPRuntimeActionBarAction[];
- ERPRuntimeActionBar — L30: actions?: ERPRuntimeActionBarAction[];
- ERPRuntimeActionBar — L36: tone: ERPRuntimeActionBarTone = "default",
- ERPRuntimeActionBar — L42: const tones: Record<ERPRuntimeActionBarTone, string> = {
- ERPRuntimeActionBar — L67: action: ERPRuntimeActionBarAction;
- ERPRuntimeActionBar — L102: export function ERPRuntimeActionBar({
- actions — L105: actions = [],
- ERPRuntimeActionBar — L108: }: ERPRuntimeActionBarProps) {
- actions — L109: const visibleActions = actions.filter((action) => !action.hidden);

### enterpriseForm

Fichier: src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx
Existe: YES
Lignes: 1852

Actions RDV détectées:
- Annuler — L1820: Annuler

Marqueurs suspects:
- hardcoded button — L16: import { ERPButton } from "@/components/erp/ui";
- form action — L1462: function getBusinessStatusAction() {
- runtime action bar — L1464: // Workflow/status/business actions must be rendered by ERPRuntimePage / ERPRuntimeActionBar.
- form action — L1469: async function handleBusinessStatusAction() {
- runtime action bar — L1472: // Runtime actions must be executed from ERPRuntimePage / ERPRuntimeActionBar.
- form action — L1476: const businessStatusAction = mode === "create" || isRemovedRecord ? null : getBusinessStatusAction();
- runtime action bar — L1658: {/* Workflow actions are rendered by ERPRuntimeActionBar in ERPRuntimePage. */}
- runtime action bar — L1793: {/* AMARKHYS-REBUILD-05C-FIX3: form-level business/status action render removed. Runtime actions are rendered by ERPRuntimePage / ERPRuntimeActionBar. */}
- hardcoded button — L1799: <ERPButton
- hardcoded button — L1806: </ERPButton>
- hardcoded button — L1808: <ERPButton
- hardcoded button — L1812: onClick={() =>
- hardcoded button — L1821: </ERPButton>
- hardcoded button — L1835: <ERPButton
- hardcoded button — L1839: onClick={handleDeleteRecord}
- hardcoded button — L1842: </ERPButton>

Marqueurs contexte/actions:
- ERPEnterpriseForm — L213: interface ERPEnterpriseFormProps {
- mode — L215: mode?: "create" | "edit";
- create — L215: mode?: "create" | "edit";
- edit — L215: mode?: "create" | "edit";
- record — L229: record?: Record<string, unknown>;
- edit — L270: returnTo: "/facturesauto/" + factureId + "/edit",
- list — L300: await RuntimeDataBinding.list(linesModule);
- ERPEnterpriseForm — L394: export function ERPEnterpriseForm({
- mode — L396: mode = "create",
- create — L396: mode = "create",
- ERPEnterpriseForm — L399: }: ERPEnterpriseFormProps) {
- form — L402: const formRef =
- mode — L449: mode === "create"
- create — L449: mode === "create"
- edit — L472: // Its critical fields must not be edited freely after stock impact.
- mode — L474: mode === "edit" &&
- edit — L474: mode === "edit" &&
- mode — L493: : mode === "create"
- create — L493: : mode === "create"
- detail — L505: // Edit/detail : les verrous de composition restent appliques.
- form — L512: const form =
- form — L518: form.fields
- mode — L529: if (mode === "create") {
- create — L529: if (mode === "create") {
- form — L549: const [formValues, setFormValues] =
- create — L559: // Generic create forms must be able to receive initial values from URL.
- form — L559: // Generic create forms must be able to receive initial values from URL.
- context — L561: // contextual creation buttons, and any future metadata-driven entry point.
- edit — L562: // Applied once only to avoid overwriting user input while editing the form.
- form — L562: // Applied once only to avoid overwriting user input while editing the form.
- mode — L563: if (mode !== "create") {
- create — L563: if (mode !== "create") {
- mode — L612: mode,
- form — L620: form.fields
- form — L625: formValues
- record — L652: record: {
- form — L654: ...formValues,
- edit — L665: !isRemovedRecord && statusGovernance?.editMode === "action_only";
- mode — L761: mode === "edit" &&
- edit — L761: mode === "edit" &&
- record — L828: record: Record<string, unknown> | undefined,
- record — L831: if (!record) {
- record — L842: record[key];
- context — L858: context?: ERPFormRelationChangeContext
- context — L861: getRelationAutoFillConfig(context?.field);
- record — L863: const record =
- context — L864: context?.selectedOption?.record;
- record — L864: context?.selectedOption?.record;
- record — L868: !record
- context — L875: // The form extracts the relation context; RuntimeAutoFillEngine applies the mapping.

## Lecture recommandée

Si les actions RDV ne sont pas hardcodées dans la page create mais apparaissent visuellement sur /rendezvous/nouveau, la correction doit être générique dans le rendu runtime des actions : ne pas afficher les actions record-level lorsque mode/type=create ou lorsque record est absent.

Ne pas patcher localement /rendezvous/nouveau.
