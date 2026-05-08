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
      collection(db, "notifications"),

      {
        titre: "Incident maintenance",
        message:
          "Nouvel incident détecté sur un matériel.",
        type: "maintenance",
        payload,
        lu: false,
        createdAt: serverTimestamp(),
      }
    );
  }
);
