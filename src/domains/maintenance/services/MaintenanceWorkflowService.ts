// src/domains/maintenance/services/MaintenanceWorkflowService.ts

import { MaterielsStore }
from "@/domains/materiels/store/MaterielsStore";

import { InterventionsStore }
from "@/domains/interventions/store/InterventionsStore";

export class MaintenanceWorkflowService {

  static declarePanne(

    materielId: string,

    description: string
  ) {

    MaterielsStore.setStatus(

      materielId,

      "EN_PANNE"
    );

    InterventionsStore.add({

      id:
        crypto.randomUUID(),

      materielId,

      description,

      workflow:
        "OPEN"
    });

    console.log(
      "[PANNE DECLARED]",
      materielId
    );
  }

  static resolvePanne(
    materielId: string
  ) {

    MaterielsStore.setStatus(

      materielId,

      "OPERATIONNEL"
    );

    console.log(
      "[PANNE RESOLVED]",
      materielId
    );
  }
}
