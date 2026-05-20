const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const target = path.join(
  ROOT,
  "src",
  "runtime",
  "firestore",
  "FirestoreRuntimeMutation.ts"
);

function assertProjectRoot() {
  if (
    !fs.existsSync(path.join(ROOT, "package.json")) ||
    !fs.existsSync(path.join(ROOT, "src"))
  ) {
    throw new Error("Ce script doit être lancé depuis la racine du projet Terragest.");
  }
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content.replace(/\r\n/g, "\n"), {
    encoding: "utf8",
  });
  console.log("[WRITTEN] " + path.relative(ROOT, filePath));
}

function replaceOnce(content, search, replacement, label) {
  if (!content.includes(search)) {
    throw new Error("Bloc introuvable : " + label);
  }

  return content.replace(search, replacement);
}

assertProjectRoot();

let content = readFile(target);

content = replaceOnce(
  content,
`import {
  ERPSessionContext,
} from "@/runtime/security/sessions/ERPSessionContext";

import {
  processRuntimeBeforeMutationGuards,
} from "@/runtime/guards/processRuntimeBeforeMutationGuards";
`,
`import {
  processRuntimeBeforeMutationGuards,
} from "@/runtime/guards/processRuntimeBeforeMutationGuards";

import {
  RuntimeContextEnforcer,
} from "@/runtime/context";
`,
  "imports"
);

content = replaceOnce(
  content,
`function applyRuntimeIsolation(
  module: ERPModule,
  data: Record<string, unknown>
) {
  const session =
    ERPSessionContext.current();

  return sanitizeFirestoreData({
    ...data,

    tenantId:
      data.tenantId ??
      session.tenantId ??
      "default",

    workspace:
      data.workspace ??
      module.metadata.category ??
      "general",

    moduleKey:
      module.metadata.key,

    userId:
      data.userId ??
      session.userId ??
      "system",
  });
}

`,
`function enforceRuntimeWriteContext(
  module: ERPModule,
  data: Record<string, unknown>
) {
  return sanitizeFirestoreData(
    RuntimeContextEnforcer.enforceWriteContext(
      module,
      data
    )
  );
}

`,
  "applyRuntimeIsolation replacement"
);

content = content.replaceAll(
`applyRuntimeIsolation(
        module,
        data
      )`,
`enforceRuntimeWriteContext(
        module,
        data
      )`
);

writeFile(target, content);

console.log("");
console.log("[OK] Q15C appliqué : RuntimeContextEnforcer branché sur create/update writes.");
console.log("");
console.log("Prochaines commandes :");
console.log("Select-String -Path .\\\\src\\\\runtime\\\\firestore\\\\FirestoreRuntimeMutation.ts -Pattern \"applyRuntimeIsolation|ERPSessionContext|RuntimeContextEnforcer|enforceRuntimeWriteContext\" -Context 3,3");
console.log("node .\\\\scripts\\\\runtime\\\\check-encoding.cjs");
console.log("pnpm build");