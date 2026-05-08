"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  AnalyticsSchema,
  AnalyticsSchemaType,
} from "../schemas/Analytics.schema";

import { useCreateAnalytics } from "../hooks/useCreateAnalytics";

export function AnalyticsForm() {
  const mutation =
    useCreateAnalytics();

  const form = useForm<AnalyticsSchemaType>({
    resolver: zodResolver(
      AnalyticsSchema
    ),
  });

  const onSubmit = (
    data: AnalyticsSchemaType
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
