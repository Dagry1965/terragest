import {
  OfflineQueue,
} from "@/features/offline/queue/OfflineQueue";

export const SyncService = {

  async sync() {

    const queue =
      OfflineQueue.getQueue();

    if (!queue.length) {

      return {
        synced: 0,
      };
    }

    for (
      const action
      of queue
    ) {

      console.log(
        "SYNC ACTION",
        action
      );
    }

    OfflineQueue.clear();

    return {
      synced:
        queue.length,
    };
  },
};