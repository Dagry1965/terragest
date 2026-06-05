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
backup(files.erpModule, ".bak-q2i-eb-b-add-tree-policy");

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
backup(files.expandedChildren, ".bak-q2i-eb-b-consume-tree-policy");

if (!expanded.includes("const treeConfig = parentModule.operational?.tree;")) {
  const anchor = `  const children = useMemo(
    () => parentModule.composition?.children ?? [],
    [parentModule]
  );`;

  const insert = `${anchor}

  const treeConfig = parentModule.operational?.tree;
  const treePlacement = treeConfig?.placement ?? "beforeChildren";
  const shouldRenderTree =
    treeConfig?.enabled !== false && treePlacement !== "hidden";
  const treeTitle = treeConfig?.title ?? "Arbre operationnel";
  const treeEmptyLabel =
    treeConfig?.emptyLabel ?? "Aucun arbre operationnel disponible.";
  const treeDefaultExpandedDepth = treeConfig?.defaultExpandedDepth ?? 2;`;

  if (!expanded.includes(anchor)) {
    throw new Error("Children memo anchor not found in ERPOperationalExpandedChildren.");
  }

  expanded = expanded.replace(anchor, insert);
  console.log("[ADDED] tree display policy constants");
} else {
  console.log("[SKIP] tree display policy constants already exist");
}

const oldTreeBlock = `      <ERPOperationalRecordTree
        parentModule={parentModule}
        parentRecord={parentRecord}
        title="Arbre operationnel"
        emptyLabel="Aucun arbre operationnel disponible."
        defaultExpandedDepth={2}
      />

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">`;

const newTreeBlock = `      {shouldRenderTree && treePlacement === "beforeChildren" ? (
        <ERPOperationalRecordTree
          parentModule={parentModule}
          parentRecord={parentRecord}
          title={treeTitle}
          emptyLabel={treeEmptyLabel}
          defaultExpandedDepth={treeDefaultExpandedDepth}
        />
      ) : null}

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">`;

if (expanded.includes(oldTreeBlock)) {
  expanded = expanded.replace(oldTreeBlock, newTreeBlock);
  console.log("[UPDATED] fixed tree props replaced by metadata-driven beforeChildren mount");
} else if (/title="Arbre operationnel"|emptyLabel="Aucun arbre operationnel disponible\."|defaultExpandedDepth=\{2\}/.test(expanded)) {
  throw new Error("Fixed tree props still present but exact block not found.");
} else {
  console.log("[SKIP] fixed tree props already removed");
}

const endAnchor = `      </div>
    </div>
  );
}`;

const afterChildrenBlock = `      {shouldRenderTree && treePlacement === "afterChildren" ? (
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
}`;

if (!expanded.includes('treePlacement === "afterChildren"')) {
  if (!expanded.includes(endAnchor)) {
    throw new Error("End anchor not found for afterChildren placement.");
  }

  expanded = expanded.replace(endAnchor, afterChildrenBlock);
  console.log("[ADDED] afterChildren placement support");
} else {
  console.log("[SKIP] afterChildren placement already supported");
}

if (/title="Arbre operationnel"|emptyLabel="Aucun arbre operationnel disponible\."|defaultExpandedDepth=\{2\}/.test(expanded)) {
  throw new Error("Fixed tree mount props still present after patch.");
}

if (/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(expanded)) {
  throw new Error("Hardcoded AMARKHYS context detected.");
}

write(files.expandedChildren, expanded);

console.log("[DONE] Q2-I-E-B-B operational tree display policy added and consumed.");
console.log("[WRITTEN]", files.erpModule);
console.log("[WRITTEN]", files.expandedChildren);
