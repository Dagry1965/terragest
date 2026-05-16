$ErrorActionPreference = "Stop"

$path = "C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx"

$content =
[System.IO.File]::ReadAllText($path)

# ---------------------------------------------------
# IMPORT useEffect/useState
# ---------------------------------------------------

$content = $content.Replace(
'import Link from "next/link";',
'import Link from "next/link";
import { useEffect, useState } from "react";'
)

# ---------------------------------------------------
# IMPORT RuntimeDataBinding
# ---------------------------------------------------

$content = $content.Replace(
'import {
  RuntimeActionEngine,
} from "@/runtime/actions/RuntimeActionEngine";',
'import {
  RuntimeActionEngine,
} from "@/runtime/actions/RuntimeActionEngine";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding/RuntimeDataBinding";'
)

# ---------------------------------------------------
# INSERT runtime loading
# ---------------------------------------------------

$old = @'
const runtimeActions =
  RuntimeActionEngine.getAvailableActions({
    actions: module?.actions ?? [],
    userPermissions: ["*"],
    workflow: module?.workflows?.[0],
    record,
  });
'@

$new = @'
const runtimeActions =
  RuntimeActionEngine.getAvailableActions({
    actions: module?.actions ?? [],
    userPermissions: ["*"],
    workflow: module?.workflows?.[0],
    record,
  });

const [runtimeData, setRuntimeData] =
  useState<Record<string, unknown>[]>(
    data
  );

const [loading, setLoading] =
  useState(false);

useEffect(() => {

  async function loadData() {

    if (
      type !== "list" ||
      !module
    ) {
      return;
    }

    try {

      setLoading(true);

      const rows =
        await RuntimeDataBinding.list(
          module
        );

      setRuntimeData(rows);

    } catch (error) {

      console.error(
        "[RUNTIME LIST LOAD ERROR]",
        error
      );

    } finally {

      setLoading(false);

    }
  }

  loadData();

}, [module, type]);
'@

$content = $content.Replace(
  $old,
  $new
)

# ---------------------------------------------------
# REPLACE TABLE DATA
# ---------------------------------------------------

$content = $content.Replace(
'data={data}',
'data={runtimeData}'
)

[System.IO.File]::WriteAllText(
  $path,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host ""
Write-Host "OK - ERPRuntimePage runtime loading enabled."