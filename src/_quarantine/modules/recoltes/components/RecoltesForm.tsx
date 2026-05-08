"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  RecoltesSchema,
  RecoltesSchemaType,
} from "../schemas/Recoltes.schema";

import { useCreateRecoltes } from "../hooks/useCreateRecoltes";

export function RecoltesForm() {
  const mutation =
    useCreateRecoltes();

  const form = useForm<RecoltesSchemaType>({
    resolver: zodResolver(
      RecoltesSchema
    ),
  });

  const onSubmit = (
    data: RecoltesSchemaType
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
