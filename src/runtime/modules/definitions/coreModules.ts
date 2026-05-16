import { rappelsautoModule } from "@/runtime/modules/generated/rappelsauto";
import { stocksautoModule } from "@/runtime/modules/generated/stocksauto";
import { produitsautoModule } from "@/runtime/modules/generated/produitsauto";
import { facturesautoModule } from "@/runtime/modules/generated/facturesauto";
import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto";
import { rendezvousModule } from "@/runtime/modules/generated/rendezvous";
import { vehiculesModule } from "@/runtime/modules/generated/vehicules";
import { clientsautoModule } from "@/runtime/modules/generated/clientsauto";
import { facturationsModule } from "@/runtime/modules/generated/facturations";
import { contratsModule } from "@/runtime/modules/definitions/generated/contrats.module";
import { campagnesModule } from "@/runtime/modules/generated/campagnes/campagnes.module";
import { budgetsModule } from "@/runtime/modules/generated/budgets/budgets.module";
import type { ERPModule } from "../ERPModule";
import { generatedERPModules } from "./generated/generatedModules";
import {
  createBusinessModule,
  clientFields, commandeFields, utilisateurFields, tacheFields, incidentFields, maintenanceFields, interventionFields, fournisseurFields, terrainFields, recolteFields, parcelleFields, intrantFields, mouvementFields, stockFields, produitFields, vehiculeFields, employeFields, achatFields, livraisonFields, recetteFields, depenseFields, devisFields, factureFields,
}
from "../factory";

export const coreERPModules: ERPModule[] = [
  rappelsautoModule,
  stocksautoModule,
  produitsautoModule,
  facturesautoModule,
  interventionsautoModule,
  rendezvousModule,
  vehiculesModule,
  clientsautoModule,
  facturationsModule,
  contratsModule,
  campagnesModule,
  budgetsModule,
  createBusinessModule({
    key: "fournisseurs",
    label: "Fournisseurs",
    fields: fournisseurFields,
  }),

  createBusinessModule({
    key: "clients",
    label: "Clients",
    description: "Gestion centralisée des clients.",
    fields: clientFields,
  }),
  createBusinessModule({
    key: "devis",
    label: "Devis",
    description: "Gestion des devis.",
    fields: devisFields,
  }),
  createBusinessModule({
    key: "achats",
    label: "Achats",
    description: "Gestion des achats.",
    fields: achatFields,
  }),
  createBusinessModule({
    key: "taches",
    label: "Tâches",
    fields: tacheFields,
  }),

  {
    metadata: {
      key: "incidents",
      label: "Incidents",
      description: "Module ERP Incidents.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/incidents",
        create: "/incidents/nouveau",
        details: "/incidents",
        edit: "/incidents",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "incidents",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },
  createBusinessModule({
    key: "vehicules",
    label: "Véhicules",
    description: "Gestion des véhicules.",
    fields: vehiculeFields,
  }),
  createBusinessModule({
    key: "parcelles",
    label: "Parcelles",
    fields: parcelleFields,
  }),
  createBusinessModule({
    key: "recoltes",
    label: "Récoltes",
    fields: recolteFields,
  }),

  {
    metadata: {
      key: "intrants",
      label: "Intrants",
      description: "Module ERP Intrants.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/intrants",
        create: "/intrants/nouveau",
        details: "/intrants",
        edit: "/intrants",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "intrants",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },
  createBusinessModule({
    key: "depenses",
    label: "Dépenses",
    description: "Gestion des dépenses.",
    fields: depenseFields,
  }),
  createBusinessModule({
    key: "recettes",
    label: "Recettes",
    description: "Gestion des recettes.",
    fields: recetteFields,
  }),

];

function mergeERPModules(
  coreModules: ERPModule[],
  generatedModules: ERPModule[]
): ERPModule[] {
  const map = new Map<string, ERPModule>();

  for (const module of generatedModules) {
    map.set(module.metadata.key, module);
  }

  for (const module of coreModules) {
    map.set(module.metadata.key, module);
  }

  return Array.from(map.values());
}

const mergedERPModules: ERPModule[] = mergeERPModules(
  coreERPModules,
  generatedERPModules
);

const preferredERPModules =
  new Map<string, ERPModule>();

for (const module of mergedERPModules) {
  preferredERPModules.set(
    module.metadata.key,
    module
  );
}

/**
 * AMARKHYS modules must win over older generic modules.
 */
[
  clientsautoModule,
  vehiculesModule,
  rendezvousModule,
  interventionsautoModule,
  facturesautoModule,
  produitsautoModule,
  stocksautoModule,
  rappelsautoModule,
].forEach((module) => {
  preferredERPModules.set(
    module.metadata.key,
    module
  );
});

export const allERPModules: ERPModule[] =
  Array.from(
    preferredERPModules.values()
  );