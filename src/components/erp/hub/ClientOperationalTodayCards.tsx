"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RuntimeClientOperationalTodayLoader,
  type ClientOperationalTodayResult,
} from "@/runtime/hub/RuntimeClientOperationalTodayLoader";

export function ClientOperationalTodayCards() {
  const [state, setState] = useState<ClientOperationalTodayResult | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const result = await RuntimeClientOperationalTodayLoader.load();

        if (!active) return;

        setState(result);
      } catch (error) {
        console.error("[ClientOperationalTodayCards] load failed", error);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  if (!state) {
    return (
      <section className="grid gap-5 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200"
          />
        ))}
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Aujourd’hui au garage
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
          Ce qui va se passer aujourd’hui
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {state.cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                {card.icon}
              </span>
              <span className="text-3xl font-extrabold text-slate-950">
                {card.value}
              </span>
            </div>

            <p className="mt-5 text-sm font-extrabold uppercase tracking-wide text-slate-500">
              {card.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {card.description}
            </p>
          </Link>
        ))}
      </div>

      <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Activité opérationnelle
            </p>
            <h3 className="mt-1 text-lg font-extrabold text-slate-950">
              Derniers éléments à traiter
            </h3>
          </div>
        </div>

        {state.items.length > 0 ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {state.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="rounded-[1.5rem] bg-slate-50 p-4 ring-1 ring-slate-100 hover:bg-emerald-50"
              >
                <p className="text-sm font-extrabold text-slate-950">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.type} · {item.subtitle}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm text-slate-500">
            Aucun élément opérationnel urgent détecté pour aujourd’hui.
          </div>
        )}
      </section>
    </section>
  );
}
