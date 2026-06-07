const fs = require("fs");
const path = require("path");

const root = process.cwd();

function abs(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(abs(relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(abs(relativePath), content, "utf8");
}

function updateFile(relativePath, updater) {
  const before = read(relativePath);
  const after = updater(before, relativePath);

  if (after !== before) {
    write(relativePath, after);
    console.log("[UPDATED]", relativePath);
    return 1;
  }

  console.log("[UNCHANGED]", relativePath);
  return 0;
}

function removeLinesContaining(content, tokens) {
  return content
    .split(/\r?\n/)
    .filter((line) => !tokens.some((token) => line.includes(token)))
    .join("\n");
}

let changed = 0;

// 1) Hub client : retirer interventionStatus.includes("facturee") si encore présent
changed += updateFile(
  "src/components/erp/hub/ERPClientOperationalSheet.tsx",
  (content) => removeLinesContaining(content, [
    'interventionStatus.includes("facturee")',
    'interventionStatus.includes("facturée")',
    'interventionStatus.includes("facturée")',
  ])
);

// 2) Loader today : retirer les statuts facturee/facturée/facturée de la liste intervention active
changed += updateFile(
  "src/runtime/hub/RuntimeClientOperationalTodayLoader.ts",
  (content) => removeLinesContaining(content, [
    '"facturee"',
    '"facturée"',
    '"facturée"',
  ])
);

// 3) Workflow cascade : remplacer la notion "déjà clôturée" par atelier-only
changed += updateFile(
  "src/runtime/workflow-cascade/RuntimeWorkflowCascadeService.ts",
  (content, relativePath) => {
    let next = content;

    next = next.replace(
      /function isInterventionAlreadyClosed\(record: Record<string, unknown>\): boolean \{[\s\S]*?\n\}/,
`function isInterventionAlreadyClosed(record: Record<string, unknown>): boolean {
  const statut = String(record.statut ?? "").trim().toLowerCase();

  return (
    statut === "terminee" ||
    statut === "terminée" ||
    statut === "terminée" ||
    statut === "annulee" ||
    statut === "annulée" ||
    statut === "annulée" ||
    statut === "archivee" ||
    statut === "archivée" ||
    statut === "archivée"
  );
}`
    );

    if (next === content && content.includes("isInterventionAlreadyClosed")) {
      throw new Error(`[Q2-L-B3-G2B] Could not replace isInterventionAlreadyClosed in ${relativePath}`);
    }

    return next;
  }
);

console.log("[Q2-L-B3-G2B] Changed files:", changed);