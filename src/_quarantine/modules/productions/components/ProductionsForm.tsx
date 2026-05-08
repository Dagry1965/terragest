"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  ProductionsSchema,
  ProductionsSchemaType,
} from "../schemas/Productions.schema";

import { useCreateProductions } from "../hooks/useCreateProductions";

export function ProductionsForm() {
  const mutation =
    useCreateProductions();

  const form = useForm<ProductionsSchemaType>({
    resolver: zodResolver(
      ProductionsSchema
    ),
  });

  const onSubmit = (
    data: ProductionsSchemaType
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
