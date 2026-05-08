$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)

  [System.IO.File]::WriteAllText(
    $fullPath,
    $Content,
    $utf8NoBom
  )

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Host "=== FIRESTORE RUNTIME INTEGRATION ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\runtime\firestore" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\runtime\firebase" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\realtime" | Out-Null

WriteFile "src\runtime\firebase\runtime-firestore.ts" @'
import { initializeApp, getApps } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,

  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp(firebaseConfig);

export const runtimeFirestore =
  getFirestore(app);
'@

WriteFile "src\runtime\firestore\FirestoreRuntimeRepository.ts" @'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import type { ERPModule } from "@/runtime/modules";

import type {
  RuntimeRecord,
} from "@/runtime/data-binding";

import {
  runtimeFirestore,
} from "@/runtime/firebase/runtime-firestore";

export class FirestoreRuntimeRepository {

  static async findMany(
    module: ERPModule
  ): Promise<RuntimeRecord[]> {

    const snapshot =
      await getDocs(
        collection(
          runtimeFirestore,
          module.schema.collection
        )
      );

    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
  }

  static async findById(
    module: ERPModule,
    id: string
  ): Promise<RuntimeRecord | null> {

    const snapshot =
      await getDoc(
        doc(
          runtimeFirestore,
          module.schema.collection,
          id
        )
      );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  }

  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {

    const result =
      await addDoc(
        collection(
          runtimeFirestore,
          module.schema.collection
        ),
        {
          ...data,
          createdAt: Date.now(),
        }
      );

    return {
      id: result.id,
      ...data,
    };
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {

    await updateDoc(
      doc(
        runtimeFirestore,
        module.schema.collection,
        id
      ),
      {
        ...data,
        updatedAt: Date.now(),
      }
    );

    return {
      id,
      ...data,
    };
  }
}
'@

WriteFile "src\runtime\firestore\FirestoreRuntimeQuery.ts" @'
import type { ERPModule } from "@/runtime/modules";

import {
  FirestoreRuntimeRepository,
} from "./FirestoreRuntimeRepository";

export class FirestoreRuntimeQuery {

  static async list(
    module: ERPModule
  ) {
    return FirestoreRuntimeRepository.findMany(
      module
    );
  }

  static async detail(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeRepository.findById(
      module,
      id
    );
  }
}
'@

WriteFile "src\runtime\firestore\FirestoreRuntimeMutation.ts" @'
import type { ERPModule } from "@/runtime/modules";

import {
  FirestoreRuntimeRepository,
} from "./FirestoreRuntimeRepository";

export class FirestoreRuntimeMutation {

  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeRepository.create(
      module,
      data
    );
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeRepository.update(
      module,
      id,
      data
    );
  }
}
'@

WriteFile "src\runtime\firestore\FirestoreRuntimeRealtime.ts" @'
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import type { ERPModule } from "@/runtime/modules";

import {
  runtimeFirestore,
} from "@/runtime/firebase/runtime-firestore";

export class FirestoreRuntimeRealtime {

  static subscribe(
    module: ERPModule,
    callback: (
      count: number
    ) => void
  ) {

    return onSnapshot(
      collection(
        runtimeFirestore,
        module.schema.collection
      ),
      (snapshot) => {
        callback(snapshot.size);
      }
    );
  }
}
'@

WriteFile "src\runtime\firestore\index.ts" @'
export {
  FirestoreRuntimeRepository,
} from "./FirestoreRuntimeRepository";

export {
  FirestoreRuntimeQuery,
} from "./FirestoreRuntimeQuery";

export {
  FirestoreRuntimeMutation,
} from "./FirestoreRuntimeMutation";

export {
  FirestoreRuntimeRealtime,
} from "./FirestoreRuntimeRealtime";
'@

WriteFile "src\components\erp\realtime\ERPRealtimeSyncBadge.tsx" @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ERPBadge,
} from "@/components/erp/ui";

import type {
  ERPModule,
} from "@/runtime/modules";

import {
  FirestoreRuntimeRealtime,
} from "@/runtime/firestore";

interface ERPRealtimeSyncBadgeProps {
  module: ERPModule;
}

