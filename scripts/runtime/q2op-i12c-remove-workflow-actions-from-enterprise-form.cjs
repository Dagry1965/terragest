const fs = require("fs");
const path = require("path");

const root = process.cwd();

function full(relativePath) {
  return path.join(root, relativePath);
}

function backup(relativePath, suffix) {
  const file = full(relativePath);
  if (!fs.existsSync(file)) {
    console.error("[MISSING]", relativePath);
    process.exit(1);
  }

  const bak = `${file}.${suffix}`;
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(file, bak);
    console.log("[BACKUP]", path.relative(root, bak));
  }
}

function write(relativePath, content) {
  fs.writeFileSync(full(relativePath), content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

const formPath = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const pagePath = "src/components/erp/runtime/ERPRuntimePage.tsx";

backup(formPath, "bak-q2op-i12c-remove-workflow-actions");
backup(pagePath, "bak-q2op-i12c-remove-workflow-actions");

let form = fs.readFileSync(full(formPath), "utf8");
let page = fs.readFileSync(full(pagePath), "utf8");

/**
 * 1. Remove RuntimeActionEngine import from ERPEnterpriseForm.
 */
form = form.replace(
  /import \{ RuntimeActionEngine \} from "@\/runtime\/actions\/RuntimeActionEngine";\r?\n/,
  ""
);

/**
 * 2. Remove workflowActions prop from ERPEnterpriseFormProps.
 */
form = form.replace(
  /\s*workflowActions\?: ERPModuleAction\[];\r?\n/,
  "\n"
);

/**
 * 3. Remove workflowActions from function destructuring.
 */
form = form.replace(
  /,\r?\n\s*workflowActions = \[\]/,
  ""
);

/**
 * 4. Remove pendingWorkflowActionRef.
 */
form = form.replace(
  /\s*const pendingWorkflowActionRef =\r?\n\s*useRef<ERPModuleAction \|\r?\n\s*null>\(null\);\r?\n/,
  "\n"
);

form = form.replace(
  /\s*const pendingWorkflowActionRef =\s*useRef<ERPModuleAction \| null>\(null\);\r?\n/,
  "\n"
);

/**
 * 5. Remove workflow execution block inside submit.
 */
const workflowExecRegex = /\s*if \(workflowAction && savedRecord\) \{[\s\S]*?\n\s*router\.refresh\(\);\s*\n\s*\}\s*\n/g;

if (workflowExecRegex.test(form)) {
  form = form.replace(workflowExecRegex, "\n");
} else {
  console.log("[INFO] Workflow execution block not found by broad regex; trying boundary-based removal.");

  const start = form.indexOf("      if (workflowAction && savedRecord) {");
  if (start !== -1) {
    const endMarker = "        router.refresh();";
    const endStart = form.indexOf(endMarker, start);

    if (endStart !== -1) {
      const end = form.indexOf("\n", endStart + endMarker.length);
      form = form.slice(0, start) + "\n" + form.slice(end + 1);
      console.log("[PATCH] Removed workflow execution block by boundary.");
    } else {
      console.error("[PATCH_FAILED] Found workflow block start but not end marker.");
      process.exit(1);
    }
  } else {
    console.log("[INFO] No workflow execution block start found. It may have been removed already.");
  }
}

/**
 * 6. Remove local workflowAction variable if present.
 */
form = form.replace(
  /\s*const workflowAction = pendingWorkflowActionRef\.current;\r?\n/g,
  "\n"
);

/**
 * 7. Remove Workflow UI section.
 */
const workflowSectionRegex = /\s*\{mode === "edit" &&\s*!isRemovedRecord &&\s*workflowActions\.length > 0 && \(\s*<section[\s\S]*?\n\s*<\/section>\s*\)\}\s*\n/g;

if (workflowSectionRegex.test(form)) {
  form = form.replace(workflowSectionRegex, "\n");
} else {
  console.log("[INFO] Workflow UI section not found by regex; trying boundary-based removal.");

  const start = form.indexOf('{mode === "edit" && !isRemovedRecord && workflowActions.length > 0 && (');
  if (start !== -1) {
    const endMarker = "      ) : null}";
    const nextKnownMarker = "        <div className=\"flex flex-col";
    const nextIndex = form.indexOf(nextKnownMarker, start);

    if (nextIndex !== -1) {
      form = form.slice(0, start) + "\n" + form.slice(nextIndex);
      console.log("[PATCH] Removed workflow UI section by next marker.");
    } else {
      console.error("[PATCH_FAILED] Workflow UI section found but next marker not found.");
      process.exit(1);
    }
  } else {
    console.log("[INFO] No workflow UI section found. It may have been removed already.");
  }
}

/**
 * 8. Remove unused ERPModuleAction import from form if only used for workflow.
 */
if (!form.includes("ERPModuleAction")) {
  form = form.replace(
    /import type \{ ERPModuleAction \} from "@\/runtime\/modules\/ERPModule";\r?\n/,
    ""
  );
}

/**
 * 9. Stop passing workflowActions from ERPRuntimePage to ERPEnterpriseForm.
 */
page = page.replace(
  /\r?\n\s*workflowActions=\{isRemovedRecord \? \[\] : runtimeActions\}/,
  ""
);

/**
 * 10. Validation.
 */
const formForbidden = [
  "workflowActions",
  "workflowActions.map",
  "pendingWorkflowActionRef",
  "RuntimeActionEngine.execute",
  "RuntimeActionEngine",
];

for (const marker of formForbidden) {
  if (form.includes(marker)) {
    console.error("[PATCH_FAILED] Form forbidden marker remains:", marker);
    process.exit(1);
  }
}

const pageForbidden = [
  "workflowActions={isRemovedRecord ? [] : runtimeActions}",
];

for (const marker of pageForbidden) {
  if (page.includes(marker)) {
    console.error("[PATCH_FAILED] Page forbidden marker remains:", marker);
    process.exit(1);
  }
}

const formRequired = [
  "ERPEnterpriseForm",
  "handleSubmit",
  "type=\"submit\"",
  "handleDeleteRecord",
  "handleBusinessStatusAction",
];

for (const marker of formRequired) {
  if (!form.includes(marker)) {
    console.error("[PATCH_FAILED] Form required marker missing:", marker);
    process.exit(1);
  }
}

const pageRequired = [
  "ERPRuntimeActionBar",
  "mapRuntimeActionsToActionBarActions",
  "RuntimeActionEngine",
  "handleRuntimeAction",
  "runtimeActions",
];

for (const marker of pageRequired) {
  if (!page.includes(marker)) {
    console.error("[PATCH_FAILED] Page required marker missing:", marker);
    process.exit(1);
  }
}

write(formPath, form);
write(pagePath, page);

console.log("[Q2-OP-I12-C] Workflow actions removed from ERPEnterpriseForm.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\q2op-i12a-audit-enterprise-form-workflow-block.cjs");
console.log("  node .\\scripts\\runtime\\q2op-i9-audit-workflow-buttons-in-enterprise-form.cjs");
console.log("  git status --short");