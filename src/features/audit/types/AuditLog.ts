export interface AuditLog {

  id: string;

  organisationId: string;

  utilisateurId: string;

  utilisateurNom: string;

  action: string;

  module: string;

  cibleId: string;

  cibleNom: string;

  metadata?: any;

  createdAt: string;
}
