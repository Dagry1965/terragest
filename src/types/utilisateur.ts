import { UserRole } from "@/features/auth/types/UserRole";

export interface Utilisateur {

  id: string;

  organisationId: string;

  nom: string;

  email: string;

  role: UserRole;

  createdAt: string;
}
