export interface User {

  id: string;

  organisationId: string;

  nom: string;

  prenom: string;

  email: string;

  telephone?: string;

  role:
    | "SUPER_ADMIN"
    | "ADMIN"
    | "MANAGER"
    | "OPERATEUR"
    | "TECHNICIEN";

  actif: boolean;

  dernierLogin?: string;

  createdAt: string;

  updatedAt: string;
}
