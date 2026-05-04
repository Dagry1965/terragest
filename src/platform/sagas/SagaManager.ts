// src/platform/sagas/SagaManager.ts

import { DomainEvents }
from "@/platform/events/DomainEvents";

export interface ERPSagaStep {

  event: string;

  action(payload?: unknown): void;
}

export interface ERPSaga {

  name: string;

  steps: ERPSagaStep[];
}

class SagaManagerEngine {

  private sagas: ERPSaga[] = [];

  register(
    saga: ERPSaga
  ) {

    console.log(
      `[SAGA REGISTERED]
       ${saga.name}`
    );

    this.sagas.push(saga);

    for (const step of saga.steps) {

      DomainEvents.subscribe(
        step.event,
        step.action
      );
    }
  }

  getSagas() {

    return this.sagas;
  }
}

export const SagaManager =
  new SagaManagerEngine();