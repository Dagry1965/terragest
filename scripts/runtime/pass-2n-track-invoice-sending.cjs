const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(path.join(root, filePath), content, "utf8");
  console.log("WRITTEN", filePath);
}

const modulePath =
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";

const actionsPath =
  "src/runtime/modules/generated/facturesauto/facturesauto.actions.ts";

const invoiceActionsPath =
  "src/components/erp/billing/InvoiceDocumentActions.tsx";

let moduleContent = read(modulePath);

moduleContent = moduleContent
  .replaceAll("NumÃ©ro facture", "Numéro facture")
  .replaceAll("Ã‰mise", "Émise")
  .replaceAll("AnnulÃ©e", "Annulée")
  .replaceAll("PayÃ©", "Payé")
  .replaceAll("VÃ©hicule", "Véhicule")
  .replaceAll("payÃ©", "payé")
  .replaceAll("Reste Ã  payer", "Reste à payer")
  .replaceAll("EspÃ¨ces", "Espèces")
  .replaceAll("mÃ©tier", "métier");

if (!moduleContent.includes('key: "statutEnvoiFacture"')) {
  moduleContent = moduleContent.replace(
`      {
        key: "observations",
        label: "Observations",
        type: "textarea",
        grid: { cols: 12 },
      },`,
`      {
        key: "statutEnvoiFacture",
        label: "Statut envoi facture",
        type: "select",
        defaultValue: "non_envoyee",
        options: [
          { label: "Non envoyée", value: "non_envoyee" },
          { label: "Envoyée", value: "envoyee" },
          { label: "Échec envoi", value: "echec" },
        ],
        list: { order: 9 },
        grid: { cols: 4 },
      },
      {
        key: "dernierEnvoiFactureAt",
        label: "Dernier envoi facture",
        type: "datetime",
        grid: { cols: 4 },
      },
      {
        key: "canalDernierEnvoiFacture",
        label: "Canal dernier envoi",
        type: "select",
        options: [
          { label: "WhatsApp", value: "whatsapp" },
          { label: "SMS", value: "sms" },
          { label: "Email", value: "email" },
          { label: "Lien", value: "lien" },
          { label: "Manuel", value: "manuel" },
        ],
        grid: { cols: 4 },
      },
      {
        key: "destinataireDernierEnvoiFacture",
        label: "Destinataire dernier envoi",
        type: "text",
        grid: { cols: 6 },
      },
      {
        key: "nombreEnvoisFacture",
        label: "Nombre d'envois",
        type: "number",
        defaultValue: 0,
        grid: { cols: 6 },
      },
      {
        key: "observations",
        label: "Observations",
        type: "textarea",
        grid: { cols: 12 },
      },`
  );
}

if (!moduleContent.includes('"statutEnvoiFacture"')) {
  console.error("FAILED: statutEnvoiFacture not inserted");
  process.exit(1);
}

if (!moduleContent.includes('key: "envoi"')) {
  moduleContent = moduleContent.replace(
`      {
        key: "notes",
        label: "Notes",
        fields: [
          "observations",
        ],
        sections: [
          {
            key: "obs",
            title: "Observations",
            fields: [
              "observations",
            ],
          },
        ],
      },`,
`      {
        key: "envoi",
        label: "Envoi",
        fields: [
          "statutEnvoiFacture",
          "dernierEnvoiFactureAt",
          "canalDernierEnvoiFacture",
          "destinataireDernierEnvoiFacture",
          "nombreEnvoisFacture",
        ],
        sections: [
          {
            key: "suivi-envoi",
            title: "Suivi d'envoi facture",
            fields: [
              "statutEnvoiFacture",
              "dernierEnvoiFactureAt",
              "canalDernierEnvoiFacture",
              "destinataireDernierEnvoiFacture",
              "nombreEnvoisFacture",
            ],
          },
        ],
      },

      {
        key: "notes",
        label: "Notes",
        fields: [
          "observations",
        ],
        sections: [
          {
            key: "obs",
            title: "Observations",
            fields: [
              "observations",
            ],
          },
        ],
      },`
  );
}

write(modulePath, moduleContent);

