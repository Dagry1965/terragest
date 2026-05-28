const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRuntimePage.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

const backup = file + ".bak-q1d-d2-refresh-after-runtime-action";
fs.writeFileSync(backup, original, "utf8");

/**
 * Q1-D-D2
 * Refresh UI après action runtime :
 * - conserver un currentRecord local
 * - exécuter l'action avec await
 * - recharger le record depuis Firestore
 * - mettre à jour la page sans refresh navigateur
 */

if (!content.includes("const [currentRecord, setCurrentRecord]")) {
  content = content.replace(
    /const \[runtimeData, setRuntimeData\] =\s*useState<Record<string, unknown>\[]>\(\s*data\s*\);/,
    `const [runtimeData, setRuntimeData] =
    useState<Record<string, unknown>[]>(
      data
    );

  const [currentRecord, setCurrentRecord] =
    useState<Record<string, unknown> | undefined>(
      record
    );`
  );
}

if (!content.includes("setCurrentRecord(record);")) {
  content = content.replace(
    /useEffect\(\(\) => \{\s*async function loadData\(\)/,
    `useEffect(() => {
    setCurrentRecord(record);
  }, [record]);

  useEffect(() => {
    async function loadData()`
  );
}

if (!content.includes("async function handleRuntimeAction")) {
  const marker = "  const moduleLabel =";
  const helper = `
  async function handleRuntimeAction(action: NonNullable<ERPModule["actions"]>[number]) {
    if (!module || !currentRecord) {
      return;
    }

    const actionResult =
      await RuntimeActionEngine.execute({
        module,
        action,
        record: currentRecord,
      });

    const recordId =
      String(
        currentRecord.id ??
        currentRecord._id ??
        currentRecord.uid ??
        ""
      );

    if (recordId) {
      const freshRecord =
        await RuntimeDataBinding.detail(
          module,
          recordId
        );

      if (freshRecord) {
        setCurrentRecord(freshRecord);
      }
    }

    return actionResult;
  }

`;
  const index = content.indexOf(marker);

  if (index < 0) {
    throw new Error("Point insertion introuvable: const moduleLabel");
  }

  content = content.slice(0, index) + helper + content.slice(index);
}

/**
 * Remplacer les usages directs de record par currentRecord dans la zone runtime.
 */
content = content.replace(
  /const isRemovedRecord = Boolean\(record\?\.removedAt\);/,
  `const isRemovedRecord = Boolean(currentRecord?.removedAt);`
);

content = content.replace(
  /record,\s*\}\)\s*: \[\];/,
  `record: currentRecord,
          })
        : [];`
);

content = content.replace(
  /Boolean\(record\?\.id \?\? record\?\._id\)/,
  `Boolean(currentRecord?.id ?? currentRecord?._id)`
);

content = content.replace(
  /isInvoiceDetailPage && record\s*\? buildInvoicePaymentHref\(record\)/,
  `isInvoiceDetailPage && currentRecord
      ? buildInvoicePaymentHref(currentRecord)`
);

content = content.replace(
  /if \(!record\) \{\s*return false;\s*\}/,
  `if (!currentRecord) {
          return false;
        }`
);

content = content.replace(
  /onClick=\{\(\) =>\s*RuntimeActionEngine\.execute\(\{\s*module,\s*action,\s*record,\s*\}\)\s*\}/,
  `onClick={() => {
                    void handleRuntimeAction(action);
                  }}`
);

content = content.replaceAll("record={record}", "record={currentRecord}");
content = content.replaceAll("parentRecord={record}", "parentRecord={currentRecord}");
content = content.replaceAll("initialData={record}", "initialData={currentRecord}");
content = content.replaceAll("data={record}", "data={currentRecord}");

content = content.replaceAll(
  "module && record && (type === \"detail\" || type === \"edit\")",
  "module && currentRecord && (type === \"detail\" || type === \"edit\")"
);

content = content.replaceAll(
  "module && record && relatedChildrenBefore.map",
  "module && currentRecord && relatedChildrenBefore.map"
);

content = content.replaceAll(
  "module && record && relatedChildrenAfter.map",
  "module && currentRecord && relatedChildrenAfter.map"
);

content = content.replaceAll(
  "type === \"edit\" && module && record",
  "type === \"edit\" && module && currentRecord"
);

content = content.replaceAll(
  "type === \"detail\" && module && record",
  "type === \"detail\" && module && currentRecord"
);

/**
 * Vérifications.
 */
const problems = [];

if (!content.includes("const [currentRecord, setCurrentRecord]")) {
  problems.push("currentRecord state absent");
}

if (!content.includes("async function handleRuntimeAction")) {
  problems.push("handleRuntimeAction absent");
}

if (!content.includes("RuntimeDataBinding.detail")) {
  problems.push("reload detail absent");
}

if (content.includes("RuntimeActionEngine.execute({\n                      module,\n                      action,\n                      record,")) {
  problems.push("ancien onClick direct encore présent");
}

if (!content.includes("void handleRuntimeAction(action);")) {
  problems.push("onClick ne déclenche pas handleRuntimeAction");
}

if (problems.length > 0) {
  console.log("[FAIL] Correction incomplète:");
  for (const problem of problems) {
    console.log(" - " + problem);
  }
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(1);
}

if (content === original) {
  console.log("[INFO] Aucun changement applique. Correction peut-etre deja presente.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(0);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q1-D-D2 refresh UI apres action runtime.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("pnpm build");
