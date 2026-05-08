"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  MonitoringSchema,
  MonitoringSchemaType,
} from "../schemas/Monitoring.schema";

import { useCreateMonitoring } from "../hooks/useCreateMonitoring";

export function MonitoringForm() {
  const mutation =
    useCreateMonitoring();

  const form = useForm<MonitoringSchemaType>({
    resolver: zodResolver(
      MonitoringSchema
    ),
  });

  const onSubmit = (
    data: MonitoringSchemaType
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
