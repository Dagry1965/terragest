import type { ProcessDefinition }
from "./ProcessDefinition";

export const
MaterielMaintenanceProcess:
ProcessDefinition = {

  id: "PROC_MAT_MAINT",

  name:
    "Materiel Maintenance",

  states: [
    "DECLARED",
    "APPROVED",
    "ASSIGNED",
    "IN_PROGRESS",
    "CONTROL",
    "COMPLETED"
  ],

  initialState:
    "DECLARED",

  finalState:
    "COMPLETED",
};
