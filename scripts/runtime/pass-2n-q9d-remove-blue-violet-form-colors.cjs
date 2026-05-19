const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(filePath) {
  return path.join(root, filePath);
}

function read(filePath) {
  return fs.readFileSync(file(filePath), "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(file(filePath), content, "utf8");
  console.log("UPDATED", filePath);
}

function patch(filePath, updater) {
  const absolute = file(filePath);

  if (!fs.existsSync(absolute)) {
    console.log("SKIP", filePath);
    return;
  }

  const before = read(filePath);
  const after = updater(before);

  if (before !== after) {
    write(filePath, after);
  } else {
    console.log("NO CHANGE", filePath);
  }
}

/**
 * PASS 2N-Q9D
 * Supprimer le violet et le bleu dans les formulaires / UI ERP.
 * Remplacer par gris premium + accent vert discret.
 */

const files = [
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  "src/components/erp/forms/enterprise/ERPFormSection.tsx",
  "src/components/erp/forms/enterprise/ERPFormField.tsx",
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
  "src/components/erp/forms/enterprise/ERPFormSummaryPanel.tsx",
  "src/components/erp/forms/enterprise/ERPFormActions.tsx",

  "src/components/erp/ui/ERPButton.tsx",
  "src/components/erp/ui/Button.tsx",
  "src/components/erp/ui/ERPBadge.tsx",
  "src/components/erp/ui/Badge.tsx",
  "src/components/erp/ui/index.tsx",

  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/components/erp/generic/GenericCreatePage.tsx",
  "src/components/erp/generic/GenericEditPage.tsx",
];

function removeBlueViolet(content) {
  let next = content;

  const pairs = [
    /**
     * Backgrounds violet / purple / indigo / blue -> gris premium.
     */
    ["bg-violet-950", "bg-[#111827]"],
    ["bg-violet-900", "bg-[#17212F]"],
    ["bg-violet-800", "bg-[#1F2937]"],
    ["bg-violet-700", "bg-[#334155]"],
    ["bg-violet-600", "bg-[#334155]"],
    ["bg-violet-500", "bg-[#475569]"],
    ["bg-violet-100", "bg-[#F1F5F9]"],
    ["bg-violet-50", "bg-[#F8FAFC]"],

    ["bg-purple-950", "bg-[#111827]"],
    ["bg-purple-900", "bg-[#17212F]"],
    ["bg-purple-800", "bg-[#1F2937]"],
    ["bg-purple-700", "bg-[#334155]"],
    ["bg-purple-600", "bg-[#334155]"],
    ["bg-purple-500", "bg-[#475569]"],
    ["bg-purple-100", "bg-[#F1F5F9]"],
    ["bg-purple-50", "bg-[#F8FAFC]"],

    ["bg-indigo-950", "bg-[#111827]"],
    ["bg-indigo-900", "bg-[#17212F]"],
    ["bg-indigo-800", "bg-[#1F2937]"],
    ["bg-indigo-700", "bg-[#334155]"],
    ["bg-indigo-600", "bg-[#334155]"],
    ["bg-indigo-500", "bg-[#475569]"],
    ["bg-indigo-100", "bg-[#F1F5F9]"],
    ["bg-indigo-50", "bg-[#F8FAFC]"],

    ["bg-blue-950", "bg-[#111827]"],
    ["bg-blue-900", "bg-[#17212F]"],
    ["bg-blue-800", "bg-[#1F2937]"],
    ["bg-blue-700", "bg-[#334155]"],
    ["bg-blue-600", "bg-[#334155]"],
    ["bg-blue-500", "bg-[#475569]"],
    ["bg-blue-100", "bg-[#F1F5F9]"],
    ["bg-blue-50", "bg-[#F8FAFC]"],

    /**
     * Textes violet / bleu -> graphite ou vert AMARKHYS selon intensité.
     */
    ["text-violet-950", "text-[#111827]"],
    ["text-violet-900", "text-[#111827]"],
    ["text-violet-800", "text-[#1F2937]"],
    ["text-violet-700", "text-[#334155]"],
    ["text-violet-600", "text-[#334155]"],
    ["text-violet-500", "text-[#475569]"],

    ["text-purple-950", "text-[#111827]"],
    ["text-purple-900", "text-[#111827]"],
    ["text-purple-800", "text-[#1F2937]"],
    ["text-purple-700", "text-[#334155]"],
    ["text-purple-600", "text-[#334155]"],
    ["text-purple-500", "text-[#475569]"],

    ["text-indigo-950", "text-[#111827]"],
    ["text-indigo-900", "text-[#111827]"],
    ["text-indigo-800", "text-[#1F2937]"],
    ["text-indigo-700", "text-[#334155]"],
    ["text-indigo-600", "text-[#334155]"],
    ["text-indigo-500", "text-[#475569]"],

    ["text-blue-950", "text-[#111827]"],
    ["text-blue-900", "text-[#111827]"],
    ["text-blue-800", "text-[#1F2937]"],
    ["text-blue-700", "text-[#334155]"],
    ["text-blue-600", "text-[#334155]"],
    ["text-blue-500", "text-[#475569]"],

    /**
     * Borders violet / blue -> gris doux.
     */
    ["border-violet-950", "border-[#111827]"],
    ["border-violet-900", "border-[#17212F]"],
    ["border-violet-800", "border-[#1F2937]"],
    ["border-violet-700", "border-[#334155]"],
    ["border-violet-600", "border-[#475569]"],
    ["border-violet-500", "border-[#64748B]"],
    ["border-violet-300", "border-[#CBD5E1]"],
    ["border-violet-200", "border-[#D5E4E8]"],

    ["border-purple-950", "border-[#111827]"],
    ["border-purple-900", "border-[#17212F]"],
    ["border-purple-800", "border-[#1F2937]"],
    ["border-purple-700", "border-[#334155]"],
    ["border-purple-600", "border-[#475569]"],
    ["border-purple-500", "border-[#64748B]"],
    ["border-purple-300", "border-[#CBD5E1]"],
    ["border-purple-200", "border-[#D5E4E8]"],

    ["border-indigo-950", "border-[#111827]"],
    ["border-indigo-900", "border-[#17212F]"],
    ["border-indigo-800", "border-[#1F2937]"],
    ["border-indigo-700", "border-[#334155]"],
    ["border-indigo-600", "border-[#475569]"],
    ["border-indigo-500", "border-[#64748B]"],
    ["border-indigo-300", "border-[#CBD5E1]"],
    ["border-indigo-200", "border-[#D5E4E8]"],

    ["border-blue-950", "border-[#111827]"],
    ["border-blue-900", "border-[#17212F]"],
    ["border-blue-800", "border-[#1F2937]"],
    ["border-blue-700", "border-[#334155]"],
    ["border-blue-600", "border-[#475569]"],
    ["border-blue-500", "border-[#64748B]"],
    ["border-blue-300", "border-[#CBD5E1]"],
    ["border-blue-200", "border-[#D5E4E8]"],

    /**
     * Focus rings.
     */
    ["focus:border-violet-500", "focus:border-[#00A68A]"],
    ["focus:ring-violet-500", "focus:ring-[#00A68A]"],
    ["focus:border-purple-500", "focus:border-[#00A68A]"],
    ["focus:ring-purple-500", "focus:ring-[#00A68A]"],
    ["focus:border-indigo-500", "focus:border-[#00A68A]"],
    ["focus:ring-indigo-500", "focus:ring-[#00A68A]"],
    ["focus:border-blue-500", "focus:border-[#00A68A]"],
    ["focus:ring-blue-500", "focus:ring-[#00A68A]"],

    /**
     * Hover.
     */
    ["hover:bg-violet-500", "hover:bg-[#1F2937]"],
    ["hover:bg-violet-600", "hover:bg-[#1F2937]"],
    ["hover:bg-purple-500", "hover:bg-[#1F2937]"],
    ["hover:bg-purple-600", "hover:bg-[#1F2937]"],
    ["hover:bg-indigo-500", "hover:bg-[#1F2937]"],
    ["hover:bg-indigo-600", "hover:bg-[#1F2937]"],
    ["hover:bg-blue-500", "hover:bg-[#1F2937]"],
    ["hover:bg-blue-600", "hover:bg-[#1F2937]"],

    ["hover:text-violet-700", "hover:text-[#111827]"],
    ["hover:text-purple-700", "hover:text-[#111827]"],
    ["hover:text-indigo-700", "hover:text-[#111827]"],
    ["hover:text-blue-700", "hover:text-[#111827]"],

    ["hover:border-violet-300", "hover:border-[#8EDFD4]"],
    ["hover:border-purple-300", "hover:border-[#8EDFD4]"],
    ["hover:border-indigo-300", "hover:border-[#8EDFD4]"],
    ["hover:border-blue-300", "hover:border-[#8EDFD4]"],
  ];

  for (const [from, to] of pairs) {
    next = next.replaceAll(from, to);
  }

  /**
   * Cas Tailwind slash opacity.
   */
  next = next
    .replaceAll("bg-violet-500/10", "bg-slate-500/10")
    .replaceAll("bg-violet-600/10", "bg-slate-600/10")
    .replaceAll("bg-purple-500/10", "bg-slate-500/10")
    .replaceAll("bg-purple-600/10", "bg-slate-600/10")
    .replaceAll("bg-indigo-500/10", "bg-slate-500/10")
    .replaceAll("bg-indigo-600/10", "bg-slate-600/10")
    .replaceAll("bg-blue-500/10", "bg-slate-500/10")
    .replaceAll("bg-blue-600/10", "bg-slate-600/10")

    .replaceAll("border-violet-500/20", "border-slate-500/20")
    .replaceAll("border-purple-500/20", "border-slate-500/20")
    .replaceAll("border-indigo-500/20", "border-slate-500/20")
    .replaceAll("border-blue-500/20", "border-slate-500/20")

    .replaceAll("text-violet-500/80", "text-slate-500")
    .replaceAll("text-purple-500/80", "text-slate-500")
    .replaceAll("text-indigo-500/80", "text-slate-500")
    .replaceAll("text-blue-500/80", "text-slate-500");

  /**
   * Nettoyage doublons.
   */
  next = next
    .replaceAll("transition transition", "transition")
    .replaceAll("hover:bg-[#1F2937] hover:bg-[#1F2937]", "hover:bg-[#1F2937]")
    .replaceAll("hover:border-[#8EDFD4] hover:border-[#8EDFD4]", "hover:border-[#8EDFD4]")
    .replaceAll("focus:border-[#00A68A] focus:border-[#00A68A]", "focus:border-[#00A68A]")
    .replaceAll("focus:ring-[#00A68A] focus:ring-[#00A68A]", "focus:ring-[#00A68A]");

  return next;
}

for (const target of files) {
  patch(target, removeBlueViolet);
}

/**
 * Scan complémentaire limité aux composants ERP, pour éviter les restes.
 */
const dirs = [
  "src/components/erp/forms",
  "src/components/erp/ui",
];

for (const dir of dirs) {
  const absoluteDir = file(dir);

  if (!fs.existsSync(absoluteDir)) {
    continue;
  }

  const stack = [absoluteDir];

  while (stack.length > 0) {
    const current = stack.pop();

    for (const item of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, item.name);

      if (item.isDirectory()) {
        stack.push(absolute);
        continue;
      }

      if (!item.isFile()) {
        continue;
      }

      if (!item.name.endsWith(".tsx") && !item.name.endsWith(".ts")) {
        continue;
      }

      const relative =
        path.relative(root, absolute).replaceAll("\\", "/");

      patch(relative, removeBlueViolet);
    }
  }
}

console.log("PASS 2N-Q9D OK: blue/violet removed from forms and ERP UI.");