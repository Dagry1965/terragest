const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function write(relativePath, content) {
  const file = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("WRITTEN", relativePath);
}

write(
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts",
`import type { ERPDashboardConfig } from "./ERPDashboardTypes";

export const ERPBusinessAmarkhysDashboardConfig: ERPDashboardConfig = {
  key: "amarkhys-dashboard",
  title: "Cockpit AMARKHYS",
  subtitle:
    "Pilotage garage : leads entrants, clients, véhicules, rendez-vous, interventions, factures, rappels et acquisition.",
  widgets: [
    {
      key: "leads-site-public",
      type: "kpi",
      moduleKey: "clientsauto",
      title: "Leads site public",
      description: "Prospects créés depuis le formulaire public.",
      href: "/clientsauto",
      filters: [
        {
          field: "source",
          operator: "equals",
          value: "site_public",
        },
      ],
    },
    {
      key: "clientsauto-total",
      type: "kpi",
      moduleKey: "clientsauto",
      title: "Clients",
      description: "Base clients et prospects AMARKHYS.",
      href: "/clientsauto",
    },
    {
      key: "vehicules-total",
      type: "kpi",
      moduleKey: "vehicules",
      title: "Véhicules",
      description: "Véhicules suivis dans le garage.",
      href: "/vehicules",
    },
    {
      key: "rdv-planifies",
      type: "kpi",
      moduleKey: "rendezvous",
      title: "RDV planifiés",
      description: "Rendez-vous à traiter ou confirmer.",
      href: "/rendezvous",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "planifie",
        },
      ],
    },
    {
      key: "rdv-confirmes",
      type: "kpi",
      moduleKey: "rendezvous",
      title: "RDV confirmés",
      description: "Rendez-vous confirmés par le garage.",
      href: "/rendezvous",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "confirme",
        },
      ],
    },
    {
      key: "interventions-en-cours",
      type: "kpi",
      moduleKey: "interventionsauto",
      title: "Interventions en cours",
      description: "Travaux actuellement ouverts à l’atelier.",
      href: "/interventionsauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "en_cours",
        },
      ],
    },
    {
      key: "interventions-terminees",
      type: "kpi",
      moduleKey: "interventionsauto",
      title: "Interventions terminées",
      description: "Travaux finalisés.",
      href: "/interventionsauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "termine",
        },
      ],
    },
    {
      key: "factures-total",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Factures",
      description: "Factures atelier générées.",
      href: "/facturesauto",
    },
    {
      key: "factures-en-attente",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Factures en attente",
      description: "Factures non encore payées.",
      href: "/facturesauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "en_attente",
        },
      ],
    },
    {
      key: "factures-payees",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Factures payées",
      description: "Encaissements validés.",
      href: "/facturesauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "payee",
        },
      ],
    },
    {
      key: "rappels-a-traiter",
      type: "kpi",
      moduleKey: "rappelsauto",
      title: "Rappels à traiter",
      description: "Relances client et actions de suivi à exécuter.",
      href: "/rappelsauto",
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "traite",
        },
      ],
    },
    {
      key: "prochains-rdv",
      type: "timeline",
      moduleKey: "rendezvous",
      title: "Prochains rendez-vous",
      description: "Rendez-vous actifs à suivre.",
      labelField: "motif",
      dateField: "dateRendezVous",
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "annule",
        },
      ],
    },
    {
      key: "rappels-prochains",
      type: "timeline",
      moduleKey: "rappelsauto",
      title: "Prochains rappels",
      description: "Actions de relance à venir.",
      labelField: "message",
      dateField: "dateRappel",
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "traite",
        },
      ],
    },
  ],
};
`
);

write(
  "src/components/erp/dashboard/generic/ERPDashboardRenderer.tsx",
`"use client";

import type {
  ERPDashboardConfig,
  ERPDashboardWidgetResult,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

import {
  registerDashboardWidgets,
} from "./registerDashboardWidgets";

import {
  ERPDashboardWidgetRegistry,
} from "./registry/ERPDashboardWidgetRegistry";

interface Props {
  config: ERPDashboardConfig;
  widgets: ERPDashboardWidgetResult[];
}

/**
 * Register widgets synchronously before rendering.
 * Do not use useEffect here, otherwise the first render sees an empty registry.
 */
registerDashboardWidgets();

export function ERPDashboardRenderer({
  config,
  widgets,
}: Props) {
  return (
    <main className="min-h-screen space-y-8 bg-slate-950 p-6 text-slate-50 md:p-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">
            Tableau de bord métier
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
            {config.title}
          </h1>

          {config.subtitle ? (
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400 md:text-base">
              {config.subtitle}
            </p>
          ) : null}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {widgets.map((widget) => {
          const Component =
            ERPDashboardWidgetRegistry.get(widget.type);

          if (!Component) {
            return (
              <div
                key={widget.key}
                className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-sm font-semibold text-red-100"
              >
                Widget inconnu : {widget.type}
              </div>
            );
          }

          return (
            <Component
              key={widget.key}
              widget={widget}
            />
          );
        })}
      </section>
    </main>
  );
}
`
);

write(
  "src/components/erp/dashboard/generic/widgets/ERPKPIWidget.tsx",
`import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

export function ERPKPIWidget({
  widget,
}: ERPDashboardWidgetProps) {
  const content = (
    <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-400/10">
      <p className="text-sm font-bold text-slate-400">
        {widget.title}
      </p>

      <h2 className="mt-4 text-5xl font-black tracking-tight text-white">
        {widget.value ?? 0}
      </h2>

      {widget.description ? (
        <p className="mt-4 text-sm leading-6 text-slate-500">
          {widget.description}
        </p>
      ) : null}
    </div>
  );

  if (widget.href) {
    return (
      <Link href={widget.href}>
        {content}
      </Link>
    );
  }

  return content;
}
`
);

write(
  "src/components/erp/dashboard/generic/widgets/ERPListWidget.tsx",
`import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

function formatDashboardDate(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  if (
    typeof value === "object" &&
    value &&
    "seconds" in value
  ) {
    const seconds =
      Number(
        (value as { seconds: number }).seconds
      );

    const date =
      new Date(seconds * 1000);

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("fr-FR");
    }
  }

  const text =
    String(value);

  const firestoreTimestampMatch =
    text.match(/seconds=(\\d+)/);

  if (firestoreTimestampMatch?.[1]) {
    const date =
      new Date(
        Number(firestoreTimestampMatch[1]) * 1000
      );

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("fr-FR");
    }
  }

  const date =
    new Date(text);

  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleDateString("fr-FR");
  }

  return text;
}

export function ERPListWidget({
  widget,
}: ERPDashboardWidgetProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl">
      <div className="mb-5">
        <h2 className="text-lg font-black text-white">
          {widget.title}
        </h2>

        {widget.description ? (
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {widget.description}
          </p>
        ) : null}
      </div>

      <div className="space-y-3">
        {(widget.items ?? []).length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-slate-400">
            Aucune donnée.
          </p>
        ) : (
          widget.items?.slice(0, 8).map((item) => {
            const formattedDate =
              formatDashboardDate(item.date);

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm transition hover:border-emerald-300/40 hover:bg-emerald-400/10"
              >
                <div className="font-bold text-white">
                  {item.title}
                </div>

                {formattedDate ? (
                  <div className="mt-1 text-xs font-semibold text-slate-500">
                    {formattedDate}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
`
);

console.log("");
console.log("AMARKHYS dashboard pass 1 installed.");