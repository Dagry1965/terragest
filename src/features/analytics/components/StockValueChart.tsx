"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useProducts }
from "@/features/produits/hooks/useProducts";

export const StockValueChart =
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

  const chartData =
    data.map((item: any) => ({
      nom: item.nom,
      valeur:
        Number(item.prix || 0) *
        Number(item.quantite || 0),
    }));

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
        Valeur du Stock
      </h3>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={chartData}>

          <XAxis dataKey="nom" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="valeur" />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};