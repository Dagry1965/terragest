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
    <nav className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link
          href={returnTo}
          className="font-black text-blue-700 transition hover:text-blue-900"
        >
          ← {returnLabel}
        </Link>

        <span className="text-slate-300">/</span>

        <span className="font-semibold text-slate-500">
          Fiche courante
        </span>
      </div>
    </nav>
  );
}
