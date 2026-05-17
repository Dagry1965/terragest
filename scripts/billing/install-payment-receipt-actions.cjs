const fs = require("fs");
const path = require("path");

const root = process.cwd();

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

const receiptActionsFile = path.join(
  root,
  "src",
  "components",
  "erp",
  "billing",
  "PaymentReceiptActions.tsx"
);

const historyFile = path.join(
  root,
  "src",
  "components",
  "erp",
  "billing",
  "InvoicePaymentsHistory.tsx"
);

write(
  receiptActionsFile,
  `"use client";

import { jsPDF } from "jspdf";

import {
  AMARKHYS_BUSINESS_IDENTITY,
  buildAmarkhysContactLabel,
  buildAmarkhysWhatsAppHref,
} from "@/runtime/workspaces/amarkhys/amarkhysBusinessIdentity";

type RecordData = Record<string, unknown>;

interface PaymentReceiptActionsProps {
  payment: RecordData;
  factureId: string;
}

function value(
  record: RecordData | null | undefined,
  key: string,
  fallback = ""
): string {
  const raw =
    record?.[key];

  if (
    raw === null ||
    raw === undefined
  ) {
    return fallback;
  }

  return String(raw);
}

function amount(
  record: RecordData | null | undefined,
  key: string
): number {
  return Number(record?.[key] ?? 0);
}

function formatMoney(
  value: number
): string {
  return value.toLocaleString("fr-FR") + " FCFA";
}

function formatDate(
  value?: string
): string {
  if (!value) {
    return "-";
  }

  const date =
    new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("fr-FR");
}

function formatMode(
  value?: string
): string {
  const labels: Record<string, string> = {
    especes: "Espèces",
    mobile_money: "Mobile Money",
    carte: "Carte",
    virement: "Virement",
    cheque: "Chèque",
    autre: "Autre",
  };

  return labels[value ?? ""] ?? value ?? "-";
}

function formatStatus(
  value?: string
): string {
  const labels: Record<string, string> = {
    en_attente: "En attente",
    valide: "Validé",
    rejete: "Rejeté",
    annule: "Annulé",
  };

  return labels[value ?? ""] ?? value ?? "En attente";
}

function buildReceiptNumber(
  payment: RecordData
): string {
  return value(
    payment,
    "numeroRecu",
    "RECU-" + value(payment, "id", value(payment, "_id", Date.now().toString()))
  );
}

function buildReceiptText(
  payment: RecordData,
  factureId: string
): string {
  return [
    "Bonjour,",
    "",
    "Votre reçu de paiement " + AMARKHYS_BUSINESS_IDENTITY.displayName + " est disponible.",
    "",
    "Reçu : " + buildReceiptNumber(payment),
    "Facture : " + value(payment, "factureId", factureId),
    "Montant encaissé : " + formatMoney(amount(payment, "montant")),
    "Date paiement : " + formatDate(value(payment, "datePaiement")),
    "Mode paiement : " + formatMode(value(payment, "modePaiement")),
    "Référence : " + (value(payment, "referenceTransaction") || "-"),
    "Statut : " + formatStatus(value(payment, "statut")),
    "",
    buildAmarkhysContactLabel(),
    "",
    "Merci pour votre confiance.",
  ]
    .filter(Boolean)
    .join("\\n");
}

function createReceiptPdf(
  payment: RecordData,
  factureId: string
): jsPDF {
  const doc =
    new jsPDF();

  const receiptNumber =
    buildReceiptNumber(payment);

  const datePaiement =
    formatDate(value(payment, "datePaiement"));

  const montant =
    amount(payment, "montant");

  doc.setFontSize(20);
  doc.text(
    AMARKHYS_BUSINESS_IDENTITY.displayName.toUpperCase(),
    14,
    18
  );

  doc.setFontSize(10);
  doc.text(
    AMARKHYS_BUSINESS_IDENTITY.slogan,
    14,
    25
  );

  doc.text(
    buildAmarkhysContactLabel(),
    14,
    31
  );

  doc.setFontSize(16);
  doc.text("REÇU DE PAIEMENT", 14, 48);

  doc.setFontSize(10);
  doc.text("Reçu : " + receiptNumber, 14, 60);
  doc.text("Facture : " + value(payment, "factureId", factureId), 14, 68);
  doc.text("Date paiement : " + datePaiement, 14, 76);
  doc.text("Mode paiement : " + formatMode(value(payment, "modePaiement")), 14, 84);
  doc.text("Référence : " + (value(payment, "referenceTransaction") || "-"), 14, 92);
  doc.text("Statut : " + formatStatus(value(payment, "statut")), 14, 100);

  doc.setDrawColor(16, 185, 129);
  doc.line(14, 110, 196, 110);

  doc.setFontSize(12);
  doc.text("Montant encaissé", 14, 126);

  doc.setFontSize(22);
  doc.text(formatMoney(montant), 14, 140);

  doc.setFontSize(9);
  doc.text(
    "Ce reçu atteste l’enregistrement du paiement indiqué ci-dessus.",
    14,
    160
  );

  doc.text(
    AMARKHYS_BUSINESS_IDENTITY.displayName + " • Reçu généré automatiquement",
    14,
    285
  );

  return doc;
}

function downloadReceipt(
  payment: RecordData,
  factureId: string
) {
  const doc =
    createReceiptPdf(payment, factureId);

  doc.save(
    buildReceiptNumber(payment) + ".pdf"
  );
}

function previewReceipt(
  payment: RecordData,
  factureId: string
) {
  const doc =
    createReceiptPdf(payment, factureId);

  const blob =
    doc.output("blob");

  const url =
    URL.createObjectURL(blob);

  window.open(url, "_blank", "noopener,noreferrer");

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 30000);
}

export function PaymentReceiptActions({
  payment,
  factureId,
}: PaymentReceiptActionsProps) {
  const text =
    buildReceiptText(payment, factureId);

  const smsHref =
    "sms:?body=" + encodeURIComponent(text);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => previewReceipt(payment, factureId)}
        className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800 transition hover:bg-emerald-100"
      >
        Reçu
      </button>

      <button
        type="button"
        onClick={() => downloadReceipt(payment, factureId)}
        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-700 transition hover:bg-slate-50"
      >
        PDF
      </button>

      <a
        href={buildAmarkhysWhatsAppHref(text)}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-black text-emerald-700 transition hover:bg-emerald-50"
      >
        WhatsApp
      </a>

      <a
        href={smsHref}
        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-700 transition hover:bg-slate-50"
      >
        SMS
      </a>
    </div>
  );
}
`
);

