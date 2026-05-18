const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(filePath) {
  return path.join(root, filePath);
}

function writeFile(filePath, content) {
  const absolutePath = file(filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, "utf8");
  console.log("WRITTEN", filePath);
}

/**
 * PASS 2N-Q8G2
 * Connecter le cockpit premium AMARKHYS aux données runtime existantes.
 *
 * Principe :
 * - utiliser ERPBusinessAmarkhysDashboardConfig
 * - utiliser ERPDashboardWidgetEngine.resolveDashboard()
 * - garder le rendu dark premium dédié
 */

writeFile(
  "src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx",
`import Link from "next/link";

import { ERPBusinessAmarkhysDashboardConfig } from "@/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig";
import { ERPDashboardWidgetEngine } from "@/runtime/dashboard/generic/ERPDashboardWidgetEngine";
import type {
  ERPDashboardWidgetResult,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

type KpiView = {
  label: string;
  value: string;
  href: string;
  icon: string;
  subtitle: string;
};

type AppointmentView = {
  title: string;
  time: string;
  meta: string;
  href?: string;
};

type NotificationView = {
  title: string;
  description: string;
  tone: "warning" | "alert" | "info";
  href?: string;
};

const quickActions = [
  { label: "Nouveau RDV", href: "/rendezvous/nouveau" },
  { label: "Clients", href: "/clientsauto" },
  { label: "Interventions", href: "/interventionsauto" },
  { label: "Factures", href: "/facturesauto" },
];

const serviceBars = [
  { label: "Vidange", primary: 42, secondary: 62 },
  { label: "Moteur", primary: 28, secondary: 18 },
  { label: "Pneus", primary: 74, secondary: 36 },
  { label: "Diag.", primary: 82, secondary: 48 },
  { label: "Freins", primary: 35, secondary: 30 },
  { label: "Entretien", primary: 95, secondary: 22 },
  { label: "Clim.", primary: 52, secondary: 26 },
];

function formatValue(value?: number, suffix?: string): string {
  const amount = Number(value ?? 0);

  if (suffix) {
    return amount.toLocaleString("fr-FR") + " " + suffix;
  }

  return amount.toLocaleString("fr-FR");
}

function findWidget(
  widgets: ERPDashboardWidgetResult[],
  keys: string[]
): ERPDashboardWidgetResult | undefined {
  return widgets.find((widget) => keys.includes(widget.key));
}

function buildKpis(widgets: ERPDashboardWidgetResult[]): KpiView[] {
  const ca =
    findWidget(widgets, ["ca-encaisse", "ca-total-ttc", "recouvrement-reste-a-encaisser"]);

  const vehicules =
    findWidget(widgets, ["vehicules-actifs", "vehicules-total"]);

  const panier =
    findWidget(widgets, ["ca-total-ttc", "ca-encaisse"]);

  const stock =
    findWidget(widgets, ["stocks-total", "stock-petronas", "stocks-bas"]);

  const factures =
    findWidget(widgets, ["factures-payees", "factures-en-attente"]);

  const panierValue =
    panier?.value && factures?.value && factures.value > 0
      ? Math.round(panier.value / factures.value)
      : 0;

  return [
    {
      label: "CA encaissé",
      value: formatValue(ca?.value, ca?.valueSuffix),
      href: ca?.href ?? "/facturesauto",
      icon: "₣",
      subtitle: ca?.description ?? "Facturation atelier",
    },
    {
      label: "Véhicules actifs",
      value: formatValue(vehicules?.value),
      href: vehicules?.href ?? "/vehicules",
      icon: "▰",
      subtitle: vehicules?.description ?? "Parc suivi",
    },
    {
      label: "Panier moyen",
      value: formatValue(panierValue, "FCFA"),
      href: "/facturesauto",
      icon: "◇",
      subtitle: "Moyenne des factures suivies",
    },
    {
      label: "Alertes atelier",
      value: formatValue(
        (findWidget(widgets, ["alertes-rdv-non-confirmes"])?.items?.length ?? 0) +
          (findWidget(widgets, ["alertes-factures-impayees"])?.items?.length ?? 0)
      ),
      href: "/rendezvous",
      icon: "◈",
      subtitle: "RDV, factures et rappels à traiter",
    },
  ];
}

function normalizeTime(date?: string): string {
  if (!date) {
    return "—";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return String(date);
  }

  return parsed.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildAppointments(widgets: ERPDashboardWidgetResult[]): AppointmentView[] {
  const planning =
    findWidget(widgets, ["liste-rdv-du-jour", "derniers-rdv-publics"]);

  const items = planning?.items ?? [];

  if (items.length === 0) {
    return [
      {
        title: "Aucun rendez-vous immédiat",
        time: "—",
        meta: "Le planning atelier est calme pour le moment.",
      },
    ];
  }

  return items.slice(0, 3).map((item) => ({
    title: item.title,
    time: normalizeTime(item.date),
    meta: item.description ?? "Rendez-vous atelier",
    href: item.href,
  }));
}

function buildNotifications(widgets: ERPDashboardWidgetResult[]): NotificationView[] {
  const rdv =
    findWidget(widgets, ["alertes-rdv-non-confirmes"]);

  const factures =
    findWidget(widgets, ["alertes-factures-impayees"]);

  const rappels =
    findWidget(widgets, ["prochains-rappels"]);

  const notifications: NotificationView[] = [];

  if ((rdv?.items?.length ?? 0) > 0) {
    notifications.push({
      title: "RDV à confirmer",
      description: String(rdv?.items?.[0]?.description ?? rdv?.description ?? "Rendez-vous en attente de confirmation."),
      tone: "warning",
      href: rdv?.href,
    });
  }

  if ((factures?.items?.length ?? 0) > 0) {
    notifications.push({
      title: "Factures impayées",
      description: String(factures?.items?.[0]?.description ?? factures?.description ?? "Factures en attente de règlement."),
      tone: "alert",
      href: factures?.href,
    });
  }

  if ((rappels?.items?.length ?? 0) > 0) {
    notifications.push({
      title: "Rappels à traiter",
      description: String(rappels?.items?.[0]?.description ?? rappels?.description ?? "Actions de relance à venir."),
      tone: "info",
      href: rappels?.href,
    });
  }

  if (notifications.length === 0) {
    notifications.push({
      title: "Aucune alerte critique",
      description: "Le cockpit ne détecte pas d’urgence immédiate.",
      tone: "info",
    });
  }

  return notifications.slice(0, 3);
}

function TrendMark() {
  return (
    <div className="absolute bottom-6 right-6 h-20 w-24 opacity-90">
      <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden="true">
        <path
          d="M10 62 L38 34 L62 54 L105 12"
          fill="none"
          stroke="#27F3D5"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M86 12 H105 V31"
          fill="none"
          stroke="#27F3D5"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function RevenueChart() {
  return (
    <div className="mt-6 h-72 rounded-[1.6rem] border border-white/10 bg-black/25 p-5">
      <svg viewBox="0 0 560 260" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#27F3D5" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#0EAFAA" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {[40, 90, 140, 190, 240].map((y) => (
          <line
            key={y}
            x1="35"
            x2="535"
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.12)"
            strokeDasharray="8 8"
          />
        ))}

        <path
          d="M38 212 C95 164 132 152 174 164 C230 180 258 210 300 135 C334 74 392 64 520 40 L520 240 L38 240 Z"
          fill="url(#revenueFill)"
        />

        <path
          d="M38 212 C95 164 132 152 174 164 C230 180 258 210 300 135 C334 74 392 64 520 40"
          fill="none"
          stroke="#27F3D5"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <circle cx="390" cy="68" r="8" fill="white" />
      </svg>
    </div>
  );
}

function ServicesBars() {
  return (
    <div className="mt-6 flex h-72 items-end gap-4 rounded-[1.6rem] border border-white/10 bg-black/25 px-5 pb-7 pt-5">
      {serviceBars.map((bar) => (
        <div key={bar.label} className="flex h-full flex-1 flex-col justify-end gap-3">
          <div className="flex items-end gap-2">
            <div
              className="w-full rounded-t-xl bg-[#0EAFAA]/85 shadow-[0_0_24px_rgba(14,175,170,0.24)]"
              style={{ height: \`\${bar.primary}%\` }}
            />
            <div
              className="w-full rounded-t-xl bg-[#9CFCEF]/90 shadow-[0_0_24px_rgba(156,252,239,0.18)]"
              style={{ height: \`\${bar.secondary}%\` }}
            />
          </div>

          <p className="-rotate-45 whitespace-nowrap text-[11px] font-semibold text-slate-300">
            {bar.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function KpiCard({
  label,
  value,
  href,
  icon,
  subtitle,
}: KpiView) {
  return (
    <Link
      href={href}
      className="group relative min-h-[180px] overflow-hidden rounded-[1.65rem] border border-[#36f4db]/20 bg-[radial-gradient(circle_at_80%_20%,rgba(39,243,213,0.16),transparent_34%),linear-gradient(135deg,rgba(8,95,84,0.95),rgba(5,57,52,0.98))] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-[#36f4db]/45 hover:shadow-[0_30px_90px_rgba(14,175,170,0.20)]"
    >
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7FFFE8]/25 bg-black/20 text-2xl font-black text-[#7FFFE8]">
          {icon}
        </div>

        <div>
          <p className="text-lg font-black tracking-tight text-white sm:text-xl">
            {label}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-300">
            {subtitle}
          </p>
        </div>
      </div>

      <p className="relative z-10 mt-9 text-4xl font-black tracking-tight text-white">
        {value}
      </p>

      <TrendMark />

      <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#27F3D5]/10 blur-2xl" />
    </Link>
  );
}

function WidgetShell({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.65rem] border border-white/10 bg-[linear-gradient(145deg,rgba(20,23,24,0.92),rgba(8,11,12,0.97))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.38)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
          {title}
        </h2>

        {action ? (
          <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-300">
            {action}
          </span>
        ) : null}
      </div>

      {children}
    </section>
  );
}

async function loadCockpitData() {
  const widgets =
    await ERPDashboardWidgetEngine.resolveDashboard(
      ERPBusinessAmarkhysDashboardConfig
    );

  return {
    widgets,
    kpis: buildKpis(widgets),
    appointments: buildAppointments(widgets),
    notifications: buildNotifications(widgets),
  };
}

export async function AmarkhysPremiumCockpit() {
  const data = await loadCockpitData();

  return (
    <main className="min-h-screen overflow-hidden bg-[#020403] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(39,243,213,0.08),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(14,175,170,0.12),transparent_28%),linear-gradient(135deg,#020403_0%,#080B0B_45%,#020807_100%)]" />

      <div className="relative mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-end gap-3">
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                AMARKHYS
              </h1>

              <span className="pb-1 text-2xl font-medium text-slate-300 sm:text-3xl">
                Garage
              </span>
            </div>

            <p className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Tableau de bord interne
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="mr-2 text-2xl font-black text-white">
              KPI
            </span>

            {["Atelier", "Stock", "Alertes"].map((item, index) => (
              <button
                key={item}
                className="relative rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-[#7FFFE8]/50 hover:bg-[#0EAFAA]/15"
              >
                {item}
                {index === 2 && data.notifications.length > 0 ? (
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white">
                    {data.notifications.length}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </header>

        <nav className="mt-8 flex flex-wrap gap-3 lg:justify-end">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:border-[#7FFFE8]/50 hover:bg-[#0EAFAA]/18"
            >
              {action.label}
            </Link>
          ))}
        </nav>

        <section className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {data.kpis.map((kpi) => (
            <KpiCard
              key={kpi.label}
              {...kpi}
            />
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.05fr_0.75fr]">
          <WidgetShell title="Historique des revenus (J-30)" action="⋮">
            <div className="mt-6 flex justify-center gap-4 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-8 rounded-full bg-[#27F3D5]" />
                Revenus atelier
              </span>
            </div>
            <RevenueChart />
          </WidgetShell>

          <WidgetShell title="Services les plus demandés" action="⋮">
            <div className="mt-6 flex flex-wrap justify-center gap-5 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-8 rounded-full bg-[#0EAFAA]" />
                Vidange moteur
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-8 rounded-full bg-[#9CFCEF]" />
                Diagnostic complet
              </span>
            </div>
            <ServicesBars />
          </WidgetShell>

          <div className="space-y-6">
            <WidgetShell title="Rendez-vous en direct">
              <p className="mt-3 text-sm font-medium text-slate-300">
                Suivi des passages atelier.
              </p>

              <div className="mt-5 space-y-3">
                {data.appointments.map((appointment) => {
                  const content = (
                    <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(14,175,170,0.18),rgba(255,255,255,0.05))] p-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-[#27F3D5] text-sm font-black text-[#02110F]">
                          ✓
                        </span>

                        <div>
                          <p className="text-sm font-black text-white">
                            {appointment.title}
                          </p>
                          <p className="mt-1 text-sm text-[#7FFFE8]">
                            {appointment.time}
                            <span className="text-slate-300">
                              {" "}· {appointment.meta}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );

                  return appointment.href ? (
                    <Link key={appointment.title} href={appointment.href}>
                      {content}
                    </Link>
                  ) : (
                    <div key={appointment.title}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </WidgetShell>

            <WidgetShell title="Notifications proactives">
              <div className="mt-5 space-y-3">
                {data.notifications.map((item) => {
                  const content = (
                    <div
                      className={[
                        "rounded-2xl border p-4",
                        item.tone === "warning"
                          ? "border-amber-400/20 bg-amber-500/18"
                          : item.tone === "alert"
                            ? "border-yellow-400/20 bg-yellow-500/14"
                            : "border-[#7FFFE8]/20 bg-[#0EAFAA]/18",
                      ].join(" ")}
                    >
                      <p className="text-sm font-black text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-200">
                        {item.description}
                      </p>
                    </div>
                  );

                  return item.href ? (
                    <Link key={item.title} href={item.href}>
                      {content}
                    </Link>
                  ) : (
                    <div key={item.title}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </WidgetShell>
          </div>
        </section>
      </div>
    </main>
  );
}
`
);

console.log("PASS 2N-Q8G2 OK: premium cockpit connected to runtime dashboard data.");