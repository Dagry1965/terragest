"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  SyncSchema,
  SyncSchemaType,
} from "../schemas/Sync.schema";

import { useCreateSync } from "../hooks/useCreateSync";

export function SyncForm() {
  const mutation =
    useCreateSync();

  const form = useForm<SyncSchemaType>({
    resolver: zodResolver(
      SyncSchema
    ),
  });

  const onSubmit = (
    data: SyncSchemaType
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
