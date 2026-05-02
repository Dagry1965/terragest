export interface Intervention {

  id: string;

  organisationId: string;

  type: string;

  statut:
    | "PLANIFIEE"
    | "EN_COURS"
    | "TERMINEE";

  terrainId?: string;

  materielId?: string;

  technicienId?: string;

  dateIntervention?: string;

  commentaire?: string;

  createdAt: string;

  updatedAt: string;
}
