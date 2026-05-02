import { OfflineStorageService } from "@/offline/services/OfflineStorageService";

const QUEUE_KEY =
  "OFFLINE_QUEUE";

export const OfflineQueueService = {

  async add(action: any) {

    const queue =
      await this.getQueue();

    queue.push(action);

    await OfflineStorageService.setItem(
      QUEUE_KEY,
      queue
    );
  },

  async getQueue() {

    return (
      await OfflineStorageService.getItem(
        QUEUE_KEY
      )
    ) || [];
  },

  async clearQueue() {

    await OfflineStorageService.removeItem(
      QUEUE_KEY
    );
  },
};
