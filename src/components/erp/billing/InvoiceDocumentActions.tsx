"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  clientsautoModule,
} from "@/runtime/modules/generated/clientsauto";

import {
  vehiculesModule,
} from "@/runtime/modules/generated/vehicules";

import {
  interventionsautoModule,
} from "@/runtime/modules/generated/interventionsauto";

import {
  AMARKHYS_BUSINESS_IDENTITY,
  buildAmarkhysContactLabel,
} from "@/runtime/workspaces/amarkhys/amarkhysBusinessIdentity";

interface InvoiceDocumentActionsProps {
  invoice: Record<string, unknown>;
}

type RecordData = Record<string, unknown>;

function value(
  record: RecordData | null | undefined,
  key: string,
  fallback = ""
): string {
  const raw =
    record?.[key];

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

function formatPaymentStatus(
  value?: string
): string {
  const labels: Record<string, string> = {
    en_attente: "En attente",
    partiel: "Paiement partiel",
    paye: "Payé",
    payee: "Payée",
    annule: "Annulé",
    annulee: "Annulée",
  };

  return labels[value ?? ""] ?? value ?? "En attente";
}

function computeResteAPayer(
  invoice: RecordData
): number {
  const montantTTC =
    amount(invoice, "montantTTC");

  const montantPaye =
    amount(invoice, "montantPaye");

  const resteStocke =
    amount(invoice, "resteAPayer");

  if (resteStocke > 0) {
    return resteStocke;
  }

  return Math.max(
    montantTTC - montantPaye,
    0
  );
}

function buildInvoiceNumber(
  invoice: RecordData
): string {
  return value(
    invoice,
    "numeroFacture",
    "FACTURE-" + value(invoice, "id", "AMARKHYS")
  );
}

function buildInvoicePublicUrl(
  invoice: RecordData
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

function buildInterventionLabel(
  intervention: RecordData | null
): string {
  if (!intervention) {
    return "Intervention non renseignée";
  }

  return [
    value(intervention, "typeIntervention"),
    value(intervention, "dateIntervention"),
    value(intervention, "statut"),
  ]
    .filter(Boolean)
    .join(" • ") || "Intervention";
}

async function loadInvoiceRelations(
  invoice: RecordData
) {
  const clientId =
    value(invoice, "clientId");

  const vehiculeId =
    value(invoice, "vehiculeId");

  const interventionId =
    value(invoice, "interventionId");

  const [
    client,
    vehicule,
    intervention,
  ] =
    await Promise.all([
      clientId
        ? RuntimeDataBinding.detail(
            clientsautoModule,
            clientId
          )
        : Promise.resolve(null),

      vehiculeId
        ? RuntimeDataBinding.detail(
            vehiculesModule,
            vehiculeId
          )
        : Promise.resolve(null),

      interventionId
        ? RuntimeDataBinding.detail(
            interventionsautoModule,
            interventionId
          )
        : Promise.resolve(null),
    ]);

  return {
    client,
    vehicule,
    intervention,
  };
}

function buildShareText(
  invoice: RecordData,
  relations?: {
    client: RecordData | null;
    vehicule: RecordData | null;
    intervention: RecordData | null;
  } | null
): string {
  const numero =
    buildInvoiceNumber(invoice);

  const total =
    amount(invoice, "montantTTC");

  const montantPaye =
    amount(invoice, "montantPaye");

  const reste =
    computeResteAPayer(invoice);

  const statut =
    formatPaymentStatus(
      value(invoice, "statutPaiement", "en_attente")
    );

  const url =
    buildInvoicePublicUrl(invoice);

  const clientLabel =
    buildClientLabel(relations?.client ?? null);

  const vehicleLabel =
    buildVehicleLabel(relations?.vehicule ?? null);

  const interventionLabel =
    buildInterventionLabel(relations?.intervention ?? null);

  return [
    "Bonjour,",
    "",
    "Votre facture " + AMARKHYS_BUSINESS_IDENTITY.displayName + " est disponible.",
    "",
    "Facture : " + numero,
    "Client : " + clientLabel,
    "Véhicule : " + vehicleLabel,
    "Intervention : " + interventionLabel,
    "Montant TTC : " + formatMoney(total),
    "Montant payé : " + formatMoney(montantPaye),
    "Reste à payer : " + formatMoney(reste),
    "Statut paiement : " + statut,
    "",
    url ? "Lien facture : " + url : "",
    "",
    "Merci pour votre confiance. " + buildAmarkhysContactLabel(),
  ]
    .filter(Boolean)
    .join("\\n");
}

async function createInvoicePdf(
  invoice: RecordData
): Promise<jsPDF> {
  const doc =
    new jsPDF();

  const {
    client,
    vehicule,
    intervention,
  } =
    await loadInvoiceRelations(invoice);

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

  const resteAPayer =
    computeResteAPayer(invoice);

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
  doc.text(AMARKHYS_BUSINESS_IDENTITY.displayName.toUpperCase(), 14, 18);

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
  doc.text("Client / véhicule", 14, 50);

  doc.setFontSize(10);
  doc.text("Client : " + buildClientLabel(client), 14, 58);
  doc.text("Véhicule : " + buildVehicleLabel(vehicule), 14, 64);
  doc.text("Intervention : " + buildInterventionLabel(intervention), 14, 70);

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
      [
        "Statut paiement",
        formatPaymentStatus(
          value(invoice, "statutPaiement", "en_attente")
        ),
      ],
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
    value(invoice, "observations", "Merci pour votre confiance. " + buildAmarkhysContactLabel()),
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
    AMARKHYS_BUSINESS_IDENTITY.displayName + " • Facture générée automatiquement",
    14,
    285
  );

  return doc;
}

async function downloadInvoice(
  invoice: RecordData
) {
  const doc =
    await createInvoicePdf(invoice);

  doc.save(
    buildInvoiceNumber(invoice) + ".pdf"
  );
}

async function previewInvoice(
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

export function InvoiceDocumentActions({
  invoice,
}: InvoiceDocumentActionsProps) {
  const [qrDataUrl, setQrDataUrl] =
    useState("");

  const [relations, setRelations] =
    useState<{
      client: RecordData | null;
      vehicule: RecordData | null;
      intervention: RecordData | null;
    } | null>(null);

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

  useEffect(() => {
    let mounted = true;

    async function loadRelations() {
      const loadedRelations =
        await loadInvoiceRelations(invoice);

      if (mounted) {
        setRelations(loadedRelations);
      }
    }

    loadRelations().catch(() => {
      if (mounted) {
        setRelations(null);
      }
    });

    return () => {
      mounted = false;
    };
  }, [invoice]);

  const shareText =
    buildShareText(invoice, relations);

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
