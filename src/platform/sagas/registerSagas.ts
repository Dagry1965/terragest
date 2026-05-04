// src/platform/sagas/registerSagas.ts

import { SagaManager }
from "@/platform/sagas/SagaManager";

export function registerERPSagas() {

  SagaManager.register({

    name: "harvest-stock-saga",

    steps: [

      {

        event: "recolte.created",

        action(payload) {

          console.log(
            "[SAGA] create stock movement",
            payload
          );
        }
      }
    ]
  });

  SagaManager.register({

    name: "paiement-facture-saga",

    steps: [

      {

        event: "paiement.created",

        action(payload) {

          console.log(
            "[SAGA] generate facture",
            payload
          );
        }
      }
    ]
  });
}