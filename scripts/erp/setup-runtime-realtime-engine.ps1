$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$engineDir = Join-Path $root "src\runtime\realtime\engine"
$hooksDir = Join-Path $root "src\runtime\realtime\hooks"
$indexPath = Join-Path $root "src\runtime\realtime\index.ts"

New-Item -ItemType Directory -Path $engineDir -Force | Out-Null
New-Item -ItemType Directory -Path $hooksDir -Force | Out-Null

$enginePath = Join-Path $engineDir "RuntimeRealtimeEngine.ts"
$hookPath = Join-Path $hooksDir "useRuntimeRealtimeCollection.ts"

$engine = @'
import type { ERPModule } from "@/runtime/modules";
import { FirestoreRuntimeRealtime } from "@/runtime/firestore";

export type RuntimeRealtimeRecord = {
  id: string;
  [key: string]: unknown;
};

export type RuntimeRealtimeCallback = (
  records: RuntimeRealtimeRecord[]
) => void;

export class RuntimeRealtimeEngine {
  static subscribe(
    module: ERPModule,
    callback: RuntimeRealtimeCallback
  ) {
    return FirestoreRuntimeRealtime.subscribe(
      module,
      callback
    );
  }
}
'@

$hook = @'
"use client";

import { useEffect, useState } from "react";

import type { ERPModule } from "@/runtime/modules";
import {
  RuntimeRealtimeEngine,
  type RuntimeRealtimeRecord,
} from "@/runtime/realtime/engine/RuntimeRealtimeEngine";

export function useRuntimeRealtimeCollection(
  module?: ERPModule
) {
  const [records, setRecords] =
    useState<RuntimeRealtimeRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!module) {
      setRecords([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe =
      RuntimeRealtimeEngine.subscribe(
        module,
        (items) => {
          setRecords(items);
          setLoading(false);
        }
      );

    return () => {
      unsubscribe();
    };
  }, [module]);

  return {
    records,
    loading,
  };
}
'@

[System.IO.File]::WriteAllText(
  $enginePath,
  $engine,
  [System.Text.UTF8Encoding]::new($false)
)

[System.IO.File]::WriteAllText(
  $hookPath,
  $hook,
  [System.Text.UTF8Encoding]::new($false)
)

$index = [System.IO.File]::ReadAllText($indexPath)

if ($index -notmatch "RuntimeRealtimeEngine") {
  $index += "`nexport * from `"./engine/RuntimeRealtimeEngine`";`n"
}

if ($index -notmatch "useRuntimeRealtimeCollection") {
  $index += "export * from `"./hooks/useRuntimeRealtimeCollection`";`n"
}

[System.IO.File]::WriteAllText(
  $indexPath,
  $index,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host ""
Write-Host "RuntimeRealtimeEngine created" -ForegroundColor Green
Write-Host $enginePath -ForegroundColor Yellow
Write-Host $hookPath -ForegroundColor Yellow
Write-Host ""
Write-Host "Next:" -ForegroundColor Cyan
Write-Host "pnpm build"