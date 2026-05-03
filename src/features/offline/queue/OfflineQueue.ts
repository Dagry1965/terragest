import { OfflineStorage }
from "@/features/offline/storage/OfflineStorage";

const STORAGE_KEY =
  "offline-queue";

export type OfflineAction = {

  type: string;

  payload: any;

  createdAt: string;
};

export const OfflineQueue = {

  getQueue():
  OfflineAction[] {

    return (
      OfflineStorage.get<
        OfflineAction[]
      >(STORAGE_KEY)
      || []
    );
  },

  enqueue(
    action: OfflineAction
  ) {

    const queue =
      this.getQueue();

    queue.push(action);

    OfflineStorage.set(
      STORAGE_KEY,
      queue
    );
  },

  clear() {

    OfflineStorage.remove(
      STORAGE_KEY
    );
  },
};