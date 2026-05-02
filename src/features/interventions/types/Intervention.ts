import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";

export interface Intervention {

  id: string;

  organisationId: string;

  nom: string;

  categorie: string;

  status: WorkflowStatus;

  createdAt: string;
}
