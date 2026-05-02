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
