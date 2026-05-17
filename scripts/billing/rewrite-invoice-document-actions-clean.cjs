const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/components/erp/billing/InvoiceDocumentActions.tsx"
);

const content = `"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

interface InvoiceDocumentActionsProps {
  invoice: Record<string, unknown>;
}

function value(
  invoice: Record<string, unknown>,
  key: string,
  fallback = ""
): string {
  const raw = invoice[key];

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
  const token =
    value(
      invoice,
      "publicToken",
      value(
        invoice,
        "token",
        value(
          invoice,
          "id",
          value(invoice, "_id", "")
        )
      )
    );

  if (
    typeof window === "undefined" ||
    !token
  ) {
    return "";
  }

  return window.location.origin + "/facture/" + token;
}

function buildShareText(
  invoice: Record<string, unknown>
): string {
  const numero =
    buildInvoiceNumber(invoice);

  const total =
    amount(invoice, "montantTTC");

  const paye =
    amount(invoice, "montantPaye");

  const reste =
    amount(invoice, "resteAPayer") > 0
      ? amount(invoice, "resteAPayer")
      : Math.max(total - paye, 0);

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
    .join("\\n");
}

async function createInvoicePdf(
  invoice: Record<string, unknown>
): Promise<jsPDF> {
  const doc =
    new jsPDF();

  const numero =
    buildInvoiceNumber(invoice);

  const dateFacture =
    value(
      invoice,
      "dateFacture",
      new Date().toISOString().split("T")[0]
    );

  const montantHT =
    amount(invoice, "montantHT");

  const tva =
    amount(invoice, "tva");

  const montantTTC =
    amount(invoice, "montantTTC");

  const montantPaye =
    amount(invoice, "montantPaye");

  const storedResteAPayer =
    amount(invoice, "resteAPayer");

  const resteAPayer =
    storedResteAPayer > 0
      ? storedResteAPayer
      : Math.max(montantTTC - montantPaye, 0);

  const publicUrl =
    buildInvoicePublicUrl(invoice);

  const qrDataUrl =
    publicUrl
      ? await QRCode.toDataURL(publicUrl, {
          margin: 1,
          width: 140,
        })
      : "";

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
  doc.text(
    value(invoice, "observations", "Merci pour votre confiance."),
    14,
    summaryY + 22
  );

  if (publicUrl) {
    doc.text(
      "Lien facture / paiement : " + publicUrl,
      14,
      summaryY + 34
    );

    if (qrDataUrl) {
      doc.addImage(
        qrDataUrl,
        "PNG",
        150,
        summaryY + 10,
        34,
        34
      );

      doc.setFontSize(8);
      doc.text(
        "Scanner pour consulter",
        145,
        summaryY + 48
      );
    }
  }

  doc.setFontSize(8);
  doc.text(
    "AMARKHYS • Facture générée automatiquement",
    14,
    285
  );

  return doc;
}

async function downloadInvoice(
  invoice: Record<string, unknown>
) {
  const doc =
    await createInvoicePdf(invoice);

  doc.save(
    buildInvoiceNumber(invoice) + ".pdf"
  );
}

async function previewInvoice(
  invoice: Record<string, unknown>
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

export function InvoiceDocumentActions({
  invoice,
}: InvoiceDocumentActionsProps) {
  const [qrDataUrl, setQrDataUrl] =
    useState("");

  const publicUrl =
    buildInvoicePublicUrl(invoice);

  useEffect(() => {
    let mounted = true;

    async function generateQr() {
      if (!publicUrl) {
        setQrDataUrl("");
        return;
      }

      const dataUrl =
        await QRCode.toDataURL(publicUrl, {
          margin: 1,
          width: 180,
        });

      if (mounted) {
        setQrDataUrl(dataUrl);
      }
    }

    generateQr();

    return () => {
      mounted = false;
    };
  }, [publicUrl]);

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

        <div className="flex flex-wrap items-center gap-3">
          {qrDataUrl ? (
            <a
              href={publicUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-emerald-200 bg-white p-2 transition hover:bg-emerald-50"
              title="Ouvrir la facture publique"
            >
              <img
                src={qrDataUrl}
                alt="QR code facture"
                className="h-20 w-20"
              />
            </a>
          ) : null}

          <button
            type="button"
            onClick={() => void previewInvoice(invoice)}
            className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            Visualiser PDF
          </button>

          <button
            type="button"
            onClick={() => void downloadInvoice(invoice)}
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
`;

fs.writeFileSync(target, content, "utf8");

console.log("OK InvoiceDocumentActions.tsx réécrit proprement.");