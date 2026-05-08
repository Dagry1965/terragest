import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export function subscribeToFactures(
  callback: (data: any[]) => void
) {
  return onSnapshot(
    collection(
      db,
      "factures"
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
