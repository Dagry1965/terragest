"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceDocumentActionsProps {
  invoice: Record<string, unknown>;
}

function value(
  invoice: Record<string, unknown>,
  key: string,
  fallback = ""
): string {
  const raw =
    invoice[key];

  if (
    raw === null ||
    raw === undefined ||
    raw === ""
  ) {
    return fallback;
  }

  return String(raw);
}

function amount(
  invoice: Record<string, unknown>,
  key: string
): number {
  return Number(invoice[key] ?? 0);
}

function formatMoney(
  value: number
): string {
  return value.toLocaleString("fr-FR") + " FCFA";
}

function buildInvoiceNumber(
  invoice: Record<string, unknown>
): string {
  return value(
    invoice,
    "numeroFacture",
    "FACTURE-" + value(invoice, "id", "AMARKHYS")
  );
}

function buildInvoicePublicUrl(
  invoice: Record<string, unknown>
): string {
  const id =
    value(invoice, "id", value(invoice, "_id", ""));

  if (
    typeof window === "undefined" ||
    !id
  ) {
    return "";
  }

  return window.location.origin + "/facture/" + id;
}

function buildShareText(
  invoice: Record<string, unknown>
): string {
  const numero =
    buildInvoiceNumber(invoice);

  const reste =
    amount(invoice, "resteAPayer");

  const total =
    amount(invoice, "montantTTC");

  const url =
    buildInvoicePublicUrl(invoice);

  return [
    "Bonjour,",
    "Votre facture AMARKHYS " + numero + " est disponible.",
    "Montant TTC : " + formatMoney(total),
    "Reste à payer : " + formatMoney(reste),
    url ? "Lien : " + url : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function createInvoicePdf(
  invoice: Record<string, unknown>
): jsPDF {
  const doc =
    new jsPDF();

  const numero =
    buildInvoiceNumber(invoice);

  const dateFacture =
    value(invoice, "dateFacture", new Date().toISOString().split("T")[0]);

  const montantHT =
    amount(invoice, "montantHT");

  const tva =
    amount(invoice, "tva");

  const montantTTC =
    amount(invoice, "montantTTC");

  const montantPaye =
    amount(invoice, "montantPaye");

  const resteAPayer =
    amount(invoice, "resteAPayer");

  const publicUrl =
    buildInvoicePublicUrl(invoice);

  doc.setFontSize(20);
  doc.text("AMARKHYS GARAGE", 14, 18);

  doc.setFontSize(10);
  doc.text("Garage automobile • Entretien • Diagnostic • PETRONAS", 14, 26);
  doc.text("Facture générée depuis Terragest ERP", 14, 32);

  doc.setFontSize(16);
  doc.text("FACTURE", 150, 18);

  doc.setFontSize(10);
  doc.text("N° : " + numero, 150, 26);
  doc.text("Date : " + dateFacture, 150, 32);

  doc.setDrawColor(0);
  doc.line(14, 40, 196, 40);

  doc.setFontSize(11);
  doc.text("Client", 14, 50);
  doc.setFontSize(10);
  doc.text("Client ID : " + value(invoice, "clientId", "-"), 14, 58);
  doc.text("Véhicule ID : " + value(invoice, "vehiculeId", "-"), 14, 64);
  doc.text("Intervention ID : " + value(invoice, "interventionId", "-"), 14, 70);

  doc.setFontSize(11);
  doc.text("Détails facture", 14, 84);

  autoTable(doc, {
    startY: 90,
    head: [[
      "Désignation",
      "Montant HT",
      "TVA",
      "Montant TTC",
    ]],
    body: [[
      "Prestation atelier AMARKHYS",
      formatMoney(montantHT),
      String(tva) + "%",
      formatMoney(montantTTC),
    ]],
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: [0, 169, 157],
    },
  });

  const finalY =
    (doc as any).lastAutoTable?.finalY ?? 120;

  autoTable(doc, {
    startY: finalY + 10,
    body: [
      ["Montant HT", formatMoney(montantHT)],
      ["TVA", String(tva) + "%"],
      ["Montant TTC", formatMoney(montantTTC)],
      ["Montant payé", formatMoney(montantPaye)],
      ["Reste à payer", formatMoney(resteAPayer)],
      ["Statut paiement", value(invoice, "statutPaiement", "en_attente")],
    ],
    theme: "plain",
    styles: {
      fontSize: 10,
    },
    columnStyles: {
      0: {
        fontStyle: "bold",
      },
      1: {
        halign: "right",
      },
    },
  });

  const summaryY =
    (doc as any).lastAutoTable?.finalY ?? finalY + 50;

  doc.setFontSize(9);
  doc.text("Notes", 14, summaryY + 15);
  doc.text(value(invoice, "observations", "Merci pour votre confiance."), 14, summaryY + 22);

  if (publicUrl) {
    doc.text("Lien facture / paiement : " + publicUrl, 14, summaryY + 34);
  }

  doc.setFontSize(8);
  doc.text("AMARKHYS • Facture générée automatiquement", 14, 285);

  return doc;
}

function downloadInvoice(
  invoice: Record<string, unknown>
) {
  const doc =
    createInvoicePdf(invoice);

  doc.save(
    buildInvoiceNumber(invoice) + ".pdf"
  );
}

function previewInvoice(
  invoice: Record<string, unknown>
) {
  const doc =
    createInvoicePdf(invoice);

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

export function InvoiceDocumentActions({
  invoice,
}: InvoiceDocumentActionsProps) {
  const shareText =
    buildShareText(invoice);

  const whatsappHref =
    "https://wa.me/?text=" +
    encodeURIComponent(shareText);

  const smsHref =
    "sms:?body=" +
    encodeURIComponent(shareText);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
            Documents facture
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            PDF, partage et lien client
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Visualise la facture, télécharge le PDF ou prépare un message WhatsApp / SMS pour le client.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => previewInvoice(invoice)}
            className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            Visualiser PDF
          </button>

          <button
            type="button"
            onClick={() => downloadInvoice(invoice)}
            className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-500"
          >
            Télécharger PDF
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50"
          >
            WhatsApp
          </a>

          <a
            href={smsHref}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50"
          >
            SMS
          </a>
        </div>
      </div>
    </section>
  );
}
