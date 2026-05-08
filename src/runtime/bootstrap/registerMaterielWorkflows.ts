import { WorkflowRegistry }
from "../registry/WorkflowRegistry";

import { MaterielMaintenanceWorkflow }
from "../../features/materiels/workflows/MaterielMaintenanceWorkflow";

export function
registerMaterielWorkflows(
  registry: WorkflowRegistry
) {

  registry.register(
    "materiel-maintenance",
    new MaterielMaintenanceWorkflow()
  );

  console.log(
    "[Runtime] materiel workflows registered"
  );
}
