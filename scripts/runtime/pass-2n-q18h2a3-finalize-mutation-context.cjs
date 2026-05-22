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

function patchRuntimeDataBinding() {
  const file = p("src", "runtime", "data-binding", "RuntimeDataBinding.ts");

  backup(file, "q18h2a3-finalize-mutation-context");

  const content = `import type {
  ERPModule,
} from "@/runtime/modules";

import {
  FirestoreRuntimeQuery,
  FirestoreRuntimeMutation,
} from "@/runtime/firestore";

import type {
  RuntimeMutationOptions,
} from "@/runtime/firestore/FirestoreRuntimeMutation";

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
    data: Record<string, unknown>,
    options: RuntimeMutationOptions = {}
  ) {
    return FirestoreRuntimeMutation.create(
      module,
      data,
      options
    );
  }

  static async update(
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
  }

  static async delete(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeMutation.delete(
      module,
      id
    );
  }
}
`;

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchBusinessRules() {
  const file = p("src", "runtime", "business-rules", "runtimeBusinessRules.ts");

  backup(file, "q18h2a3-finalize-mutation-context");

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

  console.log(`[PATCHED] runtime:billing contexts added: ${count}`);

  if (!content.includes(`mutationSource: "runtime:billing"`)) {
    throw new Error("[Q18H2A3] Aucun contexte runtime:billing trouvé après patch.");
  }

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function main() {
  console.log("");
  console.log("[PASS] 2N-Q18H2-A3 - Finalize mutation context");

  patchRuntimeDataBinding();
  patchBusinessRules();

  console.log("");
  console.log("[Q18H2A3_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester encaissement -> facture recalculée");
}

main();