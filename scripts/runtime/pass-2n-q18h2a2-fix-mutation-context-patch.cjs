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

function patchRuntimeDataBinding() {
  const file = p("src", "runtime", "data-binding", "RuntimeDataBinding.ts");

  backup(file, "q18h2a2-fix-mutation-context");

  let content = read(file);

  if (!content.includes("RuntimeMutationOptions")) {
    content = content.replace(
      `import {
  FirestoreRuntimeQuery,
  FirestoreRuntimeMutation,
} from "@/runtime/firestore";`,
      `import {
  FirestoreRuntimeQuery,
  FirestoreRuntimeMutation,
} from "@/runtime/firestore";

import type {
  RuntimeMutationOptions,
} from "@/runtime/firestore/FirestoreRuntimeMutation";`
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

  backup(file, "q18h2a2-fix-mutation-context");

  let content = read(file);

  const oldBlock = `          dernierEncaissementAt:
            new Date().toISOString(),
        }
      );`;

  const newBlock = `          dernierEncaissementAt:
            new Date().toISOString(),
        },
        {
          systemMutation: true,
          mutationSource: "runtime:billing",
        }
      );`;

  let count = 0;

  while (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
    count += 1;
  }

  if (count === 0 && !content.includes(`mutationSource: "runtime:billing"`)) {
    throw new Error("[business rules billing mutation context] pattern introuvable");
  }

  console.log(`[PATCHED] runtime:billing update contexts: ${count}`);

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function main() {
  console.log("");
  console.log("[PASS] 2N-Q18H2-A2 - Fix mutation context patch");

  patchRuntimeDataBinding();
  patchBusinessRules();

  console.log("");
  console.log("[Q18H2A2_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester encaissement -> facture recalculée");
}

main();