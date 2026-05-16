"use client";

import {
  useState,
} from "react";

import { SyncService }
from "@/features/offline/sync/SyncService";

export const OfflineSyncCard =
() => {

  const [
    syncing,
    setSyncing,
  ] = useState(false);

  const [
    result,
    setResult,
  ] = useState<number | null>(
    null
  );

  async function handleSync() {

    try {

      setSyncing(true);

      const data =
        await SyncService.sync();

      setResult(
        data.synced
      );

    } finally {

      setSyncing(false);
    }
  }

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-6
        space-y-4
      "
    >
      <div>

        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Synchronisation Offline
        </h2>

        <p
          className="
            text-gray-500
            mt-1
          "
        >
          Synchronisation locale
        </p>
      </div>

      <button
        onClick={handleSync}
        disabled={syncing}
        className="
          bg-black
          text-white
          px-4
          py-3
          rounded-xl
        "
      >
        {
          syncing
            ? "Synchronisation..."
            : "Synchroniser"
        }
      </button>

      {result !== null && (

        <div
          className="
            text-sm
            text-gray-600
          "
        >
          {
            result
          }
          {" "}
          actions synchronisées
        </div>
      )}
    </div>
  );
};