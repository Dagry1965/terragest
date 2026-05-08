"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  PaiementsSchema,
  PaiementsSchemaType,
} from "../schemas/Paiements.schema";

import { useCreatePaiements } from "../hooks/useCreatePaiements";

export function PaiementsForm() {
  const mutation =
    useCreatePaiements();

  const form = useForm<PaiementsSchemaType>({
    resolver: zodResolver(
      PaiementsSchema
    ),
  });

  const onSubmit = (
    data: PaiementsSchemaType
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
