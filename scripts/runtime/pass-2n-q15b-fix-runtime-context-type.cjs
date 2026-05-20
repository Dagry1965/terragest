const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const target = path.join(
  ROOT,
  "src",
  "runtime",
  "context",
  "RuntimeContextEnforcer.ts"
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
`    return cleanRuntimeRecord({
      tenantId: context.tenantId,
      workspace: context.workspace,
      moduleKey,
      contextPath:
        RuntimeContextEnforcer.buildContextPath(
          context,
          module
        ),
      userId: context.userId,
      parentModuleKey:
        options?.parent?.parentModuleKey,
      parentRecordId:
        options?.parent?.parentRecordId,
      parentForeignKey:
        options?.parent?.parentForeignKey,
    }) as RuntimeRecordContext;`,
`    const recordContext: RuntimeRecordContext = {
      tenantId: context.tenantId,
      workspace: context.workspace,
      moduleKey,
      contextPath:
        RuntimeContextEnforcer.buildContextPath(
          context,
          module
        ),
      ...(context.userId
        ? { userId: context.userId }
        : {}),
      ...(options?.parent?.parentModuleKey
        ? { parentModuleKey: options.parent.parentModuleKey }
        : {}),
      ...(options?.parent?.parentRecordId
        ? { parentRecordId: options.parent.parentRecordId }
        : {}),
      ...(options?.parent?.parentForeignKey
        ? { parentForeignKey: options.parent.parentForeignKey }
        : {}),
    };

    return recordContext;`,
  "buildRecordContext return"
);

writeFile(target, content);

console.log("");
console.log("[OK] Type RuntimeRecordContext corrigé.");
console.log("");
console.log("Prochaines commandes :");
console.log("node .\\\\scripts\\\\runtime\\\\check-encoding.cjs");
console.log("pnpm build");