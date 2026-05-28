const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("[WRITTEN]", rel);
}

function backup(rel, suffix) {
  const full = path.join(ROOT, rel);
  const bak = full + suffix;
  fs.writeFileSync(bak, fs.readFileSync(full, "utf8"), "utf8");
  console.log("[BACKUP]", path.relative(ROOT, bak));
}

/**
 * Q1-B2/B3/B4/B5
 * Runtime business codes:
 * - metadata businessCode
 * - Firestore sequence repository transactionnel
 * - generator PREFIX-YEAR-000001
 * - global create mutation hook
 */

const erpModuleRel = "src/runtime/modules/ERPModule.ts";
backup(erpModuleRel, ".bak-q1b-business-code-metadata");

let erpModule = read(erpModuleRel);

if (!erpModule.includes("export interface ERPBusinessCodeConfig")) {
  erpModule = erpModule.replace(
    `export interface ERPCompositionBreadcrumb {`,
    `export interface ERPBusinessCodeConfig {
  field: string;
  prefix: string;
  sequenceScope?: "year" | "global";
  padLength?: number;
  readonly?: boolean;
  required?: boolean;
}

export interface ERPCompositionBreadcrumb {`
  );
}

if (!erpModule.includes("businessCode?: ERPBusinessCodeConfig;")) {
  erpModule = erpModule.replace(
    /export interface ERPModuleMetadata \{([\s\S]*?)\n\}/,
    (match) => {
      if (match.includes("businessCode?: ERPBusinessCodeConfig;")) return match;
      return match.replace(/\n\}/, `\n  businessCode?: ERPBusinessCodeConfig;\n}`);
    }
  );
}

write(erpModuleRel, erpModule);

write(
  "src/runtime/codes/RuntimeBusinessSequenceRepository.ts",
  `import {
  doc,
  runTransaction,
} from "firebase/firestore";

import { runtimeFirestore } from "@/runtime/firebase/runtime-firestore";

export type RuntimeBusinessSequenceInput = {
  tenantId: string;
  workspaceId: string;
  moduleKey: string;
  year: number;
};

function sanitizeSegment(value: string): string {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "") || "default";
}

export class RuntimeBusinessSequenceRepository {
  static collectionName = "runtimeBusinessSequences";

  static buildSequenceId(input: RuntimeBusinessSequenceInput): string {
    return [
      sanitizeSegment(input.tenantId),
      sanitizeSegment(input.workspaceId),
      sanitizeSegment(input.moduleKey),
      String(input.year),
    ].join("__");
  }

  static async next(input: RuntimeBusinessSequenceInput): Promise<number> {
    const sequenceId = this.buildSequenceId(input);
    const ref = doc(runtimeFirestore, this.collectionName, sequenceId);

    return runTransaction(runtimeFirestore, async (transaction) => {
      const snapshot = await transaction.get(ref);
      const current = snapshot.exists()
        ? Number(snapshot.data().current ?? 0)
        : 0;

      const nextValue = current + 1;
      const now = Date.now();

      transaction.set(
        ref,
        {
          tenantId: input.tenantId,
          workspaceId: input.workspaceId,
          moduleKey: input.moduleKey,
          year: input.year,
          current: nextValue,
          updatedAt: now,
          createdAt: snapshot.exists()
            ? snapshot.data().createdAt ?? now
            : now,
        },
        { merge: true }
      );

      return nextValue;
    });
  }
}
`
);

write(
  "src/runtime/codes/RuntimeBusinessCodeGenerator.ts",
  `import type { ERPModule } from "@/runtime/modules";

import {
  RuntimeBusinessSequenceRepository,
} from "./RuntimeBusinessSequenceRepository";

type RuntimeBusinessCodeInput = {
  module: ERPModule;
  data: Record<string, unknown>;
};

function asText(value: unknown, fallback = ""): string {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function getYear(): number {
  return new Date().getFullYear();
}

function padSequence(value: number, padLength: number): string {
  return String(value).padStart(padLength, "0");
}

export class RuntimeBusinessCodeGenerator {
  static async apply(
    input: RuntimeBusinessCodeInput
  ): Promise<Record<string, unknown>> {
    const config = input.module.metadata.businessCode;

    if (!config?.field || !config.prefix) {
      return input.data;
    }

    const existing = asText(input.data[config.field]);

    if (existing) {
      return input.data;
    }

    const tenantId = asText(input.data.tenantId, "runtime");
    const workspaceId =
      asText(input.data.workspaceId) ||
      asText(input.data.workspace, "default");

    const year = getYear();

    const sequence = await RuntimeBusinessSequenceRepository.next({
      tenantId,
      workspaceId,
      moduleKey: input.module.metadata.key,
      year,
    });

    const code = [
      config.prefix,
      String(year),
      padSequence(sequence, config.padLength ?? 6),
    ].join("-");

    return {
      ...input.data,
      [config.field]: code,
    };
  }
}
`
);

write(
  "src/runtime/codes/index.ts",
  `export { RuntimeBusinessCodeGenerator } from "./RuntimeBusinessCodeGenerator";
export { RuntimeBusinessSequenceRepository } from "./RuntimeBusinessSequenceRepository";
`
);

const mutationRel = "src/runtime/firestore/FirestoreRuntimeMutation.ts";
backup(mutationRel, ".bak-q1b-apply-business-code");

let mutation = read(mutationRel);

if (!mutation.includes("@/runtime/codes")) {
  mutation = mutation.replace(
    /import \{([\s\S]*?)\} from "\.\/FirestoreRuntimeRepository";/,
    `import {$1} from "./FirestoreRuntimeRepository";
import { RuntimeBusinessCodeGenerator } from "@/runtime/codes";`
  );
}

if (!mutation.includes("const businessCodedData =")) {
  mutation = mutation.replace(
    `    const guardedData =
      await processRuntimeBeforeMutationGuards(
        module,
        computedData,
        {`,
    `    const businessCodedData =
      await RuntimeBusinessCodeGenerator.apply({
        module,
        data: computedData,
      });

    const guardedData =
      await processRuntimeBeforeMutationGuards(
        module,
        businessCodedData,
        {`
  );

  mutation = mutation.replace(
    `          tenantId: asRuntimeTenantId(computedData),
          workspaceId: asRuntimeWorkspaceId(computedData),`,
    `          tenantId: asRuntimeTenantId(businessCodedData),
          workspaceId: asRuntimeWorkspaceId(businessCodedData),`
  );
}

write(mutationRel, mutation);

console.log("");
console.log("[DONE] Q1-B foundation business codes runtime added.");
console.log("");
console.log("Next:");
console.log("pnpm build");
