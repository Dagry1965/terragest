"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  TerrainsSchema,
  TerrainsSchemaType,
} from "../schemas/Terrains.schema";

import { useCreateTerrains } from "../hooks/useCreateTerrains";

export function TerrainsForm() {
  const mutation =
    useCreateTerrains();

  const form = useForm<TerrainsSchemaType>({
    resolver: zodResolver(
      TerrainsSchema
    ),
  });

  const onSubmit = (
    data: TerrainsSchemaType
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
