"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  InterventionsSchema,
  InterventionsSchemaType,
} from "../schemas/Interventions.schema";

import { useCreateInterventions } from "../hooks/useCreateInterventions";

export function InterventionsForm() {
  const mutation =
    useCreateInterventions();

  const form = useForm<InterventionsSchemaType>({
    resolver: zodResolver(
      InterventionsSchema
    ),
  });

  const onSubmit = (
    data: InterventionsSchemaType
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
