const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const resolverPath = path.join(
  ROOT,
  "src",
  "runtime",
  "operational",
  "RuntimeOperationalChildrenResolver.ts"
);

const componentPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalExpandedChildren.tsx"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    fail("File not found: " + path.relative(ROOT, filePath));
  }

  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function replaceOnce(content, search, replacement, label) {
  if (!content.includes(search)) {
    fail("Missing expected block: " + label);
  }

  return content.replace(search, replacement);
}

let resolver = read(resolverPath);
let component = read(componentPath);

write(resolverPath + ".bak-q2g-b-expose-child-module", resolver);
write(componentPath + ".bak-q2g-b-use-child-module", component);

console.log("[BACKUP]", path.relative(ROOT, resolverPath + ".bak-q2g-b-expose-child-module"));
console.log("[BACKUP]", path.relative(ROOT, componentPath + ".bak-q2g-b-use-child-module"));

/**
 * 1. Resolver type: add module: ERPModule
 */
resolver = replaceOnce(
  resolver,
  `export type RuntimeOperationalExpandedGroup = {
  moduleKey: string;
  moduleLabel: string;
`,
  `export type RuntimeOperationalExpandedGroup = {
  moduleKey: string;
  moduleLabel: string;
  module: ERPModule;
`,
  "RuntimeOperationalExpandedGroup module field"
);

/**
 * 2. Resolver output: include module: childModule
 */
resolver = replaceOnce(
  resolver,
  `    groups.push({
      moduleKey: getModuleKey(childModule),
      moduleLabel: getModuleLabel(childModule),
      parentModuleKey: getModuleKey(parentModule),
`,
  `    groups.push({
      moduleKey: getModuleKey(childModule),
      moduleLabel: getModuleLabel(childModule),
      module: childModule,
      parentModuleKey: getModuleKey(parentModule),
`,
  "groups.push child module"
);

write(resolverPath, resolver);

/**
 * 3. Component: use group.module instead of fake child module reconstruction.
 */
const oldRootModuleBlock = `      const module = {
        ...parentModule,
        metadata: {
          ...parentModule.metadata,
          key: group.moduleKey,
          label: group.moduleLabel,
        },
      } as ERPModule;
`;

const newRootModuleBlock = `      const module = group.module;
`;

component = replaceOnce(
  component,
  oldRootModuleBlock,
  newRootModuleBlock,
  "root fake module reconstruction"
);

const oldNestedModuleBlock = `            const nestedModule = {
              ...module,
              metadata: {
                ...module.metadata,
                key: childGroup.moduleKey,
                label: childGroup.moduleLabel,
              },
            } as ERPModule;
`;

const newNestedModuleBlock = `            const nestedModule = childGroup.module;
`;

component = replaceOnce(
  component,
  oldNestedModuleBlock,
  newNestedModuleBlock,
  "nested fake module reconstruction"
);

write(componentPath, component);

/**
 * 4. Guardrails.
 */
const updatedResolver = read(resolverPath);
const updatedComponent = read(componentPath);

const checks = [
  {
    label: "Expanded group exposes module: ERPModule",
    ok: updatedResolver.includes("module: ERPModule"),
  },
  {
    label: "Resolver pushes module: childModule",
    ok: updatedResolver.includes("module: childModule"),
  },
  {
    label: "Component uses group.module",
    ok: updatedComponent.includes("const module = group.module;"),
  },
  {
    label: "Component uses childGroup.module",
    ok: updatedComponent.includes("const nestedModule = childGroup.module;"),
  },
  {
    label: "Component no longer reconstructs root fake module from parentModule",
    ok: !updatedComponent.includes("...parentModule,\n        metadata:"),
  },
  {
    label: "Component no longer reconstructs nested fake module from module",
    ok: !updatedComponent.includes("...module,\n              metadata:"),
  },
  {
    label: "RuntimeDataBinding remains centralized in resolver",
    ok:
      updatedResolver.includes("RuntimeDataBinding.list") &&
      !updatedComponent.includes("RuntimeDataBinding"),
  },
  {
    label: "No direct Firestore usage introduced",
    ok:
      !updatedResolver.includes("firebase/firestore") &&
      !updatedComponent.includes("firebase/firestore") &&
      !updatedResolver.includes("getDocs(") &&
      !updatedComponent.includes("getDocs("),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-G-B] Expose real child module from RuntimeOperationalChildrenResolver");
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] Q2-G-B applied.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
