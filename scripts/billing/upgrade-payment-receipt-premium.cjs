const fs = require("fs");
const path = require("path");

const root = process.cwd();

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const receiptFile = path.join(
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

if (!fs.existsSync(receiptFile)) {
  console.error(`MISSING ${receiptFile}`);
  process.exit(1);
}

if (!fs.existsSync(historyFile)) {
  console.error(`MISSING ${historyFile}`);
  process.exit(1);
}

write(
  receiptFile,
  `"use client";

import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  facturesautoModule,
} from "@/runtime/modules/generated/facturesauto";

import {
  clientsautoModule,
} from "@/runtime/modules/generated/clientsauto";

import {
  vehiculesModule,
} from "@/runtime/modules/generated/vehicules";

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

interface ReceiptContext {
  invoice: RecordData | null;
  client: RecordData | null;
  vehicule: RecordData | null;
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
    "RECU-" + value(
      payment,
      "id",
      value(payment, "_id", Date.now().toString())
    )
  );
}

function buildInvoiceNumber(
  invoice: RecordData | null,
  fallback: string
): string {
  return value(
    invoice,
    "numeroFacture",
    value(invoice, "reference", fallback)
  );
}

function buildClientLabel(
  client: RecordData | null
): string {
  if (!client) {
    return "Client non renseigné";
  }

  const nom =
    value(client, "nom");

  const prenom =
    value(client, "prenom");

  const raisonSociale =
    value(client, "raisonSociale");

  const telephone =
    value(client, "telephone");

  const email =
    value(client, "email");

  const fullName =
    [prenom, nom]
      .filter(Boolean)
      .join(" ")
      .trim();

  return [
    fullName || raisonSociale || "Client",
    telephone,
    email,
  ]
    .filter(Boolean)
    .join(" • ");
}

function buildVehicleLabel(
  vehicule: RecordData | null
): string {
  if (!vehicule) {
    return "Véhicule non renseigné";
  }

  const marque =
    value(vehicule, "marque");

  const modele =
    value(vehicule, "modele");

  const immatriculation =
    value(vehicule, "immatriculation");

  return [
    [marque, modele]
      .filter(Boolean)
      .join(" ")
      .trim(),
    immatriculation,
  ]
    .filter(Boolean)
    .join(" • ") || "Véhicule";
}

async function loadReceiptContext(
  payment: RecordData,
  factureId: string
): Promise<ReceiptContext> {
  const invoiceId =
    value(payment, "factureId", factureId);

  let invoice: RecordData | null =
    null;

  try {
    invoice =
      invoiceId
        ? await RuntimeDataBinding.detail(
            facturesautoModule,
            invoiceId
          )
        : null;
  } catch {
    invoice = null;
  }

  const clientId =
    value(payment, "clientId", value(invoice, "clientId"));

  const vehiculeId =
    value(payment, "vehiculeId", value(invoice, "vehiculeId"));

  const [
    client,
    vehicule,
  ] =
    await Promise.all([
      clientId
        ? RuntimeDataBinding.detail(
            clientsautoModule,
            clientId
          ).catch(() => null)
        : Promise.resolve(null),

      vehiculeId
        ? RuntimeDataBinding.detail(
            vehiculesModule,
            vehiculeId
          ).catch(() => null)
        : Promise.resolve(null),
    ]);

  return {
    invoice,
    client,
    vehicule,
  };
}

function buildReceiptText(
  payment: RecordData,
  factureId: string,
  context: ReceiptContext | null
): string {
  const invoiceNumber =
    buildInvoiceNumber(
      context?.invoice ?? null,
      value(payment, "factureId", factureId)
    );

  return [
    "Bonjour,",
    "",
    "Votre reçu de paiement " + AMARKHYS_BUSINESS_IDENTITY.displayName + " est disponible.",
    "",
    "Reçu : " + buildReceiptNumber(payment),
    "Facture : " + invoiceNumber,
    "Client : " + buildClientLabel(context?.client ?? null),
    "Véhicule : " + buildVehicleLabel(context?.vehicule ?? null),
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
  factureId: string,
  context: ReceiptContext | null
): jsPDF {
  const doc =
    new jsPDF();

  const receiptNumber =
    buildReceiptNumber(payment);

  const invoiceNumber =
    buildInvoiceNumber(
      context?.invoice ?? null,
      value(payment, "factureId", factureId)
    );

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

  doc.setDrawColor(16, 185, 129);
  doc.line(14, 38, 196, 38);

  doc.setFontSize(16);
  doc.text("REÇU DE PAIEMENT", 14, 52);

  doc.setFontSize(10);
  doc.text("Reçu : " + receiptNumber, 14, 66);
  doc.text("Facture : " + invoiceNumber, 14, 74);
  doc.text("Client : " + buildClientLabel(context?.client ?? null), 14, 82);
  doc.text("Véhicule : " + buildVehicleLabel(context?.vehicule ?? null), 14, 90);
  doc.text("Date paiement : " + datePaiement, 14, 98);
  doc.text("Mode paiement : " + formatMode(value(payment, "modePaiement")), 14, 106);
  doc.text("Référence : " + (value(payment, "referenceTransaction") || "-"), 14, 114);
  doc.text("Statut : " + formatStatus(value(payment, "statut")), 14, 122);

  doc.setDrawColor(16, 185, 129);
  doc.line(14, 134, 196, 134);

  doc.setFontSize(12);
  doc.text("Montant encaissé", 14, 150);

  doc.setFontSize(22);
  doc.text(formatMoney(montant), 14, 164);

  doc.setFontSize(9);
  doc.text(
    "Ce reçu atteste l’enregistrement du paiement indiqué ci-dessus.",
    14,
    184
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
  factureId: string,
  context: ReceiptContext | null
) {
  const doc =
    createReceiptPdf(payment, factureId, context);

  doc.save(
    buildReceiptNumber(payment) + ".pdf"
  );
}

function previewReceipt(
  payment: RecordData,
  factureId: string,
  context: ReceiptContext | null
) {
  const doc =
    createReceiptPdf(payment, factureId, context);

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
  const [context, setContext] =
    useState<ReceiptContext | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const loadedContext =
        await loadReceiptContext(payment, factureId);

      if (mounted) {
        setContext(loadedContext);
      }
    }

    load().catch(() => {
      if (mounted) {
        setContext(null);
      }
    });

    return () => {
      mounted = false;
    };
  }, [payment, factureId]);

  const text =
    useMemo(
      () => buildReceiptText(payment, factureId, context),
      [payment, factureId, context]
    );

  const smsHref =
    "sms:?body=" + encodeURIComponent(text);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => previewReceipt(payment, factureId, context)}
        className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800 transition hover:bg-emerald-100"
      >
        Reçu
      </button>

      <button
        type="button"
        onClick={() => downloadReceipt(payment, factureId, context)}
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

let history = read(historyFile);

history = history
  .replaceAll("EspÃ¨ces", "Espèces")
  .replaceAll("ChÃ¨que", "Chèque")
  .replaceAll("ValidÃ©", "Validé")
  .replaceAll("RejetÃ©", "Rejeté")
  .replaceAll("AnnulÃ©", "Annulé")
  .replaceAll("Paiements enregistrÃ©s", "Paiements enregistrés")
  .replaceAll("Liste des paiements liÃ©s Ã  cette facture.", "Liste des paiements liés à cette facture.")
  .replaceAll("Total encaissÃ©", "Total encaissé")
  .replaceAll("Reste Ã  payer", "Reste à payer")
  .replaceAll("Aucun paiement enregistrÃ© pour cette facture.", "Aucun paiement enregistré pour cette facture.")
  .replaceAll("RÃ©fÃ©rence", "Référence");

history = history.replace(
  `          <div className="grid grid-cols-5 gap-4 bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-wide text-white">
            <div>Date</div>
            <div>Montant</div>
            <div>Mode</div>
            <div>Référence</div>
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

write(historyFile, history);

console.log("DONE upgrade payment receipt premium");