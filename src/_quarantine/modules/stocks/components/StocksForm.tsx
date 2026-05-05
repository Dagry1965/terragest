"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  StocksSchema,
  StocksSchemaType,
} from "../schemas/Stocks.schema";

import { useCreateStocks } from "../hooks/useCreateStocks";

export function StocksForm() {
  const mutation =
    useCreateStocks();

  const form = useForm<StocksSchemaType>({
    resolver: zodResolver(
      StocksSchema
    ),
  });

  const onSubmit = (
    data: StocksSchemaType
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
