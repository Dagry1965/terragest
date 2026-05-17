const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function write(relativePath, content) {
  const file = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("WRITTEN", relativePath);
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function save(relativePath, content) {
  fs.writeFileSync(path.join(ROOT, relativePath), content, "utf8");
  console.log("UPDATED", relativePath);
}

function fixEncoding(content) {
  return content
    .split("Reste Ã  payer").join("Reste à payer")
    .split("tÃ©lÃ©charge").join("télécharge")
    .split("prÃ©pare").join("prépare")
    .split("gÃ©nÃ©rÃ©e").join("générée")
    .split("gÃ©nÃ©rÃ©").join("généré")
    .split("DÃ©tails").join("Détails")
    .split("DÃ©signation").join("Désignation")
    .split("VÃ©hicule").join("Véhicule")
    .split("payÃ©").join("payé")
    .split("NÂ°").join("N°")
    .split("â€¢").join("•")
    .split("Ã ").join("à")
    .split("Ã©").join("é")
    .split("Ã¨").join("è")
    .split("Ãª").join("ê")
    .split("Ã§").join("ç");
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

type InvoiceRecord = Record<string, unknown>;

function value(
  invoice: InvoiceRecord,
  key: string,
  fallback = "-"
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
  invoice: InvoiceRecord,
  key: string
): number {
  return Number(invoice[key] ?? 0);
}

function formatMoney(
  value: number
): string {
  return value.toLocaleString("fr-FR") + " FCFA";
}

export default function PublicInvoicePage() {
  const params =
    useParams();

  const token =
    String(params?.token ?? "");

  const [invoice, setInvoice] =
    useState<InvoiceRecord | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadInvoice() {
      try {
        setLoading(true);

        const direct =
          await RuntimeDataBinding.detail(
            facturesautoModule,
            token
          );

        if (direct && mounted) {
          setInvoice(direct);
          return;
        }

        const rows =
          await RuntimeDataBinding.list(
            facturesautoModule
          );

        const found =
          rows.find((row: InvoiceRecord) =>
            String(row.publicToken ?? "") === token ||
            String(row.token ?? "") === token ||
            String(row.id ?? "") === token ||
            String(row._id ?? "") === token
          );

        if (mounted) {
          setInvoice(found ?? null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (token) {
      loadInvoice();
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
    amount(invoice, "resteAPayer");

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
              <p>Client ID : {value(invoice, "clientId")}</p>
              <p>Véhicule ID : {value(invoice, "vehiculeId")}</p>
              <p>Intervention ID : {value(invoice, "interventionId")}</p>
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

const actionsPath =
  "src/components/erp/billing/InvoiceDocumentActions.tsx";

let actions =
  fixEncoding(read(actionsPath));

actions = actions.replace(
`import autoTable from "jspdf-autotable";`,
`import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import { useEffect, useState } from "react";`
);

actions = actions.replace(
`function buildInvoicePublicUrl(
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
}`,
`function buildInvoicePublicUrl(
  invoice: Record<string, unknown>
): string {
  const token =
    value(
      invoice,
      "publicToken",
      value(invoice, "token", value(invoice, "id", value(invoice, "_id", "")))
    );

  if (
    typeof window === "undefined" ||
    !token
  ) {
    return "";
  }

  return window.location.origin + "/facture/" + token;
}`
);

actions = actions.replace(
`function createInvoicePdf(
  invoice: Record<string, unknown>
): jsPDF {`,
`async function createInvoicePdf(
  invoice: Record<string, unknown>
): Promise<jsPDF> {`
);

actions = actions.replace(
`  const publicUrl =
    buildInvoicePublicUrl(invoice);`,
`  const publicUrl =
    buildInvoicePublicUrl(invoice);

  const qrDataUrl =
    publicUrl
      ? await QRCode.toDataURL(publicUrl, {
          margin: 1,
          width: 120,
        })
      : "";`
);

actions = actions.replace(
`  if (publicUrl) {
    doc.text("Lien facture / paiement : " + publicUrl, 14, summaryY + 34);
  }`,
`  if (publicUrl) {
    doc.text("Lien facture / paiement : " + publicUrl, 14, summaryY + 34);

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
      doc.text("Scanner pour consulter", 145, summaryY + 48);
    }
  }`
);

actions = actions.replace(
`function downloadInvoice(
  invoice: Record<string, unknown>
) {
  const doc =
    createInvoicePdf(invoice);

  doc.save(
    buildInvoiceNumber(invoice) + ".pdf"
  );
}`,
`async function downloadInvoice(
  invoice: Record<string, unknown>
) {
  const doc =
    await createInvoicePdf(invoice);

  doc.save(
    buildInvoiceNumber(invoice) + ".pdf"
  );
}`
);

actions = actions.replace(
`function previewInvoice(
  invoice: Record<string, unknown>
) {
  const doc =
    createInvoicePdf(invoice);

  const blob =
    doc.output("blob");`,
`async function previewInvoice(
  invoice: Record<string, unknown>
) {
  const doc =
    await createInvoicePdf(invoice);

  const blob =
    doc.output("blob");`
);

actions = actions.replace(
`export function InvoiceDocumentActions({
  invoice,
}: InvoiceDocumentActionsProps) {
  const shareText =
    buildShareText(invoice);`,
`export function InvoiceDocumentActions({
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
    buildShareText(invoice);`
);

actions = actions.replace(
`        <div className="flex flex-wrap gap-3">`,
`        <div className="flex flex-wrap items-center gap-3">
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
          ) : null}`
);

actions = actions.replace(
`onClick={() => previewInvoice(invoice)}`,
`onClick={() => void previewInvoice(invoice)}`
);

actions = actions.replace(
`onClick={() => downloadInvoice(invoice)}`,
`onClick={() => void downloadInvoice(invoice)}`
);

save(actionsPath, actions);

console.log("");
console.log("Invoice public QR installed.");
console.log("Done.");