"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  ContratsSchema,
  ContratsSchemaType,
} from "../schemas/Contrats.schema";

import { useCreateContrats } from "../hooks/useCreateContrats";

export function ContratsForm() {
  const mutation =
    useCreateContrats();

  const form = useForm<ContratsSchemaType>({
    resolver: zodResolver(
      ContratsSchema
    ),
  });

  const onSubmit = (
    data: ContratsSchemaType
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