let actionsContent = read(actionsPath);

actionsContent = actionsContent
  .replaceAll("payÃ©e", "payée")
  .replaceAll("Marquer payÃ©e", "Marquer payée");

if (!actionsContent.includes('key: "Marquer envoyee"')) {
  actionsContent = actionsContent.replace(
`  {
    key: "Enregistrer paiement",
    label: "Enregistrer un paiement",
    type: "primary",
    permission: "facturesauto.workflow",
  },`,
`  {
    key: "Enregistrer paiement",
    label: "Enregistrer un paiement",
    type: "primary",
    permission: "facturesauto.workflow",
  },
  {
    key: "Marquer envoyee",
    label: "Marquer comme envoyée",
    type: "secondary",
    permission: "facturesauto.workflow",
  },`
  );
}

write(actionsPath, actionsContent);

let invoiceActions = read(invoiceActionsPath);

invoiceActions = invoiceActions
  .replaceAll("PayÃ©", "Payé")
  .replaceAll("PayÃ©e", "Payée")
  .replaceAll("AnnulÃ©", "Annulé")
  .replaceAll("AnnulÃ©e", "Annulée")
  .replaceAll("Client non renseignÃ©", "Client non renseigné")
  .replaceAll("VÃ©hicule non renseignÃ©", "Véhicule non renseigné")
  .replaceAll("Intervention non renseignÃ©e", "Intervention non renseignée")
  .replaceAll("â€¢", "•")
  .replaceAll("annulÃ©e", "annulée")
  .replaceAll("VÃ©hicule", "Véhicule")
  .replaceAll("payÃ©", "payé")
  .replaceAll("AnnulÃ©e", "Annulée")
  .replaceAll("Reste Ã  payer", "Reste à payer")
  .replaceAll("gÃ©nÃ©rÃ©e", "générée")
  .replaceAll("FACTURE ANNULÃ‰E", "FACTURE ANNULÉE")
  .replaceAll("conservÃ©", "conservé")
  .replaceAll("opÃ©ration", "opération")
  .replaceAll("nâ€™est", "n’est")
  .replaceAll("vÃ©hicule", "véhicule")
  .replaceAll("DÃ©tails", "Détails")
  .replaceAll("DÃ©signation", "Désignation")
  .replaceAll("tÃ©lÃ©charge", "télécharge")
  .replaceAll("prÃ©pare", "prépare");

if (!invoiceActions.includes("function getInvoiceRecordId(")) {
  invoiceActions = invoiceActions.replace(
`function buildInvoiceNumber(
  invoice: RecordData
): string {`,
`function getInvoiceRecordId(
  invoice: RecordData
): string {
  return value(
    invoice,
    "id",
    value(invoice, "_id", "")
  );
}

function getInvoiceSendStatusLabel(
  invoice: RecordData
): string {
  const status =
    value(invoice, "statutEnvoiFacture", "non_envoyee");

  const labels: Record<string, string> = {
    non_envoyee: "Non envoyée",
    envoyee: "Envoyée",
    echec: "Échec envoi",
  };

  return labels[status] ?? status;
}

function getInvoiceLastSendLabel(
  invoice: RecordData
): string {
  const date =
    value(invoice, "dernierEnvoiFactureAt");

  const canal =
    value(invoice, "canalDernierEnvoiFacture");

  if (!date && !canal) {
    return "Aucun envoi tracé.";
  }

  return [
    canal ? "Canal : " + canal : "",
    date ? "Dernier envoi : " + date : "",
  ]
    .filter(Boolean)
    .join(" • ");
}

function buildInvoiceNumber(
  invoice: RecordData
): string {`
  );
}

