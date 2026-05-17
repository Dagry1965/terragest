"use client";

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
                {formatPaymentStatus(value(invoice, "statutPaiement", "en_attente"))}
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
