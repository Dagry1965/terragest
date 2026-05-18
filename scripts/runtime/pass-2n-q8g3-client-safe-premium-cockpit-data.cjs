const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx"
);

if (!fs.existsSync(target)) {
  console.error("Missing file:", target);
  process.exit(1);
}

let content = fs.readFileSync(target, "utf8");

/**
 * 1. Passer le cockpit en client component.
 */
content = content.replace(
  /^import Link from "next\/link";/,
  `"use client";

import { useEffect, useState } from "react";
import Link from "next/link";`
);

/**
 * 2. Supprimer imports runtime server en haut.
 * Ils seront importés dynamiquement dans useEffect.
 */
content = content.replace(
  /import \{ ERPBusinessAmarkhysDashboardConfig \} from "@\/runtime\/dashboard\/generic\/ERPBusinessAmarkhysDashboardConfig";\r?\nimport \{ ERPDashboardWidgetEngine \} from "@\/runtime\/dashboard\/generic\/ERPDashboardWidgetEngine";\r?\nimport type \{\r?\n  ERPDashboardWidgetResult,\r?\n\} from "@\/runtime\/dashboard\/generic\/ERPDashboardTypes";\r?\n/g,
  ""
);

/**
 * 3. Ajouter des types locaux souples.
 */
if (!content.includes("type DashboardWidgetResult =")) {
  content = content.replace(
    "type KpiView = {",
    `type DashboardWidgetItem = {
  id?: string;
  title: string;
  description?: string;
  date?: string;
  level?: string;
  href?: string;
};

type DashboardWidgetResult = {
  key: string;
  type?: string;
  title?: string;
  description?: string;
  value?: number;
  valueSuffix?: string;
  href?: string;
  items?: DashboardWidgetItem[];
};

type CockpitData = {
  widgets: DashboardWidgetResult[];
  kpis: KpiView[];
  appointments: AppointmentView[];
  notifications: NotificationView[];
};

type KpiView = {`
  );
}

content = content.replaceAll(
  "ERPDashboardWidgetResult",
  "DashboardWidgetResult"
);

/**
 * 4. Remplacer le chargement serveur par un chargement client safe.
 */
content = content.replace(
  /async function loadCockpitData\(\) \{[\s\S]*?\n\}\r?\n\r?\nexport async function AmarkhysPremiumCockpit\(\) \{\r?\n  const data = await loadCockpitData\(\);\r?\n\r?\n  return \(/,
  `function createFallbackCockpitData(): CockpitData {
  const widgets: DashboardWidgetResult[] = [];

  return {
    widgets,
    kpis: buildKpis(widgets),
    appointments: buildAppointments(widgets),
    notifications: buildNotifications(widgets),
  };
}

async function loadCockpitData(): Promise<CockpitData> {
  try {
    const [
      dashboardConfigModule,
      dashboardEngineModule,
    ] = await Promise.all([
      import("@/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig"),
      import("@/runtime/dashboard/generic/ERPDashboardWidgetEngine"),
    ]);

    const widgets =
      await dashboardEngineModule.ERPDashboardWidgetEngine.resolveDashboard(
        dashboardConfigModule.ERPBusinessAmarkhysDashboardConfig
      );

    return {
      widgets,
      kpis: buildKpis(widgets),
      appointments: buildAppointments(widgets),
      notifications: buildNotifications(widgets),
    };
  } catch (error) {
    console.error("[AMARKHYS_COCKPIT_DATA_ERROR]", error);

    return createFallbackCockpitData();
  }
}

export function AmarkhysPremiumCockpit() {
  const [data, setData] = useState<CockpitData>(() =>
    createFallbackCockpitData()
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function run() {
      const nextData = await loadCockpitData();

      if (mounted) {
        setData(nextData);
        setLoading(false);
      }
    }

    run();

    return () => {
      mounted = false;
    };
  }, []);

  return (`
);

/**
 * 5. Afficher un petit badge de chargement discret.
 */
content = content.replace(
  `<span className="mr-2 text-2xl font-black text-white">
              KPI
            </span>`,
  `<span className="mr-2 text-2xl font-black text-white">
              KPI
            </span>

            {loading ? (
              <span className="rounded-full border border-[#7FFFE8]/20 bg-[#0EAFAA]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#7FFFE8]">
                Sync
              </span>
            ) : null}`
);

/**
 * 6. Nettoyage éventuel : éviter double directive.
 */
content = content.replaceAll('"use client";\n\n"use client";', '"use client";');

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q8G3 OK: cockpit data loading moved to client safely.");