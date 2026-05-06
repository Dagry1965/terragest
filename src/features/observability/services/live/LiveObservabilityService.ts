import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
}
from "firebase/firestore";

import { db }
from "@/lib/firebase";

import {
  liveEventStore,
  type LiveRuntimeEvent,
}
from "../../stores/live/liveEventStore";

export class LiveObservabilityService {

  publish(
    type: string,
    payload?: unknown
  ) {

    liveEventStore.push({
      type,
      timestamp:
        Date.now(),
      payload,
    });
  }

  subscribeToRuntimeEvents() {

    const runtimeEventsQuery =
      query(
        collection(
          db,
          "runtime_events"
        ),
        orderBy(
          "createdAt",
          "desc"
        ),
        limit(50)
      );

    return onSnapshot(
      runtimeEventsQuery,
      snapshot => {

        const events =
          snapshot.docs.map(doc => {

            const data =
              doc.data();

            return {
              type:
                String(
                  data.type ??
                  data.payload?.type ??
                  data.payload?.event ??
                  "UNKNOWN_EVENT"
                ),

              timestamp:
                Number(
                  data.createdAt ?? Date.now()
                ),

              payload:
                data.payload?.payload ??
                data.payload,
            } satisfies LiveRuntimeEvent;
          });

        liveEventStore.replaceAll(
          events
        );
      }
    );
  }
}