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
  campagnesModule,
  budgetsModule,
  createBusinessModule({
    key: "utilisateurs",
    label: "Utilisateurs",
    fields: utilisateurFields,
  }),

  createBusinessModule({
    key: "fournisseurs",
    label: "Fournisseurs",
    fields: fournisseurFields,
  }),

  createBusinessModule({
    key: "clients",
    label: "Clients",
    description: "Gestion centralisÃ©e des clients.",
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
    label: "TÃ¢ches",
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
    label: "VÃ©hicules",
    description: "Gestion des vÃ©hicules.",
    fields: vehiculeFields,
  }),
  createBusinessModule({
    key: "parcelles",
    label: "Parcelles",
    fields: parcelleFields,
  }),
  createBusinessModule({
    key: "recoltes",
    label: "RÃ©coltes",
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
    label: "DÃ©penses",
    description: "Gestion des dÃ©penses.",
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

export const allERPModules: ERPModule[] = mergeERPModules(
  coreERPModules,
  generatedERPModules
);