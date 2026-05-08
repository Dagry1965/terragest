import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import type { ERPModule } from "@/runtime/modules";

import {
  runtimeFirestore,
} from "@/runtime/firebase/runtime-firestore";

export class FirestoreRuntimeRealtime {

  static subscribe(
    module: ERPModule,
    callback: (
      count: number
    ) => void
  ) {

    return onSnapshot(
      collection(
        runtimeFirestore,
        module.schema.collection
      ),
      (snapshot) => {
        callback(snapshot.size);
      }
    );
  }
}