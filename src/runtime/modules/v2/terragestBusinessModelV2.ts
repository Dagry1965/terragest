import type { ERPModule } from "@/runtime/modules";
import { mouvementsModuleV2 } from "./mouvementsModuleV2";
import { actifsModuleV2 } from "./actifsModuleV2";
import { ressourcesModuleV2 } from "./ressourcesModuleV2";
import { campagnesModuleV2 } from "./campagnesModuleV2";

const enterpriseFeatures = {
  audit: true,
  realtime: true,
  analytics: true,
  workflows: true,
  automation: true,
  notifications: true,
};

export const terragestBusinessModelV2: ERPModule[] = [
  {
    metadata: {
      key: "utilisateurs",
      label: "Utilisateurs",
      description:
        "Propriétaires, responsables, gestionnaires, techniciens et comptables.",
      icon: "users",
      category: "Administration",
      features: enterpriseFeatures,
    },
    schema: {
      collection: "utilisateurs",
      fields: [
        { key: "nom", label: "Nom", type: "text", required: true },
        { key: "prenom", label: "Prénom", type: "text" },
        { key: "email", label: "Email", type: "email" },
        {
          key: "role",
          label: "Rôle",
          type: "select",
          options: [
            { label: "Propriétaire", value: "proprietaire" },
            { label: "Responsable", value: "responsable" },
            { label: "Gestionnaire", value: "gestionnaire" },
            { label: "Technicien", value: "technicien" },
            { label: "Comptable", value: "comptable" },
          ],
        },
        {
          key: "statut",
          label: "Statut",
          type: "select",
          options: [
            { label: "Actif", value: "actif" },
            { label: "Inactif", value: "inactif" },
          ],
        },
      ],
    },
  },

  {
    metadata: {
      key: "terrains",
      label: "Terrains",
      description: "Unité foncière centrale du système TerraGest.",
      icon: "map",
      category: "Foncier",
      features: enterpriseFeatures,
    },
    schema: {
      collection: "terrains",
      fields: [
        {
          key: "designation",
          label: "Désignation",
          type: "text",
          required: true,
        },
        {
          key: "proprietaireId",
          label: "Propriétaire",
          type: "relation",
          relation: { module: "utilisateurs" },
          required: true,
        },
        { key: "localisation", label: "Localisation", type: "text" },
        {
          key: "surfaceTotale",
          label: "Surface totale",
          type: "number",
          required: true,
        },
        {
          key: "surfaceDisponible",
          label: "Surface disponible",
          type: "number",
          required: true,
        },
        {
          key: "vocationTerrain",
          label: "Vocation du terrain",
          type: "select",
          options: [
            { label: "Agricole", value: "agricole" },
            { label: "Elevage", value: "elevage" },
            { label: "Piscicole", value: "piscicole" },
            { label: "Immobilier", value: "immobilier" },
            { label: "Mixte", value: "mixte" },
          ],
        },
        {
          key: "statut",
          label: "Statut",
          type: "select",
          options: [
            { label: "Disponible", value: "disponible" },
            { label: "Exploité", value: "exploite" },
            { label: "Litige", value: "litige" },
            { label: "Inactif", value: "inactif" },
          ],
        },
        {
          key: "prixAcquisition",
          label: "Prix d'acquisition",
          type: "number",
        },
        {
          key: "dateAcquisition",
          label: "Date d'acquisition",
          type: "date",
        },
      ],
    },
  },

  {
    metadata: {
      key: "contrats",
      label: "Contrats",
      description:
        "Cadre juridique et opérationnel des terrains, exploitations et activités.",
      icon: "file-text",
      category: "Juridique",
      features: enterpriseFeatures,
    },
    schema: {
      collection: "contrats",
      fields: [
        {
          key: "reference",
          label: "Référence",
          type: "text",
          required: true,
        },
        {
          key: "typeContrat",
          label: "Type de contrat",
          type: "select",
          required: true,
          options: [
            { label: "Foncier", value: "foncier" },
            { label: "Exploitation", value: "exploitation" },
            { label: "Location", value: "location" },
            { label: "Partenariat", value: "partenariat" },
            { label: "Maintenance", value: "maintenance" },
            { label: "Fourniture", value: "fourniture" },
          ],
        },
        {
          key: "terrainId",
          label: "Terrain",
          type: "relation",
          relation: { module: "terrains" },
        },
        {
          key: "dateDebut",
          label: "Date de début",
          type: "date",
          required: true,
        },
        {
          key: "dateFin",
          label: "Date de fin",
          type: "date",
        },
        {
          key: "documentUrl",
          label: "Document du contrat",
          type: "file",
        },
        {
          key: "statut",
          label: "Statut",
          type: "select",
          options: [
            { label: "Brouillon", value: "brouillon" },
            { label: "Actif", value: "actif" },
            { label: "Expiré", value: "expire" },
            { label: "Résilié", value: "resilie" },
          ],
        },
      ],
    },
  },

  {
    metadata: {
      key: "exploitations",
      label: "Exploitations",
      description:
        "Activités économiques exercées sur un terrain sous contrat actif.",
      icon: "sprout",
      category: "Production",
      features: enterpriseFeatures,
    },
    schema: {
      collection: "exploitations",
      fields: [
        {
          key: "nom",
          label: "Nom de l'exploitation",
          type: "text",
          required: true,
        },
        {
          key: "terrainId",
          label: "Terrain",
          type: "relation",
          relation: { module: "terrains" },
          required: true,
        },
        {
          key: "contratId",
          label: "Contrat",
          type: "relation",
          relation: { module: "contrats" },
          required: true,
        },
        {
          key: "typeExploitation",
          label: "Type d'exploitation",
          type: "select",
          required: true,
          options: [
            { label: "Agriculture", value: "agriculture" },
            { label: "Elevage", value: "elevage" },
            { label: "Pisciculture", value: "pisciculture" },
            { label: "Immobilier", value: "immobilier" },
            { label: "Mixte", value: "mixte" },
          ],
        },
        { key: "superficie", label: "Superficie", type: "number" },
        { key: "localisation", label: "Localisation", type: "text" },
        { key: "dateDebut", label: "Date de début", type: "date" },
        { key: "dateFin", label: "Date de fin", type: "date" },
        {
          key: "statut",
          label: "Statut",
          type: "select",
          options: [
            { label: "Active", value: "active" },
            { label: "Suspendue", value: "suspendue" },
            { label: "Terminée", value: "terminee" },
          ],
        },
      ],
    },
  },

  campagnesModuleV2,
  ressourcesModuleV2,
  actifsModuleV2,
  mouvementsModuleV2,
];