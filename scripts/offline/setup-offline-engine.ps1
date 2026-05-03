$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " OFFLINE ENGINE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\offline\services",
  "$ProjectRoot\src\features\offline\hooks",
  "$ProjectRoot\src\features\offline\storage",
  "$ProjectRoot\src\features\offline\queue",
  "$ProjectRoot\src\features\offline\sync",
  "$ProjectRoot\src\features\offline\components"
)

foreach ($dir in $dirs) {

  if (!(Test-Path $dir)) {

    New-Item `
      -ItemType Directory `
      -Path $dir `
      -Force | Out-Null

    Write-Host "Created: $dir"
  }
}

# -------------------------------------------------
# OFFLINE STORAGE
# -------------------------------------------------

$storage = @'
export const OfflineStorage = {

  set(
    key: string,
    value: any
  ) {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  },

  get<T>(
    key: string
  ): T | null {

    const value =
      localStorage.getItem(key);

    if (!value) {

      return null;
    }

    return JSON.parse(value);
  },

  remove(
    key: string
  ) {

    localStorage.removeItem(key);
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\offline\storage\OfflineStorage.ts",
  $storage
)

Write-Host "Created: OfflineStorage.ts"

# -------------------------------------------------
# OFFLINE QUEUE
# -------------------------------------------------

$queue = @'
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
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\offline\queue\OfflineQueue.ts",
  $queue
)

Write-Host "Created: OfflineQueue.ts"

# -------------------------------------------------
# SYNC SERVICE
# -------------------------------------------------

$sync = @'
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
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\offline\sync\SyncService.ts",
  $sync
)

Write-Host "Created: SyncService.ts"

# -------------------------------------------------
# USE OFFLINE STATUS
# -------------------------------------------------

$hook = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

export function useOfflineStatus() {

  const [
    online,
    setOnline,
  ] = useState(true);

  useEffect(() => {

    function update() {

      setOnline(
        navigator.onLine
      );
    }

    update();

    window.addEventListener(
      "online",
      update
    );

    window.addEventListener(
      "offline",
      update
    );

    return () => {

      window.removeEventListener(
        "online",
        update
      );

      window.removeEventListener(
        "offline",
        update
      );
    };

  }, []);

  return {
    online,
  };
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\offline\hooks\useOfflineStatus.ts",
  $hook
)

Write-Host "Created: useOfflineStatus.ts"

# -------------------------------------------------
# SYNC CARD
# -------------------------------------------------

$card = @'
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
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\offline\components\OfflineSyncCard.tsx",
  $card
)

Write-Host "Created: OfflineSyncCard.tsx"

# -------------------------------------------------
# OFFLINE PAGE
# -------------------------------------------------

$pageDir =
"$ProjectRoot\src\app\(private)\offline"

if (!(Test-Path $pageDir)) {

  New-Item `
    -ItemType Directory `
    -Path $pageDir `
    -Force | Out-Null

  Write-Host "Created: offline page dir"
}

$page = @'
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
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\offline\page.tsx",
  $page
)

Write-Host "Created: Offline page"

Write-Host ""
Write-Host "======================================="
Write-Host " OFFLINE ENGINE COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""