export interface Terrain {

  id: string;

  organisationId: string;

  exploitationId: string;

  nom: string;

  superficie: number;

  culture?: string;

  latitude?: number;

  longitude?: number;

  statut:
    | "ACTIF"
    | "EN_PREPARATION"
    | "EN_REPOS";

  createdAt: string;

  updatedAt: string;
}
