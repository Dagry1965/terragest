/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, suffix) {
  if (!fs.existsSync(file)) return;

  const target = `${file}.bak-${suffix}`;

  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.replace(from, to);
}

function patchProcessGuards() {
  const file = p("src", "runtime", "guards", "processRuntimeBeforeMutationGuards.ts");

  backup(file, "q18h2a-mutation-context");

  let content = read(file);

  content = replaceOnce(
    content,
    `export interface RuntimeBeforeMutationGuardContext {
  operation: "create" | "update";
  id?: string;
}`,
    `export interface RuntimeBeforeMutationGuardContext {
  operation: "create" | "update";
  id?: string;
  systemMutation?: boolean;
  mutationSource?: string;
}`,
    "extend guard context"
  );

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchFirestoreMutation() {
  const file = p("src", "runtime", "firestore", "FirestoreRuntimeMutation.ts");

  backup(file, "q18h2a-mutation-context");

  let content = read(file);

  if (!content.includes("export interface RuntimeMutationOptions")) {
    content = replaceOnce(
      content,
      `export class FirestoreRuntimeMutation {`,
      `export interface RuntimeMutationOptions {
  systemMutation?: boolean;
  mutationSource?: string;
}

export class FirestoreRuntimeMutation {`,
      "add mutation options interface"
    );
  }

  content = replaceOnce(
    content,
    `  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {`,
    `  static async create(
    module: ERPModule,
    data: Record<string, unknown>,
    options: RuntimeMutationOptions = {}
  ) {`,
    "extend create signature"
  );

  content = replaceOnce(
    content,
    `        {
          operation: "create",
        }`,
    `        {
          operation: "create",
          systemMutation: options.systemMutation,
          mutationSource: options.mutationSource,
        }`,
    "pass create options to guards"
  );

  content = replaceOnce(
    content,
    `  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {`,
    `  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>,
    options: RuntimeMutationOptions = {}
  ) {`,
    "extend update signature"
  );

  content = replaceOnce(
    content,
    `        {
          operation: "update",
          id,
        }`,
    `        {
          operation: "update",
          id,
          systemMutation: options.systemMutation,
          mutationSource: options.mutationSource,
        }`,
    "pass update options to guards"
  );

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchRuntimeDataBinding() {
  const file = p("src", "runtime", "data-binding", "RuntimeDataBinding.ts");

  backup(file, "q18h2a-mutation-context");

  let content = read(file);

  if (!content.includes("RuntimeMutationOptions")) {
    content = replaceOnce(
      content,
      `import {
  FirestoreRuntimeQuery,
  FirestoreRuntimeMutation,
} from "@/runtime/firestore";`,
      `import {
  FirestoreRuntimeQuery,
  FirestoreRuntimeMutation,
  type RuntimeMutationOptions,
} from "@/runtime/firestore";`,
      "import mutation options"
    );
  }

  content = replaceOnce(
    content,
    `  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.create(
      module,
      data
    );
  }`,
    `  static async create(
    module: ERPModule,
    data: Record<string, unknown>,
    options: RuntimeMutationOptions = {}
  ) {
    return FirestoreRuntimeMutation.create(
      module,
      data,
      options
    );
  }`,
    "extend RuntimeDataBinding.create"
  );

  content = replaceOnce(
    content,
    `  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.update(
      module,
      id,
      data
    );
  }`,
    `  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>,
    options: RuntimeMutationOptions = {}
  ) {
    return FirestoreRuntimeMutation.update(
      module,
      id,
      data,
      options
    );
  }`,
    "extend RuntimeDataBinding.update"
  );

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchBusinessRules() {
  const file = p("src", "runtime", "business-rules", "runtimeBusinessRules.ts");

  backup(file, "q18h2a-mutation-context");

  let content = read(file);

  content = content.replace(
    `          dernierEncaissementAt:
            new Date().toISOString(),
        }
      );`,
    `          dernierEncaissementAt:
            new Date().toISOString(),
        },
        {
          systemMutation: true,
          mutationSource: "runtime:billing",
        }
      );`
  );

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function main() {
  console.log("");
  console.log("[PASS] 2N-Q18H2-A - Add mutation system context");

  patchProcessGuards();
  patchFirestoreMutation();
  patchRuntimeDataBinding();
  patchBusinessRules();

  console.log("");
  console.log("[Q18H2A_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester encaissement -> facture recalculée");
}

main();