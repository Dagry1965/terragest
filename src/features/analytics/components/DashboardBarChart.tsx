"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface Props {

  data: {

    name: string;

    value: number;

  }[];
}

export function
Tableau de bordBarChart({

  data

}: Props) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        h-[400px]
      "
    >

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <BarChart
          data={data}
        >

          <XAxis
            dataKey="name"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}