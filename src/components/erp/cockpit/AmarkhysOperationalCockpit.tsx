"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Car,
  Clock3,
  Plus,
  Search,
  TrendingUp,
  Wrench,
} from "lucide-react";

import {
  RuntimeOperationalCockpitResolver,
} from "@/runtime/cockpit";

import type {
  RuntimeOperationalCockpitData,
} from "@/runtime/cockpit";

function toneClass(tone?: string) {
  switch (tone) {
    case "success":
      return "border-emerald-200 bg-emerald-50 text-emerald-950";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-950";
    case "danger":
      return "border-rose-200 bg-rose-50 text-rose-950";
    case "info":
      return "border-cyan-200 bg-cyan-50 text-cyan-950";
    default:
      return "border-slate-200 bg-white text-slate-950";
  }
}

function statusLabel(status?: string) {
  const value = String(status ?? "").trim();

  const labels: Record<string, string> = {
    planifie: "Planifié",
    confirme: "Confirmé",
    en_cours: "En cours",
    diagnostic: "Diagnostic",
    attente_piece: "Attente pièce",
    en_attente: "En attente",
    termine: "Terminé",
    facture: "Facturé",
    annule: "Annulé",
  };

  return labels[value] ?? (value || "Statut");
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-5 text-sm text-slate-500">
      <p className="font-black text-slate-800">{title}</p>
      <p className="mt-1">{description}</p>
    </div>
  );
}

export function AmarkhysOperationalCockpit() {
  const [data, setData] =
    useState<RuntimeOperationalCockpitData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const nextData =
          await RuntimeOperationalCockpitResolver.resolveAmarkhys();

        if (active) {
          setData(nextData);
        }
      } catch (loadError) {
        console.error("AMARKHYS_COCKPIT_LOAD_ERROR", loadError);

        if (active) {
          setError("Impossible de charger le cockpit atelier.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  const currentTime =
    new Intl.DateTimeFormat("fr-CH", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-black text-slate-500">
            Chargement du cockpit atelier...
          </p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900">
          <p className="font-black">{error || "Cockpit indisponible."}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <section className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
        <header className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-xl shadow-slate-200/70">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-black tracking-tight">
                {data.title}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-400">
                {data.dateLabel} · {currentTime}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-3">
              <Wrench className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-300">
            <Search className="h-4 w-4" />
            <span>Recherche globale</span>
          </div>
        </header>

        <section className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-950">
            {data.greeting}
          </h1>
          <p className="text-sm font-semibold text-slate-500">
            Vue opérationnelle de l’atelier aujourd’hui.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {data.kpis.map((kpi) => (
            <article
              key={kpi.key}
              className={
                "rounded-3xl border p-4 shadow-sm " + toneClass(kpi.tone)
              }
            >
              <p className="text-2xl font-black tracking-tight">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs font-black uppercase tracking-wide opacity-75">
                {kpi.label}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-950">
                  Prochains RDV
                </h2>
                <p className="text-xs font-semibold text-slate-500">
                  Rendez-vous planifiés aujourd’hui
                </p>
              </div>

              <CalendarDays className="h-5 w-5 text-slate-400" />
            </div>

            <div className="space-y-3">
              {data.upcomingAppointments.length === 0 ? (
                <EmptyState
                  title="Aucun RDV à venir"
                  description="Les rendez-vous du jour apparaîtront ici."
                />
              ) : (
                data.upcomingAppointments.map((appointment) => (
                  <Link
                    key={appointment.id}
                    href={"/rendezvous/" + appointment.id + "/edit"}
                    className="block rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:border-cyan-200 hover:bg-cyan-50/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-slate-950 px-3 py-2 text-sm font-black text-white">
                        {appointment.time}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-slate-950">
                          {appointment.vehicleLabel}
                        </p>
                        <p className="mt-0.5 truncate text-sm font-semibold text-slate-600">
                          {appointment.clientLabel}
                        </p>
                        <p className="mt-2 text-xs font-black uppercase tracking-wide text-cyan-700">
                          {appointment.serviceLabel}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-950">
                  Véhicules en cours
                </h2>
                <p className="text-xs font-semibold text-slate-500">
                  Activité atelier active
                </p>
              </div>

              <Car className="h-5 w-5 text-slate-400" />
            </div>

            <div className="space-y-3">
              {data.workshopItems.length === 0 ? (
                <EmptyState
                  title="Aucun véhicule en cours"
                  description="Les interventions actives apparaîtront ici."
                />
              ) : (
                data.workshopItems.map((item) => (
                  <Link
                    key={item.id}
                    href={"/interventionsauto/" + item.id + "/edit"}
                    className="block rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                        <Clock3 className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-slate-950">
                          {item.vehicleLabel}
                        </p>
                        <p className="mt-0.5 truncate text-sm font-semibold text-slate-600">
                          {item.clientLabel}
                        </p>
                        <p className="mt-2 text-xs font-black uppercase tracking-wide text-emerald-700">
                          {statusLabel(item.status)}
                          {item.durationLabel
                            ? " · " + item.durationLabel
                            : ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </article>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <div>
              <h2 className="text-base font-black text-slate-950">
                Pilotage atelier
              </h2>
              <p className="text-sm font-semibold text-slate-500">
                Le cockpit agrège les données runtime : rendez-vous,
                interventions, véhicules et factures.
              </p>
            </div>
          </div>
        </section>
      </section>

      <Link
        href="/rendezvous/nouveau"
        className="fixed bottom-5 right-5 flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-4 text-sm font-black text-white shadow-2xl shadow-emerald-300 transition hover:bg-emerald-600"
      >
        <Plus className="h-5 w-5" />
        Nouveau RDV
      </Link>
    </main>
  );
}