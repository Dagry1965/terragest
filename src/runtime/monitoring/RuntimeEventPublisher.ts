import {
  collection,
  addDoc,
}
from "firebase/firestore";

import { db }
from "../../lib/firebase";

import {
  LiveObservabilityService
}
from "../../features/observability/services/live/LiveObservabilityService";

export class RuntimeEventPublisher {

  private service =
    new LiveObservabilityService();

  async publish(
    type: string,
    payload?: unknown
  ) {

    const event = {
      type,
      payload,
      createdAt:
        Date.now(),
    };

    await addDoc(
      collection(
        db,
        "runtime_events"
      ),
      event
    );

    this.service.publish(
      type,
      payload
    );
  }
}