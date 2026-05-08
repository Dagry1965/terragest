import { db }
from "@/infrastructure/firebase/firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
}
from "firebase/firestore";

import {
  RuntimeNotification,
}
from "@/runtime/notifications/RuntimeNotification";

export class RuntimeNotificationEngine {

  static async notify(

    notification:
      RuntimeNotification

  ) {

    console.log(
      "ERP Notification",
      notification
    );

    await addDoc(

      collection(
        db,
        "runtime_notifications"
      ),

      {

        ...notification,

        read:
          false,

        createdAt:
          serverTimestamp(),
      }
    );
  }
}
