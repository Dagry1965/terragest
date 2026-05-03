"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  FacturesSchema,
  FacturesSchemaType,
} from "../schemas/Factures.schema";

import { useCreateFactures } from "../hooks/useCreateFactures";

export function FacturesForm() {
  const mutation =
    useCreateFactures();

  const form = useForm<FacturesSchemaType>({
    resolver: zodResolver(
      FacturesSchema
    ),
  });

  const onSubmit = (
    data: FacturesSchemaType
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
