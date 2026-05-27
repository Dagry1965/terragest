import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import type {
  PublicRuntimeReadFieldPolicy,
  PublicRuntimeReadListInput,
  PublicRuntimeReadListResult,
  PublicRuntimeRecord,
} from "./PublicRuntimeReadTypes";

function getModuleKey(input: PublicRuntimeReadListInput): string {
  return (
    input.module.metadata?.key ??
    input.module.schema?.collection ??
    "unknown"
  );
}

function getCollection(input: PublicRuntimeReadListInput): string {
  return input.module.schema.collection;
}

function sanitizeRecord(
  record: PublicRuntimeRecord,
  policy?: PublicRuntimeReadFieldPolicy
): PublicRuntimeRecord {
  const deniedFields = new Set([
    "password",
    "secret",
    "token",
    "accessToken",
    "refreshToken",
    "privateKey",
    "apiKey",
    "codeClient",
    "clientSecret",
    ...(policy?.deniedFields ?? []),
  ]);

  const allowedFields =
    policy?.allowedFields && policy.allowedFields.length > 0
      ? new Set(policy.allowedFields)
      : null;

  const next: PublicRuntimeRecord = {};

  for (const [key, value] of Object.entries(record)) {
    if (deniedFields.has(key)) {
      continue;
    }

    if (allowedFields && !allowedFields.has(key)) {
      continue;
    }

    if (value === undefined) {
      continue;
    }

    next[key] = value;
  }

  return next;
}

export class PublicRuntimeReadAdapter {
  static async list(
    input: PublicRuntimeReadListInput
  ): Promise<PublicRuntimeReadListResult> {
    const records =
      (await RuntimeDataBinding.list(
        input.module,
        input.context ?? {}
      )) as PublicRuntimeRecord[];

    const sanitizedRecords =
      records.map((record) =>
        sanitizeRecord(
          record,
          input.policy
        )
      );

    return {
      ok: true,
      moduleKey: getModuleKey(input),
      collection: getCollection(input),
      records: sanitizedRecords,
      count: sanitizedRecords.length,
    };
  }
}
