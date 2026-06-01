const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const ADAPTER = path.join(
  ROOT,
  "src",
  "runtime",
  "hub",
  "RuntimeHubActionContextAdapter.ts"
);

const SHEET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "hub",
  "ERPClientOperationalSheet.tsx"
);

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "AMARKHYS-HUB-ACTION-CONTEXT-ADAPTER.md"
);

const SHEET_BACKUP = `${SHEET}.bak-action-context-adapter`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

console.log("[AMARKHYS-HUB-ACTION-CONTEXT-ADAPTER] Install hub action context adapter");

if (!fs.existsSync(SHEET)) {
  fail(`Missing sheet: ${SHEET}`);
}

const adapterContent = `export type RuntimeHubActionTone =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "muted";

export type RuntimeHubResolvedAction = {
  key: string;
  label: string;
  description?: string;
  href?: string;
  disabled?: boolean;
  hidden?: boolean;
  tone?: RuntimeHubActionTone;
};

export type RuntimeHubActionContext = {
  clientId?: string | null;
  clientLabel?: string | null;
  clientPhone?: string | null;
  clientEmail?: string | null;

  vehiculeId?: string | null;
  rendezvousId?: string | null;
  interventionId?: string | null;
  factureId?: string | null;

  unpaidAmount?: number;
  remainingAmount?: number;

  returnTo?: string;
};

function clean(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function hasAmount(value: number | null | undefined): boolean {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function formatMoney(value: number | null | undefined): string {
  const amount = typeof value === "number" && Number.isFinite(value) ? value : 0;

  return \`\${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(amount)} FCFA\`;
}

function buildHref(
  pathname: string,
  params: Record<string, string | number | null | undefined>
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;

    const stringValue = String(value).trim();

    if (stringValue.length > 0) {
      searchParams.set(key, stringValue);
    }
  }

  const query = searchParams.toString();

  return query ? \`\${pathname}?\${query}\` : pathname;
}

function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

function buildWhatsAppHref(message: string, phone?: string | null): string | undefined {
  const cleanedPhone = normalizePhone(clean(phone));

  if (!cleanedPhone) {
    return undefined;
  }

  return \`https://wa.me/\${cleanedPhone}?text=\${encodeURIComponent(message)}\`;
}

function buildRelanceMessage(context: RuntimeHubActionContext, scope: "client" | "facture"): string {
  const client = clean(context.clientLabel) || "client";
  const amount =
    scope === "facture"
      ? formatMoney(context.remainingAmount)
      : formatMoney(context.unpaidAmount);

  if (scope === "facture") {
    return [
      "Bonjour " + client + ",",
      "AMARKHYS Garage vous informe qu'un solde de " + amount + " reste à régler sur votre facture.",
      "Merci de bien vouloir procéder au règlement ou nous contacter pour toute précision.",
    ].join(" ");
  }

  return [
    "Bonjour " + client + ",",
    "AMARKHYS Garage vous informe que votre compte présente un impayé de " + amount + ".",
    "Merci de bien vouloir procéder au règlement ou nous contacter pour régulariser la situation.",
  ].join(" ");
}

export class RuntimeHubActionContextAdapter {
  static resolve(context: RuntimeHubActionContext): RuntimeHubResolvedAction[] {
    const clientId = clean(context.clientId);
    const vehiculeId = clean(context.vehiculeId);
    const rendezvousId = clean(context.rendezvousId);
    const interventionId = clean(context.interventionId);
    const factureId = clean(context.factureId);
    const returnTo = clean(context.returnTo);

    const hasClientDebt = hasAmount(context.unpaidAmount);
    const hasInvoiceDebt = hasAmount(context.remainingAmount);

    const sharedContext = {
      clientId,
      vehiculeId,
      rendezvousId,
      interventionId,
      factureId,
      returnTo,
    };

    const actions: RuntimeHubResolvedAction[] = [];

    if (hasClientDebt) {
      actions.push({
        key: "hub.relancer-client",
        label: "Relancer le client",
        description: "Relance globale du client pour ses impayés.",
        href: buildWhatsAppHref(buildRelanceMessage(context, "client"), context.clientPhone),
        disabled: !clean(context.clientPhone),
        tone: "warning",
      });
    }

    if (factureId && hasInvoiceDebt) {
      actions.push({
        key: "hub.relancer-facture",
        label: "Relancer cette facture",
        description: "Relance ciblée sur la facture du parcours sélectionné.",
        href: buildWhatsAppHref(buildRelanceMessage(context, "facture"), context.clientPhone),
        disabled: !clean(context.clientPhone),
        tone: "warning",
      });

      actions.push({
        key: "hub.enregistrer-paiement",
        label: "Enregistrer paiement",
        description: "Créer un encaissement lié au client, à la facture et au parcours.",
        href: buildHref("/encaissementsauto/nouveau", sharedContext),
        tone: "success",
      });
    }

    if (interventionId) {
      actions.push({
        key: "hub.ouvrir-intervention",
        label: "Ouvrir intervention",
        description: "Ouvrir l'intervention sélectionnée en conservant le contexte client.",
        href: buildHref("/interventionsauto/" + interventionId, {
          clientId,
          vehiculeId,
          rendezvousId,
          returnTo,
        }),
        tone: "default",
      });
    }

    if (factureId) {
      actions.push({
        key: "hub.ouvrir-facture",
        label: "Ouvrir facture",
        description: "Ouvrir la facture sélectionnée en conservant le contexte client.",
        href: buildHref("/facturesauto/" + factureId, {
          clientId,
          vehiculeId,
          interventionId,
          returnTo,
        }),
        tone: "default",
      });
    }

    if (clientId) {
      actions.push({
        key: "hub.voir-encaissements",
        label: "Voir encaissements",
        description: "Consulter les encaissements liés au client.",
        href: buildHref("/encaissementsauto", {
          clientId,
          vehiculeId,
          factureId,
          returnTo,
        }),
        tone: "muted",
      });
    }

    return actions.filter((action) => !action.hidden);
  }
}
`;

