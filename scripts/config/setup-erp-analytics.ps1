Write-Host "Generating Terragest ERP Analytics..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\analytics" -Force
mkdir "src\features\analytics\components" -Force

# =====================================================
# KPI CHART COMPONENT
# =====================================================

$kpiChart = @'
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface KpiBarChartProps {

  title: string;

  data: any[];

  dataKey: string;

  nameKey: string;
}

export const KpiBarChart = ({
  title,
  data,
  dataKey,
  nameKey,
}: KpiBarChartProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      h-[420px]
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">
        {title}
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >

        <BarChart data={data}>

          <XAxis dataKey={nameKey} />

          <YAxis />

          <Tooltip />

          <Bar dataKey={dataKey} />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}
'@

Set-Content `
"src\features\analytics\components\KpiBarChart.tsx" `
$kpiChart

# =====================================================
# PIE CHART COMPONENT
# =====================================================

$pieChart = @'
"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface KpiPieChartProps {

  title: string;

  data: any[];

  dataKey: string;

  nameKey: string;
}

export const KpiPieChart = ({
  title,
  data,
  dataKey,
  nameKey,
}: KpiPieChartProps) => {

  const colors = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
    "#7c3aed",
  ];

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      h-[420px]
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">
        {title}
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >

        <PieChart>

          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            outerRadius={130}
            label
          >

            {data.map(
              (
                entry,
                index
              ) => (

                <Cell
                  key={index}
                  fill={
                    colors[
                      index %
                      colors.length
                    ]
                  }
                />

              )
            )}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}
'@

Set-Content `
"src\features\analytics\components\KpiPieChart.tsx" `
$pieChart

# =====================================================
# LINE CHART COMPONENT
# =====================================================

$lineChart = @'
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface KpiLineChartProps {

  title: string;

  data: any[];

  dataKey: string;

  nameKey: string;
}

export const KpiLineChart = ({
  title,
  data,
  dataKey,
  nameKey,
}: KpiLineChartProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      h-[420px]
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">
        {title}
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >

        <LineChart data={data}>

          <XAxis dataKey={nameKey} />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey={dataKey}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}
'@

Set-Content `
"src\features\analytics\components\KpiLineChart.tsx" `
$lineChart

# =====================================================
# ANALYTICS HELPERS
# =====================================================

$analyticsHelpers = @'
export const buildCategoryAnalytics =
  (items: any[]) => {

    const map:
      Record<string, number> = {};

    items.forEach((item) => {

      const key =
        item.categorie ||
        "Non classé";

      map[key] =
        (map[key] || 0) + 1;
    });

    return Object.entries(map)
      .map(([name, value]) => ({
        name,
        value,
      }));
  };

export const buildMonthlyAnalytics =
  (items: any[]) => {

    const map:
      Record<string, number> = {};

    items.forEach((item) => {

      const date =
        new Date(
          item.createdAt
        );

      const month =
        `${date.getMonth() + 1}/${
          date.getFullYear()
        }`;

      map[month] =
        (map[month] || 0) + 1;
    });

    return Object.entries(map)
      .map(([name, value]) => ({
        name,
        value,
      }));
  };
'@

Set-Content `
"src\features\analytics\components\analyticsHelpers.ts" `
$analyticsHelpers

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest ERP Analytics generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- KpiBarChart"
Write-Host "- KpiPieChart"
Write-Host "- KpiLineChart"
Write-Host "- Analytics helpers"
Write-Host "- ERP business intelligence foundation"
Write-Host ""