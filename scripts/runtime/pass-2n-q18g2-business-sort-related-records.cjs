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
  if (!fs.existsSync(file)) {
    return;
  }

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

function main() {
  const file = p(
    "src",
    "components",
    "erp",
    "runtime",
    "ERPRelatedRecordsPanel.tsx"
  );

  backup(file, "q18g2-business-sort-related-records");

  let content = read(file);

  const oldHelper = `function getRecordSortValue(record: Record<string, unknown>): string {
  const candidates = [
    record.createdAt,
    record.createdOn,
    record.dateCreation,
    record.datePaiement,
    record.dateFacture,
    record.dateIntervention,
    record.dateRendezVous,
    record.dateEcheance,
    record.updatedAt,
    record.id,
    record._id,
  ];

  const value =
    candidates.find(
      (candidate) =>
        candidate !== undefined &&
        candidate !== null &&
        String(candidate).trim() !== ""
    ) ?? "";

  return String(value);
}

function sortRelatedRecords(
  records: Record<string, unknown>[],
  direction: RelatedRecordsSortDirection
): Record<string, unknown>[] {
  return [...records].sort((left, right) => {
    const comparison =
      getRecordSortValue(left).localeCompare(
        getRecordSortValue(right)
      );

    return direction === "asc"
      ? comparison
      : -comparison;
  });
}`;

  const newHelper = `function getBusinessSortCandidates(
  record: Record<string, unknown>,
  childModuleKey?: string
): unknown[] {
  if (childModuleKey === "encaissementsauto") {
    return [
      record.datePaiement,
      record.createdAt,
      record.id,
      record._id,
    ];
  }

  if (
    childModuleKey === "echeancespaiementauto" ||
    childModuleKey === "echeancesauto"
  ) {
    return [
      record.dateEcheance,
      record.datePrevue,
      record.datePaiement,
      record.createdAt,
      record.id,
      record._id,
    ];
  }

  if (childModuleKey === "rendezvous") {
    return [
      [
        record.dateRendezVous,
        record.heureRendezVous,
      ]
        .filter(Boolean)
        .join(" "),
      record.startAt,
      record.createdAt,
      record.id,
      record._id,
    ];
  }

  if (childModuleKey === "interventionsauto") {
    return [
      record.dateIntervention,
      record.createdAt,
      record.id,
      record._id,
    ];
  }

  if (childModuleKey === "lignesinterventionauto") {
    return [
      record.ordreLigne,
      record.createdAt,
      record.createdOn,
      record.id,
      record._id,
    ];
  }

  return [
    record.createdAt,
    record.createdOn,
    record.dateCreation,
    record.datePaiement,
    record.dateFacture,
    record.dateIntervention,
    record.dateRendezVous,
    record.dateEcheance,
    record.updatedAt,
    record.id,
    record._id,
  ];
}

function getRecordSortValue(
  record: Record<string, unknown>,
  childModuleKey?: string
): string {
  const value =
    getBusinessSortCandidates(
      record,
      childModuleKey
    ).find(
      (candidate) =>
        candidate !== undefined &&
        candidate !== null &&
        String(candidate).trim() !== ""
    ) ?? "";

  return String(value);
}

function sortRelatedRecords(
  records: Record<string, unknown>[],
  direction: RelatedRecordsSortDirection,
  childModuleKey?: string
): Record<string, unknown>[] {
  return [...records].sort((left, right) => {
    const comparison =
      getRecordSortValue(left, childModuleKey).localeCompare(
        getRecordSortValue(right, childModuleKey),
        "fr",
        {
          numeric: true,
          sensitivity: "base",
        }
      );

    return direction === "asc"
      ? comparison
      : -comparison;
  });
}`;

  content = replaceOnce(
    content,
    oldHelper,
    newHelper,
    "replace generic sort with business sort"
  );

  content = replaceOnce(
    content,
    `  const sortedRecords = useMemo(
    () => sortRelatedRecords(records, sortDirection),
    [records, sortDirection]
  );`,
    `  const sortedRecords = useMemo(
    () =>
      sortRelatedRecords(
        records,
        sortDirection,
        child.moduleKey
      ),
    [records, sortDirection, child.moduleKey]
  );`,
    "pass child module key to sort"
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18G2_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester facture -> encaissements triés par datePaiement");
}

main();