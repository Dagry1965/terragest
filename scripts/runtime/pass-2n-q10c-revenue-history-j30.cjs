const fs = require("fs");
const path = require("path");

const root = process.cwd();

function abs(filePath) {
  return path.join(root, filePath);
}

function patch(filePath, updater) {
  const target = abs(filePath);

  if (!fs.existsSync(target)) {
    console.log("SKIP", filePath);
    return;
  }

  const before = fs.readFileSync(target, "utf8");
  const after = updater(before);

  if (before !== after) {
    fs.writeFileSync(target, after, "utf8");
    console.log("UPDATED", filePath);
  } else {
    console.log("NO CHANGE", filePath);
  }
}

/**
 * PASS 2N-Q10C
 * Historique revenus J-30 réel.
 *
 * Source :
 * - encaissementsauto
 * - datePaiement
 * - montant
 * - statut = valide
 */

patch("src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx", (content) => {
  let next = content;

  /**
   * 1. Étendre CockpitData.
   */
  next = next.replace(
    `type CockpitData = {
  widgets: DashboardWidgetResult[];
  kpis: KpiView[];
  appointments: AppointmentView[];
  notifications: NotificationView[];
};`,
    `type CockpitData = {
  widgets: DashboardWidgetResult[];
  kpis: KpiView[];
  appointments: AppointmentView[];
  notifications: NotificationView[];
  revenueHistory: RevenuePoint[];
};

type RevenuePoint = {
  date: string;
  value: number;
};`
  );

  /**
   * 2. Ajouter helpers revenus.
   */
  if (!next.includes("function buildRevenueHistory(")) {
    next = next.replace(
      `function buildNotifications(widgets: DashboardWidgetResult[]): NotificationView[] {`,
      `function toDate(value: unknown): Date | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "seconds" in value
  ) {
    return new Date(Number((value as { seconds: number }).seconds) * 1000);
  }

  const parsed = new Date(String(value));

  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function toDateKey(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function buildRevenueHistory(widgets: DashboardWidgetResult[]): RevenuePoint[] {
  const encaissements =
    findWidget(widgets, ["historique-revenus-j30"]);

  const items = encaissements?.items ?? [];
  const today = new Date();
  const series = new Map<string, number>();

  for (let index = 29; index >= 0; index--) {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    series.set(toDateKey(date), 0);
  }

  for (const item of items) {
    const date = toDate(item.date);

    if (!date) {
      continue;
    }

    const key = toDateKey(date);

    if (!series.has(key)) {
      continue;
    }

    const amountMatch = String(item.description ?? "").match(/Montant\\s*:\\s*([0-9\\s.,]+)/i);
    const amount = amountMatch
      ? Number(amountMatch[1].replace(/\\s/g, "").replace(",", "."))
      : 0;

    if (!Number.isNaN(amount)) {
      series.set(key, (series.get(key) ?? 0) + amount);
    }
  }

  return Array.from(series.entries()).map(([date, value]) => ({
    date,
    value,
  }));
}

function buildNotifications(widgets: DashboardWidgetResult[]): NotificationView[] {`
    );
  }

  /**
   * 3. Remplacer RevenueChart statique par un composant dynamique.
   */
  next = next.replace(
    `function RevenueChart() {
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
}`,
    `function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const width = 560;
  const height = 260;
  const paddingX = 38;
  const paddingTop = 34;
  const paddingBottom = 34;
  const max = Math.max(...data.map((point) => point.value), 1);

  const points = data.map((point, index) => {
    const x =
      data.length <= 1
        ? paddingX
        : paddingX + (index / (data.length - 1)) * (width - paddingX * 2);

    const y =
      height -
      paddingBottom -
      (point.value / max) * (height - paddingTop - paddingBottom);

    return { x, y, value: point.value, date: point.date };
  });

  const linePath = points
    .map((point, index) => \`\${index === 0 ? "M" : "L"}\${point.x.toFixed(1)} \${point.y.toFixed(1)}\`)
    .join(" ");

  const areaPath =
    points.length > 0
      ? \`\${linePath} L\${points[points.length - 1].x.toFixed(1)} \${height - paddingBottom} L\${points[0].x.toFixed(1)} \${height - paddingBottom} Z\`
      : "";

  const total = data.reduce((sum, point) => sum + point.value, 0);

  return (
    <div className="mt-6 h-72 rounded-[1.6rem] border border-white/10 bg-black/25 p-5">
      <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-300">
        <span>30 derniers jours</span>
        <span>{total.toLocaleString("fr-FR")} FCFA</span>
      </div>

      <svg viewBox="0 0 560 260" className="h-[calc(100%-1.5rem)] w-full" aria-hidden="true">
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

        {points.length > 0 ? (
          <>
            <path d={areaPath} fill="url(#revenueFill)" />
            <path
              d={linePath}
              fill="none"
              stroke="#27F3D5"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r="8"
              fill="white"
            />
          </>
        ) : null}
      </svg>
    </div>
  );
}`
  );

  /**
   * 4. createFallbackCockpitData.
   */
  next = next.replace(
    `return {
    widgets,
    kpis: buildKpis(widgets),
    appointments: buildAppointments(widgets),
    notifications: buildNotifications(widgets),
  };`,
    `return {
    widgets,
    kpis: buildKpis(widgets),
    appointments: buildAppointments(widgets),
    notifications: buildNotifications(widgets),
    revenueHistory: buildRevenueHistory(widgets),
  };`
  );

  /**
   * 5. loadCockpitData return.
   */
  next = next.replace(
    `return {
      widgets,
      kpis: buildKpis(widgets),
      appointments: buildAppointments(widgets),
      notifications: buildNotifications(widgets),
    };`,
    `return {
      widgets,
      kpis: buildKpis(widgets),
      appointments: buildAppointments(widgets),
      notifications: buildNotifications(widgets),
      revenueHistory: buildRevenueHistory(widgets),
    };`
  );

  /**
   * 6. Appel composant.
   */
  next = next.replace(
    `<RevenueChart />`,
    `<RevenueChart data={data.revenueHistory} />`
  );

  return next;
});

patch("src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts", (content) => {
  let next = content;

  if (!next.includes(`key: "historique-revenus-j30"`)) {
    const insertion = `
    {
      key: "historique-revenus-j30",
      type: "activity",
      moduleKey: "encaissementsauto",
      title: "Historique revenus J-30",
      description: "Encaissements validés sur les 30 derniers jours.",
      labelField: "referenceTransaction",
      dateField: "datePaiement",
      href: "/encaissementsauto",
      limit: 500,
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "valide",
        },
        {
          field: "datePaiement",
          operator: "gteDaysFromNow",
          value: -29,
        },
      ],
    },
`;

    next = next.replace(
      `    {
      key: "encaissements-recents",`,
      insertion + `    {
      key: "encaissements-recents",`
    );
  }

  return next;
});

console.log("PASS 2N-Q10C OK: real J-30 revenue history wired.");