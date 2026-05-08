import { db } from "@/infrastructure/firebase/firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { runtimeEventBus }
from "@/runtime/bus/RuntimeEventBus";

import {
  MAINTENANCE_INCIDENT_CREATED,
}
from "@/runtime/events/MaintenanceEvents";

runtimeEventBus.on(
  MAINTENANCE_INCIDENT_CREATED,

  async (payload) => {

    await addDoc(
      collection(db, "audit_logs"),

      {
        event:
          MAINTENANCE_INCIDENT_CREATED,

        payload,

        createdAt:
          serverTimestamp(),
      }
    );
  }
);
