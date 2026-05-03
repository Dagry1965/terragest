"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { useProducts }
from "@/features/produits/hooks/useProducts";

export const ProductsCategoryChart =
() => {

  const {
    data,
    loading,
  } = useProducts();

  if (loading) {

    return (
      <p>
        Chargement graphique...
      </p>
    );
  }

  const grouped =
    data.reduce(
      (
        acc: any,
        item: any
      ) => {

        const category =
          item.categorie ||
          "Autre";

        acc[category] =
          (acc[category] || 0) + 1;

        return acc;

      },
      {}
    );

  const chartData =
    Object.entries(grouped).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        p-6
        h-[400px]
      "
    >
      <h3
        className="
          text-xl
          font-semibold
          mb-6
        "
      >
        CatÃ©gories Produits
      </h3>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
          >

            {chartData.map(
              (_, index) => (

              <Cell key={index} />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};