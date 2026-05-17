const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "app",
  "facture",
  "[token]",
  "page.tsx"
);

function write(filePath, content) {
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, filePath)}`);
}

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

const content = `"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

interface PublicInvoicePageProps {
  params: Promise<{
    token: string;
  }>;
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

function formatPaymentStatus(
  status: string
): string {
  const labels: Record<string, string> = {
    en_attente: "En attente",
    partiel: "Paiement partiel",
    paye: "Payé",
    payee: "Payée",
    annule: "Annulé",
    annulee: "Annulée",
  };

  return labels[status] ?? status ?? "En attente";
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
    value(invoice, "reference", "Facture")
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

  return [prenom, nom]
    .filter(Boolean)
    .join(" ")
    .trim() || raisonSociale || "Client";
}

function buildClientContact(
  client: RecordData | null
): string {
  if (!client) {
    return "";
  }

  return [
    value(client, "telephone"),
    value(client, "email"),
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

async function findInvoiceByToken(
  token: string
): Promise<RecordData | null> {
  const invoices =
    await RuntimeDataBinding.list(facturesautoModule);

  return (
    invoices.find((invoice) => {
      return (
        value(invoice, "publicToken") === token ||
        value(invoice, "token") === token ||
        value(invoice, "id") === token ||
        value(invoice, "_id") === token
      );
    }) ?? null
  );
}

async function loadRelatedRecord(
  module: any,
  id: string
): Promise<RecordData | null> {
  if (!id) {
    return null;
  }

  try {
    return await RuntimeDataBinding.detail(
      module,
      id
    );
  } catch {
    return null;
  }
}

export default function PublicInvoicePage({
  params,
}: PublicInvoicePageProps) {
  const [token, setToken] =
    useState("");

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

    async function resolveParams() {
      const resolved =
        await params;

      if (mounted) {
        setToken(resolved.token);
      }
    }

    resolveParams();

    return () => {
      mounted = false;
    };
  }, [params]);

  useEffect(() => {
    if (!token) {
      return;
    }

    let mounted = true;

    async function loadInvoice() {
      setLoading(true);

      const loadedInvoice =
        await findInvoiceByToken(token);

      if (!mounted) {
        return;
      }

      setInvoice(loadedInvoice);

      if (!loadedInvoice) {
        setLoading(false);
        return;
      }

      const [
        loadedClient,
        loadedVehicule,
        loadedIntervention,
      ] =
        await Promise.all([
          loadRelatedRecord(
            clientsautoModule,
            value(loadedInvoice, "clientId")
          ),
          loadRelatedRecord(
            vehiculesModule,
            value(loadedInvoice, "vehiculeId")
          ),
          loadRelatedRecord(
            interventionsautoModule,
            value(loadedInvoice, "interventionId")
          ),
        ]);

      if (mounted) {
        setClient(loadedClient);
        setVehicule(loadedVehicule);
        setIntervention(loadedIntervention);
        setLoading(false);
      }
    }

    loadInvoice().catch(() => {
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [token]);

  const summary =
    useMemo(() => {
      if (!invoice) {
        return null;
      }

      const montantTTC =
        amount(invoice, "montantTTC");

      const montantPaye =
        amount(invoice, "montantPaye");

      const resteAPayer =
        computeResteAPayer(invoice);

      const statutPaiement =
        formatPaymentStatus(
          value(invoice, "statutPaiement", "en_attente")
        );

      return {
        numero: buildInvoiceNumber(invoice),
        date: value(invoice, "dateFacture"),
        montantTTC,
        montantPaye,
        resteAPayer,
        statutPaiement,
      };
    }, [invoice]);

  const whatsappText =
    summary
      ? [
          "Bonjour,",
          "",
          "Je consulte ma facture AMARKHYS : " + summary.numero,
          "Reste à payer : " + formatMoney(summary.resteAPayer),
          "Statut : " + summary.statutPaiement,
        ].join("\\n")
      : "";

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-emerald-400/20 bg-white/10 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">
            AMARKHYS GARAGE
          </p>
          <h1 className="mt-4 text-3xl font-black">
            Chargement de la facture...
          </h1>
        </div>
      </main>
    );
  }

  if (!invoice || !summary) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-red-400/20 bg-white/10 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-red-300">
            Facture introuvable
          </p>
          <h1 className="mt-4 text-3xl font-black">
            Cette facture n’est pas disponible.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            Le lien peut être expiré, incorrect ou la facture peut avoir été supprimée.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400"
          >
            Retour au site AMARKHYS
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#065f46,_#020617_42%,_#000000)] px-4 py-6 text-white md:px-8 md:py-10">
      <section className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2.25rem] border border-emerald-300/20 bg-white shadow-2xl">
          <div className="bg-slate-950 px-6 py-8 text-white md:px-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-300">
                  AMARKHYS GARAGE
                </p>
                <h1 className="mt-4 text-3xl font-black md:text-5xl">
                  Facture publique
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                  Consultez le détail de votre facture, le montant payé et le reste à régler.
                </p>
              </div>

              <div className="rounded-3xl border border-amber-300/30 bg-amber-300/10 px-5 py-4 text-left md:text-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
                  Statut paiement
                </p>
                <p className="mt-2 text-2xl font-black text-amber-100">
                  {summary.statutPaiement}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-0 bg-slate-50 text-slate-950 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6 p-6 md:p-10">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
                  Facture
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <InfoItem label="Numéro" value={summary.numero} />
                  <InfoItem label="Date facture" value={summary.date || "-"} />
                  <InfoItem label="Client" value={buildClientLabel(client)} />
                  <InfoItem label="Contact" value={buildClientContact(client) || "-"} />
                  <InfoItem label="Véhicule" value={buildVehicleLabel(vehicule)} />
                  <InfoItem label="Intervention" value={buildInterventionLabel(intervention)} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
                  Paiement
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <MoneyCard label="Montant TTC" value={summary.montantTTC} />
                  <MoneyCard label="Montant payé" value={summary.montantPaye} />
                  <MoneyCard label="Reste à payer" value={summary.resteAPayer} highlight />
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <p className="text-sm font-bold text-emerald-900">
                  Pour toute question sur cette facture, contactez AMARKHYS Garage avec le numéro de facture.
                </p>
              </div>
            </div>

            <aside className="border-t border-slate-200 bg-slate-950 p-6 text-white md:p-10 lg:border-l lg:border-t-0">
              <div className="sticky top-6 space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
                  Actions rapides
                </p>

                <a
                  href={"https://wa.me/?text=" + encodeURIComponent(whatsappText)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-emerald-400"
                >
                  Contacter sur WhatsApp
                </a>

                <a
                  href="tel:+000000000"
                  className="flex w-full items-center justify-center rounded-2xl border border-white/15 px-5 py-4 text-sm font-black text-white transition hover:bg-white/10"
                >
                  Appeler le garage
                </a>

                <Link
                  href="/"
                  className="flex w-full items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-300/10 px-5 py-4 text-sm font-black text-amber-100 transition hover:bg-amber-300/20"
                >
                  Retour au site AMARKHYS
                </Link>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Paiement en ligne
                  </p>
                  <p className="mt-3 text-sm text-slate-300">
                    Module de règlement sécurisé à connecter dans une prochaine étape.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-black text-slate-950">
        {value || "-"}
      </p>
    </div>
  );
}

function MoneyCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "rounded-2xl border border-amber-200 bg-amber-50 p-4"
          : "rounded-2xl border border-slate-100 bg-slate-50 p-4"
      }
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p
        className={
          highlight
            ? "mt-2 text-lg font-black text-amber-700"
            : "mt-2 text-lg font-black text-slate-950"
        }
      >
        {formatMoney(value)}
      </p>
    </div>
  );
}
`;

write(file, content);

console.log("DONE upgrade public invoice page premium");