write(ADAPTER, adapterContent);
ok(`Written: ${path.relative(ROOT, ADAPTER)}`);

const before = read(SHEET);
write(SHEET_BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, SHEET_BACKUP)}`);

let after = before;

const required = [
  'import { ERPOperationalTable } from "@/components/erp/operational/ERPOperationalTable";',
  'function queryHref(',
  'const parcoursAtelierStatus = useMemo(() => {',
  'const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());',
  'Situation client',
];

for (const marker of required) {
  if (!after.includes(marker)) {
    fail(`Missing marker before patch: ${marker}`);
  }
}

if (!after.includes('ERPRuntimeActionBar')) {
  after = after.replace(
    'import { ERPOperationalTable } from "@/components/erp/operational/ERPOperationalTable";',
    [
      'import { ERPOperationalTable } from "@/components/erp/operational/ERPOperationalTable";',
      'import { ERPRuntimeActionBar } from "@/components/erp/runtime/ERPRuntimeActionBar";',
      'import { RuntimeHubActionContextAdapter } from "@/runtime/hub/RuntimeHubActionContextAdapter";',
    ].join("\\n")
  );
}

if (!after.includes("const hubReturnTo = useMemo(() => {")) {
  const anchor = '  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());';

  const hubActionBlock = `  const hubReturnTo = useMemo(() => {
    return queryHref("/clientsauto/hub", {
      clientId: recordId(rootRecord),
      selectedVehicleId: recordId(selectedVehicle),
    });
  }, [rootRecord, selectedVehicle]);

  const hubActions = useMemo(() => {
    const selectedFacture = facturesForSelectedIntervention[0] ?? null;

    return RuntimeHubActionContextAdapter.resolve({
      clientId: recordId(rootRecord),
      clientLabel: text(rootRecord, ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"], "Client"),
      clientPhone: text(rootRecord, ["telephone", "phone", "mobile", "whatsapp"], ""),
      clientEmail: text(rootRecord, ["email"], ""),
      vehiculeId: recordId(selectedVehicle),
      rendezvousId: recordId(selectedRendezvous),
      interventionId: recordId(selectedIntervention),
      factureId: recordId(selectedFacture),
      unpaidAmount,
      remainingAmount: parcoursAtelierStatus.remainingAmount,
      returnTo: hubReturnTo,
    });
  }, [
    rootRecord,
    selectedVehicle,
    selectedRendezvous,
    selectedIntervention,
    facturesForSelectedIntervention,
    unpaidAmount,
    parcoursAtelierStatus.remainingAmount,
    hubReturnTo,
  ]);

  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());`;

  after = after.replace(anchor, hubActionBlock);
}

if (!after.includes('data-amarkhys-hub-actions="CLIENT_CONTEXT_ACTIONS"')) {
  const situationIndex = after.indexOf("Situation client");

  if (situationIndex === -1) {
    fail("Situation client block not found.");
  }

  const sectionEnd = after.indexOf("              </section>", situationIndex);

  if (sectionEnd === -1) {
    fail("Situation client section end not found.");
  }

  const insertAt = sectionEnd + "              </section>".length;

  const actionBar = `

              <div data-amarkhys-hub-actions="CLIENT_CONTEXT_ACTIONS">
                <ERPRuntimeActionBar
                  title="Actions client"
                  description="Actions disponibles selon le client, le véhicule, le parcours atelier, la facture et les impayés."
                  actions={hubActions}
                  compact
                  className="border-orange-200 bg-orange-50/40"
                />
              </div>`;

  after = after.slice(0, insertAt) + actionBar + after.slice(insertAt);
}

const checks = [
  ["adapter written", fs.existsSync(ADAPTER)],
  ["action bar imported", after.includes("ERPRuntimeActionBar")],
  ["adapter imported", after.includes("RuntimeHubActionContextAdapter")],
  ["hubReturnTo added", after.includes("const hubReturnTo = useMemo")],
  ["hubActions added", after.includes("const hubActions = useMemo")],
  ["action bar rendered", after.includes('data-amarkhys-hub-actions="CLIENT_CONTEXT_ACTIONS"')],
  ["relancer client action", adapterContent.includes("hub.relancer-client")],
  ["relancer facture action", adapterContent.includes("hub.relancer-facture")],
  ["enregistrer paiement action", adapterContent.includes("hub.enregistrer-paiement")],
  ["returnTo supported", adapterContent.includes("returnTo")],
];

const failed = checks.filter(([, ok]) => !ok);

if (failed.length > 0) {
  fail(`Checks failed: ${failed.map(([name]) => name).join(", ")}`);
}

write(SHEET, after);
ok(`Written: ${path.relative(ROOT, SHEET)}`);

const report = [
  "# AMARKHYS-HUB-ACTION-CONTEXT-ADAPTER",
  "",
  "## Objectif",
  "",
  "Créer un adaptateur runtime/hub qui transforme le contexte de la fiche client opérationnelle en actions affichables.",
  "",
  "## Fichiers",
  "",
  `- \`${path.relative(ROOT, ADAPTER)}\``,
  `- \`${path.relative(ROOT, SHEET)}\``,
  "",
  "## Actions résolues",
  "",
  "- Relancer le client",
  "- Relancer cette facture",
  "- Enregistrer paiement",
  "- Ouvrir intervention",
  "- Ouvrir facture",
  "- Voir encaissements",
  "",
  "## Contexte transporté",
  "",
  "- clientId",
  "- vehiculeId",
  "- rendezvousId",
  "- interventionId",
  "- factureId",
  "- returnTo",
  "",
  "## Notes",
  "",
  "- La relance utilise pour l’instant WhatsApp via lien prérempli si le téléphone client existe.",
  "- Le module d’historique relance n’est pas encore créé.",
  "- L’objectif est de brancher la fiche sur une gouvernance d’actions, pas de disperser des boutons locaux.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, ok]) => `- ${ok ? "OK" : "FAIL"} — ${name}`),
  "",
].join("\\n");

write(REPORT, report);
ok(`Report: ${path.relative(ROOT, REPORT)}`);

console.log("[AMARKHYS-HUB-ACTION-CONTEXT-ADAPTER] DONE");
console.log("[NEXT] pnpm build");