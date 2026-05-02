export interface Equipment {

  id: string;

  organisationId: string;

  nom: string;

  type: string;

  marque?: string;

  modele?: string;

  numeroSerie?: string;

  statut:
    | "ACTIF"
    | "MAINTENANCE"
    | "PANNE";

  localisation?: string;

  createdAt: string;

  updatedAt: string;
}
