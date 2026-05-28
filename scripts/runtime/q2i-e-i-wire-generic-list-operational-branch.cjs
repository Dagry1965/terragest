const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const filePath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "generic",
  "GenericListPage.tsx"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("GenericListPage.tsx not found");
}

let content = fs.readFileSync(filePath, "utf8");

const backupPath = filePath + ".bak-q2i-e-i-wire-operational-page";
fs.writeFileSync(backupPath, content, "utf8");

console.log("[BACKUP]", path.relative(ROOT, backupPath));

const newContent = `"use client";

import { useEffect, useState } from "react";

import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { ERPRuntimePage } from "@/components/erp/runtime/ERPRuntimePage";
import { ERPOperationalModulePage } from "@/components/erp/operational/ERPOperationalModulePage";

interface GenericListPageProps {
  moduleKey: string;
}

export function GenericListPage({ moduleKey }: GenericListPageProps) {
  const runtimeModule = allERPModules.find(
    (item) => item.metadata.key === moduleKey
  );

  const [operationalData, setOperationalData] = useState<Record<string, unknown>[]>([]);
  const [isLoadingOperationalData, setIsLoadingOperationalData] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadOperationalData() {
      if (!runtimeModule?.operational?.enabled) {
        setOperationalData([]);
        return;
      }

      setIsLoadingOperationalData(true);

      try {
        const records = await RuntimeDataBinding.list(runtimeModule);

        if (!cancelled) {
          setOperationalData(records as Record<string, unknown>[]);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingOperationalData(false);
        }
      }
    }

    void loadOperationalData();

    return () => {
      cancelled = true;
    };
  }, [runtimeModule]);

  if (!runtimeModule) {
    return <div className="p-6">Module introuvable.</div>;
  }

  if (runtimeModule.operational?.enabled) {
    if (isLoadingOperationalData) {
      return (
        <div className="p-6 text-sm font-semibold text-slate-500">
          Chargement de la vue opérationnelle...
        </div>
      );
    }

    return (
      <ERPOperationalModulePage
        module={runtimeModule}
        data={operationalData}
      />
    );
  }

  return <ERPRuntimePage module={runtimeModule} type="list" />;
}
`;

fs.writeFileSync(filePath, newContent, "utf8");

const updated = fs.readFileSync(filePath, "utf8");

const checks = [
  {
    label: "GenericListPage is client component",
    ok: updated.startsWith('"use client";'),
  },
  {
    label: "GenericListPage imports ERPOperationalModulePage",
    ok: updated.includes("ERPOperationalModulePage"),
  },
  {
    label: "GenericListPage imports RuntimeDataBinding",
    ok: updated.includes("RuntimeDataBinding"),
  },
  {
    label: "GenericListPage checks operational.enabled",
    ok: updated.includes("runtimeModule.operational?.enabled"),
  },
  {
    label: "GenericListPage loads operational data through RuntimeDataBinding.list",
    ok: updated.includes("RuntimeDataBinding.list(runtimeModule)"),
  },
  {
    label: "GenericListPage renders ERPOperationalModulePage for operational modules",
    ok: updated.includes("<ERPOperationalModulePage"),
  },
  {
    label: "GenericListPage keeps ERPRuntimePage fallback",
    ok: updated.includes('<ERPRuntimePage module={runtimeModule} type="list" />'),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-I-E-I] Wire GenericListPage operational branch");
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] GenericListPage operational branch wired.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