if (!fs.existsSync(historyFile)) {
  console.error(`MISSING ${historyFile}`);
  process.exit(1);
}

let history = read(historyFile);

if (!history.includes("PaymentReceiptActions")) {
  history = history.replace(
    `import {
  encaissementsautoModule,
} from "@/runtime/modules/generated/encaissementsauto";`,
    `import {
  encaissementsautoModule,
} from "@/runtime/modules/generated/encaissementsauto";

import {
  PaymentReceiptActions,
} from "./PaymentReceiptActions";`
  );
}

history = history.replace(
  `          <div className="grid grid-cols-5 gap-4 bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-wide text-white">
            <div>Date</div>
            <div>Montant</div>
            <div>Mode</div>
            <div>RÃ©fÃ©rence</div>
            <div>Statut</div>
          </div>`,
  `          <div className="grid grid-cols-6 gap-4 bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-wide text-white">
            <div>Date</div>
            <div>Montant</div>
            <div>Mode</div>
            <div>Référence</div>
            <div>Statut</div>
            <div>Reçu</div>
          </div>`
);

history = history.replace(
  `                className="grid grid-cols-5 gap-4 px-4 py-4 text-sm text-slate-700"`,
  `                className="grid grid-cols-6 gap-4 px-4 py-4 text-sm text-slate-700"`
);

history = history.replace(
  `                <div>
                  <span
                    className={\`
                      rounded-full
                      border
                      px-3
                      py-1
                      text-xs
                      font-black
                      \${statusClassName(item.statut)}
                    \`}
                  >
                    {formatStatus(item.statut)}
                  </span>
                </div>
              </div>`,
  `                <div>
                  <span
                    className={\`
                      rounded-full
                      border
                      px-3
                      py-1
                      text-xs
                      font-black
                      \${statusClassName(item.statut)}
                    \`}
                  >
                    {formatStatus(item.statut)}
                  </span>
                </div>

                <div>
                  <PaymentReceiptActions
                    payment={item as Record<string, unknown>}
                    factureId={factureId}
                  />
                </div>
              </div>`
);

write(historyFile, history);

console.log("DONE install payment receipt actions");