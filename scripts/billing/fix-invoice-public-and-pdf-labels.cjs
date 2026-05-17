const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function write(relativePath, content) {
  const file = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("UPDATED", relativePath);
}

write(
  "src/app/facture/[token]/page.tsx",
`"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
  interventionsautoModule,
} from "@/runtime/modules/generated/interventionsauto";

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

  const label =
    [
      [marque, modele]
        .filter(Boolean)
        .join(" ")
        .trim(),
      immatriculation,
    ]
      .filter(Boolean)
      .join(" • ");

  return label || "Véhicule";
}

function buildInterventionLabel(
  intervention: RecordData | null
): string {
  if (!intervention) {
    return "Intervention non renseignée";
  }

  const type =
    value(intervention, "typeIntervention");

  const date =
    value(intervention, "dateIntervention");

  const statut =
    value(intervention, "statut");

  const label =
    [type, date, statut]
      .filter(Boolean)
      .join(" • ");

  return label || "Intervention";
}

export default function PublicInvoicePage() {
  const params =
    useParams();

  const token =
    String(params?.token ?? "");

  const [invoice, setInvoice] =
    useState<RecordData | null>(null);

  const [client, setClient] =
    useState<RecordData | null>(null);

  const [vehicule, setVehicule] =
    useState<RecordData | null>(null);

  const [intervention, setIntervention] =
    useState<RecordData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);

        let foundInvoice =
          await RuntimeDataBinding.detail(
            facturesautoModule,
            token
          );

        if (!foundInvoice) {
          const rows =
            await RuntimeDataBinding.list(
              facturesautoModule
            );

          foundInvoice =
            rows.find((row: RecordData) =>
              String(row.publicToken ?? "") === token ||
              String(row.token ?? "") === token ||
              String(row.id ?? "") === token ||
              String(row._id ?? "") === token
            ) ?? null;
        }

        if (!foundInvoice) {
          if (mounted) {
            setInvoice(null);
          }

          return;
        }

        const clientId =
          value(foundInvoice, "clientId");

        const vehiculeId =
          value(foundInvoice, "vehiculeId");

        const interventionId =
          value(foundInvoice, "interventionId");

        const [
          clientRecord,
          vehiculeRecord,
          interventionRecord,
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

        if (mounted) {
          setInvoice(foundInvoice);
          setClient(clientRecord);
          setVehicule(vehiculeRecord);
          setIntervention(interventionRecord);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (token) {
      load();
    }

    return () => {
      mounted = false;
    };
  }, [token]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          Chargement de la facture...
        </div>
      </main>
    );
  }

  if (!invoice) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl rounded-3xl border border-red-400/30 bg-red-500/10 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-red-300">
            Facture introuvable
          </p>

          <h1 className="mt-3 text-3xl font-black">
            Impossible d’afficher cette facture.
          </h1>
        </div>
      </main>
    );
  }

  const montantTTC =
    amount(invoice, "montantTTC");

  const montantPaye =
    amount(invoice, "montantPaye");

  const resteAPayer =
    computeResteAPayer(invoice);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl">
        <div className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-8">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-300">
            AMARKHYS GARAGE
          </p>

          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight">
                Facture client
              </h1>

              <p className="mt-3 text-slate-300">
                Facture N° {value(invoice, "numeroFacture", value(invoice, "id"))}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 px-5 py-4">
              <p className="text-xs font-bold uppercase text-emerald-300">
                Statut paiement
              </p>

              <p className="mt-1 text-xl font-black">
                {value(invoice, "statutPaiement", "en_attente")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-8 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs font-bold uppercase text-slate-500">
              Montant TTC
            </p>

            <p className="mt-2 text-2xl font-black">
              {formatMoney(montantTTC)}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs font-bold uppercase text-slate-500">
              Déjà payé
            </p>

            <p className="mt-2 text-2xl font-black">
              {formatMoney(montantPaye)}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-300/30 bg-emerald-500/10 p-5">
            <p className="text-xs font-bold uppercase text-emerald-300">
              Reste à payer
            </p>

            <p className="mt-2 text-2xl font-black text-emerald-100">
              {formatMoney(resteAPayer)}
            </p>
          </div>
        </div>

        <div className="grid gap-6 border-t border-white/10 p-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-slate-400">
              Client / véhicule
            </p>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>Client : {buildClientLabel(client)}</p>
              <p>Véhicule : {buildVehicleLabel(vehicule)}</p>
              <p>Intervention : {buildInterventionLabel(intervention)}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-wide text-slate-400">
              Détails facture
            </p>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>Date facture : {value(invoice, "dateFacture")}</p>
              <p>Montant HT : {formatMoney(amount(invoice, "montantHT"))}</p>
              <p>TVA : {value(invoice, "tva", "18")} %</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-8">
          <p className="text-sm text-slate-400">
            Merci pour votre confiance. Pour toute question, contactez AMARKHYS.
          </p>
        </div>
      </section>
    </main>
  );
}
`
);

write(
  "src/components/erp/billing/InvoiceDocumentActions.tsx",
`"use client";

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
  invoice: RecordData
): string {
  const numero =
    buildInvoiceNumber(invoice);

  const total =
    amount(invoice, "montantTTC");

  const reste =
    computeResteAPayer(invoice);

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
`
);

console.log("");
console.log("Public invoice and PDF labels fixed.");
console.log("Done.");