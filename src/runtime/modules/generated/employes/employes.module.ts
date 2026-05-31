import type { ERPModule } from "../../ERPModule";

export const employesModule = {
  metadata: {
    key: "employes",
    label: "Employés",
    icon: "users",
    category: "amarkhys",
    tags: ["atelier", "personnel", "mecanicien"],
  },

  schema: {
    collection: "employes",
    fields: [
      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
        list: { visible: true, order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "prenom",
        label: "Prénom",
        type: "text",
        required: false,
        list: { visible: true, order: 2 },
        grid: { cols: 6 },
      },
      {
        key: "fonction",
        label: "Fonction",
        type: "select",
        required: false,
        options: [
          { label: "Mécanicien", value: "mecanicien" },
          { label: "Technicien", value: "technicien" },
          { label: "Chef d'atelier", value: "chef_atelier" },
          { label: "Réceptionnaire", value: "receptionnaire" },
          { label: "Administration", value: "administration" },
        ],
        list: { visible: true, order: 3 },
        grid: { cols: 6 },
      },
      {
        key: "telephone",
        label: "Téléphone",
        type: "phone",
        required: false,
        list: { visible: true, order: 4 },
        grid: { cols: 6 },
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        required: false,
        list: { visible: false },
        grid: { cols: 6 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "actif",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Inactif", value: "inactif" },
        ],
        list: { visible: true, order: 5 },
        grid: { cols: 6 },
      },
    ],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "identite",
        label: "Identité",
        fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],
        sections: [
          {
            key: "infos",
            title: "Informations employé",
            fields: ["nom", "prenom", "fonction", "telephone", "email", "statut"],
          },
        ],
      },
    ],
  }
} satisfies ERPModule;
