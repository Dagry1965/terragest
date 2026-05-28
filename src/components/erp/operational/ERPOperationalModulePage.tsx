"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase/config";

import type { ERPModule } from "@/runtime/modules/ERPModule";
import { ERPOperationalKpiStrip } from "./ERPOperationalKpiStrip";
import { ERPOperationalFilters } from "./ERPOperationalFilters";
import { ERPOperationalTable } from "./ERPOperationalTable";
import { ERPOperationalRightPanel } from "./ERPOperationalRightPanel";
import { operationalUiTokens } from "./operationalUiTokens";

type ERPOperationalModulePageProps = {
  module: ERPModule;
  data: Record<string, unknown>[];
};


function formatOperationalDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getOperationalUserLabel(
  user: {
    displayName?: string | null;
    email?: string | null;
  } | null
): string {
  if (!user) {
    return "";
  }

  return String(user.displayName ?? user.email ?? "").trim();
}

function normalize(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function recordMatchesSearch(
  record: Record<string, unknown>,
  search: string
): boolean {
  const query = normalize(search);

  if (!query) {
    return true;
  }

  return Object.values(record).some((value) =>
    normalize(value).includes(query)
  );
}

export function ERPOperationalModulePage({
  module,
  data,
}: ERPOperationalModulePageProps) {
  const config = module.operational;
  const { user } = useAuth();
  const [authUserLabel, setAuthUserLabel] = useState("Utilisateur");

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const current = auth.currentUser;
    const currentLabel = getOperationalUserLabel(current);

    if (currentLabel) {
      setAuthUserLabel(currentLabel);
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      const nextLabel = getOperationalUserLabel(nextUser);
      setAuthUserLabel(nextLabel || "Utilisateur");
    });

    return () => unsubscribe();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((record) => {
      const matchesFilters = (config?.filters ?? []).every((filter) => {
        const expected = filters[filter.key];

        if (!expected) {
          return true;
        }

        return String(record[filter.field] ?? "") === expected;
      });

      return matchesFilters && recordMatchesSearch(record, search);
    });
  }, [data, filters, search, config?.filters]);

  const title = config?.title ?? module.metadata.label;
  const branding = config?.branding ?? {};
  const brandName = branding.brandName ?? "ERP";
  const runtimeLabel = branding.runtimeLabel ?? "Runtime ERP";
  const eyebrow = branding.eyebrow ?? `${brandName} · ${runtimeLabel}`;

  const subtitle =
    config?.subtitle ??
    module.metadata.description ??
    `Vue opérationnelle générée par le ${runtimeLabel}.`;

  const todayLabel = formatOperationalDate(new Date());
  const userLabel = getOperationalUserLabel(user) || authUserLabel;

  const activeFiltersCount =
    Object.values(filters).filter(Boolean).length + (search ? 1 : 0);

  return (
    <div className={operationalUiTokens.shell.pageSpacing}>
      <section className={operationalUiTokens.shell.hero}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-400 to-amber-300" />

        <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:p-7">
          <div className="min-w-0">
            <div className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700 shadow-sm">
              {eyebrow}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-100">
                Aujourd’hui · {todayLabel}
              </span>
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-100">
                Connecté : {userLabel}
              </span>
            </div>

            <div className="mt-1 flex flex-col gap-1">
              <h1 className={operationalUiTokens.typography.title}>
                {title}
              </h1>

              <p className={"max-w-3xl " + operationalUiTokens.typography.body}>
                {subtitle}
              </p>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                {filteredData.length} résultat(s)
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                {activeFiltersCount} filtre(s) actif(s)
              </span>

              {module.scheduling?.enabled ? (
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
                  Planning runtime actif
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-start gap-3 lg:justify-end">
            {module.scheduling?.enabled ? (
              <Link
                href={"/" + module.metadata.key + "/planning"}
                className="rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-sm font-black text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-md"
              >
                Planning
              </Link>
            ) : null}

            <Link
              href={"/" + module.metadata.key + "/nouveau"}
              className={operationalUiTokens.controls.primaryButton}
            >
              Nouveau
            </Link>

            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
            >
              Exporter
            </button>
          </div>
        </div>
      </section>

      <ERPOperationalKpiStrip
        kpis={config?.kpis}
        data={filteredData}
      />

      <ERPOperationalFilters
        filters={config?.filters}
        values={filters}
        onChange={setFilters}
        search={search}
        onSearchChange={setSearch}
      />

      <div className={operationalUiTokens.shell.contentGrid}>
        <ERPOperationalTable
          module={module}
          data={filteredData}
        />

        <ERPOperationalRightPanel
          module={module}
          data={filteredData}
        />
      </div>
    </div>
  );
}
