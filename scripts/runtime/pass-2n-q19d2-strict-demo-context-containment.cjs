const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(file(relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(file(relativePath), content, {
    encoding: "utf8",
  });
  console.log(`[WRITTEN] ${relativePath}`);
}

function backup(relativePath, suffix) {
  const source = file(relativePath);
  const target = file(`${relativePath}.bak-${suffix}`);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing file: ${relativePath}`);
  }

  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log(`[BACKUP] ${relativePath}.bak-${suffix}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${relativePath}.bak-${suffix}`);
  }
}

function replaceRegexRequired(content, regex, replacement, label) {
  if (!regex.test(content)) {
    throw new Error(`Pattern not found: ${label}`);
  }

  return content.replace(regex, replacement);
}

const suffix = "q19d2-strict-demo-context-containment";

// 1. clientsauto : collection canonique uniquement.
// Si c'est déjà corrigé, on ne bloque pas.
{
  const target = "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts";

  backup(target, suffix);

  let content = read(target);

  const aliasRegex =
    /clientsauto:\s*\[[\s\S]*?\],\s*vehicules:/m;

  if (!aliasRegex.test(content)) {
    throw new Error("Bloc clientsauto introuvable dans relationCollectionAliases");
  }

  content = content.replace(
    aliasRegex,
    `clientsauto: [
    "clientsauto",
  ],
  vehicules:`
  );

  write(target, content);
}

// 2. RuntimeContextEnforcer : strict reads pour non admin.
{
  const target = "src/runtime/context/RuntimeContextEnforcer.ts";

  backup(target, suffix);

  let content = read(target);

  const replacement = `  static isRecordInContext(
    module: ERPModule,
    record: RuntimeRecord,
    options?: RuntimeContextOptions
  ): boolean {
    const session =
      ERPSessionContext.current();

    const context =
      RuntimeContextEnforcer.getCurrentContext(
        module,
        options
      );

    const moduleKey =
      RuntimeContextEnforcer.resolveModuleKey(module);

    const recordTenantId =
      valueOf(record, "tenantId");

    const recordWorkspace =
      valueOf(record, "workspace");

    const recordModuleKey =
      valueOf(record, "moduleKey");

    const role =
      String(session.role ?? "").toLowerCase();

    const isPrivileged =
      role === "admin" ||
      role === "super_admin" ||
      role === "superadmin";

    if (
      isPrivileged
    ) {
      return true;
    }

    if (
      !recordTenantId ||
      recordTenantId !== context.tenantId
    ) {
      return false;
    }

    if (
      !recordWorkspace ||
      recordWorkspace !== context.workspace
    ) {
      return false;
    }

    if (
      !recordModuleKey ||
      recordModuleKey !== moduleKey
    ) {
      return false;
    }

    return true;
  }`;

  content = replaceRegexRequired(
    content,
    /  static isRecordInContext\(\s*module: ERPModule,\s*record: RuntimeRecord,\s*options\?: RuntimeContextOptions\s*\): boolean \{[\s\S]*?\n  \}\n\n  static filterReadContext/m,
    `${replacement}

  static filterReadContext`,
    "RuntimeContextEnforcer.isRecordInContext"
  );

  write(target, content);
}

console.log("");
console.log("[Q19D2_DONE] Strict demo context containment installed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Tester demo@amarkhys.com:");
console.log("  - /vehicules");
console.log("  - /vehicules/nouveau dropdown Client");
console.log("  - véhicule detail/edit children rendezvous coherents");