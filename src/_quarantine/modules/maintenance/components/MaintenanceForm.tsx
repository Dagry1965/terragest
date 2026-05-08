"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  MaintenanceSchema,
  MaintenanceSchemaType,
} from "../schemas/Maintenance.schema";

import { useCreateMaintenance } from "../hooks/useCreateMaintenance";

export function MaintenanceForm() {
  const mutation =
    useCreateMaintenance();

  const form = useForm<MaintenanceSchemaType>({
    resolver: zodResolver(
      MaintenanceSchema
    ),
  });

  const onSubmit = (
    data: MaintenanceSchemaType
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
