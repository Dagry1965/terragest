"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  AlertesSchema,
  AlertesSchemaType,
} from "../schemas/Alertes.schema";

import { useCreateAlertes } from "../hooks/useCreateAlertes";

export function AlertesForm() {
  const mutation =
    useCreateAlertes();

  const form = useForm<AlertesSchemaType>({
    resolver: zodResolver(
      AlertesSchema
    ),
  });

  const onSubmit = (
    data: AlertesSchemaType
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
