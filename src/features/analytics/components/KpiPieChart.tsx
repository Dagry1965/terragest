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
