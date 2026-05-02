import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/firebase";

export const FirestoreRealtimeService = {

  subscribe(
    collectionName: string,
    callback: any
  ) {

    const q =
      query(
        collection(
          db,
          collectionName
        )
      );

    return onSnapshot(
      q,
      (snapshot) => {

        const data =
          snapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data(),
            })
          );

        callback(data);
      }
    );
  },
};
