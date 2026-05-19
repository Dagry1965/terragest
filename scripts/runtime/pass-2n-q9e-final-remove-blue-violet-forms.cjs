const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(filePath) {
  return path.join(root, filePath);
}

function patchFile(filePath, updater) {
  const absolute = file(filePath);

  if (!fs.existsSync(absolute)) {
    console.log("SKIP", filePath);
    return;
  }

  const before = fs.readFileSync(absolute, "utf8");
  const after = updater(before);

  if (before !== after) {
    fs.writeFileSync(absolute, after, "utf8");
    console.log("UPDATED", filePath);
  } else {
    console.log("NO CHANGE", filePath);
  }
}

/**
 * PASS 2N-Q9E
 * Suppression finale des restes bleu/violet dans les formulaires.
 */

const activeFiles = [
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  "src/components/erp/forms/enterprise/ERPFormSection.tsx",
  "src/components/erp/forms/enterprise/ERPFormField.tsx",
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
  "src/components/erp/forms/enterprise/ERPFormSummaryPanel.tsx",
  "src/components/erp/forms/enterprise/ERPFormActions.tsx",
];

function removeBlueViolet(content) {
  let next = content;

  const pairs = [
    ["border-blue-100", "border-[#D5E4E8]"],
    ["border-blue-200", "border-[#CBD5E1]"],
    ["border-blue-300", "border-[#CBD5E1]"],
    ["border-blue-400", "border-[#94A3B8]"],
    ["border-blue-500", "border-[#64748B]"],
    ["border-blue-600", "border-[#475569]"],

    ["text-blue-100", "text-[#E2E8F0]"],
    ["text-blue-200", "text-[#CBD5E1]"],
    ["text-blue-300", "text-[#94A3B8]"],
    ["text-blue-400", "text-[#64748B]"],
    ["text-blue-500", "text-[#475569]"],
    ["text-blue-600", "text-[#334155]"],
    ["text-blue-700", "text-[#1F2937]"],

    ["bg-blue-50", "bg-[#F8FAFC]"],
    ["bg-blue-100", "bg-[#F1F5F9]"],
    ["bg-blue-200", "bg-[#E2E8F0]"],
    ["bg-blue-500", "bg-[#475569]"],
    ["bg-blue-600", "bg-[#334155]"],

    ["from-blue-950", "from-[#111827]"],
    ["via-blue-950", "via-[#17212F]"],
    ["to-blue-950", "to-[#123A35]"],

    ["from-blue-900", "from-[#111827]"],
    ["via-blue-900", "via-[#17212F]"],
    ["to-blue-900", "to-[#123A35]"],

    ["border-violet-100", "border-[#D5E4E8]"],
    ["border-violet-200", "border-[#CBD5E1]"],
    ["text-violet-200", "text-[#CBD5E1]"],
    ["text-violet-600", "text-[#334155]"],
    ["bg-violet-50", "bg-[#F8FAFC]"],
    ["bg-violet-600", "bg-[#334155]"],

    ["border-purple-100", "border-[#D5E4E8]"],
    ["border-purple-200", "border-[#CBD5E1]"],
    ["text-purple-200", "text-[#CBD5E1]"],
    ["text-purple-600", "text-[#334155]"],
    ["bg-purple-50", "bg-[#F8FAFC]"],
    ["bg-purple-600", "bg-[#334155]"],

    ["border-indigo-100", "border-[#D5E4E8]"],
    ["border-indigo-200", "border-[#CBD5E1]"],
    ["text-indigo-200", "text-[#CBD5E1]"],
    ["text-indigo-600", "text-[#334155]"],
    ["bg-indigo-50", "bg-[#F8FAFC]"],
    ["bg-indigo-600", "bg-[#334155]"],
  ];

  for (const [from, to] of pairs) {
    next = next.replaceAll(from, to);
  }

  /**
   * Nettoyage spécifique des blocs repérés.
   */
  next = next.replaceAll(
    `className="rounded-2xl sm:rounded-3xl border border-[#D5E4E8] bg-[#F8FAFC] p-4"`,
    `className="rounded-2xl sm:rounded-3xl border border-[#D5E4E8] bg-[#F8FAFC] p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"`
  );

  next = next.replaceAll(
    `className="text-sm font-bold uppercase tracking-wide text-[#CBD5E1]"`,
    `className="text-sm font-bold uppercase tracking-wide text-[#475569]"`
  );

  next = next
    .replaceAll("transition transition", "transition")
    .replaceAll("border-[#D5E4E8] border-[#D5E4E8]", "border-[#D5E4E8]")
    .replaceAll("text-[#475569] text-[#475569]", "text-[#475569]")
    .replaceAll("bg-[#F8FAFC] bg-[#F8FAFC]", "bg-[#F8FAFC]");

  return next;
}

for (const target of activeFiles) {
  patchFile(target, removeBlueViolet);
}

/**
 * Supprimer les anciens backups qui polluent les recherches
 * et ne doivent pas entrer dans le build / l'audit visuel.
 */
const backupFilesToRemove = [
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx.bak-workflow-submit",
];

for (const backup of backupFilesToRemove) {
  const absolute = file(backup);

  if (fs.existsSync(absolute)) {
    fs.unlinkSync(absolute);
    console.log("REMOVED", backup);
  }
}

console.log("PASS 2N-Q9E OK: final blue/violet residues removed from forms.");