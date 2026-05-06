import {
  addDoc,
  collection,
}
from "firebase/firestore";

import { db }
from "@/lib/firebase";

export type DeadLetterEvent = {
  type: string;
  source: string;
  payload?: unknown;
  error: string;
  createdAt: number;
};

export class DeadLetterQueue {

  async store(
    event: Omit<DeadLetterEvent, "createdAt">
  ) {

    await addDoc(
      collection(
        db,
        "runtime_dead_letters"
      ),
      {
        ...event,
        createdAt:
          Date.now(),
      }
    );
  }
}