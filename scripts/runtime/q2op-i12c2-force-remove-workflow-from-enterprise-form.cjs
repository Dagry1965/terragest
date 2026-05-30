const fs = require("fs");
const path = require("path");

const root = process.cwd();

const formPath = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const pagePath = "src/components/erp/runtime/ERPRuntimePage.tsx";

function full(relativePath) {
  return path.join(root, relativePath);
}

function backup(relativePath, suffix) {
  const source = full(relativePath);
  if (!fs.existsSync(source)) {
    console.error("[MISSING]", relativePath);
    process.exit(1);
  }

  const target = `${source}.${suffix}`;
  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", path.relative(root, target));
  }
}

function write(relativePath, content) {
  fs.writeFileSync(full(relativePath), content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function removeBalancedBlock(source, startMarker, label) {
  const start = source.indexOf(startMarker);

  if (start === -1) {
    console.log("[SKIP]", label, "start marker not found");
    return source;
  }

  const firstBrace = source.indexOf("{", start);
  if (firstBrace === -1) {
    console.error("[FAILED]", label, "first brace not found");
    process.exit(1);
  }

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;
  let end = -1;

  for (let i = firstBrace; i < source.length; i++) {
    const c = source[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (c === "\\") {
      escaped = true;
      continue;
    }

    if (inString) {
      if (c === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (c === '"' || c === "'" || c === "`") {
      inString = true;
      quote = c;
      continue;
    }

    if (c === "{") depth++;
    if (c === "}") depth--;

    if (depth === 0) {
      end = i + 1;
      break;
    }
  }

  if (end === -1) {
    console.error("[FAILED]", label, "balanced end not found");
    process.exit(1);
  }

  // Remove possible trailing JSX close: )} or whitespace.
  let finalEnd = end;
  const tail = source.slice(end, end + 30);
  const tailMatch = tail.match(/^\s*\)\}/);

  if (tailMatch) {
    finalEnd = end + tailMatch[0].length;
  }

  console.log("[REMOVED]", label);
  return source.slice(0, start) + "\n" + source.slice(finalEnd);
}

backup(formPath, "bak-q2op-i12c2-force-remove-workflow");
backup(pagePath, "bak-q2op-i12c2-force-remove-workflow");

let form = fs.readFileSync(full(formPath), "utf8");
let page = fs.readFileSync(full(pagePath), "utf8");

/**
 * 1. Remove RuntimeActionEngine import.
 */
form = form.replace(
  /import\s+\{\s*RuntimeActionEngine\s*\}\s+from\s+"@\/runtime\/actions\/RuntimeActionEngine";\r?\n/g,
  ""
);

/**
 * 2. Remove workflowActions prop from props interface.
 */
form = form.replace(
  /\r?\n\s*workflowActions\?:\s*ERPModuleAction\[\];/g,
  ""
);

/**
 * 3. Remove workflowActions from function destructuring.
 */
form = form.replace(
  /,\r?\n\s*workflowActions\s*=\s*\[\]/g,
  ""
);

/**
 * 4. Remove pendingWorkflowActionRef.
 */
form = form.replace(
  /\r?\n\s*const pendingWorkflowActionRef\s*=\s*useRef<ERPModuleAction\s*\|\s*null>\(null\);/g,
  ""
);

form = form.replace(
  /\r?\n\s*const pendingWorkflowActionRef\s*=\r?\n\s*useRef<ERPModuleAction\s*\|\r?\n\s*null>\(null\);/g,
  ""
);

/**
 * 5. Remove local workflowAction read.
 */
form = form.replace(
  /\r?\n\s*const workflowAction\s*=\s*pendingWorkflowActionRef\.current;/g,
  ""
);

/**
 * 6. Remove workflow execution block inside submit.
 */
form = removeBalancedBlock(
  form,
  "      if (workflowAction && savedRecord) {",
  "workflow execution block"
);

/**
 * 7. Remove workflow UI section.
 */
form = removeBalancedBlock(
  form,
  '      {mode === "edit" && !isRemovedRecord && workflowActions.length > 0 && (',
  "workflow UI section"
);

/**
 * 8. Remove ERPModuleAction import if unused.
 */
form = form.replace(
  /import\s+type\s+\{\s*ERPModuleAction\s*\}\s+from\s+"@\/runtime\/modules\/ERPModule";\r?\n/g,
  ""
);

/**
 * 9. Stop passing workflowActions to form from runtime page.
 */
page = page.replace(
  /\r?\n\s*workflowActions=\{isRemovedRecord\s*\?\s*\[\]\s*:\s*runtimeActions\}/g,
  ""
);

page = page.replace(
  /\r?\n\s*workflowActions=\{[^}]*runtimeActions[^}]*\}/g,
  ""
);

/**
 * 10. Validation.
 */
const formForbidden = [
  "workflowActions",
  "workflowActions.map",
  "pendingWorkflowActionRef",
  "RuntimeActionEngine",
  "RuntimeActionEngine.execute",
  "workflowAction && savedRecord",
];

for (const marker of formForbidden) {
  if (form.includes(marker)) {
    console.error("[FAILED] Form forbidden marker remains:", marker);
    process.exit(1);
  }
}

const pageForbidden = [
  "workflowActions={",
  "workflowActions=",
];

for (const marker of pageForbidden) {
  if (page.includes(marker)) {
    console.error("[FAILED] Page forbidden marker remains:", marker);
    process.exit(1);
  }
}

const formRequired = [
  "ERPEnterpriseForm",
  "handleSubmit",
  "type=\"submit\"",
  "handleBusinessStatusAction",
  "handleDeleteRecord",
  "ERPButton",
];

for (const marker of formRequired) {
  if (!form.includes(marker)) {
    console.error("[FAILED] Required form marker missing:", marker);
    process.exit(1);
  }
}

const pageRequired = [
  "ERPRuntimeActionBar",
  "RuntimeActionEngine",
  "runtimeActions",
  "handleRuntimeAction",
  "ERPEnterpriseForm",
];

for (const marker of pageRequired) {
  if (!page.includes(marker)) {
    console.error("[FAILED] Required page marker missing:", marker);
    process.exit(1);
  }
}

write(formPath, form);
write(pagePath, page);

console.log("[Q2-OP-I12-C2] Workflow block removed from ERPEnterpriseForm and workflowActions no longer passed by ERPRuntimePage.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\q2op-i12a-audit-enterprise-form-workflow-block.cjs");
console.log("  node .\\scripts\\runtime\\q2op-i9-audit-workflow-buttons-in-enterprise-form.cjs");
console.log("  git status --short");