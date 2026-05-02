Write-Host "Generating Terragest Mobile Offline Engine..." -ForegroundColor Cyan

# =====================================================
# GO TO MOBILE APP
# =====================================================

Set-Location "mobile\terragest-mobile"

# =====================================================
# INSTALL STORAGE
# =====================================================

npm install @react-native-async-storage/async-storage

npm install expo-network

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\offline" -Force
mkdir "src\offline\services" -Force
mkdir "src\offline\hooks" -Force

# =====================================================
# OFFLINE STORAGE SERVICE
# =====================================================

$offlineStorage = @'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const OfflineStorageService = {

  async setItem(
    key: string,
    value: any
  ) {

    await AsyncStorage.setItem(
      key,
      JSON.stringify(value)
    );
  },

  async getItem(
    key: string
  ) {

    const value =
      await AsyncStorage.getItem(
        key
      );

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  },

  async removeItem(
    key: string
  ) {

    await AsyncStorage.removeItem(
      key
    );
  },
};
'@

Set-Content `
"src\offline\services\OfflineStorageService.ts" `
$offlineStorage

# =====================================================
# OFFLINE QUEUE SERVICE
# =====================================================

$offlineQueue = @'
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
'@

Set-Content `
"src\offline\services\OfflineQueueService.ts" `
$offlineQueue

# =====================================================
# NETWORK STATUS HOOK
# =====================================================

$networkHook = @'
import {
  useEffect,
  useState,
} from "react";

import * as Network from "expo-network";

export const useNetworkStatus =
  () => {

    const [isConnected,
      setIsConnected] =
      useState(true);

    useEffect(() => {

      checkNetwork();

      const interval =
        setInterval(
          checkNetwork,
          5000
        );

      return () =>
        clearInterval(interval);

    }, []);

    const checkNetwork =
      async () => {

        const state =
          await Network.getNetworkStateAsync();

        setIsConnected(
          !!state.isConnected
        );
      };

    return {
      isConnected,
    };
  };
'@

Set-Content `
"src\offline\hooks\useNetworkStatus.ts" `
$networkHook

# =====================================================
# SYNC ENGINE
# =====================================================

$syncEngine = @'
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
'@

Set-Content `
"src\offline\services\SyncEngine.ts" `
$syncEngine

# =====================================================
# OFFLINE BADGE
# =====================================================

$offlineBadge = @'
interface OfflineBadgeProps {

  offline: boolean;
}

export const OfflineBadge = ({
  offline,
}: OfflineBadgeProps) => {

  if (!offline) {
    return null;
  }

  return (

    <div
      style={{
        backgroundColor:
          "#dc2626",

        padding: 10,

        borderRadius: 12,
      }}
    >

      <p
        style={{
          color: "white",
          fontWeight: "bold",
        }}
      >
        MODE OFFLINE
      </p>

    </div>
  );
}
'@

Set-Content `
"src\components\OfflineBadge.tsx" `
$offlineBadge

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Mobile Offline Engine generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Offline storage"
Write-Host "- Offline queue"
Write-Host "- Sync engine"
Write-Host "- Network monitoring"
Write-Host "- Mobile offline foundation"
Write-Host ""