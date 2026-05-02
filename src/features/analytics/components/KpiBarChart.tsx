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
