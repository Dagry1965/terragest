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

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "billing",
  "InvoicePaymentsHistory.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

const content = `"use client";

import { useEffect, useMemo, useState } from "react";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  encaissementsautoModule,
} from "@/runtime/modules/generated/encaissementsauto";

import {
  PaymentReceiptActions,
} from "./PaymentReceiptActions";

interface InvoicePaymentsHistoryProps {
  factureId: string;
  montantTTC?: number;
}

type Encaissement = {
  id?: string;
  factureId?: string;
  montant?: number;
  datePaiement?: string;
  modePaiement?: string;
  referenceTransaction?: string;
  statut?: string;
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

function formatMode(
  value?: string
): string {
  if (!value) {
    return "-";
  }

  const labels: Record<string, string> = {
    especes: "Espèces",
    mobile_money: "Mobile Money",
    carte: "Carte",
    virement: "Virement",
    cheque: "Chèque",
    autre: "Autre",
  };

  return labels[value] ?? value;
}

function statusClassName(
  statut?: string
): string {
  if (statut === "valide") {
    return "border-emerald-300/30 bg-emerald-500/10 text-emerald-700";
  }

  if (statut === "rejete") {
    return "border-red-300 bg-red-50 text-red-700";
  }

  if (statut === "annule") {
    return "border-slate-300 bg-slate-100 text-slate-600";
  }

  return "border-amber-300 bg-amber-50 text-amber-700";
}

function formatStatus(
  statut?: string
): string {
  if (statut === "valide") {
    return "Validé";
  }

  if (statut === "rejete") {
    return "Rejeté";
  }

  if (statut === "annule") {
    return "Annulé";
  }

  return "En attente";
}

function PaymentStatusBadge({
  statut,
}: {
  statut?: string;
}) {
  return (
    <span
      className={\`
        inline-flex
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-black
        \${statusClassName(statut)}
      \`}
    >
      {formatStatus(statut)}
    </span>
  );
}

function MobilePaymentCard({
  item,
  factureId,
}: {
  item: Encaissement;
  factureId: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Paiement
          </p>

          <p className="mt-1 text-xl font-black text-slate-950">
            {formatMoney(Number(item.montant ?? 0))}
          </p>
        </div>

        <PaymentStatusBadge statut={item.statut} />
      </div>

      <div className="mt-4 grid gap-3 text-sm">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Date
          </p>
          <p className="mt-1 font-bold text-slate-800">
            {formatDate(item.datePaiement)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Mode
          </p>
          <p className="mt-1 font-bold text-slate-800">
            {formatMode(item.modePaiement)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Référence
          </p>
          <p className="mt-1 break-words font-bold text-slate-800">
            {item.referenceTransaction || "-"}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <PaymentReceiptActions
          payment={item as Record<string, unknown>}
          factureId={factureId}
        />
      </div>
    </article>
  );
}

export function InvoicePaymentsHistory({
  factureId,
  montantTTC = 0,
}: InvoicePaymentsHistoryProps) {
  const [items, setItems] =
    useState<Encaissement[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);

        const rows =
          await RuntimeDataBinding.list(
            encaissementsautoModule
          );

        const filtered =
          rows.filter((row: Record<string, unknown>) =>
            String(row.factureId) === String(factureId)
          ) as Encaissement[];

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

  const totalValide =
    useMemo(
      () =>
        items
          .filter((item) => item.statut === "valide")
          .reduce(
            (total, item) =>
              total + Number(item.montant ?? 0),
            0
          ),
      [items]
    );

  const resteAPayer =
    Math.max(
      Number(montantTTC ?? 0) - totalValide,
      0
    );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
            Historique des encaissements
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Paiements enregistrés
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Liste des paiements liés à cette facture.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-xs font-bold uppercase text-emerald-700">
              Total encaissé
            </p>
            <p className="mt-1 text-lg font-black text-slate-950">
              {formatMoney(totalValide)}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs font-bold uppercase text-amber-700">
              Reste à payer
            </p>
            <p className="mt-1 text-lg font-black text-slate-950">
              {formatMoney(resteAPayer)}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          Chargement des encaissements...
        </p>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          Aucun paiement enregistré pour cette facture.
        </p>
      ) : (
        <>
          <div className="grid gap-4 lg:hidden">
            {items.map((item, index) => (
              <MobilePaymentCard
                key={item.id ?? index}
                item={item}
                factureId={factureId}
              />
            ))}
          </div>

          <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 lg:block">
            <div className="min-w-[980px]">
              <div className="grid grid-cols-[1fr_1fr_1fr_1.4fr_1fr_1.8fr] gap-4 bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-wide text-white">
                <div>Date</div>
                <div>Montant</div>
                <div>Mode</div>
                <div>Référence</div>
                <div>Statut</div>
                <div>Reçu</div>
              </div>

              <div className="divide-y divide-slate-200">
                {items.map((item, index) => (
                  <div
                    key={item.id ?? index}
                    className="grid grid-cols-[1fr_1fr_1fr_1.4fr_1fr_1.8fr] gap-4 px-4 py-4 text-sm text-slate-700"
                  >
                    <div className="font-semibold">
                      {formatDate(item.datePaiement)}
                    </div>

                    <div className="font-black text-slate-950">
                      {formatMoney(Number(item.montant ?? 0))}
                    </div>

                    <div>
                      {formatMode(item.modePaiement)}
                    </div>

                    <div className="truncate">
                      {item.referenceTransaction || "-"}
                    </div>

                    <div>
                      <PaymentStatusBadge statut={item.statut} />
                    </div>

                    <div>
                      <PaymentReceiptActions
                        payment={item as Record<string, unknown>}
                        factureId={factureId}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
`;

write(file, content);

console.log("DONE upgrade invoice payments history mobile");