export function ERPRealtimeSyncBadge({
  module,
}: ERPRealtimeSyncBadgeProps) {

  const [count, setCount] =
    useState<number>(0);

  useEffect(() => {

    const unsubscribe =
      FirestoreRuntimeRealtime.subscribe(
        module,
        (value) => {
          setCount(value);
        }
      );

    return () => {
      unsubscribe();
    };

  }, [module]);

  return (
    <ERPBadge tone="success">
      Live {count}
    </ERPBadge>
  );
}
'@

WriteFile "src\components\erp\realtime\index.ts" @'
export {
  ERPRealtimeSyncBadge,
} from "./ERPRealtimeSyncBadge";
'@

WriteFile "src\runtime\data-binding\RuntimeDataBinding.ts" @'
import type {
  ERPModule,
} from "@/runtime/modules";

import {
  FirestoreRuntimeQuery,
  FirestoreRuntimeMutation,
} from "@/runtime/firestore";

export class RuntimeDataBinding {

  static async list(
    module: ERPModule
  ) {
    return FirestoreRuntimeQuery.list(
      module
    );
  }

  static async detail(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeQuery.detail(
      module,
      id
    );
  }

  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.create(
      module,
      data
    );
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.update(
      module,
      id,
      data
    );
  }
}
'@

WriteFile "src\components\erp\datatable\ERPEnterpriseDataTable.tsx" @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ERPBadge,
} from "@/components/erp/ui";

import type {
  ERPModule,
} from "@/runtime/modules";

import {
  ERPModuleBuilder,
} from "@/runtime/modules";

import {
  RuntimeDataBinding,
  type RuntimeRecord,
} from "@/runtime/data-binding";

import {
  ERPRuntimeFieldValue,
} from "@/components/erp/runtime/ERPRuntimeFieldValue";

import {
  ERPRowActions,
} from "@/components/erp/actions";

import {
  ERPRealtimeSyncBadge,
} from "@/components/erp/realtime";

interface ERPEnterpriseDataTableProps {
  module: ERPModule;
}

export function ERPEnterpriseDataTable({
  module,
}: ERPEnterpriseDataTableProps) {

  const [rows, setRows] =
    useState<RuntimeRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    RuntimeDataBinding.list(
      module
    ).then((records) => {

      setRows(records);

      setLoading(false);
    });

  }, [module]);

  const table =
    ERPModuleBuilder.buildTable(
      module
    );

  const columns =
    table.columns.map((column) => {

      const field =
        module.schema.fields.find(
          (item) =>
            item.key === column.key
        );

      return {
        key: column.key,
        label: column.label,

        render: (
          row: RuntimeRecord
        ) =>
          field ? (
            <ERPRuntimeFieldValue
              field={field}
              value={row[column.key]}
            />
          ) : (
            String(
              row[column.key] ?? ""
            )
          ),
      };
    });

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h3 className="text-xl font-black text-slate-950">
            Registre operationnel
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Donnees synchronisees avec Firestore runtime.
          </p>

        </div>

        <div className="flex gap-2">

          <ERPBadge tone="success">
            {loading
              ? "Chargement"
              : `${rows.length} lignes`}
          </ERPBadge>

          <ERPRealtimeSyncBadge
            module={module}
          />

        </div>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse text-left text-sm">

          <thead>

            <tr className="border-b border-slate-200 bg-white">

              {columns.map((column) => (

                <th
                  key={String(column.key)}
                  className="whitespace-nowrap px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500"
                >
                  {column.label}
                </th>

              ))}

              <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wide text-slate-500">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {loading ? (

              <tr>

                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-10 text-center text-sm font-medium text-slate-500"
                >
                  Chargement Firestore...
                </td>

              </tr>

            ) : (

              rows.map((row) => (

                <tr
                  key={row.id}
                  className="transition hover:bg-blue-50/70"
                >

                  {columns.map((column) => (

                    <td
                      key={String(column.key)}
                      className="whitespace-nowrap px-6 py-4 font-medium text-slate-700"
                    >
                      {column.render(row)}
                    </td>

                  ))}

                  <td className="whitespace-nowrap px-6 py-4 text-right">

                    <ERPRowActions
                      module={module}
                      id={row.id}
                    />

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
'@

Set-Location $projectRoot

pnpm build

Write-Host ""
Write-Host "=== FIRESTORE RUNTIME INTEGRATION TERMINE ===" -ForegroundColor Green