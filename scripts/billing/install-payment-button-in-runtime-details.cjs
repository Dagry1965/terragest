const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/components/erp/runtime/ERPRuntimeDetails.tsx"
);

const content = `"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ERPCard } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";

import type {
  WorkflowHistoryEntry,
}
from "@/runtime/workflow-persistence/WorkflowHistoryEntry";

import {
  WorkflowHistoryRepository,
}
from "@/runtime/workflow-persistence/WorkflowHistoryRepository";

interface ERPRuntimeDetailsProps {
  module: ERPModule;
  data?: Record<string, unknown>;
}

function buildInvoicePaymentHref(
  data: Record<string, unknown>
): string {
  const factureId =
    String(
      data.id ??
      data._id ??
      ""
    );

  const montantTTC =
    Number(data.montantTTC ?? 0);

  const montantPaye =
    Number(data.montantPaye ?? 0);

  const resteAPayer =
    Number(data.resteAPayer ?? 0);

  const montant =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(
          montantTTC - montantPaye,
          0
        );

  const params =
    new URLSearchParams();

  params.set(
    "factureId",
    factureId
  );

  if (data.clientId) {
    params.set(
      "clientId",
      String(data.clientId)
    );
  }

  if (data.vehiculeId) {
    params.set(
      "vehiculeId",
      String(data.vehiculeId)
    );
  }

  if (montant > 0) {
    params.set(
      "montant",
      String(montant)
    );
  }

  params.set(
    "datePaiement",
    new Date()
      .toISOString()
      .split("T")[0]
  );

  params.set(
    "statut",
    "valide"
  );

  params.set(
    "returnTo",
    "/facturesauto/" + factureId
  );

  params.set(
    "lockFields",
    "factureId,clientId,vehiculeId"
  );

  return "/encaissementsauto/nouveau?" + params.toString();
}

function getInvoiceAmountSummary(
  data: Record<string, unknown>
) {
  const montantTTC =
    Number(data.montantTTC ?? 0);

  const montantPaye =
    Number(data.montantPaye ?? 0);

  const resteAPayer =
    Number(data.resteAPayer ?? 0);

  const computedReste =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(
          montantTTC - montantPaye,
          0
        );

  return {
    montantTTC,
    montantPaye,
    resteAPayer: computedReste,
  };
}

export function ERPRuntimeDetails({
  module,
  data = {},
}: ERPRuntimeDetailsProps) {
  const details = ERPModuleBuilder.buildDetails(module);

  const [timeline, setTimeline] =
    useState<WorkflowHistoryEntry[]>([]);

  const [loadingTimeline, setLoadingTimeline] =
    useState(false);

  const entityId =
    String(
      (data as any)?.id ??
      (data as any)?.uid ??
      (data as any)?.key ??
      ""
    );

  const isInvoice =
    module.metadata.key === "facturesauto" &&
    Boolean(
      data.id ??
      data._id
    );

  const paymentHref =
    isInvoice
      ? buildInvoicePaymentHref(data)
      : "#";

  const amountSummary =
    getInvoiceAmountSummary(data);

  useEffect(() => {
    let mounted = true;

    async function loadTimeline() {
      if (!entityId) {
        setTimeline([]);
        return;
      }

      setLoadingTimeline(true);

      try {
        const history =
          await WorkflowHistoryRepository.findByEntity(
            module.metadata.key,
            entityId
          );

        if (mounted) {
          setTimeline(history);
        }
      } finally {
        if (mounted) {
          setLoadingTimeline(false);
        }
      }
    }

    loadTimeline();

    return () => {
      mounted = false;
    };
  }, [module.metadata.key, entityId]);

  return (
    <div className="space-y-6">
      {isInvoice ? (
        <section className="rounded-3xl border border-emerald-300/30 bg-emerald-500/10 p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                Encaissement facture
              </p>

              <h2 className="mt-2 text-2xl font-black text-white">
                Enregistrer un paiement
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                Crée un encaissement lié à cette facture. Le montant payé, le reste à payer et le statut de paiement seront recalculés automatiquement.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Total TTC
                  </p>
                  <p className="mt-1 text-xl font-black text-white">
                    {amountSummary.montantTTC.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Déjà payé
                  </p>
                  <p className="mt-1 text-xl font-black text-white">
                    {amountSummary.montantPaye.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Reste à payer
                  </p>
                  <p className="mt-1 text-xl font-black text-emerald-200">
                    {amountSummary.resteAPayer.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={paymentHref}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-black text-slate-950 shadow-sm transition hover:bg-emerald-300"
            >
              Enregistrer un paiement
            </Link>
          </div>
        </section>
      ) : null}

      <ERPCard
        title={\`Détails \${module.metadata.label}\`}
        description="Vue détail générée automatiquement par le Runtime ERP."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {details.fields.map((field) => (
            <div
              key={field.key}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {field.label}
              </p>

              <div className="mt-2 text-sm text-slate-100">
                <ERPRuntimeFieldValue
                  field={field}
                  value={data[field.key]}
                />
              </div>
            </div>
          ))}
        </div>
      </ERPCard>

      <ERPCard
        title="Timeline workflow"
        description="Historique persistant des transitions workflow."
      >
        {loadingTimeline ? (
          <p className="text-sm text-slate-500">
            Chargement de la timeline...
          </p>
        ) : timeline.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucune transition workflow enregistrée pour cet élément.
          </p>
        ) : (
          <div className="space-y-3">
            {timeline.map((item, index) => (
              <div
                key={\`\${item.entityId}-\${item.action}-\${index}\`}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-slate-100">
                    {item.fromState} → {item.toState}
                  </p>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {item.action}
                  </span>
                </div>

                {item.comment && (
                  <p className="mt-2 text-sm text-slate-400">
                    {item.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </ERPCard>
    </div>
  );
}
`;

fs.writeFileSync(target, content, "utf8");

console.log("OK bouton paiement installé dans ERPRuntimeDetails.");