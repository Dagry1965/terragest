const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/operational/ERPOperationalTreeView.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2i-hb2-graphic-tree-view", original, "utf8");

let next = original;

const oldNodeStart = next.indexOf("function ERPOperationalTreeNode({");
const oldExportStart = next.indexOf("export function ERPOperationalTreeView({");

if (oldNodeStart === -1) {
  throw new Error("ERPOperationalTreeNode function not found.");
}

if (oldExportStart === -1) {
  throw new Error("ERPOperationalTreeView export function not found.");
}

const beforeNode = next.slice(0, oldNodeStart);
const exportAndAfter = next.slice(oldExportStart);

const newNodeRenderer = `function ERPOperationalTreeNode({
  node,
  defaultExpandedDepth,
  currentReturnTo,
  currentReturnLabel,
}: ERPOperationalTreeNodeProps) {
  const hasChildren = node.children.length > 0;
  const [expanded, setExpanded] = useState(node.depth < defaultExpandedDepth);

  const roleLabel = getRoleLabel(node.nodeRole);
  const sourceSummary = getSourceSummary(node);
  const openHref = buildOpenHref(node, currentReturnTo, currentReturnLabel);
  const childCountLabel =
    node.children.length > 0
      ? node.children.length + " enfant" + (node.children.length > 1 ? "s" : "")
      : null;

  return (
    <div className="relative">
      <div className="relative flex gap-3">
        {node.depth > 0 ? (
          <div className="relative flex w-6 shrink-0 justify-center">
            <div className="absolute bottom-0 top-0 w-px bg-slate-200" />
            <div className="absolute top-5 h-px w-6 translate-x-3 bg-slate-200" />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="group relative rounded-2xl border border-slate-200 bg-white/95 px-3 py-2.5 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
            <div className="flex min-w-0 items-start gap-3">
              <button
                type="button"
                disabled={!hasChildren}
                onClick={() => setExpanded((value) => !value)}
                className={[
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-black transition",
                  hasChildren
                    ? "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
                    : "border-slate-200 bg-slate-50 text-slate-300",
                ].join(" ")}
                aria-label={expanded ? "Reduire" : "Developper"}
              >
                {hasChildren ? (expanded ? "−" : "+") : "•"}
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={[
                      "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em]",
                      getRoleClassName(node.nodeRole),
                    ].join(" ")}
                  >
                    {roleLabel}
                  </span>

                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    {node.moduleLabel}
                  </span>

                  {childCountLabel ? (
                    <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                      {childCountLabel}
                    </span>
                  ) : null}
                </div>

                <div className="mt-1 truncate text-sm font-black text-slate-950">
                  {node.label}
                </div>

                {node.subtitle ? (
                  <div className="mt-0.5 truncate text-xs font-semibold text-slate-500">
                    {node.subtitle}
                  </div>
                ) : null}

                {sourceSummary ? (
                  <div className="mt-2 inline-flex max-w-full rounded-xl border border-cyan-100 bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-800">
                    <span className="mr-1 font-black uppercase tracking-wide">
                      Source
                    </span>
                    <span className="truncate">{sourceSummary}</span>
                  </div>
                ) : null}
              </div>

              {openHref ? (
                <a
                  href={openHref}
                  className="mt-0.5 shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {node.openLabel ?? "Ouvrir"}
                </a>
              ) : null}
            </div>
          </div>

          {hasChildren && expanded ? (
            <div className="relative ml-3 mt-2 space-y-2 border-l border-slate-200 pl-4">
              {node.children.map((child) => (
                <ERPOperationalTreeNode
                  key={getNodeKey(child)}
                  node={child}
                  defaultExpandedDepth={defaultExpandedDepth}
                  currentReturnTo={currentReturnTo}
                  currentReturnLabel={currentReturnLabel}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

`;

next = beforeNode + newNodeRenderer + exportAndAfter;

if (!next.includes("border-l border-slate-200 pl-4")) {
  throw new Error("Graphic branch container was not added.");
}

if (!next.includes("absolute top-5 h-px w-6")) {
  throw new Error("Horizontal branch connector was not added.");
}

const recordTreePath = path.join(
  ROOT,
  "src/components/erp/operational/ERPOperationalRecordTree.tsx"
);
const recordTree = fs.existsSync(recordTreePath)
  ? fs.readFileSync(recordTreePath, "utf8")
  : "";

if (!recordTree.includes("RuntimeOperationalTreeResolver")) {
  throw new Error("Unexpected: record tree no longer delegates to resolver.");
}

const forbiddenPatterns = [
  "firebase/firestore",
  "getFirestore",
  "collection(",
  "doc(",
  "query(",
  "RuntimeDataBinding.list",
  "AMARKHYS",
  "ORG_AMARKHYS_001",
  "amarkhys",
];

for (const pattern of forbiddenPatterns) {
  if (next.includes(pattern)) {
    throw new Error("Forbidden pattern detected in tree view: " + pattern);
  }
}

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-I-H-B2 operational tree graphic view refactored.");
console.log("[WRITTEN]", rel);
