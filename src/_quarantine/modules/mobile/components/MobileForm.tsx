"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  MobileSchema,
  MobileSchemaType,
} from "../schemas/Mobile.schema";

import { useCreateMobile } from "../hooks/useCreateMobile";

export function MobileForm() {
  const mutation =
    useCreateMobile();

  const form = useForm<MobileSchemaType>({
    resolver: zodResolver(
      MobileSchema
    ),
  });

  const onSubmit = (
    data: MobileSchemaType
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
