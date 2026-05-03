import { OfflineSyncCard }
from "@/features/offline/components/OfflineSyncCard";

import { OfflineStatusCard }
from "@/features/pwa/components/OfflineStatusCard";

export default function
OfflinePage() {

  return (
    <div
      className="
        p-6
        space-y-6
      "
    >
      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Offline Engine
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Synchronisation intelligente
        </p>
      </div>

      <OfflineStatusCard />

      <OfflineSyncCard />
    </div>
  );
}