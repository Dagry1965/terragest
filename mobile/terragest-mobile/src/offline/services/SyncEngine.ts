import { apiClient } from "@/services/apiClient";

import { OfflineQueueService } from "@/offline/services/OfflineQueueService";

export const SyncEngine = {

  async sync() {

    const queue =
      await OfflineQueueService.getQueue();

    for (const action of queue) {

      try {

        await fetch(
          action.url,
          {
            method:
              action.method,

            headers: {
              "Content-Type":
                "application/json",

              "x-api-key":
                "terrageest_super_secret_key_2026",
            },

            body: JSON.stringify(
              action.data
            ),
          }
        );

      } catch (err) {

        console.error(
          "Sync error",
          err
        );

        return;
      }
    }

    await OfflineQueueService.clearQueue();
  },
};
