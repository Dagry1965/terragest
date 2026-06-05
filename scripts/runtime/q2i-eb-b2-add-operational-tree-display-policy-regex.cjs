const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  erpModule: "src/runtime/modules/ERPModule.ts",
  expandedChildren: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
};

function filePath(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  const file = filePath(rel);
  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + rel);
  }
  return fs.readFileSync(file, "utf8");
}

function write(rel, content) {
  fs.writeFileSync(filePath(rel), content, "utf8");
}

function backup(rel, suffix) {
  fs.writeFileSync(filePath(rel) + suffix, read(rel), "utf8");
}

let erpModule = read(files.erpModule);
backup(files.erpModule, ".bak-q2i-eb-b2-tree-policy-regex");

if (!erpModule.includes("export type ERPOperationalTreePlacement")) {
  const anchor = "export interface ERPOperationalRightPanelConfig {";
  const insert = `export type ERPOperationalTreePlacement =
  | "beforeChildren"
  | "afterChildren"
  | "hidden";

export interface ERPOperationalTreeConfig {
  enabled?: boolean;
  title?: string;
  emptyLabel?: string;
  defaultExpandedDepth?: number;
  placement?: ERPOperationalTreePlacement;
}

`;

  if (!erpModule.includes(anchor)) {
    throw new Error("Anchor not found in ERPModule.ts: " + anchor);
  }

  erpModule = erpModule.replace(anchor, insert + anchor);
  console.log("[ADDED] ERPOperationalTreePlacement + ERPOperationalTreeConfig");
} else {
  console.log("[SKIP] ERPOperationalTreeConfig already exists");
}

if (!/tree\?: ERPOperationalTreeConfig;/.test(erpModule)) {
  const anchor = "  rightPanel?: ERPOperationalRightPanelConfig;";

  if (!erpModule.includes(anchor)) {
    throw new Error("Anchor not found in ERPOperationalModuleConfig: " + anchor);
  }

  erpModule = erpModule.replace(anchor, anchor + "\n  tree?: ERPOperationalTreeConfig;");
  console.log("[ADDED] ERPOperationalModuleConfig.tree");
} else {
  console.log("[SKIP] ERPOperationalModuleConfig.tree already exists");
}

write(files.erpModule, erpModule);

let expanded = read(files.expandedChildren);
backup(files.expandedChildren, ".bak-q2i-eb-b2-consume-tree-policy-regex");

if (!expanded.includes("const treeConfig = parentModule.operational?.tree;")) {
  const stateAnchor = "  const [groups, setGroups] = useState<ExpandedGroup[]>([]);";

  const insert = `  const treeConfig = parentModule.operational?.tree;
  const treePlacement = treeConfig?.placement ?? "beforeChildren";
  const shouldRenderTree =
    treeConfig?.enabled !== false && treePlacement !== "hidden";
  const treeTitle = treeConfig?.title ?? "Arbre operationnel";
  const treeEmptyLabel =
    treeConfig?.emptyLabel ?? "Aucun arbre operationnel disponible.";
  const treeDefaultExpandedDepth = treeConfig?.defaultExpandedDepth ?? 2;

`;

  if (!expanded.includes(stateAnchor)) {
    throw new Error("State anchor not found in ERPOperationalExpandedChildren.");
  }

  expanded = expanded.replace(stateAnchor, insert + stateAnchor);
  console.log("[ADDED] tree display policy constants");
} else {
  console.log("[SKIP] tree display policy constants already exist");
}

const fixedTreeRegex =
  /<ERPOperationalRecordTree\s+parentModule=\{parentModule\}\s+parentRecord=\{parentRecord\}\s+title="Arbre operationnel"\s+emptyLabel="Aucun arbre operationnel disponible\."\s+defaultExpandedDepth=\{2\}\s+\/>/m;

const beforeChildrenBlock = `{shouldRenderTree && treePlacement === "beforeChildren" ? (
        <ERPOperationalRecordTree
          parentModule={parentModule}
          parentRecord={parentRecord}
          title={treeTitle}
          emptyLabel={treeEmptyLabel}
          defaultExpandedDepth={treeDefaultExpandedDepth}
        />
      ) : null}`;

if (fixedTreeRegex.test(expanded)) {
  expanded = expanded.replace(fixedTreeRegex, beforeChildrenBlock);
  console.log("[UPDATED] fixed tree mount replaced by metadata-driven beforeChildren mount");
} else if (
  /title="Arbre operationnel"|emptyLabel="Aucun arbre operationnel disponible\."|defaultExpandedDepth=\{2\}/.test(expanded)
) {
  throw new Error("Fixed tree props still present but fixedTreeRegex did not match.");
} else {
  console.log("[SKIP] fixed tree props already removed");
}

if (!expanded.includes('treePlacement === "afterChildren"')) {
  const finalCloseRegex = /\n\s*<\/div>\s*\n\s*<\/div>\s*\n\s*\);\s*\n}\s*$/;

  if (!finalCloseRegex.test(expanded)) {
    throw new Error("Final wrapper close anchor not found for afterChildren placement.");
  }

  expanded = expanded.replace(
    finalCloseRegex,
    `
      {shouldRenderTree && treePlacement === "afterChildren" ? (
        <ERPOperationalRecordTree
          parentModule={parentModule}
          parentRecord={parentRecord}
          title={treeTitle}
          emptyLabel={treeEmptyLabel}
          defaultExpandedDepth={treeDefaultExpandedDepth}
        />
      ) : null}
    </div>
  );
}
`
  );

  console.log("[ADDED] afterChildren placement support");
} else {
  console.log("[SKIP] afterChildren placement already supported");
}

if (/title="Arbre operationnel"|emptyLabel="Aucun arbre operationnel disponible\."|defaultExpandedDepth=\{2\}/.test(expanded)) {
  throw new Error("Fixed tree mount props still present after patch.");
}

if (!/parentModule\.operational\?\.tree/.test(expanded)) {
  throw new Error("Tree policy is not consumed from parentModule.operational?.tree.");
}

if (/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(expanded)) {
  throw new Error("Hardcoded AMARKHYS context detected.");
}

write(files.expandedChildren, expanded);

console.log("[DONE] Q2-I-E-B-B2 operational tree display policy added and consumed.");
console.log("[WRITTEN]", files.erpModule);
console.log("[WRITTEN]", files.expandedChildren);
