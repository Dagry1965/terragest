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

  backup(file, "q18g1-related-records-sort-control");

  let content = read(file);

  if (!content.includes("type RelatedRecordsSortDirection")) {
    content = replaceOnce(
      content,
      `interface ERPRelatedRecordsPanelProps {
  parentModule: ERPModule;
  parentRecord: Record<string, unknown>;
  child: ERPCompositionChild;
  mode: "detail" | "edit";
}`,
      `interface ERPRelatedRecordsPanelProps {
  parentModule: ERPModule;
  parentRecord: Record<string, unknown>;
  child: ERPCompositionChild;
  mode: "detail" | "edit";
}

type RelatedRecordsSortDirection = "asc" | "desc";`,
      "add sort direction type"
    );
  }

  if (!content.includes("function getRecordSortValue")) {
    content = replaceOnce(
      content,
      `function getAmount(record: Record<string, unknown>, field?: string): number {
  if (!field) return 0;

  const value = Number(record[field] ?? 0);

  return Number.isFinite(value) ? value : 0;
}`,
      `function getAmount(record: Record<string, unknown>, field?: string): number {
  if (!field) return 0;

  const value = Number(record[field] ?? 0);

  return Number.isFinite(value) ? value : 0;
}

function getRecordSortValue(record: Record<string, unknown>): string {
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
}`,
      "add related records sort helpers"
    );
  }

  if (!content.includes("const [sortDirection, setSortDirection]")) {
    content = replaceOnce(
      content,
      `  const [loading, setLoading] = useState(true);`,
      `  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] =
    useState<RelatedRecordsSortDirection>("asc");`,
      "add sort state"
    );
  }

  if (!content.includes("const sortedRecords = useMemo")) {
    content = replaceOnce(
      content,
      `  const total = records.reduce(
    (sum, record) => sum + getAmount(record, child.totalField),
    0
  );`,
      `  const sortedRecords = useMemo(
    () => sortRelatedRecords(records, sortDirection),
    [records, sortDirection]
  );

  const total = records.reduce(
    (sum, record) => sum + getAmount(record, child.totalField),
    0
  );`,
      "add sorted records memo"
    );
  }

  if (!content.includes("Trier :")) {
    content = replaceOnce(
      content,
      `        {(child.allowCreate ?? child.mode !== "readonly") ? (
        <Link
          href={createHref}
          className="inline-flex items-center justify-center rounded-2xl bg-[#009B7D] px-5 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(0,155,125,0.24)] transition hover:-translate-y-0.5 hover:bg-[#007F6D] hover:shadow-[0_16px_30px_rgba(0,127,109,0.28)] active:translate-y-0"
        >
          {child.createLabel ?? "Ajouter"}
        </Link>
        ) : null}`,
      `        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600">
            Trier :
            <select
              value={sortDirection}
              onChange={(event) =>
                setSortDirection(
                  event.target.value as RelatedRecordsSortDirection
                )
              }
              className="bg-transparent text-xs font-black text-slate-900 outline-none"
            >
              <option value="asc">Ancien → récent</option>
              <option value="desc">Récent → ancien</option>
            </select>
          </label>

          {(child.allowCreate ?? child.mode !== "readonly") ? (
            <Link
              href={createHref}
              className="inline-flex items-center justify-center rounded-2xl bg-[#009B7D] px-5 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(0,155,125,0.24)] transition hover:-translate-y-0.5 hover:bg-[#007F6D] hover:shadow-[0_16px_30px_rgba(0,127,109,0.28)] active:translate-y-0"
            >
              {child.createLabel ?? "Ajouter"}
            </Link>
          ) : null}
        </div>`,
      "add sort control in panel header"
    );
  }

  content = replaceOnce(
    content,
    `        {records.map((record) => {`,
    `        {sortedRecords.map((record) => {`,
    "render sorted records"
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18G1_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester panneaux liés ancien/récent");
}

main();