"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import {
  buildRuntimeReturnLabel,
  readRuntimeReturnContext,
} from "@/runtime/navigation/RuntimeReturnContextBuilder";

function formatSourceModuleLabel(value: string | null): string {
  const source = String(value ?? "").trim();

  const labels: Record<string, string> = {
    vehicules: "Véhicules",
    clientsauto: "Clients",
    rendezvous: "Rendez-vous",
    interventionsauto: "Interventions",
    lignesinterventionauto: "Lignes intervention",
    facturesauto: "Factures",
    encaissementsauto: "Encaissements",
    rappelsauto: "Rappels",
    produitsauto: "Produits",
    stocksauto: "Stocks",
    mouvementsstockauto: "Mouvements stock",
    commandesstockauto: "Commandes stock",
    receptionsstockauto: "Réceptions stock",
  };

  return labels[source] ?? source;
}

export function ERPHubReturnBanner() {
  const searchParams = useSearchParams();

  const returnContext = useMemo(
    () => readRuntimeReturnContext(searchParams),
    [searchParams]
  );

  const returnLabel = useMemo(
    () =>
      buildRuntimeReturnLabel(
        returnContext.returnLabel,
        returnContext.sourceModule
          ? formatSourceModuleLabel(returnContext.sourceModule)
          : null,
        returnContext.sourceModule
      ),
    [returnContext.returnLabel, returnContext.sourceModule]
  );

  if (!returnContext.returnTo) {
    return null;
  }

  const hasBusinessContext =
    Boolean(returnContext.sourceModule) ||
    Boolean(returnContext.sourceRecordId) ||
    Boolean(searchParams.get("clientId")) ||
    Boolean(searchParams.get("selectedVehicleId") ?? searchParams.get("vehiculeId")) ||
    Boolean(searchParams.get("selectedInterventionId")) ||
    Boolean(searchParams.get("selectedFactureId"));

  return (
    <section
      data-erp-return-banner="true"
      className="mb-5 rounded-[1.75rem] border border-emerald-100 bg-emerald-50/60 px-5 py-4 shadow-sm"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
            Contexte de navigation
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Vous consultez un élément ouvert depuis une autre vue. Le retour conserve la source de navigation.
          </p>

          {hasBusinessContext ? (
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold text-slate-500">
              {returnContext.sourceModule ? (
                <span>Source : {formatSourceModuleLabel(returnContext.sourceModule)}</span>
              ) : null}
              {returnContext.sourceRecordId ? <span>Élément source</span> : null}
              {searchParams.get("clientId") ? <span>Client lié</span> : null}
              {searchParams.get("selectedVehicleId") ?? searchParams.get("vehiculeId") ? (
                <span>Véhicule lié</span>
              ) : null}
              {searchParams.get("selectedInterventionId") ? <span>Intervention liée</span> : null}
              {searchParams.get("selectedFactureId") ? <span>Facture liée</span> : null}
            </div>
          ) : null}
        </div>

        <Link
          href={returnContext.returnTo}
          className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-emerald-800 shadow-sm ring-1 ring-emerald-100 transition hover:bg-emerald-50"
        >
          ← {returnLabel}
        </Link>
      </div>
    </section>
  );
}