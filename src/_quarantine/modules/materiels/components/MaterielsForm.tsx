"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  MaterielsSchema,
  MaterielsSchemaType,
} from "../schemas/Materiels.schema";

import { useCreateMateriels } from "../hooks/useCreateMateriels";

export function MaterielsForm() {
  const mutation =
    useCreateMateriels();

  const form = useForm<MaterielsSchemaType>({
    resolver: zodResolver(
      MaterielsSchema
    ),
  });

  const onSubmit = (
    data: MaterielsSchemaType
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
