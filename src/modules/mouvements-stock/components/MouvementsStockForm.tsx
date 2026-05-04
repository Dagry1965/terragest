"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  MouvementsStockSchema,
  MouvementsStockSchemaType,
} from "../schemas/MouvementsStock.schema";

import { useCreateMouvementsStock } from "../hooks/useCreateMouvementsStock";

export function MouvementsStockForm() {
  const mutation =
    useCreateMouvementsStock();

  const form = useForm<MouvementsStockSchemaType>({
    resolver: zodResolver(
      MouvementsStockSchema
    ),
  });

  const onSubmit = (
    data: MouvementsStockSchemaType
  ) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <input
        {...form.register("nom")}
        placeholder="Nom"
        className="border p-2 rounded w-full"
      />

      <button
        type="submit"
        className="border px-4 py-2 rounded"
      >
        Enregistrer
      </button>
    </form>
  );
}
