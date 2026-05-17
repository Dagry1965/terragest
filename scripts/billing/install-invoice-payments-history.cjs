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

write(
  "src/components/erp/billing/InvoicePaymentsHistory.tsx",
`"use client";

import { useEffect, useMemo, useState } from "react";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  encaissementsautoModule,
} from "@/runtime/modules/generated/encaissementsauto";

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
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
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
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-5 gap-4 bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-wide text-white">
            <div>Date</div>
            <div>Montant</div>
            <div>Mode</div>
            <div>Référence</div>
            <div>Statut</div>
          </div>

          <div className="divide-y divide-slate-200">
            {items.map((item, index) => (
              <div
                key={item.id ?? index}
                className="grid grid-cols-5 gap-4 px-4 py-4 text-sm text-slate-700"
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
                  <span
                    className={\`
                      rounded-full
                      border
                      px-3
                      py-1
                      text-xs
                      font-black
                      \${statusClassName(item.statut)}
                    \`}
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
`
);

const formPath =
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";

let form = read(formPath);

if (!form.includes("InvoicePaymentsHistory")) {
  form = form.replace(
`import {
recomputeTerrainSurfaceDisponible,
}
from "@/runtime/business/exploitations/recomputeTerrainSurfaceDisponible";`,
`import {
recomputeTerrainSurfaceDisponible,
}
from "@/runtime/business/exploitations/recomputeTerrainSurfaceDisponible";

import {
  InvoicePaymentsHistory,
} from "@/components/erp/billing/InvoicePaymentsHistory";`
  );
}

if (!form.includes("data-invoice-payments-history")) {
  form = form.replace(
`      {mode === "edit" && workflowActions.length > 0 && (`,
`      {isInvoiceEditForm ? (
        <div data-invoice-payments-history>
          <InvoicePaymentsHistory
            factureId={String(initialData.id ?? initialData._id ?? "")}
            montantTTC={Number(initialData.montantTTC ?? 0)}
          />
        </div>
      ) : null}

      {mode === "edit" && workflowActions.length > 0 && (`
  );
}

save(formPath, form);

console.log("");
console.log("Invoice payments history installed.");
console.log("Done.");