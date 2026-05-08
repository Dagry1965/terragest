import type { ERPRole } from "./ERPRole";

export const ERPRoleRegistry: ERPRole[] = [
  {
    key: "super_admin",
    label: "Super Admin",
    description: "Acces complet plateforme ERP.",
  },
  {
    key: "admin",
    label: "Administrateur",
    description: "Administration fonctionnelle ERP.",
  },
  {
    key: "manager",
    label: "Manager",
    description: "Pilotage et validation des processus.",
  },
  {
    key: "operator",
    label: "Operateur",
    description: "Execution operationnelle.",
  },
  {
    key: "viewer",
    label: "Lecteur",
    description: "Consultation seule.",
  },
];