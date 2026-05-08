"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  ClientsSchema,
  ClientsSchemaType,
} from "../schemas/Clients.schema";

import { useCreateClients } from "../hooks/useCreateClients";

export function ClientsForm() {
  const mutation =
    useCreateClients();

  const form = useForm<ClientsSchemaType>({
    resolver: zodResolver(
      ClientsSchema
    ),
  });

  const onSubmit = (
    data: ClientsSchemaType
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
