"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ERPReturnBreadcrumb() {
  const searchParams =
    useSearchParams();

  const returnTo =
    searchParams.get("returnTo");

  const returnLabel =
    searchParams.get("returnLabel") || "Retour";

  if (!returnTo) {
    return null;
  }

  return (
    <nav className="rounded-3xl border border-blue-100 bg-blue-50 px-5 py-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link
          href={returnTo}
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 font-black text-blue-700 shadow-sm transition hover:bg-blue-100 hover:text-blue-900"
        >
          <span aria-hidden="true">←</span>
          <span>{returnLabel}</span>
        </Link>

        <span className="text-blue-300">/</span>

        <span className="font-semibold text-slate-500">
          Fiche courante
        </span>
      </div>
    </nav>
  );
}
