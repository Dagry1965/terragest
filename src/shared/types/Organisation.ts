export interface Organisation {

  id: string;

  nom: string;

  type: "HOLDING" |
        "FILIALE" |
        "COOPERATIVE" |
        "EXPLOITATION";

  parentOrganisationId?: string;

  pays: string;

  devise: string;

  timezone: string;

  actif: boolean;

  createdAt: string;

  updatedAt: string;
}
