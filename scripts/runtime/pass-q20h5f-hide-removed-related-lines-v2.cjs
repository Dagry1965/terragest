const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRelatedRecordsPanel.tsx"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function backup(file, suffix) {
  const backupPath = `${file}.bak-${suffix}`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

if (!fs.existsSync(target)) {
  throw new Error(`Fichier introuvable: ${target}`);
}

backup(target, "q20h5f-hide-removed-related-lines-v2");

let content = read(target);

if (content.includes("Q20H5F_HIDE_REMOVED_RELATED_RECORDS")) {
  console.log("[SKIP] Q20H5F déjà appliqué.");
  process.exit(0);
}

const sortedBlock = `  const sortedRecords = useMemo(
    () =>
      sortRelatedRecords(
        records,
        sortDirection,
        child.moduleKey
      ),
    [records, sortDirection, child.moduleKey]
  );`;

const sortedReplacement = `  const activeRecords =
    // Q20H5F_HIDE_REMOVED_RELATED_RECORDS
    // Les lignes retirées restent en base pour audit,
    // mais ne sont plus affichées comme lignes actives.
    records.filter((record) => !record.removedAt);

  const sortedRecords = useMemo(
    () =>
      sortRelatedRecords(
        activeRecords,
        sortDirection,
        child.moduleKey
      ),
    [activeRecords, sortDirection, child.moduleKey]
  );`;

if (!content.includes(sortedBlock)) {
  throw new Error("Bloc sortedRecords réel introuvable.");
}

content = content.replace(sortedBlock, sortedReplacement);

content = content.replaceAll("records.length", "activeRecords.length");

const totalBlock = `  const total = records.reduce(
    (sum, record) =>
      isRelatedRecordCountable(record)
        ? sum + getAmount(record, child.totalField)
        : sum,
    0
  );`;

const totalReplacement = `  const total = activeRecords.reduce(
    (sum, record) =>
      isRelatedRecordCountable(record)
        ? sum + getAmount(record, child.totalField)
        : sum,
    0
  );`;

if (!content.includes(totalBlock)) {
  throw new Error("Bloc total filtré réel introuvable.");
}

content = content.replace(totalBlock, totalReplacement);

write(target, content);

console.log("");
console.log("[Q20H5F_DONE] Lignes retirées masquées du panneau actif.");
console.log("");
console.log("Next:");
console.log("  pnpm build");