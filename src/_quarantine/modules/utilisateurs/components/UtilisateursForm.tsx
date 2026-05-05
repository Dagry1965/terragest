"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  UtilisateursSchema,
  UtilisateursSchemaType,
} from "../schemas/Utilisateurs.schema";

import { useCreateUtilisateurs } from "../hooks/useCreateUtilisateurs";

export function UtilisateursForm() {
  const mutation =
    useCreateUtilisateurs();

  const form = useForm<UtilisateursSchemaType>({
    resolver: zodResolver(
      UtilisateursSchema
    ),
  });

  const onSubmit = (
    data: UtilisateursSchemaType
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
