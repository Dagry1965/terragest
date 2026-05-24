const fs = require("fs");
const path = require("path");

const root = process.cwd();

const relatedPanelPath = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRelatedRecordsPanel.tsx"
);

const actionEnginePath = path.join(
  root,
  "src",
  "runtime",
  "actions",
  "RuntimeActionEngine.ts"
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

backup(relatedPanelPath, "q20h5f-hide-removed-lines");
backup(actionEnginePath, "q20h5f-hide-removed-actions");

let panel = read(relatedPanelPath);

if (!panel.includes("Q20H5F_HIDE_REMOVED_RELATED_RECORDS")) {
  const sortedRecordsBlock = `  const sortedRecords = useMemo(
    () =>
      [...records].sort((a, b) =>
        compareRecordsByDate(
          a,
          b,
          sortDirection
        )
      ),
    [records, sortDirection, child.moduleKey]
  );`;

  const sortedRecordsReplacement = `  const activeRecords =
    // Q20H5F_HIDE_REMOVED_RELATED_RECORDS
    // Les lignes retirées restent en base pour l'audit,
    // mais ne doivent plus apparaître comme lignes actives.
    records.filter((record) => !record.removedAt);

  const sortedRecords = useMemo(
    () =>
      [...activeRecords].sort((a, b) =>
        compareRecordsByDate(
          a,
          b,
          sortDirection
        )
      ),
    [activeRecords, sortDirection, child.moduleKey]
  );`;

  if (!panel.includes(sortedRecordsBlock)) {
    throw new Error("Bloc sortedRecords introuvable dans ERPRelatedRecordsPanel.");
  }

  panel = panel.replace(sortedRecordsBlock, sortedRecordsReplacement);

  panel = panel.replaceAll("records.length", "activeRecords.length");

  const totalBlock = `  const total = records.reduce(
    (sum, record) => sum + getAmount(record, child.totalField),
    0
  );`;

  if (panel.includes(totalBlock)) {
    panel = panel.replace(
      totalBlock,
`  const total = activeRecords.reduce(
    (sum, record) =>
      isRelatedRecordCountable(record)
        ? sum + getAmount(record, child.totalField)
        : sum,
    0
  );`
    );
  }

  write(relatedPanelPath, panel);
} else {
  console.log("[SKIP] Panneau related records déjà filtré.");
}

let actionEngine = read(actionEnginePath);

if (!actionEngine.includes("Q20H5F_HIDE_REMOVED_LINE_ACTION")) {
  const filterBlock = `      if (
        allowedActionKeys &&
        !allowedActionKeys.includes(action.key) &&
        !action.runtimeOnly
      ) {
        return false;
      }`;

  const filterReplacement = `      // Q20H5F_HIDE_REMOVED_LINE_ACTION
      // Une ligne déjà retirée ne doit plus proposer l'action Retirer la ligne.
      if (
        action.key === "retirer-ligne" &&
        record?.removedAt
      ) {
        return false;
      }

      if (
        allowedActionKeys &&
        !allowedActionKeys.includes(action.key) &&
        !action.runtimeOnly
      ) {
        return false;
      }`;

  if (!actionEngine.includes(filterBlock)) {
    throw new Error("Bloc filtrage RuntimeActionEngine introuvable.");
  }

  actionEngine = actionEngine.replace(filterBlock, filterReplacement);
  write(actionEnginePath, actionEngine);
} else {
  console.log("[SKIP] Action retirer-ligne déjà masquée si removedAt.");
}

console.log("");
console.log("[Q20H5F_DONE] Lignes retirées masquées des panneaux liés et actions retirées filtrées.");
console.log("");
console.log("Next:");
console.log("  pnpm build");