"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  echeancespaiementautoModule,
} from "@/runtime/modules/generated/echeancespaiementauto";

interface InvoicePaymentScheduleProps {
  factureId: string;
  clientId?: string;
  vehiculeId?: string;
  montantTTC?: number;
  montantPaye?: number;
  resteAPayer?: number;
}

type Echeance = {
  id?: string;
  factureId?: string;
  montantPrevu?: number;
  montantPaye?: number;
  dateEcheance?: string;
  statut?: string;
  canalRelance?: string;
  dernierRappelAt?: string;
};

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

function formatStatus(
  value?: string
): string {
  const labels: Record<string, string> = {
    a_venir: "À venir",
    en_retard: "En retard",
    partiellement_payee: "Partiellement payée",
    payee: "Payée",
    annulee: "Annulée",
  };

  return labels[value ?? ""] ?? "À venir";
}

function statusClassName(
  value?: string
): string {
  if (value === "payee") {
    return "border-emerald-300/30 bg-emerald-500/10 text-emerald-700";
  }

  if (value === "en_retard") {
    return "border-red-300 bg-red-50 text-red-700";
  }

  if (value === "partiellement_payee") {
    return "border-amber-300 bg-amber-50 text-amber-700";
  }

  if (value === "annulee") {
    return "border-slate-300 bg-slate-100 text-slate-600";
  }

  return "border-blue-300 bg-blue-50 text-blue-700";
}

function buildCreateScheduleHref({
  factureId,
  clientId,
  vehiculeId,
  montant,
}: {
  factureId: string;
  clientId?: string;
  vehiculeId?: string;
  montant: number;
}) {
  const params =
    new URLSearchParams();

  params.set(
    "factureId",
    factureId
  );

  if (clientId) {
    params.set(
      "clientId",
      clientId
    );
  }

  if (vehiculeId) {
    params.set(
      "vehiculeId",
      vehiculeId
    );
  }

  if (montant > 0) {
    params.set(
      "montantPrevu",
      String(montant)
    );
  }

  params.set(
    "montantPaye",
    "0"
  );

  params.set(
    "statut",
    "a_venir"
  );

  params.set(
    "canalRelance",
    "whatsapp"
  );

  params.set(
    "dateEcheance",
    new Date()
      .toISOString()
      .split("T")[0]
  );

  params.set(
    "returnTo",
    "/facturesauto/" + factureId + "/edit"
  );

  params.set(
    "lockFields",
    "factureId,clientId,vehiculeId"
  );

  return "/echeancespaiementauto/nouveau?" + params.toString();
}

export function InvoicePaymentSchedule({
  factureId,
  clientId,
  vehiculeId,
  montantTTC = 0,
  montantPaye = 0,
  resteAPayer = 0,
}: InvoicePaymentScheduleProps) {
  const [items, setItems] =
    useState<Echeance[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);

        const rows =
          await RuntimeDataBinding.list(
            echeancespaiementautoModule
          );

        const filtered =
          rows.filter((row: Record<string, unknown>) =>
            String(row.factureId) === String(factureId)
          ) as Echeance[];

        if (mounted) {
          setItems(filtered);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (factureId) {
      load();
    }

    return () => {
      mounted = false;
    };
  }, [factureId]);

  const totalPrevu =
    useMemo(
      () =>
        items
          .filter((item) => item.statut !== "annulee")
          .reduce(
            (total, item) =>
              total + Number(item.montantPrevu ?? 0),
            0
          ),
      [items]
    );

  const totalPaye =
    useMemo(
      () =>
        items
          .filter((item) => item.statut !== "annulee")
          .reduce(
            (total, item) =>
              total + Number(item.montantPaye ?? 0),
            0
          ),
      [items]
    );

  const baseReste =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(
          Number(montantTTC) - Number(montantPaye),
          0
        );

  const resteAPlanifier =
    Math.max(
      baseReste - totalPrevu,
      0
    );

  const createHref =
    buildCreateScheduleHref({
      factureId,
      clientId,
      vehiculeId,
      montant:
        resteAPlanifier > 0
          ? resteAPlanifier
          : baseReste,
    });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
            Échéancier de paiement
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Paiement en plusieurs fois
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Planifie les échéances, suit les paiements attendus et prépare les relances.
          </p>
        </div>

        <Link
          href={createHref}
          className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-emerald-500"
        >
          Créer une échéance
        </Link>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-xs font-bold uppercase text-emerald-700">
            Total prévu
          </p>
          <p className="mt-1 text-lg font-black text-slate-950">
            {formatMoney(totalPrevu)}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
          <p className="text-xs font-bold uppercase text-blue-700">
            Payé sur échéances
          </p>
          <p className="mt-1 text-lg font-black text-slate-950">
            {formatMoney(totalPaye)}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs font-bold uppercase text-amber-700">
            Reste à planifier
          </p>
          <p className="mt-1 text-lg font-black text-slate-950">
            {formatMoney(resteAPlanifier)}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          Chargement des échéances...
        </p>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          Aucun échéancier défini pour cette facture.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-5 gap-4 bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-wide text-white">
            <div>Date</div>
            <div>Montant prévu</div>
            <div>Montant payé</div>
            <div>Relance</div>
            <div>Statut</div>
          </div>

          <div className="divide-y divide-slate-200">
            {items.map((item, index) => (
              <div
                key={item.id ?? index}
                className="grid grid-cols-5 gap-4 px-4 py-4 text-sm text-slate-700"
              >
                <div className="font-semibold">
                  {formatDate(item.dateEcheance)}
                </div>

                <div className="font-black text-slate-950">
                  {formatMoney(Number(item.montantPrevu ?? 0))}
                </div>

                <div>
                  {formatMoney(Number(item.montantPaye ?? 0))}
                </div>

                <div>
                  {item.canalRelance ?? "-"}
                </div>

                <div>
                  <span
                    className={`
                      rounded-full
                      border
                      px-3
                      py-1
                      text-xs
                      font-black
                      ${statusClassName(item.statut)}
                    `}
                  >
                    {formatStatus(item.statut)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
