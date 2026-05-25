const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const schemaRel = "src/runtime/modules/schemas/ERPModuleSchema.ts";
const receptionRel = "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts";

const schemaFile = path.join(ROOT, schemaRel);
const receptionFile = path.join(ROOT, receptionRel);

const schemaBackup = path.join(ROOT, `${schemaRel}.bak-q21d3c3a-exclude-used-by-type`);
const receptionBackup = path.join(ROOT, `${receptionRel}.bak-q21d3c3a-exclude-used-by-metadata`);

for (const file of [schemaFile, receptionFile]) {
  if (!fs.existsSync(file)) {
    console.error(`[ERROR] Missing file: ${path.relative(ROOT, file)}`);
    process.exit(1);
  }
}

if (!fs.existsSync(schemaBackup)) {
  fs.copyFileSync(schemaFile, schemaBackup);
  console.log(`[BACKUP] ${path.relative(ROOT, schemaBackup)}`);
}

if (!fs.existsSync(receptionBackup)) {
  fs.copyFileSync(receptionFile, receptionBackup);
  console.log(`[BACKUP] ${path.relative(ROOT, receptionBackup)}`);
}

let schema = fs.readFileSync(schemaFile, "utf8");
let reception = fs.readFileSync(receptionFile, "utf8");

if (!schema.includes("Q21D3C3A_EXCLUDE_USED_BY_TYPE")) {
  const marker = `        filterBy?: {
          sourceField: string;
          targetField: string;
          includeEmptyTarget?: boolean;
        };`;

  if (!schema.includes(marker)) {
    console.error("[ERROR] Cannot locate relation.filterBy marker in ERPModuleSchema.ts.");
    process.exit(1);
  }

  schema = schema.replace(
    marker,
    `${marker}

        /**
         * Q21D3C3A_EXCLUDE_USED_BY_TYPE
         * Declarative exclusion of relation options already referenced by another module.
         * Example: receptionsstockauto.ligneCommandeId excludes lines already used by receptionsstockauto.
         */
        excludeUsedBy?: {
          module: string;
          field: string;
        };`
  );
}

if (!reception.includes("Q21D3C3A_EXCLUDE_USED_BY")) {
  const marker = `          filterBy: {
            sourceField: "commandeId",
            targetField: "commandeId",
            includeEmptyTarget: false,
          },`;

  if (!reception.includes(marker)) {
    console.error("[ERROR] Cannot locate ligneCommandeId filterBy block in receptionsstockauto.");
    process.exit(1);
  }

  reception = reception.replace(
    marker,
    `${marker}
          // Q21D3C3A_EXCLUDE_USED_BY
          // Exclude order lines already used in an existing reception.
          excludeUsedBy: {
            module: "receptionsstockauto",
            field: "ligneCommandeId",
          },`
  );
}

fs.writeFileSync(schemaFile, schema, "utf8");
fs.writeFileSync(receptionFile, reception, "utf8");

console.log("[Q21D3C3A_DONE] relation.excludeUsedBy type and metadata declared.");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm audit:local");