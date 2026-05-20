const fs = require("fs");
const os = require("os");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "firestore",
  "FirestoreRuntimeMutation.ts"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

const backupDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "terragest-q11f-e-")
);

const backupFile = path.join(
  backupDir,
  "FirestoreRuntimeMutation.ts.bak"
);

let content = fs.readFileSync(file, "utf8");
fs.writeFileSync(backupFile, content, "utf8");

console.log("BACKUP:", backupFile);

if (!content.includes("processRuntimePostMutationSideEffects")) {
  const helper = `
async function processRuntimePostMutationSideEffects(
  module: ERPModule,
  record: Record<string, unknown>
): Promise<void> {
  if (module.metadata.key !== "lignesinterventionauto") {
    return;
  }

  try {
    const { RuntimeStockMovementService } =
      await import("@/runtime/stock");

    const result =
      await RuntimeStockMovementService.processInterventionLineStock({
        line: record,
      });

    if (result.processed) {
      console.info(
        "[RUNTIME_STOCK_MOVEMENT_PROCESSED]",
        {
          moduleKey: module.metadata.key,
          recordId: String(record.id ?? record._id ?? ""),
          movementId: result.movementId,
        }
      );
    } else if (
      result.reason &&
      result.reason !== "not-piece-line" &&
      result.reason !== "line-not-validated" &&
      result.reason !== "already-processed"
    ) {
      console.warn(
        "[RUNTIME_STOCK_MOVEMENT_SKIPPED]",
        {
          moduleKey: module.metadata.key,
          recordId: String(record.id ?? record._id ?? ""),
          reason: result.reason,
        }
      );
    }
  } catch (error) {
    console.error(
      "[RUNTIME_STOCK_MOVEMENT_ERROR]",
      error
    );
  }
}

`;

  content = content.replace(
    "export class FirestoreRuntimeMutation {",
    helper + "export class FirestoreRuntimeMutation {"
  );
}

if (!content.includes("const persistedRecordForSideEffects")) {
  content = content.replace(
    `    await runtimeEventBus.emit(
      \`\${module.metadata.key}.created\`,
      {
        ...safeData,
        result,
      }
    );

    return result;`,
    `    await runtimeEventBus.emit(
      \`\${module.metadata.key}.created\`,
      {
        ...safeData,
        result,
      }
    );

    const persistedRecordForSideEffects = {
      ...safeData,
      ...(typeof result === "object" && result !== null ? result : {}),
      id:
        (typeof result === "object" && result !== null
          ? (result as Record<string, unknown>).id
          : undefined) ??
        safeData.id,
    };

    await processRuntimePostMutationSideEffects(
      module,
      persistedRecordForSideEffects
    );

    return result;`
  );
}

if (!content.includes("const updatedRecordForSideEffects")) {
  content = content.replace(
    `    await runtimeEventBus.emit(
      \`\${module.metadata.key}.updated\`,
      {
        id,
        ...safeData,
        result,
      }
    );

    return result;`,
    `    await runtimeEventBus.emit(
      \`\${module.metadata.key}.updated\`,
      {
        id,
        ...safeData,
        result,
      }
    );

    const updatedRecordForSideEffects = {
      ...safeData,
      ...(typeof result === "object" && result !== null ? result : {}),
      id,
    };

    await processRuntimePostMutationSideEffects(
      module,
      updatedRecordForSideEffects
    );

    return result;`
  );
}

fs.writeFileSync(file, content, "utf8");

console.log("OK: hook stock movement branché après create/update Firestore.");