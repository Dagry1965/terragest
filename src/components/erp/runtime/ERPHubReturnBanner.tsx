"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

function safeReturnTo(value: string | null): string {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();

  if (!trimmed.startsWith("/")) {
    return "";
  }

  if (trimmed.startsWith("//")) {
    return "";
  }

  return trimmed;
}

export function ERPHubReturnBanner() {
  const searchParams = useSearchParams();

  const returnTo = useMemo(
    () => safeReturnTo(searchParams.get("returnTo")),
    [searchParams]
  );

  const clientId = searchParams.get("clientId");
  const vehicleId =
    searchParams.get("selectedVehicleId") ?? searchParams.get("vehiculeId");
  const interventionId = searchParams.get("selectedInterventionId");
  const factureId = searchParams.get("selectedFactureId");

  if (!returnTo) {
    return null;
  }

  return (
    <section
      data-amarkhys-hub-return-banner="true"
      className="mb-5 rounded-[1.75rem] border border-emerald-100 bg-emerald-50/60 px-5 py-4 shadow-sm"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
            Contexte fiche client opérationnelle
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Vous consultez un élément ouvert depuis la fiche client. Le retour conserve le client, le véhicule et le parcours sélectionnés.
          </p>

          <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold text-slate-500">
            {clientId ? <span>Client lié</span> : null}
            {vehicleId ? <span>Véhicule lié</span> : null}
            {interventionId ? <span>Intervention liée</span> : null}
            {factureId ? <span>Facture liée</span> : null}
          </div>
        </div>

        <Link
          href={returnTo}
          className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-emerald-800 shadow-sm ring-1 ring-emerald-100 transition hover:bg-emerald-50"
        >
          ← Retour à la fiche client opérationnelle
        </Link>
      </div>
    </section>
  );
}
