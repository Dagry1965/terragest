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
    <nav className="rounded-3xl border border-[#D5E4E8] bg-[#F8FAFC] px-5 py-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link
          href={returnTo}
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 font-black text-[#1F2937] shadow-sm transition hover:bg-[#F1F5F9] hover:text-[#111827]"
        >
          <span aria-hidden="true">←</span>
          <span>{returnLabel}</span>
        </Link>

        <span className="text-[#94A3B8]">/</span>

        <span className="font-semibold text-slate-500">
          Fiche courante
        </span>
      </div>
    </nav>
  );
}
