import type {
  ERPModule,
} from "@/runtime/modules";

import type {
  RuntimeContextOptions,
} from "@/runtime/context";

export type PublicRuntimeRecord =
  Record<string, unknown>;

export type PublicRuntimeReadPurpose =
  | "availability"
  | "public-list"
  | "public-detail"
  | "public-lookup";

export type PublicRuntimeReadFieldPolicy = {
  allowedFields?: string[];
  deniedFields?: string[];
};

export type PublicRuntimeReadListInput = {
  module: ERPModule;
  context?: RuntimeContextOptions;
  purpose: PublicRuntimeReadPurpose;
  policy?: PublicRuntimeReadFieldPolicy;
};

export type PublicRuntimeReadListResult = {
  ok: true;
  moduleKey: string;
  collection: string;
  records: PublicRuntimeRecord[];
  count: number;
};