if (!invoiceActions.includes("async function markInvoiceAsSent(")) {
  invoiceActions = invoiceActions.replace(
`async function previewInvoice(
  invoice: RecordData
) {
  const doc =
    await createInvoicePdf(invoice);

  const blob =
    doc.output("blob");

  const url =
    URL.createObjectURL(blob);

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}`,
`async function previewInvoice(
  invoice: RecordData
) {
  const doc =
    await createInvoicePdf(invoice);

  const blob =
    doc.output("blob");

  const url =
    URL.createObjectURL(blob);

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}

async function markInvoiceAsSent(
  invoice: RecordData,
  canal: "whatsapp" | "sms" | "lien" | "manuel" = "manuel"
) {
  const id =
    getInvoiceRecordId(invoice);

  if (!id) {
    throw new Error("Facture introuvable : impossible de tracer l'envoi.");
  }

  await RuntimeDataBinding.update(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("@/runtime/modules/generated/facturesauto/facturesauto.module").facturesautoModule,
    id,
    {
      statutEnvoiFacture: "envoyee",
      dernierEnvoiFactureAt: new Date().toISOString(),
      canalDernierEnvoiFacture: canal,
      destinataireDernierEnvoiFacture: "",
      nombreEnvoisFacture:
        Number(invoice.nombreEnvoisFacture ?? 0) + 1,
    }
  );
}`
  );
}

if (!invoiceActions.includes("const [sendingStatus")) {
  invoiceActions = invoiceActions.replace(
`  const [relations, setRelations] =
    useState<{
      client: RecordData | null;
      vehicule: RecordData | null;
      intervention: RecordData | null;
    } | null>(null);`,
`  const [relations, setRelations] =
    useState<{
      client: RecordData | null;
      vehicule: RecordData | null;
      intervention: RecordData | null;
    } | null>(null);

  const [sendingStatus, setSendingStatus] =
    useState("");

  const [markingSent, setMarkingSent] =
    useState(false);`
  );
}

if (!invoiceActions.includes("async function handleMarkAsSent")) {
  invoiceActions = invoiceActions.replace(
`  const smsHref =
    "sms:?body=" +
    encodeURIComponent(shareText);

  return (`,
`  const smsHref =
    "sms:?body=" +
    encodeURIComponent(shareText);

  async function handleMarkAsSent(
    canal: "whatsapp" | "sms" | "lien" | "manuel"
  ) {
    setMarkingSent(true);
    setSendingStatus("");

    try {
      await markInvoiceAsSent(invoice, canal);
      setSendingStatus("Facture marquée comme envoyée.");
    } catch (error) {
      setSendingStatus(
        error instanceof Error
          ? error.message
          : "Impossible de tracer l'envoi."
      );
    } finally {
      setMarkingSent(false);
    }
  }

  return (`
  );
}

if (!invoiceActions.includes("Suivi envoi")) {
  invoiceActions = invoiceActions.replace(
`          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Visualise la facture, télécharge le PDF ou prépare un message WhatsApp / SMS pour le client.
          </p>
        </div>`,
`          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Visualise la facture, télécharge le PDF ou prépare un message WhatsApp / SMS pour le client.
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">
              Suivi envoi
            </p>
            <p className="mt-1 text-sm font-black text-slate-900">
              {getInvoiceSendStatusLabel(invoice)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {getInvoiceLastSendLabel(invoice)}
            </p>
            {sendingStatus ? (
              <p className="mt-2 text-xs font-bold text-emerald-700">
                {sendingStatus}
              </p>
            ) : null}
          </div>
        </div>`
  );
}

if (!invoiceActions.includes("Marquer envoyée")) {
  invoiceActions = invoiceActions.replace(
`          <a
            href={smsHref}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50"
          >
            SMS
          </a>`,
`          <a
            href={smsHref}
            onClick={() => void handleMarkAsSent("sms")}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50"
          >
            SMS
          </a>

          <button
            type="button"
            disabled={markingSent}
            onClick={() => void handleMarkAsSent("manuel")}
            className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-black text-blue-800 transition hover:bg-blue-100 disabled:opacity-50"
          >
            {markingSent ? "Traçage..." : "Marquer envoyée"}
          </button>`
  );
}

invoiceActions = invoiceActions.replace(
`          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50"
          >
            WhatsApp
          </a>`,
`          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => void handleMarkAsSent("whatsapp")}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50"
          >
            WhatsApp
          </a>`
);

write(invoiceActionsPath, invoiceActions);

console.log("PASS 2N-M OK: invoice sending tracking installed.");