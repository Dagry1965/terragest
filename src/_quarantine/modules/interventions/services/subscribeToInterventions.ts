import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export function subscribeToInterventions(
  callback: (data: any[]) => void
) {
  return onSnapshot(
    collection(
      db,
      "interventions"
    ),
    (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

      callback(data);
    }
  );
}
