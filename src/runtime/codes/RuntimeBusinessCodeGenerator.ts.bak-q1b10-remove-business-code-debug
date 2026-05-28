import type { ERPModule } from "@/runtime/modules";

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
