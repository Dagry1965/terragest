import { db }
from "@/infrastructure/firebase/firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
}
from "firebase/firestore";

import {
  RuntimeLog,
}
from "@/runtime/observability/RuntimeLog";

export class RuntimeObservabilityEngine {

  static async log(
    log: RuntimeLog
  ) {

    console.log(
      "ERP Runtime Log",
      log
    );

    await addDoc(

      collection(
        db,
        "runtime_logs"
      ),

      {

        ...log,

        createdAt:
          serverTimestamp(),
      }
    );
  }
}
