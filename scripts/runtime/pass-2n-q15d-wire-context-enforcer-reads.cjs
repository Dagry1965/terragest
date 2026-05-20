const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src",
  "runtime",
  "firestore",
  "FirestoreRuntimeQuery.ts"
);

function assertProjectRoot() {
  if (
    !fs.existsSync(path.join(ROOT, "package.json")) ||
    !fs.existsSync(path.join(ROOT, "src"))
  ) {
    throw new Error("Ce script doit être lancé depuis la racine du projet Terragest.");
  }
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content.replace(/\r\n/g, "\n"), {
    encoding: "utf8",
  });

  console.log("[WRITTEN] " + path.relative(ROOT, filePath));
}

assertProjectRoot();

const content = `import type {
  ERPModule,
} from "@/runtime/modules";

import {
  RuntimeContextEnforcer,
} from "@/runtime/context";

import {
  FirestoreRuntimeRepository,
} from "./FirestoreRuntimeRepository";

export class FirestoreRuntimeQuery {
  static async list(
    module: ERPModule
  ) {
    const records =
      await FirestoreRuntimeRepository.findMany(
        module
      );

    return RuntimeContextEnforcer.filterReadContext(
      module,
      records
    );
  }

  static async detail(
    module: ERPModule,
    id: string
  ) {
    const record =
      await FirestoreRuntimeRepository.findById(
        module,
        id
      );

    if (!record) {
      return null;
    }

    RuntimeContextEnforcer.assertRecordInContext(
      module,
      record
    );

    return record;
  }
}
`;

writeFile(target, content);

console.log("");
console.log("[OK] Q15D appliqué : RuntimeContextEnforcer branché sur les reads.");
console.log("");
console.log("Prochaines commandes :");
console.log("Select-String -Path .\\\\src\\\\runtime\\\\firestore\\\\FirestoreRuntimeQuery.ts -Pattern \"RuntimeContextEnforcer|filterReadContext|assertRecordInContext|findMany|findById\" -Context 3,3");
console.log("node .\\\\scripts\\\\runtime\\\\check-encoding.cjs");
console.log("pnpm build");