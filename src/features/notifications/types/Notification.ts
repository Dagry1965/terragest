export interface Notification {

  id: string;

  organisationId: string;

  titre: string;

  message: string;

  type: string;

  lu: boolean;

  metadata?: any;

  createdAt: string;
}
