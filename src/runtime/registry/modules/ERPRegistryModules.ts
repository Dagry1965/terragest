import {
  resolveERPGeneratedSchema,
} from "@/runtime/ui-generation";

import type {
  ERPRegistryModule,
} from "../types";

const ModuleKeys = [
  "exploitations",
  "terrains",
  "materiels",
  "produits",
  "stocks",
  "paiements",
  "interventions",
  "contrats",
  "maintenance",
];

export const ERPRegistryModules:
  ERPRegistryModule[] =
    ModuleKeys.map((moduleKey) => {

      const schema =
        resolveERPGeneratedSchema(
          moduleKey
        );

      return {

        key: moduleKey,

        label:
          schema.moduleLabel,

        description:
          schema.description,

        schema,

        navigation: [
          {
            key: "list",
            label: "Liste",
            href: `/${moduleKey}`,
          },
          {
            key: "create",
            label: "Creation",
            href: `/${moduleKey}/nouveau`,
          },
        ],

        actions: [
          {
            key: "create",
            label: "Nouveau",
            variant: "primary",
          },
          {
            key: "import",
            label: "Importer",
            variant: "secondary",
          },
          {
            key: "export",
            label: "Exporter",
            variant: "secondary",
          },
        ],

        permissions: [
          {
            key: "read",
            label: "Lecture",
          },
          {
            key: "write",
            label: "Ecriture",
          },
          {
            key: "delete",
            label: "Suppression",
          },
        ],

        workflows: [
          {
            key: "default",
            label: "Workflow principal",
          },
        ],

        automation: [
          {
            key: "notifications",
            label: "Notifications runtime",
          },
        ],

        events: [
          {
            key: "created",
            label: "Entite creee",
          },
          {
            key: "updated",
            label: "Entite modifiee",
          },
          {
            key: "deleted",
            label: "Entite supprimee",
          },
        ],
      };
    });